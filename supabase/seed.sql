-- Online Geek Hub seed data
-- Run this file last, after schema.sql, policies.sql, and storage.sql.
-- This creates starter modules, practice tasks, and announcements.
-- It does not create users because users should be created through Supabase Auth.

-- Starter training modules for the training library.
-- The "where not exists" check keeps this safe to rerun without duplicate titles.
insert into public.training_modules (title, description, content, category)
select v.title, v.description, v.content, v.category
from (
  values
    ('Remote Work Foundations', 'Set up your profile, routine, and first-week learning plan.', 'Learn communication, documentation, account safety, and daily progress habits.', 'Remote Work Basics'),
    ('CV That Gets Shortlisted', 'Write a simple, targeted CV for entry-level remote roles.', 'Focus on proof of skill, clean formatting, measurable outcomes, and project links.', 'CV Writing'),
    ('AI Evaluation Basics', 'Practice judging AI outputs with rubrics and safety notes.', 'Compare responses against instructions, score fairly, and explain feedback clearly.', 'AI Evaluation'),
    ('Data Annotation Quality', 'Classify data consistently and flag uncertainty.', 'Practice labeling, edge cases, and rubric-based explanations.', 'Data Annotation'),
    ('Transcription Clean-Up', 'Improve transcript accuracy and formatting.', 'Mark unclear words, preserve speaker turns, and avoid invented content.', 'Audio Transcription'),
    ('Online Hustles Without Confusion', 'Compare beginner-friendly online income paths safely.', 'Learn how to evaluate opportunities, avoid scams, and build proof-of-work projects.', 'Online Hustles'),
    ('Freelancing Profile Basics', 'Prepare a simple, honest service profile.', 'Define your offer, portfolio examples, pricing starter points, and client communication habits.', 'Freelancing Skills')
) as v(title, description, content, category)
where not exists (
  select 1 from public.training_modules tm where tm.title = v.title
);

-- Starter practice tasks. Admins can assign these to trainees after users sign up.
insert into public.practice_tasks (title, task_type, instructions, difficulty, answer_key, status)
select v.title, v.task_type, v.instructions, v.difficulty, v.answer_key, v.status::public.task_status
from (
  values
    ('Rewrite a Remote Work CV Summary', 'CV Tips', 'Rewrite the sample CV summary to be clearer, specific, and beginner-friendly. Do not invent experience.', 'beginner', 'Mentions role target, skills, proof, and honest beginner positioning.', 'active'),
    ('Label Short Product Descriptions', 'Data Annotation', 'Classify each product description into one category and explain ambiguous choices.', 'intermediate', 'Uses consistent labels, flags uncertain items, and follows the rubric.', 'active'),
    ('Transcribe a Practice Audio Clip', 'Audio Transcription', 'Transcribe the provided practice text, mark unclear words, and preserve speaker turns.', 'beginner', 'Accurate text, timestamps where requested, no fabricated words.', 'active'),
    ('Evaluate Two AI Answers', 'AI Evaluation', 'Score two AI answers against a rubric for helpfulness, accuracy, and safety.', 'intermediate', 'Applies the rubric with clear evidence and fair scoring.', 'active'),
    ('Spot a Risky Online Job Post', 'Online Hustles', 'Review a sample job post and list trust signals, red flags, and safe next steps.', 'beginner', 'Identifies unrealistic pay, payment-before-work requests, vague identity, and safe verification steps.', 'active')
) as v(title, task_type, instructions, difficulty, answer_key, status)
where not exists (
  select 1 from public.practice_tasks pt where pt.title = v.title
);

-- Starter announcements for all signed-in users.
insert into public.announcements (title, message)
select v.title, v.message
from (
  values
    ('Welcome to Online Geek Hub', 'This portal is for internal training, practice, review, availability, and payment tracking only.'),
    ('Safety reminder', 'Do not share passwords, client data, or third-party platform account access.'),
    ('Practice first', 'Use assigned practice tasks to build skill before doing any paid internal work.')
) as v(title, message)
where not exists (
  select 1 from public.announcements a where a.title = v.title
);
