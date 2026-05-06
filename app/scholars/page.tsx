import { BadgeCheck, Bot, Briefcase, CheckCircle2, FileText, GraduationCap, Headphones, Laptop, Lock, MessageSquareText, Sparkles, Star, Tags, Users } from "lucide-react";
import Link from "next/link";
import { PublicFooter } from "@/components/public-footer";
import { PublicNavbar } from "@/components/public-navbar";

export const metadata = {
  title: "Scholars — Online Geek Hub",
  description: "Meet the Online Geek Hub Scholar team. Trained contributors prepared for AI data work, transcription, evaluation, and remote operations."
};

const skills = [
  {
    title: "AI Training",
    description: "Completing structured learning modules and passing readiness checks.",
    icon: Bot
  },
  {
    title: "Data Annotation",
    description: "Text and image labeling following task-specific guidelines.",
    icon: Tags
  },
  {
    title: "Audio Transcription",
    description: "English and Swahili transcription with speaker and format accuracy.",
    icon: Headphones
  },
  {
    title: "AI Evaluation",
    description: "Reviewing AI outputs for quality, accuracy, and instruction-following.",
    icon: BadgeCheck
  },
  {
    title: "Prompt and Response Review",
    description: "Identifying errors, tone issues, and guideline violations in AI content.",
    icon: MessageSquareText
  },
  {
    title: "CV and Remote Work Support",
    description: "Digital task handling, profile building, and structured remote operations.",
    icon: FileText
  },
  {
    title: "Digital Operations",
    description: "Document review, data entry, and process-based remote task execution.",
    icon: Laptop
  }
];

const scholars = [
  {
    name: "Scholar 01",
    focus: "Data annotation and AI evaluation",
    status: "Training complete",
    availability: "Available for supervised tasks",
    quality: "Accuracy, rubric consistency, and careful review of edge cases"
  },
  {
    name: "Scholar 02",
    focus: "Audio transcription",
    status: "Practice reviewed",
    availability: "Available for transcription support",
    quality: "Speaker clarity, clean formatting, and careful listening"
  },
  {
    name: "Scholar 03",
    focus: "CV and remote work support",
    status: "Training active",
    availability: "Available for support tasks",
    quality: "Clear writing, profile structure, and practical remote-work readiness"
  },
  {
    name: "Scholar 04",
    focus: "Prompt and response review",
    status: "Review-ready",
    availability: "Available for evaluation practice",
    quality: "Relevance, safety, clarity, usefulness, and feedback quality"
  }
];

const process = [
  {
    title: "Train",
    description: "Structured curriculum covering task types, domain knowledge, and quality standards before live work."
  },
  {
    title: "Practice",
    description: "Supervised tasks that mirror real work conditions before any active assignment."
  },
  {
    title: "Review",
    description: "Output is checked against task-specific guidelines before it moves forward."
  },
  {
    title: "Score",
    description: "Accuracy and consistency scores are recorded for every Scholar per task."
  },
  {
    title: "Improve",
    description: "Feedback from scoring feeds back into targeted practice and Scholar development."
  },
  {
    title: "Deploy",
    description: "Scholars cleared on a task type are assigned to active work with ongoing review maintained."
  }
];

const scholarStats = [
  { number: "12", label: "Trained Scholars" },
  { number: "7", label: "Training Tracks" },
  { number: "6", label: "Skill Domains" },
  { number: "1", label: "Week to Ready" }
];

const scholarDifferentiators = [
  {
    title: "Structured Before Deployed",
    description: "Every Scholar completes a full onboarding track before taking on any project work. No guesswork, no shortcuts."
  },
  {
    title: "Review at Every Stage",
    description:
      "Work is not self-assessed. Every submission goes through a review cycle with scores tracked and feedback given at the Scholar level."
  },
  {
    title: "Small Team, Direct Coordination",
    description:
      "We are not a crowd platform. Tasks are assigned, tracked, and coordinated by internal team leads - giving clients direct accountability."
  }
];

