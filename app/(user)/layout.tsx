import type React from "react"
import { UserNavbar } from "@/components/user-navbar"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <UserNavbar />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
