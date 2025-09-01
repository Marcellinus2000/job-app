// types/auth.ts
export type RegisterUserRequest = {
  email: string
  password: string
  phone: string
  role_id: number
  country_code: string
  verified: boolean
}

export type RegisterFormFields = RegisterUserRequest & {
  confirmPassword: string
  agreeToTerms: boolean
}

export type LoginRequest = {
  email: string
  password: string
}

export interface Role {
  id: number
  name: string
}

export interface Profile {
  firstname: string | null
  lastname: string | null
  gender: string | null
  date_of_birth: string | null
  picture_url: string | null
  gps_address: string | null
  portfolio_url: string | null
  resume: string | null
  tertiary_cert: string | null
  transcript: string | null
  wassce_cert: string | null
  bece_cert: string | null
  notice_period: string | null
  languages: string[]
}

export interface BackendUser {
  id: number
  email: string
  phone: string
  role: Role
  created_at: string
  verified: boolean
  profile: Profile
  companies: any[]
}

export interface LoginResponse {
  token: string
  user: BackendUser
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: Role
  verified: boolean
  isFirstTime: boolean
  token: string
  phone?: string
  profile?: Profile
}
