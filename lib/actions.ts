"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireProfile, requireRole } from "@/lib/auth";
import {
  SCHOLAR_STATUSES,
  SCHOLAR_TASK_TYPES,
  TRAINING_CATEGORIES,
  TRAINING_TRACKS,
  type CvTemplate,
  type InvoiceStatus,
  type ScholarDocumentType
} from "@/lib/types";

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

function safeProjectType(formData: FormData) {
  const projectType = value(formData, "project_type");
  if (
    [
      "Data Annotation",
      "Transcription",
      "AI Evaluation",
      "Prompt Review",
      "Remote Operations"
    ].includes(projectType)
  ) {
    return projectType;
  }
  return "Data Annotation";
}

function safeDocumentType(formData: FormData): ScholarDocumentType {
  const documentType = value(formData, "type");
  if (["ID Document", "Certificate", "Portfolio", "Other"].includes(documentType)) {
    return documentType as ScholarDocumentType;
  }
  return "Other";
}

function safeAvailabilityStatus(formData: FormData) {
  const status = value(formData, "availability_status");
  if (["available", "limited", "unavailable", "by_project"].includes(status)) return status;
  return null;
}

function safeWorkPreference(formData: FormData) {
  const preference = value(formData, "work_preference");
  if (["part_time", "full_time", "project_based", "temporary", "flexible"].includes(preference)) return preference;
  return null;
}

