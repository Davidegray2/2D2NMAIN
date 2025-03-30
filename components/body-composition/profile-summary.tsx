"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Camera, ChevronRight, Crown } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, TrendingUp, Dumbbell } from "lucide-react"

interface BodyCompositionSummaryProps {
  enhanced?: boolean
}

export function BodyCompositionSummary({ enhanced = false }: BodyCompositionSummaryProps) {
  // Mock data for the profile summary
  const latestScan = {
    date: new Date(2023, 4, 15),
    metrics: {
      bodyFat: 15.8,
      muscleMass: 44.5,
      visceralFat: 5,
    },
    changes: {
      bodyFat: -1.4,
      muscleMass: 1.4,
      visceralFat: -1,
    },
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className={enhanced ? "border-amber-200 dark:border-amber-800/50" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded px-1.5">
              2D2N
            </div>
            <CardTitle>Body Composition</CardTitle>
            {enhanced && (
              <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-400 px-2 py-1 rounded-full flex items-center">
                <Crown className="h-3 w-3 inline mr-1" />
                Enhanced
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/body-composition" className="flex items-center gap-1">
              <span className="text-xs">View All</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
        <CardDescription>Latest scan: {formatDate(latestScan.date)}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="metrics">
              <Activity className="h-4 w-4 mr-2" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="history">
              <TrendingUp className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Body Fat</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{latestScan.metrics.bodyFat}%</span>
                  <span className={`text-xs ${latestScan.changes.bodyFat < 0 ? "text-green-500" : "text-red-500"}`}>
                    {latestScan.changes.bodyFat > 0 ? "+" : ""}
                    {latestScan.changes.bodyFat}%
                  </span>
                </div>
              </div>
              <Progress value={latestScan.metrics.bodyFat} max={30} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Muscle Mass</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{latestScan.metrics.muscleMass}%</span>
                  <span className={`text-xs ${latestScan.changes.muscleMass > 0 ? "text-green-500" : "text-red-500"}`}>
                    {latestScan.changes.muscleMass > 0 ? "+" : ""}
                    {latestScan.changes.muscleMass}%
                  </span>
                </div>
              </div>
              <Progress value={latestScan.metrics.muscleMass} max={60} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Visceral Fat</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Level {latestScan.metrics.visceralFat}</span>
                  <span className={`text-xs ${latestScan.changes.visceralFat < 0 ? "text-green-500" : "text-red-500"}`}>
                    {latestScan.changes.visceralFat > 0 ? "+" : ""}
                    {latestScan.changes.visceralFat}
                  </span>
                </div>
              </div>
              <Progress value={latestScan.metrics.visceralFat} max={20} className="h-2" />
            </div>

            {enhanced && (
              <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-md border border-amber-100 dark:border-amber-900/30">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-amber-700 dark:text-amber-400">Muscle Balance</div>
                  <div className="text-xs text-amber-600 dark:text-amber-500">Enhanced</div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>Upper: 48%</div>
                  <div>Lower: 52%</div>
                  <div>Left: 49%</div>
                  <div>Right: 51%</div>
                </div>
              </div>
            )}

            <Button
              className={`w-full gap-2 ${
                enhanced
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              }`}
              asChild
            >
              <Link href="/body-composition">
                <Camera className="h-4 w-4" />
                {enhanced ? "New Enhanced 3D Body Scan" : "New 2D2N AI Body Scan"}
              </Link>
            </Button>
          </TabsContent>

          <TabsContent value="history">
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <Dumbbell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">View your scan history and track progress over time.</p>
              {enhanced && (
                <p className="text-xs text-amber-600 dark:text-amber-500 mt-2">
                  <Crown className="h-3 w-3 inline mr-1" />
                  Legend tier includes unlimited scan history
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

