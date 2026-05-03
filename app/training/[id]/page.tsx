import { ExternalLink, FileDown } from "lucide-react";
import { notFound } from "next/navigation";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, ButtonLink, Card, PageHeader } from "@/components/ui";
import { getModule, getTrainingMaterialSignedUrl } from "@/lib/data";

function notesToParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default async function TrainingModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const module = await getModule(id);
  if (!module) notFound();

  const material = await getTrainingMaterialSignedUrl(module);
  const paragraphs = notesToParagraphs(module.content);

  return (
    <ProtectedPage>
      <PageHeader title={module.title} eyebrow={module.category}>
        <ButtonLink href="/training" variant="secondary">
          All modules
        </ButtonLink>
      </PageHeader>
      <article className="mx-auto max-w-4xl">
        <Card>
          <div className="flex flex-wrap gap-2">
            <Badge tone={module.status === "published" ? "green" : "amber"}>{module.status}</Badge>
            <Badge>{module.category}</Badge>
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
      </article>
    </ProtectedPage>
  );
}
