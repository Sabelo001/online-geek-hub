import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { deleteCvProfile } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";
import { getCvProfiles } from "@/lib/data";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, ButtonLink, Card, PageHeader } from "@/components/ui";

export default async function CvPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;
  const profile = await requireProfile();
  const cvs = await getCvProfiles(profile);

  return (
    <ProtectedPage>
      <PageHeader title="CV Generator" eyebrow="Career support">
        <ButtonLink href="/cv/new">
          <span className="inline-flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New CV
          </span>
        </ButtonLink>
      </PageHeader>
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      {params.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{params.message}</p> : null}
      <Card className="mb-5">
        <p className="leading-7 text-slate-600">
          This free CV generator is for training and basic career support. Professional review may be added later.
        </p>
        <p className="mt-3 rounded-md bg-slate-50 p-3 text-sm font-semibold text-slate-700">
          Coming later: professional CV review, premium templates, and job application support.
        </p>
      </Card>
      <div className="grid gap-4">
        {cvs.map((cv) => {
          const deleteAction = deleteCvProfile.bind(null, cv.id);
          return (
            <Card key={cv.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-cyan-600" />
                    <h2 className="text-xl font-bold text-slate-950">{cv.full_name}</h2>
                  </div>
                  <p className="mt-1 text-slate-600">{cv.professional_title ?? "Untitled CV"}</p>
                  <p className="mt-2 text-sm text-slate-500">Updated {new Date(cv.updated_at).toLocaleDateString()}</p>
                </div>
                <Badge tone={cv.template === "data_annotation" ? "green" : cv.template === "remote_work" ? "cyan" : "blue"}>
                  {cv.template.replace("_", " ")}
                </Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link className="focus-ring rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300" href={`/cv/${cv.id}`}>
                  Preview
                </Link>
                <Link className="focus-ring rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100" href={`/cv/${cv.id}/edit`}>
                  Edit
                </Link>
                {cv.user_id === profile.id ? (
                  <form action={deleteAction}>
                    <button className="focus-ring rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
                      Delete
                    </button>
                  </form>
                ) : null}
              </div>
            </Card>
          );
        })}
        {!cvs.length ? (
          <Card>
            <p className="text-slate-600">No CVs yet. Create your first CV to get started.</p>
          </Card>
        ) : null}
      </div>
    </ProtectedPage>
  );
}
