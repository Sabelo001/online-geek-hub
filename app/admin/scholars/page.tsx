import { Search } from "lucide-react";
import { updateScholarStatus } from "@/lib/actions";
import { requireRole } from "@/lib/auth";
import { getProfiles } from "@/lib/data";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader, Select, TextInput } from "@/components/ui";
import { SCHOLAR_STATUSES, SCHOLAR_TASK_TYPES, type Profile, type Status } from "@/lib/types";

function labelize(value: string | null | undefined) {
  if (!value) return "Not set";
  return value.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function statusTone(status: Status) {
  if (status === "active" || status === "project_ready") return "green";
  if (status === "assigned" || status === "trainee") return "cyan";
  if (status === "paused" || status === "pending" || status === "pending_profile") return "amber";
  if (status === "archived" || status === "inactive") return "red";
  return "blue";
}

function listText(items: string[] | null | undefined) {
  return Array.isArray(items) && items.length ? items.join(", ") : "Not provided";
}

function matchesSearch(profile: Profile, search: string) {
  if (!search) return true;
  const haystack = [
    profile.full_name,
    profile.email,
    profile.phone,
    profile.location,
    profile.professional_title,
    profile.status,
    ...(profile.skills ?? []),
    ...(profile.languages ?? []),
    ...(profile.preferred_task_types ?? [])
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(search.toLowerCase());
}

export default async function AdminScholarsPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string; q?: string; status?: string }>;
}) {
  await requireRole(["admin"]);
  const params = await searchParams;
  const search = params.q?.trim() ?? "";
  const status = params.status?.trim() ?? "";
  const profiles = await getProfiles();
  const scholars = profiles
    .filter((profile) => profile.role !== "admin")
    .filter((profile) => !status || profile.status === status)
    .filter((profile) => matchesSearch(profile, search));

  return (
    <ProtectedPage>
      <PageHeader title="Scholar Management" eyebrow="Worksuite">
        <form className="flex flex-wrap gap-2" action="/admin/scholars">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <TextInput name="q" defaultValue={search} placeholder="Search name, skill, status, task type" className="min-w-72 pl-9" />
          </div>
          <Select name="status" defaultValue={status} className="w-48">
            <option value="">All statuses</option>
            {SCHOLAR_STATUSES.map((scholarStatus) => (
              <option key={scholarStatus} value={scholarStatus}>
                {labelize(scholarStatus)}
              </option>
            ))}
          </Select>
          <button className="focus-ring min-h-11 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800">
            Filter
          </button>
        </form>
      </PageHeader>

      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      {params.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{params.message}</p> : null}

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-950">All Scholars</h2>
            <p className="mt-1 text-sm text-slate-500">{scholars.length} profiles match the current view.</p>
          </div>
          <div className="text-sm text-slate-500">Task types: {SCHOLAR_TASK_TYPES.length}</div>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="py-3 pr-4">Scholar</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Skills</th>
                <th className="py-3 pr-4">Task Types</th>
                <th className="py-3 pr-4">Availability</th>
                <th className="py-3 pr-4">Review</th>
              </tr>
            </thead>
            <tbody>
              {scholars.map((scholar) => {
                const updateAction = updateScholarStatus.bind(null, scholar.id);
                return (
                  <tr key={scholar.id} className="border-b border-slate-100 align-top">
                    <td className="py-4 pr-4">
                      <p className="font-semibold text-slate-950">{scholar.full_name}</p>
                      <p className="text-slate-500">{scholar.email}</p>
                      <p className="mt-1 text-slate-500">{scholar.professional_title ?? "No professional title"}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <Badge tone={statusTone(scholar.status)}>{labelize(scholar.status)}</Badge>
                    </td>
                    <td className="max-w-xs py-4 pr-4 text-slate-600">{listText(scholar.skills)}</td>
                    <td className="max-w-xs py-4 pr-4 text-slate-600">{listText(scholar.preferred_task_types)}</td>
                    <td className="py-4 pr-4 text-slate-600">
                      <p>{labelize(scholar.availability_status)}</p>
                      <p className="text-slate-500">{labelize(scholar.work_preference)}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <details className="rounded-md border border-slate-200 p-3">
                        <summary className="cursor-pointer font-semibold text-cyan-700">View and update</summary>
                        <div className="mt-4 grid gap-3 text-slate-600">
                          <p>
                            <span className="font-semibold text-slate-800">Phone:</span> {scholar.phone ?? "Not provided"}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-800">Location:</span> {scholar.location ?? "Not provided"}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-800">Languages:</span> {listText(scholar.languages)}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-800">Resume:</span> {scholar.cv_name ?? scholar.cv_path ?? "Not uploaded"}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-800">Experience:</span>{" "}
                            {scholar.experience_summary ?? "Not provided"}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-800">Bio:</span> {scholar.bio ?? "Not provided"}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-800">Portfolio:</span> {listText(scholar.portfolio_links)}
                          </p>
                        </div>
                        <form action={updateAction} className="mt-4 grid gap-3">
                          <label className="grid gap-2 text-sm font-semibold text-slate-700">
                            Update status
                            <Select name="status" defaultValue={scholar.status}>
                              {SCHOLAR_STATUSES.map((scholarStatus) => (
                                <option key={scholarStatus} value={scholarStatus}>
                                  {labelize(scholarStatus)}
                                </option>
                              ))}
                            </Select>
                          </label>
                          <button className="focus-ring min-h-10 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                            Save Selected Status
                          </button>
                        </form>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {[
                            ["trainee", "Approved for training", "bg-cyan-400 text-slate-950"],
                            ["project_ready", "Ready for pilot tasks", "bg-emerald-500 text-white"],
                            ["project_ready", "Project-ready", "bg-slate-950 text-white"],
                            ["archived", "Archived", "border border-red-200 text-red-700"]
                          ].map(([quickStatus, label, classes]) => (
                            <form key={`${scholar.id}-${label}`} action={updateAction}>
                              <input type="hidden" name="status" value={quickStatus} />
                              <button className={`focus-ring rounded-md px-3 py-2 text-xs font-semibold ${classes}`}>{label}</button>
                            </form>
                          ))}
                        </div>
                      </details>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </ProtectedPage>
  );
}
