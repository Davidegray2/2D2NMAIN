"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dumbbell, Flame, Clock, Heart, Play, Plus, CheckCircle, History } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function StartWorkoutModal({ open, onOpenChange, selectedWorkout }) {
  // Ensure selectedWorkout is valid before using it
  const workout = selectedWorkout && typeof selectedWorkout === "object" ? selectedWorkout : null
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null)
  const [activeTab, setActiveTab] = useState("recommended")

  // For custom workout logging
  const [customWorkout, setCustomWorkout] = useState({
    name: "",
    duration: "",
    type: "Strength",
    notes: "",
  })

  const recommendedWorkouts = [
    { id: "w1", name: "Quick HIIT", duration: "20 min", calories: 300, type: "Cardio", level: "Beginner" },
    {
      id: "w2",
      name: "Upper Body Strength",
      duration: "45 min",
      calories: 350,
      type: "Strength",
      level: "Intermediate",
    },
    { id: "w3", name: "Core Crusher", duration: "25 min", calories: 200, type: "Core", level: "Beginner" },
    { id: "w4", name: "Full Body Blast", duration: "40 min", calories: 400, type: "Strength", level: "Advanced" },
  ]

  const recentWorkouts = [
    { id: "r1", name: "Morning Cardio", duration: "30 min", calories: 320, type: "Cardio", date: "Yesterday" },
    { id: "r2", name: "Leg Day", duration: "50 min", calories: 450, type: "Strength", date: "3 days ago" },
  ]

  const handleCustomWorkoutChange = (e) => {
    const { name, value } = e.target
    setCustomWorkout((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogCustomWorkout = () => {
    // In a real app, this would save the workout to the database
    alert(`Logged custom workout: ${customWorkout.name}`)
    onOpenChange(false)
  }

  // If a workout is selected, show a focused view for that workout
  if (workout) {
    // Create a safe version of the workout object to prevent rendering errors
    const safeWorkout = {
      id: typeof workout.id === "string" ? workout.id : "default",
      name: typeof workout.name === "string" ? workout.name : "Start Workout",
      description:
        typeof workout.description === "string" ? workout.description : "Get ready for your workout session.",
      image: typeof workout.image === "string" ? workout.image : "/placeholder.svg",
      duration: typeof workout.duration === "string" ? workout.duration : "30 min",
      calories: typeof workout.calories === "number" ? workout.calories : 300,
      equipment: typeof workout.equipment === "string" ? workout.equipment : "",
      trainer: typeof workout.trainer === "string" ? workout.trainer : "",
      level: typeof workout.level === "string" ? workout.level : "intermediate",
    }

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{safeWorkout.name}</DialogTitle>
            <DialogDescription>{safeWorkout.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={safeWorkout.image || "/placeholder.svg"}
                alt={safeWorkout.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold">{safeWorkout.name}</h2>
              <div className="flex flex-wrap gap-3 mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{safeWorkout.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="h-4 w-4 text-muted-foreground" />
                  <span>{safeWorkout.calories} calories</span>
                </div>
                {safeWorkout.equipment && (
                  <div className="flex items-center gap-1">
                    <Dumbbell className="h-4 w-4 text-muted-foreground" />
                    <span>{safeWorkout.equipment}</span>
                  </div>
                )}
              </div>

              {safeWorkout.trainer && (
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Trainer: </span>
                  <span>{safeWorkout.trainer}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">What to expect:</h3>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Complete {safeWorkout.level} level exercises</li>
                <li>Burn approximately {safeWorkout.calories} calories</li>
                <li>Follow along with video instructions</li>
                <li>Track your progress in real-time</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button size="lg" className="w-full gap-2" asChild>
                <Link href={`/workouts/${safeWorkout.id}/active`}>
                  <Play className="h-4 w-4" />
                  <span>Begin Workout Now</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/workouts/${safeWorkout.id}`}>View Workout Details</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Enhanced modal with tabs for recommended, recent, and create options
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Start a Workout</DialogTitle>
          <DialogDescription>
            Choose a recommended workout, view your recent workouts, or create your own
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="recommended" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="create">Create Your Own</TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendedWorkouts.map((workout) => (
                <Card
                  key={workout.id}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    selectedWorkoutId === workout.id ? "border-2 border-primary" : ""
                  }`}
                  onClick={() => setSelectedWorkoutId(workout.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{workout.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          {workout.duration} • {workout.calories} cal • {workout.level}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {workout.type === "Strength" && <Dumbbell className="h-4 w-4 text-primary" />}
                        {workout.type === "Cardio" && <Heart className="h-4 w-4 text-red-500" />}
                        {workout.type === "HIIT" && <Flame className="h-4 w-4 text-orange-500" />}
                        {workout.type === "Core" && <Clock className="h-4 w-4 text-blue-500" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <DialogFooter>
              <Button disabled={!selectedWorkoutId} className="w-full sm:w-auto" asChild={!!selectedWorkoutId}>
                {selectedWorkoutId ? (
                  <Link href={`/workouts/${selectedWorkoutId}/active`}>
                    <Play className="mr-2 h-4 w-4" />
                    Start Workout
                  </Link>
                ) : (
                  <span>Select a Workout</span>
                )}
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            {recentWorkouts.length > 0 ? (
              <div className="space-y-3">
                {recentWorkouts.map((workout) => (
                  <Card key={workout.id} className="cursor-pointer hover:border-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{workout.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            {workout.duration} • {workout.calories} cal • {workout.date}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/workouts/${workout.id}`}>
                              <History className="mr-2 h-4 w-4" />
                              Details
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/workouts/${workout.id}/active`}>
                              <Play className="mr-2 h-4 w-4" />
                              Repeat
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <History className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p>No recent workouts found</p>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setActiveTab("recommended")}>
                Browse Recommended
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="workout-name">Workout Name</Label>
                <Input
                  id="workout-name"
                  name="name"
                  placeholder="e.g., Morning Cardio"
                  value={customWorkout.name}
                  onChange={handleCustomWorkoutChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="workout-duration">Duration</Label>
                  <Input
                    id="workout-duration"
                    name="duration"
                    placeholder="e.g., 30 min"
                    value={customWorkout.duration}
                    onChange={handleCustomWorkoutChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="workout-type">Type</Label>
                  <select
                    id="workout-type"
                    name="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={customWorkout.type}
                    onChange={handleCustomWorkoutChange}
                  >
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Core">Core</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="workout-notes">Notes (exercises, sets, reps, etc.)</Label>
                <Textarea
                  id="workout-notes"
                  name="notes"
                  placeholder="Describe your workout here..."
                  className="min-h-[100px]"
                  value={customWorkout.notes}
                  onChange={handleCustomWorkoutChange}
                />
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/workouts/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Advanced Creator
                </Link>
              </Button>
              <Button
                className="w-full sm:w-auto"
                onClick={handleLogCustomWorkout}
                disabled={!customWorkout.name || !customWorkout.duration}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Log Workout
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

