-- Online Geek Hub database schema
-- Run this file first in the Supabase SQL Editor.
-- It creates the app enums, tables, foreign keys, indexes, and the signup profile trigger.

-- Enable UUID generation with gen_random_uuid().
create extension if not exists "pgcrypto";

-- Create enum types safely. Supabase/Postgres does not support "create type if not exists",
-- so these DO blocks skip creation when the type already exists.
do $$
begin
  create type public.app_role as enum ('admin', 'reviewer', 'trainee');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.profile_status as enum ('pending', 'active', 'inactive');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.training_module_status as enum ('draft', 'published');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.cv_plan as enum ('free', 'premium', 'professional_review');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.task_status as enum ('draft', 'active', 'archived');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.assignment_status as enum ('assigned', 'in_progress', 'submitted', 'reviewed', 'cancelled');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.project_invitation_status as enum ('pending', 'accepted', 'declined', 'completed');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.project_status as enum ('draft', 'active', 'closed');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.submission_status as enum ('submitted', 'approved', 'rejected', 'revision_requested');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.availability_status as enum ('available', 'limited', 'unavailable');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.payment_status as enum ('pending', 'approved', 'paid', 'held');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.invoice_status as enum ('pending', 'approved', 'paid', 'rejected');
exception
  when duplicate_object then null;
end $$;

-- User profiles are linked 1:1 with Supabase Auth users.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role public.app_role not null default 'trainee',
  phone text,
  status public.profile_status not null default 'active',
  created_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists location text,
  add column if not exists skills text[],
  add column if not exists bio text,
  add column if not exists avatar_path text,
  add column if not exists cv_path text,
  add column if not exists cv_name text,
  add column if not exists cv_size bigint,
  add column if not exists cv_uploaded_at timestamptz;

-- Training modules hold beginner-friendly lessons and resources.
create table if not exists public.training_modules (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  content text not null,
  video_url text,
  category text not null,
  track text not null default 'General',
  step_number int,
  estimated_time text,
  status public.training_module_status not null default 'draft',
  material_path text,
  material_name text,
  material_type text,
  material_size bigint,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Free CV generator profiles. This is separate from auth/user profiles so a
-- trainee can draft career documents without changing their account profile.
create table if not exists public.cv_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  location text,
  professional_title text,
  summary text,
  skills text,
  experience text,
  education text,
  certifications text,
  referees text,
  template text not null default 'professional' check (template in ('professional', 'remote_work', 'data_annotation')),
  plan public.cv_plan not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  organization text,
  inquiry_type text not null check (inquiry_type in ('vendor_partnership', 'pilot_project', 'scholar_program', 'cv_support', 'training', 'general_inquiry')),
  message text not null,
  status text not null default 'new' check (status in ('new', 'reviewing', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.contact_inquiries
  add column if not exists full_name text,
  add column if not exists email text,
  add column if not exists organization text,
  add column if not exists inquiry_type text,
  add column if not exists message text,
  add column if not exists status text not null default 'new',
  add column if not exists created_at timestamptz not null default now();

alter table public.cv_profiles
  add column if not exists user_id uuid references public.profiles(id) on delete cascade,
  add column if not exists full_name text,
  add column if not exists email text,
  add column if not exists phone text,
  add column if not exists location text,
  add column if not exists professional_title text,
  add column if not exists summary text,
  add column if not exists skills text,
  add column if not exists experience text,
  add column if not exists education text,
  add column if not exists certifications text,
  add column if not exists referees text,
  add column if not exists template text not null default 'professional',
  add column if not exists plan public.cv_plan not null default 'free',
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.training_modules
  add column if not exists status public.training_module_status not null default 'draft',
  add column if not exists track text not null default 'General',
  add column if not exists step_number int,
  add column if not exists estimated_time text,
  add column if not exists material_path text,
  add column if not exists material_name text,
  add column if not exists material_type text,
  add column if not exists material_size bigint;

-- Training progress unlocks onboarding steps and later domain tracks.
create table if not exists public.training_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  module_id uuid not null references public.training_modules(id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique (user_id, module_id)
);

-- Practice tasks are internal exercises only. They must not connect to external work platforms.
create table if not exists public.practice_tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  task_type text not null,
  instructions text not null,
  difficulty text not null check (difficulty in ('beginner', 'intermediate', 'advanced')),
  sample_file_url text,
  answer_key text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  status public.task_status not null default 'draft'
);

-- Task assignments connect trainees to the practice tasks they are allowed to see and submit.
create table if not exists public.task_assignments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.practice_tasks(id) on delete cascade,
  trainee_id uuid not null references public.profiles(id) on delete cascade,
  assigned_by uuid references public.profiles(id) on delete set null,
  due_date date,
  status public.assignment_status not null default 'assigned',
  created_at timestamptz not null default now(),
  unique (task_id, trainee_id)
);

-- Projects are managed by admins and sent to Scholars as invitations.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  project_type text not null,
  description text not null,
  deadline date,
  status public.project_status not null default 'active',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Project invitations connect Scholars to real or pilot project opportunities.
create table if not exists public.project_invitations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  scholar_id uuid not null references public.profiles(id) on delete cascade,
  status public.project_invitation_status not null default 'pending',
  project_title text not null,
  project_type text not null,
  short_description text not null,
  instructions text,
  invitation_message text,
  invited_at timestamptz not null default now(),
  responded_at timestamptz,
  start_date date,
  deadline date,
  completed_at timestamptz,
  score int check (score between 0 and 100),
  feedback text,
  unique (project_id, scholar_id)
);

