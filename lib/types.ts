export interface Role {
  name: string
  id: number
}

export interface HRProfile {
  firstname: string
  lastname: string
}

export interface Hr {
  id: number
  profile: HRProfile
}

export interface SubCategory {
  id: number
  name: string
}

export interface Category {
  id: number
  name: string
  job_count: number
}

export interface CompanyProfile {
  description: string
  logo: string
  website: string
}

export interface CompanyForJob {
  id: number
  name: string
  profile: CompanyProfile
}

export interface UserForJob {
  id: number
  profile: {
    firstname: string
    lastname: string
  }
}

export interface Images {
  id: number
  image_url: string
}

export interface CompanyOut {
  id: number
  name: string
  email: string
  address: string
  phone: string
  profile: CompanyProfile
  job_count: number
  hr: Hr
  images: Images[]
}

export interface Department {
  id: number
  name: string
}

export interface Language {
  id: number
  name: string
}

export interface User {
  id: number
  email: string
  phone: string
  role: {
    name: string
    id: number
  }
  created_at: string
  verified: boolean
  profile: UserProfile
  companies: CompanyOut[]
}

export interface UserProfile {
  firstname?: string
  lastname?: string
  gender?: string
  date_of_birth?: string
  picture_url?: string
  gps_address?: string
  portfolio_url?: string
  resume?: string
  tertiary_cert?: string
  transcript?: string
  wassce_cert?: string
  bece_cert?: string
  notice_period?: string
  languages?: Language[]
}

export interface UserProfileJsonUpdate {
  firstname: string
  lastname: string
  phone: string
  gps_address: string
  portfolio_url: string
  notice_period: string
  languages: string[]
  gender?: string
  date_of_birth?: string
}

export interface UserProfileFilesUpdate {
  picture: File | null
  resume?: File | null
  tertiary_cert?: File | null
  transcript?: File | null
  wassce_cert?: File | null
  bece_cert?: File | null
}

export interface UserProfileUpdate extends UserProfileJsonUpdate, UserProfileFilesUpdate {}

export interface UserResponse {
  user: User
  companies?: CompanyOut[]
}

export type UsersResponse = User[]

export interface AuthResponse {
  token: string
  user: User
}

export interface Skill {
  id: number
  name: string
}

export interface Responsibility {
  id: number
  description: string
}

export interface Job {
  id: number
  title: string
  description: string
  location: string
  experience_level: string
  salary_range_min: number | null
  salary_range_max: number | null
  created_at: string
  number_of_applicants: number
  category: Category
  subcategory: SubCategory
  department: Department
  company: CompanyForJob
  user: UserForJob
  publishing_date: string
  expiry_date: string
  status: string
  responsibilities?: string[]
  skills?: string[]
}

export interface SingleJobResponse {
  job: Job
  responsibilities: string[]
  skills: string[]
}

export interface JobApplicationFormData {
  user_id: number
  job_id: number
  company_id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  gps_address: string
  portfolio_url: string
  educational_level: string
  languages: string[]
  resume: File | null
  tertiary_cert: File | null
  transcript: File | null
  wassce_cert: File | null
  bece_cert: File | null
}

export interface AppliedJobResponse {
  id: number
  user_id: number
  firstname: string
  lastname: string
  picture_url: string | null
  email: string
  phone: string
  gps_address: string
  portfolio_url: string
  resume: string | null
  tertiary_cert: string | null
  transcript: string | null
  wassce_cert: string | null
  bece_cert: string | null
  interview_date: string | null
  status: string
  created_date: string
  job: {
    id: number
    title: string
    description: string
    location: string
    expiry_date: string
    number_of_applicants: number
    department: {
      id: number
      name: string
    }
  }
  company: {
    id: number
    name: string
  }
  languages: string[]
  comments: []
}

export interface RegisterUserRequest {
  email: string
  password: string
  phone: string
  role_id: number
  country_code: string
  verified: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

// Additional utility types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
