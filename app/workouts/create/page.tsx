"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { workouts } from "@/data/workout-library"

export default function CreateWorkoutPage() {
  const [location, setLocation] = useState("home")
  const [duration, setDuration] = useState(30)
  const [focusAreas, setFocusAreas] = useState<string[]>([])
  const [equipment, setEquipment] = useState<string[]>([])
  const [step, setStep] = useState(1)
  const [suggestedWorkouts, setSuggestedWorkouts] = useState<any[]>([])

  const homeEquipment = [
    { id: "dumbbells", label: "Dumbbells" },
    { id: "kettlebell", label: "Kettlebell" },
    { id: "resistance-bands", label: "Resistance Bands" },
    { id: "pull-up-bar", label: "Pull-up Bar" },
    { id: "yoga-mat", label: "Yoga Mat" },
    { id: "none", label: "No Equipment" },
  ]

  const gymEquipment = [
    { id: "dumbbells", label: "Dumbbells" },
    { id: "barbell", label: "Barbell" },
    { id: "cable-machine", label: "Cable Machine" },
    { id: "leg-press", label: "Leg Press" },
    { id: "smith-machine", label: "Smith Machine" },
    { id: "kettlebell", label: "Kettlebell" },
  ]

  const muscleGroups = [
    { id: "full-body", label: "Full Body" },
    { id: "upper-body", label: "Upper Body" },
    { id: "lower-body", label: "Lower Body" },
    { id: "chest", label: "Chest" },
    { id: "back", label: "Back" },
    { id: "shoulders", label: "Shoulders" },
    { id: "arms", label: "Arms" },
    { id: "core", label: "Core" },
    { id: "legs", label: "Legs" },
    { id: "glutes", label: "Glutes" },
  ]

  const handleEquipmentChange = (id: string) => {
    setEquipment((prev) => {
      if (id === "none") {
        return ["none"]
      }

      const newEquipment = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev.filter((item) => item !== "none"), id]

      return newEquipment
    })
  }

  const handleFocusAreaChange = (id: string) => {
    setFocusAreas((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const generateWorkoutSuggestions = () => {
    // Simple filtering logic to find matching workouts
    let filtered = [...workouts]

    // Filter by location
    if (location === "home") {
      filtered = filtered.filter(
        (workout) =>
          workout.tags.includes("home") ||
          workout.equipment.includes("none") ||
          workout.equipment.some((eq) => equipment.includes(eq.toLowerCase())),
      )
    } else {
      filtered = filtered.filter(
        (workout) =>
          !workout.tags.includes("home") || workout.equipment.some((eq) => equipment.includes(eq.toLowerCase())),
      )
    }

    // Filter by duration (allow some flexibility)
    filtered = filtered.filter((workout) => {
      const workoutDuration = Number.parseInt(workout.duration.split(" ")[0])
      return Math.abs(workoutDuration - duration) <= 15
    })

    // Filter by focus areas if selected
    if (focusAreas.length > 0) {
      filtered = filtered.filter((workout) => {
        // Map our UI focus areas to the data model
        const mappedFocusAreas = focusAreas.flatMap((area) => {
          switch (area) {
            case "full-body":
              return "full body"
            case "upper-body":
              return ["chest", "back", "shoulders", "arms"]
            case "lower-body":
              return ["legs", "glutes"]
            default:
              return area
          }
        })

        return (
          workout.targetMuscleGroups.some((group) => mappedFocusAreas.includes(group)) ||
          workout.tags.some((tag) => mappedFocusAreas.some((area) => tag.toLowerCase().includes(area)))
        )
      })
    }

    // If we have no matches, return some workouts based on location only
    if (filtered.length === 0) {
      if (location === "home") {
        filtered = workouts.filter((w) => w.tags.includes("home") || w.equipment.includes("none"))
      } else {
        filtered = workouts.filter((w) => !w.tags.includes("home"))
      }
    }

    // Limit to 3 suggestions
    setSuggestedWorkouts(filtered.slice(0, 3))
    setStep(2)
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

      <Card>
        <CardHeader>
          <CardTitle>Create Your Custom Workout</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This is the workout creation page. Here you can create your own custom workout routines.
          </p>
          <p>We're currently updating this feature. Please check back soon for the full workout creation experience!</p>
        </CardContent>
      </Card>
    </div>
  )
}

