alter table public.broadcast_status
add column if not exists current_topic text;
