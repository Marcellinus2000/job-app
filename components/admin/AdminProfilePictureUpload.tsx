"use client";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useUpdateProfileFiles } from "@/hooks/use-user-profile";
import { useSession } from "next-auth/react";

export default function AdminProfilePictureUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateFilesMutation = useUpdateProfileFiles();
  const { update: updateSession } = useSession();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await updateFilesMutation.mutateAsync({ picture: file }); // ✅ using Partial type
      await updateSession();
    } catch (err) {
      console.error("Photo upload failed:", err);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button size="sm" onClick={() => fileInputRef.current?.click()}>
        <Upload className="mr-2 h-4 w-4" />
        Update Photo
      </Button>
    </>
  );
}
