import { Job, SingleJobResponse } from "@/types/job"
import { apiClient, apiFormClient } from "@/lib/apiClient"

export const fetchJobs = () =>
  apiClient<Job[]>("/jobs/published")

export const fetchJobById = (id: number) =>
  apiClient<SingleJobResponse>(`/jobs/${id}`)

export const applyForJob = (jobId: number, formData: FormData) =>
  apiFormClient(`/jobs/${jobId}/apply`, { method: "POST", data: formData })