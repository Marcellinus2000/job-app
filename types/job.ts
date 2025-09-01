export type UserProfile = {
  firstname: string;
  lastname: string;
};

export type UserForJob = {
  id: number;
  profile: UserProfile;
};

export type CompanyProfile = {
  description: string;
  logo: string;
  website: string;
};

export type CompanyForJob = {
  id: number;
  name: string;
  profile: CompanyProfile;
};

export type Category = {
  id: number;
  name: string;
  job_count: number;
};

export type SubCategory = {
  id: number;
  name: string;
};

export type Department = {
  id: number;
  name: string;
};

export type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  experience_level: string;
  salary_range_min?: number | null;
  salary_range_max?: number | null;
  created_at: string;
  number_of_applicants: number;
  category: Category;
  subcategory?: SubCategory | null;
  department?: Department | null;
  company: CompanyForJob;
  user: UserForJob;
  publishing_date: string;
  expiry_date: string;
  status: string;
  responsibilities?: string[] | null;
  skills?: string[] | null;
};

/* ---------------------- API Responses ---------------------- */
export type SingleJobResponse = {
  job: Job;
  responsibilities: string[];
  skills: string[];
};

export type AppliedJobResponse = {
  id: number;
  user_id: number;
  firstname: string;
  lastname: string;
  picture_url: string | null;
  email: string;
  phone: string;
  gps_address: string;
  portfolio_url: string;
  resume: string | null;
  tertiary_cert: string | null;
  transcript: string | null;
  wassce_cert: string | null;
  bece_cert: string | null;
  interview_date: string | null;
  status: string;
  created_date: string;

  job: Pick<Job, "id" | "title" | "description" | "location" | "expiry_date" | "number_of_applicants" | "department">;

  company: Pick<CompanyForJob, "id" | "name">;

  languages: string[];
  comments: any[]; // refine if structure is known
};
