import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/print-button";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader } from "@/components/ui";
import { requireProfile } from "@/lib/auth";
import { getInvoiceById } from "@/lib/data";
import type { InvoiceStatus } from "@/lib/types";

function formatDate(date: string | null) {
  if (!date) return "Not set";
  return new Date(date).toLocaleDateString();
}

function formatMoney(amount: number | null | undefined, currency = "USD") {
  return `${currency} ${Number(amount ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function statusTone(status: InvoiceStatus): "amber" | "cyan" | "green" | "red" {
  if (status === "approved" || status === "submitted") return "cyan";
  if (status === "paid") return "green";
  if (status === "rejected") return "red";
  return "amber";
}

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await requireProfile();
  const invoice = await getInvoiceById(id, profile);
  if (!invoice) notFound();

  const scholarName = invoice.profiles?.full_name ?? invoice.profiles?.email ?? "Scholar";
  const invoiceNumber = invoice.invoice_number ?? `INV-${invoice.id.slice(0, 8).toUpperCase()}`;
  const total = invoice.total_amount ?? invoice.amount;

  return (
    <ProtectedPage>
      <PageHeader title="Invoice" eyebrow="Earnings">
        <div className="flex flex-wrap gap-2 print:hidden">
          <Link href="/earnings" className="focus-ring rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white">
            Back to Earnings
          </Link>
          <PrintButton />
        </div>
      </PageHeader>

      <Card className="bg-white print:border-0 print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#0A6EFF]">Online Geek Hub</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950">{invoiceNumber}</h1>
            <p className="mt-2 text-sm text-slate-500">Scholar invoice for approved project timesheets.</p>
          </div>
          <Badge tone={statusTone(invoice.status)}>{invoice.status}</Badge>
        </div>

        <div className="mt-6 grid gap-4 text-sm text-slate-600 md:grid-cols-2">
          <p><span className="font-semibold text-slate-950">Scholar:</span> {scholarName}</p>
          <p><span className="font-semibold text-slate-950">Invoice date:</span> {formatDate(invoice.issued_at)}</p>
          <p><span className="font-semibold text-slate-950">Currency:</span> {invoice.currency}</p>
          <p><span className="font-semibold text-slate-950">Status:</span> {invoice.status}</p>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="py-3 pr-4">Project</th>
                <th className="py-3 pr-4">Work date</th>
                <th className="py-3 pr-4">Hours</th>
                <th className="py-3 pr-4">Rate</th>
                <th className="py-3 pr-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoice.timesheets.map((timesheet) => (
                <tr key={timesheet.id}>
                  <td className="py-4 pr-4 font-semibold text-slate-950">{timesheet.projects?.title ?? invoice.projects?.title ?? "Project"}</td>
                  <td className="py-4 pr-4 text-slate-600">{formatDate(timesheet.work_date)}</td>
                  <td className="py-4 pr-4 text-slate-600">{Number(timesheet.hours).toLocaleString()}</td>
                  <td className="py-4 pr-4 text-slate-600">{formatMoney(timesheet.rate_amount, timesheet.currency)} / {timesheet.projects?.rate_unit ?? "hour"}</td>
                  <td className="py-4 pr-4 text-right text-slate-600">{formatMoney(timesheet.calculated_amount, timesheet.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end">
          <div className="w-full max-w-sm rounded-lg bg-slate-50 p-5">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>{formatMoney(invoice.subtotal ?? total, invoice.currency)}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-lg font-bold text-slate-950">
              <span>Total</span>
              <span>{formatMoney(total, invoice.currency)}</span>
            </div>
          </div>
        </div>
      </Card>
    </ProtectedPage>
  );
}
