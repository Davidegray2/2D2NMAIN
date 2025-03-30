import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseClient"
import { updateUserSubscription, type SubscriptionTier } from "@/lib/subscription"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const supabase = createClient()

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return NextResponse.redirect(
      new URL("/login?message=You must be logged in to update your subscription", request.url),
    )
  }

  const userId = session.user.id
  const tier = formData.get("tier") as SubscriptionTier

  if (!tier || !["rookie", "contender", "warrior", "legend"].includes(tier)) {
    return NextResponse.json({ error: "Invalid subscription tier" }, { status: 400 })
  }

  // Update the subscription
  const subscription = await updateUserSubscription(userId, tier)

  if (!subscription) {
    return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
  }

  // Redirect to dashboard with success message
  return NextResponse.redirect(new URL("/dashboard?message=Subscription updated successfully", request.url))
}

