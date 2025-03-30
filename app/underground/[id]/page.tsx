"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { ExtremeWorkoutDetail } from "@/components/extreme-workout-detail"
import { getChallengeById } from "@/data/underground-challenges"
import { Skeleton } from "@/components/ui/skeleton"

export default function UndergroundChallengePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [challenge, setChallenge] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      try {
        const foundChallenge = getChallengeById(params.id)

        if (foundChallenge) {
          setChallenge(foundChallenge)
          setLoading(false)
        } else {
          setError("Challenge not found")
          setLoading(false)
        }
      } catch (err) {
        setError("Error loading challenge")
        setLoading(false)
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [params.id])

  if (loading) {
    return (
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>

        <div className="space-y-6">
          <Skeleton className="w-full h-[400px] rounded-lg" />
          <Skeleton className="w-full h-24 rounded-lg" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="w-full h-64 rounded-lg" />
              <Skeleton className="w-full h-96 rounded-lg" />
            </div>
            <div className="space-y-6">
              <Skeleton className="w-full h-64 rounded-lg" />
              <Skeleton className="w-full h-48 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !challenge) {
    return (
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/underground">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Challenge Not Found</h1>
        </div>

        <div className="bg-destructive/10 text-destructive p-6 rounded-lg mb-6">
          <p>{error || "The requested challenge could not be found."}</p>
        </div>

        <Button asChild>
          <Link href="/underground">Return to Underground</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/underground">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{challenge.name}</h1>
      </div>

      <ExtremeWorkoutDetail
        id={challenge.id}
        name={challenge.name}
        type={challenge.type}
        description={challenge.description}
        longDescription={challenge.longDescription}
        duration={challenge.duration}
        durationText={challenge.durationText}
        intensity={challenge.intensity}
        difficulty={challenge.difficulty}
        warning={challenge.warning}
        exercises={challenge.exercises}
        requirements={challenge.requirements}
        image={challenge.image}
        wearableRequired={challenge.wearableRequired}
        inspirationSource={challenge.inspirationSource}
        tags={challenge.tags}
        completionRate={challenge.completionRate}
      />
    </div>
  )
}

