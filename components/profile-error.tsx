import { signOut } from "@/lib/actions";

export function ProfileError({
  title = "Profile could not be loaded",
  detail,
  userId,
  email
}: {
  title?: string;
  detail: string;
  userId?: string;
  email?: string;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-2xl rounded-md border border-red-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-red-600">Authenticated, but profile failed</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950">{title}</h1>
        <p className="mt-3 leading-7 text-slate-700">{detail}</p>
        {process.env.NODE_ENV === "development" ? (
          <div className="mt-4 rounded-md bg-slate-100 p-3 text-sm text-slate-700">
            <p>Debug: session exists, profile was not found or could not be read.</p>
            {userId ? <p>User id: {userId}</p> : null}
            {email ? <p>Email: {email}</p> : null}
          </div>
        ) : null}
        <form action={signOut} className="mt-5">
          <button className="focus-ring rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Sign out
          </button>
        </form>
      </section>
    </main>
  );
}
