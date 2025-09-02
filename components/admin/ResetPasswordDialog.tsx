"use client";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/apiClient";
import type { ResetPasswordFields } from "@/types/auth";

export default function ResetPasswordDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const form = useForm<ResetPasswordFields>({
    defaultValues: { old_password: "", new_password: "" },
    mode: "onChange",
  });

  const handleSubmit: SubmitHandler<ResetPasswordFields> = async (data) => {
    setLoading(true);
    try {
      await apiClient("/auth/change-password", { method: "POST", data });
      toast({ title: "Success", description: "Password reset successful!" });
      onOpenChange(false);
    } catch (error: any) {
      toast({ title: "Error", description: error?.message || "Password reset failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="old_password">Old Password</Label>
            <Input id="old_password" type="password" {...form.register("old_password", { required: true })} />
          </div>
          <div>
            <Label htmlFor="new_password">New Password</Label>
            <Input id="new_password" type="password" {...form.register("new_password", { required: true, minLength: 6 })} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
