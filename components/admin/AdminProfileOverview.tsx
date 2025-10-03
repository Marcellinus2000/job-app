import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Upload } from "lucide-react";
import AdminProfilePictureUpload from "./AdminProfilePictureUpload";

export default function AdminProfileOverview({ profile }: { profile: any }) {
  const fullName =
    `${profile?.profile?.firstname || ""} ${profile?.profile?.lastname || ""}`.trim() || "Admin User";

  return (
    <>
      <CardContent className="p-6">
        <div className="flex items-start space-x-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile?.profile?.picture_url || "/professional-admin-avatar.png"} alt="Admin Profile" />
            <AvatarFallback className="text-lg">
              {fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "AU"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{fullName}</h2>
            <p className="text-lg text-muted-foreground uppercase">{profile?.role?.name}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                {profile?.email}
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {profile?.phone}
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <AdminProfilePictureUpload />
            </div>
          </div>
        </div>
      </CardContent>

      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Email</p>
            <p className="text-muted-foreground">{profile?.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-muted-foreground">{profile?.phone}</p>
          </div>
        </div>
      </CardContent>
    </>
  );
}