function safeScholarStatus(formData: FormData) {
  const status = value(formData, "status");
  if (SCHOLAR_STATUSES.includes(status as (typeof SCHOLAR_STATUSES)[number])) return status;
  return "pending_profile";
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

function safeTrainingTrack(formData: FormData) {
  const track = value(formData, "track");
  if (TRAINING_TRACKS.includes(track as (typeof TRAINING_TRACKS)[number])) return track;
  return "Week 1 Onboarding";
}

function safeStepNumber(formData: FormData) {
  const step = Number(value(formData, "step_number"));
  if (Number.isInteger(step) && step > 0 && step <= 50) return step;
  return null;
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
    description: value(formData, "description") || value(formData, "content").slice(0, 180) || "Training material for Online Geek Hub Scholars.",
    content: value(formData, "content"),
    video_url: value(formData, "video_url") || null,
    category: safeCategory(formData),
    track: safeTrainingTrack(formData),
    step_number: safeStepNumber(formData),
    estimated_time: optionalValue(formData, "estimated_time"),
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
      description: value(formData, "description") || value(formData, "content").slice(0, 180) || "Training material for Online Geek Hub Scholars.",
      content: value(formData, "content"),
      video_url: value(formData, "video_url") || null,
      category: safeCategory(formData),
      track: safeTrainingTrack(formData),
      step_number: safeStepNumber(formData),
      estimated_time: optionalValue(formData, "estimated_time"),
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

export async function publishTrainingMaterial(formData: FormData) {
  const profile = await requireRole(["admin"]);
  const supabase = await createSupabaseServerClient();
  const moduleId = randomUUID();
  const upload = await uploadTrainingMaterial(formData, moduleId);
  if (upload.error) actionError("/training", `Training material was not uploaded: ${upload.error}`);

  const content = value(formData, "content");
  const { error } = await supabase.from("training_modules").insert({
    id: moduleId,
    title: value(formData, "title"),
    description: content.slice(0, 180) || "Published training material for Online Geek Hub Scholars.",
    content,
    video_url: /^https?:\/\//i.test(content) ? content : null,
    category: safeTrainingTrack(formData),
    track: safeTrainingTrack(formData),
    step_number: safeStepNumber(formData),
    estimated_time: optionalValue(formData, "estimated_time"),
    status: "published",
    ...(upload.data ?? {}),
    created_by: profile.id
  });

  if (error) {
    if (upload.data?.material_path) {
      await supabase.storage.from("training-files").remove([upload.data.material_path]);
    }
    actionError("/training", `Training material was not published: ${error.message}`);
  }

  revalidatePath("/training");
  redirect("/training?message=Training material published.");
}

export async function completeTrainingModule(moduleId: string) {
  const profile = await requireProfile();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("training_progress").upsert(
    {
      user_id: profile.id,
      module_id: moduleId,
      completed_at: new Date().toISOString()
    },
    { onConflict: "user_id,module_id" }
  );

  if (error) actionError(`/training/${moduleId}`, `Module completion was not saved: ${error.message}`);

  revalidatePath("/training");
  revalidatePath(`/training/${moduleId}`);
  redirect(`/training/${moduleId}?message=Module marked complete.`);
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

export async function updateProfileInfo(formData: FormData) {
  const profile = await requireProfile();
  const supabase = await createSupabaseServerClient();
  const firstName = value(formData, "first_name");
  const lastName = value(formData, "last_name");
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || profile.full_name;

  const { error } = await supabase
    .from("profiles")
    .update({
      first_name: firstName || null,
      last_name: lastName || null,
      full_name: fullName,
      phone: optionalValue(formData, "phone"),
      location: optionalValue(formData, "location"),
      professional_title: optionalValue(formData, "professional_title"),
      availability_status: safeAvailabilityStatus(formData),
      work_preference: safeWorkPreference(formData),
      experience_summary: optionalValue(formData, "experience_summary")
    })
    .eq("id", profile.id);

  if (error) actionError("/profile", `Profile was not updated: ${error.message}`);

  revalidatePath("/profile");
  redirect("/profile?message=Profile updated.");
}

function parseStringList(formData: FormData, key: string, limit = 30) {
  const raw = value(formData, key);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => String(item).trim())
      .filter(Boolean)
      .slice(0, limit);
  } catch {
    return [];
  }
}

export async function updateProfileSkills(formData: FormData) {
  const profile = await requireProfile();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("profiles").update({ skills: parseStringList(formData, "skills") }).eq("id", profile.id);

  if (error) actionError("/profile", `Skills were not saved: ${error.message}`);

  revalidatePath("/profile");
  redirect("/profile?message=Skills saved.");
}

export async function updateProfileLanguages(formData: FormData) {
  const profile = await requireProfile();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("profiles").update({ languages: parseStringList(formData, "languages") }).eq("id", profile.id);

  if (error) actionError("/profile", `Languages were not saved: ${error.message}`);

  revalidatePath("/profile");
  redirect("/profile?message=Languages saved.");
}

export async function updateProfilePortfolioLinks(formData: FormData) {
  const profile = await requireProfile();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("profiles").update({ portfolio_links: parseStringList(formData, "portfolio_links", 12) }).eq("id", profile.id);

  if (error) actionError("/profile", `Portfolio links were not saved: ${error.message}`);

  revalidatePath("/profile");
  redirect("/profile?message=Portfolio links saved.");
}

export async function updateProfileTaskTypes(formData: FormData) {
  const profile = await requireProfile();
  const selected = formData
    .getAll("preferred_task_types")
    .map((item) => String(item))
    .filter((item) => SCHOLAR_TASK_TYPES.includes(item as (typeof SCHOLAR_TASK_TYPES)[number]));
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("profiles").update({ preferred_task_types: selected }).eq("id", profile.id);

  if (error) actionError("/profile", `Preferred task types were not saved: ${error.message}`);

  revalidatePath("/profile");
  redirect("/profile?message=Preferred task types saved.");
}

export async function updateProfileBio(formData: FormData) {
  const profile = await requireProfile();
  const supabase = await createSupabaseServerClient();
  const bio = value(formData, "bio").slice(0, 400);
  const { error } = await supabase.from("profiles").update({ bio: bio || null }).eq("id", profile.id);

  if (error) actionError("/profile", `Bio was not saved: ${error.message}`);

  revalidatePath("/profile");
  redirect("/profile?message=Bio saved.");
}

const allowedProfilePhotoTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const allowedScholarDocumentTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]);

export async function uploadProfilePhoto(formData: FormData) {
  const profile = await requireProfile();
  const file = formData.get("photo");

  if (!(file instanceof File) || file.size === 0) actionError("/profile", "Choose a profile photo to upload.");
  if (!allowedProfilePhotoTypes.has(file.type)) actionError("/profile", "Profile photo must be a JPG, PNG, or WebP image.");
  if (file.size > 2 * 1024 * 1024) actionError("/profile", "Profile photo must be 2MB or smaller.");

  const supabase = await createSupabaseServerClient();
  const path = `${profile.id}_avatar`;
  const { error: uploadError } = await supabase.storage.from("scholar-avatars").upload(path, file, {
    contentType: file.type,
    upsert: true
  });

  if (uploadError) actionError("/profile", `Profile photo was not uploaded: ${uploadError.message}`);

  const { error } = await supabase.from("profiles").update({ avatar_path: path }).eq("id", profile.id);
  if (error) actionError("/profile", `Profile photo was uploaded but not saved: ${error.message}`);

  revalidatePath("/profile");
  redirect("/profile?message=Profile photo updated.");
}

