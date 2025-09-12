// "use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useSession } from "next-auth/react";
// import {
//   useUserData,
//   useUpdateProfile,
//   useUpdateProfileFiles,
// } from "@/hooks/use-user-profile";
// import ProfileHeader from "./ProfileHeader";
// import ProfileTabs from "./ProfileTabs";
// import type { UserProfileJsonUpdate, UserProfileFilesUpdate } from "@/types/user";

// type ProfileFormData = UserProfileJsonUpdate & {
//   files: Partial<UserProfileFilesUpdate>;
// };

// export default function UserProfileClient() {
//   const { data: session, update: updateSession } = useSession();
//   const { user, sessionUser, isLoading, error, isFirstTimeUser } = useUserData();
//   const updateProfileMutation = useUpdateProfile();
//   const updateFilesMutation = useUpdateProfileFiles();

//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState<string>(isFirstTimeUser ? "settings" : "overview");

//   const getDefaultValues = (): ProfileFormData => {
//     const profile = sessionUser?.profile || user?.profile;
//     const phone = sessionUser?.phone || user?.phone || "";

//     // format phone like before if needed
//     let formattedPhone = phone;
//     if (formattedPhone.startsWith("+233")) {
//       formattedPhone = "0" + formattedPhone.slice(4);
//     } else if (formattedPhone.startsWith("233")) {
//       formattedPhone = "0" + formattedPhone.slice(3);
//     }

//     return {
//       firstname: profile?.firstname || "",
//       lastname: profile?.lastname || "",
//       phone: formattedPhone || "",
//       gps_address: profile?.gps_address || "",
//       portfolio_url: profile?.portfolio_url || "",
//       notice_period: profile?.notice_period || "",
//       languages: Array.isArray(profile?.languages) ? profile.languages : [],
//       gender: profile?.gender || "",
//       date_of_birth: profile?.date_of_birth || "",
//       files: {
//         picture: null,
//         resume: null,
//         tertiary_cert: null,
//         transcript: null,
//         wassce_cert: null,
//         bece_cert: null,
//       },
//     };
//   };

//   const form = useForm<ProfileFormData>({
//     defaultValues: getDefaultValues(),
//     mode: "onChange",
//   });

//   // keep form in sync when user/sessionUser changes
//   useEffect(() => {
//     form.reset(getDefaultValues());
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user, sessionUser]);

//   const handleEdit = () => {
//     setIsEditing(true);
//     setActiveTab("settings");
//     form.reset(getDefaultValues());
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     form.reset(getDefaultValues());
//   };

//   const handleSubmit = async (data: ProfileFormData) => {
//     try {
//       const { files, ...profileData } = data;

//       // 1) update JSON profile
//       await updateProfileMutation.mutateAsync(profileData);

//       // 2) upload any provided files (Partial)
//       if (files && Object.values(files).some((f) => f instanceof File)) {
//         await updateFilesMutation.mutateAsync(files);
//       }

//       // 3) refresh session so UI picks up latest profile/token changes
//       await updateSession();

//       // 4) reset form & UI
//       form.reset(getDefaultValues());
//       setIsEditing(false);
//       setActiveTab("overview");
//     } catch (err) {
//       console.error("Profile update error:", err);
//       throw err;
//     }
//   };

//   const handleOverviewPhotoUpload = async (file: File) => {
//     try {
//       await updateFilesMutation.mutateAsync({ picture: file });
//       await updateSession();
//     } catch (err) {
//       console.error("Photo upload failed:", err);
//     }
//   };

//   const currentUser = sessionUser || user;
//   const profile = sessionUser?.profile || user?.profile;
//   const fullName = `${profile?.firstname || ""} ${profile?.lastname || ""}`.trim() || "User";
//   const displayPhone = currentUser?.phone || "Not provided";
//   const displayEmail = currentUser?.email || "Not provided";
//   const displayLocation = profile?.gps_address || "Not provided";

//   const isUpdating = updateProfileMutation.isPending || updateFilesMutation.isPending;

//   // Render client UI (ProfileHeader + ProfileTabs are client components)
//   return (
//     <div className="space-y-6">
//       {/* Header (edit button lives in header) */}
//       <ProfileHeader onEdit={handleEdit} />

//       <ProfileTabs
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         profile={profile}
//         fullName={fullName}
//         displayEmail={displayEmail}
//         displayPhone={displayPhone}
//         displayLocation={displayLocation}
//         handlePhotoUpload={handleOverviewPhotoUpload}
//         isEditing={isEditing}
//         setIsEditing={setIsEditing}
//         handleSubmit={handleSubmit}
//         handleCancel={handleCancel}
//         form={form}
//         isUpdating={isUpdating}
//       />
//     </div>
//   );
// }
