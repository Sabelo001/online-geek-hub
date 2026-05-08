import Link from "next/link";
import { Fragment } from "react";
import { BriefcaseBusiness, CheckCircle2, Clock3, MessageSquareText, Send } from "lucide-react";
import { createProject, respondToProjectInvitation, sendProjectInvitations } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";
import { getProfiles, getProjectInvitations, getProjectsWithInvitations } from "@/lib/data";
import type { Profile, ProjectInvitation, ProjectWithInvitations } from "@/lib/types";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader, Select, TextArea, TextInput } from "@/components/ui";

const tabs = [
  { key: "pending", label: "Pending" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" }
] as const;

type TabKey = (typeof tabs)[number]["key"];

function safeTab(tab?: string): TabKey {
  if (tab === "active" || tab === "completed") return tab;
  return "pending";
}

function formatDate(date: string | null) {
  if (!date) return "Not set";
  return new Date(date).toLocaleDateString();
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <Card>
      <p className="text-slate-600">{children}</p>
    </Card>
  );
}

function PendingCard({ invitation }: { invitation: ProjectInvitation }) {
  const acceptAction = respondToProjectInvitation.bind(null, invitation.id, "accepted");
  const declineAction = respondToProjectInvitation.bind(null, invitation.id, "declined");

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-950">{invitation.project_title}</h2>
          <div className="mt-2">
            <Badge tone="cyan">{invitation.project_type}</Badge>
          </div>
        </div>
        <Clock3 className="h-6 w-6 text-cyan-600" />
      </div>
      <p className="mt-4 leading-7 text-slate-600">{invitation.short_description}</p>
      <p className="mt-4 text-sm font-semibold text-amber-600">Respond by {formatDate(invitation.deadline)}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <form action={acceptAction}>
          <button className="cta-primary dark-cta focus-ring">Accept Project</button>
        </form>
        <form action={declineAction}>
          <button className="cta-secondary focus-ring">Decline</button>
        </form>
      </div>
    </Card>
  );
}

function ActiveCard({ invitation }: { invitation: ProjectInvitation }) {
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-950">{invitation.project_title}</h2>
          <Badge tone="green">In Progress</Badge>
        </div>
        <BriefcaseBusiness className="h-6 w-6 text-cyan-600" />
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
        <p><span className="font-semibold text-slate-950">Start date:</span> {formatDate(invitation.start_date ?? invitation.responded_at)}</p>
        <p><span className="font-semibold text-slate-950">Deadline:</span> {formatDate(invitation.deadline)}</p>
      </div>
      <p className="mt-4 leading-7 text-slate-600">{invitation.instructions ?? invitation.short_description}</p>
      <Link
        href={`/tasks/projects/${invitation.project_id}`}
        className="focus-ring mt-5 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
      >
        View Details
      </Link>
    </Card>
  );
}

function CompletedCard({ invitation }: { invitation: ProjectInvitation }) {
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-950">{invitation.project_title}</h2>
          <p className="mt-2 text-sm text-slate-600">Completed {formatDate(invitation.completed_at)}</p>
        </div>
        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-600">
        Score received: {typeof invitation.score === "number" ? `${invitation.score}%` : "Not available yet"}
      </p>
      <button className="focus-ring mt-5 inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
        <MessageSquareText className="h-4 w-4" />
        View Feedback
      </button>
    </Card>
  );
}

function statusTone(status: string): "blue" | "green" | "red" {
  if (status === "active" || status === "accepted") return "green";
  if (status === "closed" || status === "declined") return "red";
  return "blue";
}

function invitationCounts(project: ProjectWithInvitations) {
  return {
    invited: project.invitations.length,
    accepted: project.invitations.filter((invitation) => invitation.status === "accepted").length,
    declined: project.invitations.filter((invitation) => invitation.status === "declined").length
  };
}

