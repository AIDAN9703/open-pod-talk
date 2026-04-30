-- Website "on air" flag
-- Row id must stay 1.

create table if not exists public.broadcast_status (
  id smallint primary key default 1,
  is_live boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint broadcast_status_singleton check (id = 1)
);

insert into public.broadcast_status (id, is_live)
values (1, false)
on conflict (id) do nothing;

alter table public.broadcast_status enable row level security;

drop policy if exists "broadcast_status_select_public" on public.broadcast_status;
create policy "broadcast_status_select_public"
  on public.broadcast_status for select
  to anon, authenticated
  using (true);

drop policy if exists "broadcast_status_update_authenticated" on public.broadcast_status;
create policy "broadcast_status_update_authenticated"
  on public.broadcast_status for update
  to authenticated
  using (true)
  with check (true);

grant select on public.broadcast_status to anon, authenticated;
grant update on public.broadcast_status to authenticated;