const scholarRoles = [
  {
    title: "Data Annotator",
    description: "Labels text, images, and structured data following task-specific guidelines."
  },
  {
    title: "AI Evaluator",
    description: "Reviews AI-generated outputs for quality, accuracy, tone, and instruction-following."
  },
  {
    title: "Transcriptionist",
    description: "Converts audio to text in English and Swahili with speaker and format accuracy."
  },
  {
    title: "Prompt Reviewer",
    description: "Checks prompts and responses for errors, safety, and guideline compliance."
  },
  {
    title: "Remote Operations",
    description: "Handles structured digital tasks including data entry, document review, and process execution."
  },
  {
    title: "Research Contributor",
    description: "Reads, extracts, and organizes information from documents, forms, and research materials."
  }
];

const scholarProgramBenefits = [
  {
    title: "Structured Training",
    description: "Complete a guided onboarding track before any live work.",
    icon: GraduationCap
  },
  {
    title: "Scored and Reviewed",
    description: "Get feedback on every submission and track your progress.",
    icon: Star
  },
  {
    title: "Project Placement",
    description: "Top Scholars get first access to incoming project invitations.",
    icon: Briefcase
  }
];

export default function ScholarsPage() {
  return (
    <main className="public-page min-h-screen bg-white text-slate-950">
      <PublicNavbar />

      <section className="relative overflow-hidden bg-[#071527] px-4 pb-12 pt-20 text-white sm:px-6 sm:pb-12 sm:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.22),transparent_30%),linear-gradient(135deg,#071527_0%,#0a2238_56%,#08111f_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] md:items-center">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-cyan-50">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Scholar Program
            </div>
            <h1 className="mt-7 text-5xl font-extrabold leading-tight tracking-normal sm:text-6xl">Online Geek Hub Scholars</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 sm:text-xl">
              A small but growing network of trained contributors prepared for AI data work, transcription, evaluation,
              prompt review, and remote digital support.
            </p>
            <div className="mt-8 flex flex-col flex-nowrap gap-3 sm:flex-row">
              <Link href="/signup" className="cta-primary dark-cta focus-ring">
                Join Scholars
              </Link>
              <a
                href="https://www.linkedin.com/company/online-geek-hub/jobs/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary focus-ring"
              >
                View Jobs
              </a>
              <Link href="/contact" className="cta-secondary focus-ring">
                Request a Team
              </Link>
            </div>
          </div>
          <img
            src="/images/scholars-hero.jpg"
            alt="Remote contributor working at a professional desk setup"
            className="h-[240px] w-full rounded-xl object-cover object-center md:h-[440px]"
          />
        </div>
      </section>

      <section className="border-y border-[#e2e8f0] bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {scholarStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-4 text-center ${index % 2 === 1 ? "border-l border-[#e2e8f0]" : ""} lg:border-l lg:first:border-l-0`}
            >
              <p className="text-[48px] font-extrabold leading-none text-[#0f172a]">{stat.number}</p>
              <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.12em] text-[#64748b]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-8 pt-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">What is a Scholar?</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Trained Contributors. Task-Ready From Day One.</h2>
            <img
              src="/images/scholars-team.jpg"
              alt="Small team of contributors working on laptops"
              className="mt-6 h-[180px] w-full max-w-[380px] rounded-[10px] object-cover object-top sm:h-[220px]"
            />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-lg leading-8 text-slate-700">
              Online Geek Hub Scholars are trained remote contributors prepared for AI data work, transcription,
              evaluation, prompt review, and digital operations. Every Scholar completes structured training,
              supervised practice, and a review cycle before being considered for project work.
            </p>
            <div className="mt-5 flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-[13px] font-normal leading-6 text-[#475569]">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#0A6EFF]" />
              <p>
                Scholar details are shared only with permission and only where relevant to approved project discussions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Scholar Roles</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">What Our Scholars Work On</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Our Scholars are matched to tasks based on their training track and review scores.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {scholarRoles.map((role) => (
              <article key={role.title} className="rounded-lg border border-t-[3px] border-[#e2e8f0] border-t-[#06b6d4] bg-white p-5">
                <h3 className="text-[14px] font-semibold text-slate-950">{role.title}</h3>
                <p className="mt-2 text-[13px] font-normal leading-6 text-[#64748b]">{role.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">Why OGH Scholars</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">What Sets Our Scholars Apart</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {scholarDifferentiators.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition hover:border-cyan-300 hover:shadow-md"
              >
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">{item.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Skills represented</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Practical skills for AI data and remote operations.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#071527] text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-slate-950">{skill.title}</h3>
                  <p className="mt-2 text-[13px] font-normal leading-6 text-[#64748B]">{skill.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Sample public profiles</p>
          <h2 className="mt-3 overflow-visible pl-1 text-4xl font-extrabold tracking-normal text-slate-950">Sample Scholar cards</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {scholars.map((scholar) => (
              <article key={scholar.name} className="rounded-2xl border border-t-[3px] border-slate-200 border-t-[#0A6EFF] bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-950">{scholar.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-cyan-700">{scholar.focus}</p>
                  </div>
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-[#0A6EFF] bg-[#0F172A]">
                    <Users className="h-5 w-5 text-[#0A6EFF]" />
                  </div>
                </div>
                <div className="mt-5">
                  <p className="border-b border-[#F1F5F9] py-2">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">Training status</span>
                    <span className="mt-1 block text-[13px] font-normal text-[#334155]">{scholar.status}</span>
                  </p>
                  <p className="border-b border-[#F1F5F9] py-2">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">Availability</span>
                    <span className="mt-1 block text-[13px] font-normal text-[#334155]">{scholar.availability}</span>
                  </p>
                  <p className="py-2">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">Quality focus</span>
                    <span className="mt-1 block text-[13px] font-normal text-[#334155]">{scholar.quality}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071527] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="text-[80px] leading-[0.5] text-[#06b6d4]">"</p>
          <p className="mt-6 text-center text-[20px] font-normal leading-[1.8] text-white">
            Being part of Online Geek Hub has given me a structured path into AI data work. The training process is clear,
            the feedback is direct, and the team actually cares about your development.
          </p>
          <p className="mt-6 text-center text-[13px] font-medium text-[#06b6d4]">— Scholar 01, Data Annotation Track</p>
        </div>
      </section>

      <section className="bg-[#071527] px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Quality process</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-normal">Scholar Quality Process</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-white/10 bg-white/10 p-5">
                <div className="flex items-center justify-between">
                  <CheckCircle2 className="h-5 w-5 text-cyan-300" />
                  <span className="text-sm font-bold text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                {step.description ? (
                  <p className="mt-2 text-sm font-normal leading-6 text-slate-300">{step.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-2xl bg-[#0F172A] p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-[#06b6d4]">Become a Scholar</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-white">Build Real Skills. Do Real Work.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/75">
              The Online Geek Hub Scholar Program is open to motivated contributors ready to train, practice, and take on
              structured AI data work. We prepare you before we place you.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {scholarProgramBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.title} className="rounded-lg border border-[#1e3a5f] bg-[#0f2035] p-5">
                  <Icon className="h-6 w-6 text-[#06b6d4]" />
                  <h3 className="mt-4 text-base font-bold text-white">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{benefit.description}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className="cta-primary dark-cta focus-ring">
              Join Scholars
            </Link>
            <a
              href="https://www.linkedin.com/company/online-geek-hub/jobs/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-[2.75rem] items-center justify-center rounded border border-white/70 bg-transparent px-5 font-display text-[1.05rem] uppercase tracking-[0.07em] text-white transition hover:border-white hover:bg-white/10"
            >
              View Jobs
            </a>
            <Link
              href="/contact"
              className="focus-ring inline-flex min-h-[2.75rem] items-center justify-center rounded border border-white/70 bg-transparent px-5 font-display text-[1.05rem] uppercase tracking-[0.07em] text-white transition hover:border-white hover:bg-white/10"
            >
              Request a Team
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
