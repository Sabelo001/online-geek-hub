import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Headphones,
  Laptop,
  Layers3,
  LineChart,
  Mail,
  MapPinned,
  MessageSquareText,
  PenTool,
  ShieldCheck,
  Sparkles,
  Tags,
  Users
} from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/logo";
import { PublicNavbar } from "@/components/public-navbar";

const reasons = [
  {
    title: "Trained Scholars",
    description: "A starter team of 12 contributors prepared through modules, practice tasks, and guided feedback.",
    icon: Users
  },
  {
    title: "Review-Based Quality",
    description: "Work is reviewed against clear instructions, scoring rubrics, comments, and revision steps.",
    icon: ShieldCheck
  },
  {
    title: "Remote-First Workforce",
    description: "Scholars are trained for online coordination, documented workflows, and responsible remote delivery.",
    icon: Laptop
  },
  {
    title: "Practical AI Project Skills",
    description: "Training covers data annotation, transcription, AI output review, and digital operations support.",
    icon: Bot
  }
];

const solutions = [
  {
    title: "Data Annotation",
    description: "Structured text, image, audio, video, and document labeling support for pilot AI data projects.",
    icon: Tags
  },
  {
    title: "AI Model Evaluation",
    description: "Human review of AI outputs for accuracy, relevance, clarity, usefulness, and guideline alignment.",
    icon: BadgeCheck
  },
  {
    title: "Audio Transcription",
    description: "Transcription support with clean formatting, speaker clarity, and review before delivery.",
    icon: Headphones
  },
  {
    title: "Prompt and Response Review",
    description: "Prompt and response review using defined rubrics, notes, and feedback standards.",
    icon: MessageSquareText
  },
  {
    title: "CV and Remote Work Support",
    description: "Helping trainees improve CVs, profiles, and applications for credible online work opportunities.",
    icon: FileText
  },
  {
    title: "Training and Talent Preparation",
    description: "Structured modules, practice tasks, scoring, and reviewer feedback for project readiness.",
    icon: BookOpen
  }
];

const domains = [
  { title: "General AI Data", icon: Bot },
  { title: "Language and Transcription", icon: Headphones },
  { title: "Remote Work Operations", icon: BriefcaseBusiness },
  { title: "Agriculture and Community Data", icon: MapPinned },
  { title: "Business and Customer Support", icon: Laptop },
  { title: "Research and Document Review", icon: FileText }
];

const scholarStats = [
  { value: "12", label: "Scholars in Starter Team" },
  { value: "7", label: "Training Tracks" },
  { value: "100", label: "Point Review Rubric" },
  { value: "Remote", label: "First Delivery" }
];

const qualityLoop = [
  { title: "Train", icon: BookOpen },
  { title: "Practice", icon: ClipboardCheck },
  { title: "Review", icon: ShieldCheck },
  { title: "Score", icon: BarChart3 },
  { title: "Improve", icon: LineChart },
  { title: "Deploy", icon: ArrowRight }
];

const portalFeatures = [
  "Training modules",
  "Practice tasks",
  "CV generator",
  "Scholar profiles",
  "Availability tracking",
  "Submissions and reviews",
  "Payment records"
];

