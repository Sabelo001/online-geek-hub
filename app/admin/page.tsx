import { createPracticeTask, createTrainingModule, deleteTrainingModule, updateTrainingModule } from "@/lib/actions";
import { requireRole } from "@/lib/auth";
import { getModules, getProfiles } from "@/lib/data";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader, Select, TextArea, TextInput } from "@/components/ui";
import { TRAINING_CATEGORIES, TRAINING_TRACKS } from "@/lib/types";

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  await requireRole(["admin"]);
  const params = await searchParams;
  const [profiles, modules] = await Promise.all([getProfiles(), getModules()]);

  return (
    <ProtectedPage>
      <PageHeader title="Admin users/settings" eyebrow="Manage" />
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      {params.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{params.message}</p> : null}
      <div className="mb-6 grid gap-4 xl:grid-cols-2">
        <Card>
          <h2 className="text-xl font-bold text-slate-950">Create training module</h2>
          <form action={createTrainingModule} className="mt-4 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Title
              <TextInput name="title" required placeholder="Intro to client-ready research" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Category
              <Select name="category" required defaultValue="Remote Work Basics">
                {TRAINING_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Track
              <Select name="track" required defaultValue="Week 1 Onboarding">
                {TRAINING_TRACKS.map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </Select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Step number
                <TextInput name="step_number" type="number" min="1" max="50" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Estimated time
                <TextInput name="estimated_time" placeholder="30 mins" />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Status
              <Select name="status" required defaultValue="draft">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Description
              <TextArea name="description" required className="min-h-24" placeholder="Short summary trainees can scan." />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Content
              <TextArea name="content" required placeholder="Lesson notes, rubric, and practice guidance." />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Video URL
              <TextInput name="video_url" type="url" placeholder="https://..." />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Material file
              <TextInput name="material" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.txt" />
            </label>
            <button className="focus-ring min-h-11 rounded-md bg-cyan-400 px-5 font-semibold text-slate-950 hover:bg-cyan-300 sm:w-fit">
              Create module
            </button>
          </form>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-slate-950">Create practice task</h2>
          <form action={createPracticeTask} className="mt-4 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Title
              <TextInput name="title" required placeholder="Summarize a research brief" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Task type
              <TextInput name="task_type" required placeholder="Writing" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Difficulty
                <Select name="difficulty" required defaultValue="beginner">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Status
                <Select name="status" required defaultValue="active">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </Select>
              </label>
            </div>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Instructions
              <TextArea name="instructions" required placeholder="What the trainee should do, including constraints and scoring notes." />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Sample file URL
              <TextInput name="sample_file_url" type="url" placeholder="https://..." />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Answer key
              <TextArea name="answer_key" className="min-h-24" placeholder="Optional rubric or ideal answer." />
            </label>
            <button className="focus-ring min-h-11 rounded-md bg-cyan-400 px-5 font-semibold text-slate-950 hover:bg-cyan-300 sm:w-fit">
              Create task
            </button>
          </form>
        </Card>
      </div>
      <Card className="mb-6">
        <h2 className="text-xl font-bold text-slate-950">Training materials</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="py-3 pr-4">Module</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Material</th>
                <th className="py-3 pr-4">Created</th>
                <th className="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => {
                const updateAction = updateTrainingModule.bind(null, module.id);
                const deleteAction = deleteTrainingModule.bind(null, module.id, module.material_path);
                return (
                  <tr key={module.id} className="border-b border-slate-100 align-top">
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-slate-900">{module.title}</p>
                      <p className="mt-1 max-w-md text-slate-500">{module.description}</p>
                    </td>
                    <td className="py-3 pr-4">{module.track ?? module.category}</td>
                    <td className="py-3 pr-4">
                      <Badge tone={module.status === "published" ? "green" : "amber"}>{module.status}</Badge>
                    </td>
                    <td className="py-3 pr-4">{module.material_name ?? "None"}</td>
                    <td className="py-3 pr-4">{new Date(module.created_at).toLocaleDateString()}</td>
                    <td className="py-3 pr-4">
                      <details className="rounded-md border border-slate-200 p-3">
                        <summary className="cursor-pointer font-semibold text-cyan-700">Edit</summary>
                        <form action={updateAction} className="mt-4 grid gap-3">
                          <TextInput name="title" required defaultValue={module.title} />
                          <Select name="category" required defaultValue={module.category}>
                            {TRAINING_CATEGORIES.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </Select>
                          <Select name="track" required defaultValue={module.track ?? "Week 1 Onboarding"}>
                            {TRAINING_TRACKS.map((track) => (
                              <option key={track} value={track}>
                                {track}
                              </option>
                            ))}
                          </Select>
                          <TextInput name="step_number" type="number" min="1" max="50" defaultValue={module.step_number ?? ""} />
                          <TextInput name="estimated_time" defaultValue={module.estimated_time ?? ""} placeholder="30 mins" />
                          <Select name="status" required defaultValue={module.status}>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </Select>
                          <TextArea name="description" required className="min-h-24" defaultValue={module.description} />
                          <TextArea name="content" required defaultValue={module.content} />
                          <TextInput name="video_url" type="url" defaultValue={module.video_url ?? ""} placeholder="https://..." />
                          <TextInput name="material" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.txt" />
                          <button className="focus-ring min-h-10 rounded-md bg-cyan-400 px-4 font-semibold text-slate-950 hover:bg-cyan-300">
                            Save module
                          </button>
                        </form>
                        <form action={deleteAction} className="mt-3">
                          <button className="focus-ring min-h-10 rounded-md border border-red-200 px-4 font-semibold text-red-700 hover:bg-red-50">
                            Delete module
                          </button>
                        </form>
                      </details>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <Card>
        <h2 className="mb-3 text-xl font-bold text-slate-950">Visible profiles</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Role</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-semibold text-slate-900">{profile.full_name}</td>
                  <td className="py-3 pr-4">{profile.email}</td>
                  <td className="py-3 pr-4"><Badge tone={profile.role === "admin" ? "cyan" : profile.role === "reviewer" ? "blue" : "green"}>{profile.role}</Badge></td>
                  <td className="py-3 pr-4">{profile.status}</td>
                  <td className="py-3 pr-4">{new Date(profile.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </ProtectedPage>
  );
}
