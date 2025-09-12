import { getBaseUrl } from './utils';
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const API_BASE_URL = getBaseUrl();

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  data?: any
  includeCredentials?: boolean
  token?: string 
};

export async function apiClient<T>(
  url: string,
  { method = "GET", data, includeCredentials = false, token }: RequestOptions = {},
): Promise<T> {
  const headers: HeadersInit = {};
  headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const fetchOptions: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };
  if (includeCredentials) {
    fetchOptions.credentials = "include";
  }
  // Always prepend API_BASE_URL to the url
  const res = await fetch(`${API_BASE_URL}${url}`, fetchOptions);
  if (!res.ok) {
    let errorMessage = "Request failed";
    try {
      const errData = await res.json();
      errorMessage = errData.detail || errData.message || errorMessage;
    } catch {}
    console.log("API Error:", errorMessage);
    throw new Error(errorMessage);
  }
  const responseData = await res.json();
  return responseData;
}

export async function apiFormClient<T>(
  url: string,
  { method = "POST", data, includeCredentials = false, token }: RequestOptions = {},
): Promise<T> {
  const headers: HeadersInit = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const fetchOptions: RequestInit = {
    method,
    headers,
    body: data,
  };
  if (includeCredentials) {
    fetchOptions.credentials = "include";
  }
  // Always prepend API_BASE_URL to the url
  const res = await fetch(`${API_BASE_URL}${url}`, fetchOptions);
  if (!res.ok) {
    let errorMessage = "Request failed";
    try {
      const errData = await res.json();
      errorMessage = errData.detail || errData.message || errorMessage;
    } catch {}
    console.log("API Error:", errorMessage);
    throw new Error(errorMessage);
  }
  const responseData = await res.json();
  return responseData;
}


export const fetchApiClient = async <T>({
  url,
  body,
  method = "POST",
  revalidateTag,
  contentType = "application/json",
  noCache,
}: {
  url: string;
  body?: BodyInit;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  revalidateTag?: string;
  contentType?: string;
  noCache?: boolean;
}): Promise<T> => {
  const session = await getServerSession(authOptions);
  try {
    const res = await fetch(`${API_BASE_URL}/${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": contentType,
      },
      body:
        method === "POST" || method === "PUT" || method === "PATCH"
          ? body ?? undefined
          : undefined,
      next: revalidateTag ? { tags: [revalidateTag] } : undefined,
      cache: noCache ? "no-cache" : "default",
    });
    if (!res.ok) {
      let errorMessage = "An error occurred";
      let errorData;
      try {
        errorData = await res.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch {
        errorData = await res.text();
        errorMessage = errorData || errorMessage;
      }
      throw new Error(errorMessage);
    }
    return await res.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("An unexpected error occurred");
  }
};

export const fetchApiClientWithFormData = async <T>({
  url,
  body,
  method = "POST",
  revalidateTag,
}: {
  url: string;
  body?: FormData;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  revalidateTag?: string;
}): Promise<T> => {
  const session = await getServerSession(authOptions);
  try {
    const res = await fetch(`${API_BASE_URL}/${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: body ?? undefined,
      next: revalidateTag ? { tags: [revalidateTag] } : undefined,
    });
    if (!res.ok) {
      let errorMessage = "An error occurred";
      let errorData;
      try {
        const responseText = await res.text();
        errorData = JSON.parse(responseText);
        errorMessage = errorData.detail || errorMessage;
      } catch (err) {
        errorMessage = "An error occurred while processing the request";
      }
      throw new Error(errorMessage);
    }
    try {
      return (await res.json()) as T;
    } catch {
      return (await res.text()) as unknown as T;
    }
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("An unexpected error occurred");
  }
};
