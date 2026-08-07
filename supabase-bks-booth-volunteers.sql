-- Bharatiya Krishak Samaj, West Bengal
-- Booth Volunteer Enrollment backend
--
-- Core rule: exactly ONE Booth Prabhari (booth in-charge) per polling booth.
-- Supporting volunteers (Booth Sahayak) may also enroll on the same booth,
-- up to BOOTH_SAHAYAK_LIMIT, so willing hands are never turned away.
--
-- A booth in West Bengal is identified by (Assembly Constituency number, Part number).
-- AC numbers run 1..294. Part number is the booth number inside that AC.
-- District is context, not identity: it is stored for reporting and filtering.
--
-- Run this whole file in the Supabase SQL Editor.

-- ---------------------------------------------------------------------------
-- 1. Assembly constituency reference (populate from the official CEO West
--    Bengal / ECI list before go-live; the site works without it, falling back
--    to manual AC number entry).
-- ---------------------------------------------------------------------------

create table if not exists public.bks_wb_constituencies (
  ac_no smallint primary key check (ac_no between 1 and 294),
  ac_name text not null,
  ac_name_bn text,
  district text not null,
  parliamentary_constituency text,
  reserved_for text,                      -- 'SC' | 'ST' | null
  total_booths integer check (total_booths is null or total_booths > 0),
  updated_at timestamptz not null default now()
);

comment on table public.bks_wb_constituencies is
  'Reference list of the 294 West Bengal assembly constituencies. Load from the official CEO West Bengal roll data. total_booths, when filled, lets the site validate booth numbers and compute true coverage percentages.';

-- ---------------------------------------------------------------------------
-- 1b. Booth reference (populate from the official CEO West Bengal polling
--     station list before go-live; the site works without it, falling back
--     to manual booth-number entry — see DESIGN-booth-volunteer-platform.md §7).
--     Load whatever coverage you have, even partial: the picker only offers
--     booths that are actually in this table and shows "my booth isn't
--     listed" for every AC, so a partial list never blocks anyone.
-- ---------------------------------------------------------------------------

create table if not exists public.bks_wb_booths (
  ac_no smallint not null check (ac_no between 1 and 294),
  booth_no integer not null check (booth_no between 1 and 3000),
  booth_name text,                        -- polling station building, e.g. school name
  gram_panchayat_or_ward text,
  village_or_para text,
  district text,
  updated_at timestamptz not null default now(),
  primary key (ac_no, booth_no)
);

comment on table public.bks_wb_booths is
  'Reference list of West Bengal polling booths (ac_no, booth_no) with location context, for the cascading District -> Constituency -> Booth picker on /volunteer. Ships empty. Load from the official CEO West Bengal polling station list, in full or in part — the picker degrades to manual booth-number entry per AC when a booth is not found here, so partial coverage is safe to load.';

-- ---------------------------------------------------------------------------
-- 2. Booth volunteer enrollments
-- ---------------------------------------------------------------------------

create table if not exists public.bks_booth_volunteers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  submitted_at timestamptz,
  source text not null default 'bks-west-bengal-platform',
  language_context text,

  -- Booth identity
  district text not null,
  ac_no smallint not null check (ac_no between 1 and 294),
  ac_name text,
  block_or_municipality text,
  gram_panchayat_or_ward text,
  booth_no integer not null check (booth_no between 1 and 3000),
  booth_name text,                        -- school / building the booth sits in
  village_or_para text,

  -- Volunteer identity
  role text not null default 'booth_prabhari'
    check (role in ('booth_prabhari','booth_sahayak')),
  full_name text not null,
  phone text not null check (phone ~ '^[6-9][0-9]{9}$'),
  whatsapp text check (whatsapp is null or whatsapp ~ '^[6-9][0-9]{9}$'),
  email text,
  gender text check (gender is null or gender in ('female','male','other','undisclosed')),
  age_band text check (age_band is null or age_band in ('18-25','26-35','36-45','46-60','60+')),
  preferred_language text,

  -- Farmer / field context
  occupation text,                        -- farmer, sharecropper, agri-input, teacher, student, other
  land_holding text,                      -- landless, <1 acre, 1-3, 3-10, 10+
  main_crops text,
  farmer_groups text,                     -- FPO / SHG / co-operative membership
  years_in_village integer check (years_in_village is null or years_in_village between 0 and 120),

  -- Commitment
  hours_per_week text,
  has_smartphone boolean,
  can_travel_to_block boolean,
  motivation text,
  referred_by text,

  -- Consent (required by the claim function)
  consent_contact boolean not null default false,
  consent_data boolean not null default false,

  -- Lifecycle
  status text not null default 'claimed'
    check (status in ('claimed','verified','active','withdrawn','rejected')),
  claim_code text not null,
  verified_by text,
  verified_at timestamptz,
  reviewer_notes text,
  deactivated_reason text,
  deactivated_at timestamptz
);

