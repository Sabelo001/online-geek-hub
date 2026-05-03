import { BadgeCheck, Bot, BriefcaseBusiness, CheckCircle2, ClipboardCheck, FileText, Headphones, Laptop, Layers3, Mail, MessageSquareText, ShieldCheck, Tags, Users } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/logo";
import { PublicNavbar } from "@/components/public-navbar";

const work = [
  { title: "Data Annotation", icon: Tags },
  { title: "AI Model Evaluation", icon: BadgeCheck },
  { title: "Audio Transcription", icon: Headphones },
  { title: "Prompt and Response Review", icon: MessageSquareText },
  { title: "Remote Operations Support", icon: BriefcaseBusiness },
  { title: "Training and Talent Preparation", icon: Layers3 }
];

const overview = [
  ["Name", "Online Geek Hub"],
  ["Tagline", "Turn skills into income"],
  ["Type", "Emerging AI workforce and digital skills hub"],
  ["Current capacity", "12 trained Scholars to start"],
  ["Delivery model", "Remote-first, review-based, quality-focused"]
];

const skills = [
  "AI training",
  "Text and image annotation",
  "Audio transcription",
  "Prompt review",
  "Model response evaluation",
  "CV and digital work support",
  "Research and document review"
];

const quality = [
  "Clear instructions",
  "Practice tasks",
  "Rubric-based review",
  "Feedback and revision",
  "Score tracking",
  "Admin/reviewer oversight"
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

      <section className="relative overflow-hidden bg-[#071527] px-4 py-20 text-white sm:px-6 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.22),transparent_30%),linear-gradient(135deg,#071527_0%,#0a2238_58%,#08111f_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Online Geek Hub</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-normal sm:text-6xl">Vendor Profile</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 sm:text-xl">
              Online Geek Hub is an emerging AI workforce and digital skills hub preparing trained Scholars for data annotation,
              AI evaluation, transcription, and remote digital operations.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Company overview</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">A small team preparing for responsible project delivery.</h2>
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
          <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">AI data and remote workforce support.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {work.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-50 text-cyan-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950">{item.title}</h3>
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
              We are starting with a small team of 12 Scholars and can support pilot projects, small batches, and gradually scalable workflows after successful delivery.
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
          <h2 className="mt-3 text-4xl font-extrabold tracking-normal">Quality assurance process</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quality.map((step, index) => (
              <div key={step} className="rounded-xl border border-white/10 bg-white/10 p-5">
                <div className="flex items-center justify-between">
                  <ShieldCheck className="h-5 w-5 text-cyan-300" />
                  <span className="text-sm font-bold text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{step}</h3>
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
        <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <ShieldCheck className="h-8 w-8 text-cyan-700" />
          <h2 className="mt-4 text-3xl font-extrabold text-slate-950">Data privacy and compliance statement</h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-600">
            Online Geek Hub is committed to responsible data handling, confidentiality, role-based access, and avoiding unauthorized sharing of third-party platform accounts or client data. We only accept work under permitted terms and approved project arrangements.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-2xl bg-cyan-300 p-8 text-[#071527] lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold">Interested in a Pilot Project?</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-800">
              Online Geek Hub is open to vendor, subcontracting, and pilot project discussions for AI data work, transcription, evaluation, and remote operations.
            </p>
          </div>
          <Link href="/contact" className="dark-cta focus-ring inline-flex min-h-12 whitespace-nowrap items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-bold text-white shadow-sm hover:bg-slate-800 hover:text-white focus:text-white active:text-white">
            <Mail className="h-4 w-4 text-white" />
            Contact Online Geek Hub
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
