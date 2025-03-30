/**
 * API client for making requests to the backend
 */

import { logError, handleApiError } from "./error-handling"

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Record<string, string>
  body?: any
  cache?: RequestCache
}

type ApiResponse<T> = {
  data: T | null
  error: string | null
  status: number
}

/**
 * Make an API request with consistent error handling
 */
export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const { method = "GET", headers = {}, body, cache } = options

  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    cache,
  }

  if (body) {
    requestOptions.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(endpoint, requestOptions)

    if (!response.ok) {
      const errorMessage = await handleApiError(response)
      return {
        data: null,
        error: errorMessage,
        status: response.status,
      }
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {
        data: null,
        error: null,
        status: 204,
      }
    }

    const data = await response.json()

    return {
      data,
      error: null,
      status: response.status,
    }
  } catch (error) {
    logError("apiRequest", error)
    return {
      data: null,
      error: "Network error. Please check your connection and try again.",
      status: 0,
    }
  }
}

/**
 * GET request helper
 */
export function get<T>(endpoint: string, options: Omit<RequestOptions, "method" | "body"> = {}) {
  return apiRequest<T>(endpoint, { ...options, method: "GET" })
}

/**
 * POST request helper
 */
export function post<T>(endpoint: string, data: any, options: Omit<RequestOptions, "method"> = {}) {
  return apiRequest<T>(endpoint, { ...options, method: "POST", body: data })
}

/**
 * PUT request helper
 */
export function put<T>(endpoint: string, data: any, options: Omit<RequestOptions, "method"> = {}) {
  return apiRequest<T>(endpoint, { ...options, method: "PUT", body: data })
}

/**
 * DELETE request helper
 */
export function del<T>(endpoint: string, options: Omit<RequestOptions, "method"> = {}) {
  return apiRequest<T>(endpoint, { ...options, method: "DELETE" })
}

/**
 * PATCH request helper
 */
export function patch<T>(endpoint: string, data: any, options: Omit<RequestOptions, "method"> = {}) {
  return apiRequest<T>(endpoint, { ...options, method: "PATCH", body: data })
}

