-- Krishak Samaj Puja
-- Bharatiya Krishak Samaj, West Bengal
--
-- Backend for the two things the puja website has to capture:
--   1. Farmer award nominations (self-nominations and community nominations)
--   2. Sponsor enquiries
--
-- Same privacy posture as the rest of the platform: anonymous visitors may
-- INSERT and nothing else. Nobody reads farmer phone numbers or sponsor
-- contact details from the public site. Public counters and the sponsor wall
-- come from masked views.
--
-- Run this in the Supabase SQL Editor.

-- ---------------------------------------------------------------------------
-- 1. Award nominations
-- ---------------------------------------------------------------------------

create table if not exists public.bks_puja_award_nominations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  submitted_at timestamptz,
  source text not null default 'krishak-samaj-puja',
  language_context text,

  -- Who is filling this in
  nomination_type text not null default 'self'
    check (nomination_type in ('self','on_behalf')),
  nominator_name text,
  nominator_phone text,
  nominator_relationship text,

  -- The farmer being nominated
  category text not null check (category in (
    'best_farmer_overall',
    'fishery',
    'animal_husbandry',
    'urban_kitchen_gardening',
    'modern_tech_farming',
    'organic_natural',
    'horticulture_floriculture'
  )),
  farmer_name text not null check (length(btrim(farmer_name)) between 2 and 120),
  farmer_phone text not null check (farmer_phone ~ '^[6-9][0-9]{9}$'),
  farmer_district text not null,
  farmer_block text,
  farmer_village text,
  farmer_gender text check (farmer_gender is null or farmer_gender in ('female','male','other','undisclosed')),
  farmer_age_band text,

  -- The work itself
  years_farming integer check (years_farming is null or years_farming between 0 and 100),
  land_holding text,
  farm_scale text,
  what_they_grow text,
  innovation_summary text not null check (length(btrim(innovation_summary)) >= 20),
  impact_summary text,

  -- The action plan is explicit that the social media footprint is the
  -- discovery signal. Capture it as first-class data, not an afterthought.
  social_links text,
  featured_by_channel text,
  evidence_links text,

  consent_contact boolean not null default false,
  consent_data boolean not null default false,

  -- Review
  status text not null default 'received'
    check (status in ('received','screening','shortlisted','finalist','winner','rejected','duplicate')),
  review_score integer check (review_score is null or review_score between 0 and 100),
  reviewer_notes text,
  reviewed_by text,
  reviewed_at timestamptz
);

create index if not exists bks_puja_nominations_category_idx
  on public.bks_puja_award_nominations (category);
create index if not exists bks_puja_nominations_district_idx
  on public.bks_puja_award_nominations (farmer_district);
create index if not exists bks_puja_nominations_status_idx
  on public.bks_puja_award_nominations (status);

-- Same farmer should not be nominated twice in the same category.
-- Duplicates across categories are allowed and are a judging decision.
create unique index if not exists bks_puja_one_nomination_per_farmer_category
  on public.bks_puja_award_nominations (farmer_phone, category)
  where status <> 'duplicate';

-- ---------------------------------------------------------------------------
-- 2. Sponsor enquiries
-- ---------------------------------------------------------------------------

create table if not exists public.bks_puja_sponsors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  submitted_at timestamptz,
  source text not null default 'krishak-samaj-puja',
  language_context text,

  organisation_name text not null check (length(btrim(organisation_name)) between 2 and 200),
  contact_person text not null check (length(btrim(contact_person)) between 2 and 120),
  designation text,
  phone text not null check (phone ~ '^[6-9][0-9]{9}$'),
  email text,
  website text,

  sector text,                    -- seed, fertiliser, agri-tech, bank, FPO, retail, other
  tier_interest text,             -- title, category, pandal, community, undecided
  category_interest text,         -- which award category they would want to name
  budget_indication text,
  message text,

  consent_contact boolean not null default false,
  -- A sponsor must opt in before their name appears on the public sponsor wall.
  consent_public_listing boolean not null default false,

  status text not null default 'enquiry'
    check (status in ('enquiry','in_discussion','committed','confirmed','declined','lapsed')),
  amount_committed numeric(12,2),
  tier_confirmed text,
  owner text,                     -- who on the BKS side is handling this
  internal_notes text,
  last_contacted_at timestamptz
);

