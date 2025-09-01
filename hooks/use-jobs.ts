import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRequestHandler,
  postRequestHandler,
  putRequestHandler,
  deleteRequestHandler,
} from "@/lib/apiClient";
import { Job, SingleJobResponse, AppliedJobResponse } from "@/types/job";

/* ---------------------- USER HOOKS ---------------------- */

/** Get all published jobs (for users) */
export function usePublishedJobs() {
  return useQuery<Job[]>({
    queryKey: ["jobs", "published"],
    queryFn: () => getRequestHandler<Job[]>("/jobs/published"),
    staleTime: 1000 * 60, // cache for 1 min
  });
}

/** Get a single job by ID */
export function useSingleJob(jobId: number) {
  return useQuery<SingleJobResponse>({
    queryKey: ["jobs", jobId],
    queryFn: () => getRequestHandler<SingleJobResponse>(`/jobs/${jobId}`),
    enabled: !!jobId,
  });
}

/** Get jobs a user has applied for */
export function useAppliedJobs() {
  return useQuery<AppliedJobResponse[]>({
    queryKey: ["jobs", "applied"],
    queryFn: () => getRequestHandler<AppliedJobResponse[]>("/jobs/applied"),
  });
}

/** Apply for a job */
export function useApplyForJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ jobId, formData }: { jobId: number; formData: FormData }) =>
      postRequestHandler(`/jobs/${jobId}/apply`, formData, true),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs", "applied"] });
    },
  });
}

/* ---------------------- ADMIN HOOKS ---------------------- */

/** Get all jobs (admin) */
export function useJobsAdmin() {
  return useQuery<Job[]>({
    queryKey: ["jobs", "admin"],
    queryFn: () => getRequestHandler<Job[]>("/jobs"),
  });
}

/** Create a new job (admin) */
export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Job>) => postRequestHandler<Job>("/jobs", data),
    onSuccess: (newJob) => {
      // Optimistically update cache
      qc.setQueryData<Job[]>(["jobs", "admin"], (old = []) => [newJob, ...old]);
    },
  });
}

/** Update a job (admin) */
export function useUpdateJob(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Job>) =>
      putRequestHandler<Job>(`/jobs/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs", "admin"] });
      qc.invalidateQueries({ queryKey: ["jobs", id] }); // refresh job detail
    },
  });
}

/** Delete a job (admin) */
export function useDeleteJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRequestHandler(`/jobs/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs", "admin"] });
    },
  });
}
