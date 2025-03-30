// Helper functions for authentication

// Check if running in browser
export const isBrowser = typeof window !== "undefined"

// Get auth token from localStorage or cookie
export function getAuthToken(): string | null {
  if (!isBrowser) return null

  // Try localStorage first
  const localToken = localStorage.getItem("authToken")
  if (localToken) return localToken

  // Try supabase token
  const supabaseToken = localStorage.getItem("supabase.auth.token")
  if (supabaseToken) {
    try {
      const parsed = JSON.parse(supabaseToken)
      return parsed?.currentSession?.access_token || null
    } catch (e) {
      console.error("Error parsing supabase token:", e)
    }
  }

  // Try cookies
  const cookies = document.cookie.split(";")
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=")
    if (name === "authToken") return value
    if (name === "sb-access-token") return value
  }

  return null
}

// Set auth token in both localStorage and cookie
export function setAuthToken(token: string): void {
  if (!isBrowser) return

  // Set in localStorage
  localStorage.setItem("authToken", token)

  // Set in cookie (expires in 7 days)
  const expires = new Date()
  expires.setDate(expires.getDate() + 7)
  document.cookie = `authToken=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

// Clear all auth tokens
export function clearAuthTokens(): void {
  if (!isBrowser) return

  // Clear localStorage
  localStorage.removeItem("authToken")
  localStorage.removeItem("supabase.auth.token")

  // Clear cookies
  document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  document.cookie = "sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  document.cookie = "sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (!isBrowser) return false
  return !!getAuthToken()
}

// Development mode helpers
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development"
}

// Set up development mode authentication
export function setupDevAuth(): void {
  if (isDevelopment() && isBrowser) {
    setAuthToken("dev-auth-token")
    console.log("Development authentication enabled")
  }
}

