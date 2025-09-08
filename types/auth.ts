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
  languages?: string[]
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
  token: string
  phone?: string
  profile?: Profile
}

export interface ResetPasswordFields {
  old_password: string;
  new_password: string;
}
