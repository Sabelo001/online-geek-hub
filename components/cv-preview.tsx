import { clsx } from "clsx";
import type { CvProfile } from "@/lib/types";

function splitLines(value: string | null) {
  return (value ?? "")
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="break-inside-avoid">
      <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wide text-slate-700">{title}</h2>
      <div className="mt-3 text-sm leading-7 text-slate-700">{children}</div>
    </section>
  );
}

function ListSection({ title, value }: { title: string; value: string | null }) {
  const items = splitLines(value);
  if (!items.length) return null;

  return (
    <Section title={title}>
      <ul className="grid gap-1">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </Section>
  );
}

export function CvPreview({ cv }: { cv: CvProfile }) {
  const accent =
    cv.template === "remote_work"
      ? "border-cyan-500"
      : cv.template === "data_annotation"
        ? "border-emerald-500"
        : "border-slate-900";

  return (
    <article id="cv-preview" className={clsx("cv-print-area rounded-md border bg-white p-8 shadow-sm", accent)}>
      <header className={clsx("border-l-4 pl-4", accent)}>
        <h1 className="text-3xl font-bold text-slate-950">{cv.full_name}</h1>
        {cv.professional_title ? <p className="mt-1 text-lg font-semibold text-slate-700">{cv.professional_title}</p> : null}
        <p className="mt-3 text-sm text-slate-600">
          {[cv.email, cv.phone, cv.location].filter(Boolean).join(" | ")}
        </p>
      </header>

      <div className="mt-8 grid gap-6">
        {cv.summary ? (
          <Section title="Professional Summary">
            <p className="whitespace-pre-wrap">{cv.summary}</p>
          </Section>
        ) : null}
        <ListSection title="Skills" value={cv.skills} />
        {cv.experience ? (
          <Section title="Work Experience">
            <p className="whitespace-pre-wrap">{cv.experience}</p>
          </Section>
        ) : null}
        {cv.education ? (
          <Section title="Education">
            <p className="whitespace-pre-wrap">{cv.education}</p>
          </Section>
        ) : null}
        <ListSection title="Certifications" value={cv.certifications} />
        {cv.referees ? (
          <Section title="Referees">
            <p className="whitespace-pre-wrap">{cv.referees}</p>
          </Section>
        ) : null}
      </div>
    </article>
  );
}
