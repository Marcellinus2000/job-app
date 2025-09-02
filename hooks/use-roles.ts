import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/apiClient"
import { Role } from "@/types/role"

export function useRoles() {
  return useQuery<Role[], Error>({
    queryKey: ["roles"],
    queryFn: () => apiClient<Role[]>("/roles"),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}
