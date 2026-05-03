import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const protectedRoutes = [
  "/dashboard",
  "/cv",
  "/tasks",
  "/modules",
  "/training",
  "/submissions",
  "/availability",
  "/payments",
  "/admin",
  "/review",
  "/reviews",
  "/leaderboard"
];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isProtected = protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path));

  if (!url || !key) {
    if (!isProtected) return response;

    const login = request.nextUrl.clone();
    login.pathname = "/login";
    login.searchParams.set("next", request.nextUrl.pathname);
    if (process.env.NODE_ENV === "development") {
      const missing = [
        !url ? "NEXT_PUBLIC_SUPABASE_URL" : null,
        !key ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : null
      ].filter(Boolean);
      login.searchParams.set("error", `Supabase is not configured. Missing ${missing.join(" and ")}.`);
    }
    return NextResponse.redirect(login);
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (isProtected && !user) {
    if (process.env.NODE_ENV === "development") {
      console.log("[proxy] redirecting to login", {
        path: request.nextUrl.pathname,
        reason: error?.message ?? "no Supabase auth user"
      });
    }
    const login = request.nextUrl.clone();
    login.pathname = "/login";
    login.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  if (isProtected && user && process.env.NODE_ENV === "development") {
    console.log("[proxy] protected route allowed", { path: request.nextUrl.pathname, userId: user.id });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
};
