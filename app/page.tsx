import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  ClipboardCheck,
  FileText,
  Headphones,
  Layers3,
  Laptop,
  LineChart,
  Sparkles,
  Tags,
  Users
} from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/logo";

const services = [
  {
    title: "CV Tips",
    description: "Build a clean, honest remote-work CV with simple proof-of-skill sections.",
    icon: FileText
  },
  {
    title: "Online Hustles",
    description: "Learn how to compare online opportunities, avoid scams, and start safely.",
    icon: Tags
  },
  {
    title: "AI Projects",
    description: "Practice small AI workflows, prompt reviews, and portfolio-friendly tasks.",
    icon: Bot
  },
  {
    title: "Data Annotation",
    description: "Train on labeling quality, edge cases, rubrics, and consistency checks.",
    icon: BriefcaseBusiness
  },
  {
    title: "Audio Transcription",
    description: "Practice accuracy, speaker turns, unclear words, and formatting discipline.",
    icon: Headphones
  },
  {
    title: "Freelancing Skills",
    description: "Prepare service offers, client communication habits, and delivery routines.",
    icon: Laptop
  }
];

const stats = [
  { value: "7", label: "training tracks" },
  { value: "100", label: "point review rubric" },
  { value: "5", label: "core work skills" },
  { value: "0", label: "third-party platform access" }
];

const workflow = [
  { title: "Learn", description: "Short modules explain the task, quality bar, and safety rules.", icon: Layers3 },
  { title: "Practice", description: "Trainees complete internal tasks with clear instructions.", icon: ClipboardCheck },
  { title: "Improve", description: "Reviewers score work, leave feedback, and request revisions.", icon: LineChart }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <BrandLogo href="/" size="md" />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a href="#training" className="hover:text-slate-950">
              Training
            </a>
            <a href="#services" className="hover:text-slate-950">
              Skills
            </a>
            <a href="#workflow" className="hover:text-slate-950">
              Workflow
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="focus-ring rounded-md px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">
              Login
            </Link>
            <Link
              href="/signup"
              className="focus-ring hidden min-h-10 items-center justify-center rounded-md bg-[#071527] px-4 text-sm font-bold text-white shadow-sm hover:bg-slate-800 hover:text-white sm:inline-flex"
            >
              Join Training
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#071527] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.28),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(6,182,212,0.18),transparent_30%),linear-gradient(135deg,#071527_0%,#0b2742_52%,#08111f_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:min-h-[720px] lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/10 px-3 py-1 text-sm font-semibold text-cyan-100">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Turn skills into income
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight tracking-normal sm:text-6xl lg:text-7xl">
              Remote work training that feels clear from day one.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-100 sm:text-xl">
              Making remote work less confusing. Learn, build, earn with guided practice in AI projects, data annotation,
              transcription, CV tips, online hustles, and freelancing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="focus-ring inline-flex min-h-12 min-w-40 items-center justify-center rounded-md bg-cyan-400 px-6 text-sm font-bold text-[#071527] shadow-lg shadow-cyan-950/30 hover:bg-cyan-300 hover:text-[#071527]"
              >
                Join Training
              </Link>
              <Link
                href="/login"
                className="focus-ring inline-flex min-h-12 min-w-32 items-center justify-center rounded-md border border-slate-200 bg-white px-6 text-sm font-bold text-[#071527] shadow-sm hover:bg-sky-50 hover:text-[#071527]"
              >
                Login
              </Link>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-300">
              Built for internal training, practice, reviews, scores, availability, and payment tracking. No scraping,
              automation, proxying, account sharing, or third-party platform access.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/10 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur">
            <div className="rounded-md bg-white p-5 text-slate-950">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-700">Training portal</p>
                  <h2 className="mt-1 text-2xl font-bold">Online Geek Hub</h2>
                </div>
                <BadgeCheck className="h-8 w-8 text-cyan-600" />
              </div>
              <div className="mt-5 grid gap-3">
                {workflow.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="grid grid-cols-[44px_1fr] gap-3 rounded-md border border-slate-200 p-4">
                      <div className="grid h-11 w-11 place-items-center rounded-md bg-cyan-50 text-cyan-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="training" className="border-b border-slate-200 bg-slate-50 px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-4xl font-bold text-[#071527]">{stat.value}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="px-4 py-18 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Skill tracks</p>
            <h2 className="mt-3 text-4xl font-bold tracking-normal text-slate-950">Practice the work before the work.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              The portal keeps learning, assignments, reviews, scores, and payments in one simple place for beginners.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-300 hover:shadow-md">
                  <div className="grid h-12 w-12 place-items-center rounded-md bg-[#071527] text-cyan-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950">{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-[#071527] px-4 py-16 text-white sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Quality loop</p>
            <h2 className="mt-3 text-4xl font-bold tracking-normal">A simple system for learning, review, and progress.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {workflow.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-white/10 bg-white/10 p-5">
                  <Icon className="h-6 w-6 text-cyan-300" />
                  <h3 className="mt-4 font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-lg bg-cyan-400 p-8 text-[#071527] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold">Ready to make remote work less confusing?</h2>
            <p className="mt-2 max-w-2xl text-slate-800">Join the training portal and start building practical online work skills.</p>
          </div>
          <Link
            href="/signup"
            className="focus-ring inline-flex min-h-12 min-w-40 items-center justify-center rounded-md border border-[#071527] bg-white px-6 text-sm font-bold text-[#071527] shadow-sm hover:bg-sky-50 hover:text-[#071527]"
          >
            Join Training <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="bg-[#071527] px-4 py-8 text-slate-300 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <BrandLogo href="/" dark size="sm" />
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/signup" className="hover:text-white">
              Join Training
            </Link>
            <Link href="/login" className="hover:text-white">
              Login
            </Link>
            <span>Online Geek Hub &copy; 2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
