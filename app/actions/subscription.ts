"use server"

import { createClient } from "@/lib/supabaseClient"
import { redirect } from "next/navigation"
import { updateUserSubscription, type SubscriptionTier } from "@/lib/subscription"

export async function updateSubscription(formData: FormData) {
  const supabase = createClient()

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    redirect("/login?message=You must be logged in to update your subscription")
  }

  const userId = session.user.id
  const tier = formData.get("tier") as SubscriptionTier

  if (!tier || !["rookie", "contender", "warrior", "legend"].includes(tier)) {
    throw new Error("Invalid subscription tier")
  }

  // Update the subscription
  const subscription = await updateUserSubscription(userId, tier)

  if (!subscription) {
    throw new Error("Failed to update subscription")
  }

  // Redirect to dashboard with success message
  redirect("/dashboard?message=Subscription updated successfully")
}

