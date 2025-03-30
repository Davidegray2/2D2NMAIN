"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Dumbbell, Flame, Clock, TrendingUp, BarChart } from "lucide-react"

interface BattleStats {
  id: string
  date: string
  duration: string
  exerciseType: string
  userStats: {
    reps: number
    calories: number
    avgSpeed: number
    peakPerformance: number
    consistency: number
  }
  opponentStats: {
    reps: number
    calories: number
    avgSpeed: number
    peakPerformance: number
    consistency: number
  }
  result: "win" | "loss" | "draw"
}

export default function BattleStatsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<BattleStats | null>(null)

  // Log the stats page ID for debugging
  useEffect(() => {
    console.log("Stats page mounted with ID:", params.id)
  }, [params.id])

  useEffect(() => {
    // Simulate API call to fetch battle stats
    const fetchStats = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock data
        setStats({
          id: params.id,
          date: "March 15, 2025",
          duration: "3:45",
          exerciseType: "Push-ups",
          userStats: {
            reps: 42,
            calories: 156,
            avgSpeed: 14,
            peakPerformance: 92,
            consistency: 88,
          },
          opponentStats: {
            reps: 38,
            calories: 142,
            avgSpeed: 12,
            peakPerformance: 85,
            consistency: 90,
          },
          result: "win",
        })
        setLoading(false)
      } catch (error) {
        console.error("Error fetching battle stats:", error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [params.id])

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading battle statistics...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Stats Not Found</h1>
          <p className="text-muted-foreground mb-6">The battle statistics you're looking for couldn't be found.</p>
          <Button onClick={handleBack}>Back to Battle</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="flex items-center text-muted-foreground hover:text-foreground"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Battle
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Battle Statistics</h1>
          <p className="text-muted-foreground">
            {stats.exerciseType} • {stats.date}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {stats.result === "win" && (
            <Badge className="px-3 py-1 bg-green-500 text-white">
              <Trophy className="h-4 w-4 mr-1" />
              Victory
            </Badge>
          )}
          {stats.result === "loss" && <Badge className="px-3 py-1 bg-red-500 text-white">Defeat</Badge>}
          {stats.result === "draw" && <Badge className="px-3 py-1 bg-yellow-500 text-white">Draw</Badge>}
          <Badge variant="outline" className="px-3 py-1">
            <Clock className="h-4 w-4 mr-1" />
            {stats.duration}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Dumbbell className="h-5 w-5 mr-2" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Detailed breakdown of your performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Total Reps</span>
                  <span className="font-bold">{stats.userStats.reps}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{
                      width: `${(stats.userStats.reps / (stats.userStats.reps + stats.opponentStats.reps)) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-muted-foreground">
                    {stats.result === "win"
                      ? `+${stats.userStats.reps - stats.opponentStats.reps} more than opponent`
                      : stats.result === "loss"
                        ? `${stats.userStats.reps - stats.opponentStats.reps} less than opponent`
                        : "Same as opponent"}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Calories Burned</span>
                  <span className="font-bold">{stats.userStats.calories}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-orange-500 h-2.5 rounded-full"
                    style={{ width: `${(stats.userStats.calories / 200) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Average Speed</span>
                  <span className="font-bold">{stats.userStats.avgSpeed} reps/min</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${(stats.userStats.avgSpeed / 20) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Peak Performance</span>
                  <span className="font-bold">{stats.userStats.peakPerformance}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{ width: `${stats.userStats.peakPerformance}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Consistency</span>
                  <span className="font-bold">{stats.userStats.consistency}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${stats.userStats.consistency}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Comparison
            </CardTitle>
            <CardDescription>How you performed against your opponent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">You</span>
                  <span className="text-sm font-medium">Reps</span>
                  <span className="text-sm">Opponent</span>
                </div>
                <div className="flex items-center">
                  <div
                    className="bg-primary h-4 rounded-l-full text-right pr-1 text-xs text-white"
                    style={{
                      width: `${(stats.userStats.reps / (stats.userStats.reps + stats.opponentStats.reps)) * 100}%`,
                    }}
                  >
                    {stats.userStats.reps}
                  </div>
                  <div
                    className="bg-red-500 h-4 rounded-r-full pl-1 text-xs text-white"
                    style={{
                      width: `${(stats.opponentStats.reps / (stats.userStats.reps + stats.opponentStats.reps)) * 100}%`,
                    }}
                  >
                    {stats.opponentStats.reps}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">You</span>
                  <span className="text-sm font-medium">Calories</span>
                  <span className="text-sm">Opponent</span>
                </div>
                <div className="flex items-center">
                  <div
                    className="bg-orange-500 h-4 rounded-l-full text-right pr-1 text-xs text-white"
                    style={{
                      width: `${(stats.userStats.calories / (stats.userStats.calories + stats.opponentStats.calories)) * 100}%`,
                    }}
                  >
                    {stats.userStats.calories}
                  </div>
                  <div
                    className="bg-orange-700 h-4 rounded-r-full pl-1 text-xs text-white"
                    style={{
                      width: `${(stats.opponentStats.calories / (stats.userStats.calories + stats.opponentStats.calories)) * 100}%`,
                    }}
                  >
                    {stats.opponentStats.calories}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">You</span>
                  <span className="text-sm font-medium">Speed (reps/min)</span>
                  <span className="text-sm">Opponent</span>
                </div>
                <div className="flex items-center">
                  <div
                    className="bg-blue-500 h-4 rounded-l-full text-right pr-1 text-xs text-white"
                    style={{
                      width: `${(stats.userStats.avgSpeed / (stats.userStats.avgSpeed + stats.opponentStats.avgSpeed)) * 100}%`,
                    }}
                  >
                    {stats.userStats.avgSpeed}
                  </div>
                  <div
                    className="bg-blue-700 h-4 rounded-r-full pl-1 text-xs text-white"
                    style={{
                      width: `${(stats.opponentStats.avgSpeed / (stats.userStats.avgSpeed + stats.opponentStats.avgSpeed)) * 100}%`,
                    }}
                  >
                    {stats.opponentStats.avgSpeed}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">You</span>
                  <span className="text-sm font-medium">Peak Performance</span>
                  <span className="text-sm">Opponent</span>
                </div>
                <div className="flex items-center">
                  <div
                    className="bg-purple-500 h-4 rounded-l-full text-right pr-1 text-xs text-white"
                    style={{
                      width: `${(stats.userStats.peakPerformance / (stats.userStats.peakPerformance + stats.opponentStats.peakPerformance)) * 100}%`,
                    }}
                  >
                    {stats.userStats.peakPerformance}%
                  </div>
                  <div
                    className="bg-purple-700 h-4 rounded-r-full pl-1 text-xs text-white"
                    style={{
                      width: `${(stats.opponentStats.peakPerformance / (stats.userStats.peakPerformance + stats.opponentStats.peakPerformance)) * 100}%`,
                    }}
                  >
                    {stats.opponentStats.peakPerformance}%
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">You</span>
                  <span className="text-sm font-medium">Consistency</span>
                  <span className="text-sm">Opponent</span>
                </div>
                <div className="flex items-center">
                  <div
                    className="bg-green-500 h-4 rounded-l-full text-right pr-1 text-xs text-white"
                    style={{
                      width: `${(stats.userStats.consistency / (stats.userStats.consistency + stats.opponentStats.consistency)) * 100}%`,
                    }}
                  >
                    {stats.userStats.consistency}%
                  </div>
                  <div
                    className="bg-green-700 h-4 rounded-r-full pl-1 text-xs text-white"
                    style={{
                      width: `${(stats.opponentStats.consistency / (stats.userStats.consistency + stats.opponentStats.consistency)) * 100}%`,
                    }}
                  >
                    {stats.opponentStats.consistency}%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="mb-6">
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          <TabsTrigger value="history">Battle History</TabsTrigger>
          <TabsTrigger value="improvement">Improvement Areas</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Performance Analysis
              </CardTitle>
              <CardDescription>Detailed breakdown of your performance during this battle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Strengths</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Strong start with consistent pace</li>
                    <li>Excellent form throughout the battle</li>
                    <li>Maintained high energy levels even in final minutes</li>
                    <li>Effective recovery between intense bursts</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Performance Timeline</h3>
                  <div className="relative pt-6">
                    <div className="absolute top-0 left-0 w-full flex justify-between text-xs text-muted-foreground">
                      <span>Start</span>
                      <span>1 min</span>
                      <span>2 min</span>
                      <span>3 min</span>
                      <span>End</span>
                    </div>
                    <div className="w-full h-16 bg-muted/30 rounded-lg relative">
                      {/* Performance graph - in a real app this would be a proper chart */}
                      <div className="absolute inset-0 flex items-end">
                        <div className="h-[50%] w-[10%] bg-blue-500/70 rounded-sm"></div>
                        <div className="h-[70%] w-[10%] bg-blue-500/70 rounded-sm"></div>
                        <div className="h-[60%] w-[10%] bg-blue-500/70 rounded-sm"></div>
                        <div className="h-[80%] w-[10%] bg-blue-500/70 rounded-sm"></div>
                        <div className="h-[90%] w-[10%] bg-blue-500/70 rounded-sm"></div>
                        <div className="h-[75%] w-[10%] bg-blue-500/70 rounded-sm"></div>
                        <div className="h-[65%] w-[10%] bg-blue-500/70 rounded-sm"></div>
                        <div className="h-[85%] w-[10%] bg-blue-500/70 rounded-sm"></div>
                        <div className="h-[95%] w-[10%] bg-blue-500/70 rounded-sm"></div>
                        <div className="h-[80%] w-[10%] bg-blue-500/70 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your performance peaked around the 2:30 mark with a strong finish
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Moments</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-0.5">
                        0:45
                      </Badge>
                      <div>
                        <p className="font-medium">Strong Start</p>
                        <p className="text-sm text-muted-foreground">Completed 10 reps in the first 45 seconds</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-0.5">
                        1:30
                      </Badge>
                      <div>
                        <p className="font-medium">Mid-Battle Push</p>
                        <p className="text-sm text-muted-foreground">Increased pace to take the lead</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-0.5">
                        3:15
                      </Badge>
                      <div>
                        <p className="font-medium">Final Sprint</p>
                        <p className="text-sm text-muted-foreground">Completed 8 reps in the final 30 seconds</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Battle History</CardTitle>
              <CardDescription>Your previous battles with this opponent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Push-ups Battle</p>
                    <p className="text-sm text-muted-foreground">March 10, 2025</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="font-bold">38</p>
                      <p className="text-xs text-muted-foreground">Your reps</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">41</p>
                      <p className="text-xs text-muted-foreground">Opponent</p>
                    </div>
                    <Badge variant="outline" className="bg-red-100">
                      Loss
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Squats Challenge</p>
                    <p className="text-sm text-muted-foreground">February 28, 2025</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="font-bold">52</p>
                      <p className="text-xs text-muted-foreground">Your reps</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">48</p>
                      <p className="text-xs text-muted-foreground">Opponent</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100">
                      Win
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Burpee Battle</p>
                    <p className="text-sm text-muted-foreground">February 15, 2025</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="font-bold">24</p>
                      <p className="text-xs text-muted-foreground">Your reps</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">24</p>
                      <p className="text-xs text-muted-foreground">Opponent</p>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100">
                      Draw
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Overall Record</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm">Wins</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm">Losses</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm">Draws</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improvement">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Flame className="h-5 w-5 mr-2" />
                Improvement Areas
              </CardTitle>
              <CardDescription>Suggestions to improve your performance in future battles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Endurance</h3>
                  <p className="mb-2">Your performance dropped slightly in the middle section of the battle.</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="font-medium mb-1">Recommended Workouts:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>HIIT Training (3x per week)</li>
                      <li>Endurance Circuit (2x per week)</li>
                      <li>Active Recovery Sessions</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Pacing</h3>
                  <p className="mb-2">
                    Your rep speed varied throughout the battle. More consistent pacing could improve results.
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: "72%" }}></div>
                    </div>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="font-medium mb-1">Recommended Drills:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Timed Interval Training</li>
                      <li>Metronome-Paced Workouts</li>
                      <li>Breathing Technique Practice</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Recovery</h3>
                  <p className="mb-2">Improving your between-rep recovery could help maintain higher performance.</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="font-medium mb-1">Recommended Techniques:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Controlled Breathing Exercises</li>
                      <li>Active Recovery Movements</li>
                      <li>Heart Rate Control Training</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full">Generate Custom Training Plan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

