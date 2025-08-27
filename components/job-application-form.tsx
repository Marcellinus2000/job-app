"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, FileText, GraduationCap, Award } from "lucide-react"
import type { JobApplicationFormData } from "@/lib/types"

interface JobApplicationFormProps {
  jobId: number
  companyId: number
  onSubmit: (data: JobApplicationFormData) => void
}

export default function JobApplicationForm({ jobId, companyId, onSubmit }: JobApplicationFormProps) {
  const [formData, setFormData] = useState<Omit<JobApplicationFormData, "user_id">>({
    job_id: jobId,
    company_id: companyId,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gps_address: "",
    portfolio_url: "",
    educational_level: "",
    languages: [],
    resume: null,
    tertiary_cert: null,
    transcript: null,
    wassce_cert: null,
    bece_cert: null,
  })

  const [newLanguage, setNewLanguage] = useState("")

  const handleFileChange = (
    field: keyof Pick<JobApplicationFormData, "resume" | "tertiary_cert" | "transcript" | "wassce_cert" | "bece_cert">,
    file: File | null,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData((prev) => ({ ...prev, languages: [...prev.languages, newLanguage.trim()] }))
      setNewLanguage("")
    }
  }

  const removeLanguage = (languageToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang !== languageToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add user_id from context/auth when implementing
    const applicationData: JobApplicationFormData = {
      ...formData,
      user_id: 1, // TODO: Get from auth context
    }
    onSubmit(applicationData)
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Job Application</CardTitle>
        <CardDescription>Please fill out all required information to submit your application</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name *</Label>
                <Input
                  id="firstname"
                  value={formData.firstname}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstname: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name *</Label>
                <Input
                  id="lastname"
                  value={formData.lastname}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastname: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpsAddress">Address *</Label>
              <Textarea
                id="gpsAddress"
                placeholder="Your full address"
                value={formData.gps_address}
                onChange={(e) => setFormData((prev) => ({ ...prev, gps_address: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioUrl">Portfolio URL</Label>
              <Input
                id="portfolioUrl"
                type="url"
                placeholder="https://your-portfolio.com"
                value={formData.portfolio_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, portfolio_url: e.target.value }))}
              />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Education</h3>
            <div className="space-y-2">
              <Label htmlFor="educationalLevel">Educational Level *</Label>
              <Select
                value={formData.educational_level}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, educational_level: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your highest education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bece">BECE</SelectItem>
                  <SelectItem value="wassce">WASSCE/SSCE</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="master">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Languages</h3>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Add a language you speak"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
              />
              <Button type="button" onClick={addLanguage}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.languages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.languages.map((language) => (
                  <Badge key={language} variant="secondary" className="flex items-center gap-1">
                    {language}
                    <button
                      type="button"
                      onClick={() => removeLanguage(language)}
                      className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Document Uploads */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Documents</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Resume */}
              <div className="space-y-2">
                <Label htmlFor="resume">Resume/CV *</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                  <div className="flex flex-col items-center space-y-2">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center">
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange("resume", e.target.files?.[0] || null)}
                        className="hidden"
                        required
                      />
                      <Label htmlFor="resume" className="cursor-pointer text-primary hover:underline">
                        Upload Resume
                      </Label>
                      <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  </div>
                  {formData.resume && (
                    <p className="text-sm text-center mt-2 text-green-600">✓ {formData.resume.name}</p>
                  )}
                </div>
              </div>

              {/* Tertiary Certificate */}
              <div className="space-y-2">
                <Label htmlFor="tertiaryCert">Tertiary Certificate</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                  <div className="flex flex-col items-center space-y-2">
                    <GraduationCap className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center">
                      <Input
                        id="tertiaryCert"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange("tertiary_cert", e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <Label htmlFor="tertiaryCert" className="cursor-pointer text-primary hover:underline">
                        Upload Certificate
                      </Label>
                      <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                    </div>
                  </div>
                  {formData.tertiary_cert && (
                    <p className="text-sm text-center mt-2 text-green-600">✓ {formData.tertiary_cert.name}</p>
                  )}
                </div>
              </div>

              {/* Transcript */}
              <div className="space-y-2">
                <Label htmlFor="transcript">Academic Transcript</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                  <div className="flex flex-col items-center space-y-2">
                    <Award className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center">
                      <Input
                        id="transcript"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange("transcript", e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <Label htmlFor="transcript" className="cursor-pointer text-primary hover:underline">
                        Upload Transcript
                      </Label>
                      <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                    </div>
                  </div>
                  {formData.transcript && (
                    <p className="text-sm text-center mt-2 text-green-600">✓ {formData.transcript.name}</p>
                  )}
                </div>
              </div>

              {/* WASSCE Certificate */}
              <div className="space-y-2">
                <Label htmlFor="wassceCert">WASSCE Certificate</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                  <div className="flex flex-col items-center space-y-2">
                    <Award className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center">
                      <Input
                        id="wassceCert"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange("wassce_cert", e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <Label htmlFor="wassceCert" className="cursor-pointer text-primary hover:underline">
                        Upload WASSCE Cert
                      </Label>
                      <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                    </div>
                  </div>
                  {formData.wassce_cert && (
                    <p className="text-sm text-center mt-2 text-green-600">✓ {formData.wassce_cert.name}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
