# BKS Bangla

Vision and enrollment platform for Bharatiya Krishak Samaj, West Bengal.

Live site: https://bks-west-bengal.vercel.app/v3

## What this project contains

- Trilingual English / Hindi / Bengali public website
- June 30, 2026 appointment story for Mahacharya Sourabh J. Sarkar as President, BKS West Bengal
- National President Dr. Krishan Bir Chaudhary leadership context
- AI for farmers section
- District leadership enrollment interface
- **Booth volunteer enrollment platform — one volunteer per polling booth** (`/volunteer`)
- Supabase-ready SQL schemas for both enrollment systems

## The two enrollment systems

They are deliberately separate sections, because they recruit different people
for different things.

| | District leadership (`/#enroll`) | Booth volunteers (`/volunteer`) |
|---|---|---|
| Recruits | District office bearers | One Booth Prabhari per polling booth, plus up to 4 Booth Sahayaks |
| Scale | Tens of applications | Tens of thousands of enrollments |
| Selection | Applications reviewed, then appointed | Self-claimed, then phone-verified |
| Uniqueness | None — many may apply per district | Enforced: one Prabhari per booth, one booth per phone |

A booth is identified by `(assembly constituency number 1..294, booth part
number)` — both printed on the volunteer's voter slip. The one-per-booth rule
is enforced by a partial unique index in Postgres and an atomic claim function,
not by the browser.

Full rationale, privacy model, lifecycle and roadmap:
[`DESIGN-booth-volunteer-platform.md`](DESIGN-booth-volunteer-platform.md).

## Backend setup

Run both files in the Supabase SQL Editor:

1. `supabase-bks-district-leadership.sql` — district leadership applications.
2. `supabase-bks-booth-volunteers.sql` — booth volunteer enrollment: tables,
   uniqueness indexes, RLS, masked public views and the `bks_claim_booth()` /
   `bks_booth_availability()` functions.

Anonymous visitors get `execute` on those two functions and `select` on the
masked views only. They have no grants on `bks_booth_volunteers` itself, so
volunteer phone numbers and addresses are never readable from the public site.

### Reference data still to load

`bks_wb_constituencies` ships empty. Load the 294 West Bengal assembly
constituencies (`ac_no`, `ac_name`, `ac_name_bn`, `district`, `total_booths`)
from the official CEO West Bengal roll data. Until then the site falls back to
manual AC number entry and everything still works; once loaded, the
constituency field becomes a district-filtered dropdown with Bengali names and
true coverage percentages become possible.

## Local development

```sh
python3 -m http.server 8099    # then open http://localhost:8099/volunteer/
```

The site is static — no build step. Pages talk to Supabase over the REST API,
and every backend call degrades gracefully if the database is unreachable
(the enrollment form downloads itself as JSON so nothing is lost in the field).

`index.html` and `v3/index.html` are kept identical; edit both together.
