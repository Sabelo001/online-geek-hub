import { signIn, signUp } from "@/lib/actions";
import { BrandLogo } from "@/components/logo";
import { ButtonLink, Card, TextInput } from "@/components/ui";

export function AuthForm({
  mode,
  error,
  message,
  debug,
  nextPath
}: {
  mode: "login" | "signup";
  error?: string;
  message?: string;
  debug?: string;
  nextPath?: string;
}) {
  const isSignup = mode === "signup";

  return (
    <main className="grid min-h-screen place-items-center bg-[#071527] px-4 py-10">
      <Card className="w-full max-w-md border-slate-700 bg-white">
        <div className="mb-6">
          <BrandLogo href="/" size="md" />
          <h1 className="mt-2 text-3xl font-bold text-slate-950">{isSignup ? "Join training" : "Welcome back"}</h1>
          <p className="mt-2 text-slate-600">Turn skills into income.</p>
        </div>
        {error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        {message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{message}</p> : null}
        {process.env.NODE_ENV === "development" && debug ? (
          <p className="mb-4 rounded-md bg-slate-100 p-3 text-xs font-semibold text-slate-700">Debug: {debug}</p>
        ) : null}
        <form action={isSignup ? signUp : signIn} className="grid gap-4">
          {!isSignup ? <input type="hidden" name="next" value={nextPath ?? "/dashboard"} /> : null}
          {isSignup ? (
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Full name
              <TextInput name="full_name" required placeholder="Jane Doe" />
            </label>
          ) : null}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Email
            <TextInput name="email" type="email" required placeholder="you@example.com" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Password
            <TextInput name="password" type="password" required minLength={8} placeholder="At least 8 characters" />
          </label>
          <button className="focus-ring min-h-11 rounded-md bg-cyan-400 px-5 font-semibold text-slate-950 hover:bg-cyan-300">
            {isSignup ? "Create account" : "Login"}
          </button>
        </form>
        <div className="mt-5 flex items-center justify-between text-sm">
          <ButtonLink href="/" variant="secondary">
            Home
          </ButtonLink>
          <a className="font-semibold text-cyan-700" href={isSignup ? "/login" : "/signup"}>
            {isSignup ? "Already have an account?" : "Need an account?"}
          </a>
        </div>
      </Card>
    </main>
  );
}
