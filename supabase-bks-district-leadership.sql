-- Bharatiya Krishak Samaj, West Bengal
-- District Leadership Enrollment backend table
-- Run this in Supabase SQL Editor before enabling live database capture.

create table if not exists public.bks_district_leadership_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  submitted_at timestamptz,
  source text default 'bks-west-bengal-platform',
  status text not null default 'new',
  language_context text,

  full_name text not null,
  phone text not null,
  email text,
  district text not null,
  role_applied text not null,
  preferred_language text,

  credentials text not null,
  farmer_work text not null,
  vision text not null,
  ninety_day_plan text not null,
  district_network text,

  review_score integer,
  reviewer_notes text,
  reviewed_by text,
  reviewed_at timestamptz,
  appointment_decision text,
  appointment_date date
);

alter table public.bks_district_leadership_applications enable row level security;

-- Public anonymous visitors may submit applications.
-- Review/read/update should be done only from Supabase dashboard or a protected admin tool.
drop policy if exists "public_insert_bks_district_leadership" on public.bks_district_leadership_applications;
create policy "public_insert_bks_district_leadership"
on public.bks_district_leadership_applications
for insert
to anon
with check (true);

