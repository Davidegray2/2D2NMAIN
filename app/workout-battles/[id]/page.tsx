"use client"

import { useEffect } from "react"
import BattleArena from "@/components/battles/battle-arena"
import TrashTalk from "@/components/battles/trash-talk"
import LiveScoreboard from "@/components/battles/live-scoreboard"
import SpectatorMode from "@/components/battles/spectator-mode"
import GlobalRankings from "@/components/battles/global-rankings"

export default function WorkoutBattlePage({ params }: { params: { id: string } }) {
  // Log the battle ID for debugging
  useEffect(() => {
    console.log("Battle page mounted with ID:", params.id)
  }, [params.id])

  // Mock data for the battle
  const battleData = {
    id: params.id,
    opponent: {
      id: "opponent-1",
      name: "Alex Fitness",
      avatar: "/placeholder.svg?height=80&width=80",
      level: "Elite",
    },
    exerciseType: "Push-ups",
    timeLimit: 60,
    wagerAmount: 100,
  }

  // Mock data for spectator mode
  const spectatorData = {
    battleId: params.id,
    competitors: [
      {
        id: "user-1",
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        score: 24,
      },
      {
        id: "opponent-1",
        name: "Alex Fitness",
        avatar: "/placeholder.svg?height=40&width=40",
        score: 22,
      },
    ],
    exerciseType: "Push-ups",
    timeRemaining: 30,
    comments: [
      {
        id: "comment-1",
        user: {
          name: "FitnessFan",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        message: "Great form!",
        timestamp: new Date().toISOString(),
      },
    ],
  }

  // Mock data for rankings
  const rankingsData = {
    monthlyRankings: [
      {
        id: "user-ranking-1",
        rank: 1,
        name: "GymBeast",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Master",
        wins: 45,
        losses: 5,
        points: 2500,
        specialty: "Push-ups",
      },
    ],
    allTimeRankings: [
      {
        id: "user-ranking-2",
        rank: 1,
        name: "LegendLifter",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Legend",
        wins: 120,
        losses: 10,
        points: 8500,
        specialty: "All exercises",
      },
    ],
    userRank: {
      id: "your-ranking",
      rank: 42,
      name: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Advanced",
      wins: 24,
      losses: 16,
      points: 1250,
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Workout Battle: {params.id}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BattleArena
            battleId={params.id}
            opponent={battleData.opponent}
            exerciseType={battleData.exerciseType}
            timeLimit={battleData.timeLimit}
            wagerAmount={battleData.wagerAmount}
          />
          <TrashTalk battleId={params.id} className="mt-6" />
        </div>

        <div className="space-y-6">
          <LiveScoreboard battleId={params.id} />
          <SpectatorMode
            battleId={params.id}
            competitors={spectatorData.competitors}
            exerciseType={spectatorData.exerciseType}
            timeRemaining={spectatorData.timeRemaining}
            comments={spectatorData.comments}
          />
          <GlobalRankings
            monthlyRankings={rankingsData.monthlyRankings}
            allTimeRankings={rankingsData.allTimeRankings}
            userRank={rankingsData.userRank}
          />
        </div>
      </div>
    </div>
  )
}

