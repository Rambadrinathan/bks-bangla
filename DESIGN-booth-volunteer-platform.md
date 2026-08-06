# Booth Volunteer Platform — design

Bharatiya Krishak Samaj, West Bengal
Enrollment system for **one volunteer per polling booth**.

This document explains the decisions behind the code, so the next person
changing it knows which parts are load-bearing.

---

## 1. Why the booth is the unit

The district leadership platform (`/#enroll`) recruits the top of the
structure. It cannot build the organisation. A district head cannot know ten
thousand farmers; a booth volunteer knows three hundred, by name.

The polling booth is the right organisational atom for West Bengal because:

- it is **already defined** — every village is inside exactly one booth area,
  with an official boundary and an official number, so there is no argument
  about who belongs where;
- it is **the size of a real social unit** — a few hundred households, walkable;
- it **maps to every higher structure** — booths roll up to gram panchayat,
  block, assembly constituency, district and state, so the same enrollment
  data produces every committee list you will ever need;
- it is **verifiable** — a volunteer's own voter slip proves which booth they
  belong to.

Everything above the booth in this design is derived, not separately entered.

## 2. Booth identity

A booth is identified by two numbers, and only these two:

```
(assembly constituency number 1..294, booth part number)
```

Both are printed on the volunteer's voter slip. District, block, gram
panchayat and village are captured for reporting and for finding people, but
they are **not** part of the identity — they are free text that field workers
spell differently, and using them as a key would create duplicate booths.

`ac_name` is stored alongside the number as a human-readable label only.

## 3. The one-volunteer-per-booth rule

Two roles exist per booth:

| Role | Per booth | Meaning |
|---|---|---|
| **Booth Prabhari** | exactly 1 | Booth in-charge. Holds the booth. |
| **Booth Sahayak** | up to 4 | Support volunteers. |

The single-Prabhari rule is enforced by a **partial unique index in the
database**, not by application code:

```sql
create unique index bks_one_prabhari_per_booth
  on public.bks_booth_volunteers (ac_no, booth_no)
  where role = 'booth_prabhari' and status in ('claimed','verified','active');
```

The frontend also checks availability before showing the long form, but that
check is a **courtesy, not a guarantee** — two volunteers can pass it in the
same second. The index is what actually decides, and `bks_claim_booth()`
catches the `unique_violation` and returns `{"ok": false, "reason":
"booth_taken"}` to the loser. This has been tested against a real Postgres:
a direct double insert is rejected by the index.

Why a support role at all? Because a rule that turns people away destroys
enthusiasm. A young farmer whose booth is already taken should be able to
serve that booth, not be told to go home. The organisation gets a bench, and
the Prabhari gets a team.

**One volunteer, one booth** is enforced separately, by a unique index on
phone number across all live enrollments. Nobody can hold two booths.

## 4. Claim lifecycle

```
claimed ──► verified ──► active
   │            │
   └──► rejected / withdrawn ──► booth returns to the pool
```

- `claimed` — self-enrolled through the website, nobody has spoken to them yet.
  The claim already holds the booth, so the booth cannot be double-claimed
  while verification is pending.
- `verified` — a district worker phoned the number and confirmed the person.
- `active` — inducted, trained, working.
- `withdrawn` / `rejected` — the booth is immediately free for someone else,
  because every uniqueness index is scoped to the live statuses only.

Releasing a booth is a one-line update from the Supabase dashboard; see the
bottom of `supabase-bks-booth-volunteers.sql`.

Each successful claim returns a **claim code** (`WB-123-B0045-3F84`) which the
volunteer keeps and quotes when the verification call comes.

## 5. Privacy and the permission model

This table is a list of named rural political volunteers with their phone
numbers and villages. It must never be publicly readable. The permission model
is deliberately narrow, and was verified by connecting as the `anon` role:

| Anonymous visitor can | Anonymous visitor cannot |
|---|---|
| `execute bks_claim_booth()` | `select` from `bks_booth_volunteers` — **denied** |
| `execute bks_booth_availability()` | `update` / `delete` any row — **denied** |
| `select` from `bks_booth_directory` (masked) | see any phone, email, address or free text |
| `select` from `bks_booth_coverage` (counts) | |
| `select` from `bks_wb_constituencies` (reference) | |