export async function uploadScholarCv(formData: FormData) {
  const profile = await requireProfile();
  const file = formData.get("cv");

  if (!(file instanceof File) || file.size === 0) actionError("/profile", "Choose a resume or CV to upload.");
  if (!allowedScholarDocumentTypes.has(file.type)) actionError("/profile", "CV must be a PDF, DOC, or DOCX file.");
  if (file.size > 5 * 1024 * 1024) actionError("/profile", "CV must be 5MB or smaller.");

  const supabase = await createSupabaseServerClient();
  const extension = file.name.toLowerCase().endsWith(".docx") ? "docx" : file.name.toLowerCase().endsWith(".doc") ? "doc" : "pdf";
  const path = `${profile.id}_cv.${extension}`;
  const { error: uploadError } = await supabase.storage.from("scholar-cvs").upload(path, file, {
    contentType: file.type,
    upsert: true
  });

  if (uploadError) actionError("/profile", `CV was not uploaded: ${uploadError.message}`);

  const { error } = await supabase
    .from("profiles")
    .update({
      cv_path: path,
      cv_name: file.name,
      cv_size: file.size,
      cv_uploaded_at: new Date().toISOString()
    })
    .eq("id", profile.id);

  if (error) actionError("/profile", `CV was uploaded but not saved: ${error.message}`);

  revalidatePath("/profile");
  redirect("/profile?message=CV uploaded.");
}

export async function updateScholarStatus(scholarId: string, formData: FormData) {
  await requireRole(["admin"]);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      status: safeScholarStatus(formData)
    })
    .eq("id", scholarId)
    .neq("role", "admin");

  if (error) actionError("/admin/scholars", `Scholar status was not updated: ${error.message}`);

  revalidatePath("/admin/scholars");
  redirect("/admin/scholars?message=Scholar status updated.");
}

async function uploadScholarDocFile(file: File, folder: string) {
  if (!allowedScholarDocumentTypes.has(file.type)) {
    return { path: null, error: "Document must be a PDF, DOC, or DOCX file." };
  }
  if (file.size > 10 * 1024 * 1024) {
    return { path: null, error: "Document must be 10MB or smaller." };
  }

  const supabase = await createSupabaseServerClient();
  const path = `${folder}/${randomUUID()}-${safeFileName(file.name)}`;
  const { error } = await supabase.storage.from("scholar-docs").upload(path, file, {
    contentType: file.type,
    upsert: false
  });

  if (error) return { path: null, error: error.message };
  return { path, error: null };
}

export async function uploadScholarDocument(formData: FormData) {
  const profile = await requireProfile();
  const file = formData.get("document");

  if (!(file instanceof File) || file.size === 0) actionError("/documents", "Choose a document to upload.");

  const upload = await uploadScholarDocFile(file, profile.id);
  if (upload.error || !upload.path) actionError("/documents", `Document was not uploaded: ${upload.error ?? "No storage path returned."}`);

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("scholar_documents").insert({
    scholar_id: profile.id,
    recipient_id: profile.id,
    filename: file.name,
    file_url: upload.path,
    type: safeDocumentType(formData),
    uploaded_by: profile.id,
    admin_id: null,
    sent_by_admin: false
  });

  if (error) {
    await supabase.storage.from("scholar-docs").remove([upload.path]);
    actionError("/documents", `Document was uploaded but not saved: ${error.message}`);
  }

  revalidatePath("/documents");
  redirect("/documents?message=Document uploaded.");
}

export async function acknowledgeScholarDocument(documentId: string) {
  const profile = await requireProfile();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("scholar_documents")
    .update({ acknowledged_at: new Date().toISOString() })
    .eq("id", documentId)
    .eq("scholar_id", profile.id)
    .eq("sent_by_admin", true);

  if (error) actionError("/documents", `Document was not acknowledged: ${error.message}`);

  revalidatePath("/documents");
  redirect("/documents?message=Document acknowledged.");
}

