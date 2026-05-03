import { requireRole } from "@/lib/auth";
import { reviewSubmission } from "@/lib/actions";
import { getSubmissions } from "@/lib/data";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader, Select, TextArea, TextInput } from "@/components/ui";

export default async function ReviewsPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  await requireRole(["admin", "reviewer"]);
  const params = await searchParams;
  const submissions = await getSubmissions();

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
    </ProtectedPage>
  );
}
