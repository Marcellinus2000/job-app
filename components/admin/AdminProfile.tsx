"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ResetPasswordDialog from "@/components/admin/ResetPasswordDialog";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import AdminProfileHeader from "./AdminProfileHeader";
import AdminProfileOverview from "./AdminProfileOverview";
import AdminProfileForm from "./AdminProfileForm";

export default function AdminProfile() {
  const { data: session } = useSession();
  const [showReset, setShowReset] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const profile = session?.user;

  // Auto-open reset password for first-time HRs
  useEffect(() => {
    if (session?.user?.role?.name === "hr" && !session.user.verified) {
      setShowReset(true);
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <ResetPasswordDialog open={showReset} onOpenChange={setShowReset} />
      <Breadcrumb
        items={[
          { label: "Admin Dashboard", href: "/admin/dashboard" },
          { label: "Profile" },
        ]}
      />

      <AdminProfileHeader
        profile={profile}
        onEdit={() => setIsEditing(true)}
        onReset={() => setShowReset(true)}
        isVerified={!!session?.user?.verified}
      />

      <Card className="p-6">
        {isEditing ? (
          <AdminProfileForm profile={profile} onCancel={() => setIsEditing(false)} />
        ) : (
          <AdminProfileOverview profile={profile} />
        )}
      </Card>
    </div>
  );
}
