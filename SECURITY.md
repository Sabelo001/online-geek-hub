# Security Policy

Online Geek Hub is an internal training, practice, review, scoring, availability, and payment tracking portal.

It is not a third-party work-platform tool. It must never be used to access, scrape, automate, proxy, bypass, or coordinate account sharing for any external client system or work platform.

## Allowed Use

Use Online Geek Hub only for:

- Internal training
- Practice tasks
- Reviewer feedback
- Score tracking
- Availability coordination
- Internal payment tracking
- Team announcements

## Prohibited Use

Do not use this app to:

- Share third-party platform logins
- Store third-party platform passwords
- Help people bypass platform terms or access rules
- Scrape third-party websites or work platforms
- Automate tasks on external work platforms
- Proxy, embed, or mirror client systems
- Coordinate account sharing
- Upload confidential client data without written permission
- Upload client secrets, private datasets, production credentials, or private platform content

Examples of third-party platforms include iMerit, Ango, Remotasks, Outlier, and any client-owned system.

## Auth And Route Protection

- Supabase Auth handles login and signup.
- Protected app routes are guarded by `proxy.ts` and server-side checks.
- Admin-only pages must call server-side role checks.
- Reviewer-only pages must call server-side role checks.
- Do not rely on client-side UI hiding as the only permission check.

## Role Rules

Admin:
- Can read and write all internal app records.
- Can manage users, training modules, practice tasks, reviews, assignments, availability, payments, and announcements.

Reviewer:
- Can read practice tasks.
- Can read and update submissions for review, scoring, feedback, approval, rejection, or revision requests.
- Must not manage users, payments, or system settings.

Trainee:
- Can read training modules.
- Can read assigned practice tasks.
- Can create and read their own submissions.
- Can create, read, and update their own availability.
- Can read their own payments only.

## Supabase RLS

- Row Level Security must stay enabled on every app table.
- Run `supabase/policies.sql` before using the app in production.
- Do not disable RLS to fix permission problems. Fix the specific policy instead.
- Test each role with a separate account before launch.

## Trainee Data Privacy

- Trainees must not be able to read other trainees' submissions.
- Trainees must not be able to read other trainees' payments.
- Trainees must not be able to update reviews, scores, or feedback.
- Leaderboards and dashboards should avoid exposing unnecessary private data.

## File Uploads And Storage

- Storage buckets must be private.
- `training-files` is for internal training resources.
- `submission-files` is for trainee submission files.
- Review storage policies before enabling any upload UI.
- Do not upload confidential client data without permission.
- Do not upload third-party credentials, platform screenshots containing private data, or client-owned source data.

## Environment Variables

Required browser-safe variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Rules:

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code.
- Do not prefix service-role secrets with `NEXT_PUBLIC_`.
- Do not commit `.env.local`.
- Add production environment variables only through Vercel project settings.
- Rotate any key that is accidentally shared.

## Third-Party Platform Boundary

Online Geek Hub must not include features for:

- Scraping
- Browser automation against work platforms
- Account sharing
- Password sharing
- Platform rule bypassing
- External client-system proxying
- Credential collection for third-party systems

If a future feature looks like it could touch an external platform, stop and review it before building.

## UI And Login Safety

- Login links must point to `/login`.
- Signup and Join Training links must point to `/signup`.
- Button text must remain visible in normal and hover states.
- Do not hide security warnings in low-contrast text.

## Reporting Issues

Report security issues to the project owner or repository maintainer. Include:

- Affected route, table, or storage bucket
- Steps to reproduce
- Expected behavior
- Actual behavior
- Whether data exposure or privilege escalation is possible

## Deployment Checklist

- Run `supabase/schema.sql`.
- Run `supabase/policies.sql`.
- Run `supabase/storage.sql`.
- Run `supabase/seed.sql`.
- Confirm RLS is enabled on every app table.
- Confirm storage buckets are private.
- Promote the first admin account intentionally.
- Set Supabase Auth redirect URLs.
- Set Vercel environment variables.
- Use HTTPS in production.
- Test Admin, Reviewer, and Trainee accounts separately.
- Review storage policies before enabling file uploads.
