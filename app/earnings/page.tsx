import Link from "next/link";
import { CalendarDays, CircleDollarSign, FileText } from "lucide-react";
import { generateInvoiceForScholar, updateInvoiceStatus } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";
import { getInvoices, getMyTimesheets, getPayments, getProfiles, getScholarEarningsSummary, getTimesheets, type EarningsCurrencySummary, type InvoiceFilters } from "@/lib/data";
import type { Invoice, InvoiceStatus, Payment, Profile, Timesheet } from "@/lib/types";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader, Select, TextInput } from "@/components/ui";

const tabs = [
  { key: "invoices", label: "Invoices" },
  { key: "timesheets", label: "Timesheets" },
  { key: "payments", label: "Payments" }
] as const;

type EarningsTab = (typeof tabs)[number]["key"];

const statusOptions: InvoiceStatus[] = ["draft", "submitted", "pending", "approved", "paid", "rejected"];

function firstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function safeTab(tab?: string): EarningsTab {
  if (tab === "timesheets") return "timesheets";
  if (tab === "payments") return "payments";
  return "invoices";
}

function safeStatus(status?: string): InvoiceStatus | undefined {
  return statusOptions.includes(status as InvoiceStatus) ? (status as InvoiceStatus) : undefined;
}

function formatDate(date: string | null) {
  if (!date) return "Not set";
  return new Date(date).toLocaleDateString();
}

function formatCurrencyAmount(amount: number | null | undefined, currency = "USD") {
  return `${currency} ${Number(amount ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function formatMoney(invoice: Pick<Invoice, "amount" | "currency" | "total_amount">) {
  return formatCurrencyAmount(invoice.total_amount ?? invoice.amount, invoice.currency);
}

function formatAmount(amount: number, currency = "KES") {
  return `${currency} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function invoiceNumber(invoice: Invoice) {
  return invoice.invoice_number ?? `INV-${invoice.id.slice(0, 8).toUpperCase()}`;
}

function projectName(invoice: Invoice) {
  return invoice.projects?.title ?? "Project";
}

function scholarName(invoice: Invoice) {
  return invoice.profiles?.full_name ?? invoice.profiles?.email ?? "Scholar";
}

function statusTone(status: InvoiceStatus): "amber" | "cyan" | "green" | "red" {
  if (status === "approved" || status === "submitted") return "cyan";
  if (status === "paid") return "green";
  if (status === "rejected") return "red";
  return "amber";
}

function statusLabel(status: InvoiceStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function EarningsTabs({ activeTab }: { activeTab: EarningsTab }) {
  return (
    <div className="mb-6 flex flex-wrap gap-1 border-b border-slate-200">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.key === "invoices" ? "/earnings" : `/earnings?tab=${tab.key}`}
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

function summaryStats(invoices: Invoice[]) {
  const paidInvoices = invoices.filter((invoice) => invoice.status === "paid");
  const totalEarned = paidInvoices.reduce((sum, invoice) => sum + Number(invoice.amount), 0);
  const pendingAmount = invoices
    .filter((invoice) => invoice.status === "pending")
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);
  const lastPayment = paidInvoices
    .map((invoice) => invoice.paid_at)
    .filter((date): date is string => Boolean(date))
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];

  return { totalEarned, pendingAmount, lastPayment: lastPayment ?? null };
}

function SummaryBar({ invoices }: { invoices: Invoice[] }) {
  const summary = summaryStats(invoices);

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <Card className="border-emerald-100 bg-emerald-50">
        <div className="flex items-center gap-3">
          <CircleDollarSign className="h-5 w-5 text-emerald-700" />
          <p className="text-sm font-semibold text-emerald-800">Total earned</p>
        </div>
        <p className="mt-3 text-2xl font-bold text-emerald-900">{formatAmount(summary.totalEarned)}</p>
      </Card>
      <Card className="border-amber-100 bg-amber-50">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-amber-700" />
          <p className="text-sm font-semibold text-amber-800">Pending amount</p>
        </div>
        <p className="mt-3 text-2xl font-bold text-amber-900">{formatAmount(summary.pendingAmount)}</p>
      </Card>
      <Card>
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-cyan-700" />
          <p className="text-sm font-semibold text-slate-700">Last payment date</p>
        </div>
        <p className="mt-3 text-2xl font-bold text-slate-950">{formatDate(summary.lastPayment)}</p>
      </Card>
    </div>
  );
}

