"use client"

import { CardFooter } from "@/components/ui/card"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { StreakCalendar } from "@/components/dashboard/streak-calendar"
import { BodyCompositionSummary } from "@/components/body-composition/profile-summary"
import {
  Dumbbell,
  Flame,
  Trophy,
  ArrowRight,
  Utensils,
  Activity,
  Target,
  Zap,
  BarChart3,
  Calendar,
  Camera,
  Crown,
  ChevronRight,
  Brain,
  Users,
  Shield,
  LineChart,
  TrendingUp,
  Lock,
  User,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { WeeklyReportModal } from "@/components/dashboard/weekly-report-modal"
import { StartWorkoutModal } from "@/components/dashboard/start-workout-modal"
import { useRouter } from "next/navigation"
import { NewGoalsModal } from "@/components/dashboard/new-goals-modal"
import { getCurrentSession } from "@/lib/supabaseClient"

// Subscription plan types
type SubscriptionPlan = "rookie" | "contender" | "warrior" | "legend"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState("User")
  const [activeTab, setActiveTab] = useState("overview")
  const [weeklyReportOpen, setWeeklyReportOpen] = useState(false)
  const [startWorkoutOpen, setStartWorkoutOpen] = useState(false)
  const router = useRouter()
  const [newGoalsOpen, setNewGoalsOpen] = useState(false)

  // In a real app, this would come from your auth context or API
  const [userPlan, setUserPlan] = useState<SubscriptionPlan>("rookie")

  // Check if user is logged in on client side
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Add this near the other state declarations
  const [userStats, setUserStats] = useState({
    workouts: 0,
    calories: 0,
    heartRate: null,
    achievements: 0,
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      const hasAuthToken = localStorage.getItem("authToken")
      const hasCookieToken = document.cookie.includes("authToken=")

      if (!(hasAuthToken || hasCookieToken)) {
        // Redirect to login if not authenticated
        window.location.href = "/login"
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    // Check if there's a token in localStorage or cookie
    const token = localStorage.getItem("authToken") || document.cookie.includes("authToken")
    const checkAuth = async () => {
      try {
        const session = await getCurrentSession()
        setIsLoggedIn(!!session)

        // If user is logged in but has no data yet, ensure we show empty states
        if (session) {
          // Reset any demo data for actual logged in users
          setUserStats({
            workouts: 0,
            calories: 0,
            heartRate: null,
            achievements: 0,
          })
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        setIsLoggedIn(false)
      }
    }

    checkAuth()
  }, [])

  // For demo purposes - toggle between subscription levels
  const cyclePlan = () => {
    const plans: SubscriptionPlan[] = ["rookie", "contender", "warrior", "legend"]
    const currentIndex = plans.indexOf(userPlan)
    const nextIndex = (currentIndex + 1) % plans.length
    setUserPlan(plans[nextIndex])
  }

  // Get plan details based on current plan
  const getPlanDetails = () => {
    switch (userPlan) {
      case "rookie":
        return {
          name: "Rookie",
          color: "gray",
          icon: Shield,
          features: [],
        }
      case "contender":
        return {
          name: "Contender",
          color: "bronze",
          icon: Dumbbell,
          features: ["Weekly Challenges", "Basic Workout Library"],
        }
      case "warrior":
        return {
          name: "Warrior",
          color: "silver",
          icon: Flame,
          features: [
            "Custom Challenges",
            "Advanced Nutrition Tools",
            "Basic Body Composition Analysis",
            "Performance Tracking",
          ],
        }
      case "legend":
        return {
          name: "Legend",
          color: "gold",
          icon: Crown,
          features: [
            "AI Fitness Assistant",
            "Premium Body Composition Analysis",
            "Global Challenges",
            "Advanced Performance Analytics",
          ],
        }
      default:
        return {
          name: "Rookie",
          color: "gray",
          icon: Shield,
          features: [],
        }
    }
  }

  const planDetails = getPlanDetails()

  // Featured tools based on subscription plan
  const getFeaturedTools = () => {
    const baseTools = [
      {
        id: "workout-generator",
        title: "Workout Generator",
        description: "Create personalized workout routines",
        icon: Dumbbell,
        link: "/workouts",
        buttonText: "Create Workout",
        minPlan: "contender",
      },
    ]

    const advancedTools = [
      {
        id: "body-scanner",
        title: "AI Body Composition Scanner",
        description: "Track your physique changes with AI-powered analysis",
        icon: Camera,
        link: "/body-composition",
        buttonText: "Try 2D2N AI Scanner",
        highlight: true,
        minPlan: "warrior",
      },
      {
        id: "nutrition-planner",
        title: "Nutrition Planner",
        description: "Get personalized meal plans and macro tracking",
        icon: Utensils,
        link: "/nutrition",
        buttonText: "Plan Your Meals",
        minPlan: "contender",
      },
      {
        id: "workout-battles",
        title: "Workout Battles",
        description: "Challenge friends and compete in real-time",
        icon: Users,
        link: "/workout-battles",
        buttonText: "Start a Battle",
        minPlan: "contender",
      },
      {
        id: "ai-assistant",
        title: "AI Fitness Assistant",
        description: "Get personalized advice from our AI coach",
        icon: Brain,
        link: "/fitness-ai",
        buttonText: "Talk to Your Coach",
        highlight: true,
        minPlan: "legend",
      },
    ]

    // Filter tools based on user's plan
    const planRanking = {
      rookie: 0,
      contender: 1,
      warrior: 2,
      legend: 3,
    }

    const userRank = planRanking[userPlan]

    return [...baseTools, ...advancedTools.filter((tool) => planRanking[tool.minPlan as SubscriptionPlan] <= userRank)]
  }

  const featuredTools = getFeaturedTools()

  // Get locked premium features to show for upsell
  const getLockedFeatures = () => {
    const allFeatures = [
      {
        id: "performance-tracking",
        title: "Performance Analytics",
        description: "Track detailed metrics and visualize your progress over time",
        icon: LineChart,
        minPlan: "warrior",
      },
      {
        id: "body-scanner",
        title: "AI Body Composition Scanner",
        description: "Track your physique changes with AI-powered analysis",
        icon: Camera,
        minPlan: "warrior",
      },
      {
        id: "ai-assistant",
        title: "AI Fitness Assistant",
        description: "Get personalized advice from our AI coach",
        icon: Brain,
        minPlan: "legend",
      },
      {
        id: "advanced-analytics",
        title: "Advanced Analytics",
        description: "Predictive analysis and detailed performance insights",
        icon: TrendingUp,
        minPlan: "legend",
      },
    ]

    // Filter features that are locked for current user
    const planRanking = {
      rookie: 0,
      contender: 1,
      warrior: 2,
      legend: 3,
    }

    const userRank = planRanking[userPlan]

    return allFeatures.filter((feature) => planRanking[feature.minPlan as SubscriptionPlan] > userRank).slice(0, 3)
  }

  const lockedFeatures = getLockedFeatures()

  // Navigate to performance tracking
  const goToPerformanceTracking = () => {
    router.push("/performance-tracking")
  }

  if (isLoading) {
    return (
      <div className="container py-6 max-w-6xl flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="container py-6 max-w-6xl">
      {isLoggedIn && (
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle>Welcome to 2ND2NONE!</CardTitle>
            <CardDescription>Your fitness journey starts here</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="space-y-4">
              <p>
                Thanks for joining! This is your personal dashboard where you'll track your progress and manage your
                fitness journey.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" asChild>
                  <Link href="/workouts">
                    <Dumbbell className="h-4 w-4 mr-2" />
                    Browse Workouts
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/profile">
                    <span>Complete Your Profile</span>
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {username}</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your fitness journey today.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
            onClick={() => setStartWorkoutOpen(true)}
          >
            <Dumbbell className="h-4 w-4" />
            <span>Start Workout</span>
          </Button>
        </div>
      </div>

      {/* Subscription Plan Banner */}
      <Card className="mb-6 bg-gradient-to-r from-background to-muted/50 border border-muted">
        <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center 
            ${
              userPlan === "legend"
                ? "bg-amber-100 text-amber-800"
                : userPlan === "warrior"
                  ? "bg-slate-200 text-slate-800"
                  : userPlan === "contender"
                    ? "bg-amber-900/20 text-amber-800"
                    : "bg-gray-200 text-gray-800"
            }`}
            >
              {userPlan === "legend" && <Crown className="h-5 w-5" />}
              {userPlan === "warrior" && <Flame className="h-5 w-5" />}
              {userPlan === "contender" && <Dumbbell className="h-5 w-5" />}
              {userPlan === "rookie" && <Shield className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="font-medium">{planDetails.name} Plan</h3>
              <p className="text-sm text-muted-foreground">
                {userPlan === "rookie" ? "Free tier" : "Active subscription"}
              </p>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {/* This button is just for demo purposes - would be removed in production */}
            {!isLoggedIn && (
              <Button variant="outline" size="sm" onClick={cyclePlan} className="text-xs">
                Demo: Change Plan
              </Button>
            )}

            {userPlan !== "legend" && (
              <Button size="sm" className="gap-1 w-full sm:w-auto" asChild>
                <Link href="/premium">
                  <Crown className="h-3 w-3" />
                  <span>Upgrade Plan</span>
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Report & Start Workout Modals */}
      <WeeklyReportModal open={weeklyReportOpen} onOpenChange={setWeeklyReportOpen} />
      <StartWorkoutModal open={startWorkoutOpen} onOpenChange={setStartWorkoutOpen} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - Stats & Featured Tools */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Workouts Completed</CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0 days</div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0%</div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Tracking Preview for Warrior and Legend */}
          {(userPlan === "warrior" || userPlan === "legend") && (
            <Card className="overflow-hidden border-blue-200 dark:border-blue-800">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 w-full"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    <CardTitle>Performance Tracking Analytics</CardTitle>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                  >
                    {userPlan === "legend" ? "Legend" : "Warrior"} Feature
                  </Badge>
                </div>
                <CardDescription>
                  {userPlan === "legend"
                    ? "Advanced analytics and detailed performance metrics"
                    : "Track your progress and performance metrics"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Strength Progress</span>
                      <span className="text-green-600">
                        0% <TrendingUp className="h-3 w-3 inline" />
                      </span>
                    </div>
                    <div className="h-[60px] bg-muted/20 rounded-md flex items-end p-2 gap-1">
                      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((value, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end items-center">
                          <div
                            className={`w-full rounded-sm ${i === 11 ? "bg-green-500" : "bg-primary/80"}`}
                            style={{ height: `${value * 0.6}px` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Cardio Performance</span>
                      <span className="text-green-600">
                        0% <TrendingUp className="h-3 w-3 inline" />
                      </span>
                    </div>
                    <div className="h-[60px] bg-muted/20 rounded-md flex items-end p-2 gap-1">
                      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((value, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end items-center">
                          <div
                            className={`w-full rounded-sm ${i === 11 ? "bg-green-500" : "bg-blue-500/80"}`}
                            style={{ height: `${value * 0.6}px` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {userPlan === "legend" && (
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="p-2 bg-muted/20 rounded-md text-center">
                      <div className="text-sm font-medium">Recovery Score</div>
                      <div className="text-xl font-bold text-green-500">0%</div>
                    </div>
                    <div className="p-2 bg-muted/20 rounded-md text-center">
                      <div className="text-sm font-medium">Muscle Balance</div>
                      <div className="text-xl font-bold text-amber-500">0%</div>
                    </div>
                    <div className="p-2 bg-muted/20 rounded-md text-center">
                      <div className="text-sm font-medium">Training Load</div>
                      <div className="text-xl font-bold text-blue-500">Optimal</div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={goToPerformanceTracking}>
                  View Performance Analytics
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Featured Tools Section */}
          {featuredTools.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-md px-2 py-1 text-sm">
                      2D2N
                    </div>
                    <CardTitle>Featured Tools</CardTitle>
                  </div>
                </div>
                <CardDescription>Tools available with your {planDetails.name} plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredTools.map((tool) => (
                    <Card
                      key={tool.id}
                      className={`overflow-hidden ${tool.highlight ? "border-2 border-blue-500/20" : ""}`}
                    >
                      {tool.highlight && (
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 w-full"></div>
                      )}
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <tool.icon className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">{tool.title}</CardTitle>
                        </div>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button
                          asChild
                          className={`w-full ${
                            tool.highlight
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                              : "variant-outline"
                          }`}
                          variant={tool.highlight ? "default" : "outline"}
                        >
                          <Link href={tool.link} className="flex items-center justify-center gap-2">
                            <span>{tool.buttonText}</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Locked Premium Features (for upsell) */}
          {lockedFeatures.length > 0 && (
            <Card className="border-dashed border-muted-foreground/30">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <CardTitle>Premium Features</CardTitle>
                  </div>
                  <Button size="sm" className="gap-1" asChild>
                    <Link href="/premium">
                      <Crown className="h-3 w-3" />
                      <span>Upgrade</span>
                    </Link>
                  </Button>
                </div>
                <CardDescription>Unlock these features with a higher tier plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {lockedFeatures.map((feature) => (
                    <Card key={feature.id} className="bg-muted/30">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center mb-2">
                          <feature.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium mb-1">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{feature.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {feature.minPlan.charAt(0).toUpperCase() + feature.minPlan.slice(1)} Plan+
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Streak Calendar */}
          <StreakCalendar />
        </div>

        {/* Right Column - Body Composition & Upcoming Workouts */}
        <div className="space-y-6">
          {/* Body Composition Summary */}
          <BodyCompositionSummary enhanced={userPlan === "legend"} />

          {/* Find a Trainer Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">Looking for guidance?</h3>
                  <p className="text-sm text-muted-foreground">Find a personal trainer</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-blue-300 dark:border-blue-700" asChild>
                <Link href="/trainers">Find Trainers</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Workouts */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Workouts</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/workouts" className="flex items-center gap-1">
                    <span className="text-xs">View All</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
              <CardDescription>Your scheduled sessions</CardDescription>
            </CardHeader>
            <CardContent className="pb-1">
              <div className="space-y-4">
                {[].map((workout, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          "Strength" ? "bg-primary/10" : "Cardio" ? "bg-red-500/10" : "bg-blue-500/10"
                        }`}
                      >
                        <Dumbbell
                          className={`h-5 w-5 ${
                            "Strength" ? "text-primary" : "Cardio" ? "text-red-500" : "text-blue-500"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-medium"></div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <span></span>
                          <span>•</span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={"outline"}></Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setStartWorkoutOpen(true)}>
                Start a Workout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest workouts and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Dumbbell className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium"></h4>
                    <p className="text-sm text-muted-foreground">
                      Completed {i} day{i > 1 ? "s" : ""} ago
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Dumbbell className="h-4 w-4" />
                <span>Workout Library</span>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Trophy className="h-4 w-4" />
                <span>Achievements</span>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Welcome Card */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription>Your fitness journey is progressing well</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-primary" />
                    <span className="font-medium">0-day streak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Level 0 - Fitness Warrior</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span className="font-medium">0 XP this week</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/profile">View Profile</Link>
                  </Button>
                  <Button size="sm" className="gap-1" onClick={() => setStartWorkoutOpen(true)}>
                    <div>
                      Today's Workout <ArrowRight className="h-3 w-3" />
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nutrition Summary */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Nutrition Summary</CardTitle>
                  <CardDescription>Today's nutrition tracking</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/nutrition">
                    <Utensils className="h-4 w-4 mr-2" />
                    Log Meal
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Calories</span>
                    <span className="font-medium">0 / 0</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">0% of daily goal</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Protein</span>
                    <span className="font-medium">0g / 0g</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">0% of daily goal</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Carbs</span>
                    <span className="font-medium">0g / 0g</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">0% of daily goal</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fat</span>
                    <span className="font-medium">0g / 0g</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">0% of daily goal</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Activity */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Community Activity</CardTitle>
                  <CardDescription>Recent updates from your fitness network</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/community" className="flex items-center gap-1">
                    <span className="text-xs">View All</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-1">
              <div className="space-y-4">
                {[].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                      <img
                        src={"/placeholder.svg?height=40&width=40"}
                        alt={""}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div>
                        <span className="font-medium"></span>
                        <span className="text-muted-foreground"> </span>
                      </div>
                      <div className="text-sm font-medium"></div>
                      <div className="text-xs text-muted-foreground"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/community">View Community Feed</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>Monitor your fitness improvements over time</CardDescription>
            </CardHeader>
            <CardContent className="pb-1">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      Workout Volume
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Last 4 weeks</span>
                      <Badge variant="outline">0%</Badge>
                    </div>
                  </div>
                  <div className="h-[200px] bg-muted/20 rounded-md flex items-end p-4 gap-2">
                    {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((value, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end items-center">
                        <div className="w-full bg-primary/80 rounded-sm" style={{ height: `${value * 2}px` }}></div>
                        <span className="text-[10px] mt-1 text-muted-foreground">
                          {i % 4 === 0 ? `W${Math.floor(i / 4) + 1}` : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        Weight Tracking
                      </h3>
                      <Badge variant="outline" className="text-green-500 border-green-500">
                        0 lbs
                      </Badge>
                    </div>
                    <div className="h-[150px] bg-muted/20 rounded-md p-4">
                      {/* Weight chart would go here */}
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        Weight tracking chart
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        Strength Progress
                      </h3>
                      <Badge variant="outline" className="text-green-500 border-green-500">
                        0%
                      </Badge>
                    </div>
                    <div className="h-[150px] bg-muted/20 rounded-md p-4">
                      {/* Strength chart would go here */}
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        Strength progress chart
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Recent Personal Records</h3>
                  <div className="space-y-3">
                    {[].map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-md bg-muted/20">
                        <div>
                          <div className="font-medium"></div>
                          <div className="text-sm text-muted-foreground"></div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold"></div>
                          <div className="text-xs text-primary">Personal Record</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={goToPerformanceTracking}>
                View Performance Analytics
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fitness Goals</CardTitle>
              <CardDescription>Track your progress towards your goals</CardDescription>
            </CardHeader>
            <CardContent className="pb-1">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <div>
                      <h4 className="font-medium">Weight Loss</h4>
                      <p className="text-sm text-muted-foreground">Goal: Lose 0 lbs</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">0 lbs</p>
                      <p className="text-sm text-muted-foreground">0% complete</p>
                    </div>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <div>
                      <h4 className="font-medium">Running Distance</h4>
                      <p className="text-sm text-muted-foreground">Goal: 0 miles</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">0 miles</p>
                      <p className="text-sm text-muted-foreground">0% complete</p>
                    </div>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <div>
                      <h4 className="font-medium">Strength Training</h4>
                      <p className="text-sm text-muted-foreground">Goal: Bench press 0 lbs</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">0 lbs</p>
                      <p className="text-sm text-muted-foreground">0% complete</p>
                    </div>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <div>
                  <h3 className="font-medium mb-4">Upcoming Milestones</h3>
                  <div className="space-y-3">
                    {[].map((milestone, index) => (
                      <div key={index} className="p-3 rounded-md bg-muted/20">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium"></span>
                          <span className="text-sm text-muted-foreground">0 / 0</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setNewGoalsOpen(true)}>
                Set New Goals
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <NewGoalsModal open={newGoalsOpen} onOpenChange={setNewGoalsOpen} />
    </div>
  )
}

