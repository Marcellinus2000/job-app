"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useUpdateProfile } from "@/hooks/use-user-profile";
import { useSession } from "next-auth/react";
import { X, Save } from "lucide-react";

interface Props {
  profile: any;
  onCancel: () => void;
}

export default function AdminProfileForm({ profile, onCancel }: Props) {
  const { update: updateSession } = useSession();
  const updateProfileMutation = useUpdateProfile();

  const form = useForm({
    defaultValues: {
      firstname: profile?.profile?.firstname || "",
      lastname: profile?.profile?.lastname || "",
      phone: profile?.phone || "",
      gps_address: profile?.profile?.gps_address || "",
      gender: profile?.profile?.gender || "",
      date_of_birth: profile?.profile?.date_of_birth || "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (data: any) => {
    try {
      await updateProfileMutation.mutateAsync(data);
      await updateSession();
      onCancel();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const isUpdating = updateProfileMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField name="firstname" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="lastname" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="phone" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="gps_address" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>GPS Address</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="gender" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="date_of_birth" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isUpdating}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button type="submit" disabled={!form.formState.isValid || isUpdating}>
            <Save className="mr-2 h-4 w-4" /> {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
