-- Tri-state studio status visible on site: streaming live vs recording-only vs off.
-- Replaces legacy is_live boolean on broadcast_status row id = 1.

alter table public.broadcast_status
  add column if not exists broadcast_state text;

update public.broadcast_status
set broadcast_state = case when coalesce(is_live, false) then 'live' else 'off' end
where broadcast_state is null;

alter table public.broadcast_status alter column broadcast_state set default 'off';
update public.broadcast_status set broadcast_state = 'off' where broadcast_state is null;
alter table public.broadcast_status alter column broadcast_state set not null;

alter table public.broadcast_status drop constraint if exists broadcast_state_chk;

alter table public.broadcast_status
  add constraint broadcast_state_chk check (broadcast_state in ('off', 'recording', 'live'));

alter table public.broadcast_status drop column if exists is_live;
