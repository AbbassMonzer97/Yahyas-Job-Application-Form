-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query).
-- Fixes "new row violates row-level security policy" for public form submissions.

-- ── job_applications table ──────────────────────────────────────────────────

alter table public.job_applications enable row level security;

drop policy if exists "Public can submit applications" on public.job_applications;
create policy "Public can submit applications"
  on public.job_applications
  for insert
  to anon
  with check (true);

drop policy if exists "Admins can read applications" on public.job_applications;
create policy "Admins can read applications"
  on public.job_applications
  for select
  to authenticated
  using (true);

-- ── cvs storage bucket ───────────────────────────────────────────────────────

drop policy if exists "Public can upload CVs" on storage.objects;
create policy "Public can upload CVs"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'cvs');

drop policy if exists "Admins can read CVs" on storage.objects;
create policy "Admins can read CVs"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'cvs');

drop policy if exists "Public can delete own uploads on rollback" on storage.objects;
create policy "Public can delete own uploads on rollback"
  on storage.objects
  for delete
  to anon
  using (bucket_id = 'cvs');
