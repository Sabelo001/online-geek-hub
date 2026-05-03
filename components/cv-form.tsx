import type { CvProfile } from "@/lib/types";
import { Select, TextArea, TextInput } from "@/components/ui";

export function CvForm({
  action,
  cv,
  submitLabel
}: {
  action: (formData: FormData) => void | Promise<void>;
  cv?: CvProfile;
  submitLabel: string;
}) {
  return (
    <form action={action} className="grid gap-5">
      <section className="grid gap-4 rounded-md border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-950">Personal details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Full name
            <TextInput name="full_name" required defaultValue={cv?.full_name ?? ""} placeholder="Jane Doe" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Email
            <TextInput name="email" type="email" required defaultValue={cv?.email ?? ""} placeholder="you@example.com" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Phone
            <TextInput name="phone" defaultValue={cv?.phone ?? ""} placeholder="+254..." />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Location
            <TextInput name="location" defaultValue={cv?.location ?? ""} placeholder="Nairobi, Kenya" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Professional title
            <TextInput name="professional_title" defaultValue={cv?.professional_title ?? ""} placeholder="Remote Work Trainee" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Template
            <Select name="template" defaultValue={cv?.template ?? "professional"}>
              <option value="professional">Professional</option>
              <option value="remote_work">Remote Work</option>
              <option value="data_annotation">Data Annotation</option>
            </Select>
          </label>
        </div>
      </section>

      <section className="grid gap-4 rounded-md border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-950">Professional summary</h2>
        <TextArea name="summary" defaultValue={cv?.summary ?? ""} placeholder="Write 2-4 lines about your strengths, reliability, and target remote roles." />
      </section>

      <section className="grid gap-4 rounded-md border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-950">Work experience</h2>
        <TextArea name="experience" defaultValue={cv?.experience ?? ""} placeholder={"Role - Organization\n- What you did\n- Tools or results"} />
      </section>

      <section className="grid gap-4 rounded-md border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-950">Education</h2>
        <TextArea name="education" defaultValue={cv?.education ?? ""} placeholder="Course, school, year, or relevant training." />
      </section>

      <section className="grid gap-4 rounded-md border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-950">Skills</h2>
        <TextArea name="skills" defaultValue={cv?.skills ?? ""} placeholder={"One skill per line:\nData annotation\nAudio transcription\nGoogle Docs"} />
      </section>

      <section className="grid gap-4 rounded-md border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-950">Certifications</h2>
        <TextArea name="certifications" defaultValue={cv?.certifications ?? ""} placeholder="One certification or course per line." />
      </section>

      <section className="grid gap-4 rounded-md border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-950">Referees</h2>
        <TextArea name="referees" defaultValue={cv?.referees ?? ""} placeholder="Available on request, or list referee contact details if appropriate." />
      </section>

      <button className="focus-ring min-h-11 rounded-md bg-cyan-400 px-5 font-semibold text-slate-950 hover:bg-cyan-300 sm:w-fit">
        {submitLabel}
      </button>
    </form>
  );
}
