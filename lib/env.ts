// Define environment variables with types
interface EnvVariables {
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  NEXT_PUBLIC_APP_URL: string
  NEXT_PUBLIC_API_URL: string
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY?: string
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?: string
  NODE_ENV: "development" | "production" | "test"
}

// Get environment variables with validation
export function getEnv(): EnvVariables {
  // Required variables
  const requiredVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]

  // Check for missing required variables
  const missingVars = requiredVars.filter((name) => !process.env[name])

  // Throw error if any required variables are missing
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`)
  }

  return {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "/api",
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NODE_ENV: (process.env.NODE_ENV as "development" | "production" | "test") || "development",
  }
}

// Check if we're in a specific environment
export const isDev = process.env.NODE_ENV === "development"
export const isProd = process.env.NODE_ENV === "production"
export const isTest = process.env.NODE_ENV === "test"

// Get a specific environment variable with a fallback
export function getEnvVar<T>(name: keyof EnvVariables, fallback?: T): string | T {
  const env = getEnv()
  return (env[name] as string) || (fallback as T)
}

