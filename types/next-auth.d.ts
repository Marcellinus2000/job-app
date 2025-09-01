import type { AuthUser } from "./auth"
import { Role } from "./role"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: Role
      verified: boolean
      isFirstTime: boolean
      phone?: string
    }
    accessToken: string
  }

  interface User extends AuthUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role
    verified: boolean
    isFirstTime: boolean
    accessToken: string
    phone?: string
  }
}
