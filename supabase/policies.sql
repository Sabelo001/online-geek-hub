-- Online Geek Hub Row Level Security policies
-- Run this file second, after schema.sql.
-- These policies are intentionally explicit and beginner-friendly.

-- Turn on RLS for every public app table.
alter table public.profiles enable row level security;
alter table public.training_modules enable row level security;
alter table public.cv_profiles enable row level security;
alter table public.practice_tasks enable row level security;
alter table public.task_assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.availability enable row level security;
alter table public.payments enable row level security;
alter table public.announcements enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.training_modules to authenticated;
grant select, insert, update, delete on public.cv_profiles to authenticated;
grant select, insert, update on public.practice_tasks to authenticated;
grant select, insert, update on public.task_assignments to authenticated;
grant select, insert, update on public.submissions to authenticated;
grant select, insert, update on public.availability to authenticated;
grant select, insert, update on public.payments to authenticated;
grant select, insert, update on public.announcements to authenticated;

-- Helper: return the role for the currently signed-in user.
create or replace function public.current_role()
returns public.app_role
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid()
$$;

-- Helper: true when the current user is an admin.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_role() = 'admin', false)
$$;

-- Helper: true when the current user is a reviewer.
create or replace function public.is_reviewer()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_role() = 'reviewer', false)
$$;

-- Helper: true when the current user is a trainee.
create or replace function public.is_trainee()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_role() = 'trainee', false)
$$;

-- Helper: true when the current user is an admin or reviewer.
create or replace function public.is_reviewer_or_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_role() in ('admin', 'reviewer'), false)
$$;

-- Drop old policies first so this file can be run again while learning.
drop policy if exists "admin_all_profiles" on public.profiles;
drop policy if exists "profiles_select_scoped" on public.profiles;
drop policy if exists "profiles_update_self_or_admin" on public.profiles;
drop policy if exists "profiles_self_insert" on public.profiles;
drop policy if exists "profiles_self_read" on public.profiles;
drop policy if exists "profiles_self_update" on public.profiles;
drop policy if exists "reviewer_read_profiles" on public.profiles;

drop policy if exists "admin_all_training_modules" on public.training_modules;
drop policy if exists "modules_read_authenticated" on public.training_modules;
drop policy if exists "modules_admin_write" on public.training_modules;
drop policy if exists "published_training_modules_read" on public.training_modules;
drop policy if exists "trainee_read_training_modules" on public.training_modules;
drop policy if exists "reviewer_read_training_modules" on public.training_modules;

drop policy if exists "admin_read_cv_profiles" on public.cv_profiles;
drop policy if exists "reviewer_read_cv_profiles" on public.cv_profiles;
drop policy if exists "cv_profiles_self_read" on public.cv_profiles;
drop policy if exists "cv_profiles_self_insert" on public.cv_profiles;
drop policy if exists "cv_profiles_self_update" on public.cv_profiles;
drop policy if exists "cv_profiles_self_delete" on public.cv_profiles;

drop policy if exists "admin_all_practice_tasks" on public.practice_tasks;
drop policy if exists "tasks_read_authenticated" on public.practice_tasks;
drop policy if exists "tasks_admin_write" on public.practice_tasks;
drop policy if exists "reviewer_read_practice_tasks" on public.practice_tasks;
drop policy if exists "trainee_read_assigned_practice_tasks" on public.practice_tasks;

drop policy if exists "admin_all_task_assignments" on public.task_assignments;
drop policy if exists "assignments_scoped_read" on public.task_assignments;
drop policy if exists "assignments_admin_write" on public.task_assignments;
drop policy if exists "reviewer_read_task_assignments" on public.task_assignments;
drop policy if exists "trainee_read_own_task_assignments" on public.task_assignments;

drop policy if exists "admin_all_submissions" on public.submissions;
drop policy if exists "submissions_scoped_read" on public.submissions;
drop policy if exists "submissions_trainee_insert" on public.submissions;
drop policy if exists "submissions_reviewer_update" on public.submissions;
drop policy if exists "reviewer_read_submissions" on public.submissions;
drop policy if exists "reviewer_update_submissions" on public.submissions;
drop policy if exists "trainee_read_own_submissions" on public.submissions;
drop policy if exists "trainee_create_own_submissions" on public.submissions;

drop policy if exists "admin_all_availability" on public.availability;
drop policy if exists "availability_scoped_read" on public.availability;
drop policy if exists "availability_self_insert" on public.availability;
drop policy if exists "availability_self_update" on public.availability;
drop policy if exists "reviewer_read_availability" on public.availability;
drop policy if exists "trainee_read_own_availability" on public.availability;
drop policy if exists "trainee_create_own_availability" on public.availability;
drop policy if exists "trainee_update_own_availability" on public.availability;

