import Link from "next/link";
import { notFound } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { getCvProfile } from "@/lib/data";
import { CvPreview } from "@/components/cv-preview";
import { CvPrintButton } from "@/components/cv-print-button";
import { ProtectedPage } from "@/components/protected-page";
import { ButtonLink, Card, PageHeader } from "@/components/ui";

export default async function CvDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ message?: string }>;
}) {
  const [{ id }, query, profile] = await Promise.all([params, searchParams, requireProfile()]);
  const cv = await getCvProfile(id);
  if (!cv) notFound();

  return (
    <ProtectedPage>
      <PageHeader title="CV Preview" eyebrow="CV Generator">
        <div className="flex flex-wrap gap-3 print:hidden">
          {cv.user_id === profile.id ? <ButtonLink href={`/cv/${cv.id}/edit`} variant="secondary">Edit CV</ButtonLink> : null}
          <CvPrintButton />
        </div>
      </PageHeader>
      {query.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800 print:hidden">{query.message}</p> : null}
      <Card className="mb-5 print:hidden">
        <p className="leading-7 text-slate-600">
          This free CV generator is for training and basic career support. Professional review may be added later.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Use <Link href="/cv" className="font-semibold text-cyan-700">CV Generator</Link> to manage your saved CVs.
        </p>
      </Card>
      <CvPreview cv={cv} />
    </ProtectedPage>
  );
}