export default function LandingPage() {
  return (
    <main className="public-page min-h-screen bg-white text-slate-950">
      <PublicNavbar />

      <section className="relative overflow-hidden bg-[#071527] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_86%_12%,rgba(20,184,166,0.16),transparent_28%),linear-gradient(135deg,#071527_0%,#0a2238_54%,#08111f_100%)]" />
        <div className="relative mx-auto grid max-w-[1500px] gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:min-h-[660px] lg:grid-cols-[0.96fr_0.88fr] lg:items-center lg:gap-16 lg:px-10 lg:py-20 xl:gap-20 xl:px-14 2xl:px-16">
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-cyan-50 shadow-sm shadow-slate-950/20">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Emerging AI workforce and digital skills hub
            </div>
            <h1 className="mt-7 max-w-[780px] text-5xl font-extrabold leading-[1.04] tracking-normal sm:text-6xl lg:text-[68px] xl:text-[76px]">
              Reliable AI Data and Remote Work Support, Trained for Quality
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-100/95 sm:text-xl">
              Online Geek Hub trains and coordinates a small team of Scholars for AI data work, transcription,
              model evaluation, prompt review, CV support, and remote operations.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="cta-primary dark-cta focus-ring"
              >
                Request a Team
              </a>
              <Link
                href="/signup"
                className="cta-primary dark-cta focus-ring"
              >
                Join Training
              </Link>
            </div>
            <p className="mt-7 max-w-2xl text-sm font-semibold leading-6 text-slate-300">
              Built for pilot projects, structured training, review-based quality, and remote-first delivery.
            </p>
          </div>

          <div className="w-full max-w-[680px] justify-self-center rounded-2xl border border-white/12 bg-white/[0.08] p-3 shadow-2xl shadow-slate-950/35 backdrop-blur lg:justify-self-end">
            <div className="rounded-xl bg-white p-4 text-slate-950 shadow-xl sm:p-5">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-700">Scholar workforce</p>
                  <h2 className="mt-1 text-2xl font-extrabold">12 trained Scholars</h2>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-50">
                  <Users className="h-6 w-6 text-cyan-600" />
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {qualityLoop.slice(0, 4).map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="grid grid-cols-[44px_1fr] gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-cyan-700 shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item.title === "Train" && "Structured modules prepare Scholars for common AI data and remote-work tasks."}
                          {item.title === "Practice" && "Internal tasks help contributors build accuracy, consistency, and confidence."}
                          {item.title === "Review" && "Reviewers check work against rubrics before feedback is shared."}
                          {item.title === "Score" && "Scores and notes help identify readiness for supervised pilot work."}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {scholarStats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-4xl font-extrabold text-[#071527]">{stat.value}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="why" className="px-4 py-18 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Why Online Geek Hub</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Small Team. Strong Skills. Quality-Focused Delivery.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              We are building a practical workforce model: train carefully, review consistently, and grow at a responsible pace.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article key={reason.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-300 hover:shadow-md">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#071527] text-cyan-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950">{reason.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{reason.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="solutions" className="bg-slate-50 px-4 py-18 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Solutions</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">AI and Digital Workforce Solutions</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <article key={solution.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-300 hover:shadow-md">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-50 text-cyan-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950">{solution.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{solution.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="domains" className="px-4 py-18 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Domains</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Domains We Can Support</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((domain) => {
              const Icon = domain.icon;
              return (
                <div key={domain.title} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-bold text-slate-950">{domain.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="scholars" className="bg-[#071527] px-4 py-18 text-white sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Scholars</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal">Online Geek Hub Scholars</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Our Scholars are trained contributors with practical skills in AI data work, transcription, prompt review,
              online operations, and digital support. Each Scholar goes through modules, practice tasks, review, scoring,
              and continuous improvement before being considered for project work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/scholars"
                className="cta-secondary focus-ring"
              >
                Meet Our Scholars
              </a>
              <Link
                href="/signup"
                className="cta-primary dark-cta focus-ring"
              >
                Join the Scholar Program
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {scholarStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/10 p-6">
                <p className="text-4xl font-extrabold text-cyan-200">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Quality process</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Our Quality Loop</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Work is handled through clear instructions, rubric-based review, feedback, and revision where needed.
            </p>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {qualityLoop.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <Icon className="h-6 w-6 text-cyan-700" />
                    <span className="text-sm font-bold text-slate-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-950">{step.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-50 px-4 py-18 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Vendor readiness</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Ready for Vendor and Project Partnerships</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Online Geek Hub is preparing to support annotation, AI evaluation, transcription, and digital operations
              through a trained and managed starter team. We are best suited for pilot projects, small batches, and
              gradually scalable workflows after successful delivery.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/contact"
              className="cta-primary dark-cta focus-ring"
            >
              <Mail className="h-4 w-4 text-white" />
              Contact Us
            </Link>
            <Link
              href="/vendor-profile"
              className="cta-secondary focus-ring"
            >
              View Vendor Profile
            </Link>
          </div>
        </div>
      </section>

      <section id="training" className="px-4 py-18 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Private portal</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">A Private Portal for Training and Team Management</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              The portal keeps training, coordination, reviews, availability, and operational records in one simple place.
            </p>
            <Link
              href="/login"
              className="cta-primary dark-cta focus-ring mt-8"
            >
              Login to Portal
            </Link>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link href="/signup" className="cta-secondary focus-ring">
                Join Training
              </Link>
              <Link href="/cv" className="cta-secondary focus-ring">
                CV Generator
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {portalFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-700" />
                <span className="font-semibold text-slate-800">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#071527] px-4 py-10 text-slate-300 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <BrandLogo href="/" dark size="sm" />
            <p className="mt-4 max-w-sm text-sm leading-6">Turn skills into income.</p>
          </div>
          <div>
            <h3 className="font-bold text-white">Solutions</h3>
            <div className="mt-4 grid gap-2 text-sm">
              <a href="#solutions" className="hover:text-white">Data Annotation</a>
              <a href="#solutions" className="hover:text-white">AI Evaluation</a>
              <a href="#solutions" className="hover:text-white">Transcription</a>
              <a href="#solutions" className="hover:text-white">Prompt Review</a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white">Company</h3>
            <div className="mt-4 grid gap-2 text-sm">
              <a href="#why" className="hover:text-white">About</a>
              <a href="#domains" className="hover:text-white">Domains</a>
              <Link href="/scholars" className="hover:text-white">Scholars</Link>
              <a href="#training" className="hover:text-white">Training</a>
              <Link href="/vendor-profile" className="hover:text-white">Vendor Profile</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white">Portal</h3>
            <div className="mt-4 grid gap-2 text-sm">
              <Link href="/login" className="hover:text-white">Training Portal</Link>
              <Link href="/login" className="hover:text-white">Login</Link>
              <Link href="/signup" className="text-white hover:text-white focus:text-white active:text-white">Join Training</Link>
              <Link href="/cv" className="hover:text-white">CV Generator</Link>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-sm text-slate-400">
          Online Geek Hub &copy; 2026. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
