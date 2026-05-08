import { ClipboardCheck, FileCheck2, FolderKanban, ListChecks, ShieldCheck, WalletCards } from "lucide-react";
import Link from "next/link";
import { PublicFooter } from "@/components/public-footer";
import { PublicNavbar } from "@/components/public-navbar";

export const metadata = {
  title: "How We Work — Online Geek Hub",
  description:
    "Learn how Online Geek Hub trains, reviews, and deploys Scholars for AI data annotation, evaluation, transcription, and remote operations work.",
  openGraph: {
    title: "How We Work — Online Geek Hub",
    description: "Our structured quality process: Train, Practice, Review, Score, Improve, Deploy.",
    images: [{ url: "/images/scholars-hero.jpg", width: 1200, height: 630 }]
  }
};

const overviewSteps = [
  {
    number: "01",
    title: "Project Intake",
    description: "We review the scope, task type, and guidelines before accepting any project."
  },
  {
    number: "02",
    title: "Scholar Matching",
    description: "Scholars are assigned based on their training track, domain score, and availability."
  },
  {
    number: "03",
    title: "Reviewed Delivery",
    description: "Every output is reviewed internally before it is submitted to the client."
  }
];

const qualityLoop = [
  {
    step: "Step 01",
    title: "Train",
    body:
      "Before any live work, every Scholar completes a structured training track covering task types, domain knowledge, annotation guidelines, and quality standards. Training is not self-paced guessing — it follows a defined curriculum with checkpoints."
  },
  {
    step: "Step 02",
    title: "Practice",
    body:
      "After training, Scholars complete supervised practice tasks that mirror real project conditions. Practice tasks are reviewed by team leads and scored before the Scholar is cleared for active assignments."
  },
  {
    step: "Step 03",
    title: "Review",
    body:
      "Every submission from a live project goes through an internal review before it reaches the client. Reviewers check against the task guidelines, flag inconsistencies, and return work for correction when needed."
  },
  {
    step: "Step 04",
    title: "Score",
    body:
      "Accuracy and consistency scores are recorded at the Scholar level for every reviewed task. Scores determine which task types a Scholar can take on and feed directly into their development plan."
  },
  {
    step: "Step 05",
    title: "Improve",
    body:
      "Review feedback and scores are not just recorded — they are acted on. Scholars with specific gaps receive targeted practice and guidance before returning to active work."
  },
  {
    step: "Step 06",
    title: "Deploy",
    body:
      "Scholars who consistently meet the quality threshold for a task type are cleared for deployment on client projects. Ongoing review continues throughout active assignments."
  }
];

const coordinationCards = [
  {
    title: "Task Assignment",
    description:
      "Admin creates projects and sends invitations to qualified Scholars. Scholars accept or decline based on availability. No crowdsourcing — every assignment is deliberate.",
    icon: FolderKanban
  },
  {
    title: "Submission Tracking",
    description:
      "All submissions go through the portal. Admins can see what has been submitted, what is under review, and what has been approved before delivery.",
    icon: FileCheck2
  },
  {
    title: "Payment and Records",
    description:
      "Earnings, invoices, and approved timesheets are all tracked internally. Scholars see their own records. Admins see the full team picture.",
    icon: WalletCards
  }
];

export default function HowWeWorkPage() {
  return (
    <main className="public-page min-h-screen bg-white text-slate-950">
      <PublicNavbar />

      <section className="bg-[#071527] px-4 pb-12 pt-20 text-white sm:px-6 sm:pb-12 sm:pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Our Process</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-normal sm:text-6xl">How We Work</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 sm:text-xl">
              Every project we take on goes through the same structured internal process. Nothing leaves our team
              unchecked.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                12 Trained Scholars
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                6-Step Quality Loop
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">The Overview</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">From Intake to Delivery</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              When a project comes in, we do not assign it immediately. We match it to Scholars who have completed the
              relevant training track and passed the practice assessment for that task type. Work is then reviewed before
              it leaves the team.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {overviewSteps.map((step) => (
              <article key={step.number}>
                <p className="text-5xl font-extrabold text-[#0A6EFF]">{step.number}</p>
                <h3 className="mt-2 font-bold text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">The 6-Step Loop</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Our Quality Loop</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Every Scholar and every submission passes through this loop. It is not a checklist — it is how we build and
              maintain a reliable team.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {qualityLoop.map((item) => (
              <article key={item.step} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-[#0A6EFF]">{item.step}</p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">How We Coordinate</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Managed From the Inside</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Clients do not manage individual contributors. They deal with us. Internally, we handle task assignment,
              availability tracking, submission collection, review, and payment — all through our Scholar Portal.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {coordinationCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition hover:border-cyan-300 hover:shadow-md">
                  <div className="grid h-12 w-12 place-items-center rounded-[10px] bg-[#0F172A] text-[#0A6EFF]">
                    <Icon className="h-[22px] w-[22px]" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-950">{card.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{card.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">Work With Us</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Ready to start a pilot?</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Start with a small scope. We will match it to the right Scholars, run it through our process, and deliver
              reviewed output. No large commitments required upfront.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Link href="/contact" className="cta-primary dark-cta focus-ring">
              Start a Pilot Conversation
            </Link>
            <Link href="/scholars" className="cta-secondary focus-ring">
              View Our Team
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
