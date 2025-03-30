/**
 * Centralized error handling utilities
 */

type ErrorWithMessage = {
  message: string
}

/**
 * Type guard for error with message
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  )
}

/**
 * Convert unknown error to error message
 */
export function toErrorMessage(error: unknown): string {
  if (isErrorWithMessage(error)) return error.message
  return String(error)
}

/**
 * Log error with consistent format
 */
export function logError(context: string, error: unknown): void {
  const message = toErrorMessage(error)
  console.error(`[${context}] Error:`, message)

  // In production, you might want to send to an error tracking service
  if (process.env.NODE_ENV === "production") {
    // Example: sendToErrorTracking(context, message);
  }
}

/**
 * Handle API errors consistently
 */
export async function handleApiError(response: Response): Promise<string> {
  let errorMessage = `API Error: ${response.status} ${response.statusText}`

  try {
    // Try to get more detailed error from response body
    const errorData = await response.json()
    if (errorData.message) {
      errorMessage = errorData.message
    } else if (errorData.error) {
      errorMessage = errorData.error
    }
  } catch (e) {
    // If we can't parse the JSON, just use the status text
  }

  return errorMessage
}

