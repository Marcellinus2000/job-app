"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { apiClient, apiFormClient } from "@/lib/apiClient"
import type { User, UserProfileJsonUpdate, UserProfileFilesUpdate } from "@/types/user"
import { useToast } from "@/hooks/use-toast"

/** Get user profile data */
export function useUserProfile() {
  const { data: session } = useSession()

  return useQuery<User>({
    queryKey: ["user-profile", session?.user?.id],
    queryFn: () =>
      apiClient<User>(`/users/${session?.user?.id}`, {
        token: session?.accessToken,
      }),
    enabled: !!session?.user?.id && !!session?.accessToken,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  })
}

export function useUserData() {
  const { data: session } = useSession()
  const profileQuery = useUserProfile()

  // Return session data for basic info, API data for complete profile
  return {
    user: profileQuery.data,
    sessionUser: session?.user,
    isLoading: profileQuery.isLoading,
    error: profileQuery.error,
    isFirstTimeUser: session?.user && !session.user.verified,
  }
}

/** Update user profile JSON data */
export function useUpdateProfile() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: UserProfileJsonUpdate) => {
      const formattedData = { ...data }
      if (formattedData.date_of_birth) {
        const date = new Date(formattedData.date_of_birth)
        if (!isNaN(date.getTime())) {
          formattedData.date_of_birth = date.toISOString().slice(0, 10)
        }
      }

      return apiClient(`/users/${session?.user?.id}`, {
        method: "PUT",
        data: formattedData,
        token: session?.accessToken,
      })
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user-profile"] })
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Profile Update Failed",
        description: error?.message || "Failed to update profile",
        variant: "destructive",
      })
    },
  })
}

/** Update user profile files */
export function useUpdateProfileFiles() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (files: Partial<UserProfileFilesUpdate>) => {
      const formData = new FormData()
      Object.entries(files).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value)
        }
      })

      if (Array.from(formData.keys()).length === 0) {
        return Promise.resolve()
      }

      return apiFormClient(`/users/${session?.user?.id}/files`, {
        method: "PUT",
        data: formData,
        token: session?.accessToken,
      })
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user-profile"] })
      toast({
        title: "Files Updated",
        description: "Your files have been successfully uploaded.",
      })
    },
    onError: (error: any) => {
      toast({
        title: "File Upload Failed",
        description: error?.message || "Failed to upload files",
        variant: "destructive",
      })
    },
  })
}
