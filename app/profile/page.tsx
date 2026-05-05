import { FileText, Upload, UserCircle } from "lucide-react";
import { uploadProfilePhoto, uploadScholarCv, updateProfileInfo } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ProtectedPage } from "@/components/protected-page";
import { BioForm, SkillsForm } from "@/components/profile-client-forms";
import { PageHeader } from "@/components/ui";

function splitName(fullName: string) {
  const [firstName, ...rest] = fullName.trim().split(/\s+/);
  return {
    firstName: firstName ?? "",
    lastName: rest.join(" ")
  };
}

function roleLabel(role: string) {
  if (role === "trainee") return "Trainee";
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
  const avatarUrl = await signedUrl("scholar-photos", profile.avatar_path);
  const cvUrl = await signedUrl("scholar-cvs", profile.cv_path);
  const skills = Array.isArray(profile.skills) ? profile.skills : [];

  return (
    <ProtectedPage>
      <PageHeader title="Profile" eyebrow="Scholar account" />
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      {params.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{params.message}</p> : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="grid h-40 w-40 place-items-center overflow-hidden rounded-full border-4 border-cyan-100 bg-slate-100 text-4xl font-extrabold text-slate-500">
              {avatarUrl ? (
                <img src={avatarUrl} alt={`${profile.full_name} profile photo`} className="h-full w-full object-cover" />
              ) : (
                <span>{initials(profile.full_name) || <UserCircle className="h-16 w-16" />}</span>
              )}
            </div>
            <form action={uploadProfilePhoto} className="mt-4 grid justify-items-center gap-3">
              <input id="profile-photo" name="photo" type="file" accept="image/png,image/jpeg,image/webp" className="max-w-full text-sm text-slate-600" />
              <button className="focus-ring rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                Change Photo
              </button>
            </form>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-950">{profile.full_name}</h2>
            <span className="mt-3 rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-800">{roleLabel(profile.role)}</span>
            <p className="mt-3 text-sm text-slate-500">{profile.email}</p>
          </div>
        </section>

        <div className="grid gap-5">
          <form action={updateProfileInfo} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">Personal Info</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                First name
                <input name="first_name" defaultValue={profile.first_name ?? fallbackName.firstName} className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 text-slate-950" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Last name
                <input name="last_name" defaultValue={profile.last_name ?? fallbackName.lastName} className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 text-slate-950" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Phone number
                <input name="phone" defaultValue={profile.phone ?? ""} className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 text-slate-950" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Location
                <input name="location" defaultValue={profile.location ?? ""} placeholder="City, country" className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 text-slate-950" />
              </label>
            </div>
            <button className="focus-ring mt-4 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Save Changes
            </button>
          </form>

          <SkillsForm initialSkills={skills} />
          <BioForm initialBio={profile.bio ?? ""} />

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">CV / Resume</p>
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
                <input name="cv" type="file" accept="application/pdf" className="max-w-full text-sm text-slate-600" />
                <button className="focus-ring inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                  <Upload className="h-4 w-4" />
                  {profile.cv_path ? "Replace" : "Upload"}
                </button>
              </form>
              <p className="mt-3 text-xs text-slate-500">PDF only. Maximum file size: 5MB.</p>
            </div>
          </section>
        </div>
      </div>
    </ProtectedPage>
  );
}
