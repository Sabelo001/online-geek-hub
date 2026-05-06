import { Mail, Send } from "lucide-react";
import { createContactInquiry } from "@/lib/actions";
import { PublicFooter } from "@/components/public-footer";
import { PublicNavbar } from "@/components/public-navbar";
import { Card, Select, TextArea, TextInput } from "@/components/ui";

export const metadata = {
  title: "Contact — Online Geek Hub",
  description: "Get in touch with Online Geek Hub for pilot projects, vendor discussions, Scholar program inquiries, and AI data work support."
};

export default async function ContactPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="public-page min-h-screen bg-white text-slate-950">
      <PublicNavbar />

      <section className="relative overflow-hidden bg-[#071527] px-4 pb-24 pt-20 text-white sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.22),transparent_30%),linear-gradient(135deg,#071527_0%,#0a2238_58%,#08111f_100%)]" />
        <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-300">Get In Touch</p>
            <h1 className="mt-4 text-6xl font-extrabold leading-none tracking-tight text-white sm:text-7xl">LET&apos;S WORK TOGETHER.</h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-sky-100">
              Reach out for pilot projects, vendor discussions, Scholar program inquiries, or AI workforce support. We read every
              message and respond directly.
            </p>
            <div className="mt-8 space-y-4 text-sm text-sky-200">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-cyan-400" />
                hello@onlinegeekhub.com
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400">📍</span>
                Nairobi, Kenya — Remote-First
              </div>
            </div>
          </div>
          <Card className="mt-10 lg:mt-0">
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
              <button className="cta-primary dark-cta focus-ring sm:w-fit">
                <Send className="h-4 w-4 text-white" />
                Submit inquiry
              </button>
            </form>
          </Card>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
