import type { AuthUser } from "./auth"
import type { Role } from "./role"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: Role
      verified: boolean
      phone?: string
      profile?: {
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
    }
    accessToken: string
  }

  interface User extends AuthUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role
    verified: boolean
    accessToken: string
    phone?: string
    profile?: {
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
  }
}
