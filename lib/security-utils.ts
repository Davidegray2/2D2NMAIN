/**
 * Security utility functions
 */

/**
 * Sanitizes user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

/**
 * Generates a CSRF token for forms
 */
export function generateCsrfToken(): string {
  if (typeof window === "undefined") return ""

  // Generate a random string
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  // Store in localStorage for validation
  localStorage.setItem("csrfToken", token)

  return token
}

/**
 * Validates a CSRF token
 */
export function validateCsrfToken(token: string): boolean {
  if (typeof window === "undefined") return false

  const storedToken = localStorage.getItem("csrfToken")

  // Clear the token after validation (one-time use)
  localStorage.removeItem("csrfToken")

  return token === storedToken
}

/**
 * Checks if a password meets security requirements
 */
export function isPasswordSecure(password: string): {
  isValid: boolean
  message: string
} {
  if (password.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long",
    }
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter",
    }
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter",
    }
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one number",
    }
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one special character",
    }
  }

  return { isValid: true, message: "Password is secure" }
}

/**
 * Rate limiting utility to prevent brute force attacks
 */
export class RateLimiter {
  private attempts: Record<string, { count: number; timestamp: number }> = {}
  private maxAttempts: number
  private timeWindowMs: number

  constructor(maxAttempts = 5, timeWindowMs = 60000) {
    this.maxAttempts = maxAttempts
    this.timeWindowMs = timeWindowMs
  }

  isRateLimited(key: string): boolean {
    const now = Date.now()

    // Clean up expired entries
    this.cleanup(now)

    // Get or create entry
    if (!this.attempts[key]) {
      this.attempts[key] = { count: 0, timestamp: now }
    }

    // Check if rate limited
    const entry = this.attempts[key]

    // If the entry is within the time window
    if (now - entry.timestamp < this.timeWindowMs) {
      // Increment count
      entry.count++

      // Check if over limit
      return entry.count > this.maxAttempts
    } else {
      // Reset if outside time window
      entry.count = 1
      entry.timestamp = now
      return false
    }
  }

  private cleanup(now: number) {
    for (const key in this.attempts) {
      if (now - this.attempts[key].timestamp > this.timeWindowMs) {
        delete this.attempts[key]
      }
    }
  }
}

