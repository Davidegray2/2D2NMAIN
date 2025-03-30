"use client"

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react"

export type SubscriptionTier = "rookie" | "contender" | "warrior" | "legend"

interface SubscriptionContextType {
  tier: SubscriptionTier
  isLoading: boolean
  hasAccess: (requiredTier: SubscriptionTier) => boolean
  refreshSubscription?: () => Promise<void>
}

export const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

const tierLevels: Record<SubscriptionTier, number> = {
  rookie: 0,
  contender: 1,
  warrior: 2,
  legend: 3,
}

export function SubscriptionProvider({
  children,
  initialTier = "rookie",
}: {
  children: ReactNode
  initialTier?: SubscriptionTier
}) {
  const [tier, setTier] = useState<SubscriptionTier>(initialTier)
  const [isLoading, setIsLoading] = useState(false)

  // Memoize the hasAccess function to prevent unnecessary re-renders
  const hasAccess = useCallback(
    (requiredTier: SubscriptionTier): boolean => {
      return tierLevels[tier] >= tierLevels[requiredTier]
    },
    [tier],
  )

  // Add a function to refresh subscription data from the server
  const refreshSubscription = useCallback(async () => {
    try {
      setIsLoading(true)

      // In a real implementation, you would fetch the subscription from your API
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // This would be replaced with actual API call in production
      // const response = await fetchWithAuth('/api/subscription');
      // setTier(response.tier);
    } catch (error) {
      console.error("Failed to refresh subscription:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      tier,
      isLoading,
      hasAccess,
      refreshSubscription,
    }),
    [tier, isLoading, hasAccess, refreshSubscription],
  )

  return <SubscriptionContext.Provider value={contextValue}>{children}</SubscriptionContext.Provider>
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider")
  }
  return context
}

