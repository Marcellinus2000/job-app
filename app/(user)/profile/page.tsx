// import UserProfileClient from "@/components/user/UserProfileClient";

// export default function ProfilePage() {
//   return <UserProfileClient />;
// }



"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import {
  useUserData,
  useUpdateProfile,
  useUpdateProfileFiles,
} from "@/hooks/use-user-profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProfilePictureUpload } from "@/components/user/profile-picture-upload";
import { FileUploadField } from "@/components/user/file-upload-field";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  LinkIcon,
  Plus,
  Edit,
  Download,
  Upload,
  Save,
  X,
  AlertCircle,
} from "lucide-react";
import type {
  UserProfileJsonUpdate,
  UserProfileFilesUpdate,
} from "@/types/user";

const languageOptions = ["English", "Spanish", "Ga", "Fante", "Others"];
const noticePeriodOptions = [
  "Immediate",
  "1 Week",
  "2 Weeks",
  "1 Month",
  "Some months",
];

interface ProfileFormData extends UserProfileJsonUpdate {
  files: UserProfileFilesUpdate;
}

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const { user, sessionUser, isLoading, error, isFirstTimeUser } =
    useUserData();
  const updateProfileMutation = useUpdateProfile();
  const updateFilesMutation = useUpdateProfileFiles();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(
    isFirstTimeUser ? "settings" : "overview"
  );

  const getDefaultValues = (): ProfileFormData => {
    const profile = sessionUser?.profile || user?.profile;
    const phone = sessionUser?.phone || user?.phone || "";

    if (!profile && !sessionUser) {
      return {
        firstname: "",
        lastname: "",
        phone: "",
        gps_address: "",
        portfolio_url: "",
        notice_period: "",
        languages: [],
        gender: "",
        date_of_birth: "",
        files: {
          picture: null,
          resume: null,
          tertiary_cert: null,
          transcript: null,
          wassce_cert: null,
          bece_cert: null,
        },
      };
    }

    const languages = Array.isArray(profile?.languages)
      ? (profile.languages
          .map((lang: any) => (typeof lang === "string" ? lang : lang.name))
          .filter(Boolean) as string[])
      : [];

    let formattedPhone = phone;
    if (formattedPhone.startsWith("+233")) {
      formattedPhone = "0" + formattedPhone.slice(4);
    } else if (formattedPhone.startsWith("233")) {
      formattedPhone = "0" + formattedPhone.slice(3);
    }

    return {
      firstname: profile?.firstname || "",
      lastname: profile?.lastname || "",
      phone: formattedPhone,
      gps_address: profile?.gps_address || "",
      portfolio_url: profile?.portfolio_url || "",
      notice_period: profile?.notice_period || "",
      languages: [...new Set(languages)],
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
    };
  };

  const form = useForm<ProfileFormData>({
    defaultValues: getDefaultValues(),
    mode: "onChange",
  });

  const handleEdit = () => {
    setIsEditing(true);
    setActiveTab("settings");
    form.reset(getDefaultValues());
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.reset(getDefaultValues());
  };

  const handleSubmit = async (data: ProfileFormData) => {
    try {
      const { files, ...profileData } = data;

      console.log("Starting profile update with data:", profileData);

      // 1. Update JSON profile
      const updatedUser = await updateProfileMutation.mutateAsync(profileData);
      console.log("Profile update response:", updatedUser);

      // 2. Update file uploads (if any)
      const hasFiles = Object.values(files).some(
        (file) => file instanceof File
      );
      if (hasFiles) {
        console.log("Updating files...");
        await updateFilesMutation.mutateAsync(files);
      }

      // 3. Simple session refresh - let JWT callback handle the update
      console.log("Triggering session update...");
      await updateSession();
      console.log("Session update completed");

      // 4. Reset form with fresh values
      form.reset(getDefaultValues());

      setIsEditing(false);
      setActiveTab("overview");

      console.log("Profile update process completed successfully");
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  const handleOverviewPhotoUpload = async (file: File) => {
    try {
      await updateFilesMutation.mutateAsync({ picture: file });
      await updateSession(); 
    } catch (err) {
      console.error("Photo upload failed:", err);
    }
  };

  const handleFileSelect =
    (fieldName: keyof UserProfileFilesUpdate) => (file: File | null) => {
      form.setValue(`files.${fieldName}`, file);
    };

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 60);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const isUpdating =
    updateProfileMutation.isPending || updateFilesMutation.isPending;

  const currentUser = sessionUser || user;
  const profile = sessionUser?.profile || user?.profile;

  useEffect(() => {
    if (currentUser || session?.user) {
      const defaultValues = getDefaultValues();
      form.reset(defaultValues);
    }
  }, [currentUser, user, sessionUser, session?.user]);

  useEffect(() => {
    if (isFirstTimeUser) {
      setActiveTab("settings");
    }
  }, [isFirstTimeUser]);

  const isProfileComplete =
    profile?.firstname &&
    profile?.lastname &&
    currentUser?.phone &&
    profile?.gps_address;
  const canAccessOtherTabs =
    isProfileComplete && (session?.user?.verified || !isFirstTimeUser);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load profile data. Please try refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }

  if (!currentUser && !session?.user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No user data available. Please sign in again.
        </AlertDescription>
      </Alert>
    );
  }

  const fullName =
    `${profile?.firstname || ""} ${profile?.lastname || ""}`.trim() || "User";
  const displayPhone = currentUser?.phone || "Not provided";
  const displayEmail = currentUser?.email || "Not provided";
  const displayLocation = profile?.gps_address || "Not provided";

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Profile" },
        ]}
      />

      {isFirstTimeUser && activeTab !== "settings" && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please complete your profile in the Settings tab to access other
            features.
          </AlertDescription>
        </Alert>
      )}

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
          <Button onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview" disabled={!canAccessOtherTabs}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="experience" disabled={!canAccessOtherTabs}>
            Experience
          </TabsTrigger>
          <TabsTrigger value="education" disabled={!canAccessOtherTabs}>
            Education
          </TabsTrigger>
          <TabsTrigger value="skills" disabled={!canAccessOtherTabs}>
            Skills
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {isFirstTimeUser && activeTab !== "settings" && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please complete your profile in the Settings tab to access other
              features.
            </AlertDescription>
          </Alert>
        )}

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={
                      profile?.picture_url ||
                      "/placeholder.svg?height=96&width=96"
                    }
                    alt="Profile"
                    style={{ objectFit: "cover" }}
                  />
                  <AvatarFallback className="text-lg">
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
                      <MapPin className="h-4 w-4 mr-1" />
                      {displayLocation}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {displayEmail}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {displayPhone}
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
                          if (file) handleOverviewPhotoUpload(file);
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
                        <a
                          href={profile.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Profile Views
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">Coming soon</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Applications
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">Coming soon</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Response Rate
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">Coming soon</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Work Experience</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </div>

          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                No work experience added yet.
              </p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Experience
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Education</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </div>

          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                No education history added yet.
              </p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Your Education
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Skills & Technologies</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  No technical skills added yet.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Soft Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  No soft skills added yet.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfilePictureUpload
                currentPictureUrl={profile?.picture_url}
                onFileSelect={handleFileSelect("picture")}
                isEditing={isEditing}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isUpdating}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      onClick={form.handleSubmit(handleSubmit)}
                      disabled={!form.formState.isValid || isUpdating}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
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
                      rules={{
                        required: "Phone number is required",
                        pattern: {
                          value: /^0\d{9}$/,
                          message:
                            "Phone number must be 10 digits starting with 0",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
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
                      rules={{ required: "Address is required" }}
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
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select notice period" />
                                </SelectTrigger>
                                <SelectContent>
                                  {noticePeriodOptions.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
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
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
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
                      rules={{ required: "Date of birth is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type={isEditing ? "date" : "text"}
                              min={minDate.toISOString().slice(0, 10)}
                              max={maxDate.toISOString().slice(0, 10)}
                              readOnly={!isEditing}
                            />
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
                                {field.value.map((lang, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="cursor-pointer"
                                  >
                                    {lang}
                                    <button
                                      type="button"
                                      className="ml-2 text-xs"
                                      onClick={() => {
                                        const newLanguages = field.value.filter(
                                          (_, i) => i !== index
                                        );
                                        field.onChange(newLanguages);
                                      }}
                                    >
                                      ×
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {field.value.length > 0 ? (
                                field.value.map((lang, index) => (
                                  <Badge key={index} variant="secondary">
                                    {lang}
                                  </Badge>
                                ))
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
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>
                Upload your certificates and documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploadField
                  label="Resume"
                  currentFileUrl={profile?.resume}
                  onFileSelect={handleFileSelect("resume")}
                  accept=".pdf,.doc,.docx"
                  isEditing={isEditing}
                />

                <FileUploadField
                  label="Tertiary Certificate"
                  currentFileUrl={profile?.tertiary_cert}
                  onFileSelect={handleFileSelect("tertiary_cert")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  isEditing={isEditing}
                />

                <FileUploadField
                  label="Transcript"
                  currentFileUrl={profile?.transcript}
                  onFileSelect={handleFileSelect("transcript")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  isEditing={isEditing}
                />

                <FileUploadField
                  label="WASSCE Certificate"
                  currentFileUrl={profile?.wassce_cert}
                  onFileSelect={handleFileSelect("wassce_cert")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  isEditing={isEditing}
                />

                <FileUploadField
                  label="BECE Certificate"
                  currentFileUrl={profile?.bece_cert}
                  onFileSelect={handleFileSelect("bece_cert")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  isEditing={isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
