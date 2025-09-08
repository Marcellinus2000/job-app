"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, ExternalLink } from "lucide-react"

interface FileUploadFieldProps {
  label: string
  currentFileUrl?: string
  onFileSelect: (file: File | null) => void
  accept: string
  isEditing: boolean
}

export function FileUploadField({ label, currentFileUrl, onFileSelect, accept, isEditing }: FileUploadFieldProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileName = (url: string) => {
    return url ? url.split("/").pop()?.replace(/%23/g, "") : null
  }

  const openFile = (url: string) => {
    window.open(url, "_blank")
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setSelectedFile(file || null)
    onFileSelect(file || null)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  if (!isEditing) {
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex items-center space-x-2">
          <Input
            value={currentFileUrl ? getFileName(currentFileUrl) || "File available" : "Not provided"}
            readOnly
            className={currentFileUrl ? "cursor-pointer" : ""}
            onClick={currentFileUrl ? () => openFile(currentFileUrl) : undefined}
          />
          {currentFileUrl && (
            <Button type="button" variant="ghost" size="sm" onClick={() => openFile(currentFileUrl)}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {currentFileUrl && (
        <div className="flex items-center space-x-2 mb-2">
          <Input
            value={getFileName(currentFileUrl) || "Current file"}
            readOnly
            className="cursor-pointer"
            onClick={() => openFile(currentFileUrl)}
          />
          <Button type="button" variant="ghost" size="sm" onClick={() => openFile(currentFileUrl)}>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <Input
          value={selectedFile?.name || ""}
          readOnly
          placeholder={`Upload/Replace ${label}`}
          className="cursor-pointer"
          onClick={handleButtonClick}
        />
        <Button type="button" variant="outline" onClick={handleButtonClick}>
          <Upload className="h-4 w-4" />
        </Button>
        <Input ref={fileInputRef} type="file" accept={accept} onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  )
}
