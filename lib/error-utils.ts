// Utility functions for consistent error handling

/**
 * Formats an error message for user display
 */
export function formatErrorMessage(error: any): string {
  if (!error) return "An unknown error occurred"

  // If it's already a string, return it
  if (typeof error === "string") return error

  // If it's an Error object with a message
  if (error.message) return error.message

  // If it's a Supabase error
  if (error.error_description) return error.error_description

  // If it's a response object
  if (error.statusText) return `${error.status}: ${error.statusText}`

  // Fallback
  return "An unexpected error occurred"
}

/**
 * Logs errors consistently
 */
export function logError(context: string, error: any): void {
  console.error(`Error in ${context}:`, error)

  // In production, you might want to send to an error tracking service
  if (process.env.NODE_ENV === "production") {
    // Example: sendToErrorTracking(context, error);
  }
}

/**
 * Handles API errors consistently
 */
export async function handleApiError(response: Response): Promise<never> {
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

  throw new Error(errorMessage)
}

