import { BookOpen, BriefcaseBusiness, CalendarDays, FileText, Handshake, Newspaper } from "lucide-react";
import { PublicFooter } from "@/components/public-footer";
import { PublicNavbar } from "@/components/public-navbar";

export const metadata = {
  title: "Insights — Online Geek Hub",
  description: "Blogs, use cases, content library, partner updates, and resources from the Online Geek Hub team."
};

const insightTypes = [
  {
    title: "Blog",
    description:
      "Articles from the Online Geek Hub team covering AI data work, annotation tips, remote work guides, transcription best practices, and Scholar program updates.",
    icon: BookOpen
  },
  {
    title: "Use Cases",
    description:
      "Short case-study style pages showing how Online Geek Hub services apply to real project types, including prompt review, transcription workflows, and structured data tasks.",
    icon: BriefcaseBusiness
  },
  {
    title: "Content Library",
    description:
      "Downloadable PDFs and documents, including capability briefs, Scholar program overviews, quality process guides, and vendor readiness summaries.",
    icon: FileText
  },
  {
    title: "Partners",
    description:
      "A future space for platforms, companies, vendor directories, and project partners connected to Online Geek Hub.",
    icon: Handshake
  },
  {
    title: "Events and Summits",
    description:
      "Upcoming or past training events, community sessions, webinars, and Scholar graduation milestones.",
    icon: CalendarDays
  },
  {
    title: "In the Media",
    description:
      "Future press mentions, features, external publications, and public references to Online Geek Hub.",
    icon: Newspaper
  }
];

export default function InsightsPage() {
  return (
    <main className="public-page min-h-screen bg-white text-slate-950">
      <PublicNavbar />

      <section className="relative overflow-hidden bg-[#071527] px-4 pb-12 pt-20 text-white sm:px-6 sm:pb-12 sm:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.22),transparent_30%),linear-gradient(135deg,#071527_0%,#0a2238_58%,#08111f_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Insights</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-normal sm:text-6xl">
              Insights, Resources, and Updates
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 sm:text-xl">
              A growing space for Online Geek Hub articles, use cases, downloadable resources, partner updates,
              events, and future media mentions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {insightTypes.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition hover:border-cyan-300 hover:shadow-md"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-[10px] bg-[#0F172A] text-[#0A6EFF]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-2xl font-extrabold tracking-normal text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  <span className="cta-secondary focus-ring mt-6 cursor-not-allowed opacity-70" aria-disabled="true">
                    Coming Soon
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
