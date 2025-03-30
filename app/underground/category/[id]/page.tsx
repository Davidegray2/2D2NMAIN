"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, Clock, Flame, Trophy, Lock } from "lucide-react"
import { getChallengesByCategory, undergroundCategories } from "@/data/underground-challenges"

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [challenges, setChallenges] = useState<any[]>([])
  const [category, setCategory] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const foundCategory = undergroundCategories.find((cat) => cat.id === params.id)
      const categoryChallenges = getChallengesByCategory(params.id)

      setCategory(foundCategory)
      setChallenges(categoryChallenges)
      setLoading(false)
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

        <Skeleton className="w-full h-48 rounded-lg mb-6" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="w-full h-80 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/underground">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Category Not Found</h1>
        </div>

        <div className="bg-destructive/10 text-destructive p-6 rounded-lg mb-6">
          <p>The requested category could not be found.</p>
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
        <h1 className="text-2xl font-bold">{category.name}</h1>
      </div>

      <div className="relative rounded-xl overflow-hidden mb-8">
        <img src={category.image || "/placeholder.svg"} alt={category.name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{category.name}</h2>
          <p className="text-white/80 max-w-2xl mb-2">{category.description}</p>
          <div className="flex items-center gap-1 text-white/60 text-sm">
            <span>{category.count} challenges</span>
          </div>
        </div>
      </div>

      {challenges.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="overflow-hidden">
              <div className="aspect-video w-full relative">
                <img
                  src={challenge.image || "/placeholder.svg"}
                  alt={challenge.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={challenge.type === "challenge" ? "bg-red-500" : "bg-purple-500"}>
                    {challenge.type === "challenge" ? "CHALLENGE" : "WORKOUT"}
                  </Badge>
                </div>
                {!challenge.unlocked && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4">
                    <Lock className="h-8 w-8 text-red-500 mb-2" />
                    <p className="text-white text-center text-sm">
                      {challenge.unlockRequirement || "Complete other challenges to unlock"}
                    </p>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{challenge.name}</h3>
                  <Badge variant="outline">{challenge.difficulty}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{challenge.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{challenge.durationText || challenge.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-red-500" />
                    <span>{challenge.intensity}</span>
                  </div>
                  {challenge.completionRate !== undefined && (
                    <div className="flex items-center gap-1">
                      <Trophy className="h-3 w-3 text-amber-500" />
                      <span>{challenge.completionRate}% completion rate</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full"
                  variant={challenge.unlocked ? "default" : "outline"}
                  disabled={!challenge.unlocked}
                  asChild
                >
                  <Link href={`/underground/${challenge.id}`}>{challenge.unlocked ? "View Challenge" : "Locked"}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No challenges found in this category</p>
          <Button asChild>
            <Link href="/underground">Browse All Challenges</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

