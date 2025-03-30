"use client"

import { AIFitnessAssistant } from "@/components/ai-fitness-assistant"
import { useUser } from "@/hooks/use-user"

export default function FitnessAIPage() {
  // In a real app, you would check the user's subscription level
  // For demo purposes, we'll assume Elite tier has access
  const { user } = useUser()
  const hasAccess = user?.subscription?.tier === "elite" || user?.subscription?.tier === "premium"

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Elite Fitness AI</h1>
      <p className="text-muted-foreground mb-6">
        Get instant answers to your fitness and nutrition questions from our AI assistant. This feature is available
        exclusively to Elite and Premium members.
      </p>
      <AIFitnessAssistant hasAccess={hasAccess} />
    </div>
  )
}

