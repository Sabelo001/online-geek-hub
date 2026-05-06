-- Online Geek Hub storage setup
-- Run this file third, after policies.sql.
-- It creates private buckets and safe storage policies.

-- Create private buckets for training resources, trainee submission files,
-- profile photos, and scholar CV uploads.
insert into storage.buckets (id, name, public)
values
  ('training-files', 'training-files', false),
  ('submission-files', 'submission-files', false),
  ('scholar-photos', 'scholar-photos', false),
  ('scholar-avatars', 'scholar-avatars', false),
  ('scholar-cvs', 'scholar-cvs', false),
  ('scholar-docs', 'scholar-docs', false)
on conflict (id) do update set public = excluded.public;

-- Drop old storage policies first so this file can be rerun safely.
drop policy if exists "admin_all_training_files" on storage.objects;
drop policy if exists "authenticated_read_training_files" on storage.objects;
drop policy if exists "published_training_files_read" on storage.objects;
drop policy if exists "admin_all_submission_files" on storage.objects;
drop policy if exists "reviewer_read_submission_files" on storage.objects;
drop policy if exists "trainee_read_own_submission_files" on storage.objects;
drop policy if exists "trainee_upload_own_submission_files" on storage.objects;
drop policy if exists "task_samples_read_authenticated" on storage.objects;
drop policy if exists "task_samples_admin_write" on storage.objects;
drop policy if exists "submission_files_owner_read" on storage.objects;
drop policy if exists "submission_files_owner_write" on storage.objects;
drop policy if exists "scholar_photos_owner_read" on storage.objects;
drop policy if exists "scholar_photos_owner_write" on storage.objects;
drop policy if exists "scholar_avatars_owner_read" on storage.objects;
drop policy if exists "scholar_avatars_owner_write" on storage.objects;
drop policy if exists "scholar_cvs_owner_read" on storage.objects;
drop policy if exists "scholar_cvs_owner_write" on storage.objects;
drop policy if exists "admin_all_scholar_docs" on storage.objects;
drop policy if exists "scholar_docs_assigned_read" on storage.objects;
drop policy if exists "scholar_docs_owner_write" on storage.objects;

-- Admin can upload, read, update, and delete training files.
create policy "admin_all_training_files"
on storage.objects for all
to authenticated
using (bucket_id = 'training-files' and public.is_admin())
with check (bucket_id = 'training-files' and public.is_admin());

-- Any signed-in user can read attached training files. Module visibility stays
-- controlled by public.training_modules RLS and signed URLs in the app.
create policy "authenticated_read_training_files"
on storage.objects for select
to authenticated
using (bucket_id = 'training-files');

-- Admin can manage all submission files.
create policy "admin_all_submission_files"
on storage.objects for all
to authenticated
using (bucket_id = 'submission-files' and public.is_admin())
with check (bucket_id = 'submission-files' and public.is_admin());

-- Reviewers can read submission files for scoring and quality control.
create policy "reviewer_read_submission_files"
on storage.objects for select
to authenticated
using (bucket_id = 'submission-files' and public.is_reviewer());

-- Trainees can read files they uploaded.
create policy "trainee_read_own_submission_files"
on storage.objects for select
to authenticated
using (bucket_id = 'submission-files' and owner = auth.uid());

-- Trainees can upload their own submission files.
create policy "trainee_upload_own_submission_files"
on storage.objects for insert
to authenticated
with check (bucket_id = 'submission-files' and owner = auth.uid());

-- Scholars can manage their own profile photos.
create policy "scholar_photos_owner_read"
on storage.objects for select
to authenticated
using (bucket_id = 'scholar-photos' and owner = auth.uid());

create policy "scholar_photos_owner_write"
on storage.objects for all
to authenticated
using (bucket_id = 'scholar-photos' and owner = auth.uid())
with check (bucket_id = 'scholar-photos' and owner = auth.uid());

-- Scholars can manage their own avatar uploads.
create policy "scholar_avatars_owner_read"
on storage.objects for select
to authenticated
using (bucket_id = 'scholar-avatars' and owner = auth.uid());

create policy "scholar_avatars_owner_write"
on storage.objects for all
to authenticated
using (bucket_id = 'scholar-avatars' and owner = auth.uid())
with check (bucket_id = 'scholar-avatars' and owner = auth.uid());

-- Scholars can manage their own CV uploads.
create policy "scholar_cvs_owner_read"
on storage.objects for select
to authenticated
using (bucket_id = 'scholar-cvs' and owner = auth.uid());

create policy "scholar_cvs_owner_write"
on storage.objects for all
to authenticated
using (bucket_id = 'scholar-cvs' and owner = auth.uid())
with check (bucket_id = 'scholar-cvs' and owner = auth.uid());

-- Admins can manage all Scholar document files.
create policy "admin_all_scholar_docs"
on storage.objects for all
to authenticated
using (bucket_id = 'scholar-docs' and public.is_admin())
with check (bucket_id = 'scholar-docs' and public.is_admin());

-- Scholars can read files they uploaded or files assigned to them by admin.
create policy "scholar_docs_assigned_read"
on storage.objects for select
to authenticated
using (
  bucket_id = 'scholar-docs'
  and (
    owner = auth.uid()
    or exists (
      select 1
      from public.scholar_documents doc
      where doc.file_url = storage.objects.name
        and doc.scholar_id = auth.uid()
    )
  )
);

-- Scholars can upload their own document files.
create policy "scholar_docs_owner_write"
on storage.objects for insert
to authenticated
with check (bucket_id = 'scholar-docs' and owner = auth.uid());
