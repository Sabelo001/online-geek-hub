import { notFound } from "next/navigation";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, ButtonLink, Card, PageHeader } from "@/components/ui";
import { getTask } from "@/lib/data";

export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = await getTask(id);
  if (!task) notFound();

  return (
    <ProtectedPage>
      <PageHeader title={task.title} eyebrow={task.task_type}>
        <ButtonLink href={`/tasks/${task.id}/submit`}>Submit task</ButtonLink>
      </PageHeader>
      <Card>
        <div className="flex flex-wrap gap-2">
          <Badge tone="cyan">{task.status}</Badge>
          <Badge tone={task.difficulty === "advanced" ? "red" : task.difficulty === "intermediate" ? "amber" : "green"}>{task.difficulty}</Badge>
        </div>
        <h2 className="mt-6 text-lg font-bold text-slate-950">Instructions</h2>
        <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{task.instructions}</p>
        {task.sample_file_url ? (
          <a className="mt-6 inline-flex font-semibold text-cyan-700" href={task.sample_file_url}>
            Open sample file
          </a>
        ) : null}
      </Card>
    </ProtectedPage>
  );
}
