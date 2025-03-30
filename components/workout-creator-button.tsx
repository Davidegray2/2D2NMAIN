import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function WorkoutCreatorButton() {
  return (
    <Button variant="outline" asChild>
      <Link href="/workouts/create">
        <Sparkles className="mr-2 h-4 w-4" />
        AI Workout
      </Link>
    </Button>
  )
}