`bks_booth_directory` publishes only district, AC, booth number, role, status
and a **masked name** — first name plus surname initial (`Bikash R.`). That is
enough for a volunteer to recognise themselves and for a district team to spot
a duplicate, and not enough to build a contact list of BKS workers from the
public internet.

The two public views are intentionally `security_invoker = false`. That is the
mechanism that lets anon read masked aggregates without any grant on the base
table. Do not "fix" it.

Both consent checkboxes are **required by the database function**, not just by
the HTML form — a claim without both consents is rejected server-side.

## 6. Anti-abuse

Enforced in `bks_claim_booth()` and the indexes:

- phone must match `^[6-9][0-9]{9}$` (Indian mobile); `+91` and leading-zero
  forms are normalised to the last ten digits;
- one live enrollment per phone number, statewide;
- AC number bounded 1–294, booth number bounded 1–3000;
- every free-text field is length-capped before insert, so the form cannot be
  used to dump data into the database;
- both consents required;
- anon holds no table grants at all, so there is no way to read, update or
  delete through the REST API.

**What is deliberately not solved yet:** there is no OTP. Anyone can enroll
with a phone number they do not own, and a bad actor could sit on booths they
have no connection to. This is handled organisationally — a claim is only
`claimed` until a district worker phones the number — but it is the main
remaining hole, and the fix is Supabase phone auth at the point of claim.
See §9.

## 7. Degraded modes

The site is a static page talking to Supabase, so every backend call can fail.
Each one degrades to something a farmer can still act on:

| Failure | Behaviour |
|---|---|
| Constituency table empty or unreachable | AC name becomes a free-text box next to the AC number; enrollment still works |
| Availability RPC unavailable | Banner says live checking is off, form still opens, clashes resolved at verification |
| Claim RPC unavailable | The filled form downloads as JSON and the volunteer is told to WhatsApp it to their district team |

Nothing in the flow dead-ends. This matters because the first field camps will
happen before the backend is fully switched on.

## 8. Data the BKS team must load

`bks_wb_constituencies` ships **empty on purpose**. It is a reference list of
the 294 West Bengal assembly constituencies and the roll data behind it is
official ECI / CEO West Bengal material — it should be loaded from the source,
not typed from memory, because a wrong AC-to-district mapping silently
misfiles every volunteer under it.

Load `ac_no, ac_name, ac_name_bn, district, total_booths` from the CEO West
Bengal roll. Once populated, the site automatically upgrades the AC field from
a free-text box to a district-filtered dropdown showing Bengali names, and
`total_booths` allows a true coverage percentage instead of a raw count.

## 9. What comes next

In rough priority order:

1. **Phone OTP at claim time** (Supabase phone auth) — closes the impersonation
   gap in §6 and lets `claimed` mean something on its own.
2. **District verification console** — right now verification happens in the
   Supabase dashboard. District teams need a simple protected screen listing
   their pending claims with call / verify / reject buttons.
3. **Load the constituency reference** (§8) and switch on the true coverage
   percentage.
4. **Booth master list** — with official booth counts per AC, the site can show
   which specific booths in a village are still uncovered, which turns
   enrollment from "claim yours" into "twelve booths near you are empty".
5. **WhatsApp confirmation** on claim, carrying the claim code.
6. **Roll-up committee views** — panchayat and block committees generated from
   booth enrollments, which is the whole point of building this way.

## 10. Files

| File | Role |
|---|---|
| `supabase-bks-booth-volunteers.sql` | Schema, indexes, RLS, views, claim + availability functions |
| `volunteer/index.html` | The enrollment page |
| `volunteer.js` | Trilingual UI, availability check, claim submission, fallbacks |
| `styles.css` | Booth section styles appended to the shared stylesheet |
| `index.html`, `v3/index.html` | Nav entry and cross-link from the district leadership section |
