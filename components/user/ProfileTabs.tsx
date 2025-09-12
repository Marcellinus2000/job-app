"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileOverview from "./ProfileOverview";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileSkills from "./ProfileSkills";
import ProfileSettingsForm from "./ProfileSettingsForm";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: any;
  fullName: string;
  displayEmail: string;
  displayPhone: string;
  displayLocation: string;
  handlePhotoUpload: (file: File) => void;
  isEditing: boolean;
  setIsEditing: (e: boolean) => void;
  handleSubmit: (data: any) => Promise<void>;
  handleCancel: () => void;
  form: UseFormReturn<any>;
  isUpdating: boolean;
}

export default function ProfileTabs({
  activeTab,
  setActiveTab,
  profile,
  fullName,
  displayEmail,
  displayPhone,
  displayLocation,
  handlePhotoUpload,
  isEditing,
  setIsEditing,
  handleSubmit,
  handleCancel,
  form,
  isUpdating,
}: Props) {
  return (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)} className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <ProfileOverview
          profile={profile}
          fullName={fullName}
          displayEmail={displayEmail}
          displayPhone={displayPhone}
          displayLocation={displayLocation}
          onPhotoUpload={handlePhotoUpload}
        />
      </TabsContent>

      <TabsContent value="experience">
        <ProfileExperience />
      </TabsContent>

      <TabsContent value="education">
        <ProfileEducation />
      </TabsContent>

      <TabsContent value="skills">
        <ProfileSkills />
      </TabsContent>

      <TabsContent value="settings">
        <ProfileSettingsForm
          form={form}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          isUpdating={isUpdating}
          profile={profile}
        />
      </TabsContent>
    </Tabs>
  );
}
