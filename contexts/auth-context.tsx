"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase, getCurrentUser, getCurrentSession } from "@/lib/supabaseClient"
import { logError } from "@/lib/error-handling"

// Define proper types for auth context
interface User {
  id: string
  email?: string
  user_metadata?: Record<string, any>
  [key: string]: any
}

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  isAdmin: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithSocial: (provider: "google" | "facebook") => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        const session = await getCurrentSession()
        const currentUser = await getCurrentUser()

        // Only set authenticated if we have a valid session with a user
        setIsAuthenticated(!!(session && session.user))
        setUser(currentUser)

        // Check if user is admin
        let adminData = null
        if (currentUser) {
          const { data, error } = await supabase
            .from("user_roles")
            .select("*")
            .eq("user_id", currentUser.id)
            .eq("role", "admin")
            .single()

          adminData = data
          setIsAdmin(!!data)

          if (error && error.code !== "PGRST116") {
            logError("AuthProvider.checkAuth", error)
          }
        }

        console.log("Auth check result:", {
          hasSession: !!session,
          hasUser: !!currentUser,
          isAuthenticated: !!(session && session.user),
          isAdmin: !!adminData,
        })
      } catch (error) {
        logError("AuthProvider.checkAuth", error)
        setIsAuthenticated(false)
        setUser(null)
        setIsAdmin(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Set up auth state change listener
    if (supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("Auth state changed:", event)
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          setIsAuthenticated(true)
          try {
            const user = await getCurrentUser()
            setUser(user)

            // Check admin status on sign in
            if (user) {
              const { data } = await supabase
                .from("user_roles")
                .select("*")
                .eq("user_id", user.id)
                .eq("role", "admin")
                .single()

              setIsAdmin(!!data)
            }
          } catch (error) {
            logError("AuthProvider.onAuthStateChange", error)
          }
        } else if (event === "SIGNED_OUT") {
          setIsAuthenticated(false)
          setUser(null)
          setIsAdmin(false)
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    if (!supabase) {
      return { success: false, error: "Authentication service unavailable" }
    }

    try {
      setIsLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setIsLoading(false)
        return { success: false, error: error.message }
      }

      setIsAuthenticated(true)
      setUser(data.user)

      // Check admin status after login
      if (data.user) {
        const { data: adminData } = await supabase
          .from("user_roles")
          .select("*")
          .eq("user_id", data.user.id)
          .eq("role", "admin")
          .single()

        setIsAdmin(!!adminData)
      }

      setIsLoading(false)

      return { success: true }
    } catch (error: any) {
      logError("AuthProvider.login", error)
      setIsLoading(false)
      return { success: false, error: error.message || "Login failed" }
    }
  }

  // Social login function
  const loginWithSocial = async (provider: "google" | "facebook") => {
    if (!supabase) {
      return { success: false, error: "Authentication service unavailable" }
    }

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        return { success: false, error: error.message }
      }

      // The user will be redirected to the provider's login page
      return { success: true }
    } catch (error: any) {
      logError("AuthProvider.loginWithSocial", error)
      return { success: false, error: error.message || `Login with ${provider} failed` }
    }
  }

  // Logout function
  const logout = async () => {
    setIsLoading(true)

    try {
      if (supabase) {
        await supabase.auth.signOut()
      }

      // Clear local storage and cookies as fallback
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken")
        localStorage.removeItem("supabase.auth.token")

        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "supabase.auth.token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      }

      setIsAuthenticated(false)
      setUser(null)
      setIsAdmin(false)
    } catch (error) {
      logError("AuthProvider.logout", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Refresh auth state
  const refreshAuth = async () => {
    setIsLoading(true)

    try {
      const session = await getCurrentSession()
      const currentUser = await getCurrentUser()

      setIsAuthenticated(!!session)
      setUser(currentUser)

      // Check admin status on refresh
      if (currentUser) {
        const { data } = await supabase
          .from("user_roles")
          .select("*")
          .eq("user_id", currentUser.id)
          .eq("role", "admin")
          .single()

        setIsAdmin(!!data)
      }
    } catch (error) {
      logError("AuthProvider.refreshAuth", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        isAdmin,
        login,
        loginWithSocial,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

