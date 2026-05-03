import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import type { Profile, Role } from "@/lib/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AuthProfileResult =
  | { user: null; profile: null; profileError: null }
  | { user: User; profile: Profile; profileError: null }
  | { user: User; profile: null; profileError: string };

export async function getAuthenticatedProfile(): Promise<AuthProfileResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (!user || userError) {
    if (process.env.NODE_ENV === "development") {
      console.log("[auth] no Supabase user found", userError?.message ?? "No active session");
    }
    return { user: null, profile: null, profileError: null };
  }

  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  if (error || !data) {
    const profileError = error?.message ?? "No matching profile row was found for the current Supabase user.";
    if (process.env.NODE_ENV === "development") {
      console.log("[auth] profile not found", { userId: user.id, email: user.email, profileError });
    }
    return { user, profile: null, profileError };
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[auth] profile found", { userId: user.id, profileId: data.id, role: data.role });
  }

  return { user, profile: data as Profile, profileError: null };
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const result = await getAuthenticatedProfile();
  return result.profile;
}

export async function requireProfile() {
  const result = await getAuthenticatedProfile();
  if (!result.user) redirect("/login");
  if (!result.profile) {
    throw new Error(`Profile loading failed: ${result.profileError}`);
  }
  return result.profile;
}

export async function requireRole(roles: Role[]) {
  const profile = await requireProfile();
  if (!roles.includes(profile.role)) {
    redirect(`/dashboard?error=${encodeURIComponent("You do not have permission to access that page.")}`);
  }
  return profile;
}

export function canReview(role: Role) {
  return role === "admin" || role === "reviewer";
}

export function canManage(role: Role) {
  return role === "admin";
}