drop policy if exists "admin_all_payments" on public.payments;
drop policy if exists "payments_scoped_read" on public.payments;
drop policy if exists "payments_admin_write" on public.payments;
drop policy if exists "trainee_read_own_payments" on public.payments;

drop policy if exists "admin_all_announcements" on public.announcements;
drop policy if exists "announcements_read_authenticated" on public.announcements;
drop policy if exists "announcements_admin_write" on public.announcements;
drop policy if exists "authenticated_read_announcements" on public.announcements;

-- Profiles
-- Keep these policies non-recursive. Do not call public.is_admin(),
-- public.current_role(), or any helper that reads public.profiles from a
-- public.profiles policy.

create policy "profiles_self_read"
on public.profiles for select
to authenticated
using (id = auth.uid());

create policy "profiles_self_insert"
on public.profiles for insert
to authenticated
with check (id = auth.uid());

create policy "profiles_self_update"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- Training modules
-- Admin can manage all modules. Other signed-in users can read published modules.
create policy "admin_all_training_modules"
on public.training_modules for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "published_training_modules_read"
on public.training_modules for select
to authenticated
using (status = 'published');

-- CV profiles
-- Free for all signed-in users. Users manage their own CVs; admins and
-- reviewers can read CVs for support/review without being able to edit them.
create policy "admin_read_cv_profiles"
on public.cv_profiles for select
to authenticated
using (public.is_admin());

create policy "reviewer_read_cv_profiles"
on public.cv_profiles for select
to authenticated
using (public.is_reviewer());

create policy "cv_profiles_self_read"
on public.cv_profiles for select
to authenticated
using (user_id = auth.uid());

create policy "cv_profiles_self_insert"
on public.cv_profiles for insert
to authenticated
with check (user_id = auth.uid());

create policy "cv_profiles_self_update"
on public.cv_profiles for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "cv_profiles_self_delete"
on public.cv_profiles for delete
to authenticated
using (user_id = auth.uid());

-- Practice tasks
-- Admin can manage all tasks. Reviewers can read tasks.
-- Trainees can only read active tasks assigned to them.
create policy "admin_all_practice_tasks"
on public.practice_tasks for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "reviewer_read_practice_tasks"
on public.practice_tasks for select
to authenticated
using (public.is_reviewer());

create policy "trainee_read_assigned_practice_tasks"
on public.practice_tasks for select
to authenticated
using (
  public.is_trainee()
  and status = 'active'
  and exists (
    select 1
    from public.task_assignments ta
    where ta.task_id = practice_tasks.id
      and ta.trainee_id = auth.uid()
  )
);

-- Task assignments
-- Admin can manage assignments.
-- Trainees can read their own assignment rows so they can see assigned tasks.
create policy "admin_all_task_assignments"
on public.task_assignments for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "trainee_read_own_task_assignments"
on public.task_assignments for select
to authenticated
using (trainee_id = auth.uid());

-- Submissions
-- Admin can manage all submissions. Reviewers can read and update submissions for scoring.
-- Trainees can create and read only their own submissions.
create policy "admin_all_submissions"
on public.submissions for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "reviewer_read_submissions"
on public.submissions for select
to authenticated
using (public.is_reviewer());

create policy "reviewer_update_submissions"
on public.submissions for update
to authenticated
using (public.is_reviewer())
with check (public.is_reviewer());

create policy "trainee_read_own_submissions"
on public.submissions for select
to authenticated
using (trainee_id = auth.uid());

create policy "trainee_create_own_submissions"
on public.submissions for insert
to authenticated
with check (
  trainee_id = auth.uid()
  and exists (
    select 1
    from public.task_assignments ta
    where ta.task_id = submissions.task_id
      and ta.trainee_id = auth.uid()
  )
);

-- Availability
-- Admin can manage all availability.
-- Trainees can create, read, and update their own availability.
-- The insert policy supports the app's "create availability" form; the update policy is the required role rule.
create policy "admin_all_availability"
on public.availability for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "trainee_read_own_availability"
on public.availability for select
to authenticated
using (trainee_id = auth.uid());

create policy "trainee_create_own_availability"
on public.availability for insert
to authenticated
with check (trainee_id = auth.uid());

create policy "trainee_update_own_availability"
on public.availability for update
to authenticated
using (trainee_id = auth.uid())
with check (trainee_id = auth.uid());

-- Payments
-- Admin can manage all payments. Trainees can read their own payments only.
create policy "admin_all_payments"
on public.payments for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "trainee_read_own_payments"
on public.payments for select
to authenticated
using (trainee_id = auth.uid());

-- Announcements
-- Admin can manage announcements. Any signed-in user can read announcements.
create policy "admin_all_announcements"
on public.announcements for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "authenticated_read_announcements"
on public.announcements for select
to authenticated
using (true);
