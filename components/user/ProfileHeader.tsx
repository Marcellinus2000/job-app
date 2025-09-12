"use client";

import { Button } from "@/components/ui/button";
import { Download, Edit } from "lucide-react";

export default function ProfileHeader({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold font-montserrat text-foreground">
          My Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your professional profile and preferences
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Resume
        </Button>
        <Button onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
