import Link from "next/link";
import { clsx } from "clsx";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "focus-ring inline-flex min-h-11 min-w-32 items-center justify-center rounded-md px-5 text-sm font-bold shadow-sm transition",
        variant === "primary" && "border border-cyan-300 bg-cyan-400 text-slate-950 hover:bg-cyan-300",
        variant === "dark" && "dark-cta whitespace-nowrap border border-slate-950 bg-slate-950 text-white hover:bg-slate-800 hover:text-white focus:text-white active:text-white",
        variant === "secondary" && "border border-sky-200 bg-white text-slate-950 hover:bg-sky-50",
        variant === "ghost" && "text-sky-100 hover:bg-white/10 hover:text-white"
      )}
    >
      {children}
    </Link>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={clsx("rounded-lg border border-slate-200 bg-white p-5 shadow-sm", className)}>{children}</section>;
}

export function MetricCard({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <Card>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
      {detail ? <p className="mt-2 text-sm text-slate-500">{detail}</p> : null}
    </Card>
  );
}

export function Badge({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "cyan" | "green" | "amber" | "red" }) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        tone === "blue" && "bg-sky-100 text-sky-800",
        tone === "cyan" && "bg-cyan-100 text-cyan-800",
        tone === "green" && "bg-emerald-100 text-emerald-800",
        tone === "amber" && "bg-amber-100 text-amber-800",
        tone === "red" && "bg-red-100 text-red-800"
      )}
    >
      {children}
    </span>
  );
}

export function PageHeader({ title, eyebrow, children }: { title: string; eyebrow?: string; children?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">{eyebrow}</p> : null}
        <h1 className="mt-1 text-3xl font-bold text-slate-950">{title}</h1>
      </div>
      {children}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        "focus-ring min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-950",
        props.className
      )}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={clsx(
        "focus-ring min-h-32 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-slate-950",
        props.className
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={clsx(
        "focus-ring min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-950",
        props.className
      )}
    />
  );
}
