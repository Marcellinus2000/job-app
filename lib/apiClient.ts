// lib/apiClient.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL as string

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  data?: any
  isForm?: boolean
  includeCredentials?: boolean
}

export async function apiClient<T>(
  url: string,
  { method = "GET", data, isForm = false, includeCredentials = false }: RequestOptions = {},
): Promise<T> {
  const headers: HeadersInit = {}

  if (!isForm) headers["Content-Type"] = "application/json"

  const fetchOptions: RequestInit = {
    method,
    headers,
    body: data ? (isForm ? data : JSON.stringify(data)) : undefined,
  }

  if (includeCredentials) {
    fetchOptions.credentials = "include"
  }

  const res = await fetch(`${API_URL}${url}`, fetchOptions)

  if (!res.ok) {
    let errorMessage = "Request failed"
    try {
      const errData = await res.json()
      errorMessage = errData.detail || errData.message || errorMessage
    } catch {}
    console.log("[v0] API Error:", errorMessage)
    throw new Error(errorMessage)
  }

  const responseData = await res.json()
  return responseData
}

export function getRequestHandler<T>(url: string) {
  return apiClient<T>(url, { method: "GET" })
}

export function postRequestHandler<T>(url: string, data: any, isForm = false) {
  return apiClient<T>(url, { method: "POST", data, isForm })
}

export function putRequestHandler<T>(url: string, data: any, isForm = false) {
  return apiClient<T>(url, { method: "PUT", data, isForm })
}

export function patchRequestHandler<T>(url: string, data: any) {
  return apiClient<T>(url, { method: "PATCH", data })
}

export function deleteRequestHandler<T>(url: string) {
  return apiClient<T>(url, { method: "DELETE" })
}
