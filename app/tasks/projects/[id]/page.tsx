import Link from "next/link";
import { notFound } from "next/navigation";
import { createProjectSubmission, createTimesheet } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";
import {
  getMyProjectSubmissions,
  getMyTimesheets,
  getProject,
  getProjectInvitations,
  getProjectSubmissions,
  getTimesheets
} from "@/lib/data";
import { Badge, Card, PageHeader, TextArea, TextInput } from "@/components/ui";
import { ProtectedPage } from "@/components/protected-page";
import type { ProjectInvitation, ProjectSubmission, Timesheet } from "@/lib/types";

function formatDate(date: string | null) {
  if (!date) return "Not set";
  return new Date(date).toLocaleDateString();
}

function statusTone(status: string): "blue" | "cyan" | "green" | "amber" | "red" {
  if (status === "approved" || status === "accepted" || status === "active") return "green";
  if (status === "under_review" || status === "submitted") return "cyan";
  if (status === "revision_requested" || status === "draft") return "amber";
  if (status === "rejected" || status === "declined") return "red";
  return "blue";
}

function statusLabel(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatMoney(amount: number | null, currency = "USD") {
  if (amount === null) return "Not calculated";
  return `${currency} ${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function SubmissionList({ submissions, canReview }: { submissions: ProjectSubmission[]; canReview: boolean }) {
  return (
    <div className="grid gap-3">
      {submissions.map((submission) => (
        <div key={submission.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-950">{submission.title}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {submission.profiles?.full_name ? `${submission.profiles.full_name} - ` : ""}
                {new Date(submission.created_at).toLocaleString()}
              </p>
            </div>
            <Badge tone={statusTone(submission.status)}>{statusLabel(submission.status)}</Badge>
          </div>
          {submission.notes ? <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">{submission.notes}</p> : null}
          {submission.file_path ? <p className="mt-3 text-sm font-semibold text-cyan-700">File attached: {submission.file_path}</p> : null}
          {submission.feedback ? <p className="mt-3 rounded-md bg-white p-3 text-sm text-slate-600">Feedback: {submission.feedback}</p> : null}
          {canReview ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <button disabled className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-400">
                Review in Phase 2
              </button>
            </div>
          ) : null}
        </div>
      ))}
      {!submissions.length ? <p className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-500">No project submissions yet.</p> : null}
    </div>
  );
}

function TimesheetList({ timesheets, canReview }: { timesheets: Timesheet[]; canReview: boolean }) {
  return (
    <div className="grid gap-3">
      {timesheets.map((timesheet) => (
        <div key={timesheet.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-950">
                {formatDate(timesheet.work_date)} - {Number(timesheet.hours).toLocaleString()} hours
              </h3>
              <p className="mt-1 text-sm text-slate-500">{timesheet.profiles?.full_name ?? "Scholar"}</p>
            </div>
            <Badge tone={statusTone(timesheet.status)}>{statusLabel(timesheet.status)}</Badge>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">{timesheet.work_summary}</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <p>
              <span className="font-semibold text-slate-950">Rate:</span>{" "}
              {timesheet.rate_amount ? `${timesheet.currency} ${Number(timesheet.rate_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / ${timesheet.projects?.rate_unit ?? "hour"}` : "Not set"}
            </p>
            <p>
              <span className="font-semibold text-slate-950">Amount:</span> {formatMoney(timesheet.calculated_amount, timesheet.currency)}
            </p>
          </div>
          {canReview ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <button disabled className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-400">
                Approval in Phase 2
              </button>
            </div>
          ) : null}
        </div>
      ))}
      {!timesheets.length ? <p className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-500">No timesheets yet.</p> : null}
    </div>
  );
}

function ScholarWorkForms({ invitation }: { invitation: ProjectInvitation }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="text-xl font-bold text-slate-950">Submit Project Work</h2>
        <form action={createProjectSubmission} encType="multipart/form-data" className="mt-4 grid gap-4">
          <input type="hidden" name="project_invitation_id" value={invitation.id} />
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Title
            <TextInput name="title" required placeholder="Batch 01 transcript review" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Notes
            <TextArea name="notes" placeholder="Summarize what you completed and any issues for review." />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Optional file
            <TextInput name="file" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.jpg,.jpeg,.png,.webp" />
          </label>
          <button className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 sm:w-fit">
            Submit Project Work
          </button>
        </form>
      </Card>
      <Card>
        <h2 className="text-xl font-bold text-slate-950">Add Timesheet</h2>
        <form action={createTimesheet} className="mt-4 grid gap-4">
          <input type="hidden" name="project_invitation_id" value={invitation.id} />
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Work date
            <TextInput name="work_date" type="date" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Hours
            <TextInput name="hours" type="number" min="0.25" step="0.25" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Work summary
            <TextArea name="work_summary" required placeholder="Describe the work completed during this time." />
          </label>
          <button className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 sm:w-fit">
            Submit Timesheet
          </button>
        </form>
      </Card>
    </div>
  );
}

export default async function ProjectWorkPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const profile = await requireProfile();
  const project = await getProject(id);
  if (!project) notFound();

  const canReview = profile.role === "admin" || profile.role === "reviewer";
  const invitations = await getProjectInvitations(profile.id);
  const invitation = invitations.find((item) => item.project_id === project.id) ?? null;

  if (!canReview && !invitation) notFound();

  const [submissions, timesheets] = canReview
    ? await Promise.all([getProjectSubmissions(project.id), getTimesheets(project.id)])
    : await Promise.all([getMyProjectSubmissions(profile.id, project.id), getMyTimesheets(profile.id, project.id)]);

  return (
    <ProtectedPage>
      <PageHeader title={project.title} eyebrow="Project Work">
        <Link href="/tasks?tab=active" className="focus-ring rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white">
          Back to Tasks
        </Link>
      </PageHeader>
      {query.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{query.error}</p> : null}
      {query.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{query.message}</p> : null}

      <div className="grid gap-6">
        <Card>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-950">{project.project_type}</h2>
              <p className="mt-3 max-w-4xl whitespace-pre-wrap leading-7 text-slate-600">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone={statusTone(project.status)}>{statusLabel(project.status)}</Badge>
              {invitation ? <Badge tone={statusTone(invitation.status)}>{statusLabel(invitation.status)}</Badge> : null}
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
            <p>
              <span className="font-semibold text-slate-950">Deadline:</span> {formatDate(project.deadline)}
            </p>
            <p>
              <span className="font-semibold text-slate-950">Invitation:</span> {invitation ? statusLabel(invitation.status) : "Admin/reviewer view"}
            </p>
            <p>
              <span className="font-semibold text-slate-950">Created:</span> {formatDate(project.created_at)}
            </p>
          </div>
        </Card>

        {!canReview && invitation?.status === "accepted" ? <ScholarWorkForms invitation={invitation} /> : null}

        <Card>
          <h2 className="text-xl font-bold text-slate-950">Project Submissions</h2>
          <div className="mt-4">
            <SubmissionList submissions={submissions} canReview={canReview} />
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-slate-950">Timesheets</h2>
          <div className="mt-4">
            <TimesheetList timesheets={timesheets} canReview={canReview} />
          </div>
        </Card>
      </div>
    </ProtectedPage>
  );
}
