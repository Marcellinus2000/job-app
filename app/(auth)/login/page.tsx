import NewLoginForm from "@/components/auth/new-login-form"
import { BackButton } from "@/components/ui/back-button"

export default function LoginPage() {
  return (
    <div className="space-y-4">
      <BackButton href="/" label="Back to Home" className="mb-4" />
      <NewLoginForm />
    </div>
  )
}
