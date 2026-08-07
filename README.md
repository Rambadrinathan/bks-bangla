# BKS Bangla

Vision and enrollment platform for Bharatiya Krishak Samaj, West Bengal.

Live site: https://bks-west-bengal.vercel.app/v3

## What this project contains

- Trilingual English / Hindi / Bengali public website
- June 30, 2026 appointment story for Mahacharya Sourabh J. Sarkar as President, BKS West Bengal
- National President Dr. Krishan Bir Chaudhary leadership context
- AI for farmers section
- District leadership enrollment interface
- **Krishak Samaj Puja** (`/puja`) — the agriculture-themed Durga Puja, its farmer awards, nominations and sponsorship
- Supabase-ready SQL schemas

## Krishak Samaj Puja

An agriculture-themed Durga Puja presented by Bharatiya Krishak Samaj, West Bengal,
carrying the Krishak Samaj Awards for farmers inside it. The page at `/puja` does
three jobs in one: sells sponsorship, takes award nominations, and tells visitors
and press what the puja is.

### Every assumed fact lives in one place

The puja was scoped before dates, venue, contact details and sponsorship pricing
were settled, so the site was built with placeholders that are **almost certainly
wrong**. They are all in the `PUJA` config block at the top of `puja.js` — dates,
venue, ceremony evening, contact and the four sponsorship tiers. Edit them there
and the whole page updates in all three languages. Nothing below that block
hard-codes a date, a place or an amount.

Two things to know:

- **Contact is deliberately empty.** No phone number or email was invented. The
  "reach us directly" block stays hidden until you fill `PUJA.contact`, so the
  enquiry form is the only route until then — and that goes to your database,
  not to a stranger's phone.
- **Sponsorship amounts are invented placeholders.** ₹10,00,000 / ₹2,50,000 /
  ₹1,00,000 / ₹25,000 are structurally sensible for a first-year Kolkata puja but
  are not a BKS decision. Replace before this page is shown to a sponsor.

### Nothing collects money

The site captures sponsor *intent* only. There is no payment integration and the
schema has no payment fields. Amounts and commitments are written by the BKS team
from the Supabase dashboard — a sponsor cannot write themselves in as confirmed.

## Backend setup

Run these in the Supabase SQL Editor:

1. `supabase-bks-district-leadership.sql` — district leadership applications.
2. `supabase-bks-puja.sql` — puja award nominations and sponsor enquiries.

### Privacy model

Both puja tables are insert-only for anonymous visitors and are never readable
from the public site. Verified against a live Postgres by connecting as the
`anon` role:

| Anonymous visitor can | Anonymous visitor cannot |
|---|---|
| Insert a nomination, with both consents | Read any nomination — **permission denied** |
| Insert a sponsor enquiry, with consent | Read any sponsor record — **permission denied** |
| Read `bks_puja_nomination_stats` (counts) | Insert without consent — **blocked by policy** |
| Read `bks_puja_public_sponsors` (opted-in, confirmed only) | Self-declare as `winner` or `confirmed` — **blocked by policy** |

Farmer phone numbers and sponsor contact details never leave the database. The
sponsor wall shows an organisation only after the BKS team marks it confirmed
*and* the sponsor ticked the public listing consent.

The two public views are intentionally `security_invoker = false` — that is what
lets anon read masked aggregates with no grant on the base tables. Do not change it.

## Local development

```sh
python3 -m http.server 8099    # then open http://localhost:8099/puja/
```

Static site, no build step. Supabase calls degrade gracefully: if the database is
unreachable, a filled form downloads itself as JSON so nothing is lost.

`index.html` and `v3/index.html` are kept identical; edit both together.
