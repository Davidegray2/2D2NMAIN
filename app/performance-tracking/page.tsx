"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  TrendingUp,
  TrendingDown,
  Dumbbell,
  Heart,
  Scale,
  Download,
  Share2,
  CheckCircle2,
  AlertCircle,
  Brain,
  Zap,
  BarChart,
  PieChart,
  Crown,
} from "lucide-react"
import Link from "next/link"

// Subscription plan types
type SubscriptionPlan = "rookie" | "contender" | "warrior" | "legend"

export default function PerformanceTrackingPage() {
  const [activeTab, setActiveTab] = useState("strength")
  const [timeRange, setTimeRange] = useState("30d")

  // In a real app, this would come from your auth context or API
  const [userPlan, setUserPlan] = useState<SubscriptionPlan>("warrior")

  // For demo purposes - toggle between subscription levels
  const cyclePlan = () => {
    const plans: SubscriptionPlan[] = ["warrior", "legend"]
    const currentIndex = plans.indexOf(userPlan)
    const nextIndex = (currentIndex + 1) % plans.length
    setUserPlan(plans[nextIndex])
  }

  // Strength progress data
  const strengthData = {
    exercises: [],
    volumeByWeek: [],
    personalRecords: 0,
    weeklyImprovement: "0%",
  }

  // Cardio performance data
  const cardioData = {
    activities: [],
    heartRateZones: [],
    vo2MaxTrend: [],
    weeklyDistance: "0%",
  }

  // Body composition data
  const bodyData = {
    measurements: [],
    circumferences: [],
  }

  // Advanced metrics (Legend tier only)
  const advancedMetrics = null

  return (
    <div className="container py-6 max-w-6xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Performance Tracking</h1>
          <p className="text-muted-foreground">
            {userPlan === "legend"
              ? "Advanced analytics and detailed metrics for your fitness journey"
              : "Track your progress and performance metrics"}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* This button is just for demo purposes - would be removed in production */}
          <Button variant="outline" size="sm" onClick={cyclePlan} className="text-xs">
            Demo: {userPlan === "warrior" ? "Switch to Legend" : "Switch to Warrior"}
          </Button>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Plan Badge */}
      <div className="mb-6">
        <Badge
          variant="outline"
          className={`
            ${
              userPlan === "legend"
                ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200 dark:from-amber-950/30 dark:to-yellow-950/30 dark:text-amber-400 dark:border-amber-800"
                : "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border-slate-200 dark:from-slate-950/30 dark:to-gray-950/30 dark:text-slate-400 dark:border-slate-800"
            }
            px-3 py-1
          `}
        >
          {userPlan === "legend" ? "Legend" : "Warrior"} Plan Feature
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Dumbbell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Strength Progress</div>
              <div className="text-2xl font-bold">{strengthData.weeklyImprovement}</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>vs previous period</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Cardio Performance</div>
              <div className="text-2xl font-bold">{cardioData.weeklyDistance}</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>distance increase</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Scale className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Body Composition</div>
              <div className="text-2xl font-bold">0%</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                <span>weight change</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="strength" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
          <TabsTrigger value="strength">Strength</TabsTrigger>
          <TabsTrigger value="cardio">Cardio</TabsTrigger>
          <TabsTrigger value="body">Body</TabsTrigger>
          {userPlan === "legend" && (
            <>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="predictive">Predictive</TabsTrigger>
            </>
          )}
        </TabsList>

        {/* Strength Tab */}
        <TabsContent value="strength" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Strength Progress</CardTitle>
                  <CardDescription>Track your lifting performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {strengthData.exercises.map((exercise, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{exercise.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Previous: {exercise.previous}</span>
                              <span className="text-xs text-green-600 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {exercise.change}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{exercise.current}</p>
                            <p className="text-xs text-primary">Current</p>
                          </div>
                        </div>
                        <div className="h-[60px] bg-muted/20 rounded-md flex items-end p-2 gap-1">
                          {exercise.history.map((value, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end items-center">
                              <div
                                className={`w-full rounded-sm ${i === exercise.history.length - 1 ? "bg-green-500" : "bg-primary/80"}`}
                                style={{ height: `${value * 0.3}px` }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle>Volume Progression</CardTitle>
                  <CardDescription>Weekly training volume (lbs)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] bg-muted/20 rounded-md flex items-end p-4 gap-2">
                    {strengthData.volumeByWeek.map((value, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end items-center">
                        <div
                          className={`w-full rounded-sm ${i === strengthData.volumeByWeek.length - 1 ? "bg-green-500" : "bg-primary/80"}`}
                          style={{ height: `${(value / 20000) * 180}px` }}
                        ></div>
                        <span className="text-[10px] mt-1 text-muted-foreground">W{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Personal Records</CardTitle>
                  <CardDescription>Recent achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{strengthData.personalRecords}</div>
                        <div className="text-xs text-muted-foreground">New PRs</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded-md bg-muted/20 flex justify-between items-center">
                      <span className="text-sm font-medium">Bench Press</span>
                      <span className="text-sm">225 lbs × 5</span>
                    </div>
                    <div className="p-2 rounded-md bg-muted/20 flex justify-between items-center">
                      <span className="text-sm font-medium">Squat</span>
                      <span className="text-sm">315 lbs × 3</span>
                    </div>
                    <div className="p-2 rounded-md bg-muted/20 flex justify-between items-center">
                      <span className="text-sm font-medium">Pull-ups</span>
                      <span className="text-sm">BW × 12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Cardio Tab */}
        <TabsContent value="cardio" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cardio Performance</CardTitle>
                  <CardDescription>Track your endurance and cardiovascular metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {cardioData.activities.map((activity, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{activity.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Previous: {activity.previous}</span>
                              <span className="text-xs text-green-600 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {activity.change}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{activity.current}</p>
                            <p className="text-xs text-primary">Current</p>
                          </div>
                        </div>
                        <div className="h-[60px] bg-muted/20 rounded-md flex items-end p-2 gap-1">
                          {activity.history.map((value, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end items-center">
                              <div
                                className={`w-full rounded-sm ${i === activity.history.length - 1 ? "bg-green-500" : "bg-blue-500/80"}`}
                                style={{ height: `${(50 - value) * 1.2}px` }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle>Heart Rate Zones</CardTitle>
                  <CardDescription>Time spent in each zone</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cardioData.heartRateZones.map((zone, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{zone.name}</span>
                          <span>{zone.percentage}%</span>
                        </div>
                        <Progress value={zone.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>VO2 Max Trend</CardTitle>
                  <CardDescription>Cardio fitness level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[150px] bg-muted/20 rounded-md flex items-end p-4 gap-2">
                    {cardioData.vo2MaxTrend.map((value, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end items-center">
                        <div
                          className={`w-full rounded-sm ${i === cardioData.vo2MaxTrend.length - 1 ? "bg-green-500" : "bg-blue-500/80"}`}
                          style={{ height: `${(value - 35) * 10}px` }}
                        ></div>
                        <span className="text-[10px] mt-1 text-muted-foreground">W{i + 1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-sm font-medium">Current VO2 Max</div>
                    <div className="text-2xl font-bold">
                      {cardioData.vo2MaxTrend[cardioData.vo2MaxTrend.length - 1]}
                    </div>
                    <div className="text-xs text-green-600">+5 points in 8 weeks</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Body Composition Tab */}
        <TabsContent value="body" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Body Composition</CardTitle>
                  <CardDescription>Track your physical measurements and body composition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {bodyData.measurements.map((measurement, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{measurement.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Previous: {measurement.previous}</span>
                              <span
                                className={`text-xs ${measurement.trend === "down" ? "text-green-600" : "text-blue-600"} flex items-center`}
                              >
                                {measurement.trend === "down" ? (
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                ) : (
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                )}
                                {measurement.change}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{measurement.current}</p>
                            <p className="text-xs text-primary">Current</p>
                          </div>
                        </div>
                        <div className="h-[60px] bg-muted/20 rounded-md flex items-end p-2 gap-1">
                          {measurement.history.map((value, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end items-center">
                              <div
                                className={`w-full rounded-sm ${
                                  i === measurement.history.length - 1
                                    ? measurement.trend === "down"
                                      ? "bg-green-500"
                                      : "bg-blue-500"
                                    : "bg-primary/80"
                                }`}
                                style={{
                                  height: `${
                                    measurement.name === "Body Fat %"
                                      ? value * 3
                                      : measurement.name === "Weight"
                                        ? (value - 170) * 2
                                        : (value - 130) * 2
                                  }px`,
                                }}
                              ></div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Goal: {measurement.goal}</span>
                            <span>{measurement.goalProgress}% complete</span>
                          </div>
                          <Progress value={measurement.goalProgress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Body Measurements</CardTitle>
                  <CardDescription>Circumference measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bodyData.circumferences.map((item, index) => (
                      <div key={index} className="p-3 rounded-md bg-muted/20">
                        <div className="flex justify-between">
                          <span className="font-medium">{item.name}</span>
                          <span className="font-bold">{item.current}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Previous: {item.previous}</span>
                          <span
                            className={`${
                              item.name === "Waist" || item.name === "Hips" ? "text-green-600" : "text-blue-600"
                            }`}
                          >
                            {item.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Advanced Tab (Legend tier only) */}
        {userPlan === "legend" && (
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Muscle Balance Analysis</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                    >
                      Legend Feature
                    </Badge>
                  </div>
                  <CardDescription>Analyze your muscular development balance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-3 bg-muted/20 rounded-md text-center">
                        <div className="text-sm font-medium mb-1">Upper/Lower</div>
                        <div className="text-2xl font-bold">0%</div>
                        <Progress value={0} className="h-2 mt-2" />
                      </div>
                      <div className="p-3 bg-muted/20 rounded-md text-center">
                        <div className="text-sm font-medium mb-1">Left/Right</div>
                        <div className="text-2xl font-bold">0%</div>
                        <Progress value={0} className="h-2 mt-2" />
                      </div>
                      <div className="p-3 bg-muted/20 rounded-md text-center">
                        <div className="text-sm font-medium mb-1">Push/Pull</div>
                        <div className="text-2xl font-bold">0%</div>
                        <Progress value={0} className="h-2 mt-2" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Muscle Group Development</h4>
                      <div className="space-y-2">{[]}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recovery Metrics</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                    >
                      Legend Feature
                    </Badge>
                  </div>
                  <CardDescription>Track your recovery and readiness to train</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-24 w-24 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-500">0%</div>
                        <div className="text-xs text-muted-foreground">Recovery Score</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Sleep Quality</span>
                        <span>0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Average: 0</span>
                        <span>Target: 8h</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Readiness Trend</span>
                      </div>
                      <div className="h-[60px] bg-muted/20 rounded-md flex items-end p-2 gap-1">{[]}</div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Heart Rate Variability</span>
                      </div>
                      <div className="h-[60px] bg-muted/20 rounded-md flex items-end p-2 gap-1">{[]}</div>
                      <div className="text-xs text-muted-foreground text-center mt-1">
                        Higher HRV indicates better recovery
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Nutrition Impact Analysis</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                    >
                      Legend Feature
                    </Badge>
                  </div>
                  <CardDescription>How nutrition affects your performance and recovery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2 text-sm">Performance Impact</h4>
                        <div className="space-y-2">{[]}</div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-sm">Recovery Impact</h4>
                        <div className="space-y-2">{[]}</div>
                      </div>
                    </div>

                    <div className="p-3 bg-muted/20 rounded-md">
                      <h4 className="font-medium mb-2">Key Insights</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Hydration has the strongest impact on both performance and recovery</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Protein intake correlates strongly with strength gains</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Consider increasing carb intake on high-intensity training days</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Training Distribution</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                    >
                      Legend Feature
                    </Badge>
                  </div>
                  <CardDescription>Analyze your workout patterns and focus areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-sm text-center">Workout Types</h4>
                      <div className="flex flex-col items-center">
                        <div className="h-[150px] w-[150px] rounded-full bg-muted/20 flex items-center justify-center mb-4">
                          <PieChart className="h-24 w-24 text-muted-foreground" />
                        </div>
                        <div className="space-y-1 w-full">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                            <span className="text-xs">Strength (45%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span className="text-xs">Cardio (25%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-xs">HIIT (15%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                            <span className="text-xs">Flexibility (10%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                            <span className="text-xs">Other (5%)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 text-sm text-center">Muscle Group Focus</h4>
                      <div className="flex flex-col items-center">
                        <div className="h-[150px] w-[150px] rounded-full bg-muted/20 flex items-center justify-center mb-4">
                          <BarChart className="h-24 w-24 text-muted-foreground" />
                        </div>
                        <div className="space-y-1 w-full">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span className="text-xs">Chest (22%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span className="text-xs">Back (20%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-xs">Legs (18%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                            <span className="text-xs">Shoulders (15%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                            <span className="text-xs">Arms (15%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                            <span className="text-xs">Core (10%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {/* Predictive Tab (Legend tier only) */}
        {userPlan === "legend" && (
          <TabsContent value="predictive" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>AI Performance Projections</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                    >
                      Legend Feature
                    </Badge>
                  </div>
                  <CardDescription>AI-powered predictions for your future performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">AI Prediction Engine</div>
                        <div className="text-sm text-muted-foreground">Based on your training history and patterns</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Projected Personal Records</h4>
                      <div className="space-y-3">{[]}</div>
                    </div>

                    <div className="p-3 bg-muted/20 rounded-md">
                      <h4 className="font-medium mb-2">Optimization Suggestions</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Increase squat frequency to 2x per week for faster progress</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Add 2 more sets to your bench press routine for optimal growth</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Incorporate more posterior chain exercises for balanced development</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Plateau Risk Analysis</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                    >
                      Legend Feature
                    </Badge>
                  </div>
                  <CardDescription>Identify and prevent potential training plateaus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center mb-4">
                      <div className="h-24 w-24 rounded-full bg-green-500/10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-500">Low Risk</div>
                          <div className="text-xs text-muted-foreground">Plateau Potential</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Risk Factors</h4>
                      <div className="space-y-3">{[]}</div>
                    </div>

                    <div className="p-3 bg-muted/20 rounded-md">
                      <h4 className="font-medium mb-2">Plateau Prevention Strategies</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Implement progressive overload by increasing weight or reps every 1-2 weeks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Vary your training with different rep ranges and exercise variations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Schedule deload weeks every 4-6 weeks to prevent overtraining</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Focus on improving sleep quality to enhance recovery</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Long-Term Projection</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                    >
                      Legend Feature
                    </Badge>
                  </div>
                  <CardDescription>AI-powered long-term fitness trajectory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] bg-muted/20 rounded-md p-4 flex items-center justify-center">
                    <LineChart className="h-32 w-32 text-muted-foreground" />
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-muted/20 rounded-md">
                      <h4 className="font-medium mb-2 text-center">3-Month Projection</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Strength</span>
                          <span className="text-green-600">+8-10%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Muscle Mass</span>
                          <span className="text-green-600">+3-4 lbs</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Body Fat</span>
                          <span className="text-green-600">-1-2%</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-md">
                      <h4 className="font-medium mb-2 text-center">6-Month Projection</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Strength</span>
                          <span className="text-green-600">+15-18%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Muscle Mass</span>
                          <span className="text-green-600">+6-8 lbs</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Body Fat</span>
                          <span className="text-green-600">-3-4%</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-md">
                      <h4 className="font-medium mb-2 text-center">12-Month Projection</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Strength</span>
                          <span className="text-green-600">+25-30%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Muscle Mass</span>
                          <span className="text-green-600">+10-12 lbs</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Body Fat</span>
                          <span className="text-green-600">-5-7%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Generate Custom Long-Term Plan
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* Upgrade Banner for Warrior users */}
      {userPlan === "warrior" && (
        <Card className="mt-6 border-dashed border-amber-300 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <Crown className="h-6 w-6 text-amber-800 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Upgrade to Legend Plan</h3>
                <p className="text-muted-foreground">Get access to advanced analytics, AI predictions, and more</p>
              </div>
            </div>
            <Button
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
              asChild
            >
              <Link href="/premium">Upgrade Now</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

