"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, User } from "lucide-react"

interface ProfilePictureUploadProps {
  currentPictureUrl?: string
  onFileSelect: (file: File | null) => void
  isEditing: boolean
}

export function ProfilePictureUpload({ currentPictureUrl, onFileSelect, isEditing }: ProfilePictureUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onFileSelect(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const displayUrl = previewUrl || currentPictureUrl

  if (!isEditing) {
    return (
      <Avatar className="h-24 w-24">
        <AvatarImage src={displayUrl || "/placeholder.svg"} alt="Profile Picture" />
        <AvatarFallback className="text-lg">
          <User className="h-12 w-12" />
        </AvatarFallback>
      </Avatar>
    )
  }

  return (
    <div className="space-y-4">
      <Label className="text-primary font-semibold text-lg">
        Profile Picture
        <span className="text-muted-foreground font-normal ml-2">(Optional)</span>
      </Label>
      <p className="text-sm text-muted-foreground">
        This image will be shown publicly as your profile picture, it will help recruiters recognize you!
      </p>
      <div className="flex items-center space-x-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={displayUrl || "/placeholder.svg"} alt="Profile Picture" />
          <AvatarFallback className="text-lg">
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
        <div>
          <Button type="button" variant="outline" onClick={handleButtonClick}>
            <Upload className="mr-2 h-4 w-4" />
            {currentPictureUrl ? "Change Picture" : "Upload Picture"}
          </Button>
          <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>
      </div>
    </div>
  )
}
