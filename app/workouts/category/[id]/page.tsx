import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function WorkoutCategoryPage({ params }) {
  const { id } = params

  // Convert ID to readable name (e.g., "strength-training" to "Strength Training")
  const categoryName = id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Sample workouts for this category
  const workouts = [
    {
      id: "upper-body-strength",
      name: "Upper Body Strength",
      level: "Intermediate",
      duration: "45 min",
      calories: 350,
      equipment: "Dumbbells, Bench",
      trainer: "Sarah Williams",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "lower-body-strength",
      name: "Lower Body Strength",
      level: "Intermediate",
      duration: "50 min",
      calories: 400,
      equipment: "Barbell, Squat Rack",
      trainer: "Alex Johnson",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "full-body-strength",
      name: "Full Body Strength",
      level: "Advanced",
      duration: "60 min",
      calories: 450,
      equipment: "Full Gym",
      trainer: "Mike Chen",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "bodyweight-strength",
      name: "Bodyweight Strength",
      level: "Beginner",
      duration: "30 min",
      calories: 250,
      equipment: "None",
      trainer: "Emma Davis",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "strength-endurance",
      name: "Strength & Endurance",
      level: "Intermediate",
      duration: "45 min",
      calories: 380,
      equipment: "Dumbbells, Kettlebells",
      trainer: "David Kim",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "power-strength",
      name: "Power & Strength",
      level: "Advanced",
      duration: "55 min",
      calories: 420,
      equipment: "Full Gym",
      trainer: "Thomas Wright",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <div className="container py-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/workouts">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{categoryName} Workouts</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {workouts.map((workout, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-video w-full relative">
              <img
                src={workout.image || "/placeholder.svg"}
                alt={workout.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{workout.name}</h3>
                <Badge>{workout.level}</Badge>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                <div>{workout.duration}</div>
                <div>•</div>
                <div>{workout.calories} cal</div>
                <div>•</div>
                <div>{workout.equipment}</div>
              </div>
              <div className="text-sm">Trainer: {workout.trainer}</div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" asChild>
                <Link href={`/workouts/${workout.id}`}>Start Workout</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