function AdminTasksPage({
  params,
  projectsWithInvitations,
  scholars
}: {
  params: { error?: string; message?: string };
  projectsWithInvitations: ProjectWithInvitations[];
  scholars: Profile[];
}) {
  const statusMessage = params.message === "Project created." ? "Project created" : params.message;

  return (
    <ProtectedPage>
      <PageHeader title="Tasks and Projects" eyebrow="Project Management" />
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      {statusMessage ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{statusMessage}</p> : null}

      <div className="grid gap-6">
        <Card>
          <h2 className="text-xl font-bold text-slate-950">Create a Project</h2>
          <form action={createProject} className="mt-4 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Project title
              <TextInput name="title" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Project type
              <Select name="project_type" required defaultValue="Data Annotation">
                <option>Data Annotation</option>
                <option>Transcription</option>
                <option>AI Evaluation</option>
                <option>Prompt and Response Review</option>
                <option>Remote Operations</option>
              </Select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Description
              <TextArea name="description" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Deadline
              <TextInput name="deadline" type="date" />
            </label>
            <button className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 sm:w-fit">
              Create Project
            </button>
          </form>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-slate-950">Invite Scholars</h2>
          <form action={sendProjectInvitations} className="mt-4 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Select project
              <Select name="project_id" required defaultValue="">
                <option value="" disabled>Choose a project</option>
                {projectsWithInvitations.map((project) => (
                  <option key={project.id} value={project.id}>{project.title}</option>
                ))}
              </Select>
            </label>
            <fieldset className="grid gap-2">
              <legend className="text-sm font-semibold text-slate-700">Select scholars to invite</legend>
              <div className="grid gap-2 rounded-md border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2 lg:grid-cols-3">
                {scholars.map((scholar) => (
                  <label key={scholar.id} className="flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" name="scholar_ids" value={scholar.id} className="h-4 w-4 accent-cyan-500" />
                    <span>{scholar.full_name}</span>
                  </label>
                ))}
                {!scholars.length ? <p className="text-sm text-slate-500">No scholars are available to invite yet.</p> : null}
              </div>
            </fieldset>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Optional message to scholars
              <TextArea name="message" />
            </label>
            <button className="focus-ring inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 sm:w-fit">
              <Send className="h-4 w-4" />
              Send Invitations
            </button>
          </form>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-slate-950">All Projects</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="py-3 pr-4">Project title</th>
                  <th className="py-3 pr-4">Type</th>
                  <th className="py-3 pr-4">Deadline</th>
                  <th className="py-3 pr-4">Invited</th>
                  <th className="py-3 pr-4">Accepted</th>
                  <th className="py-3 pr-4">Declined</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projectsWithInvitations.map((project) => {
                  const counts = invitationCounts(project);
                  return (
                    <Fragment key={project.id}>
                      <tr>
                        <td className="py-3 pr-4 font-semibold text-slate-950">{project.title}</td>
                        <td className="py-3 pr-4 text-slate-600">{project.project_type}</td>
                        <td className="py-3 pr-4 text-slate-600">{formatDate(project.deadline)}</td>
                        <td className="py-3 pr-4 text-slate-600">{counts.invited}</td>
                        <td className="py-3 pr-4 text-slate-600">{counts.accepted}</td>
                        <td className="py-3 pr-4 text-slate-600">{counts.declined}</td>
                        <td className="py-3 pr-4"><Badge tone={statusTone(project.status)}>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</Badge></td>
                      </tr>
                      <tr>
                        <td colSpan={7} className="pb-4 pr-4">
                          <details className="rounded-md border border-slate-200 bg-slate-50 p-3">
                            <summary className="cursor-pointer text-sm font-semibold text-slate-700">Scholar responses</summary>
                            <div className="mt-3 overflow-x-auto">
                              <table className="w-full min-w-[520px] text-left text-sm">
                                <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                                  <tr>
                                    <th className="py-2 pr-4">Scholar name</th>
                                    <th className="py-2 pr-4">Response</th>
                                    <th className="py-2 pr-4">Date</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {project.invitations.map((invitation) => (
                                    <tr key={invitation.id}>
                                      <td className="py-2 pr-4 font-semibold text-slate-950">{invitation.profiles?.full_name ?? "Scholar"}</td>
                                      <td className="py-2 pr-4"><Badge tone={statusTone(invitation.status)}>{invitation.status}</Badge></td>
                                      <td className="py-2 pr-4 text-slate-500">{invitation.responded_at ? formatDate(invitation.responded_at) : "No response yet"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              {!project.invitations.length ? <p className="py-3 text-sm text-slate-500">No invitations sent for this project yet.</p> : null}
                            </div>
                          </details>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
            {!projectsWithInvitations.length ? <p className="py-4 text-sm text-slate-500">No projects created yet.</p> : null}
          </div>
        </Card>
      </div>
    </ProtectedPage>
  );
}

export default async function TasksAndProjectsPage({
  searchParams
}: {
  searchParams: Promise<{ tab?: string; error?: string; message?: string }>;
}) {
  const params = await searchParams;
  const profile = await requireProfile();
  if (profile.role === "admin") {
    const [projectsWithInvitations, profiles] = await Promise.all([
      getProjectsWithInvitations(),
      getProfiles()
    ]);
    const scholars = profiles.filter((item) => item.role === "trainee" || String(item.role) === "scholar");
    return <AdminTasksPage params={params} projectsWithInvitations={projectsWithInvitations} scholars={scholars} />;
  }

  const activeTab = safeTab(params.tab);
  const invitations = await getProjectInvitations(profile.id);
  const pending = invitations.filter((invitation) => invitation.status === "pending");
  const active = invitations.filter((invitation) => invitation.status === "accepted");
  const completed = invitations.filter((invitation) => invitation.status === "completed");
  const visibleInvitations = activeTab === "pending" ? pending : activeTab === "active" ? active : completed;

  return (
    <ProtectedPage>
      <PageHeader title="Tasks and Projects" eyebrow="Assignments" />
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      {params.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{params.message}</p> : null}

      <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={`/tasks?tab=${tab.key}`}
            className={`focus-ring -mb-px rounded-t-md border px-4 py-2 text-sm font-semibold ${
              activeTab === tab.key
                ? "border-slate-200 border-b-white bg-white text-slate-950"
                : "border-transparent text-slate-500 hover:text-slate-950"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-4">
        {visibleInvitations.map((invitation) => {
          if (activeTab === "pending") return <PendingCard key={invitation.id} invitation={invitation} />;
          if (activeTab === "active") return <ActiveCard key={invitation.id} invitation={invitation} />;
          return <CompletedCard key={invitation.id} invitation={invitation} />;
        })}
        {!visibleInvitations.length && activeTab === "pending" ? <EmptyState>No pending invitations right now.</EmptyState> : null}
        {!visibleInvitations.length && activeTab === "active" ? (
          <EmptyState>No active projects. Check back when you receive an invitation.</EmptyState>
        ) : null}
        {!visibleInvitations.length && activeTab === "completed" ? <EmptyState>No completed projects yet.</EmptyState> : null}
      </div>
    </ProtectedPage>
  );
}
