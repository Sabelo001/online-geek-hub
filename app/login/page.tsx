import { AuthForm } from "@/components/auth-form";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string; next?: string; debug?: string }>;
}) {
  const params = await searchParams;
  const missingSupabaseEnv =
    process.env.NODE_ENV === "development" &&
    (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const missing = [
    !process.env.NEXT_PUBLIC_SUPABASE_URL ? "NEXT_PUBLIC_SUPABASE_URL" : null,
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : null
  ].filter(Boolean);
  const envError = missingSupabaseEnv
    ? `Supabase is not configured. Missing ${missing.join(" and ")}. Add them to the project environment, then restart Next.js.`
    : undefined;

  return <AuthForm mode="login" error={params.error ?? envError} message={params.message} debug={params.debug} nextPath={params.next} />;
}
