"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Timer, Trophy, BarChart } from "lucide-react"

interface LiveScoreboardProps {
  battleId: string
}

export default function LiveScoreboard({ battleId }: LiveScoreboardProps) {
  const [scores, setScores] = useState({
    user: 0,
    opponent: 0,
  })
  const [timeRemaining, setTimeRemaining] = useState(60)

  // Simulate real-time score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setScores((prev) => ({
        user: prev.user + Math.floor(Math.random() * 2),
        opponent: prev.opponent + Math.floor(Math.random() * 2),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Simulate countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeRemaining])

  const totalScore = scores.user + scores.opponent
  const userPercentage = totalScore > 0 ? (scores.user / totalScore) * 100 : 50

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Live Scoreboard</span>
          <Badge variant="outline">
            <Timer className="h-4 w-4 mr-1" />
            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <span className="font-medium">You</span>
              <Badge variant="outline" className="ml-2">
                {scores.user}
              </Badge>
            </div>
            <div className="flex items-center">
              <Badge variant="outline" className="mr-2">
                {scores.opponent}
              </Badge>
              <span className="font-medium">Opponent</span>
            </div>
          </div>

          <Progress value={userPercentage} className="h-3" />

          <div className="flex justify-center items-center mt-4">
            {scores.user > scores.opponent ? (
              <div className="flex items-center text-green-500">
                <Trophy className="h-5 w-5 mr-1" />
                <span className="font-bold">Leading by {scores.user - scores.opponent}</span>
              </div>
            ) : scores.user < scores.opponent ? (
              <div className="flex items-center text-red-500">
                <span className="font-bold">Trailing by {scores.opponent - scores.user}</span>
              </div>
            ) : (
              <div className="flex items-center text-yellow-500">
                <span className="font-bold">Tied!</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link href={`/workout-battles/${battleId}/stats`} passHref>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
              <BarChart className="h-4 w-4" />
              View Detailed Stats
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

