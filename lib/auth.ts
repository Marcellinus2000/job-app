import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { apiClient } from "@/lib/apiClient"
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
          const response: LoginResponse = await apiClient("/auth/login", {
            method: "POST",
            data: {
              email: credentials.email,
              password: credentials.password,
            },
          })

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
              token: response.token,
              phone: response.user.phone,
              profile: response.user.profile,
            }
          }

          return null
        } catch (error: any) {
          throw new Error(error.message || "Invalid credentials")
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger }) {

      // On first login
      if (user) {
        token.role = user.role
        token.verified = user.verified
        token.accessToken = user.token
        token.phone = user.phone
        token.profile = user.profile
          ? {
              firstname: user.profile.firstname || undefined,
              lastname: user.profile.lastname || undefined,
              gender: user.profile.gender || undefined,
              date_of_birth: user.profile.date_of_birth || undefined,
              picture_url: user.profile.picture_url || undefined,
              gps_address: user.profile.gps_address || undefined,
              portfolio_url: user.profile.portfolio_url || undefined,
              resume: user.profile.resume || undefined,
              tertiary_cert: user.profile.tertiary_cert || undefined,
              transcript: user.profile.transcript || undefined,
              wassce_cert: user.profile.wassce_cert || undefined,
              bece_cert: user.profile.bece_cert || undefined,
              notice_period: user.profile.notice_period || undefined,
              languages: user.profile.languages || undefined,
            }
          : undefined
      }

      if (trigger === "update" && token.accessToken && token.sub) {
          try {
            const freshUser = await apiClient<any>(`/users/${token.sub}`, {
              method: "GET",
              token: token.accessToken,
            });
            if (freshUser) {
              token.role = freshUser.role ?? token.role;
              token.verified = freshUser.verified ?? token.verified;
              token.phone = freshUser.phone ?? token.phone;
              token.profile = freshUser.profile
                ? {
                    firstname: freshUser.profile.firstname || undefined,
                    lastname: freshUser.profile.lastname || undefined,
                    gender: freshUser.profile.gender || undefined,
                    date_of_birth: freshUser.profile.date_of_birth || undefined,
                    picture_url: freshUser.profile.picture_url || undefined,
                    gps_address: freshUser.profile.gps_address || undefined,
                    portfolio_url: freshUser.profile.portfolio_url || undefined,
                    resume: freshUser.profile.resume || undefined,
                    tertiary_cert: freshUser.profile.tertiary_cert || undefined,
                    transcript: freshUser.profile.transcript || undefined,
                    wassce_cert: freshUser.profile.wassce_cert || undefined,
                    bece_cert: freshUser.profile.bece_cert || undefined,
                    notice_period: freshUser.profile.notice_period || undefined,
                    languages: freshUser.profile.languages || undefined,
                  }
                : token.profile;
            } else {
              console.error("Failed to fetch fresh user data: No user returned");
            }
          } catch (err) {
            console.error("Failed to refresh user in jwt callback", err);
          }
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role
        session.user.verified = token.verified
        session.user.phone = token.phone
        session.user.profile = token.profile
        session.accessToken = token.accessToken
      }
      return session
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
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
