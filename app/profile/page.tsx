import { FileText, Upload } from "lucide-react";
import { updateAvailability, updateProfileTaskTypes, uploadScholarCv, updateProfileInfo } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ProtectedPage } from "@/components/protected-page";
import { BioForm, LanguagesForm, PhotoIdentityBlock, PortfolioLinksForm, SkillsForm } from "@/components/profile-client-forms";
import { Card, PageHeader, Select, TextArea, TextInput } from "@/components/ui";
import { SCHOLAR_TASK_TYPES } from "@/lib/types";

function splitName(fullName: string) {
  const [firstName, ...rest] = fullName.trim().split(/\s+/);
  return {
    firstName: firstName ?? "",
    lastName: rest.join(" ")
  };
}

function roleLabel(role: string) {
  if (role === "trainee") return "Trainee";
  if (role === "admin") return "Admin";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function labelize(value: string | null) {
  if (!value) return "Not set";
  return value.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

async function signedUrl(bucket: string, path: string | null) {
  if (!path) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 15);
  return data?.signedUrl ?? null;
}

export default async function ProfilePage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;
  const profile = await requireProfile();
  const fallbackName = splitName(profile.full_name);
  const avatarUrl = await signedUrl("scholar-avatars", profile.avatar_path);
  const cvUrl = await signedUrl("scholar-cvs", profile.cv_path);
  const skills = Array.isArray(profile.skills) ? profile.skills : [];
  const languages = Array.isArray(profile.languages) ? profile.languages : [];
  const portfolioLinks = Array.isArray(profile.portfolio_links) ? profile.portfolio_links : [];
  const preferredTaskTypes = Array.isArray(profile.preferred_task_types) ? profile.preferred_task_types : [];

  return (
    <ProtectedPage>
      <PageHeader title="Profile" eyebrow="Your Account" />
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      {params.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{params.message}</p> : null}

      <div className="grid gap-6">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-700">Photo and Identity</p>
          <PhotoIdentityBlock
            avatarUrl={avatarUrl}
            initials={initials(profile.full_name)}
            fullName={profile.full_name}
            roleLabel={roleLabel(profile.role)}
            email={profile.email}
          />
        </section>

        <form action={updateProfileInfo} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Personal Info</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              First name
              <TextInput name="first_name" defaultValue={profile.first_name ?? fallbackName.firstName} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Last name
              <TextInput name="last_name" defaultValue={profile.last_name ?? fallbackName.lastName} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Phone number
              <TextInput name="phone" defaultValue={profile.phone ?? ""} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Location
              <TextInput name="location" defaultValue={profile.location ?? ""} placeholder="City, country" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Professional title
              <TextInput name="professional_title" defaultValue={profile.professional_title ?? ""} placeholder="AI Data Contributor" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Availability status
              <Select name="availability_status" defaultValue={profile.availability_status ?? ""}>
                <option value="">Not set</option>
                <option value="available">Available</option>
                <option value="limited">Limited</option>
                <option value="unavailable">Unavailable</option>
                <option value="by_project">By project</option>
              </Select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Work preference
              <Select name="work_preference" defaultValue={profile.work_preference ?? ""}>
                <option value="">Not set</option>
                <option value="part_time">Part-time</option>
                <option value="full_time">Full-time</option>
                <option value="project_based">Project-based</option>
                <option value="temporary">Temporary</option>
                <option value="flexible">Flexible</option>
              </Select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
              Experience summary
              <TextArea
                name="experience_summary"
                defaultValue={profile.experience_summary ?? ""}
                placeholder="Summarize relevant AI data, transcription, review, or remote operations experience."
              />
            </label>
          </div>
          <button className="focus-ring mt-4 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Save Changes
          </button>
        </form>

        <SkillsForm initialSkills={skills} />
        <LanguagesForm initialLanguages={languages} />
        <PortfolioLinksForm initialLinks={portfolioLinks} />

        <form action={updateProfileTaskTypes} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-700">Preferred Task Types</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {SCHOLAR_TASK_TYPES.map((taskType) => (
              <label key={taskType} className="flex items-center gap-3 rounded-md border border-slate-200 p-3 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  name="preferred_task_types"
                  value={taskType}
                  defaultChecked={preferredTaskTypes.includes(taskType)}
                  className="h-4 w-4 rounded border-slate-300 text-cyan-600"
                />
                {taskType}
              </label>
            ))}
          </div>
          <button className="focus-ring mt-4 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Save Task Types
          </button>
        </form>

        <BioForm initialBio={profile.bio ?? ""} />

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-700">CV / Resume</p>
          <div className="mt-3 grid gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-3">
            <p>
              <span className="font-semibold text-slate-800">Status:</span> {labelize(profile.status)}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Availability:</span> {labelize(profile.availability_status)}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Preference:</span> {labelize(profile.work_preference)}
            </p>
          </div>
          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4">
            {profile.cv_path ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-cyan-600" />
                  <div>
                    <p className="font-semibold text-slate-950">{profile.cv_name ?? "Uploaded CV"}</p>
                    <p className="text-sm text-slate-500">Stored as {profile.cv_path}</p>
                  </div>
                </div>
                {cvUrl ? (
                  <a href={cvUrl} className="focus-ring rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white">
                    Download
                  </a>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-slate-600">No CV uploaded yet</p>
            )}
            <form action={uploadScholarCv} className="mt-4 flex flex-wrap items-center gap-3">
              <input name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="max-w-full text-sm text-slate-600" />
              <button className="focus-ring inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                <Upload className="h-4 w-4" />
                {profile.cv_path ? "Replace" : "Upload CV"}
              </button>
            </form>
            <p className="mt-3 text-xs text-slate-500">PDF, DOC, or DOCX only. Maximum file size: 5MB.</p>
          </div>
        </section>

        {profile.role !== "admin" ? (
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-700">Schedule</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Availability</h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <Card>
                <h3 className="text-xl font-bold text-slate-950">Update availability</h3>
                <form action={updateAvailability} className="mt-4 grid gap-4">
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Date
                    <TextInput name="date" type="date" required />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Time block
                    <Select name="time_block" required>
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                      <option value="night">Night</option>
                    </Select>
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Status
                    <Select name="status" required>
                      <option value="available">Available</option>
                      <option value="limited">Limited</option>
                      <option value="unavailable">Unavailable</option>
                    </Select>
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Notes
                    <TextArea name="notes" placeholder="Optional context for admins and reviewers." />
                  </label>
                  <button className="focus-ring min-h-11 rounded-md bg-cyan-400 px-5 font-semibold text-slate-950 hover:bg-cyan-300">
                    Save availability
                  </button>
                </form>
              </Card>
              <Card>
                <h3 className="text-xl font-bold text-slate-950">How availability is used</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  Availability helps admins assign internal practice tasks and plan reviews. It is not used to access, automate, or coordinate
                  third-party platform accounts.
                </p>
              </Card>
            </div>
          </section>
        ) : null}
      </div>
    </ProtectedPage>
  );
}
