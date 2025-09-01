import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { postRequestHandler } from "@/lib/apiClient"
import type { LoginResponse, AuthUser } from "@/types/auth"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        try {
          console.log("[v0] Attempting login for:", credentials.email)

          const response: LoginResponse = await postRequestHandler("/auth/login", {
            email: credentials.email,
            password: credentials.password,
          })

          console.log("[v0] Login API response:", response)

          if (response && response.user) {
            return {
              id: response.user.id.toString(),
              email: response.user.email,
              name:
                response.user.profile.firstname && response.user.profile.lastname
                  ? `${response.user.profile.firstname} ${response.user.profile.lastname}`
                  : response.user.email,
              role: {
                name: response.user.role.name,
                id: response.user.role.id,
              },
              verified: response.user.verified,
              isFirstTime: !response.user.verified,
              token: response.token,
              phone: response.user.phone,
              profile: response.user.profile,
            }
          }

          return null
        } catch (error: any) {
          console.log("[v0] Login error:", error)
          throw new Error(error.message || "Invalid credentials")
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.verified = user.verified
        token.isFirstTime = user.isFirstTime
        token.accessToken = user.token
        token.phone = user.phone
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role
        session.user.verified = token.verified
        session.user.isFirstTime = token.isFirstTime
        session.user.phone = token.phone
        session.accessToken = token.accessToken
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      console.log("[v0] Redirect callback - url:", url, "baseUrl:", baseUrl)

      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }

      if (new URL(url).origin === baseUrl) {
        return url
      }

      return baseUrl
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
