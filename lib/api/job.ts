import { Job, SingleJobResponse } from "@/types/job"
import { getRequestHandler, postRequestHandler } from "@/lib/apiClient"

export const fetchJobs = () =>
  getRequestHandler<Job[]>("/jobs/published")

export const fetchJobById = (id: number) =>
  getRequestHandler<SingleJobResponse>(`/jobs/${id}`)

export const applyForJob = (jobId: number, formData: FormData) =>
  postRequestHandler(`/jobs/${jobId}/apply`, formData, true)