comment on column public.bks_booth_volunteers.status is
  'claimed = self-enrolled, unverified. verified = phone/identity checked by the district team. active = inducted and working. withdrawn/rejected = booth released back to the pool.';

-- A claim only "holds" the booth while it is live: 'claimed', 'verified' or
-- 'active'. Withdrawn and rejected rows release the booth for someone else.
-- Every uniqueness rule below is a partial index over exactly that set.

-- THE core rule: one live Booth Prabhari per (ac_no, booth_no).
create unique index if not exists bks_one_prabhari_per_booth
  on public.bks_booth_volunteers (ac_no, booth_no)
  where role = 'booth_prabhari' and status in ('claimed','verified','active');

-- One live enrollment per phone number across the whole state.
create unique index if not exists bks_one_live_enrollment_per_phone
  on public.bks_booth_volunteers (phone)
  where status in ('claimed','verified','active');

-- The same person cannot hold two support slots on one booth.
create unique index if not exists bks_one_sahayak_slot_per_phone_per_booth
  on public.bks_booth_volunteers (ac_no, booth_no, phone)
  where status in ('claimed','verified','active');

create index if not exists bks_booth_volunteers_district_idx
  on public.bks_booth_volunteers (district);
create index if not exists bks_booth_volunteers_booth_idx
  on public.bks_booth_volunteers (ac_no, booth_no);
create index if not exists bks_booth_volunteers_status_idx
  on public.bks_booth_volunteers (status);
create index if not exists bks_booth_volunteers_claim_code_idx
  on public.bks_booth_volunteers (claim_code);

-- ---------------------------------------------------------------------------
-- 3. Row level security
--    Nobody reads this table anonymously. All public reads go through the
--    masked views below, all public writes through the claim function.
-- ---------------------------------------------------------------------------

alter table public.bks_booth_volunteers enable row level security;
alter table public.bks_wb_constituencies enable row level security;
alter table public.bks_wb_booths enable row level security;

revoke all on public.bks_booth_volunteers from anon, authenticated;

drop policy if exists "public_read_bks_constituencies" on public.bks_wb_constituencies;
create policy "public_read_bks_constituencies"
on public.bks_wb_constituencies
for select
to anon, authenticated
using (true);

grant select on public.bks_wb_constituencies to anon, authenticated;

drop policy if exists "public_read_bks_booths" on public.bks_wb_booths;
create policy "public_read_bks_booths"
on public.bks_wb_booths
for select
to anon, authenticated
using (true);

grant select on public.bks_wb_booths to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 4. Public, privacy-safe views
-- ---------------------------------------------------------------------------

-- These views are deliberately security_invoker = false. Anonymous visitors
-- have no SELECT on bks_booth_volunteers; the view owner does. That is the
-- only thing standing between the public and a contactable list of workers,
-- so do not "fix" this to security_invoker = true.

-- Booth-by-booth occupancy. No phone, no email, no address, no free text.
-- The name is masked to first name + surname initial so a volunteer can
-- recognise themselves and a district team can spot obvious duplicates,
-- without publishing a contactable list of workers.
create or replace view public.bks_booth_directory
with (security_invoker = false) as
select
  v.district,
  v.ac_no,
  v.ac_name,
  v.booth_no,
  v.booth_name,
  v.role,
  v.status,
  split_part(v.full_name, ' ', 1) ||
    case
      when position(' ' in v.full_name) > 0
        then ' ' || upper(substr(split_part(v.full_name, ' ', 2), 1, 1)) || '.'
      else ''
    end as volunteer_display_name,
  date_trunc('day', v.created_at) as claimed_on
