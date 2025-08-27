import RegisterForm from "@/components/auth/register-form"
import { BackButton } from "@/components/ui/back-button"

export default function RegisterPage() {
  return (
    <div className="space-y-4">
      <BackButton href="/" label="Back to Home" className="mb-4" />
      <RegisterForm />
    </div>
  )
}
