"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireProfile, requireRole } from "@/lib/auth";
import { TRAINING_CATEGORIES, type CvTemplate } from "@/lib/types";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function safeRedirectPath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return "/dashboard";
  return path;
}

function loginErrorMessage(message: string) {
  if (/email.*not.*confirm|confirm.*email|email_not_confirmed/i.test(message)) {
    return "Please confirm your email or disable email confirmation during testing.";
  }

  return message;
}

export async function signIn(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const email = value(formData, "email");
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: value(formData, "password")
  });

  if (error) {
    const message = loginErrorMessage(error.message);
    if (process.env.NODE_ENV === "development") {
      console.log("[login] Supabase signInWithPassword failed", { email, message: error.message });
    }
    redirect(`/login?error=${encodeURIComponent(message)}&debug=${encodeURIComponent(`login failed: ${error.message}`)}`);
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (!user || userError) {
    const message = userError?.message ?? "Supabase login succeeded, but no valid session was found.";
    if (process.env.NODE_ENV === "development") {
      console.log("[login] session not found after sign in", { email, message });
    }
    redirect(`/login?error=${encodeURIComponent(message)}&debug=${encodeURIComponent("session not found after login")}`);
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[login] success, session found", { userId: user.id, email: user.email });
  }

  redirect(safeRedirectPath(value(formData, "next") || "/dashboard"));
}

export async function signUp(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const fullName = value(formData, "full_name");
  const email = value(formData, "email");
  const { data, error } = await supabase.auth.signUp({
    email,
    password: value(formData, "password"),
    options: { data: { full_name: fullName } }
  });

  if (error) {
    const message = loginErrorMessage(error.message);
    redirect(`/signup?error=${encodeURIComponent(message)}`);
  }

  if (data.session) {
    redirect(`/dashboard?message=${encodeURIComponent("Account created successfully. You can now log in.")}`);
  }

  redirect(`/login?signup=created&message=${encodeURIComponent("Account created successfully. Please log in.")}`);
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

function actionError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

function optionalValue(formData: FormData, key: string) {
  return value(formData, key) || null;
}

function safeCvTemplate(formData: FormData): CvTemplate {
  const template = value(formData, "template");
  if (template === "remote_work" || template === "data_annotation") return template;
  return "professional";
}

function safeInquiryType(formData: FormData) {
  const inquiryType = value(formData, "inquiry_type");
  if (
    [
      "vendor_partnership",
      "pilot_project",
      "scholar_program",
      "cv_support",
      "training",
      "general_inquiry"
    ].includes(inquiryType)
  ) {
    return inquiryType;
  }
  return "general_inquiry";
}

function cvPayload(formData: FormData, userId: string) {
  return {
    user_id: userId,
    full_name: value(formData, "full_name"),
    email: value(formData, "email"),
    phone: optionalValue(formData, "phone"),
    location: optionalValue(formData, "location"),
    professional_title: optionalValue(formData, "professional_title"),
    summary: optionalValue(formData, "summary"),
    skills: optionalValue(formData, "skills"),
    experience: optionalValue(formData, "experience"),
    education: optionalValue(formData, "education"),
    certifications: optionalValue(formData, "certifications"),
    referees: optionalValue(formData, "referees"),
    template: safeCvTemplate(formData),
    plan: "free",
    updated_at: new Date().toISOString()
  };
}

const allowedTrainingMaterialTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "text/plain"
]);

function safeCategory(formData: FormData) {
  const category = value(formData, "category");
  if (!TRAINING_CATEGORIES.includes(category as (typeof TRAINING_CATEGORIES)[number])) {
    return "Remote Work Basics";
  }
  return category;
}

function safeModuleStatus(formData: FormData) {
  return value(formData, "status") === "published" ? "published" : "draft";
}

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-").slice(0, 120) || "material";
}

async function uploadTrainingMaterial(formData: FormData, moduleId: string) {
  const file = formData.get("material");
  if (!(file instanceof File) || file.size === 0) return { data: null, error: null };

  if (!allowedTrainingMaterialTypes.has(file.type)) {
    return { data: null, error: "Material must be a PDF, DOCX, image, or TXT file." };
  }

  const supabase = await createSupabaseServerClient();
  const path = `${moduleId}/${randomUUID()}-${safeFileName(file.name)}`;
  const { error } = await supabase.storage.from("training-files").upload(path, file, {
    contentType: file.type,
    upsert: false
  });

  if (error) return { data: null, error: error.message };

  return {
    data: {
      material_path: path,
      material_name: file.name,
      material_type: file.type,
      material_size: file.size
    },
    error: null
  };
}

export async function createTrainingModule(formData: FormData) {
  const profile = await requireRole(["admin"]);
  const supabase = await createSupabaseServerClient();
  const moduleId = randomUUID();
  const upload = await uploadTrainingMaterial(formData, moduleId);
  if (upload.error) actionError("/admin", `Training material was not uploaded: ${upload.error}`);

  const { error } = await supabase.from("training_modules").insert({
    id: moduleId,
    title: value(formData, "title"),
    description: value(formData, "description"),
    content: value(formData, "content"),
    video_url: value(formData, "video_url") || null,
    category: safeCategory(formData),
    status: safeModuleStatus(formData),
    ...(upload.data ?? {}),
    created_by: profile.id
  });

  if (error) {
    if (upload.data?.material_path) {
      await supabase.storage.from("training-files").remove([upload.data.material_path]);
    }
    actionError("/admin", `Training module was not created: ${error.message}`);
  }

  revalidatePath("/admin");
  revalidatePath("/training");
  redirect("/admin?message=Training module created.");
}

