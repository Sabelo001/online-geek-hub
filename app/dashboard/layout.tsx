import { AppShell } from "@/components/app-shell";
import { ProfileError } from "@/components/profile-error";
import { getAuthenticatedProfile } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const result = await getAuthenticatedProfile();
  if (!result.user) redirect("/login");
  if (!result.profile) {
    return <ProfileError detail={result.profileError} userId={result.user.id} email={result.user.email} />;
  }
  return <AppShell profile={result.profile}>{children}</AppShell>;
}
