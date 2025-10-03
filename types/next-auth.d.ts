// next-auth.d.ts
import type { Role } from "@/types/role"
import type { UserProfile } from "@/types/user"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      role: Role
      verified: boolean
      phone?: string
      profile?: UserProfile | null
    }
    accessToken?: string
  }

  interface User {
  id: string
  email: string
  role: Role
  verified: boolean
  phone?: string
  profile?: UserProfile | null
  token?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role: Role
    verified: boolean
    accessToken?: string
    phone?: string
    profile?: UserProfile | null  
  }
}
