"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Utensils,
  Weight,
  CalendarDays,
  ChevronLeft,
  Dumbbell,
  Activity,
  CheckCircle,
  XCircle,
  Edit,
  FileText,
  Plus,
  Camera,
} from "lucide-react"
import Link from "next/link"
import { useTrainerAuth } from "@/contexts/trainer-auth-context"
import { TrainerNav } from "@/components/trainer-nav"

export default function ClientDetailPage() {
  const router = useRouter()
  const params = useParams()
  const clientId = params.id as string
  const { trainer, isLoading, isAuthenticated } = useTrainerAuth()
  const [client, setClient] = useState<any>(null)
  const [clientLoading, setClientLoading] = useState(true)

  useEffect(() => {
    // Check if trainer is logged in
    if (!isLoading && !isAuthenticated) {
      router.push("/trainer-login")
      return
    }

    // Load client data
    const loadClientData = async () => {
      // In a real app, this would be an API call to get specific client data
      // For demo, we'll use mock data
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      // This is the same client data from the trainer portal page
      const mockClient = {
        id: "client1",
        name: "John Smith",
        plan: "12-Week Strength Program",
        nextSession: "Today, 3:00 PM",
        progress: 68,
        image: "/placeholder.svg?height=100&width=100",
        lastActive: "2 hours ago",
        goal: "Muscle gain",
        memberSince: "3 months ago",
        status: "active",
        stats: {
          workoutsCompleted: 42,
          averageRating: 4.8,
          missedSessions: 2,
          bodyFat: {
            current: 18,
            previous: 20,
            change: -2,
          },
          weight: {
            current: 185,
            previous: 190,
            change: -5,
            unit: "lbs",
          },
          muscle: {
            current: 42,
            previous: 40,
            change: 2,
            unit: "%",
          },
        },
        workouts: [
          {
            id: "w1",
            date: "2023-03-10",
            name: "Upper Body Strength",
            completed: true,
            performance: 95,
            feedback: "Great form on bench press, increased weight by 10lbs",
            exercises: [
              { name: "Bench Press", sets: 4, reps: "8,8,6,6", weight: "185,185,195,195" },
              { name: "Pull-ups", sets: 3, reps: "10,8,8", weight: "BW" },
              { name: "Shoulder Press", sets: 3, reps: "10,10,8", weight: "65,65,70" },
              { name: "Barbell Rows", sets: 3, reps: "12,12,10", weight: "135,135,145" },
            ],
          },
          {
            id: "w2",
            date: "2023-03-08",
            name: "Leg Day",
            completed: true,
            performance: 88,
            feedback: "Good session, but form needs work on Romanian deadlifts",
            exercises: [
              { name: "Squats", sets: 4, reps: "10,10,8,8", weight: "225,225,235,235" },
              { name: "Romanian Deadlifts", sets: 3, reps: "12,12,10", weight: "185,185,195" },
              { name: "Leg Press", sets: 3, reps: "15,12,12", weight: "360,380,380" },
              { name: "Calf Raises", sets: 4, reps: "20,20,18,18", weight: "120,120,130,130" },
            ],
          },
          {
            id: "w3",
            date: "2023-03-12",
            name: "HIIT Cardio",
            completed: false,
            performance: 0,
            feedback: "",
            exercises: [
              { name: "Sprints", sets: 10, reps: "30s", weight: "30s rest" },
              { name: "Burpees", sets: 3, reps: "15", weight: "BW" },
              { name: "Mountain Climbers", sets: 3, reps: "30s", weight: "BW" },
              { name: "Jump Rope", sets: 3, reps: "60s", weight: "BW" },
            ],
          },
        ],
        nutrition: {
          plan: "High Protein, Moderate Carb",
          dailyCalories: 2800,
          macros: {
            protein: { target: 220, unit: "g" },
            carbs: { target: 280, unit: "g" },
            fats: { target: 80, unit: "g" },
          },
          mealLogs: [
            {
              date: "2023-03-10",
              meals: [
                {
                  type: "Breakfast",
                  foods: ["Protein Oatmeal", "Banana", "Greek Yogurt"],
                  calories: 650,
                  protein: 45,
                  carbs: 80,
                  fats: 15,
                  completed: true,
                },
                {
                  type: "Lunch",
                  foods: ["Grilled Chicken Salad", "Quinoa", "Avocado"],
                  calories: 750,
                  protein: 55,
                  carbs: 60,
                  fats: 30,
                  completed: true,
                },
                {
                  type: "Dinner",
                  foods: ["Salmon", "Sweet Potato", "Broccoli"],
                  calories: 820,
                  protein: 50,
                  carbs: 70,
                  fats: 35,
                  completed: true,
                },
                {
                  type: "Snack",
                  foods: ["Protein Shake", "Almonds"],
                  calories: 380,
                  protein: 35,
                  carbs: 15,
                  fats: 18,
                  completed: true,
                },
              ],
              totalCalories: 2600,
              totalProtein: 185,
              totalCarbs: 225,
              totalFats: 98,
              waterIntake: 3.2,
              adherence: 92,
            },
            {
              date: "2023-03-09",
              meals: [
                {
                  type: "Breakfast",
                  foods: ["Eggs", "Toast", "Avocado"],
                  calories: 580,
                  protein: 35,
                  carbs: 45,
                  fats: 25,
                  completed: true,
                },
                {
                  type: "Lunch",
                  foods: ["Turkey Wrap", "Apple", "Protein Bar"],
                  calories: 680,
                  protein: 48,
                  carbs: 75,
                  fats: 20,
                  completed: true,
                },
                {
                  type: "Dinner",
                  foods: ["Steak", "Rice", "Asparagus"],
                  calories: 850,
                  protein: 60,
                  carbs: 65,
                  fats: 30,
                  completed: true,
                },
                {
                  type: "Snack",
                  foods: ["Cottage Cheese", "Berries"],
                  calories: 320,
                  protein: 28,
                  carbs: 20,
                  fats: 10,
                  completed: true,
                },
              ],
              totalCalories: 2430,
              totalProtein: 171,
              totalCarbs: 205,
              totalFats: 85,
              waterIntake: 2.8,
              adherence: 87,
            },
          ],
          notes:
            "Client struggles with evening snacking. Recommended protein-rich evening snacks to help with satiety.",
        },
        measurements: {
          history: [
            {
              date: "2023-03-01",
              weight: 190,
              bodyFat: 20,
              chest: 42,
              waist: 34,
              hips: 40,
              arms: 15.5,
              thighs: 24,
            },
            {
              date: "2023-02-15",
              weight: 192,
              bodyFat: 20.5,
              chest: 41.5,
              waist: 34.5,
              hips: 40.5,
              arms: 15.2,
              thighs: 23.8,
            },
            {
              date: "2023-02-01",
              weight: 195,
              bodyFat: 21,
              chest: 41,
              waist: 35,
              hips: 41,
              arms: 15,
              thighs: 23.5,
            },
          ],
        },
        notes: [
          {
            id: "note1",
            date: "2023-03-08",
            content:
              "John is making excellent progress on his strength goals. Bench press has increased by 15 lbs in the last month.",
            type: "progress",
          },
          {
            id: "note2",
            date: "2023-03-05",
            content:
              "Discussed nutrition plan adjustments. Increasing protein intake to 220g daily and adjusting carb timing around workouts.",
            type: "nutrition",
          },
          {
            id: "note3",
            date: "2023-02-28",
            content:
              "Left knee discomfort during squats. Modified program to include more leg press and reduce squat volume temporarily.",
            type: "injury",
          },
        ],
      }

      setClient(mockClient)
      setClientLoading(false)
    }

    if (isAuthenticated) {
      loadClientData()
    }
  }, [isLoading, isAuthenticated, router, clientId])

  if (isLoading || clientLoading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading client details...</p>
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Client Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The client you're looking for doesn't exist or you don't have access.
          </p>
          <Button asChild>
            <Link href="/trainer-portal/clients">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Clients
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden md:block border-r pr-6">
          <TrainerNav />
        </aside>

        <main>
          <div className="mb-6">
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link href="/trainer-portal/clients">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Clients
              </Link>
            </Button>

            <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/20">
                      <AvatarImage src={client.image} alt={client.name} />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{client.name}</CardTitle>
                        <Badge variant={client.status === "active" ? "default" : "secondary"} className="ml-2">
                          {client.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {client.goal} • Member since {client.memberSince}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/messages?client=${client.id}`}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Link>
                    </Button>
                    <Button size="sm">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Workout Stats</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Completed</span>
                      <span className="font-medium">{client.stats.workoutsCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Missed</span>
                      <span className="font-medium">{client.stats.missedSessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Next Session</span>
                      <span className="font-medium">{client.nextSession}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Weight className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Body Composition</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Weight</span>
                      <div className="flex items-center">
                        <span className="font-medium">
                          {client.stats.weight?.current} {client.stats.weight?.unit}
                        </span>
                        {client.stats.weight?.change !== 0 && (
                          <span
                            className={`ml-1 text-xs flex items-center ${
                              client.stats.weight?.change < 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {client.stats.weight?.change < 0 ? (
                              <ArrowDownRight className="h-3 w-3" />
                            ) : (
                              <ArrowUpRight className="h-3 w-3" />
                            )}
                            {Math.abs(client.stats.weight?.change)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Body Fat</span>
                      <div className="flex items-center">
                        <span className="font-medium">{client.stats.bodyFat?.current}%</span>
                        {client.stats.bodyFat?.change !== 0 && (
                          <span
                            className={`ml-1 text-xs flex items-center ${
                              client.stats.bodyFat?.change < 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {client.stats.bodyFat?.change < 0 ? (
                              <ArrowDownRight className="h-3 w-3" />
                            ) : (
                              <ArrowUpRight className="h-3 w-3" />
                            )}
                            {Math.abs(client.stats.bodyFat?.change)}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Muscle Mass</span>
                      <div className="flex items-center">
                        <span className="font-medium">
                          {client.stats.muscle?.current}
                          {client.stats.muscle?.unit}
                        </span>
                        {client.stats.muscle?.change !== 0 && (
                          <span
                            className={`ml-1 text-xs flex items-center ${
                              client.stats.muscle?.change > 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {client.stats.muscle?.change > 0 ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {Math.abs(client.stats.muscle?.change)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Utensils className="h-5 w-5 text-orange-500" />
                    <h3 className="font-medium">Nutrition</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Plan</span>
                      <span className="font-medium">{client.nutrition?.plan || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Daily Calories</span>
                      <span className="font-medium">{client.nutrition?.dailyCalories || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Adherence</span>
                      <span className="font-medium">{client.nutrition?.mealLogs?.[0]?.adherence || 0}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-purple-500" />
                  <h3 className="font-medium">Program Progress</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{client.plan}</span>
                      <span className="font-medium">{client.progress}% complete</span>
                    </div>
                    <Progress value={client.progress} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-pink-500" />
                    <h3 className="font-medium">Recent Notes</h3>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {client.notes?.slice(0, 2).map((note: any) => (
                      <div key={note.id} className="text-sm border-l-2 border-pink-500 pl-3 py-1">
                        <p className="text-muted-foreground text-xs">{note.date}</p>
                        <p>{note.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDays className="h-5 w-5 text-cyan-500" />
                    <h3 className="font-medium">Recent Activity</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Completed {client.workouts?.[0]?.name} workout</span>
                      <span className="text-xs text-muted-foreground ml-auto">{client.workouts?.[0]?.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Logged all meals</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {client.nutrition?.mealLogs?.[0]?.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span>Missed {client.workouts?.[2]?.name} workout</span>
                      <span className="text-xs text-muted-foreground ml-auto">{client.workouts?.[2]?.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="workouts" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Workout Program</CardTitle>
                      <CardDescription>{client.plan}</CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Workout
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {client.workouts?.map((workout: any) => (
                    <div key={workout.id} className="border rounded-lg overflow-hidden">
                      <div
                        className={`p-4 flex justify-between items-center ${
                          workout.completed ? "bg-green-50 dark:bg-green-950" : "bg-muted"
                        }`}
                      >
                        <div>
                          <h3 className="font-medium">{workout.name}</h3>
                          <div className="text-sm text-muted-foreground">{workout.date}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {workout.completed ? (
                            <>
                              <Badge variant="success" className="bg-green-500">
                                Completed
                              </Badge>
                              <span className="text-sm font-medium">{workout.performance}% performance</span>
                            </>
                          ) : (
                            <Badge variant="outline">Scheduled</Badge>
                          )}
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Exercises</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {workout.exercises.map((exercise: any, index: number) => (
                              <div key={index} className="text-sm border rounded-md p-3">
                                <div className="font-medium">{exercise.name}</div>
                                <div className="text-muted-foreground">
                                  {exercise.sets} sets × {exercise.reps} reps @ {exercise.weight}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {workout.completed && workout.feedback && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Feedback</h4>
                            <p className="text-sm bg-muted p-3 rounded-md">{workout.feedback}</p>
                          </div>
                        )}
                        {!workout.completed && (
                          <div className="flex justify-end mt-4">
                            <Button size="sm">Mark as Completed</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-4">
              {/* Nutrition tab content would go here */}
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Body Measurements</CardTitle>
                      <CardDescription>Track client's physical progress</CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Measurement
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="text-sm font-medium mb-4">Measurement History</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left pb-2">Date</th>
                              <th className="text-left pb-2">Weight</th>
                              <th className="text-left pb-2">Body Fat</th>
                              <th className="text-left pb-2">Chest</th>
                              <th className="text-left pb-2">Waist</th>
                              <th className="text-left pb-2">Hips</th>
                              <th className="text-left pb-2">Arms</th>
                              <th className="text-left pb-2">Thighs</th>
                            </tr>
                          </thead>
                          <tbody>
                            {client.measurements?.history.map((measurement: any, index: number) => (
                              <tr key={index} className="border-b last:border-0">
                                <td className="py-3">{measurement.date}</td>
                                <td className="py-3">{measurement.weight} lbs</td>
                                <td className="py-3">{measurement.bodyFat}%</td>
                                <td className="py-3">{measurement.chest}"</td>
                                <td className="py-3">{measurement.waist}"</td>
                                <td className="py-3">{measurement.hips}"</td>
                                <td className="py-3">{measurement.arms}"</td>
                                <td className="py-3">{measurement.thighs}"</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-4">Progress Photos</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div key={index} className="aspect-square rounded-md overflow-hidden bg-muted relative group">
                            <img
                              src={`/placeholder.svg?height=200&width=200&text=Progress+Photo+${index + 1}`}
                              alt={`Progress photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button size="sm" variant="secondary">
                                <Camera className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Button variant="outline">Request New Photos</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              {/* Notes tab content would go here */}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

