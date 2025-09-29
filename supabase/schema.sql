-- Create waitinglist table
create extension if not exists "pgcrypto";

create table if not exists public.waitinglist (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  consent boolean default true,
  created_at timestamptz default now()
);
