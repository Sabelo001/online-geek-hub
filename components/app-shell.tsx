import Link from "next/link";
import { BarChart3, BookOpen, BriefcaseBusiness, CreditCard, FileText, FolderOpen, Home, UserCircle, Users } from "lucide-react";
import { signOut } from "@/lib/actions";
import { BrandLogo } from "@/components/logo";
import type { Profile } from "@/lib/types";

const traineeLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/profile", label: "Profile", icon: UserCircle },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/tasks", label: "Tasks & Projects", icon: BriefcaseBusiness },
  { href: "/cv", label: "CV Generator", icon: FileText },
  { href: "/documents", label: "Documents", icon: FolderOpen },
  { href: "/earnings", label: "Earnings", icon: CreditCard }
];

const adminLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/profile", label: "Profile", icon: UserCircle },
  { href: "/scholars", label: "Scholars", icon: Users },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/tasks", label: "Tasks & Projects", icon: BriefcaseBusiness },
  { href: "/documents", label: "Documents", icon: FolderOpen },
  { href: "/reviews", label: "Reviews", icon: BarChart3 },
  { href: "/earnings", label: "Earnings", icon: CreditCard },
  { href: "/admin", label: "Admin", icon: Users }
];

export function AppShell({ profile, children }: { profile: Profile; children: React.ReactNode }) {
  const links = profile.role === "admin" ? adminLinks : traineeLinks;

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-800 bg-[#071527] p-5 text-white lg:block">
        <BrandLogo href="/" dark size="md" />
        <nav className="mt-8 grid gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/10">
                <Icon className="h-4 w-4 text-cyan-300" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <BrandLogo href="/dashboard" size="sm" className="lg:hidden" />
            <nav className="flex gap-3 overflow-x-auto text-sm lg:hidden">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="whitespace-nowrap text-slate-600">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <div className="text-right text-sm">
                <p className="font-semibold text-slate-900">{profile.full_name}</p>
                <p className="capitalize text-slate-500">{profile.role}</p>
              </div>
              <form action={signOut}>
                <button className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
