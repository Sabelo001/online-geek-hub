# Online Geek Hub

Online Geek Hub is a training and team-management portal for people learning remote work and AI-related tasks.

**Tagline:** Turn skills into income  
**Message:** Making remote work less confusing. Learn, build, earn.

## What The App Does

- Training modules for CV writing, remote work basics, data annotation, transcription, AI evaluation, online hustles, and freelancing skills
- Free CV Generator for beginner-friendly remote work CVs
- Internal practice tasks, task submissions, reviewer feedback, and scores
- Availability tracking for trainees
- Payment tracking for internal stipends or approved payouts
- Admin, Reviewer, and Trainee roles
- Supabase Auth, Database, Storage, and Row Level Security

## Safety Boundary

This app is only for training, practice, coordination, internal reviews, quality control, availability, and payment tracking.

It must not connect to, scrape, embed, automate, proxy, bypass, or otherwise interact with third-party work platforms or client systems such as iMerit, Ango, Remotasks, Outlier, or similar services. It must not support password sharing, account sharing, or credential collection for external platforms.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Database, and Storage
- Vercel
- npm

## 1. Run Locally

Open a terminal in this project folder.

Install dependencies:

```bash
npm install
```

Create your local environment file:

```bash
cp .env.example .env.local
```

On Windows PowerShell, use this if `cp` does not work:

```powershell
Copy-Item .env.example .env.local
```

Start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Supabase keys are required for authenticated app features.

## 2. Create A Supabase Project

1. Go to `https://supabase.com`.
2. Sign in or create an account.
3. Click **New project**.
4. Choose an organization.
5. Enter a project name, for example `online-geek-hub`.
6. Create a database password and save it somewhere safe.
7. Choose a region close to your users.
8. Click **Create new project**.
9. Wait for Supabase to finish creating the project.

## 3. Run The SQL Files

Run these files in the Supabase SQL Editor in this exact order:

1. `supabase/schema.sql`
2. `supabase/policies.sql`
3. `supabase/storage.sql`
4. `supabase/seed.sql`

Detailed steps:

1. Open your Supabase project dashboard.
2. Click **SQL Editor** in the left sidebar.
3. Click **New query**.
4. Open `supabase/schema.sql` in this project.
5. Copy the full file.
6. Paste it into the Supabase SQL Editor.
7. Click **Run**.
8. Repeat the same process for `policies.sql`, then `storage.sql`, then `seed.sql`.

What the files do:

- `schema.sql`: creates UUID support, database types, tables, foreign keys, indexes, and the automatic profile trigger.
- `policies.sql`: enables Row Level Security and adds Admin, Reviewer, and Trainee permissions.
- `storage.sql`: creates storage buckets and file access policies.
- `seed.sql`: adds starter training modules, practice tasks, and announcements.

The CV Generator uses the `public.cv_profiles` table. Run the latest `schema.sql` and `policies.sql` whenever this feature is added to an existing Supabase project.
CV records include a `plan` field for future services: `free`, `premium`, and `professional_review`. All access remains free for now; no payment integration is included.

## 4. Create Storage Buckets

The file `supabase/storage.sql` creates these buckets automatically:

- `training-files`
- `submission-files`

To confirm:

1. Go to Supabase.
2. Click **Storage**.
3. Confirm both buckets are listed.

If they are missing, run `supabase/storage.sql` again in the SQL Editor.

## 5. Get Supabase URL And Anon Key

1. In Supabase, go to **Project Settings**.
2. Click **API**.
3. Copy the **Project URL**.
4. Copy the **anon public** key.

Do not use the service role key in the browser. The app only needs the anon public key.

## 6. Add Environment Variables Locally

Open `.env.local` and add:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Restart the dev server after editing `.env.local`:

```bash
npm run dev
```

If it was already running, stop it with `Ctrl+C`, then run `npm run dev` again.

## 7. Test Signup And Login Locally

1. Open `http://localhost:3000/signup`.
2. Create your first user.
3. Open `http://localhost:3000/login`.
4. Login with the same email and password.

Promote your first user to Admin:

```sql
update public.profiles
set role = 'admin', status = 'active'
where email = 'you@example.com';
```

Optional reviewer setup:

```sql
update public.profiles
set role = 'reviewer', status = 'active'
where email = 'reviewer@example.com';
```

Optional trainee activation:

```sql
update public.profiles
set status = 'active'
where email = 'trainee@example.com';
```

## 8. Push To GitHub

If this folder is not already a Git repository, run:

```bash
git init
git add .
git commit -m "Initial Online Geek Hub MVP"
```

Create a new GitHub repository:

1. Go to `https://github.com`.
2. Click **New repository**.
3. Name it `online-geek-hub`.
4. Do not add a README from GitHub because this project already has one.
5. Click **Create repository**.

Connect your local project to GitHub:

```bash
git remote add origin https://github.com/YOUR_USERNAME/online-geek-hub.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

Important: do not commit `.env.local`. It is ignored by `.gitignore`.

## 9. Deploy To Vercel

1. Go to `https://vercel.com`.
2. Sign in with GitHub.
3. Click **Add New**.
4. Click **Project**.
5. Import your `online-geek-hub` GitHub repository.
6. Vercel should detect Next.js automatically.
7. Do not deploy yet if environment variables are missing.

