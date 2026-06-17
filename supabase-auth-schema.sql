-- BloodBridge Supabase MVP schema + RLS policies
-- Run this in Supabase SQL editor. Also create storage bucket: request-documents

create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  role text not null check (role in ('patient_attendant','donor','hospital_verifier','blood_bank','volunteer','admin')),
  city text,
  created_at timestamp with time zone default now()
);

create table if not exists patient_attendants (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  relationship_to_patient text,
  preferred_hospital text,
  emergency_contact text,
  created_at timestamp with time zone default now()
);

create table if not exists donors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  blood_group text not null,
  location text,
  latitude numeric,
  longitude numeric,
  availability boolean default true,
  last_donation_date date,
  medical_notes text,
  created_at timestamp with time zone default now()
);

create table if not exists hospital_verifiers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  hospital_name text not null,
  hospital_city text,
  hospital_address text,
  staff_id text,
  designation text,
  verification_status text default 'pending',
  created_at timestamp with time zone default now()
);

create table if not exists blood_banks (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  blood_bank_name text not null,
  license_number text,
  address text,
  city text,
  contact_person text,
  verification_status text default 'pending',
  created_at timestamp with time zone default now()
);

create table if not exists volunteers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  availability boolean default true,
  service_area text,
  transport_available boolean default false,
  skills text,
  created_at timestamp with time zone default now()
);

create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  access_level text default 'super_admin',
  created_at timestamp with time zone default now()
);

create table if not exists blood_requests (
  id uuid primary key default gen_random_uuid(),
  patient_profile_id uuid references profiles(id) on delete cascade,
  patient_name text,
  phone text,
  age integer,
  city text,
  emergency_contact text,
  relationship_to_patient text,
  required_blood_group text not null,
  units_required integer default 1,
  hospital_profile_id uuid references profiles(id) on delete set null,
  hospital_name text,
  hospital_mode text default 'registered',
  verification_choice text,
  verification_status text default 'pending',
  status text default 'pending_verification',
  trust_score integer default 80,
  emergency_level text default 'urgent',
  emergency_notes text,
  documents_public boolean default false,
  fulfilled_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

create table if not exists request_documents (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references blood_requests(id) on delete cascade,
  file_name text,
  file_path text,
  public_url text,
  is_public boolean default false,
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;
alter table patient_attendants enable row level security;
alter table donors enable row level security;
alter table hospital_verifiers enable row level security;
alter table blood_banks enable row level security;
alter table volunteers enable row level security;
alter table admins enable row level security;
alter table blood_requests enable row level security;
alter table request_documents enable row level security;

-- Public signup flow needs insert after auth.signUp. For MVP, allow insert and keep reads limited.
drop policy if exists "profiles_insert_signup" on profiles;
create policy "profiles_insert_signup" on profiles for insert to anon, authenticated with check (true);
drop policy if exists "profiles_self_read" on profiles;
create policy "profiles_self_read" on profiles for select to authenticated using (auth.uid() = id or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
drop policy if exists "profiles_self_update" on profiles;
create policy "profiles_self_update" on profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "patient_attendants_insert" on patient_attendants;
create policy "patient_attendants_insert" on patient_attendants for insert to anon, authenticated with check (true);
drop policy if exists "donors_insert" on donors;
create policy "donors_insert" on donors for insert to anon, authenticated with check (true);
drop policy if exists "hospital_verifiers_insert" on hospital_verifiers;
create policy "hospital_verifiers_insert" on hospital_verifiers for insert to anon, authenticated with check (true);
drop policy if exists "blood_banks_insert" on blood_banks;
create policy "blood_banks_insert" on blood_banks for insert to anon, authenticated with check (true);
drop policy if exists "volunteers_insert" on volunteers;
create policy "volunteers_insert" on volunteers for insert to anon, authenticated with check (true);

drop policy if exists "hospital_verifiers_public_approved" on hospital_verifiers;
create policy "hospital_verifiers_public_approved" on hospital_verifiers for select to anon, authenticated using (verification_status = 'approved' or profile_id = auth.uid());

drop policy if exists "blood_requests_insert" on blood_requests;
create policy "blood_requests_insert" on blood_requests for insert to anon, authenticated with check (true);
drop policy if exists "blood_requests_public_read" on blood_requests;
create policy "blood_requests_public_read" on blood_requests for select to anon, authenticated using (status in ('verified','matched','fulfilled') or patient_profile_id = auth.uid() or exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('admin','hospital_verifier','blood_bank','volunteer')));
drop policy if exists "blood_requests_owner_update" on blood_requests;
create policy "blood_requests_owner_update" on blood_requests for update to authenticated using (patient_profile_id = auth.uid() or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "request_documents_insert" on request_documents;
create policy "request_documents_insert" on request_documents for insert to anon, authenticated with check (true);
drop policy if exists "request_documents_public_read" on request_documents;
create policy "request_documents_public_read" on request_documents for select to anon, authenticated using (is_public = true or exists (select 1 from blood_requests r where r.id = request_id and r.patient_profile_id = auth.uid()) or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
