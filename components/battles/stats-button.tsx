"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart } from "lucide-react"

interface StatsButtonProps {
  battleId: string
}

export default function StatsButton({ battleId }: StatsButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    console.log("Stats button clicked for battle:", battleId)

    // Try multiple navigation methods for redundancy
    try {
      // Method 1: Next.js router
      router.push(`/workout-battles/${battleId}/stats`)

      // Method 2: Direct window location as fallback (with slight delay)
      setTimeout(() => {
        window.location.href = `/workout-battles/${battleId}/stats`
      }, 100)
    } catch (error) {
      console.error("Navigation error:", error)
      // Method 3: Ultimate fallback
      window.location.href = `/workout-battles/${battleId}/stats`
    }
  }

  return (
    <Button
      onClick={handleClick}
      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 mt-4"
      size="lg"
    >
      <BarChart className="h-4 w-4" />
      View Detailed Stats
    </Button>
  )
}

