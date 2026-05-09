import { requireRole } from "@/lib/auth";
import { reviewSubmission, updateTimesheetStatus } from "@/lib/actions";
import { getSubmissions, getTimesheets } from "@/lib/data";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader, Select, TextArea, TextInput } from "@/components/ui";

function formatDate(date: string | null) {
  if (!date) return "Not set";
  return new Date(date).toLocaleDateString();
}

function formatDateTime(date: string | null) {
  if (!date) return "Not set";
  return new Date(date).toLocaleString();
}

function formatMoney(amount: number | null | undefined, currency = "USD") {
  return `${currency} ${Number(amount ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function statusTone(status: string): "blue" | "cyan" | "green" | "amber" | "red" {
  if (status === "approved") return "green";
  if (status === "rejected") return "red";
  if (status === "submitted") return "cyan";
  return "amber";
}

export default async function ReviewsPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  await requireRole(["admin", "reviewer"]);
  const params = await searchParams;
  const [submissions, timesheets] = await Promise.all([getSubmissions(), getTimesheets(undefined, "submitted")]);

  return (
    <ProtectedPage>
      <PageHeader title="Review submissions" eyebrow="Quality control" />
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      {params.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{params.message}</p> : null}
      <div className="grid gap-4">
        {submissions.map((submission) => {
          const action = reviewSubmission.bind(null, submission.id);
          return (
            <Card key={submission.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">{submission.practice_tasks?.title ?? "Practice task"}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {submission.profiles?.full_name ?? "Trainee"} - {new Date(submission.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                <Badge tone={submission.status === "approved" ? "green" : submission.status === "rejected" ? "red" : "amber"}>{submission.status}</Badge>
              </div>
              <p className="mt-4 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700">{submission.answer_text}</p>
              <form action={action} className="mt-4 grid gap-3 lg:grid-cols-[160px_160px_1fr_auto] lg:items-end">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Status
                  <Select name="status" defaultValue={submission.status}>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                    <option value="revision_requested">Request revision</option>
                  </Select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Score
                  <TextInput name="score" type="number" min={0} max={100} defaultValue={submission.score ?? 80} />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Feedback
                  <TextArea name="feedback" defaultValue={submission.feedback ?? ""} className="min-h-11 py-2" />
                </label>
                <button className="focus-ring min-h-11 rounded-md bg-cyan-400 px-5 font-semibold text-slate-950 hover:bg-cyan-300">
                  Save
                </button>
              </form>
            </Card>
          );
        })}
      </div>
      <section className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">Timesheets</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950">Timesheet approvals</h2>
          </div>
          <Badge tone="cyan">{timesheets.length} submitted</Badge>
        </div>
        <div className="mt-4 grid gap-4">
          {timesheets.map((timesheet) => {
            const approveAction = updateTimesheetStatus.bind(null, timesheet.id, "approved");
            const rejectAction = updateTimesheetStatus.bind(null, timesheet.id, "rejected");

            return (
              <Card key={timesheet.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-950">{timesheet.projects?.title ?? "Project"}</h3>
                    <p className="mt-1 text-sm text-slate-500">{timesheet.profiles?.full_name ?? "Scholar"}</p>
                  </div>
                  <Badge tone={statusTone(timesheet.status)}>{timesheet.status}</Badge>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
                  <p>
                    <span className="font-semibold text-slate-950">Work date:</span> {formatDate(timesheet.work_date)}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-950">Hours:</span> {Number(timesheet.hours).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-950">Created:</span> {formatDateTime(timesheet.created_at)}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-950">Amount:</span> {formatMoney(timesheet.calculated_amount, timesheet.currency)}
                  </p>
                </div>
                <p className="mt-4 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700">{timesheet.work_summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <form action={approveAction}>
                    <button className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                      Approve
                    </button>
                  </form>
                  <form action={rejectAction}>
                    <button className="focus-ring rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                      Reject
                    </button>
                  </form>
                </div>
              </Card>
            );
          })}
          {!timesheets.length ? <p className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-500">No submitted timesheets are waiting for review.</p> : null}
        </div>
      </section>
    </ProtectedPage>
  );
}
