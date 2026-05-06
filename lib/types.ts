export type Role = "admin" | "reviewer" | "trainee";
export type Status = "active" | "inactive" | "pending";
export type TrainingModuleStatus = "draft" | "published";
export type CvTemplate = "professional" | "remote_work" | "data_annotation";
export type CvPlan = "free" | "premium" | "professional_review";
export type SubmissionStatus = "submitted" | "approved" | "rejected" | "revision_requested";
export type PaymentStatus = "pending" | "approved" | "paid" | "held";
export type InvoiceStatus = "pending" | "approved" | "paid" | "rejected";
export type ScholarDocumentType = "ID Document" | "Certificate" | "Portfolio" | "Other" | "Agreement";
export type ProjectInvitationStatus = "pending" | "accepted" | "declined" | "completed";
export type ProjectStatus = "draft" | "active" | "closed";
export type TrainingTrack =
  | "Week 1 Onboarding"
  | "Data Annotation Track"
  | "Transcription Track"
  | "AI Evaluation Track"
  | "Prompt Review Track"
  | "Remote Operations Track";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  phone: string | null;
  first_name: string | null;
  last_name: string | null;
  location: string | null;
  skills: string[] | null;
  bio: string | null;
  avatar_path: string | null;
  cv_path: string | null;
  cv_name: string | null;
  cv_size: number | null;
  cv_uploaded_at: string | null;
  status: Status;
  created_at: string;
};

export type TrainingModule = {
  id: string;
  title: string;
  description: string;
  content: string;
  video_url: string | null;
  category: string;
  track: string;
  step_number: number | null;
  estimated_time: string | null;
  status: TrainingModuleStatus;
  material_path: string | null;
  material_name: string | null;
  material_type: string | null;
  material_size: number | null;
  created_by: string | null;
  created_at: string;
};

export const TRAINING_CATEGORIES = [
  "CV Writing",
  "Remote Work Basics",
  "Data Annotation",
  "Audio Transcription",
  "AI Evaluation",
  "Online Hustles",
  "Freelancing Skills"
] as const;

export const TRAINING_TRACKS = [
  "Week 1 Onboarding",
  "Data Annotation Track",
  "Transcription Track",
  "AI Evaluation Track",
  "Prompt Review Track",
  "Remote Operations Track"
] as const;

export type TrainingProgress = {
  id: string;
  user_id: string;
  module_id: string;
  completed_at: string;
};

export type CvProfile = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  location: string | null;
  professional_title: string | null;
  summary: string | null;
  skills: string | null;
  experience: string | null;
  education: string | null;
  certifications: string | null;
  referees: string | null;
  template: CvTemplate;
  plan: CvPlan;
  created_at: string;
  updated_at: string;
};

export type PracticeTask = {
  id: string;
  title: string;
  task_type: string;
  instructions: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  sample_file_url: string | null;
  answer_key: string | null;
  created_by: string | null;
  created_at: string;
  status: "draft" | "active" | "archived";
};

export type Submission = {
  id: string;
  task_id: string;
  trainee_id: string;
  answer_text: string | null;
  file_url: string | null;
  status: SubmissionStatus;
  score: number | null;
  feedback: string | null;
  reviewed_by: string | null;
  submitted_at: string;
  reviewed_at: string | null;
  profiles?: Pick<Profile, "full_name" | "email"> | null;
  practice_tasks?: Pick<PracticeTask, "title" | "task_type"> | null;
};

export type Payment = {
  id: string;
  trainee_id: string;
  amount: number;
  currency: string;
  reason: string;
  status: PaymentStatus;
  payment_method: string | null;
  created_at: string;
  paid_at: string | null;
};

export type Invoice = {
  id: string;
  scholar_id: string;
  project_id: string | null;
  amount: number;
  currency: "KES" | "USD";
  status: InvoiceStatus;
  issued_at: string;
  paid_at: string | null;
  notes: string | null;
  profiles?: Pick<Profile, "full_name" | "email"> | null;
  projects?: Pick<Project, "title" | "project_type"> | null;
};

export type ScholarDocument = {
  id: string;
  scholar_id: string;
  recipient_id: string | null;
  filename: string;
  file_url: string;
  type: ScholarDocumentType;
  uploaded_by: string | null;
  admin_id: string | null;
  sent_by_admin: boolean;
  acknowledged_at: string | null;
  created_at: string;
  profiles?: Pick<Profile, "full_name" | "email"> | null;
  sender?: Pick<Profile, "full_name" | "email"> | null;
};

export type ProjectInvitation = {
  id: string;
  project_id: string;
  scholar_id: string;
  status: ProjectInvitationStatus;
  project_title: string;
  project_type: string;
  short_description: string;
  instructions: string | null;
  invitation_message: string | null;
  invited_at: string;
  responded_at: string | null;
  start_date: string | null;
  deadline: string | null;
  completed_at: string | null;
  score: number | null;
  feedback: string | null;
};

export type Project = {
  id: string;
  title: string;
  project_type: string;
  description: string;
  deadline: string | null;
  status: ProjectStatus;
  created_by: string | null;
  created_at: string;
};

export type ProjectWithInvitations = Project & {
  invitations: Array<
    Pick<ProjectInvitation, "id" | "status" | "responded_at" | "scholar_id"> & {
      profiles?: Pick<Profile, "full_name" | "email"> | null;
    }
  >;
};
