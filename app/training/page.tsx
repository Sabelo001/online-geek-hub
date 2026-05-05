import Link from "next/link";
import { BookOpen, ClipboardCheck, FileSearch, Headphones, Lock, MessageSquareText, PenLine, Settings2 } from "lucide-react";
import { publishTrainingMaterial } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";
import { getPublishedModules, getTrainingProgress } from "@/lib/data";
import { TRAINING_TRACKS, type TrainingModule } from "@/lib/types";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader, Select, TextArea, TextInput } from "@/components/ui";

const onboardingSteps = [
  { step: 1, title: "Welcome and Orientation", estimatedTime: "30 mins" },
  { step: 2, title: "Platform Guidelines", estimatedTime: "25 mins" },
  { step: 3, title: "Task Types Overview", estimatedTime: "35 mins" },
  { step: 4, title: "Quality Standards", estimatedTime: "30 mins" },
  { step: 5, title: "Practice Assessment", estimatedTime: "45 mins" }
];

const domainTracks = [
  { name: "Data Annotation Track", icon: ClipboardCheck },
  { name: "Transcription Track", icon: Headphones },
  { name: "AI Evaluation Track", icon: FileSearch },
  { name: "Prompt Review Track", icon: MessageSquareText },
  { name: "Remote Operations Track", icon: Settings2 }
];

function statusBadge(status: "locked" | "available" | "completed") {
  if (status === "completed") return <Badge tone="green">Completed</Badge>;
  if (status === "available") return <Badge tone="cyan">Available</Badge>;
  return <Badge>Locked</Badge>;
}

function moduleForStep(modules: TrainingModule[], step: number, title: string) {
  return modules.find((module) => module.track === "Week 1 Onboarding" && module.step_number === step)
    ?? modules.find((module) => module.track === "Week 1 Onboarding" && module.title === title);
}

function actionButton({
  module,
  locked,
  completed
}: {
  module?: TrainingModule;
  locked: boolean;
  completed: boolean;
}) {
  if (locked) {
    return (
      <button type="button" disabled className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-400">
        Locked
      </button>
    );
  }

  if (!module) {
    return (
      <button type="button" disabled className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-400">
        Coming Soon
      </button>
    );
  }

  return (
    <Link
      href={`/training/${module.id}`}
      className="focus-ring inline-flex items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
    >
      {completed ? "Continue" : "Start"}
    </Link>
  );
}

function OnboardingTrack({
  modules,
  completedIds
}: {
  modules: TrainingModule[];
  completedIds: Set<string>;
}) {
  const completedSteps = new Set<number>();
  onboardingSteps.forEach((step) => {
    const module = moduleForStep(modules, step.step, step.title);
    if (module && completedIds.has(module.id)) completedSteps.add(step.step);
  });

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-700">Onboarding Track</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Week 1</h2>
        </div>
        <Badge tone={completedSteps.size === onboardingSteps.length ? "green" : "cyan"}>{completedSteps.size}/{onboardingSteps.length} complete</Badge>
      </div>
      <div className="mt-5 grid gap-4">
        {onboardingSteps.map((step) => {
          const module = moduleForStep(modules, step.step, step.title);
          const completed = Boolean(module && completedIds.has(module.id));
          const available = step.step === 1 || completedSteps.has(step.step - 1);
          const status = completed ? "completed" : available ? "available" : "locked";

          return (
            <div key={step.step} className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-slate-950 text-sm font-bold text-cyan-300">
                  {String(step.step).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">Estimated time: {module?.estimated_time ?? step.estimatedTime}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {statusBadge(status)}
                {actionButton({ module, locked: status === "locked", completed })}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function DomainTracks({
  modules,
  completedIds,
  unlocked
}: {
  modules: TrainingModule[];
  completedIds: Set<string>;
  unlocked: boolean;
}) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-700">Domain Tracks</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Project Placement Preparation</h2>
        </div>
        {!unlocked ? <Badge>Locked until Week 1 is complete</Badge> : <Badge tone="green">Unlocked</Badge>}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {domainTracks.map((track) => {
          const Icon = track.icon;
          const trackModules = modules.filter((module) => module.track === track.name);
          const completedCount = trackModules.filter((module) => completedIds.has(module.id)).length;
          const progress = trackModules.length ? Math.round((completedCount / trackModules.length) * 100) : 0;
          const nextModule = trackModules.find((module) => !completedIds.has(module.id)) ?? trackModules[0];

          return (
            <Card key={track.name} className={!unlocked ? "opacity-75" : undefined}>
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-[10px] bg-slate-950 text-cyan-400">
                  <Icon className="h-5 w-5" />
                </div>
                {!unlocked ? <Lock className="h-5 w-5 text-slate-400" /> : null}
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-950">{track.name}</h3>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-cyan-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-3 text-sm text-slate-600">{completedCount} of {trackModules.length} modules completed</p>
              <div className="mt-5">
                {unlocked && nextModule ? (
                  <Link
                    href={`/training/${nextModule.id}`}
                    className="focus-ring inline-flex items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    {completedCount ? "Continue" : "Start"}
                  </Link>
                ) : (
                  <button type="button" disabled className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-400">
                    {unlocked ? "Coming Soon" : "Locked"}
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function PublishMaterialForm() {
  return (
    <section id="publish-material">
      <Card>
        <div className="flex items-center gap-3">
          <PenLine className="h-5 w-5 text-cyan-700" />
          <h2 className="text-xl font-bold text-slate-950">Publish Material</h2>
        </div>
        <form action={publishTrainingMaterial} className="mt-4 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Title
            <TextInput name="title" required />
          </label>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Track
              <Select name="track" required defaultValue="Week 1 Onboarding">
                {TRAINING_TRACKS.map((track) => (
                  <option key={track} value={track}>{track}</option>
                ))}
              </Select>
            </label>
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
            Content or resource URL
            <TextArea name="content" required placeholder="Add lesson content, assessment guidance, or a resource URL." />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Material file
            <TextInput name="material" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.txt" />
          </label>
          <button className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 sm:w-fit">
            Publish
          </button>
        </form>
      </Card>
    </section>
  );
}

export default async function TrainingPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const [profile, modules, params] = await Promise.all([
    requireProfile(),
    getPublishedModules(),
    searchParams
  ]);
  const progress = await getTrainingProgress(profile.id);
  const completedIds = new Set(progress.map((item) => item.module_id));
  const weekComplete = onboardingSteps.every((step) => {
    const module = moduleForStep(modules, step.step, step.title);
    return Boolean(module && completedIds.has(module.id));
  });

  return (
    <ProtectedPage>
      <PageHeader title="Training Materials" eyebrow="Learn">
        {profile.role === "admin" ? (
          <a
            href="#publish-material"
            className="focus-ring inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <PenLine className="h-4 w-4" />
            Publish Material
          </a>
        ) : null}
      </PageHeader>
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      {params.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{params.message}</p> : null}
      <div className="grid gap-8">
        {profile.role === "admin" ? <PublishMaterialForm /> : null}
        <OnboardingTrack modules={modules} completedIds={completedIds} />
        <DomainTracks modules={modules} completedIds={completedIds} unlocked={weekComplete} />
        <Card className="border-cyan-100 bg-cyan-50">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-cyan-700" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-700">Upcoming Materials</p>
              <p className="mt-1 font-semibold text-slate-900">More materials coming soon</p>
            </div>
          </div>
        </Card>
      </div>
    </ProtectedPage>
  );
}
