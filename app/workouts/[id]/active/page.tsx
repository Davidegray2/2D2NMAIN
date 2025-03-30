"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  SkipForward,
  RotateCcw,
  CheckCircle,
  Timer,
  Volume2,
  VolumeX,
  Share2,
} from "lucide-react"
import { workouts, exercises, type Workout, type Exercise } from "@/data/workout-library"
import { Dumbbell } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ActiveWorkoutPage() {
  const params = useParams()
  const router = useRouter()
  const workoutId = params?.id as string

  const [workout, setWorkout] = useState<Workout | null>(null)
  const [workoutExercises, setWorkoutExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [isResting, setIsResting] = useState(false)
  const [restTimeRemaining, setRestTimeRemaining] = useState(60)
  const [isPaused, setIsPaused] = useState(false)
  const [workoutComplete, setWorkoutComplete] = useState(false)
  const [workoutTime, setWorkoutTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const workoutTimerRef = useRef<NodeJS.Timeout | null>(null)
  const restTimerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio for workout notifications
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/sounds/notification.mp3")
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Play sound effect
  const playSound = useCallback(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((err) => console.error("Error playing sound:", err))
    }
  }, [isMuted])

  // Load workout data
  const fetchWorkout = useCallback(() => {
    try {
      setLoading(true)
      setError(null)

      console.log("Fetching workout with ID:", workoutId)

      // Find the workout by ID
      const foundWorkout = workouts.find((w) => w.id === workoutId)

      if (!foundWorkout) {
        console.log("Workout not found, using fallback")
        // Use a fallback workout if the ID doesn't match
        const fallbackWorkout: Workout = {
          id: "fallback",
          name: "Full Body Workout",
          type: "strength",
          duration: "30 min",
          difficulty: "beginner",
          equipment: ["none"],
          targetMuscleGroups: ["full body"],
          caloriesBurn: 250,
          description: "A complete full-body workout that can be done at home with no equipment.",
          exercises: [
            { exerciseId: "ex-001", sets: 3, reps: 10, restTime: "30 sec" },
            { exerciseId: "ex-002", sets: 3, reps: 15, restTime: "30 sec" },
            { exerciseId: "ex-003", sets: 3, reps: "30 sec", restTime: "30 sec" },
            { exerciseId: "ex-011", sets: 3, reps: "30 sec", restTime: "30 sec" },
          ],
          imageUrl: "/placeholder.svg?height=300&width=500&text=Full+Body+Workout",
          tags: ["home", "beginner", "full body", "no equipment"],
        }

        setWorkout(fallbackWorkout)

        // Get the exercises for this workout
        const workoutExerciseDetails = fallbackWorkout.exercises
          .map((ex) => {
            const exerciseDetail = exercises.find((e) => e.id === ex.exerciseId)
            return exerciseDetail || null
          })
          .filter(Boolean) as Exercise[]

        setWorkoutExercises(workoutExerciseDetails)
      } else {
        console.log("Workout found:", foundWorkout.name)
        setWorkout(foundWorkout)

        // Get the exercises for this workout
        const workoutExerciseDetails = foundWorkout.exercises
          .map((ex) => {
            const exerciseDetail = exercises.find((e) => e.id === ex.exerciseId)
            return exerciseDetail || null
          })
          .filter(Boolean) as Exercise[]

        setWorkoutExercises(workoutExerciseDetails)
      }

      setLoading(false)
    } catch (error) {
      console.error("Error fetching workout:", error)
      // Convert error to string
      setError(error instanceof Error ? error.message : "Failed to load workout details")
      setLoading(false)
    }
  }, [workoutId])

  // Initialize workout
  useEffect(() => {
    if (workoutId) {
      fetchWorkout()
    }

    return () => {
      // Clean up all timers when component unmounts
      if (workoutTimerRef.current) clearInterval(workoutTimerRef.current)
      if (restTimerRef.current) clearInterval(restTimerRef.current)
    }
  }, [workoutId, fetchWorkout])

  // Handle workout timer
  useEffect(() => {
    // Clear any existing timer
    if (workoutTimerRef.current) {
      clearInterval(workoutTimerRef.current)
      workoutTimerRef.current = null
    }

    // Only start timer if workout is active and not paused
    if (!isPaused && !workoutComplete) {
      workoutTimerRef.current = setInterval(() => {
        setWorkoutTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (workoutTimerRef.current) {
        clearInterval(workoutTimerRef.current)
      }
    }
  }, [isPaused, workoutComplete])

  // Handle rest timer
  useEffect(() => {
    // Clear any existing timer
    if (restTimerRef.current) {
      clearInterval(restTimerRef.current)
      restTimerRef.current = null
    }

    // Only start rest timer if in rest period and not paused
    if (isResting && !isPaused) {
      restTimerRef.current = setInterval(() => {
        setRestTimeRemaining((prev) => {
          if (prev <= 1) {
            // Play sound when rest is complete
            playSound()

            // Clear interval
            if (restTimerRef.current) {
              clearInterval(restTimerRef.current)
              restTimerRef.current = null
            }

            // End rest period
            setIsResting(false)
            return 60 // Reset for next rest period
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (restTimerRef.current) {
        clearInterval(restTimerRef.current)
      }
    }
  }, [isResting, isPaused, playSound])

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Get current exercise
  const getCurrentExercise = () => {
    if (!workout || currentExerciseIndex >= workout.exercises.length) return null

    const exerciseData = workout.exercises[currentExerciseIndex]
    const exerciseDetails = workoutExercises.find((e) => e.id === exerciseData.exerciseId)

    return {
      ...exerciseData,
      details: exerciseDetails,
    }
  }

  // Calculate workout progress
  const calculateProgress = () => {
    if (!workout) return 0

    const totalSets = workout.exercises.reduce((acc, ex) => acc + ex.sets, 0)
    const completedExercises = workout.exercises.slice(0, currentExerciseIndex)
    const completedSets = completedExercises.reduce((acc, ex) => acc + ex.sets, 0) + (currentSet - 1)

    return Math.round((completedSets / totalSets) * 100)
  }

  // Handle completing a set
  const completeSet = () => {
    const currentExercise = workout?.exercises[currentExerciseIndex]
    if (!currentExercise) return

    // Play sound for set completion
    playSound()

    if (currentSet < currentExercise.sets) {
      // Move to next set and start rest period
      setCurrentSet((prev) => prev + 1)
      startRest()
    } else {
      // Move to next exercise
      if (currentExerciseIndex < workout!.exercises.length - 1) {
        setCurrentExerciseIndex((prev) => prev + 1)
        setCurrentSet(1)
        startRest()
      } else {
        // Workout complete
        completeWorkout()
      }
    }
  }

  // Start rest period
  const startRest = () => {
    setIsResting(true)
    // Parse rest time from current exercise or use default
    const currentExercise = workout?.exercises[currentExerciseIndex]
    if (currentExercise?.restTime) {
      const restMatch = currentExercise.restTime.match(/(\d+)/)
      if (restMatch) {
        setRestTimeRemaining(Number.parseInt(restMatch[1]))
      } else {
        setRestTimeRemaining(60) // Default
      }
    } else {
      setRestTimeRemaining(60) // Default
    }
  }

  // Skip rest period
  const skipRest = () => {
    setIsResting(false)
    setRestTimeRemaining(60) // Reset for next time

    // Clear rest timer
    if (restTimerRef.current) {
      clearInterval(restTimerRef.current)
      restTimerRef.current = null
    }
  }

  // Complete workout
  const completeWorkout = useCallback(() => {
    // Play completion sound
    playSound()

    setWorkoutComplete(true)

    // Clear all timers
    if (workoutTimerRef.current) {
      clearInterval(workoutTimerRef.current)
      workoutTimerRef.current = null
    }

    if (restTimerRef.current) {
      clearInterval(restTimerRef.current)
      restTimerRef.current = null
    }

    // In a real app, you would save the workout data to the server
    const workoutData = {
      id: workoutId,
      name: workout?.name,
      duration: workoutTime,
      caloriesBurned: workout?.caloriesBurn,
      exercises: workout?.exercises.length,
      sets: workout?.exercises.reduce((acc, ex) => acc + ex.sets, 0),
      completedAt: new Date().toISOString(),
    }

    console.log("Workout completed:", workoutData)

    // Here you would typically save workout stats, update user progress, etc.
  }, [workout, workoutId, workoutTime, playSound])

  // Toggle pause
  const togglePause = () => {
    setIsPaused((prev) => !prev)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  // Exit workout
  const exitWorkout = () => {
    router.push(`/workouts/${workoutId}`)
  }

  // Restart workout
  const restartWorkout = () => {
    setCurrentExerciseIndex(0)
    setCurrentSet(1)
    setIsResting(false)
    setIsPaused(false)
    setWorkoutComplete(false)
    setWorkoutTime(0)
    setRestTimeRemaining(60)
  }

  // Share workout results
  const shareWorkoutResults = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `I completed the ${workout?.name} workout!`,
          text: `I just finished the ${workout?.name} workout in ${formatTime(workoutTime)}. Join me on 2ND2NONE Fitness!`,
          url: window.location.href,
        })
        .catch((err) => console.error("Error sharing:", err))
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard
        .writeText(
          `I just finished the ${workout?.name} workout in ${formatTime(workoutTime)}. Join me on 2ND2NONE Fitness!`,
        )
        .then(() => {
          alert("Workout results copied to clipboard!")
        })
        .catch((err) => {
          console.error("Error copying to clipboard:", err)
        })
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

  const currentExercise = getCurrentExercise()
  const progress = calculateProgress()

  // Workout completion screen
  if (workoutComplete) {
    return (
      <div className="container py-6">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Workout Complete!</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>

              <h3 className="text-xl font-semibold mb-4">{workout.name}</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-xl font-semibold">{formatTime(workoutTime)}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Calories</p>
                  <p className="text-xl font-semibold">{workout.caloriesBurn}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Exercises</p>
                  <p className="text-xl font-semibold">{workout.exercises.length}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Sets</p>
                  <p className="text-xl font-semibold">{workout.exercises.reduce((acc, ex) => acc + ex.sets, 0)}</p>
                </div>
              </div>

              <Alert className="mb-6 bg-green-500/20 border-green-500/50">
                <AlertDescription className="text-green-600">
                  Great job completing your workout! Your progress has been saved.
                </AlertDescription>
              </Alert>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={() => router.push("/workouts")}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Workouts
                </Button>
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  View Dashboard
                </Button>
                <Button variant="outline" onClick={restartWorkout}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Do it Again
                </Button>
                <Button onClick={shareWorkoutResults}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="sm" onClick={exitWorkout}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={togglePause} aria-label={isPaused ? "Resume" : "Pause"}>
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{formatTime(workoutTime)}</span>
              </div>
              <Badge>{progress}% Complete</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {isResting ? (
          <Card className="mb-6 border-primary/50 bg-primary/5">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Rest Time</h3>
              <p className="text-4xl font-bold mb-4">{restTimeRemaining}</p>
              <p className="text-sm text-muted-foreground mb-4">
                Take a breath and prepare for the next {currentSet === 1 ? "exercise" : "set"}
              </p>
              <Button onClick={skipRest}>
                <SkipForward className="mr-2 h-4 w-4" />
                Skip Rest
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 aspect-video bg-muted rounded-md flex items-center justify-center">
                  {currentExercise?.details?.imageUrl ? (
                    <img
                      src={currentExercise.details.imageUrl || "/placeholder.svg"}
                      alt={currentExercise.details?.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Dumbbell className="h-12 w-12 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">No image available</span>
                    </div>
                  )}
                </div>

                <div className="md:w-2/3">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold">{currentExercise?.details?.name || "Exercise"}</h2>
                    <Badge variant="outline">
                      Set {currentSet} of {currentExercise?.sets || 0}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{currentExercise?.reps || 0} reps</Badge>
                    {currentExercise?.details?.equipment && (
                      <Badge variant="secondary">{currentExercise.details.equipment.join(", ")}</Badge>
                    )}
                    {currentExercise?.details?.difficulty && (
                      <Badge variant="secondary">{currentExercise.details.difficulty}</Badge>
                    )}
                  </div>

                  {currentExercise?.details?.instructions && (
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Instructions:</h3>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        {currentExercise.details.instructions.map((instruction, i) => (
                          <li key={i}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {currentExercise?.details?.tips && currentExercise.details.tips.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Tips:</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {currentExercise.details.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 py-4 flex justify-between">
              {currentExerciseIndex > 0 ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentExerciseIndex((prev) => prev - 1)
                    setCurrentSet(1)
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              ) : (
                <div></div>
              )}

              <Button onClick={completeSet}>
                {currentSet < (currentExercise?.sets || 0) ? "Complete Set" : "Next Exercise"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Workout Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workout.exercises.map((exercise, index) => {
                const exerciseDetail = workoutExercises.find((e) => e.id === exercise.exerciseId)

                return (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < currentExerciseIndex
                          ? "bg-primary text-primary-foreground"
                          : index === currentExerciseIndex
                            ? "bg-primary/20 text-primary border border-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index < currentExerciseIndex ? <CheckCircle className="h-4 w-4" /> : <span>{index + 1}</span>}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          index < currentExerciseIndex
                            ? "line-through text-muted-foreground"
                            : index === currentExerciseIndex
                              ? "text-primary"
                              : ""
                        }`}
                      >
                        {exerciseDetail?.name || `Exercise ${index + 1}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {exercise.sets} sets × {exercise.reps} reps
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

