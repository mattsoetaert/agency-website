create extension if not exists pgcrypto;

create table if not exists public.client_subscriptions (
  id uuid primary key default gen_random_uuid(),
  stripe_subscription_id text not null unique,
  stripe_customer_id text not null,
  stripe_checkout_session_id text,
  stripe_latest_invoice_id text,
  status text not null,
  plan_id text,
  price_id text,
  client_name text,
  client_email text,
  business_name text,
  phone text,
  notes text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz,
  latest_event_id text,
  livemode boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists client_subscriptions_customer_idx
  on public.client_subscriptions (stripe_customer_id);

create index if not exists client_subscriptions_status_idx
  on public.client_subscriptions (status);

create table if not exists public.stripe_webhook_events (
  id text primary key,
  type text not null,
  livemode boolean not null,
  stripe_created_at timestamptz not null,
  processing_status text not null check (processing_status in ('processing', 'processed', 'failed')),
  payload jsonb not null,
  processed_at timestamptz,
  failed_reason text,
  created_at timestamptz not null default now()
);

create index if not exists stripe_webhook_events_status_idx
  on public.stripe_webhook_events (processing_status);

alter table public.client_subscriptions enable row level security;
alter table public.stripe_webhook_events enable row level security;