## 10. Add Environment Variables In Vercel

In the Vercel project setup screen:

1. Find **Environment Variables**.
2. Add:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Click **Deploy**.

If the project is already deployed:

1. Open the project in Vercel.
2. Go to **Settings**.
3. Click **Environment Variables**.
4. Add the same two variables.
5. Go to **Deployments**.
6. Redeploy the latest deployment.

## 11. Configure Supabase Auth URLs

After Vercel deploys, copy your Vercel URL, for example:

```text
https://online-geek-hub.vercel.app
```

In Supabase:

1. Go to **Authentication**.
2. Click **URL Configuration**.
3. Set **Site URL** to your deployed Vercel URL.
4. Add these redirect URLs:

```text
http://localhost:3000
http://localhost:3000/login
http://localhost:3000/signup
https://online-geek-hub.vercel.app
https://online-geek-hub.vercel.app/login
https://online-geek-hub.vercel.app/signup
```

Replace `https://online-geek-hub.vercel.app` with your real Vercel URL.

## 12. Test Login And Signup After Deployment

1. Open your Vercel URL.
2. Click **Join Training**.
3. Create a new account.
4. Check Supabase **Authentication** -> **Users** to confirm the user exists.
5. Check Supabase **Table Editor** -> `profiles` to confirm a profile row was created.
6. Open `/login`.
7. Login with the same account.
8. Confirm the dashboard loads.

If signup requires email confirmation, check the email inbox or disable email confirmation temporarily in Supabase Auth settings while testing.

## 13. Connect A Custom Domain Later

In Vercel:

1. Open your project.
2. Go to **Settings**.
3. Click **Domains**.
4. Add your domain, for example:

```text
onlinegeekhub.com
```

5. Follow Vercel's DNS instructions.
6. Wait for DNS to verify.

In Supabase:

1. Go to **Authentication** -> **URL Configuration**.
2. Change **Site URL** to your custom domain.
3. Add redirect URLs for the custom domain:

```text
https://onlinegeekhub.com
https://onlinegeekhub.com/login
https://onlinegeekhub.com/signup
```

Keep the Vercel URL as an extra redirect while testing.

## 14. Common Errors And Fixes

### `npm` is not recognized

Node.js is not installed or not on PATH.

Fix:

1. Install Node.js from `https://nodejs.org`.
2. Close and reopen your terminal.
3. Run:

```bash
node -v
npm -v
```

### Missing Supabase environment variables

Symptoms:

- Signup does not work
- Login does not work
- App stays in demo mode

Fix:

1. Check `.env.local`.
2. Confirm both variables exist.
3. Restart `npm run dev`.

### Build fails on Vercel

Fix:

1. Confirm `npm run build` passes locally.
2. Confirm Vercel has both Supabase environment variables.
3. Redeploy after saving environment variables.

### Signup works but profile is missing

The trigger may not be installed.

Fix:

1. Run `supabase/schema.sql` again.
2. Sign up with a new test user.
3. Check the `profiles` table.

### Trainee cannot see practice tasks

Trainees only see assigned tasks.

Fix by assigning a task:

```sql
insert into public.task_assignments (task_id, trainee_id, assigned_by, due_date)
select
  t.id,
  trainee.id,
  admin.id,
  current_date + interval '7 days'
from public.practice_tasks t
cross join public.profiles trainee
cross join public.profiles admin
where t.title = 'Rewrite a Remote Work CV Summary'
  and trainee.email = 'trainee@example.com'
  and admin.email = 'admin@example.com'
limit 1;
```

### CV Generator table is missing

Symptoms:

- `/cv` loads but creating a CV fails
- Supabase error mentions `cv_profiles`

Fix:

1. Run the latest `supabase/schema.sql`.
2. Run the latest `supabase/policies.sql`.
3. Login again and open `/cv`.

### Storage buckets are missing

Fix:

1. Run `supabase/storage.sql`.
2. Go to Supabase **Storage**.
3. Confirm `training-files` and `submission-files` exist.

### Login redirects back to login

Possible causes:

- Supabase keys are wrong
- Auth cookies are blocked
- Site URL or redirect URLs are wrong

Fix:

1. Check environment variables.
2. Check Supabase Auth URL Configuration.
3. Try a private/incognito browser window.

### Vercel deployment uses old environment variables

Fix:

1. Update variables in Vercel project settings.
2. Redeploy.
3. Do not only refresh the browser; Vercel needs a new deployment.

## Role Permissions

Admin:
- Create, edit, and delete training modules and practice tasks
- Assign tasks
- View users and analytics
- Change roles
- Review submissions
- Manage payments

Reviewer:
- View practice tasks
- View pending submissions
- Score from 0 to 100
- Leave feedback
- Approve, reject, or request revisions

Trainee:
- View training modules
- Create, edit, print, and delete own CVs
- View assigned tasks
- Submit answers
- View own feedback and scores
- Update availability
- View own payments

## Folder Structure

```text
app/
components/
lib/
supabase/
  schema.sql
  policies.sql
  seed.sql
  storage.sql
public/
README.md
SECURITY.md
.env.example
package.json
```

## Production Notes

- Keep RLS enabled on all tables.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.
- Do not commit `.env.local`.
- Add audit logging before handling high-value payments.
- Enable file upload UI only after storage policies are verified in Supabase.
