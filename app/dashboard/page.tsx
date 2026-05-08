import { Activity, AlertCircle, Banknote, BookOpen, BriefcaseBusiness, CheckCircle2, Users, type LucideIcon } from "lucide-react";
import { ClearAuthMessage } from "@/components/clear-auth-message";
import { Card, MetricCard, PageHeader } from "@/components/ui";
import { requireProfile } from "@/lib/auth";
import { getDashboardMetrics } from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function getScholarDashboardMetrics(profileId: string) {
  const supabase = await createSupabaseServerClient();
  const [{ count: completedSteps }, { count: activeProjects }, { data: paidInvoices }] = await Promise.all([
    supabase.from("training_progress").select("*", { count: "exact", head: true }).eq("user_id", profileId),
    supabase.from("project_invitations").select("*", { count: "exact", head: true }).eq("scholar_id", profileId).eq("status", "accepted"),
    supabase.from("invoices").select("amount").eq("scholar_id", profileId).eq("status", "paid")
  ]);

  const earnings = (paidInvoices ?? []).reduce((total, invoice) => total + Number(invoice.amount ?? 0), 0);

  return {
    completedSteps: completedSteps ?? 0,
    activeProjects: activeProjects ?? 0,
    earnings
  };
}

type DashboardMetricItem = {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
};

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;
  const profile = await requireProfile();
  let metricItems: DashboardMetricItem[];

  if (profile.role === "admin") {
    const metrics = await getDashboardMetrics();
    metricItems = [
      { label: "Total trainees", value: metrics.totalTrainees, detail: "Active learning cohort", icon: Users },
      { label: "Pending submissions", value: metrics.pendingSubmissions, detail: "Awaiting review", icon: AlertCircle },
      { label: "Average score", value: `${metrics.averageScore}%`, detail: "Reviewed work quality", icon: CheckCircle2 },
      { label: "Available workers today", value: metrics.availableToday, detail: "Ready for internal practice", icon: Activity },
      { label: "Pending payments", value: metrics.pendingPayments, detail: "Need admin action", icon: Banknote }
    ];
  } else {
    const metrics = await getScholarDashboardMetrics(profile.id);
    metricItems = [
      { label: "My Training Status", value: metrics.completedSteps, detail: "Steps completed", icon: BookOpen },
      { label: "My Active Projects", value: metrics.activeProjects, detail: "Projects in progress", icon: BriefcaseBusiness },
      { label: "My Earnings", value: `KES ${metrics.earnings.toLocaleString()}`, detail: "Total paid to date", icon: Banknote }
    ];
  }

  return (
    <>
      <ClearAuthMessage clear={Boolean(params.message)} />
      <PageHeader title="Dashboard" eyebrow="Team overview" />
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      {params.message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{params.message}</p> : null}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metricItems.map((item) => {
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
