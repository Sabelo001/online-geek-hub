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
    title: "Managed Internally",
    description: "Our team operates under direct internal coordination. Tasks are assigned, tracked, and reviewed by team leads, so clients do not have to manage individual contributors themselves.",
    icon: Users
  },
  {
    title: "Skills That Match Real Work",
    description: "Our training tracks are built around tasks AI projects actually need: annotation, evaluation, transcription, prompt review, and data support.",
    icon: Laptop
  },
  {
    title: "Every Output Is Reviewed",
    description: "Every submission passes through a structured review process before delivery, with scores tracked at Scholar level.",
    icon: ShieldCheck
  }
];

const solutions = [
  {
    title: "Data Annotation",
    description: "Text, image, and task-level annotation delivered by trained contributors following structured guidelines and reviewed for accuracy before submission.",
    icon: Tags
  },
  {
    title: "AI Model Evaluation",
    description: "Human evaluation of AI-generated outputs, including response quality, instruction-following, tone, and factual accuracy, using task-specific rubrics.",
    icon: BadgeCheck
  },
  {
    title: "Transcription",
    description: "Audio-to-text transcription in English and Swahili, with support for code-switching, speaker labeling, and formatting to client specifications.",
    icon: Headphones
  },
  {
    title: "Prompt and Response Review",
    description: "Structured review of prompts, model responses, and conversation flows to identify errors, inconsistencies, and guideline violations.",
    icon: MessageSquareText
  },
  {
    title: "Remote Operations Support",
    description: "Flexible remote contributor support for data processing, document review, form handling, and structured digital tasks, coordinated and tracked internally.",
    icon: BriefcaseBusiness
  },
  {
    title: "Training and Talent Preparation",
    description: "We build task-ready contributors through structured internal tracks and can prepare contributors for clearly defined project needs.",
    icon: BookOpen
  }
];

const domains = [
  {
    title: "General AI Data",
    description: "Classification, labeling, ranking, and structured output review across common AI development tasks.",
    icon: Bot
  },
  {
    title: "Language and Transcription",
    description: "English and Swahili text and audio work, including transcription, translation support, and language data collection.",
    icon: Headphones
  },
  {
    title: "Business and Customer Support",
    description: "Response evaluation, conversation review, and document handling for operations-facing AI applications.",
    icon: Laptop
  },
  {
    title: "Agriculture and Community Data",
    description: "Structured data collection and review tasks rooted in rural and community contexts.",
    icon: MapPinned
  },
  {
    title: "Research and Document Review",
    description: "Reading, extracting, and organizing information from documents, forms, and research materials.",
    icon: FileText
  },
  {
    title: "Remote Work Operations",
    description: "Ongoing digital task support including data entry, record management, scheduling assistance, and structured process execution.",
    icon: BriefcaseBusiness
  }
];

const scholarStats = [
  { value: "12", label: "Scholars" },
  { value: "7", label: "Training Tracks" },
  { value: "Review-Based", label: "Quality" },
  { value: "Remote-First", label: "Delivery" }
];

const qualityLoop = [
  {
    title: "Train",
    description: "Every Scholar starts with structured training covering task types, domain knowledge, and quality standards.",
    heroDescription: "Each Scholar completes structured training covering AI data fundamentals, task-specific skills, and quality standards before taking on live work.",
    icon: BookOpen
  },
  {
    title: "Practice",
    description: "Scholars complete supervised practice tasks that mirror real client work.",
    heroDescription: "Scholars complete supervised practice tasks under real conditions, building speed and accuracy before moving to active assignments.",
    icon: ClipboardCheck
  },
  {
    title: "Review",
    description: "Completed work is checked against task-specific guidelines before it moves forward.",
    heroDescription: "Every output goes through review against task guidelines and quality benchmarks.",
    icon: ShieldCheck
  },
  {
    title: "Score",
    description: "Scholars receive accuracy and consistency scores to guide task readiness and improvement.",
    heroDescription: "Scholars are scored on accuracy, consistency, and guideline adherence. Scores guide task assignment and improvement.",
    icon: BarChart3
  },
  {
    title: "Improve",
    description: "Feedback from review and scoring feeds back into targeted practice and guidance.",
    icon: LineChart
  },
  {
    title: "Deploy",
    description: "Scholars who meet the required standard are cleared for supervised project work with ongoing review.",
    icon: ArrowRight
  }
];