function ViewInvoiceButton({ invoiceId }: { invoiceId: string }) {
  return (
    <Link href={`/earnings/invoices/${invoiceId}`} className="focus-ring inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
      View Invoice
    </Link>
  );
}

function InvoiceCard({ invoice }: { invoice: Invoice }) {
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">{invoiceNumber(invoice)}</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">{projectName(invoice)}</h2>
        </div>
        <Badge tone={statusTone(invoice.status)}>{statusLabel(invoice.status)}</Badge>
      </div>
      <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <p>
          <span className="font-semibold text-slate-950">Amount:</span> {formatMoney(invoice)}
        </p>
        <p>
          <span className="font-semibold text-slate-950">Date issued:</span> {formatDate(invoice.issued_at)}
        </p>
      </div>
      {invoice.notes ? <p className="mt-4 leading-7 text-slate-600">{invoice.notes}</p> : null}
      <div className="mt-5">
        <ViewInvoiceButton invoiceId={invoice.id} />
      </div>
    </Card>
  );
}

function EmptyState() {
  return (
    <Card>
      <p className="text-slate-600">No invoices yet. Invoices appear here after you complete a project.</p>
    </Card>
  );
}

function InvoiceActionButton({ invoice, status, children }: { invoice: Invoice; status: "approved" | "rejected" | "paid"; children: string }) {
  const action = updateInvoiceStatus.bind(null, invoice.id, status);

  return (
    <form action={action}>
      <button className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100">
        {children}
      </button>
    </form>
  );
}

function AdminFilters({
  filters,
  scholars
}: {
  filters: InvoiceFilters;
  scholars: Profile[];
}) {
  return (
    <Card>
      <form className="grid gap-4 md:grid-cols-4 md:items-end">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Scholar
          <Select name="scholar" defaultValue={filters.scholarId ?? ""}>
            <option value="">All scholars</option>
            {scholars.map((scholar) => (
              <option key={scholar.id} value={scholar.id}>
                {scholar.full_name}
              </option>
            ))}
          </Select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Status
          <Select name="status" defaultValue={filters.status ?? ""}>
            <option value="">All statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {statusLabel(status)}
              </option>
            ))}
          </Select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          From
          <TextInput name="date_from" type="date" defaultValue={filters.dateFrom ?? ""} />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          To
          <TextInput name="date_to" type="date" defaultValue={filters.dateTo ?? ""} />
        </label>
        <button className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 md:w-fit">
          Apply Filters
        </button>
      </form>
    </Card>
  );
}

function AdminInvoiceTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-3 pr-4">Invoice</th>
              <th className="py-3 pr-4">Scholar</th>
              <th className="py-3 pr-4">Project</th>
              <th className="py-3 pr-4">Amount</th>
              <th className="py-3 pr-4">Issued</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="py-4 pr-4 font-semibold text-slate-950">{invoiceNumber(invoice)}</td>
                <td className="py-4 pr-4 text-slate-600">{scholarName(invoice)}</td>
                <td className="py-4 pr-4 text-slate-600">{projectName(invoice)}</td>
                <td className="py-4 pr-4 text-slate-600">{formatMoney(invoice)}</td>
                <td className="py-4 pr-4 text-slate-600">{formatDate(invoice.issued_at)}</td>
                <td className="py-4 pr-4">
                  <Badge tone={statusTone(invoice.status)}>{statusLabel(invoice.status)}</Badge>
                </td>
                <td className="py-4 pr-4">
                  <div className="flex flex-wrap gap-2">
                    <ViewInvoiceButton invoiceId={invoice.id} />
                    {invoice.status !== "approved" && invoice.status !== "paid" ? (
                      <InvoiceActionButton invoice={invoice} status="approved">Approve</InvoiceActionButton>
                    ) : null}
                    {invoice.status !== "rejected" && invoice.status !== "paid" ? (
                      <InvoiceActionButton invoice={invoice} status="rejected">Reject</InvoiceActionButton>
                    ) : null}
                    {invoice.status !== "paid" ? (
                      <InvoiceActionButton invoice={invoice} status="paid">Mark as Paid</InvoiceActionButton>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!invoices.length ? <p className="py-4 text-sm text-slate-500">No invoices match the current filters.</p> : null}
      </div>
    </Card>
  );
}

