"use client"

import { useState, useEffect } from "react"
import { BodyCompositionScanner } from "@/components/body-composition/scanner"
import { BodyCompositionSummary } from "@/components/body-composition/profile-summary"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lock, ShieldAlert, Crown, Beaker, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import ScannerComparison from "@/components/body-composition/scanner-comparison"
// Import the SubscriptionGate component
import { SubscriptionGate } from "@/components/subscription-gate"

export default function BodyCompositionPage() {
  const [userTier, setUserTier] = useState("Contender")
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [isLegendTier, setIsLegendTier] = useState(false)
  const [demoMode, setDemoMode] = useState(false)
  const [selectedTier, setSelectedTier] = useState("Contender")

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      const tier = demoMode ? selectedTier : "Contender"
      setUserTier(tier)
      setHasAccess(["Warrior", "Legend"].includes(tier))
      setIsLegendTier(tier === "Legend")
      setLoading(false)
    }, 500)
  }, [demoMode, selectedTier])

  if (loading) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // For demo purposes, we'll set hasAccess to true
  // In a real app, you would fetch this from your subscription system
  const subscriptionHasAccess = true

  return (
    <div className="container py-6">
      <SubscriptionGate
        requiredTier="warrior"
        title="Body Composition Scanner"
        description="Track your body composition changes over time with our advanced scanner."
        hasAccess={subscriptionHasAccess}
      >
        <div className="container py-6 space-y-6">
          {/* Demo Mode Toggle - For testing only */}
          <Card className="border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Beaker className="h-5 w-5 text-yellow-600" />
                    <Label htmlFor="demo-mode" className="font-bold text-yellow-700 dark:text-yellow-400">
                      Demo Mode (For Testing Only)
                    </Label>
                  </div>
                  <Switch id="demo-mode" checked={demoMode} onCheckedChange={setDemoMode} />
                </div>

                {demoMode && (
                  <div className="pt-2 space-y-2">
                    <Label htmlFor="tier-select" className="text-sm text-yellow-700 dark:text-yellow-400">
                      Test with membership tier:
                    </Label>
                    <Select value={selectedTier} onValueChange={setSelectedTier}>
                      <SelectTrigger id="tier-select" className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rookie">Rookie</SelectItem>
                        <SelectItem value="Contender">Contender</SelectItem>
                        <SelectItem value="Warrior">Warrior</SelectItem>
                        <SelectItem value="Legend">Legend</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-yellow-600 dark:text-yellow-500 italic mt-2">
                      Note: This demo mode is for testing purposes only and should be removed in production.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {!hasAccess ? (
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-6 w-6 text-amber-500" />
                  <CardTitle>Premium Feature</CardTitle>
                </div>
                <CardDescription>
                  Body Composition Analysis is available exclusively for Warrior and Legend members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg border border-border">
                  <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                      <Lock className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">Upgrade Your Membership</h3>
                    <p className="text-muted-foreground max-w-md">
                      Your current membership tier is <span className="font-semibold">{userTier}</span>. Upgrade to
                      Warrior tier or higher to access our advanced AI-powered Body Composition Analysis tool.
                    </p>
                    <Button size="lg" asChild>
                      <Link href="/membership-selection">Upgrade Membership</Link>
                    </Button>
                  </div>
                </div>

                <ScannerComparison />
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Body Composition</h1>
                  <p className="text-muted-foreground">Track and analyze your physique changes over time</p>
                </div>
                {isLegendTier && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 px-4 py-2 rounded-full">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    <span className="font-semibold text-amber-800 dark:text-amber-400">Enhanced Legend Scanner</span>
                  </div>
                )}
              </div>

              {isLegendTier ? (
                // Enhanced Legend Tier Scanner
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <BodyCompositionScanner enhanced={true} />
                    </div>
                    <div>
                      <BodyCompositionSummary enhanced={true} />
                    </div>
                  </div>
                </div>
              ) : (
                // Standard Warrior Tier Scanner
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <BodyCompositionScanner enhanced={false} />
                  </div>
                  <div className="space-y-6">
                    <BodyCompositionSummary enhanced={false} />

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Crown className="h-5 w-5 text-amber-500" />
                          <CardTitle className="text-base">Upgrade to Legend</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Unlock the enhanced body composition scanner with 3D modeling, advanced trend analysis, and
                          personalized recommendations 3D modeling, advanced trend analysis, and personalized
                          recommendations.
                        </p>
                        <Button asChild className="w-full">
                          <Link href="/membership-selection">Upgrade to Legend</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </SubscriptionGate>
    </div>
  )
}