from public.bks_booth_volunteers v
where v.status in ('claimed','verified','active');

grant select on public.bks_booth_directory to anon, authenticated;

-- District-level coverage for the public progress strip.
create or replace view public.bks_booth_coverage
with (security_invoker = false) as
select
  v.district,
  count(*) filter (where v.role = 'booth_prabhari') as booths_covered,
  count(*) filter (where v.role = 'booth_sahayak') as support_volunteers,
  count(distinct v.ac_no) as constituencies_touched,
  count(*) filter (where v.status = 'verified' or v.status = 'active') as verified_volunteers,
  max(v.created_at) as last_enrollment_at
from public.bks_booth_volunteers v
where v.status in ('claimed','verified','active')
group by v.district;

grant select on public.bks_booth_coverage to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 5. The claim function
--    Anonymous visitors get EXECUTE on this and nothing else. It performs the
--    availability check and the insert inside one statement, so two people
--    submitting for the same booth in the same second cannot both win.
-- ---------------------------------------------------------------------------

create or replace function public.bks_claim_booth(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  sahayak_limit constant integer := 4;
  v_role text;
  v_ac_no smallint;
  v_booth_no integer;
  v_phone text;
  v_full_name text;
  v_claim_code text;
  v_id uuid;
  v_sahayak_count integer;
  v_holder text;
begin
  v_full_name := btrim(coalesce(payload->>'full_name', ''));
  v_phone     := regexp_replace(coalesce(payload->>'phone', ''), '\D', '', 'g');
  v_role      := coalesce(nullif(payload->>'role', ''), 'booth_prabhari');

  -- Accept +91 / 0 prefixed numbers by keeping the last ten digits.
  if length(v_phone) > 10 then
    v_phone := right(v_phone, 10);
  end if;

  begin
    v_ac_no := (payload->>'ac_no')::smallint;
    v_booth_no := (payload->>'booth_no')::integer;
  exception when others then
    return jsonb_build_object('ok', false, 'reason', 'invalid_booth');
  end;

  if v_full_name = '' or length(v_full_name) > 120 then
    return jsonb_build_object('ok', false, 'reason', 'invalid_name');
  end if;

  if v_phone !~ '^[6-9][0-9]{9}$' then
    return jsonb_build_object('ok', false, 'reason', 'invalid_phone');
  end if;

  if v_ac_no is null or v_ac_no < 1 or v_ac_no > 294
     or v_booth_no is null or v_booth_no < 1 or v_booth_no > 3000 then
    return jsonb_build_object('ok', false, 'reason', 'invalid_booth');
  end if;

  if v_role not in ('booth_prabhari','booth_sahayak') then
    return jsonb_build_object('ok', false, 'reason', 'invalid_role');
  end if;

  if coalesce((payload->>'consent_contact')::boolean, false) is not true
     or coalesce((payload->>'consent_data')::boolean, false) is not true then
    return jsonb_build_object('ok', false, 'reason', 'consent_required');
  end if;

  -- Friendly pre-checks. The unique indexes remain the real authority.
  if exists (
    select 1 from public.bks_booth_volunteers
    where phone = v_phone and status in ('claimed','verified','active')
  ) then
    return jsonb_build_object('ok', false, 'reason', 'phone_already_enrolled');
  end if;

  if v_role = 'booth_prabhari' then
    select split_part(full_name, ' ', 1) into v_holder
    from public.bks_booth_volunteers
    where ac_no = v_ac_no and booth_no = v_booth_no
      and role = 'booth_prabhari'
      and status in ('claimed','verified','active')
    limit 1;

    if v_holder is not null then
      return jsonb_build_object(
        'ok', false,
        'reason', 'booth_taken',
        'held_by', v_holder
      );
    end if;
  else
    select count(*) into v_sahayak_count
    from public.bks_booth_volunteers
    where ac_no = v_ac_no and booth_no = v_booth_no
      and role = 'booth_sahayak'
      and status in ('claimed','verified','active');

    if v_sahayak_count >= sahayak_limit then
      return jsonb_build_object('ok', false, 'reason', 'support_slots_full');
    end if;
  end if;

  v_claim_code := 'WB-' || lpad(v_ac_no::text, 3, '0')
                        || '-B' || lpad(v_booth_no::text, 4, '0')
                        || '-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 4));

  begin
    insert into public.bks_booth_volunteers (
      submitted_at, source, language_context,
      district, ac_no, ac_name, block_or_municipality, gram_panchayat_or_ward,
      booth_no, booth_name, village_or_para,
      role, full_name, phone, whatsapp, email, gender, age_band, preferred_language,
      occupation, land_holding, main_crops, farmer_groups, years_in_village,
      hours_per_week, has_smartphone, can_travel_to_block, motivation, referred_by,
      consent_contact, consent_data, claim_code
    ) values (
      now(),
      coalesce(nullif(payload->>'source',''), 'bks-west-bengal-platform'),
      left(payload->>'language_context', 8),
      btrim(payload->>'district'),
      v_ac_no,
      left(btrim(payload->>'ac_name'), 120),
      left(btrim(payload->>'block_or_municipality'), 120),
      left(btrim(payload->>'gram_panchayat_or_ward'), 120),
      v_booth_no,
      left(btrim(payload->>'booth_name'), 180),
      left(btrim(payload->>'village_or_para'), 180),
      v_role,
      v_full_name,
      v_phone,
      nullif(right(regexp_replace(coalesce(payload->>'whatsapp',''), '\D', '', 'g'), 10), ''),
      left(nullif(btrim(payload->>'email'), ''), 180),
      nullif(payload->>'gender', ''),
      nullif(payload->>'age_band', ''),
      nullif(payload->>'preferred_language', ''),
      left(btrim(payload->>'occupation'), 120),
      nullif(payload->>'land_holding', ''),
      left(btrim(payload->>'main_crops'), 300),
      left(btrim(payload->>'farmer_groups'), 300),
      nullif(payload->>'years_in_village', '')::integer,
      nullif(payload->>'hours_per_week', ''),
      (payload->>'has_smartphone')::boolean,
      (payload->>'can_travel_to_block')::boolean,
      left(btrim(payload->>'motivation'), 1200),
      left(btrim(payload->>'referred_by'), 180),
      true, true,
      v_claim_code
    )
    returning id into v_id;
  exception
    when unique_violation then
      -- Someone won the same booth microseconds earlier.
      return jsonb_build_object('ok', false, 'reason', 'booth_taken');
    when check_violation then
      return jsonb_build_object('ok', false, 'reason', 'invalid_field');
  end;

  return jsonb_build_object(
    'ok', true,
    'id', v_id,
    'claim_code', v_claim_code,
    'role', v_role,
    'ac_no', v_ac_no,
    'booth_no', v_booth_no,
    'status', 'claimed'
  );
end;
$$;

revoke all on function public.bks_claim_booth(jsonb) from public;
grant execute on function public.bks_claim_booth(jsonb) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 6. Availability lookup for a single booth (no PII, safe for anon)
-- ---------------------------------------------------------------------------

create or replace function public.bks_booth_availability(p_ac_no smallint, p_booth_no integer)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'ac_no', p_ac_no,
    'booth_no', p_booth_no,
    'prabhari_taken', exists (
      select 1 from public.bks_booth_volunteers
      where ac_no = p_ac_no and booth_no = p_booth_no
        and role = 'booth_prabhari' and status in ('claimed','verified','active')
    ),
    'held_by', (
      select split_part(full_name, ' ', 1)
      from public.bks_booth_volunteers
      where ac_no = p_ac_no and booth_no = p_booth_no
        and role = 'booth_prabhari' and status in ('claimed','verified','active')
      limit 1
    ),
    'support_count', (
      select count(*) from public.bks_booth_volunteers
      where ac_no = p_ac_no and booth_no = p_booth_no
        and role = 'booth_sahayak' and status in ('claimed','verified','active')
    ),
    'support_limit', 4
  );
$$;

revoke all on function public.bks_booth_availability(smallint, integer) from public;
grant execute on function public.bks_booth_availability(smallint, integer) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 7. Release a booth (run from the Supabase dashboard by the state team).
--    Withdrawing or rejecting a claim frees the booth for the next volunteer.
-- ---------------------------------------------------------------------------

-- update public.bks_booth_volunteers
--    set status = 'withdrawn', deactivated_reason = 'left the village', deactivated_at = now()
--  where claim_code = 'WB-123-B0045-A1B2';
