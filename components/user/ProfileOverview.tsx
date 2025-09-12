"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, MapPin, Mail, Phone, LinkIcon } from "lucide-react";

interface Props {
  profile: any;
  fullName: string;
  displayEmail: string;
  displayPhone: string;
  displayLocation: string;
  onPhotoUpload: (file: File) => void;
}

export default function ProfileOverview({
  profile,
  fullName,
  displayEmail,
  displayPhone,
  displayLocation,
  onPhotoUpload,
}: Props) {
  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={profile?.picture_url || "/placeholder.svg?height=96&width=96"}
                alt="Profile"
              />
              <AvatarFallback>
                {fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{fullName}</h2>
              <p className="text-lg text-muted-foreground">Job Seeker</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> {displayLocation}
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" /> {displayEmail}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" /> {displayPhone}
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <label htmlFor="overview-photo-upload">
                  <input
                    type="file"
                    id="overview-photo-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onPhotoUpload(file);
                    }}
                  />
                  <Button size="sm" asChild>
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Update Photo
                    </span>
                  </Button>
                </label>

                {profile?.portfolio_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Portfolio
                    </a>
                  </Button>
                )}
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
          <p className="text-muted-foreground leading-relaxed">
            Welcome to your profile! Complete your information in the
            Settings tab to help employers learn more about you.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
