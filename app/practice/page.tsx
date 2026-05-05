import Link from "next/link";
import { ClipboardCheck } from "lucide-react";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader } from "@/components/ui";
import { getTasks } from "@/lib/data";

export default async function PracticePage() {
  const tasks = await getTasks();

  return (
    <ProtectedPage>
      <PageHeader title="Practice tasks" eyebrow="Build skill" />
      <div className="grid gap-4 lg:grid-cols-3">
        {tasks.map((task) => (
          <Link key={task.id} href={`/tasks/${task.id}`}>
            <Card className="h-full transition hover:border-cyan-300 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <ClipboardCheck className="h-6 w-6 text-cyan-600" />
                <Badge tone={task.difficulty === "advanced" ? "red" : task.difficulty === "intermediate" ? "amber" : "green"}>
                  {task.difficulty}
                </Badge>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-950">{task.title}</h2>
              <p className="mt-2 text-sm font-semibold text-cyan-700">{task.task_type}</p>
              <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{task.instructions}</p>
            </Card>
          </Link>
        ))}
      </div>
    </ProtectedPage>
  );
}
