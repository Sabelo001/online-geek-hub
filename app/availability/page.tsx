import { updateAvailability } from "@/lib/actions";
import { ProtectedPage } from "@/components/protected-page";
import { Card, PageHeader, Select, TextArea, TextInput } from "@/components/ui";

export default async function AvailabilityPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;
  return (
    <ProtectedPage>
      <PageHeader title="Availability" eyebrow="Schedule" />
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      {params.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{params.message}</p> : null}
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <h2 className="text-xl font-bold text-slate-950">Update availability</h2>
          <form action={updateAvailability} className="mt-4 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Date
              <TextInput name="date" type="date" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Time block
              <Select name="time_block" required>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </Select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Status
              <Select name="status" required>
                <option value="available">Available</option>
                <option value="limited">Limited</option>
                <option value="unavailable">Unavailable</option>
              </Select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Notes
              <TextArea name="notes" placeholder="Optional context for admins and reviewers." />
            </label>
            <button className="focus-ring min-h-11 rounded-md bg-cyan-400 px-5 font-semibold text-slate-950 hover:bg-cyan-300">
              Save availability
            </button>
          </form>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-slate-950">How availability is used</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Availability helps admins assign internal practice tasks and plan reviews. It is not used to access, automate, or coordinate
            third-party platform accounts.
          </p>
        </Card>
      </div>
    </ProtectedPage>
  );
}
