"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Clock, Dumbbell, Flame, Play, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { workouts, exercises, type Workout, type Exercise } from "@/data/workout-library"

export default function WorkoutDetailPage() {
  const params = useParams()
  const router = useRouter()
  const workoutId = params?.id as string
  const [workout, setWorkout] = useState<Workout | null>(null)
  const [workoutExercises, setWorkoutExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWorkout = () => {
      try {
        setLoading(true)
        setError(null)

        console.log("Fetching workout with ID:", workoutId)
        console.log(
          "Available workout IDs:",
          workouts.map((w) => w.id),
        )

        // Find the workout by ID
        const foundWorkout = workouts.find((w) => w.id === workoutId)

        if (!foundWorkout) {
          setError("Workout not found")
          setLoading(false)
          return
        }

        setWorkout(foundWorkout)

        // Get the exercises for this workout
        const workoutExerciseDetails = foundWorkout.exercises
          .map((ex) => {
            const exerciseDetail = exercises.find((e) => e.id === ex.exerciseId)
            return exerciseDetail || null
          })
          .filter(Boolean) as Exercise[]

        setWorkoutExercises(workoutExerciseDetails)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching workout:", error)
        setError(error instanceof Error ? error.message : "Failed to load workout details")
        setLoading(false)
      }
    }

    if (workoutId) {
      fetchWorkout()
    }
  }, [workoutId])

  const startWorkout = () => {
    if (workout) {
      router.push(`/workouts/${workout.id}/active`)
    }
  }

  if (loading) {
    return (
      <div className="container py-6">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          <div className="h-8 w-64 bg-muted rounded animate-pulse"></div>
          <Card>
            <CardContent className="p-6">
              <div className="h-6 w-full bg-muted rounded animate-pulse mb-4"></div>
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse mb-2"></div>
              <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error || !workout) {
    return (
      <div className="container py-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">Workout Not Found</h2>
              <p className="text-muted-foreground mb-4">
                {typeof error === "string"
                  ? error
                  : "The workout you're looking for doesn't exist or has been removed."}
              </p>
              <Button asChild>
                <Link href="/workouts">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Workouts
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link href="/workouts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{workout.name}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge>{workout.difficulty}</Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {workout.duration}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Flame className="h-3 w-3" />
              {workout.caloriesBurn} calories
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Dumbbell className="h-3 w-3" />
              {workout.equipment.includes("none") ? "No Equipment" : workout.equipment.join(", ")}
            </Badge>
          </div>
          <p className="text-muted-foreground">{workout.description}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Workout Overview</CardTitle>
            <CardDescription>This workout targets: {workout.targetMuscleGroups.join(", ")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Equipment Needed</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {workout.equipment.map((item, index) => (
                    <li key={index}>{item === "none" ? "No equipment required" : item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Workout Stats</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{workout.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span>{workout.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Calories:</span>
                    <span>{workout.caloriesBurn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exercises:</span>
                    <span>{workout.exercises.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={startWorkout}>
              <Play className="mr-2 h-4 w-4" />
              Start Workout
            </Button>
          </CardFooter>
        </Card>

        <Tabs defaultValue="exercises">
          <TabsList className="mb-4">
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
          </TabsList>

          <TabsContent value="exercises">
            <div className="space-y-4">
              {workout.exercises.map((ex, index) => {
                const exerciseDetail = workoutExercises.find((e) => e.id === ex.exerciseId)

                return (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/4 aspect-video bg-muted rounded-md flex items-center justify-center">
                          {exerciseDetail?.imageUrl ? (
                            <img
                              src={exerciseDetail.imageUrl || "/placeholder.svg"}
                              alt={exerciseDetail.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <Dumbbell className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">
                            {index + 1}. {exerciseDetail?.name || `Exercise ${index + 1}`}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="outline">{ex.sets} sets</Badge>
                            <Badge variant="outline">{ex.reps} reps</Badge>
                            {ex.restTime && <Badge variant="outline">Rest: {ex.restTime}</Badge>}
                          </div>
                          {exerciseDetail?.targetMuscle && (
                            <p className="text-sm text-muted-foreground">
                              Target muscles: {exerciseDetail.targetMuscle.join(", ")}
                            </p>
                          )}
                          {ex.notes && <p className="text-sm mt-2 italic">{ex.notes}</p>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="instructions">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">How to do this workout</h3>
                <ol className="list-decimal list-inside space-y-4">
                  <li>
                    <span className="font-medium">Warm up</span>
                    <p className="ml-6 text-sm text-muted-foreground">
                      Start with 5-10 minutes of light cardio and dynamic stretching to prepare your body.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Complete each exercise</span>
                    <p className="ml-6 text-sm text-muted-foreground">
                      Perform the exercises in order, completing all sets of each exercise before moving to the next.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Rest periods</span>
                    <p className="ml-6 text-sm text-muted-foreground">
                      Follow the recommended rest periods between sets. If none is specified, rest 60-90 seconds.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Proper form</span>
                    <p className="ml-6 text-sm text-muted-foreground">
                      Focus on maintaining proper form throughout each exercise. Reduce weight if needed.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Cool down</span>
                    <p className="ml-6 text-sm text-muted-foreground">
                      Finish with 5-10 minutes of light cardio and static stretching to aid recovery.
                    </p>
                  </li>
                </ol>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="font-medium">Tips for success</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Stay hydrated throughout your workout</li>
                    <li>Adjust weights or reps as needed based on your fitness level</li>
                    <li>Track your progress to see improvements over time</li>
                    <li>Listen to your body and avoid pushing through pain (not to be confused with discomfort)</li>
                    <li>Consistency is key - aim to complete this workout 2-3 times per week</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

