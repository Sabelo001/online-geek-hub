import { notFound } from "next/navigation";
import { submitPracticeTask } from "@/lib/actions";
import { ProtectedPage } from "@/components/protected-page";
import { Card, PageHeader, TextArea } from "@/components/ui";
import { getTask } from "@/lib/data";

export default async function SubmitTaskPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const task = await getTask(id);
  if (!task) notFound();
  const action = submitPracticeTask.bind(null, task.id);

  return (
    <ProtectedPage>
      <PageHeader title="Submit task" eyebrow={task.title} />
      {query.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{query.error}</p> : null}
      {query.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{query.message}</p> : null}
      <Card>
        <form action={action} className="grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Answer text
            <TextArea name="answer_text" required placeholder="Paste your answer, transcript, rubric notes, or review here." />
          </label>
          <p className="text-sm text-slate-500">
            File storage is prepared in Supabase Storage. This MVP records text submissions first; file upload can be enabled once storage keys are configured.
          </p>
          <button className="focus-ring min-h-11 rounded-md bg-cyan-400 px-5 font-semibold text-slate-950 hover:bg-cyan-300 sm:w-fit">
            Submit for review
          </button>
        </form>
      </Card>
    </ProtectedPage>
  );
}
