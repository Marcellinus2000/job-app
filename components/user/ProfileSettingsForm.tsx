"use client";

import { useEffect } from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Save, X } from "lucide-react";
import { ProfilePictureUpload } from "@/components/user/profile-picture-upload";
import { FileUploadField } from "@/components/user/file-upload-field";
import type { UserProfileJsonUpdate, UserProfileFilesUpdate } from "@/types/user";

interface ProfileFormData extends UserProfileJsonUpdate {
  files: Partial<UserProfileFilesUpdate>;
}

interface Props {
  form: UseFormReturn<ProfileFormData>;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
  handleSubmit: (data: ProfileFormData) => Promise<void>;
  handleCancel: () => void;
  isUpdating: boolean;
  profile: any;
}

const languageOptions = ["English", "Spanish", "Ga", "Fante", "Others"];
const noticePeriodOptions = ["Immediate", "1 Week", "2 Weeks", "1 Month", "Some months"];

export default function ProfileSettingsForm({
  form,
  isEditing,
  setIsEditing,
  handleSubmit,
  handleCancel,
  isUpdating,
  profile,
}: Props) {
  // keep form values in sync when profile changes
  useEffect(() => {
    form.reset({
      firstname: profile?.firstname || "",
      lastname: profile?.lastname || "",
      phone: form.getValues("phone") || "",
      gps_address: profile?.gps_address || "",
      portfolio_url: profile?.portfolio_url || "",
      notice_period: profile?.notice_period || "",
      languages: Array.isArray(profile?.languages) ? profile.languages : [],
      gender: profile?.gender || "",
      date_of_birth: profile?.date_of_birth || "",
      files: {
        picture: null,
        resume: null,
        tertiary_cert: null,
        transcript: null,
        wassce_cert: null,
        bece_cert: null,
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your personal details, photo and documents</CardDescription>
          </div>

          {isEditing ? (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancel} disabled={isUpdating}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={form.handleSubmit(handleSubmit)} disabled={!form.formState.isValid || isUpdating}>
                <Save className="mr-2 h-4 w-4" />
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Profile picture */}
              <ProfilePictureUpload
                currentPictureUrl={profile?.picture_url}
                onFileSelect={(file) => form.setValue("files.picture", file)}
                isEditing={isEditing}
              />

              {/* Personal Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstname"
                  rules={{ required: "First name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastname"
                  rules={{ required: "Last name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gps_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="portfolio_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio URL</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notice_period"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notice Period</FormLabel>
                      <FormControl>
                        {isEditing ? (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select notice period" />
                            </SelectTrigger>
                            <SelectContent>
                              {noticePeriodOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input value={field.value} readOnly />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        {isEditing ? (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input value={field.value} readOnly />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input {...field} type={isEditing ? "date" : "text"} readOnly={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
  control={form.control}
  name="languages"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Languages</FormLabel>
      <FormControl>
        {isEditing ? (
          <div className="space-y-2">
            <Select
              value=""
              onValueChange={(value) => {
                if (value && !field.value.includes(value)) {
                  field.onChange([...field.value, value]);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Add a language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2">
              {field.value.map((lang: any, index: number) => {
                const langName = typeof lang === "string" ? lang : lang.name; // ✅ force to string
                return (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer"
                  >
                    {langName}
                    <button
                      type="button"
                      className="ml-2 text-xs"
                      onClick={() => {
                        const newLanguages = field.value.filter(
                          (_: any, i: number) => i !== index
                        );
                        field.onChange(newLanguages);
                      }}
                    >
                      ×
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {field.value.length > 0 ? (
              field.value.map((lang: any, index: number) => {
                const langName = typeof lang === "string" ? lang : lang.name; // ✅ force to string
                return (
                  <Badge key={index} variant="secondary">
                    {langName}
                  </Badge>
                );
              })
            ) : (
              <span className="text-muted-foreground">
                No languages specified
              </span>
            )}
          </div>
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Upload your certificates and documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FileUploadField
                      label="Resume"
                      currentFileUrl={profile?.resume}
                      onFileSelect={(file) => form.setValue("files.resume", file)}
                      accept=".pdf,.doc,.docx"
                      isEditing={isEditing}
                    />

                    <FileUploadField
                      label="Tertiary Certificate"
                      currentFileUrl={profile?.tertiary_cert}
                      onFileSelect={(file) => form.setValue("files.tertiary_cert", file)}
                      accept=".pdf,.jpg,.jpeg,.png"
                      isEditing={isEditing}
                    />

                    <FileUploadField
                      label="Transcript"
                      currentFileUrl={profile?.transcript}
                      onFileSelect={(file) => form.setValue("files.transcript", file)}
                      accept=".pdf,.jpg,.jpeg,.png"
                      isEditing={isEditing}
                    />

                    <FileUploadField
                      label="WASSCE Certificate"
                      currentFileUrl={profile?.wassce_cert}
                      onFileSelect={(file) => form.setValue("files.wassce_cert", file)}
                      accept=".pdf,.jpg,.jpeg,.png"
                      isEditing={isEditing}
                    />

                    <FileUploadField
                      label="BECE Certificate"
                      currentFileUrl={profile?.bece_cert}
                      onFileSelect={(file) => form.setValue("files.bece_cert", file)}
                      accept=".pdf,.jpg,.jpeg,.png"
                      isEditing={isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
