"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export type SubscriptionTier = "rookie" | "contender" | "warrior" | "legend"

interface SubscriptionGateProps {
  requiredTier: SubscriptionTier
  children: ReactNode
  title?: string
  description?: string
  // For demo purposes, we'll add a prop to control access
  hasAccess?: boolean
}

const tierNames: Record<SubscriptionTier, string> = {
  rookie: "Rookie",
  contender: "Contender",
  warrior: "Warrior",
  legend: "Legend",
}

/**
 * SubscriptionGate - Component that restricts access to content based on subscription tier
 *
 * Allows access if:
 * 1. User is an admin
 * 2. User has the required subscription tier or higher
 * 3. The hasAccess prop is explicitly set to true
 */
export function SubscriptionGate({
  requiredTier,
  children,
  title = "Premium Feature",
  description = "This feature requires a higher subscription tier.",
  hasAccess = false,
}: SubscriptionGateProps) {
  const { isAdmin } = useAuth()

  // Allow access if user is admin or has the required subscription
  if (isAdmin || hasAccess) {
    return <>{children}</>
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-10 text-center">
        <div className="bg-primary/10 p-4 rounded-full mb-4">
          <Crown className="h-10 w-10 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold mb-2">{tierNames[requiredTier]} Members Feature</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          This feature is available to {tierNames[requiredTier]} tier members and above.
        </p>
        <Button size="lg" className="gap-2" asChild>
          <Link href="/membership-selection">
            <Crown className="h-4 w-4" aria-hidden="true" />
            Upgrade Membership
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

