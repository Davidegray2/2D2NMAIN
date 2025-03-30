import { createClient } from "@/lib/supabaseClient"
import { cookies } from "next/headers"
import { AIFitnessAssistant } from "@/components/ai-fitness-assistant"
import { getUserSubscriptionTier } from "@/lib/subscription"
import { redirect } from "next/navigation"

export async function AIAssistantWrapper() {
  const cookieStore = cookies()
  const supabase = createClient()

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If not logged in, redirect to login
  if (!session?.user) {
    redirect("/login?message=You must be logged in to access the AI assistant")
  }

  // Get the user's subscription tier
  const userTier = await getUserSubscriptionTier(session.user.id)

  // Pass the user's tier to the client component
  return <AIFitnessAssistant userTier={userTier} />
}

