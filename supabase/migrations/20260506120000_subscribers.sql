-- Recording-notice mailing list subscribers

create table if not exists public.subscribers (
  id              uuid        primary key default gen_random_uuid(),
  created_at      timestamptz not null    default now(),
  email           text        not null,
  token           uuid        not null    default gen_random_uuid(),
  unsubscribed_at timestamptz
);

create unique index if not exists subscribers_email_lower_idx
  on public.subscribers (lower(email));

create unique index if not exists subscribers_token_idx
  on public.subscribers (token);

create index if not exists subscribers_created_at_idx
  on public.subscribers (created_at desc);

alter table public.subscribers enable row level security;

-- Authenticated admins can read
drop policy if exists "subscribers_select_authenticated" on public.subscribers;
create policy "subscribers_select_authenticated"
  on public.subscribers for select
  to authenticated
  using (true);

grant select on public.subscribers to authenticated;

-- Public inserts and unsubscribe updates use SUPABASE_SERVICE_ROLE_KEY from the app.
