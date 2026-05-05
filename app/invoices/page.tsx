import { CalendarDays, CheckCircle2, CircleDollarSign, FileText } from "lucide-react";
import { updateInvoiceStatus } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";
import { getInvoices, getProfiles, type InvoiceFilters } from "@/lib/data";
import type { Invoice, InvoiceStatus, Profile } from "@/lib/types";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader, Select, TextInput } from "@/components/ui";

const statusOptions: InvoiceStatus[] = ["pending", "approved", "paid", "rejected"];

function firstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function safeStatus(status?: string): InvoiceStatus | undefined {
  return statusOptions.includes(status as InvoiceStatus) ? (status as InvoiceStatus) : undefined;
}

function formatDate(date: string | null) {
  if (!date) return "Not set";
  return new Date(date).toLocaleDateString();
}

function formatMoney(invoice: Pick<Invoice, "amount" | "currency">) {
  return `${invoice.currency} ${Number(invoice.amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function formatAmount(amount: number, currency = "KES") {
  return `${currency} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function invoiceNumber(invoice: Invoice) {
  return `INV-${invoice.id.slice(0, 8).toUpperCase()}`;
}

function projectName(invoice: Invoice) {
  return invoice.projects?.title ?? "Project";
}

function scholarName(invoice: Invoice) {
  return invoice.profiles?.full_name ?? invoice.profiles?.email ?? "Scholar";
}

function statusTone(status: InvoiceStatus): "amber" | "cyan" | "green" | "red" {
  if (status === "approved") return "cyan";
  if (status === "paid") return "green";
  if (status === "rejected") return "red";
  return "amber";
}

function statusLabel(status: InvoiceStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
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

function ViewInvoiceButton() {
  return (
    <button type="button" className="focus-ring rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
      View Invoice
    </button>
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
        <ViewInvoiceButton />
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
                    <ViewInvoiceButton />
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

export default async function InvoicesPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const profile = await requireProfile();
  const filters: InvoiceFilters = {
    scholarId: firstParam(params.scholar) || undefined,
    status: safeStatus(firstParam(params.status)),
    dateFrom: firstParam(params.date_from) || undefined,
    dateTo: firstParam(params.date_to) || undefined
  };
  const invoices = await getInvoices(profile, filters);

  if (profile.role === "admin") {
    const profiles = await getProfiles();
    const scholars = profiles.filter((item) => item.role === "trainee");

    return (
      <ProtectedPage>
        <PageHeader title="Invoices" eyebrow="Payments" />
        {firstParam(params.error) ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{firstParam(params.error)}</p> : null}
        {firstParam(params.message) ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{firstParam(params.message)}</p> : null}
        <div className="grid gap-6">
          <AdminFilters filters={filters} scholars={scholars} />
          <AdminInvoiceTable invoices={invoices} />
        </div>
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage>
      <PageHeader title="Invoices" eyebrow="Payments" />
      <SummaryBar invoices={invoices} />
      <div className="grid gap-4">
        {invoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
        {!invoices.length ? <EmptyState /> : null}
      </div>
    </ProtectedPage>
  );
}
