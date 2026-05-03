export type Role = "admin" | "reviewer" | "trainee";
export type Status = "active" | "inactive" | "pending";
export type TrainingModuleStatus = "draft" | "published";
export type CvTemplate = "professional" | "remote_work" | "data_annotation";
export type CvPlan = "free" | "premium" | "professional_review";
export type SubmissionStatus = "submitted" | "approved" | "rejected" | "revision_requested";
export type PaymentStatus = "pending" | "approved" | "paid" | "held";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  phone: string | null;
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
