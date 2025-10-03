"use client";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import type { ResetPasswordFields } from "@/types/auth";

export default function ResetPasswordDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const { data: session, update: updateSession } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ResetPasswordFields>({
    defaultValues: { old_password: "", new_password: "" },
    mode: "onChange",
  });

  const handleSubmit: SubmitHandler<ResetPasswordFields> = async (data) => {
    if (!session?.accessToken) {
      toast({
        title: "Error",
        description: "No session token found. Please log in again.",
        variant: "destructive",
      });
      return;
    }

    const wasUnverified = !session.user?.verified; // check before reset
    setLoading(true);

    try {
      await apiClient("/auth/change-password", {
        method: "POST",
        data,
        token: session.accessToken,
      });

      toast({
        title: "Success",
        description: "Password reset successful!",
      });

      // Refresh session so verified = true
      await updateSession();

      onOpenChange(false);

      // Redirect only if it was the first time (unverified before reset)
      if (wasUnverified) {
        router.push("/admin/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Password reset failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        // Prevent closing if user is still unverified
        if (session?.user?.verified) {
          onOpenChange(o);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="old_password">Old Password</Label>
            <Input
              id="old_password"
              type="password"
              {...form.register("old_password", { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new_password">New Password</Label>
            <Input
              id="new_password"
              type="password"
              {...form.register("new_password", {
                required: true,
                minLength: 6,
              })}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading || !session?.user?.verified} // disable cancel if unverified
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
