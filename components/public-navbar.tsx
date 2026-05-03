import Link from "next/link";
import { Menu } from "lucide-react";
import { BrandLogo } from "@/components/logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#domains", label: "Domains" },
  { href: "/scholars", label: "Scholars" },
  { href: "/training", label: "Training" },
  { href: "/contact", label: "Contact" }
];

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex min-h-20 flex-nowrap items-center justify-between gap-6 xl:min-h-24">
          <div className="flex min-w-0 shrink-0 items-center">
            <BrandLogo
              href="/"
              size="md"
              className="gap-3 [&>span:first-child]:rounded-xl [&>span:last-child]:whitespace-nowrap [&>span:last-child]:text-base [&>span:last-child]:font-extrabold xl:[&>span:last-child]:text-lg"
            />
          </div>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-6 xl:flex 2xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-display focus-ring whitespace-nowrap rounded-md px-1.5 py-2 text-[26px] uppercase leading-none tracking-[0.06em] text-slate-950 transition hover:text-cyan-700 focus:text-cyan-700 active:text-cyan-800 2xl:text-[28px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            <Link
              href="/login"
              className="focus-ring inline-flex min-h-11 whitespace-nowrap items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-extrabold uppercase tracking-[0.08em] text-slate-950 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-slate-950 focus:text-slate-950 active:text-slate-950"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="dark-cta focus-ring inline-flex min-h-11 whitespace-nowrap items-center justify-center rounded-xl border border-slate-950 bg-slate-950 px-5 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-md shadow-slate-950/20 transition hover:border-slate-800 hover:bg-slate-800 hover:text-white focus:text-white active:text-white"
            >
              Join Training
            </Link>
          </div>

          <details className="group relative shrink-0 xl:hidden">
            <summary className="focus-ring flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-extrabold uppercase tracking-[0.08em] text-slate-950 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50 [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5 text-slate-950" />
              Menu
            </summary>
            <div className="absolute right-0 top-full mt-3 w-[min(88vw,360px)] rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/15">
              <nav className="grid gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-display focus-ring whitespace-nowrap rounded-xl px-3 py-3 text-[25px] uppercase leading-none tracking-[0.06em] text-slate-950 transition hover:bg-cyan-50 hover:text-cyan-700 focus:text-cyan-700 active:text-cyan-800"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3">
                <Link
                  href="/login"
                  className="focus-ring inline-flex min-h-11 whitespace-nowrap items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-extrabold uppercase tracking-[0.08em] text-slate-950 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-slate-950 focus:text-slate-950 active:text-slate-950"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="dark-cta focus-ring inline-flex min-h-11 whitespace-nowrap items-center justify-center rounded-xl border border-slate-950 bg-slate-950 px-4 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-md shadow-slate-950/20 transition hover:border-slate-800 hover:bg-slate-800 hover:text-white focus:text-white active:text-white"
                >
                  Join Training
                </Link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
