"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface LoginFormFields {
  email: string;
  password: string;
}

export default function NewLoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        console.log("Login error:", result.error);
        toast({
          title: "Login Failed",
          description:
            result.error === "CredentialsSignin"
              ? "Invalid email or password. Please try again."
              : result.error,
          variant: "destructive",
        });
      } else if (result?.ok) {
        console.log("Login successful");
        toast({
          title: "Welcome Back!",
          description: "You have been signed in successfully.",
        });

        const session = await getSession();

        if (session?.user) {
          const userRole = session.user.role?.name || session.user.role;
          const isVerified = session.user.verified;
          const roleId = session.user.role?.id;

          console.log(
            "User role:",
            userRole,
            "roleId:",
            roleId,
            "verified:",
            isVerified
          );

          // First-time login: not verified
          if (!isVerified) {
            if (userRole === "user") {
              router.push("/profile");
            } else if (userRole === "hr") {
              router.push("/admin/profile"); // HR must reset password here
            } else {
              // super admin
              router.push("/admin/dashboard");
            }
            return;
          }

          if (userRole !== "user") {
            router.push("/admin/dashboard");
          } else {
            router.push("/dashboard");
          }
        } else {
          // Fallback routing if no session user
          router.push("/dashboard");
        }
      }
    } catch (error: any) {
      console.log("Login exception:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
          <Briefcase className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold font-montserrat">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Sign in to your JobHub account to continue
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
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
                      placeholder="Enter your email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
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
                        placeholder="Enter your password"
                        disabled={isLoading}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
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

            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid || isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              New to JobHub?
            </span>
          </div>
        </div>

        <div className="text-center">
          <Link href="/register">
            <Button variant="outline" className="w-full bg-transparent">
              Create Account
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export { NewLoginForm };
