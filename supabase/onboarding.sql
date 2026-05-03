create extension if not exists pgcrypto;

create table if not exists public.client_onboarding_submissions (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_name text not null,
  contact_email text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists client_onboarding_submissions_business_idx
  on public.client_onboarding_submissions (business_name);

create index if not exists client_onboarding_submissions_email_idx
  on public.client_onboarding_submissions (contact_email);

alter table public.client_onboarding_submissions enable row level security;