-- Submissions store trainee answers and reviewer feedback.
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.practice_tasks(id) on delete cascade,
  trainee_id uuid not null references public.profiles(id) on delete cascade,
  answer_text text,
  file_url text,
  status public.submission_status not null default 'submitted',
  score int check (score between 0 and 100),
  feedback text,
  reviewed_by uuid references public.profiles(id) on delete set null,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz
);

-- Availability lets trainees tell admins/reviewers when they can do internal practice.
create table if not exists public.availability (
  id uuid primary key default gen_random_uuid(),
  trainee_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  time_block text not null,
  status public.availability_status not null default 'available',
  notes text,
  unique (trainee_id, date, time_block)
);

-- Payments track internal stipends or approved payouts. Trainees only see their own rows.
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  trainee_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric(12, 2) not null check (amount >= 0),
  currency text not null default 'KES',
  reason text not null,
  status public.payment_status not null default 'pending',
  payment_method text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

-- Invoices track project-based earnings and approval status. Scholars see
-- their own invoices; admins can review and update all invoice rows.
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  scholar_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  amount numeric(12, 2) not null check (amount >= 0),
  currency text not null default 'KES' check (currency in ('KES', 'USD')),
  status public.invoice_status not null default 'pending',
  issued_at timestamptz not null default now(),
  paid_at timestamptz,
  notes text
);

-- Scholar documents include self-uploaded files and admin-sent agreements.
create table if not exists public.scholar_documents (
  id uuid primary key default gen_random_uuid(),
  scholar_id uuid not null references public.profiles(id) on delete cascade,
  filename text not null,
  file_url text not null,
  type text not null check (type in ('ID Document', 'Certificate', 'Portfolio', 'Other', 'Agreement')),
  uploaded_by uuid references public.profiles(id) on delete set null,
  sent_by_admin boolean not null default false,
  acknowledged_at timestamptz,
  created_at timestamptz not null default now()
);

-- Announcements are internal messages for the training group.
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Useful indexes for dashboard counts, role checks, joins, and trainee lookups.
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists training_modules_category_idx on public.training_modules(category);
create index if not exists training_modules_status_idx on public.training_modules(status);
create index if not exists training_modules_track_idx on public.training_modules(track);
create index if not exists training_modules_step_idx on public.training_modules(step_number);
create index if not exists training_progress_user_idx on public.training_progress(user_id);
create index if not exists training_progress_module_idx on public.training_progress(module_id);
create index if not exists cv_profiles_user_idx on public.cv_profiles(user_id);
create index if not exists cv_profiles_created_at_idx on public.cv_profiles(created_at);
create index if not exists contact_inquiries_created_at_idx on public.contact_inquiries(created_at);
create index if not exists contact_inquiries_status_idx on public.contact_inquiries(status);
create index if not exists practice_tasks_status_idx on public.practice_tasks(status);
create index if not exists task_assignments_task_idx on public.task_assignments(task_id);
create index if not exists task_assignments_trainee_idx on public.task_assignments(trainee_id);
create index if not exists projects_status_idx on public.projects(status);
create index if not exists project_invitations_scholar_idx on public.project_invitations(scholar_id);
create index if not exists project_invitations_project_idx on public.project_invitations(project_id);
create index if not exists project_invitations_status_idx on public.project_invitations(status);
create index if not exists submissions_status_idx on public.submissions(status);
create index if not exists submissions_task_idx on public.submissions(task_id);
create index if not exists submissions_trainee_idx on public.submissions(trainee_id);
create index if not exists availability_trainee_date_idx on public.availability(trainee_id, date);
create index if not exists availability_date_idx on public.availability(date);
create index if not exists payments_trainee_idx on public.payments(trainee_id);
create index if not exists payments_status_idx on public.payments(status);
create index if not exists invoices_scholar_idx on public.invoices(scholar_id);
create index if not exists invoices_project_idx on public.invoices(project_id);
create index if not exists invoices_status_idx on public.invoices(status);
create index if not exists invoices_issued_at_idx on public.invoices(issued_at);
create index if not exists scholar_documents_scholar_idx on public.scholar_documents(scholar_id);
create index if not exists scholar_documents_uploaded_by_idx on public.scholar_documents(uploaded_by);
create index if not exists scholar_documents_sent_by_admin_idx on public.scholar_documents(sent_by_admin);
create index if not exists scholar_documents_created_at_idx on public.scholar_documents(created_at);

-- Create a profile automatically whenever someone signs up through Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email,
    'trainee',
    'active'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Recreate the trigger safely so repeated setup runs do not fail.
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
