import { BadgeCheck, Bot, BriefcaseBusiness, CheckCircle2, ClipboardCheck, FileText, Headphones, Laptop, Layers3, Mail, MessageSquareText, ShieldCheck, Tags, Users } from "lucide-react";
import Link from "next/link";
import { PublicFooter } from "@/components/public-footer";
import { PublicNavbar } from "@/components/public-navbar";

export const metadata = {
  title: "Vendor Profile — Online Geek Hub",
  description:
    "Online Geek Hub vendor profile. Trained remote AI workforce for annotation, evaluation, transcription, and data support. Available for pilot projects.",
  openGraph: {
    title: "Vendor Profile — Online Geek Hub",
    description: "Trained remote AI workforce available for pilot projects and subcontracting.",
    images: [{ url: "/images/scholars-hero.jpg", width: 1200, height: 630 }]
  }
};

const work = [
  {
    title: "Data Annotation",
    description: "Text and task-level annotation, reviewed before submission.",
    icon: Tags
  },
  {
    title: "AI Model Evaluation",
    description: "Human review of AI outputs for quality, accuracy, and instruction-following.",
    icon: BadgeCheck
  },
  {
    title: "Audio Transcription",
    description: "English and Swahili transcription with formatting to client specifications.",
    icon: Headphones
  },
  {
    title: "Prompt and Response Review",
    description: "Structured review flagging errors, tone issues, and guideline violations.",
    icon: MessageSquareText
  },
  {
    title: "Remote Operations Support",
    description: "Flexible contributor support for digital tasks and document processing.",
    icon: BriefcaseBusiness
  },
  {
    title: "Training and Talent Preparation",
    description: "Internal tracks that build task-ready contributors for focused AI work.",
    icon: Layers3
  }
];

const overview = [
  ["Name", "Online Geek Hub"],
  ["Tagline", "Trained contributors. Structured process. Remote-first delivery."],
  ["Type", "Emerging AI workforce and digital skills hub"],
  ["Current capacity", "12 trained Scholars in the starter team"],
  ["Delivery model", "Remote-first, review-based, and quality-focused"]
];

const skills = [
  "AI training",
  "Text and image annotation",
  "Audio transcription",
  "Prompt and response review",
  "Model response evaluation",
  "CV and digital work support",
  "Research and document review"
];

const quality = [
  {
    title: "Clear instructions",
    description: "Every task comes with written guidelines before work begins."
  },
  {
    title: "Practice tasks",
    description: "Scholars complete supervised practice before any live assignment."
  },
  {
    title: "Rubric-based review",
    description: "Output is checked against a defined rubric, not subjective judgment."
  },
  {
    title: "Feedback and revision",
    description: "Reviewers provide specific feedback tied to each task submission."
  },
  {
    title: "Score tracking",
    description: "Accuracy and consistency scores are recorded for every Scholar."
  },
  {
    title: "Admin/reviewer oversight",
    description: "A team lead monitors active work and flags issues in real time."
  }
];

const readiness = [
  "Private training portal",
  "Training modules",
  "Practice tasks",
  "CV generator",
  "Submissions and reviews",
  "Availability tracking",
  "Payment records",
  "Supabase-backed records",
  "Vercel-hosted web portal"
];

export default function VendorProfilePage() {
  return (
    <main className="public-page min-h-screen bg-white text-slate-950">
      <PublicNavbar />

      <section className="relative overflow-hidden bg-[#071527] px-4 pb-12 pt-20 text-white sm:px-6 sm:pb-12 sm:pt-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Online Geek Hub</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-normal sm:text-6xl">Vendor Profile</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 sm:text-xl">
              Online Geek Hub is an emerging AI workforce and digital skills hub building a trained starter team of Scholars for
              data annotation, AI evaluation, transcription, prompt review, and remote digital operations.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="overflow-visible whitespace-nowrap text-sm font-bold uppercase tracking-wide text-cyan-700">Company overview</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">A small team preparing for responsible pilot delivery.</h2>
          </div>
          <div className="grid gap-3">
            {overview.map(([label, value]) => (
              <div key={label} className="grid gap-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[180px_1fr]">
                <p className="font-bold text-slate-500">{label}</p>
                <p className="font-semibold text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">What we do</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">AI data and remote workforce support for starter projects.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {work.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="grid h-12 w-12 place-items-center rounded-[10px] bg-[#0F172A] text-[#0A6EFF]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-[13px] font-normal leading-6 text-[#475569]">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Users className="h-8 w-8 text-cyan-700" />
            <h2 className="mt-4 text-3xl font-extrabold text-slate-950">Current team capacity</h2>
            <p className="mt-4 leading-8 text-slate-600">
              We are starting with 12 trained Scholars and are best suited for pilot projects, small batches, and workflows
              that can grow gradually after successful delivery and quality review.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Bot className="h-8 w-8 text-cyan-700" />
            <h2 className="mt-4 text-3xl font-extrabold text-slate-950">Scholar skills</h2>
            <div className="mt-5 grid gap-2">
              {skills.map((skill) => (
                <p key={skill} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-cyan-700" />
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#071527] px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Quality assurance</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-normal">Quality review process</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quality.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-white/10 bg-white/10 p-5">
                <div className="flex items-center justify-between">
                  <ShieldCheck className="h-5 w-5 text-cyan-300" />
                  <span className="text-sm font-bold text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm font-normal leading-6 text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Workflow readiness</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Tools and workflow readiness</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {readiness.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <ClipboardCheck className="h-5 w-5 text-cyan-700" />
                <span className="font-semibold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-lg border border-l-4 border-slate-200 border-l-[#0A6EFF] bg-[#F8FAFC] p-8">
          <ShieldCheck className="h-7 w-7 text-[#0A6EFF]" />
          <h2 className="mt-4 text-4xl font-extrabold tracking-normal text-slate-950">Data privacy and compliance statement</h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-600">
            Online Geek Hub is committed to responsible data handling, confidentiality, role-based access, and avoiding
            unauthorized sharing of third-party platform accounts or client data. We only accept work under permitted terms,
            clear instructions, and approved project arrangements.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-2xl bg-[#0F172A] p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Interested in a Pilot Project?</h2>
            <p className="mt-3 max-w-3xl leading-7 text-white/75">
              Online Geek Hub is open to vendor, subcontracting, and pilot project discussions for AI data work,
              transcription, evaluation, prompt review, and remote operations.
            </p>
          </div>
          <Link href="/contact" className="cta-primary dark-cta focus-ring">
            <Mail className="h-4 w-4 text-white" />
            Contact Online Geek Hub
          </Link>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
