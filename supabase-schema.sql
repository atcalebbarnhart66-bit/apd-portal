-- ============================================================
-- APD Administration Portal — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Profiles table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  badge_number text unique,
  role text not null default 'officer' check (role in ('admin', 'supervisor', 'officer', 'dispatcher')),
  department text not null default 'Abilene Police Department',
  created_at timestamptz default now(),
  last_login timestamptz
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policies
-- Users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Admins can view all profiles
create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Users can update their own non-role fields
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins can update any profile
create policy "Admins can update all profiles"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Function to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger: auto-create profile on new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- To create your first admin:
-- 1. Sign up via the login page
-- 2. Run: update public.profiles set role = 'admin' where email = 'your@email.com';
-- ============================================================
