import { Activity, AlertCircle, Banknote, CheckCircle2, Users } from "lucide-react";
import { Card, MetricCard, PageHeader } from "@/components/ui";
import { getDashboardMetrics } from "@/lib/data";

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;
  const metrics = await getDashboardMetrics();
  const items = [
    { label: "Total trainees", value: metrics.totalTrainees, detail: "Active learning cohort", icon: Users },
    { label: "Pending submissions", value: metrics.pendingSubmissions, detail: "Awaiting review", icon: AlertCircle },
    { label: "Average score", value: `${metrics.averageScore}%`, detail: "Reviewed work quality", icon: CheckCircle2 },
    { label: "Available workers today", value: metrics.availableToday, detail: "Ready for internal practice", icon: Activity },
    { label: "Pending payments", value: metrics.pendingPayments, detail: "Need admin action", icon: Banknote }
  ];

  return (
    <>
      <PageHeader title="Dashboard" eyebrow="Team overview" />
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      {params.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{params.message}</p> : null}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="relative">
              <MetricCard label={item.label} value={item.value} detail={item.detail} />
              <Icon className="absolute right-5 top-5 h-5 w-5 text-cyan-500" />
            </div>
          );
        })}
      </div>
      <Card className="mt-6">
        <h2 className="text-xl font-bold text-slate-950">Safety boundary</h2>
        <p className="mt-2 max-w-4xl leading-7 text-slate-600">
          Online Geek Hub is for training, practice, coordination, reviews, scoring, availability, and payment tracking only.
          It does not connect to, scrape, embed, automate, proxy, or bypass third-party work platforms or client systems.
        </p>
      </Card>
    </>
  );
}
