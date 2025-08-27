"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BackButtonProps {
  href?: string
  label?: string
  className?: string
  variant?: "default" | "ghost" | "outline"
}

export function BackButton({ href, label = "Back", className, variant = "ghost" }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button variant={variant} onClick={handleBack} className={cn("flex items-center gap-2", className)}>
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  )
}
