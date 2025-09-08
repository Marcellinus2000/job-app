import { Role } from "./role"

// User profile types based on the Vue implementation
export interface UserProfile {
  firstname?: string
  lastname?: string
  phone?: string
  gps_address?: string
  portfolio_url?: string
  notice_period?: string
  languages?: Array<{ name: string }> | string[]
  gender?: string
  date_of_birth?: string
  picture_url?: string
  resume?: string
  tertiary_cert?: string
  transcript?: string
  wassce_cert?: string
  bece_cert?: string
}

export interface User {
  id: number
  email: string
  role?: Role
  phone?: string
  created_at?: string
  verified: boolean
  profile: UserProfile
}

export interface UserResponse {
  user: User
  token: string
}

// Form data interfaces for profile updates
export interface UserProfileJsonUpdate {
  firstname: string
  lastname: string
  phone: string
  gps_address: string
  portfolio_url: string
  notice_period: string
  languages: string[]
  gender: string
  date_of_birth: string
}

export interface UserProfileFilesUpdate {
  picture: File | null
  resume: File | null
  tertiary_cert: File | null
  transcript: File | null
  wassce_cert: File | null
  bece_cert: File | null
}
