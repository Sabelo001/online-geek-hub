import { requireProfile } from "@/lib/auth";
import { getPayments } from "@/lib/data";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader } from "@/components/ui";

export default async function PaymentsPage() {
  const profile = await requireProfile();
  const payments = await getPayments(profile.role === "trainee" ? profile.id : undefined);

  return (
    <ProtectedPage>
      <PageHeader title="Payment tracker" eyebrow="Earnings" />
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
    </ProtectedPage>
  );
}
