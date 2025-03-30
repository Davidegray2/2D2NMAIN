import { createClient as supabaseCreateClient } from "@supabase/supabase-js"
import { logError } from "./error-utils"

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only log in development
if (process.env.NODE_ENV !== "production") {
  console.log("Supabase initialization:", {
    urlAvailable: !!supabaseUrl,
    keyAvailable: !!supabaseAnonKey,
  })
}

// Export the createClient function for other modules that need it
export const createClient = supabaseCreateClient

// Create and export the Supabase client instance
let supabase: ReturnType<typeof supabaseCreateClient> | null = null

if (typeof window !== "undefined" && supabaseUrl && supabaseAnonKey) {
  try {
    supabase = supabaseCreateClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        storageKey: "supabase.auth.token",
        autoRefreshToken: true,
      },
    })
    if (process.env.NODE_ENV !== "production") {
      console.log("Supabase client initialized successfully")
    }
  } catch (error) {
    logError("Supabase client initialization", error)
    // Create a mock client as fallback
    supabase = null
  }
} else {
  logError("Supabase initialization", "Supabase URL and Anon Key are required. Please set the environment variables.")
  // Create a mock client or placeholder to prevent runtime errors
  supabase = null
}

// If supabase is null, create a mock client
if (!supabase) {
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
      updateUser: async () => ({ data: { user: null }, error: null }),
      signInWithOAuth: async () => ({ data: null, error: null }),
    },
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          data: null,
          error: null,
        }),
      }),
      insert: async () => ({ data: null, error: null }),
      update: async () => ({ data: null, error: null }),
      delete: async () => ({ data: null, error: null }),
    }),
  } as any
}

export { supabase }

// Helper function to get the current session
export async function getCurrentSession() {
  try {
    if (!supabase) {
      logError("getCurrentSession", "Supabase client not initialized")
      return null
    }

    const { data, error } = await supabase.auth.getSession()

    if (error) {
      logError("getCurrentSession", error)
      return null
    }

    return data.session
  } catch (error) {
    logError("getCurrentSession", error)
    return null
  }
}

// Helper function to get the current user
export async function getCurrentUser() {
  try {
    if (!supabase) {
      logError("getCurrentUser", "Supabase client not initialized")
      return null
    }

    // First check if we have a session
    const session = await getCurrentSession()
    if (!session) {
      // Return null without throwing an error if no session exists
      return null
    }

    const { data, error } = await supabase.auth.getUser()

    if (error) {
      logError("getCurrentUser", error)
      return null
    }

    return data.user
  } catch (error) {
    logError("getCurrentUser", error)
    return null
  }
}

// Enhanced function to completely clear the session
export async function clearSession() {
  if (!supabase) return

  try {
    if (process.env.NODE_ENV !== "production") {
      console.log("Starting session cleanup...")
    }

    // Sign out from Supabase
    const { error } = await supabase.auth.signOut({ scope: "global" })
    if (error) {
      logError("clearSession", error)
    } else if (process.env.NODE_ENV !== "production") {
      console.log("Supabase signOut successful")
    }

    // Clear all localStorage items related to auth
    if (typeof window !== "undefined") {
      // Clear Supabase specific items
      localStorage.removeItem("supabase.auth.token")
      localStorage.removeItem("supabase.auth.expires_at")
      localStorage.removeItem("supabase.auth.refresh_token")
      localStorage.removeItem("supabase.auth.provider_token")
      localStorage.removeItem("supabase.auth.provider_refresh_token")

      // Clear any other auth related items
      localStorage.removeItem("authToken")
      localStorage.removeItem("sb:token")
      localStorage.removeItem("sb-refresh-token")
      localStorage.removeItem("sb-access-token")

      // Get all keys and remove any that might be related to auth
      Object.keys(localStorage).forEach((key) => {
        if (key.includes("auth") || key.includes("supabase") || key.includes("sb-") || key.includes("token")) {
          localStorage.removeItem(key)
        }
      })

      // Clear cookies
      const cookies = document.cookie.split(";")
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i]
        const eqPos = cookie.indexOf("=")
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()

        // Clear all cookies by setting expiration in the past
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`

        // Also try with domain
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`
      }
    }

    // Create a new Supabase client to ensure no cached credentials
    if (supabaseUrl && supabaseAnonKey) {
      try {
        supabase = supabaseCreateClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            persistSession: true,
            storageKey: "supabase.auth.token",
            autoRefreshToken: false,
          },
        })
      } catch (error) {
        logError("clearSession", error)
      }
    }

    return true
  } catch (error) {
    logError("clearSession", error)
    return false
  }
}

