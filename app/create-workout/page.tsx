"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2, Dumbbell, Clock, Flame, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Equipment options
const equipmentOptions = [
  { id: "none", label: "No Equipment" },
  { id: "dumbbells", label: "Dumbbells" },
  { id: "barbell", label: "Barbell" },
  { id: "kettlebell", label: "Kettlebell" },
  { id: "resistance-bands", label: "Resistance Bands" },
  { id: "pull-up-bar", label: "Pull-up Bar" },
  { id: "bench", label: "Bench" },
  { id: "medicine-ball", label: "Medicine Ball" },
  { id: "yoga-mat", label: "Yoga Mat" },
  { id: "foam-roller", label: "Foam Roller" },
]

// Muscle group options
const muscleGroups = [
  { id: "chest", label: "Chest" },
  { id: "back", label: "Back" },
  { id: "shoulders", label: "Shoulders" },
  { id: "biceps", label: "Biceps" },
  { id: "triceps", label: "Triceps" },
  { id: "forearms", label: "Forearms" },
  { id: "quadriceps", label: "Quadriceps" },
  { id: "hamstrings", label: "Hamstrings" },
  { id: "glutes", label: "Glutes" },
  { id: "calves", label: "Calves" },
  { id: "abs", label: "Abs" },
  { id: "core", label: "Core" },
]

// Exercise library (simplified)
const exerciseLibrary = [
  { id: "ex1", name: "Push-ups", equipment: ["none"], muscleGroups: ["chest", "triceps", "shoulders"] },
  { id: "ex2", name: "Pull-ups", equipment: ["pull-up-bar"], muscleGroups: ["back", "biceps"] },
  { id: "ex3", name: "Squats", equipment: ["none"], muscleGroups: ["quadriceps", "hamstrings", "glutes"] },
  { id: "ex4", name: "Lunges", equipment: ["none"], muscleGroups: ["quadriceps", "hamstrings", "glutes"] },
  { id: "ex5", name: "Plank", equipment: ["none"], muscleGroups: ["core", "abs"] },
  { id: "ex6", name: "Bench Press", equipment: ["barbell", "bench"], muscleGroups: ["chest", "triceps", "shoulders"] },
  { id: "ex7", name: "Deadlift", equipment: ["barbell"], muscleGroups: ["back", "hamstrings", "glutes"] },
  { id: "ex8", name: "Overhead Press", equipment: ["barbell", "dumbbells"], muscleGroups: ["shoulders", "triceps"] },
  { id: "ex9", name: "Bicep Curls", equipment: ["dumbbells", "barbell"], muscleGroups: ["biceps"] },
  { id: "ex10", name: "Tricep Extensions", equipment: ["dumbbells"], muscleGroups: ["triceps"] },
  { id: "ex11", name: "Leg Press", equipment: ["machine"], muscleGroups: ["quadriceps", "hamstrings", "glutes"] },
  { id: "ex12", name: "Calf Raises", equipment: ["none", "dumbbells"], muscleGroups: ["calves"] },
  { id: "ex13", name: "Lat Pulldown", equipment: ["machine"], muscleGroups: ["back", "biceps"] },
  { id: "ex14", name: "Leg Curls", equipment: ["machine"], muscleGroups: ["hamstrings"] },
  { id: "ex15", name: "Leg Extensions", equipment: ["machine"], muscleGroups: ["quadriceps"] },
  { id: "ex16", name: "Dumbbell Rows", equipment: ["dumbbells", "bench"], muscleGroups: ["back"] },
  { id: "ex17", name: "Russian Twists", equipment: ["none", "medicine-ball"], muscleGroups: ["abs", "core"] },
  { id: "ex18", name: "Mountain Climbers", equipment: ["none"], muscleGroups: ["core", "abs", "shoulders"] },
  { id: "ex19", name: "Kettlebell Swings", equipment: ["kettlebell"], muscleGroups: ["back", "glutes", "hamstrings"] },
  { id: "ex20", name: "Dips", equipment: ["none"], muscleGroups: ["chest", "triceps", "shoulders"] },
]

