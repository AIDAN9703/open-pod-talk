alter table public.submissions
  add column if not exists video_url text;
