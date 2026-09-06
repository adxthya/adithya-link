-- Link click analytics
--
-- Only useful, privacy-conscious data is stored:
--   link_id   – stable identifier of the clicked link
--   clicked_at – UTC timestamp of the click
--   referrer  – optional referring page (stripped of query params)
--
-- No IPs, no user agents, no fingerprints.

create table if not exists public.link_click (
  id uuid primary key default gen_random_uuid(),
  link_id text not null,
  clicked_at timestamptz not null default timezone('utc', now()),
  referrer text null
);

create index if not exists link_click_link_id_idx
  on public.link_click (link_id);

create index if not exists link_click_clicked_at_idx
  on public.link_click (clicked_at);

-- All access happens through the service role (server-side only).
-- Anonymous/Supabase anon role cannot read or write these rows.
alter table public.link_click enable row level security;

-- No policies means anon + authenticated roles are denied; the service
-- role bypasses RLS, which is the only type of access our code uses.