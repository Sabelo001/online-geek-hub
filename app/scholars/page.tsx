import { ArrowRight, BadgeCheck, Bot, BriefcaseBusiness, CheckCircle2, FileText, Headphones, Laptop, MessageSquareText, ShieldCheck, Sparkles, Tags, Users } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/logo";
import { PublicNavbar } from "@/components/public-navbar";

const skills = [
  { title: "AI Training", icon: Bot },
  { title: "Data Annotation", icon: Tags },
  { title: "Audio Transcription", icon: Headphones },
  { title: "AI Evaluation", icon: BadgeCheck },
  { title: "Prompt and Response Review", icon: MessageSquareText },
  { title: "CV and Remote Work Support", icon: FileText },
  { title: "Digital Operations", icon: Laptop }
];

const scholars = [
  {
    name: "Scholar 01",
    focus: "Data Annotation and AI Evaluation",
    status: "Training complete",
    availability: "Available for supervised tasks",
    quality: "Accuracy, rubric consistency, and careful edge-case review"
  },
  {
    name: "Scholar 02",
    focus: "Audio Transcription",
    status: "Practice reviewed",
    availability: "Available for transcription support",
    quality: "Speaker clarity, clean formatting, and careful listening"
  },
  {
    name: "Scholar 03",
    focus: "CV and Remote Work Support",
    status: "Training active",
    availability: "Available for support tasks",
    quality: "Clear writing, profile structure, and practical remote-work readiness"
  },
  {
    name: "Scholar 04",
    focus: "Prompt and Response Review",
    status: "Review-ready",
    availability: "Available for evaluation practice",
    quality: "Relevance, safety, clarity, usefulness, and feedback quality"
  }
];

const process = ["Learn", "Practice", "Review", "Improve", "Deploy"];

export default function ScholarsPage() {
  return (
    <main className="public-page min-h-screen bg-white text-slate-950">
      <PublicNavbar />

      <section className="relative overflow-hidden bg-[#071527] px-4 py-20 text-white sm:px-6 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.22),transparent_30%),linear-gradient(135deg,#071527_0%,#0a2238_56%,#08111f_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-cyan-50">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Scholar program
            </div>
            <h1 className="mt-7 text-5xl font-extrabold leading-tight tracking-normal sm:text-6xl">Online Geek Hub Scholars</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 sm:text-xl">
              A growing network of trained contributors prepared for AI data, transcription, evaluation, and remote digital work.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">What is a Scholar?</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Trained contributors with practical project readiness.</h2>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-lg leading-8 text-slate-700">
              Online Geek Hub Scholars complete training modules, practice tasks, review cycles, scoring, and feedback before joining real project opportunities.
            </p>
            <p className="mt-4 text-sm font-semibold text-slate-500">
              This public page uses safe sample cards only. It does not expose private user emails, phone numbers, or profile records.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Skills represented</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Practical skills for AI and remote operations.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#071527] text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-slate-950">{skill.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Sample public profiles</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Sample Scholar cards</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {scholars.map((scholar) => (
              <article key={scholar.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-950">{scholar.name}</h3>
                    <p className="mt-1 font-semibold text-cyan-700">{scholar.focus}</p>
                  </div>
                  <Users className="h-6 w-6 text-cyan-600" />
                </div>
                <div className="mt-5 grid gap-3 text-sm text-slate-700">
                  <p><span className="font-bold text-slate-950">Training status:</span> {scholar.status}</p>
                  <p><span className="font-bold text-slate-950">Availability:</span> {scholar.availability}</p>
                  <p><span className="font-bold text-slate-950">Quality focus:</span> {scholar.quality}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071527] px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Quality process</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-normal">Scholar Quality Process</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((step, index) => (
              <div key={step} className="rounded-xl border border-white/10 bg-white/10 p-5">
                <div className="flex items-center justify-between">
                  <CheckCircle2 className="h-5 w-5 text-cyan-300" />
                  <span className="text-sm font-bold text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-2xl bg-cyan-300 p-8 text-[#071527] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold">Join the Scholar Program</h2>
            <p className="mt-2 max-w-2xl leading-7 text-slate-800">
              Build practical remote-work skills through structured training, feedback, and practice.
            </p>
          </div>
          <Link href="/signup" className="dark-cta focus-ring inline-flex min-h-12 whitespace-nowrap items-center justify-center rounded-xl bg-slate-950 px-6 text-sm font-bold text-white shadow-sm hover:bg-slate-800 hover:text-white focus:text-white active:text-white">
            Join Training <ArrowRight className="ml-2 h-4 w-4 text-white" />
          </Link>
        </div>
      </section>

      <footer className="bg-[#071527] px-4 py-8 text-slate-300 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <BrandLogo href="/" dark size="sm" />
          <span className="text-sm">Online Geek Hub &copy; 2026. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
