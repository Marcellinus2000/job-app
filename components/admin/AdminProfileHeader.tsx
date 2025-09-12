import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface Props {
  profile: any;
  onEdit: () => void;
  onReset: () => void;
  isVerified: boolean;
}

export default function AdminProfileHeader({ profile, onEdit, onReset, isVerified }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold font-montserrat text-foreground">Admin Profile</h1>
        <p className="text-muted-foreground">Complete or update your admin/HR profile</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={onReset} variant="outline" disabled={!isVerified}>
          Change Password
        </Button>
        <Button onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