export default function CreateWorkoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [workoutData, setWorkoutData] = useState({
    name: "",
    description: "",
    type: "strength",
    difficulty: "intermediate",
    location: "gym",
    duration: 45,
    equipment: [],
    targetMuscleGroups: [],
    exercises: [],
  })

  const [selectedExercise, setSelectedExercise] = useState("")
  const [sets, setSets] = useState(3)
  const [reps, setReps] = useState(10)
  const [restTime, setRestTime] = useState("60")

  // Filter exercises based on selected equipment and muscle groups
  const filteredExercises = exerciseLibrary.filter((exercise) => {
    // If no equipment is selected, show all exercises
    if (workoutData.equipment.length === 0) return true

    // Check if the exercise can be done with any of the selected equipment
    const hasMatchingEquipment = exercise.equipment.some(
      (eq) => workoutData.equipment.includes(eq) || exercise.equipment.includes("none"),
    )

    // If no muscle groups are selected, only filter by equipment
    if (workoutData.targetMuscleGroups.length === 0) return hasMatchingEquipment

    // Check if the exercise targets any of the selected muscle groups
    const hasMatchingMuscleGroup = exercise.muscleGroups.some((mg) => workoutData.targetMuscleGroups.includes(mg))

    return hasMatchingEquipment && hasMatchingMuscleGroup
  })

  const handleEquipmentChange = (equipmentId) => {
    setWorkoutData((prev) => {
      const newEquipment = prev.equipment.includes(equipmentId)
        ? prev.equipment.filter((eq) => eq !== equipmentId)
        : [...prev.equipment, equipmentId]

      return { ...prev, equipment: newEquipment }
    })
  }

  const handleMuscleGroupChange = (muscleGroupId) => {
    setWorkoutData((prev) => {
      const newMuscleGroups = prev.targetMuscleGroups.includes(muscleGroupId)
        ? prev.targetMuscleGroups.filter((mg) => mg !== muscleGroupId)
        : [...prev.targetMuscleGroups, muscleGroupId]

      return { ...prev, targetMuscleGroups: newMuscleGroups }
    })
  }

  const addExercise = () => {
    if (!selectedExercise) return

    const exercise = exerciseLibrary.find((ex) => ex.id === selectedExercise)

    setWorkoutData((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          id: selectedExercise,
          name: exercise.name,
          sets,
          reps,
          restTime: `${restTime} sec`,
        },
      ],
    }))

    // Reset form
    setSelectedExercise("")
    setSets(3)
    setReps(10)
    setRestTime("60")
  }

  const removeExercise = (index) => {
    setWorkoutData((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = () => {
    // In a real app, you would save the workout to a database
    console.log("Workout created:", workoutData)

    // Navigate back to workouts page
    router.push("/workouts")
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" asChild className="mr-4">
          <Link href="/workouts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workouts
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create Workout</h1>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className={`flex-1 h-2 ${currentStep >= 1 ? "bg-primary" : "bg-muted"} rounded-l-full`} />
          <div className={`flex-1 h-2 ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`} />
          <div className={`flex-1 h-2 ${currentStep >= 3 ? "bg-primary" : "bg-muted"} rounded-r-full`} />
        </div>
        <div className="flex justify-between text-sm">
          <div className={currentStep >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>Basic Info</div>
          <div className={currentStep >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>
            Equipment & Muscles
          </div>
          <div className={currentStep >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>Exercises</div>
        </div>
      </div>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Workout Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workout Name</Label>
              <Input
                id="name"
                value={workoutData.name}
                onChange={(e) => setWorkoutData({ ...workoutData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={workoutData.description}
                onChange={(e) => setWorkoutData({ ...workoutData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Workout Type</Label>
                <RadioGroup
                  value={workoutData.type}
                  onValueChange={(value) => setWorkoutData({ ...workoutData, type: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="strength" id="strength" />
                    <Label htmlFor="strength">Strength Training</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cardio" id="cardio" />
                    <Label htmlFor="cardio">Cardio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hiit" id="hiit" />
                    <Label htmlFor="hiit">HIIT</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="circuit" id="circuit" />
                    <Label htmlFor="circuit">Circuit Training</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Difficulty Level</Label>
                <RadioGroup
                  value={workoutData.difficulty}
                  onValueChange={(value) => setWorkoutData({ ...workoutData, difficulty: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Workout Location</Label>
              <RadioGroup
                value={workoutData.location}
                onValueChange={(value) => setWorkoutData({ ...workoutData, location: value })}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="home" id="home" />
                  <Label htmlFor="home">Home</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gym" id="gym" />
                  <Label htmlFor="gym">Gym</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outdoor" id="outdoor" />
                  <Label htmlFor="outdoor">Outdoor</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Duration (minutes)</Label>
                <span className="text-sm text-muted-foreground">{workoutData.duration} min</span>
              </div>
              <Slider
                value={[workoutData.duration]}
                min={10}
                max={120}
                step={5}
                onValueChange={(value) => setWorkoutData({ ...workoutData, duration: value[0] })}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10 min</span>
                <span>60 min</span>
                <span>120 min</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={nextStep} className="ml-auto">
              Next Step
            </Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Equipment & Muscle Groups</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Available Equipment</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {equipmentOptions.map((equipment) => (
                  <div key={equipment.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={equipment.id}
                      checked={workoutData.equipment.includes(equipment.id)}
                      onCheckedChange={() => handleEquipmentChange(equipment.id)}
                    />
                    <Label htmlFor={equipment.id} className="cursor-pointer">
                      {equipment.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Target Muscle Groups</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {muscleGroups.map((muscle) => (
                  <div key={muscle.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={muscle.id}
                      checked={workoutData.targetMuscleGroups.includes(muscle.id)}
                      onCheckedChange={() => handleMuscleGroupChange(muscle.id)}
                    />
                    <Label htmlFor={muscle.id} className="cursor-pointer">
                      {muscle.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              Previous Step
            </Button>
            <Button onClick={nextStep}>Next Step</Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Workout Exercises</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {workoutData.exercises.length > 0 ? (
                  <div className="space-y-4">
                    {workoutData.exercises.map((exercise, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h3 className="font-medium">{exercise.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            {exercise.sets} sets × {exercise.reps} reps • Rest: {exercise.restTime}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeExercise(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed rounded-md">
                    <Dumbbell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No exercises added yet</h3>
                    <p className="text-muted-foreground mb-4">Add exercises from the panel on the right</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Previous Step
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={workoutData.exercises.length === 0 || !workoutData.name}
                  className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Workout
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Add Exercise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="exercise">Select Exercise</Label>
                  <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredExercises.length > 0 ? (
                        filteredExercises.map((exercise) => (
                          <SelectItem key={exercise.id} value={exercise.id}>
                            {exercise.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No matching exercises
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Sets</Label>
                    <span className="text-sm text-muted-foreground">{sets}</span>
                  </div>
                  <Slider value={[sets]} min={1} max={10} step={1} onValueChange={(value) => setSets(value[0])} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Reps</Label>
                    <span className="text-sm text-muted-foreground">{reps}</span>
                  </div>
                  <Slider value={[reps]} min={1} max={30} step={1} onValueChange={(value) => setReps(value[0])} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rest">Rest Time (seconds)</Label>
                  <Select value={restTime} onValueChange={setRestTime}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="45">45 seconds</SelectItem>
                      <SelectItem value="60">60 seconds</SelectItem>
                      <SelectItem value="90">90 seconds</SelectItem>
                      <SelectItem value="120">2 minutes</SelectItem>
                      <SelectItem value="180">3 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={addExercise} disabled={!selectedExercise} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Exercise
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Workout Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{workoutData.duration} minutes</span>
                </div>
                <div className="flex items-center">
                  <Dumbbell className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{workoutData.exercises.length} exercises</span>
                </div>
                <div className="flex items-center">
                  <Flame className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {workoutData.difficulty.charAt(0).toUpperCase() + workoutData.difficulty.slice(1)} difficulty
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

