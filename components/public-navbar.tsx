import Link from "next/link";
import { Menu } from "lucide-react";
import { BrandLogo } from "@/components/logo";

const desktopNavLinks = [
  { href: "/#solutions", label: "Solutions" },
  { href: "/scholars", label: "Scholars" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/insights", label: "Insights" },
  { href: "/vendor-profile", label: "Vendor Profile" }
];

const mobileNavLinks = [
  { href: "/#solutions", label: "Solutions" },
  { href: "/#domains", label: "Domains" },
  { href: "/scholars", label: "Scholars" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/insights", label: "Insights" },
  { href: "/vendor-profile", label: "Vendor Profile" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Join Training" }
];

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[76px] flex-nowrap items-center justify-between gap-5 xl:min-h-[82px]">
          <div className="flex min-w-0 shrink-0 items-center">
            <BrandLogo
              href="/"
              size="md"
              showText={false}
              className="gap-3 [&>span:first-child]:rounded-xl"
            />
          </div>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-7 xl:flex 2xl:gap-9">
            {desktopNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-sans font-semibold focus-ring whitespace-nowrap rounded-md px-1 py-2 text-[13px] uppercase tracking-[0.08em] text-slate-950 transition hover:text-cyan-700 focus:text-cyan-700 active:text-cyan-800"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center xl:flex">
            <Link
              href="/contact"
              className="cta-primary cta-nav dark-cta focus-ring font-display"
            >
              Request a Team
            </Link>
          </div>

          <details className="group relative shrink-0 xl:hidden">
            <summary className="focus-ring flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-950 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50 [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5 text-slate-950" />
              Menu
            </summary>
            <div className="absolute right-0 top-full mt-3 w-[min(calc(100vw-2rem),360px)] rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/15">
              <nav className="grid gap-1">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-sans font-semibold focus-ring whitespace-nowrap rounded-xl px-3 py-3 text-[13px] uppercase leading-none tracking-[0.08em] text-slate-950 transition hover:bg-cyan-50 hover:text-cyan-700 focus:text-cyan-700 active:text-cyan-800"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3">
                <Link
                  href="/contact"
                  className="cta-primary cta-nav dark-cta focus-ring w-full font-display"
                >
                  Request a Team
                </Link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
