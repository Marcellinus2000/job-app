"use client"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRoles } from "@/hooks/use-roles"
import { postRequestHandler } from "@/lib/apiClient"
import type { RegisterFormFields, RegisterUserRequest } from "@/types/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Briefcase, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"

export default function NewRegisterForm() {
  const { toast } = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: roles, isLoading: rolesLoading } = useRoles()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Console log the roles when available
  if (roles) {
    console.log("Fetched roles:", roles)
  }

  // Form setup with react-hook-form
  const form = useForm<RegisterFormFields>({
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      country_code: "GH", // Default to Ghana
      verified: false,
      confirmPassword: "",
      agreeToTerms: false,
    },
    mode: "onChange",
  })

  // TanStack Query mutation for registration
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (payload: RegisterUserRequest) => postRequestHandler("/users", payload),
    onSuccess: () => {
      form.reset()
      toast({
        title: "Success",
        description: "Account created successfully! Please sign in.",
      })
      setTimeout(() => {
        router.push("/login")
      }, 1500)
      queryClient.invalidateQueries({ queryKey: ["roles"] }) // Optional: refresh roles
    },
    onError: (error: any) => {
      console.log("Registration error:", error) // Debug log
      toast({
        title: "Error",
        description: error?.message || "Registration failed",
        variant: "destructive",
      })
    },
  })

  const handleSubmit: SubmitHandler<RegisterFormFields> = (data) => {
    console.log("Form submitted with data:", data) // Debug log

    if (!data.agreeToTerms) {
      toast({
        title: "Error",
        description: "You must agree to the Terms of Service and Privacy Policy",
        variant: "destructive",
      })
      return
    }

    if (data.password !== data.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    const userRole = roles?.find((role) => role.name === "user")
    if (!userRole) {
      toast({
        title: "Error",
        description: "User role not found",
        variant: "destructive",
      })
      return
    }

    const payload: RegisterUserRequest = {
      email: data.email,
      password: data.password,
      phone: data.phone,
      role_id: userRole.id,
      country_code: data.country_code,
      verified: false,
    }

    console.log("Sending registration payload:", payload) 
    mutate(payload)
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
          <Briefcase className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold font-montserrat">Join JobHub</CardTitle>
          <CardDescription>Create your job seeker account to get started</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      disabled={isLoading || rolesLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3">
              <FormField
                control={form.control}
                name="country_code"
                rules={{ required: "Country code is required" }}
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel htmlFor="countryCode">Country</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange} disabled={isLoading || rolesLoading}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">🇺🇸 US</SelectItem>
                          <SelectItem value="GB">🇬🇧 GB</SelectItem>
                          <SelectItem value="GH">🇬🇭 GH</SelectItem>
                          <SelectItem value="NG">🇳🇬 NG</SelectItem>
                          <SelectItem value="KE">🇰🇪 KE</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel htmlFor="phone">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="123-456-7890"
                        disabled={isLoading || rolesLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)/,
                  message: "Password must contain letters and numbers",
                },
              }}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        disabled={isLoading || rolesLoading}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading || rolesLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <p className="text-sm text-muted-foreground">Use 6 characters with a mix of letters & numbers</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              rules={{
                required: "Please confirm your password",
                validate: (value, formValues) => value === formValues.password || "Passwords do not match",
              }}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        disabled={isLoading || rolesLoading}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading || rolesLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading || rolesLoading}
                    />
                  </FormControl>
                  <FormLabel htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </FormLabel>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={!form.formState.isValid || isLoading || rolesLoading}>
              {isLoading ? (
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Already have an account?</span>
          </div>
        </div>

        <div className="text-center">
          <Link href="/login">
            <Button variant="outline" className="w-full bg-transparent">
              Sign In Instead
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export { NewRegisterForm }