function TimesheetStatusBadge({ status }: { status: Timesheet["status"] }) {
  const tone = status === "approved" ? "green" : status === "rejected" ? "red" : status === "submitted" ? "cyan" : "amber";
  return <Badge tone={tone}>{status}</Badge>;
}

function TimesheetTotals({ summary }: { summary: EarningsCurrencySummary[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-emerald-100 bg-emerald-50">
        <p className="text-sm font-semibold text-emerald-800">Total approved amount</p>
        <p className="mt-3 text-2xl font-bold text-emerald-900">
          {summary.length ? summary.map((item) => formatCurrencyAmount(item.approved, item.currency)).join(" / ") : "USD 0.00"}
        </p>
      </Card>
      <Card className="border-amber-100 bg-amber-50">
        <p className="text-sm font-semibold text-amber-800">Total pending amount</p>
        <p className="mt-3 text-2xl font-bold text-amber-900">
          {summary.length ? summary.map((item) => formatCurrencyAmount(item.pending, item.currency)).join(" / ") : "USD 0.00"}
        </p>
      </Card>
    </div>
  );
}

function TimesheetTable({ timesheets, showScholar }: { timesheets: Timesheet[]; showScholar: boolean }) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {showScholar ? <th className="py-3 pr-4">Scholar</th> : null}
              <th className="py-3 pr-4">Project</th>
              <th className="py-3 pr-4">Work date</th>
              <th className="py-3 pr-4">Hours</th>
              <th className="py-3 pr-4">Rate</th>
              <th className="py-3 pr-4">Amount</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {timesheets.map((timesheet) => (
              <tr key={timesheet.id}>
                {showScholar ? <td className="py-4 pr-4 text-slate-600">{timesheet.profiles?.full_name ?? "Scholar"}</td> : null}
                <td className="py-4 pr-4 font-semibold text-slate-950">{timesheet.projects?.title ?? "Project"}</td>
                <td className="py-4 pr-4 text-slate-600">{formatDate(timesheet.work_date)}</td>
                <td className="py-4 pr-4 text-slate-600">{Number(timesheet.hours).toLocaleString()}</td>
                <td className="py-4 pr-4 text-slate-600">
                  {timesheet.rate_amount ? `${formatCurrencyAmount(timesheet.rate_amount, timesheet.currency)} / ${timesheet.projects?.rate_unit ?? "hour"}` : "Not set"}
                </td>
                <td className="py-4 pr-4 text-slate-600">{formatCurrencyAmount(timesheet.calculated_amount, timesheet.currency)}</td>
                <td className="py-4 pr-4"><TimesheetStatusBadge status={timesheet.status} /></td>
                <td className="py-4 pr-4">
                  {timesheet.invoice_id ? (
                    <Link href={`/earnings/invoices/${timesheet.invoice_id}`} className="font-semibold text-cyan-700 hover:underline">
                      View
                    </Link>
                  ) : (
                    <span className="text-slate-400">Not invoiced</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!timesheets.length ? <p className="py-4 text-sm text-slate-500">No timesheets found.</p> : null}
      </div>
    </Card>
  );
}

function GenerateInvoiceCard({ scholars, timesheets }: { scholars: Profile[]; timesheets: Timesheet[] }) {
  const eligibleScholarIds = new Set(
    timesheets
      .filter((timesheet) => timesheet.status === "approved" && !timesheet.invoice_id && Number(timesheet.calculated_amount ?? 0) > 0)
      .map((timesheet) => timesheet.scholar_id)
      .filter(Boolean)
  );

  return (
    <Card>
      <h2 className="text-xl font-bold text-slate-950">Generate Invoice from Approved Timesheets</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Creates one submitted invoice from all approved, uninvoiced timesheets for the selected Scholar.
      </p>
      <form action={generateInvoiceForScholar} className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Scholar
          <Select name="scholar_id" required defaultValue="">
            <option value="" disabled>Choose a Scholar</option>
            {scholars.map((scholar) => (
              <option key={scholar.id} value={scholar.id}>
                {scholar.full_name}{eligibleScholarIds.has(scholar.id) ? "" : " (no approved uninvoiced time)"}
              </option>
            ))}
          </Select>
        </label>
        <button className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          Generate Invoice
        </button>
      </form>
    </Card>
  );
}

function TimesheetsTab({
  profile,
  timesheets,
  scholars,
  summary
}: {
  profile: Profile;
  timesheets: Timesheet[];
  scholars: Profile[];
  summary: EarningsCurrencySummary[];
}) {
  const isAdmin = profile.role === "admin";
  return (
    <div className="grid gap-6">
      <TimesheetTotals summary={summary} />
      {isAdmin ? <GenerateInvoiceCard scholars={scholars} timesheets={timesheets} /> : null}
      <TimesheetTable timesheets={timesheets} showScholar={isAdmin} />
    </div>
  );
}

function InvoicesTab({
  profile,
  invoices,
  scholars,
  filters,
  error,
  message
}: {
  profile: Profile;
  invoices: Invoice[];
  scholars: Profile[];
  filters: InvoiceFilters;
  error?: string;
  message?: string;
}) {
  if (profile.role === "admin") {
    return (
      <div className="grid gap-6">
        {error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        {message ? <p className="rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{message}</p> : null}
        <AdminFilters filters={filters} scholars={scholars} />
        <AdminInvoiceTable invoices={invoices} />
      </div>
    );
  }

  return (
    <>
      {error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      {message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{message}</p> : null}
      <SummaryBar invoices={invoices} />
      <div className="grid gap-4">
        {invoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
        {!invoices.length ? <EmptyState /> : null}
      </div>
    </>
  );
}

function PaymentsTab({ payments }: { payments: Payment[] }) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="py-3 pr-4">Reason</th>
              <th className="py-3 pr-4">Amount</th>
              <th className="py-3 pr-4">Method</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Created</th>
              <th className="py-3 pr-4">Paid</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-slate-100">
                <td className="py-3 pr-4 font-semibold text-slate-900">{payment.reason}</td>
                <td className="py-3 pr-4">{payment.currency} {payment.amount.toLocaleString()}</td>
                <td className="py-3 pr-4">{payment.payment_method ?? "Not set"}</td>
                <td className="py-3 pr-4"><Badge tone={payment.status === "paid" ? "green" : "amber"}>{payment.status}</Badge></td>
                <td className="py-3 pr-4">{new Date(payment.created_at).toLocaleDateString()}</td>
                <td className="py-3 pr-4">{payment.paid_at ? new Date(payment.paid_at).toLocaleDateString() : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default async function EarningsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const activeTab = safeTab(firstParam(params.tab));
  const profile = await requireProfile();
  const filters: InvoiceFilters = {
    scholarId: firstParam(params.scholar) || undefined,
    status: safeStatus(firstParam(params.status)),
    dateFrom: firstParam(params.date_from) || undefined,
    dateTo: firstParam(params.date_to) || undefined
  };
  const [invoices, payments, profiles, timesheets, earningsSummary] = await Promise.all([
    getInvoices(profile, filters),
    getPayments(profile.role === "trainee" ? profile.id : undefined),
    profile.role === "admin" ? getProfiles() : Promise.resolve([]),
    profile.role === "admin" ? getTimesheets() : getMyTimesheets(profile.id),
    profile.role === "admin" ? Promise.resolve([]) : getScholarEarningsSummary(profile.id)
  ]);
  const scholars = profiles.filter((item) => item.role === "trainee");
  const adminSummary = profile.role === "admin"
    ? Array.from(
        timesheets.reduce((totals, timesheet) => {
          const currency = timesheet.currency ?? "USD";
          const current = totals.get(currency) ?? { currency, approved: 0, pending: 0 };
          const amount = Number(timesheet.calculated_amount ?? 0);
          if (timesheet.status === "approved") current.approved += amount;
          if (timesheet.status === "submitted") current.pending += amount;
          totals.set(currency, current);
          return totals;
        }, new Map<string, EarningsCurrencySummary>()).values()
      )
    : earningsSummary;

  return (
    <ProtectedPage>
      <PageHeader title="Earnings" eyebrow="Finances" />
      <EarningsTabs activeTab={activeTab} />
      {activeTab === "invoices" ? (
        <InvoicesTab
          profile={profile}
          invoices={invoices}
          scholars={scholars}
          filters={filters}
          error={firstParam(params.error)}
          message={firstParam(params.message)}
        />
      ) : null}
      {activeTab === "timesheets" ? (
        <TimesheetsTab profile={profile} timesheets={timesheets} scholars={scholars} summary={adminSummary} />
      ) : null}
      {activeTab === "payments" ? <PaymentsTab payments={payments} /> : null}
    </ProtectedPage>
  );
}
