import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PublicFooter } from "@/components/public-footer";
import { PublicNavbar } from "@/components/public-navbar";

export const metadata = {
  title: "How We Work — Online Geek Hub",
  description:
    "Learn how Online Geek Hub trains, reviews, and deploys Scholars for AI data annotation, evaluation, transcription, and remote operations.",
  openGraph: {
    title: "How We Work — Online Geek Hub",
    description: "Our structured quality process: Train, Practice, Review, Score, Improve, Deploy.",
    images: [{ url: "/images/how-we-work.jpg", width: 1200, height: 630 }]
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
    step: "01",
    title: "Train",
    body:
      "Before any live work, every Scholar completes a structured training track covering task types, domain knowledge, annotation guidelines, and quality standards. Training follows a defined curriculum with checkpoints."
  },
  {
    step: "02",
    title: "Practice",
    body:
      "After training, Scholars complete supervised practice tasks that mirror real project conditions. Practice tasks are reviewed and scored before the Scholar is cleared for active assignments."
  },
  {
    step: "03",
    title: "Review",
    body:
      "Every live project submission goes through internal review before reaching the client. Reviewers check against task guidelines, flag issues, and return work for correction when needed."
  },
  {
    step: "04",
    title: "Score",
    body:
      "Accuracy and consistency scores are recorded at the Scholar level for every reviewed task. Scores determine task eligibility and feed into each Scholar's development plan."
  },
  {
    step: "05",
    title: "Improve",
    body:
      "Review feedback and scores are acted on directly. Scholars with specific gaps receive targeted practice and guidance before returning to active work."
  },
  {
    step: "06",
    title: "Deploy",
    body:
      "Scholars who consistently meet the quality threshold are cleared for client project assignments. Review continues throughout active deployment."
  }
];

const coordinationRows = [
  {
    title: "Task Assignment",
    description: "Admin creates projects and sends invitations to qualified Scholars based on skill and availability."
  },
  {
    title: "Submission Tracking",
    description: "All submissions go through the portal. Admins see status at every stage before client delivery."
  },
  {
    title: "Payments and Records",
    description:
      "Earnings, invoices, and timesheets tracked internally. Scholars see their own records. Admins see the full team view."
  }
];

export default function HowWeWorkPage() {
  return (
    <main className="public-page min-h-screen bg-white text-slate-950">
      <PublicNavbar />

      <section className="bg-[#071527] px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">Our Process</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-normal sm:text-6xl">How We Work</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-100 sm:text-xl">
              Every project goes through the same structured internal process. Nothing leaves our team unchecked.
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
          <Image
            src="/images/scholars-hero.jpg"
            alt="Online Geek Hub Scholar at work"
            width={600}
            height={420}
            className="h-[420px] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">The Overview</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">From Intake to Delivery</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              When a project comes in, we do not assign it immediately. We match it to Scholars who have completed the
              relevant training track and passed the practice assessment. Work is then reviewed before it leaves the
              team.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,60fr)_minmax(0,40fr)] lg:items-start">
            <div className="grid gap-7">
              {overviewSteps.map((step) => (
                <article key={step.number} className="border-l-4 border-[#0A6EFF] pl-4">
                  <p className="text-5xl font-extrabold leading-none text-[#0A6EFF]">{step.number}</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </article>
              ))}
            </div>
            <Image
              src="/images/scholars-team.jpg"
              alt="Online Geek Hub team reviewing work"
              width={480}
              height={400}
              className="h-[400px] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">The 6-Step Loop</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Our Quality Loop</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Every Scholar and every submission passes through this loop.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {qualityLoop.map((item) => (
              <article key={item.step} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#0A6EFF]">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-center">
          <Image
            src="/images/how-we-work.jpg"
            alt="Internal coordination at Online Geek Hub"
            width={520}
            height={380}
            className="h-[380px] w-full rounded-2xl object-cover"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">How We Coordinate</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Managed From the Inside</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Clients do not manage individual contributors. Internally we handle task assignment, availability
              tracking, submission collection, review, and payment through our Scholar Portal.
            </p>
            <div className="mt-8 grid gap-6">
              {coordinationRows.map((row) => (
                <div key={row.title} className="flex gap-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0F172A] text-[#0A6EFF]">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950">{row.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{row.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0A6EFF]">Work With Us</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Ready to Start a Pilot?</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Start with a small scope. We match it to the right Scholars, run it through our process, and deliver
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
