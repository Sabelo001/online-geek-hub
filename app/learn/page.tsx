import Link from "next/link";
import { BookOpen, ClipboardCheck, FileSearch, Headphones, Lock, MessageSquareText, PenLine, Settings2, Trophy } from "lucide-react";
import { publishTrainingMaterial } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";
import { getProfiles, getPublishedModules, getSubmissions, getTasks, getTrainingProgress } from "@/lib/data";
import { TRAINING_TRACKS, type PracticeTask, type Profile, type Submission, type TrainingModule } from "@/lib/types";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader, Select, TextArea, TextInput } from "@/components/ui";

const tabs = [
  { key: "training", label: "Training" },
  { key: "practice", label: "Practice" },
  { key: "leaderboard", label: "Leaderboard" }
] as const;

type LearnTab = (typeof tabs)[number]["key"];

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

function safeTab(tab?: string): LearnTab {
  if (tab === "practice" || tab === "leaderboard") return tab;
  return "training";
}

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

function LearnTabs({ activeTab }: { activeTab: LearnTab }) {
  return (
    <div className="mb-6 flex flex-wrap gap-1 border-b border-slate-200">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.key === "training" ? "/learn" : `/learn?tab=${tab.key}`}
          className={`focus-ring -mb-px border-b-2 px-4 py-3 text-sm font-semibold transition ${
            activeTab === tab.key
              ? "border-[#06b6d4] bg-white text-slate-950"
              : "border-transparent bg-transparent text-slate-500 hover:text-cyan-600"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
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

function TrainingTab({
  profile,
  modules,
  completedIds,
  error,
  message
}: {
  profile: Profile;
  modules: TrainingModule[];
  completedIds: Set<string>;
  error?: string;
  message?: string;
}) {
  const weekComplete = onboardingSteps.every((step) => {
    const module = moduleForStep(modules, step.step, step.title);
    return Boolean(module && completedIds.has(module.id));
  });

  return (
    <div className="grid gap-8">
      {error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      {message ? <p className="rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{message}</p> : null}
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
  );
}

function PracticeTab({ tasks }: { tasks: PracticeTask[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {tasks.map((task) => (
        <Link key={task.id} href={`/tasks/${task.id}`}>
          <Card className="h-full transition hover:border-cyan-300 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
              <ClipboardCheck className="h-6 w-6 text-cyan-600" />
              <Badge tone={task.difficulty === "advanced" ? "red" : task.difficulty === "intermediate" ? "amber" : "green"}>
                {task.difficulty}
              </Badge>
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-950">{task.title}</h2>
            <p className="mt-2 text-sm font-semibold text-cyan-700">{task.task_type}</p>
            <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{task.instructions}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function LeaderboardTab({
  profiles,
  submissions
}: {
  profiles: Profile[];
  submissions: Submission[];
}) {
  const trainees = profiles.filter((profile) => profile.role === "trainee");
  const rows = trainees
    .map((profile) => {
      const own = submissions.filter((submission) => submission.trainee_id === profile.id && typeof submission.score === "number");
      const average = own.length ? Math.round(own.reduce((sum, submission) => sum + Number(submission.score), 0) / own.length) : 0;
      return { profile, average, completed: own.length };
    })
    .sort((a, b) => b.average - a.average);

  return (
    <Card>
      <div className="grid gap-3">
        {rows.map((row, index) => (
          <div key={row.profile.id} className="grid gap-3 rounded-md border border-slate-200 p-4 sm:grid-cols-[56px_1fr_auto_auto] sm:items-center">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-[#071527] text-white">
              <Trophy className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <p className="font-bold text-slate-950">
                #{index + 1} {row.profile.full_name}
              </p>
              <p className="text-sm text-slate-500">{row.profile.email}</p>
            </div>
            <Badge tone="green">{row.average}% avg</Badge>
            <span className="text-sm font-semibold text-slate-600">{row.completed} reviewed</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default async function LearnPage({
  searchParams
}: {
  searchParams: Promise<{ tab?: string; error?: string; message?: string }>;
}) {
  const params = await searchParams;
  const activeTab = safeTab(params.tab);
  const [profile, modules, tasks, profiles, submissions] = await Promise.all([
    requireProfile(),
    getPublishedModules(),
    getTasks(),
    getProfiles(),
    getSubmissions()
  ]);
  const progress = await getTrainingProgress(profile.id);
  const completedIds = new Set(progress.map((item) => item.module_id));

  return (
    <ProtectedPage>
      <PageHeader title="Training and Practice" eyebrow="Learn" />
      <LearnTabs activeTab={activeTab} />
      {activeTab === "training" ? (
        <TrainingTab profile={profile} modules={modules} completedIds={completedIds} error={params.error} message={params.message} />
      ) : null}
      {activeTab === "practice" ? <PracticeTab tasks={tasks} /> : null}
      {activeTab === "leaderboard" ? <LeaderboardTab profiles={profiles} submissions={submissions} /> : null}
    </ProtectedPage>
  );
}
