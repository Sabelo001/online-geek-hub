import { notFound, redirect } from "next/navigation";
import { updateCvProfile } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";
import { getCvProfile } from "@/lib/data";
import { CvForm } from "@/components/cv-form";
import { ProtectedPage } from "@/components/protected-page";
import { Card, PageHeader } from "@/components/ui";

export default async function EditCvPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ id }, query, profile] = await Promise.all([params, searchParams, requireProfile()]);
  const cv = await getCvProfile(id);
  if (!cv) notFound();
  if (cv.user_id !== profile.id) redirect(`/cv/${cv.id}`);
  const action = updateCvProfile.bind(null, cv.id);

  return (
    <ProtectedPage>
      <PageHeader title="Edit CV" eyebrow="CV Generator" />
      {query.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{query.error}</p> : null}
      <Card>
        <CvForm action={action} cv={cv} submitLabel="Save CV" />
      </Card>
    </ProtectedPage>
  );
}