export async function updateTrainingModule(moduleId: string, formData: FormData) {
  await requireRole(["admin"]);
  const supabase = await createSupabaseServerClient();
  const { data: existing } = await supabase.from("training_modules").select("material_path").eq("id", moduleId).single();
  const upload = await uploadTrainingMaterial(formData, moduleId);
  if (upload.error) actionError("/admin", `Training material was not uploaded: ${upload.error}`);

  const { error } = await supabase
    .from("training_modules")
    .update({
      title: value(formData, "title"),
      description: value(formData, "description"),
      content: value(formData, "content"),
      video_url: value(formData, "video_url") || null,
      category: safeCategory(formData),
      status: safeModuleStatus(formData),
      ...(upload.data ?? {})
    })
    .eq("id", moduleId);

  if (error) {
    if (upload.data?.material_path) {
      await supabase.storage.from("training-files").remove([upload.data.material_path]);
    }
    actionError("/admin", `Training module was not updated: ${error.message}`);
  }

  if (upload.data?.material_path && existing?.material_path) {
    await supabase.storage.from("training-files").remove([existing.material_path]);
  }

  revalidatePath("/admin");
  revalidatePath("/training");
  revalidatePath(`/training/${moduleId}`);
  redirect("/admin?message=Training module updated.");
}

export async function deleteTrainingModule(moduleId: string, materialPath: string | null) {
  await requireRole(["admin"]);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("training_modules").delete().eq("id", moduleId);

  if (error) actionError("/admin", `Training module was not deleted: ${error.message}`);

  if (materialPath) {
    await supabase.storage.from("training-files").remove([materialPath]);
  }

  revalidatePath("/admin");
  revalidatePath("/training");
  redirect("/admin?message=Training module deleted.");
}

export async function createCvProfile(formData: FormData) {
  const profile = await requireProfile();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("cv_profiles").insert(cvPayload(formData, profile.id)).select("id").single();

  if (error || !data) {
    actionError("/cv/new", `CV was not created: ${error?.message ?? "No CV id was returned."}`);
  }

  revalidatePath("/cv");
  redirect(`/cv/${data.id}`);
}

export async function updateCvProfile(cvId: string, formData: FormData) {
  const profile = await requireProfile();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("cv_profiles").update(cvPayload(formData, profile.id)).eq("id", cvId);

  if (error) actionError(`/cv/${cvId}/edit`, `CV was not updated: ${error.message}`);

  revalidatePath("/cv");
  revalidatePath(`/cv/${cvId}`);
  redirect(`/cv/${cvId}?message=CV saved.`);
}

export async function deleteCvProfile(cvId: string) {
  await requireProfile();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("cv_profiles").delete().eq("id", cvId);

  if (error) actionError("/cv", `CV was not deleted: ${error.message}`);

  revalidatePath("/cv");
  redirect("/cv?message=CV deleted.");
}

export async function createContactInquiry(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("contact_inquiries").insert({
    full_name: value(formData, "full_name"),
    email: value(formData, "email"),
    organization: optionalValue(formData, "organization"),
    inquiry_type: safeInquiryType(formData),
    message: value(formData, "message"),
    status: "new"
  });

  if (error) actionError("/contact", `Your inquiry was not saved: ${error.message}`);

  redirect("/contact?message=Thank you. Your inquiry has been received.");
}

export async function createPracticeTask(formData: FormData) {
  const profile = await requireRole(["admin"]);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("practice_tasks").insert({
    title: value(formData, "title"),
    task_type: value(formData, "task_type"),
    instructions: value(formData, "instructions"),
    difficulty: value(formData, "difficulty"),
    sample_file_url: value(formData, "sample_file_url") || null,
    answer_key: value(formData, "answer_key") || null,
    status: value(formData, "status") || "active",
    created_by: profile.id
  });

  if (error) actionError("/admin", `Practice task was not created: ${error.message}`);

  revalidatePath("/admin");
  revalidatePath("/tasks");
  redirect("/admin?message=Practice task created.");
}

export async function submitPracticeTask(taskId: string, formData: FormData) {
  const profile = await requireProfile();

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("submissions").insert({
    task_id: taskId,
    trainee_id: profile.id,
    answer_text: value(formData, "answer_text"),
    status: "submitted"
  });

  if (error) actionError(`/tasks/${taskId}/submit`, `Submission was not saved: ${error.message}`);
  revalidatePath("/tasks");
  redirect("/tasks");
}

export async function reviewSubmission(submissionId: string, formData: FormData) {
  const profile = await requireRole(["admin", "reviewer"]);

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("submissions")
    .update({
      status: value(formData, "status"),
      score: Number(value(formData, "score")),
      feedback: value(formData, "feedback"),
      reviewed_by: profile.id,
      reviewed_at: new Date().toISOString()
    })
    .eq("id", submissionId);

  if (error) actionError("/reviews", `Review was not saved: ${error.message}`);
  revalidatePath("/reviews");
  redirect("/reviews?message=Review saved.");
}

export async function updateAvailability(formData: FormData) {
  const profile = await requireProfile();

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("availability").insert({
    trainee_id: profile.id,
    date: value(formData, "date"),
    time_block: value(formData, "time_block"),
    status: value(formData, "status"),
    notes: value(formData, "notes")
  });
  if (error) actionError("/availability", `Availability was not saved: ${error.message}`);
  revalidatePath("/availability");
  redirect("/availability?message=Availability saved.");
}
