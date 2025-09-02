"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import ResetPasswordDialog from "@/components/admin/ResetPasswordDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Edit, Upload, Mail, Phone, MapPin } from "lucide-react";

function fetchAdminProfile(token: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
}

export default function AdminProfileClient() {
  const { data: session } = useSession();
  const [showReset, setShowReset] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: () => fetchAdminProfile(session?.accessToken || ""),
    enabled: !!session?.accessToken,
  });

  useEffect(() => {
    if (session?.user?.role?.name === "hr" && session.user.verified === false) {
      setShowReset(true);
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <ResetPasswordDialog open={showReset} onOpenChange={setShowReset} />
      <Breadcrumb items={[{ label: "Admin Dashboard", href: "/admin/dashboard" }, { label: "Profile" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-foreground">Admin Profile</h1>
          <p className="text-muted-foreground">Complete or update your admin/HR profile</p>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/professional-admin-avatar.png" alt="Admin Profile" />
              <AvatarFallback className="text-lg">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{profile?.name}</h2>
              <p className="capitalize text-muted-foreground">{profile?.role}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {profile?.location}
                </div>
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
                <Button size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Update Photo
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Describe your role, experience, and responsibilities as an admin or HR..." defaultValue={profile?.about} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="jane.admin@company.com" defaultValue={profile?.email} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="+233 501 388 841" defaultValue={profile?.phone} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
