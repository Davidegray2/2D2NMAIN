import { createClient } from "@/lib/supabaseClient"
import { logError } from "@/lib/error-handling"

export type SubscriptionTier = "rookie" | "contender" | "warrior" | "legend"

export interface UserSubscription {
  id: string
  userId: string
  tier: SubscriptionTier
  startDate: Date
  endDate: Date | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * Get the current active subscription for a user
 */
export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
  if (!userId) {
    console.warn("getUserSubscription called with empty userId")
    return null
  }

  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("user_subscriptions")
      .select("*")
      .eq("userId", userId)
      .eq("isActive", true)
      .order("createdAt", { ascending: false })
      .limit(1)
      .single()

    if (error) {
      if (error.code !== "PGRST116") {
        // Not found error
        logError("getUserSubscription", error)
      }
      return null
    }

    if (!data) return null

    return {
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  } catch (error) {
    logError("getUserSubscription", error)
    return null
  }
}

/**
 * Update a user's subscription to a new tier
 */
export async function updateUserSubscription(userId: string, tier: SubscriptionTier): Promise<UserSubscription | null> {
  if (!userId) {
    console.warn("updateUserSubscription called with empty userId")
    return null
  }

  try {
    const supabase = createClient()

    // First, deactivate any existing subscriptions
    await supabase
      .from("user_subscriptions")
      .update({ isActive: false, endDate: new Date().toISOString() })
      .eq("userId", userId)
      .eq("isActive", true)

    // Create a new subscription
    const newSubscription = {
      userId,
      tier,
      startDate: new Date().toISOString(),
      endDate: null,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const { data, error } = await supabase.from("user_subscriptions").insert(newSubscription).select().single()

    if (error) {
      logError("updateUserSubscription", error)
      return null
    }

    if (!data) return null

    return {
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  } catch (error) {
    logError("updateUserSubscription", error)
    return null
  }
}

/**
 * Get a user's subscription tier, defaulting to 'rookie' if no active subscription exists
 */
export async function getUserSubscriptionTier(userId: string): Promise<SubscriptionTier> {
  if (!userId) {
    console.warn("getUserSubscriptionTier called with empty userId")
    return "rookie"
  }

  try {
    const subscription = await getUserSubscription(userId)
    return subscription?.isActive ? subscription.tier : "rookie"
  } catch (error) {
    logError("getUserSubscriptionTier", error)
    return "rookie"
  }
}

/**
 * Check if a user has admin privileges
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  if (!userId) {
    console.warn("isUserAdmin called with empty userId")
    return false
  }

  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("user_roles")
      .select("*")
      .eq("user_id", userId)
      .eq("role", "admin")
      .single()

    if (error) {
      if (error.code !== "PGRST116") {
        // Not found error
        logError("isUserAdmin", error)
      }
      return false
    }

    return !!data
  } catch (error) {
    logError("isUserAdmin", error)
    return false
  }
}

/**
 * Check if a user has access to features requiring a specific subscription tier
 * Admins always have access to all features
 */
export async function hasSubscriptionAccess(userId: string, requiredTier: SubscriptionTier): Promise<boolean> {
  if (!userId) {
    console.warn("hasSubscriptionAccess called with empty userId")
    return false
  }

  try {
    // First check if user is admin
    const isAdmin = await isUserAdmin(userId)
    if (isAdmin) return true

    // If not admin, check subscription tier
    const userTier = await getUserSubscriptionTier(userId)

    const tierLevels: Record<SubscriptionTier, number> = {
      rookie: 0,
      contender: 1,
      warrior: 2,
      legend: 3,
    }

    return tierLevels[userTier] >= tierLevels[requiredTier]
  } catch (error) {
    logError("hasSubscriptionAccess", error)
    return false
  }
}