const portalFeatures = [
  "Training Modules",
  "Practice Tasks",
  "CV Generator",
  "Scholar Profiles",
  "Availability Tracking",
  "Submissions and Reviews",
  "Payment Records"
];

export default function LandingPage() {
  return (
    <main className="public-page min-h-screen bg-white text-slate-950">
      <PublicNavbar />

      <section className="relative overflow-hidden bg-[#071527] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_86%_12%,rgba(20,184,166,0.16),transparent_28%),linear-gradient(135deg,#071527_0%,#0a2238_54%,#08111f_100%)]" />
        <div className="relative mx-auto grid max-w-[1500px] gap-12 px-6 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12 lg:min-h-[640px] lg:grid-cols-[0.96fr_0.88fr] lg:items-center lg:gap-16 lg:px-10 lg:py-14 xl:gap-20 xl:px-14 2xl:px-16">
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-white/10 px-3 py-1 text-[11px] font-semibold text-cyan-50 shadow-sm shadow-slate-950/20">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Pilot-Ready AI Workforce
            </div>
            <h1 className="mt-7 max-w-[780px] text-5xl font-extrabold leading-[1.04] tracking-normal sm:text-6xl lg:text-[68px] xl:text-[76px]">
              Remote-Ready. Review-Backed. Built for AI Data Work.
            </h1>
            <p className="mb-3 mt-6 max-w-3xl text-lg leading-8 text-sky-100/95 sm:text-xl">
              Online Geek Hub is a trained remote workforce delivering annotation, evaluation, transcription, and
              data support for AI teams that need reliable contributors, not guesswork.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                className="cta-primary dark-cta focus-ring"
              >
                Request a Team
              </a>
              <Link
                href="#solutions"
                className="cta-primary dark-cta focus-ring"
              >
                View Our Solutions
              </Link>
            </div>
            <p className="mt-4 max-w-2xl text-[13px] font-semibold leading-5 text-white/50">
              Small team. Managed process. Ready to work.
            </p>
          </div>

          <div className="w-full max-w-[680px] justify-self-center rounded-2xl border border-white/12 bg-white/[0.08] p-3 shadow-2xl shadow-slate-950/35 backdrop-blur lg:justify-self-end">
            <div className="rounded-xl bg-white p-4 text-slate-950 shadow-xl sm:p-5">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-700">Scholar Workforce</p>
                  <h2 className="mt-1 text-2xl font-extrabold">12 Trained Scholars</h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                    A focused team built around structured training, consistent review, and domain-ready delivery.
                  </p>
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
                          {item.heroDescription}
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
        <div className="mx-auto grid max-w-7xl grid-cols-2 items-stretch gap-3 lg:grid-cols-4">
          {scholarStats.map((stat) => (
            <div
              key={stat.label}
              className="h-full rounded-lg border border-t-[3px] border-slate-200 border-t-[#0A6EFF] bg-white p-5 shadow-sm shadow-slate-950/5"
            >
              <p
                className={`whitespace-nowrap font-extrabold text-[#0F172A] ${
                  stat.value === "Review-Based" ? "text-[36px]" : "text-4xl"
                }`}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#64748B]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="why" className="scroll-mt-24 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">Why Work With Us</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">A Lean Team Built Around Quality, Not Volume</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              We are not a large platform. We are a small, deliberately trained team built to take on focused AI data
              tasks with structure, accountability, and consistent output. Every Scholar knows their role. Every task
              goes through review.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article key={reason.title} className="min-h-[200px] rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition hover:border-cyan-300 hover:shadow-md">
                  <div className="grid h-12 w-12 place-items-center rounded-[10px] bg-[#0F172A] text-[#0A6EFF]">
                    <Icon className="h-[22px] w-[22px]" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-950">{reason.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{reason.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="solutions" className="scroll-mt-24 bg-slate-50 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">What We Deliver</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">AI Data Services Built for Practical Use</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Our solutions cover the core data and operations tasks that AI development teams, research projects,
              and digital operations require. We handle focused scopes reliably and on schedule.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <article key={solution.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition hover:border-cyan-300 hover:shadow-md">
                  <div className="grid h-12 w-12 place-items-center rounded-[10px] bg-[#0F172A] text-[#0A6EFF]">
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

      <section id="domains" className="scroll-mt-24 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">Domains</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Domains We Can Support</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((domain) => {
              const Icon = domain.icon;
              return (
                <div key={domain.title} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <div className="grid h-12 w-12 place-items-center rounded-[10px] bg-[#0F172A] text-[#0A6EFF]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-950">{domain.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{domain.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="scholars" className="scroll-mt-24 bg-[#071527] px-4 py-12 text-white sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">Our Team</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal">12 Scholars. One Standard.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Every person on our team goes through the same internal training process covering task fundamentals,
              domain skills, and quality expectations. Scholars are scored, reviewed, and continuously developed
              before being considered for project work.
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
              <div key={stat.label} className="rounded-lg border border-white/10 bg-white/10 p-6">
                <p
                  className={`font-extrabold text-cyan-200 ${
                    stat.value === "Review-Based" ? "whitespace-nowrap text-[2rem]" : "text-4xl"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quality" className="scroll-mt-24 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">Quality process</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Our Quality Loop</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Work is handled through training, supervised practice, review, scoring, improvement, and supervised deployment.
            </p>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {qualityLoop.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <div className="flex items-center justify-between gap-3">
                    <Icon className="h-6 w-6 text-cyan-700" />
                    <span className="text-sm font-bold text-slate-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-slate-50 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">Work With Us</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Ready for Pilot Projects and Subcontracting Discussions</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              We are open to vendor registrations, subcontracting arrangements, and pilot project opportunities with AI
              companies, research teams, and digital operations platforms. Start with a small scope, review the process,
              and scale responsibly after successful delivery.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/contact"
              className="cta-primary dark-cta focus-ring"
            >
              <Mail className="h-4 w-4 text-white" />
              Start a Pilot Conversation
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

      <section id="training" className="scroll-mt-24 px-4 py-18 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">Private portal</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Scholar Portal</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              The Scholar Portal is our internal hub for training, task readiness, submissions, reviews, availability,
              and operational records.
            </p>
            <div className="mt-8 flex flex-wrap items-start gap-3">
              <Link
                href="/login"
                className="cta-primary dark-cta focus-ring min-w-fit shrink-0 justify-center overflow-visible px-4 whitespace-nowrap"
              >
                Login to Portal
              </Link>
              <Link href="/signup" className="cta-secondary focus-ring min-w-fit shrink-0 justify-center whitespace-nowrap">
                Join Training
              </Link>
              <Link href="/cv" className="cta-secondary focus-ring min-w-fit shrink-0 justify-center whitespace-nowrap">
                CV Generator
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {portalFeatures.map((feature) => (
              <div
                key={feature}
                className={`flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/70 p-4 shadow-sm shadow-slate-950/5 ${
                  feature === "Payment Records" ? "sm:col-span-2 sm:justify-center" : ""
                }`}
              >
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
            <h3 className="mt-5 text-xl font-bold text-white">Ready to discuss a pilot project?</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
              Tell us what kind of AI data, transcription, evaluation, or remote operations support you need. We will
              review the scope and respond through the contact form.
            </p>
            <Link href="/contact" className="cta-secondary focus-ring mt-5">
              Start a Pilot Conversation
            </Link>
          </div>
          <div>
            <h3 className="font-bold text-white">Solutions</h3>
            <div className="mt-4 grid gap-2 text-sm">
              <a href="/#solutions" className="hover:text-white">Data Annotation</a>
              <a href="/#solutions" className="hover:text-white">AI Model Evaluation</a>
              <a href="/#solutions" className="hover:text-white">Transcription</a>
              <a href="/#solutions" className="hover:text-white">Prompt and Response Review</a>
              <a href="/#solutions" className="hover:text-white">Remote Operations Support</a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white">Company</h3>
            <div className="mt-4 grid gap-2 text-sm">
              <Link href="/vendor-profile" className="hover:text-white">Vendor Profile</Link>
              <Link href="/scholars" className="hover:text-white">Scholars</Link>
              <a href="/#training" className="hover:text-white">Training</a>
              <a href="/#domains" className="hover:text-white">Domains</a>
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
