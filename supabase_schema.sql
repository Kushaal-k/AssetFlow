-- =========================================================
-- AssetFlow Database Schema for Supabase
-- Run this in Supabase Dashboard → SQL Editor
-- =========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =====================
-- USERS (synced with auth.users)
-- =====================
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'employee' check (role in ('admin', 'asset_manager', 'department_head', 'employee')),
  department_id uuid,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- =====================
-- DEPARTMENTS
-- =====================
create table if not exists public.departments (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  head_id uuid references public.users(id),
  created_at timestamptz not null default now()
);

-- Add department_id FK after departments table created
alter table public.users
  add column if not exists department_id uuid references public.departments(id);

-- =====================
-- ASSETS
-- =====================
create table if not exists public.assets (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  serial_number text,
  status text not null default 'available' check (status in ('available','allocated','reserved','maintenance','lost','retired')),
  department_id uuid references public.departments(id),
  assigned_to uuid references public.users(id),
  purchase_date date,
  purchase_price numeric,
  created_at timestamptz not null default now()
);

-- =====================
-- ALLOCATIONS
-- =====================
create table if not exists public.allocations (
  id uuid primary key default uuid_generate_v4(),
  "assetId" uuid references public.assets(id),
  "assetName" text,
  "assetTag" text,
  category text,
  "employeeId" uuid references public.users(id),
  "employeeName" text,
  department text,
  "allocatedAt" text,
  "dueDate" text,
  notes text,
  status text not null default 'active' check (status in ('active', 'returned')),
  created_at timestamptz not null default now()
);

-- =====================
-- BOOKINGS
-- =====================
create table if not exists public.bookings (
  id uuid primary key default uuid_generate_v4(),
  asset_id uuid references public.assets(id),
  requested_by uuid references public.users(id),
  start_date date,
  end_date date,
  status text not null default 'pending' check (status in ('pending','approved','rejected','completed')),
  reason text,
  "assetName" text,
  "assetTag" text,
  "employeeName" text,
  department text,
  created_at timestamptz not null default now()
);

-- =====================
-- MAINTENANCE REQUESTS
-- =====================
create table if not exists public.maintenance_requests (
  id uuid primary key default uuid_generate_v4(),
  asset_id uuid references public.assets(id),
  raised_by uuid references public.users(id),
  description text,
  status text not null default 'open' check (status in ('open','in_progress','resolved','closed')),
  priority text default 'medium',
  resolved_at timestamptz,
  "assetName" text,
  "assetTag" text,
  "reportedByName" text,
  created_at timestamptz not null default now()
);

-- =====================
-- AUDIT LOGS
-- =====================
create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  asset_id uuid references public.assets(id),
  audited_by uuid references public.users(id),
  status text not null default 'pending' check (status in ('pending','completed','failed')),
  notes text,
  created_at timestamptz not null default now()
);

-- =====================
-- NOTIFICATIONS
-- =====================
create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id),
  title text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================
alter table public.users enable row level security;
alter table public.departments enable row level security;
alter table public.assets enable row level security;
alter table public.allocations enable row level security;
alter table public.bookings enable row level security;
alter table public.maintenance_requests enable row level security;
alter table public.audit_logs enable row level security;
alter table public.notifications enable row level security;

-- Allow authenticated users to read all data
create policy "Allow read for authenticated" on public.users for select using (auth.role() = 'authenticated');
create policy "Allow read for authenticated" on public.departments for select using (auth.role() = 'authenticated');
create policy "Allow read for authenticated" on public.assets for select using (auth.role() = 'authenticated');
create policy "Allow read for authenticated" on public.allocations for select using (auth.role() = 'authenticated');
create policy "Allow read for authenticated" on public.bookings for select using (auth.role() = 'authenticated');
create policy "Allow read for authenticated" on public.maintenance_requests for select using (auth.role() = 'authenticated');
create policy "Allow read for authenticated" on public.audit_logs for select using (auth.role() = 'authenticated');
create policy "Allow read for authenticated" on public.notifications for select using (auth.role() = 'authenticated');

-- Allow authenticated users to insert
create policy "Allow insert for authenticated" on public.users for insert with check (auth.role() = 'authenticated');
create policy "Allow insert for authenticated" on public.departments for insert with check (auth.role() = 'authenticated');
create policy "Allow insert for authenticated" on public.assets for insert with check (auth.role() = 'authenticated');
create policy "Allow insert for authenticated" on public.allocations for insert with check (auth.role() = 'authenticated');
create policy "Allow insert for authenticated" on public.bookings for insert with check (auth.role() = 'authenticated');
create policy "Allow insert for authenticated" on public.maintenance_requests for insert with check (auth.role() = 'authenticated');
create policy "Allow insert for authenticated" on public.audit_logs for insert with check (auth.role() = 'authenticated');
create policy "Allow insert for authenticated" on public.notifications for insert with check (auth.role() = 'authenticated');

-- Allow authenticated users to update
create policy "Allow update for authenticated" on public.users for update using (auth.role() = 'authenticated');
create policy "Allow update for authenticated" on public.departments for update using (auth.role() = 'authenticated');
create policy "Allow update for authenticated" on public.assets for update using (auth.role() = 'authenticated');
create policy "Allow update for authenticated" on public.allocations for update using (auth.role() = 'authenticated');
create policy "Allow update for authenticated" on public.bookings for update using (auth.role() = 'authenticated');
create policy "Allow update for authenticated" on public.maintenance_requests for update using (auth.role() = 'authenticated');
create policy "Allow update for authenticated" on public.audit_logs for update using (auth.role() = 'authenticated');

-- Allow delete for authenticated
create policy "Allow delete for authenticated" on public.assets for delete using (auth.role() = 'authenticated');
create policy "Allow delete for authenticated" on public.allocations for delete using (auth.role() = 'authenticated');
create policy "Allow delete for authenticated" on public.bookings for delete using (auth.role() = 'authenticated');

-- =====================
-- AUTO-CREATE USER PROFILE ON SIGNUP
-- =====================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'employee')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
