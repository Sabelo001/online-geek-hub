import { redirect } from "next/navigation";

function queryString(params: Record<string, string | string[] | undefined>) {
  const search = new URLSearchParams();
  search.set("tab", "payments");
  Object.entries(params).forEach(([key, value]) => {
    if (key === "tab") return;
    if (Array.isArray(value)) {
      value.forEach((item) => search.append(key, item));
    } else if (value) {
      search.set(key, value);
    }
  });
  return `?${search.toString()}`;
}

export default async function PaymentsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  redirect(`/earnings${queryString(params)}`);
}
