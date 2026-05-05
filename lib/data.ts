import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireProfile } from "@/lib/auth";
import type {
  CvProfile,
  Invoice,
  InvoiceStatus,
  Payment,
  PracticeTask,
  Profile,
  Project,
  ProjectInvitation,
  ProjectWithInvitations,
  ScholarDocument,
  Submission,
  TrainingModule,
  TrainingProgress
} from "@/lib/types";

export async function getDashboardMetrics() {
  const supabase = await createSupabaseServerClient();
  const [{ count: totalTrainees }, { count: pendingSubmissions }, { data: scores }, { count: availableToday }, { count: pendingPayments }] =
    await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "trainee"),
      supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "submitted"),
      supabase.from("submissions").select("score").not("score", "is", null),
      supabase.from("availability").select("*", { count: "exact", head: true }).eq("date", new Date().toISOString().slice(0, 10)).eq("status", "available"),
      supabase.from("payments").select("*", { count: "exact", head: true }).eq("status", "pending")
    ]);

  const values = (scores ?? []).map((row) => Number(row.score)).filter(Number.isFinite);
  const averageScore = values.length ? Math.round(values.reduce((sum, score) => sum + score, 0) / values.length) : 0;

  return {
    totalTrainees: totalTrainees ?? 0,
    pendingSubmissions: pendingSubmissions ?? 0,
    averageScore,
    availableToday: availableToday ?? 0,
    pendingPayments: pendingPayments ?? 0
  };
}

export async function getModules(): Promise<TrainingModule[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("training_modules").select("*").order("created_at", { ascending: false });
  return (data ?? []) as TrainingModule[];
}

export async function getPublishedModules(): Promise<TrainingModule[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("training_modules")
    .select("*")
    .eq("status", "published")
    .order("track", { ascending: true })
    .order("step_number", { ascending: true })
    .order("category", { ascending: true })
    .order("created_at", { ascending: false });
  return (data ?? []) as TrainingModule[];
}

export async function getTrainingProgress(userId: string): Promise<TrainingProgress[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("training_progress").select("*").eq("user_id", userId);
  return (data ?? []) as TrainingProgress[];
}

export async function getModule(id: string): Promise<TrainingModule | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("training_modules").select("*").eq("id", id).single();
  return data as TrainingModule | null;
}

export async function getTrainingMaterialSignedUrl(module: TrainingModule) {
  if (!module.material_path) return null;
  await requireProfile();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.storage.from("training-files").createSignedUrl(module.material_path, 60 * 15, {
    download: module.material_name ?? true
  });

  if (error) {
    return { url: null, error: error.message };
  }

  return { url: data.signedUrl, error: null };
}

export async function getTasks(): Promise<PracticeTask[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("practice_tasks").select("*").eq("status", "active").order("created_at", { ascending: false });
  return (data ?? []) as PracticeTask[];
}

export async function getProjectInvitations(profileId: string): Promise<ProjectInvitation[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("project_invitations")
    .select("*")
    .eq("scholar_id", profileId)
    .order("invited_at", { ascending: false });
  return (data ?? []) as ProjectInvitation[];
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
  return (data ?? []) as Project[];
}

export async function getProjectsWithInvitations(): Promise<ProjectWithInvitations[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*, invitations:project_invitations(id,status,responded_at,scholar_id,profiles(full_name,email))")
    .order("created_at", { ascending: false });
  return (data ?? []) as ProjectWithInvitations[];
}

export async function getTask(id: string): Promise<PracticeTask | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("practice_tasks").select("*").eq("id", id).single();
  return data as PracticeTask | null;
}

export async function getSubmissions(): Promise<Submission[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("submissions")
    .select("*, profiles(full_name,email), practice_tasks(title,task_type)")
    .order("submitted_at", { ascending: false });
  return (data ?? []) as Submission[];
}

export async function getPayments(profileId?: string): Promise<Payment[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("payments").select("*").order("created_at", { ascending: false });
  if (profileId) query = query.eq("trainee_id", profileId);
  const { data } = await query;
  return (data ?? []) as Payment[];
}

export type InvoiceFilters = {
  scholarId?: string;
  status?: InvoiceStatus;
  dateFrom?: string;
  dateTo?: string;
};

export async function getInvoices(profile: Profile, filters: InvoiceFilters = {}): Promise<Invoice[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("invoices")
    .select("*, profiles(full_name,email), projects(title,project_type)")
    .order("issued_at", { ascending: false });

  if (profile.role !== "admin") {
    query = query.eq("scholar_id", profile.id);
  } else {
    if (filters.scholarId) query = query.eq("scholar_id", filters.scholarId);
    if (filters.status) query = query.eq("status", filters.status);
    if (filters.dateFrom) query = query.gte("issued_at", filters.dateFrom);
    if (filters.dateTo) query = query.lte("issued_at", `${filters.dateTo}T23:59:59.999Z`);
  }

  const { data } = await query;
  return (data ?? []) as Invoice[];
}

export async function getScholarDocuments(profile: Profile): Promise<ScholarDocument[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("scholar_documents")
    .select("*, profiles!scholar_documents_scholar_id_fkey(full_name,email), sender:profiles!scholar_documents_uploaded_by_fkey(full_name,email)")
    .order("created_at", { ascending: false });

  if (profile.role !== "admin") query = query.eq("scholar_id", profile.id);

  const { data } = await query;
  return (data ?? []) as ScholarDocument[];
}

export async function getScholarDocumentSignedUrl(document: Pick<ScholarDocument, "file_url" | "filename">) {
  await requireProfile();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.storage.from("scholar-docs").createSignedUrl(document.file_url, 60 * 15, {
    download: document.filename
  });

  if (error) {
    return { url: null, error: error.message };
  }

  return { url: data.signedUrl, error: null };
}

export async function getProfiles(): Promise<Profile[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
  return (data ?? []) as Profile[];
}

export async function getCvProfiles(profile: Profile): Promise<CvProfile[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("cv_profiles").select("*").order("updated_at", { ascending: false });
  if (profile.role === "trainee") query = query.eq("user_id", profile.id);
  const { data } = await query;
  return (data ?? []) as CvProfile[];
}

export async function getCvProfile(id: string): Promise<CvProfile | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("cv_profiles").select("*").eq("id", id).single();
  return data as CvProfile | null;
}
