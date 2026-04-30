-- Open Pod Talk: submissions (caller intake)
-- Run after creating the Supabase project (Auth → users table exists).

-- ---------------------------------------------------------------------------
-- Submissions (inserted from Next.js with service role; any signed-in admin reads/updates)
-- ---------------------------------------------------------------------------
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  location text,
  timezone text,
  topic text not null,
  topic_details text,
  source text,
  social_handles jsonb not null default '{}'::jsonb,
  ip_hash text,
  user_agent text,
  turnstile_ok boolean not null default false,
  age_confirmed boolean not null default false,
  release_version text,
  status text not null default 'pending'
    check (status in (
      'pending',
      'reviewed',
      'selected',
      'contacted',
      'scheduled',
      'aired',
      'archived',
      'rejected'
    )),
  rating smallint check (rating is null or (rating >= 1 and rating <= 5)),
  host_notes text,
  riverside_link text,
  contacted_at timestamptz,
  aired_at timestamptz
);

create index if not exists submissions_created_at_idx on public.submissions (created_at desc);
create index if not exists submissions_status_idx on public.submissions (status);
create index if not exists submissions_email_idx on public.submissions (email);

-- updated_at is set in the app when admins save; add a DB trigger later if you prefer.

alter table public.submissions enable row level security;

drop policy if exists "submissions_select_authenticated" on public.submissions;
create policy "submissions_select_authenticated"
  on public.submissions for select
  to authenticated
  using (true);

drop policy if exists "submissions_update_authenticated" on public.submissions;
create policy "submissions_update_authenticated"
  on public.submissions for update
  to authenticated
  using (true)
  with check (true);

grant select, update on public.submissions to authenticated;

-- Note: public inserts use SUPABASE_SERVICE_ROLE_KEY from the app (bypasses RLS).
-- Do not add anon insert policies.
