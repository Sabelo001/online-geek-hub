import { createCvProfile } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";
import { CvForm } from "@/components/cv-form";
import { ProtectedPage } from "@/components/protected-page";
import { Card, PageHeader } from "@/components/ui";

export default async function NewCvPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const profile = await requireProfile();

  return (
    <ProtectedPage>
      <PageHeader title="Create CV" eyebrow="CV Generator" />
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      <Card className="mb-5">
        <p className="leading-7 text-slate-600">
          This free CV generator is for training and basic career support. Professional review may be added later.
        </p>
      </Card>
      <Card>
        <CvForm
          action={createCvProfile}
          submitLabel="Generate CV preview"
          cv={{
            id: "",
            user_id: profile.id,
            full_name: profile.full_name,
            email: profile.email,
            phone: profile.phone,
            location: "",
            professional_title: "Remote Work Trainee",
            summary: "",
            skills: "Remote communication\nData accuracy\nGoogle Docs\nOnline research",
            experience: "",
            education: "",
            certifications: "",
            referees: "Available on request",
            template: "professional",
            plan: "free",
            created_at: "",
            updated_at: ""
          }}
        />
      </Card>
    </ProtectedPage>
  );
}
