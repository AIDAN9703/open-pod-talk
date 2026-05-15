alter table public.submissions
  add column if not exists request_type text not null default 'stream'
    check (request_type in ('stream', 'in_person'));

create index if not exists submissions_request_type_idx on public.submissions (request_type);
