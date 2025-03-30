"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddSpotterButtonProps {
  userId: string
  userName: string
}

export function AddSpotterButton({ userId, userName }: AddSpotterButtonProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAddSpotter = async () => {
    setIsLoading(true)

    // Simulate API call to add spotter
    setTimeout(() => {
      setIsAdded(true)
      setIsLoading(false)

      toast({
        title: "Spotter Added",
        description: `${userName} has been added to your spotters.`,
      })
    }, 1000)
  }

  if (isAdded) {
    return (
      <Button variant="outline" size="sm" className="gap-2" disabled>
        <Check className="h-4 w-4" />
        Spotter Added
      </Button>
    )
  }

  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={handleAddSpotter} disabled={isLoading}>
      {isLoading ? (
        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <UserPlus className="h-4 w-4" />
      )}
      Add Spotter
    </Button>
  )
}

