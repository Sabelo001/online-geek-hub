import Link from "next/link";
import { BrandLogo } from "@/components/logo";

export function PublicFooter() {
  return (
    <footer className="bg-[#071527] px-4 py-10 text-slate-300 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <BrandLogo href="/" dark size="sm" />
          <h3 className="mt-5 text-xl font-bold text-white">Ready to discuss a pilot project?</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            Tell us what kind of AI data, transcription, evaluation, or remote operations support you need. We will
            review the scope and respond through the contact form.
          </p>
          <Link href="/contact" className="cta-primary dark-cta focus-ring mt-5">
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
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <Link href="/scholars#quality-process" className="hover:text-white">How We Work</Link>
            <a href="/#domains" className="hover:text-white">Domains</a>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white">Portal</h3>
          <div className="mt-4 grid gap-2 text-sm">
            <Link href="/dashboard" className="hover:text-white">Scholar Portal</Link>
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
  );
}
