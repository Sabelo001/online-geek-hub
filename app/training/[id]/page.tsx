import { ExternalLink, FileDown } from "lucide-react";
import { notFound } from "next/navigation";
import { completeTrainingModule } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, ButtonLink, Card, PageHeader } from "@/components/ui";
import { getModule, getTrainingMaterialSignedUrl, getTrainingProgress } from "@/lib/data";

function notesToParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default async function TrainingModulePage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ message?: string; error?: string }>;
}) {
  const { id } = await params;
  const [module, profile, query] = await Promise.all([getModule(id), requireProfile(), searchParams]);
  if (!module) notFound();

  const [material, progress] = await Promise.all([
    getTrainingMaterialSignedUrl(module),
    getTrainingProgress(profile.id)
  ]);
  const paragraphs = notesToParagraphs(module.content);
  const completed = progress.some((item) => item.module_id === module.id);
  const completeAction = completeTrainingModule.bind(null, module.id);

  return (
    <ProtectedPage>
      <PageHeader title={module.title} eyebrow={module.category}>
        <ButtonLink href="/training" variant="secondary">
          All modules
        </ButtonLink>
      </PageHeader>
      {query.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{query.error}</p> : null}
      {query.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{query.message}</p> : null}
      <article className="mx-auto max-w-4xl">
        <Card>
          <div className="flex flex-wrap gap-2">
            <Badge tone={module.status === "published" ? "green" : "amber"}>{module.status}</Badge>
            <Badge>{module.track ?? module.category}</Badge>
            {module.estimated_time ? <Badge>{module.estimated_time}</Badge> : null}
            {completed ? <Badge tone="green">Completed</Badge> : null}
          </div>
          <p className="mt-5 text-lg leading-8 text-slate-700">{module.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {module.video_url ? (
              <a
                className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                href={module.video_url}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Watch video
              </a>
            ) : null}
            {material?.url ? (
              <a
                className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md bg-cyan-400 px-4 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
                href={material.url}
              >
                <FileDown className="h-4 w-4" />
                Download material
              </a>
            ) : null}
          </div>
          {material?.error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{material.error}</p> : null}
        </Card>

        <Card className="mt-5">
          <h2 className="text-2xl font-bold text-slate-950">Lesson notes</h2>
          <div className="mt-5 grid gap-5 text-base leading-8 text-slate-700">
            {paragraphs.length ? (
              paragraphs.map((paragraph) => (
                <p key={paragraph} className="whitespace-pre-wrap">
                  {paragraph}
                </p>
              ))
            ) : (
              <p>No notes have been added yet.</p>
            )}
          </div>
        </Card>

        <Card className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-950">Progress</h2>
              <p className="mt-1 text-sm text-slate-600">
                {completed ? "This material is marked complete." : "Mark this material complete to unlock the next step when applicable."}
              </p>
            </div>
            {completed ? (
              <button type="button" disabled className="rounded-md border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700">
                Completed
              </button>
            ) : (
              <form action={completeAction}>
                <button className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                  Mark Complete
                </button>
              </form>
            )}
          </div>
        </Card>
      </article>
    </ProtectedPage>
  );
}
