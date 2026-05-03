import { BriefcaseBusiness, FileText, GraduationCap, HelpCircle, Mail, Send } from "lucide-react";
import Link from "next/link";
import { createContactInquiry } from "@/lib/actions";
import { BrandLogo } from "@/components/logo";
import { PublicNavbar } from "@/components/public-navbar";
import { Card, Select, TextArea, TextInput } from "@/components/ui";

const contactOptions = [
  {
    title: "Vendor and Project Partnerships",
    description: "Discuss annotation, evaluation, transcription, or remote operations pilot work.",
    icon: BriefcaseBusiness
  },
  {
    title: "Scholar Program",
    description: "Ask about joining or supporting the Online Geek Hub Scholar program.",
    icon: GraduationCap
  },
  {
    title: "CV and Remote Work Support",
    description: "Get help with CV preparation, training readiness, and remote-work basics.",
    icon: FileText
  },
  {
    title: "General Inquiry",
    description: "Send a general question or partnership note to the team.",
    icon: HelpCircle
  }
];

export default async function ContactPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="public-page min-h-screen bg-white text-slate-950">
      <PublicNavbar />

      <section className="relative overflow-hidden bg-[#071527] px-4 py-20 text-white sm:px-6 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.22),transparent_30%),linear-gradient(135deg,#071527_0%,#0a2238_58%,#08111f_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Contact</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-normal sm:text-6xl">Contact Online Geek Hub</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 sm:text-xl">
              Reach out for training, Scholar program inquiries, pilot projects, vendor discussions, or remote workforce support.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {contactOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card key={option.title}>
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-50 text-cyan-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-xl font-bold text-slate-950">{option.title}</h2>
                  <p className="mt-3 leading-7 text-slate-600">{option.description}</p>
                </Card>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-normal text-slate-950">View Vendor Profile</h2>
              <p className="mt-2 max-w-3xl leading-7 text-slate-700">
                See Online Geek Hub&apos;s capacity, services, quality process, and project readiness.
              </p>
            </div>
            <Link
              href="/vendor-profile"
              className="focus-ring mt-4 inline-flex min-h-11 whitespace-nowrap items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-950 shadow-sm transition hover:border-cyan-300 hover:bg-white hover:text-slate-950 focus:text-slate-950 active:text-slate-950 sm:mt-0"
            >
              View Vendor Profile
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Send an inquiry</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-normal text-slate-950">Tell us how we can help.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Your inquiry will be saved securely for the Online Geek Hub team to review. Email sending can be added later.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700">
              <Mail className="h-5 w-5 text-cyan-700" />
              No private contact emails are exposed on this page.
            </div>
          </div>
          <Card>
            {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
            {params.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{params.message}</p> : null}
            <form action={createContactInquiry} className="grid gap-4">
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Full name
                <TextInput name="full_name" required placeholder="Jane Doe" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Email
                <TextInput name="email" type="email" required placeholder="you@example.com" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Organization
                <TextInput name="organization" placeholder="Optional" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Inquiry type
                <Select name="inquiry_type" required defaultValue="general_inquiry">
                  <option value="vendor_partnership">Vendor partnership</option>
                  <option value="pilot_project">Pilot project</option>
                  <option value="scholar_program">Scholar program</option>
                  <option value="cv_support">CV support</option>
                  <option value="training">Training</option>
                  <option value="general_inquiry">General inquiry</option>
                </Select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Message
                <TextArea name="message" required placeholder="Share a few details about your inquiry." />
              </label>
              <button className="dark-cta focus-ring inline-flex min-h-11 whitespace-nowrap items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 font-semibold text-white hover:bg-slate-800 hover:text-white focus:text-white active:text-white sm:w-fit">
                <Send className="h-4 w-4 text-white" />
                Submit inquiry
              </button>
            </form>
          </Card>
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
