import { Trophy } from "lucide-react";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader } from "@/components/ui";
import { getProfiles, getSubmissions } from "@/lib/data";

export default async function LeaderboardPage() {
  const [profiles, submissions] = await Promise.all([getProfiles(), getSubmissions()]);
  const trainees = profiles.filter((profile) => profile.role === "trainee");
  const rows = trainees
    .map((profile) => {
      const own = submissions.filter((submission) => submission.trainee_id === profile.id && typeof submission.score === "number");
      const average = own.length ? Math.round(own.reduce((sum, submission) => sum + Number(submission.score), 0) / own.length) : 0;
      return { profile, average, completed: own.length };
    })
    .sort((a, b) => b.average - a.average);

  return (
    <ProtectedPage>
      <PageHeader title="Leaderboard" eyebrow="Progress" />
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
    </ProtectedPage>
  );
}
