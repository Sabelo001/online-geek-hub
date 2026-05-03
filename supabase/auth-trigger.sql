-- Creates an active trainee profile for every new Supabase Auth user.
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

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Make sure authenticated users can read their own profile after login.
alter table public.profiles enable row level security;

drop policy if exists "profiles_self_read" on public.profiles;

create policy "profiles_self_read"
on public.profiles for select
to authenticated
using (id = auth.uid());