export async function sendScholarDocument(formData: FormData) {
  const profile = await requireRole(["admin"]);
  const file = formData.get("document");

  if (!(file instanceof File) || file.size === 0) actionError("/documents", "Choose a document to send.");
  if (file.type !== "application/pdf") actionError("/documents", "Admin documents must be PDF files.");

  const supabase = await createSupabaseServerClient();
  const recipientMode = value(formData, "recipient_mode") === "all" ? "all" : "specific";
  let scholarIds = formData.getAll("scholar_ids").map((id) => String(id)).filter(Boolean);

  if (recipientMode === "all") {
    const { data, error } = await supabase.from("profiles").select("id").eq("role", "trainee");
    if (error) actionError("/documents", `Scholar list could not be loaded: ${error.message}`);
    scholarIds = (data ?? []).map((item) => item.id);
  }

  if (!scholarIds.length) actionError("/documents", "Choose at least one Scholar recipient.");

  const upload = await uploadScholarDocFile(file, `admin/${profile.id}`);
  if (upload.error || !upload.path) actionError("/documents", `Document was not uploaded: ${upload.error ?? "No storage path returned."}`);

  const title = value(formData, "title") || file.name;
  const rows = scholarIds.map((scholarId) => ({
    scholar_id: scholarId,
    recipient_id: scholarId,
    filename: title,
    file_url: upload.path,
    type: "Agreement",
    uploaded_by: profile.id,
    admin_id: profile.id,
    sent_by_admin: true
  }));

  const { error } = await supabase.from("scholar_documents").insert(rows);
  if (error) {
    await supabase.storage.from("scholar-docs").remove([upload.path]);
    actionError("/documents", `Document was uploaded but not sent: ${error.message}`);
  }

  revalidatePath("/documents");
  redirect(`/documents?message=${encodeURIComponent(`Document sent to ${scholarIds.length} scholars.`)}`);
}

export async function respondToProjectInvitation(invitationId: string, response: "accepted" | "declined") {
  const profile = await requireProfile();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("project_invitations")
    .update({
      status: response,
      responded_at: new Date().toISOString(),
      ...(response === "accepted" ? { start_date: new Date().toISOString().slice(0, 10) } : {})
    })
    .eq("id", invitationId)
    .eq("scholar_id", profile.id)
    .eq("status", "pending");

  if (error) actionError("/tasks", `Project invitation was not updated: ${error.message}`);

  revalidatePath("/tasks");
  redirect(`/tasks?tab=${response === "accepted" ? "active" : "pending"}&message=${encodeURIComponent(response === "accepted" ? "Project accepted" : "Project declined")}`);
}

export async function createProject(formData: FormData) {
  const profile = await requireRole(["admin"]);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("projects").insert({
    title: value(formData, "title"),
    project_type: safeProjectType(formData),
    description: value(formData, "description"),
    deadline: optionalValue(formData, "deadline"),
    status: "active",
    created_by: profile.id
  });

  if (error) actionError("/tasks", `Project was not created: ${error.message}`);

  revalidatePath("/tasks");
  redirect("/tasks?message=Project created.");
}

export async function sendProjectInvitations(formData: FormData) {
  await requireRole(["admin"]);
  const supabase = await createSupabaseServerClient();
  const projectId = value(formData, "project_id");
  const scholarIds = formData.getAll("scholar_ids").map((id) => String(id)).filter(Boolean);

  if (!projectId) actionError("/tasks", "Choose a project before sending invitations.");
  if (!scholarIds.length) actionError("/tasks", "Choose at least one Scholar to invite.");

  const { data: project, error: projectError } = await supabase.from("projects").select("*").eq("id", projectId).single();
  if (projectError || !project) actionError("/tasks", `Project was not found: ${projectError?.message ?? "No project row returned."}`);

  const rows = scholarIds.map((scholarId) => ({
    project_id: project.id,
    scholar_id: scholarId,
    status: "pending",
    project_title: project.title,
    project_type: project.project_type,
    short_description: project.description,
    instructions: project.description,
    invitation_message: optionalValue(formData, "message"),
    deadline: project.deadline
  }));

  const { error } = await supabase.from("project_invitations").upsert(rows, {
    onConflict: "project_id,scholar_id",
    ignoreDuplicates: false
  });

  if (error) actionError("/tasks", `Invitations were not sent: ${error.message}`);

  revalidatePath("/tasks");
  redirect(`/tasks?message=${encodeURIComponent(`Invitations sent to ${scholarIds.length} scholars`)}`);
}

export async function updateInvoiceStatus(invoiceId: string, status: Extract<InvoiceStatus, "approved" | "rejected" | "paid">) {
  await requireRole(["admin"]);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("invoices")
    .update({
      status,
      paid_at: status === "paid" ? new Date().toISOString() : null
    })
    .eq("id", invoiceId);

  if (error) actionError("/invoices", `Invoice was not updated: ${error.message}`);

  revalidatePath("/invoices");
  redirect("/invoices?message=Invoice updated.");
}
