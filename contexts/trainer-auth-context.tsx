"use client"

import { createContext, useContext, useEffect, useState, type ReactNode, useCallback, useMemo, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"

type Trainer = {
  id: string
  name: string
  email: string
}

type TrainerAuthContextType = {
  trainer: Trainer | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  error: string | null
}

const TrainerAuthContext = createContext<TrainerAuthContextType | undefined>(undefined)

export function TrainerAuthProvider({ children }: { children: ReactNode }) {
  const [trainer, setTrainer] = useState<Trainer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Add these state variables after the existing state declarations
  const [tokenExpiresAt, setTokenExpiresAt] = useState<number | null>(null)
  const [refreshingToken, setRefreshingToken] = useState(false)
  const refreshTokenTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        setError(null)

        // In a production app, this would be replaced with a secure authentication method
        // such as JWT tokens stored in HttpOnly cookies or a secure token management system
        if (typeof window !== "undefined") {
          const storedAuth = localStorage.getItem("trainerAuth")

          if (storedAuth) {
            try {
              const parsedAuth = JSON.parse(storedAuth)
              if (parsedAuth.isLoggedIn) {
                setTrainer({
                  id: parsedAuth.id,
                  name: parsedAuth.name,
                  email: parsedAuth.email,
                })
                setTokenExpiresAt(parsedAuth.expiresAt || null)
              }
            } catch (error) {
              console.error("Error parsing auth data:", error)
              localStorage.removeItem("trainerAuth")
              setError("Authentication data is corrupted. Please log in again.")
            }
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        setError("Failed to check authentication status.")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Protect trainer routes
  useEffect(() => {
    if (!isLoading) {
      const isTrainerRoute = pathname?.startsWith("/trainer-portal")

      if (isTrainerRoute && !trainer) {
        router.push("/trainer-login")
      }
    }
  }, [isLoading, trainer, pathname, router])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // In a real app, this would be an API call with proper authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock trainer accounts for demo - in a real app, this would be handled securely on the server
      const trainers = [
        { email: "alex@2d2n.com", password: "trainer123", name: "Alex Johnson", id: "trainer1" },
        { email: "sarah@2d2n.com", password: "trainer123", name: "Sarah Williams", id: "trainer2" },
        { email: "mike@2d2n.com", password: "trainer123", name: "Mike Chen", id: "trainer3" },
      ]

      const matchedTrainer = trainers.find((t) => t.email === email && t.password === password)

      if (matchedTrainer) {
        const trainerData = {
          id: matchedTrainer.id,
          name: matchedTrainer.name,
          email: matchedTrainer.email,
        }

        // Set token expiration time (30 minutes from now)
        const expiresAt = Date.now() + 30 * 60 * 1000
        setTokenExpiresAt(expiresAt)
        setTrainer(trainerData)

        // In a production app, this would be replaced with a secure authentication method
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "trainerAuth",
            JSON.stringify({
              ...trainerData,
              isLoggedIn: true,
              expiresAt,
            }),
          )
        }

        router.push("/trainer-portal")
      } else {
        setError("Invalid email or password")
        throw new Error("Invalid email or password")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError(error instanceof Error ? error.message : "Login failed. Please try again.")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = useCallback(() => {
    setTrainer(null)
    setTokenExpiresAt(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("trainerAuth")
    }
    router.push("/trainer-login")
  }, [router])

  const contextValue = useMemo(
    () => ({
      trainer,
      isLoading,
      isAuthenticated: !!trainer,
      error,
      login,
      logout,
    }),
    [trainer, isLoading, error, logout],
  )

  // Add this effect for token refresh after the existing effects
  useEffect(() => {
    let isMounted = true

    // Function to refresh the token
    const refreshToken = async () => {
      if (!trainer || refreshingToken || !isMounted) return

      try {
        setRefreshingToken(true)
        console.log("Refreshing authentication token...")

        // In a real app, this would be an API call to refresh the token
        await new Promise((resolve) => setTimeout(resolve, 500))

        if (!isMounted) return

        // Set a new expiration time (30 minutes from now)
        const newExpiresAt = Date.now() + 30 * 60 * 1000
        setTokenExpiresAt(newExpiresAt)

        // Update the stored auth data with the new expiration time
        if (typeof window !== "undefined" && trainer) {
          const storedAuth = localStorage.getItem("trainerAuth")
          if (storedAuth) {
            try {
              const parsedAuth = JSON.parse(storedAuth)
              localStorage.setItem(
                "trainerAuth",
                JSON.stringify({
                  ...parsedAuth,
                  expiresAt: newExpiresAt,
                }),
              )
            } catch (error) {
              console.error("Error updating stored auth data:", error)
            }
          }
        }

        console.log("Token refreshed successfully")
      } catch (error) {
        console.error("Error refreshing token:", error)
        // If token refresh fails, log the user out
        if (isMounted) {
          logout()
        }
      } finally {
        if (isMounted) {
          setRefreshingToken(false)
        }
      }
    }

    // Set up token refresh
    if (trainer && tokenExpiresAt) {
      const timeUntilRefresh = tokenExpiresAt - Date.now() - 5 * 60 * 1000 // Refresh 5 minutes before expiration

      if (timeUntilRefresh <= 0) {
        // Token is about to expire, refresh it immediately
        refreshToken()
      } else {
        // Schedule token refresh
        if (refreshTokenTimeoutRef.current) {
          clearTimeout(refreshTokenTimeoutRef.current)
        }

        refreshTokenTimeoutRef.current = setTimeout(() => {
          refreshToken()
        }, timeUntilRefresh)
      }
    }

    // Clean up the timeout on unmount
    return () => {
      isMounted = false
      if (refreshTokenTimeoutRef.current) {
        clearTimeout(refreshTokenTimeoutRef.current)
      }
    }
  }, [trainer, tokenExpiresAt, refreshingToken, logout])

  return <TrainerAuthContext.Provider value={contextValue}>{children}</TrainerAuthContext.Provider>
}

export function useTrainerAuth() {
  const context = useContext(TrainerAuthContext)
  if (context === undefined) {
    throw new Error("useTrainerAuth must be used within a TrainerAuthProvider")
  }
  return context
}

