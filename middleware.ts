import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { Role } from "./types/role"

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    const { pathname } = request.nextUrl

    console.log("[v0] Middleware - pathname:", pathname, "token:", !!token)

    const publicRoutes = ["/", "/login", "/register", "/forgot-password"]
    const isPublicRoute = publicRoutes.includes(pathname)

    // Allow API routes to pass through
    if (pathname.startsWith("/api")) {
      return NextResponse.next()
    }

    // Allow public routes
    if (isPublicRoute) {
      return NextResponse.next()
    }

    // Redirect to login if no token
    if (!token) {
      console.log("[v0] No token, redirecting to login")
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Handle authenticated users
    if (token) {
      const userRole = token.role as Role
      const isVerified = token.verified as boolean

      console.log("[v0] User role:", userRole, "verified:", isVerified)

      // Handle first-time users (not verified)
      if (!isVerified) {
        if (userRole.name === "user") {
          // Force first-time users to complete profile
          if (pathname !== "/profile" && !pathname.startsWith("/api")) {
            console.log("[v0] Redirecting first-time user to profile")
            return NextResponse.redirect(new URL("/profile", request.url))
          }
        } else if (userRole.name === "hr") {
          // Force first-time HR to complete admin profile
          if (pathname !== "/admin/profile" && !pathname.startsWith("/api")) {
            console.log("[v0] Redirecting first-time HR to admin profile")
            return NextResponse.redirect(new URL("/admin/profile", request.url))
          }
        }
      }

      // Handle verified users - enforce role-based access
      if (isVerified) {
        // Admin and HR users
        if (userRole.name === "admin" || userRole.name === "hr") {
          // Prevent admin/hr from accessing user pages
          if (
            pathname.startsWith("/(user)") ||
            pathname === "/dashboard" ||
            pathname === "/jobs" ||
            pathname === "/applications" ||
            pathname === "/profile"
          ) {
            console.log("[v0] Redirecting admin/hr to admin dashboard")
            return NextResponse.redirect(new URL("/admin/dashboard", request.url))
          }
        }

        // Regular users
        if (userRole.name === "user") {
          // Prevent users from accessing admin pages
          if (pathname.startsWith("/admin")) {
            console.log("[v0] Redirecting user away from admin area")
            return NextResponse.redirect(new URL("/dashboard", request.url))
          }
        }
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error("[v0] Middleware error:", error)
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
