import { handleApiError } from "./error-utils"

/**
 * Makes a fetch request with consistent error handling and authentication
 */
export async function fetchWithAuth<T>(url: string, options: RequestInit = {}): Promise<T> {
  // Get auth token if available
  let authToken = null

  if (typeof window !== "undefined") {
    // Try to get token from Supabase storage
    const supabaseToken = localStorage.getItem("supabase.auth.token")
    if (supabaseToken) {
      try {
        const parsed = JSON.parse(supabaseToken)
        authToken = parsed.access_token || parsed.token
      } catch (e) {
        console.error("Error parsing auth token:", e)
      }
    }

    // Fallback to other storage methods
    if (!authToken) {
      authToken =
        localStorage.getItem("authToken") ||
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1]
    }
  }

  // Prepare headers
  const headers = new Headers(options.headers || {})

  // Add auth token if available
  if (authToken) {
    headers.set("Authorization", `Bearer ${authToken}`)
  }

  // Add content type if not present and method is POST/PUT
  if (
    (options.method === "POST" || options.method === "PUT") &&
    !headers.has("Content-Type") &&
    !(options.body instanceof FormData) // Don't set for FormData
  ) {
    headers.set("Content-Type", "application/json")
  }

  // Make the request
  const response = await fetch(url, {
    ...options,
    headers,
  })

  // Handle errors
  if (!response.ok) {
    await handleApiError(response)
  }

  // Parse JSON if the response has content
  if (response.status !== 204) {
    return (await response.json()) as T
  }

  return {} as T
}

/**
 * Safely parses JSON with error handling
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch (e) {
    console.error("Error parsing JSON:", e)
    return fallback
  }
}