create index if not exists bks_puja_sponsors_status_idx
  on public.bks_puja_sponsors (status);
create index if not exists bks_puja_sponsors_tier_idx
  on public.bks_puja_sponsors (tier_interest);

-- One live enquiry per organisation phone, so a double form submission does
-- not create two leads for the same company.
create unique index if not exists bks_puja_one_live_sponsor_enquiry
  on public.bks_puja_sponsors (phone)
  where status not in ('declined','lapsed');

-- ---------------------------------------------------------------------------
-- 3. Row level security — insert only, never read
-- ---------------------------------------------------------------------------

alter table public.bks_puja_award_nominations enable row level security;
alter table public.bks_puja_sponsors enable row level security;

revoke all on public.bks_puja_award_nominations from anon, authenticated;
revoke all on public.bks_puja_sponsors from anon, authenticated;

grant insert on public.bks_puja_award_nominations to anon, authenticated;
grant insert on public.bks_puja_sponsors to anon, authenticated;

-- Nominations: anyone may submit, but only with both consents recorded.
drop policy if exists "public_insert_puja_nominations" on public.bks_puja_award_nominations;
create policy "public_insert_puja_nominations"
on public.bks_puja_award_nominations
for insert
to anon, authenticated
with check (
  consent_contact is true
  and consent_data is true
  and status = 'received'
  and review_score is null
  and reviewed_by is null
);

-- Sponsors: anyone may enquire, but cannot plant themselves as confirmed
-- or write their own amount onto the record.
drop policy if exists "public_insert_puja_sponsors" on public.bks_puja_sponsors;
create policy "public_insert_puja_sponsors"
on public.bks_puja_sponsors
for insert
to anon, authenticated
with check (
  consent_contact is true
  and status = 'enquiry'
  and amount_committed is null
  and tier_confirmed is null
  and internal_notes is null
);

-- ---------------------------------------------------------------------------
-- 4. Public views
--    security_invoker = false on purpose: anon has no SELECT on the base
--    tables, the view owner does. That is what keeps farmer phone numbers and
--    sponsor contacts off the public internet. Do not change it.
-- ---------------------------------------------------------------------------

-- Counters for the site. Counts only — no names, no contacts.
create or replace view public.bks_puja_nomination_stats
with (security_invoker = false) as
select
  category,
  count(*) as nominations,
  count(distinct farmer_district) as districts,
  count(*) filter (where status in ('shortlisted','finalist','winner')) as shortlisted
from public.bks_puja_award_nominations
where status <> 'duplicate'
group by category;

grant select on public.bks_puja_nomination_stats to anon, authenticated;

-- The sponsor wall. Only confirmed sponsors who opted in to being listed.
create or replace view public.bks_puja_public_sponsors
with (security_invoker = false) as
select
  organisation_name,
  coalesce(tier_confirmed, tier_interest) as tier,
  website,
  sector
from public.bks_puja_sponsors
where status = 'confirmed'
  and consent_public_listing is true;

grant select on public.bks_puja_public_sponsors to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 5. Notes for the BKS team
-- ---------------------------------------------------------------------------
--
-- Shortlisting a nomination:
--   update public.bks_puja_award_nominations
--      set status = 'shortlisted', review_score = 82, reviewed_by = 'name', reviewed_at = now()
--    where id = '...';
--
-- Putting a sponsor on the public wall (they must have ticked the listing consent):
--   update public.bks_puja_sponsors
--      set status = 'confirmed', tier_confirmed = 'category', amount_committed = 250000
--    where id = '...';
--
-- Nothing in this file collects money. The site captures sponsor intent only;
-- payment happens offline through the BKS finance process.
