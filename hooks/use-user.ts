import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/apiClient"
import type { User } from "@/types/user"
import { useSession } from "next-auth/react";

export function getAllUsers() {

    const { data: session } = useSession();

    return useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => apiClient<User[]>("/users" , {token: session?.accessToken }),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}