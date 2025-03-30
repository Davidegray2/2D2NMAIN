"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Trophy, Medal, Search } from "lucide-react"

interface RankingEntry {
  id: string
  rank: number
  name: string
  avatar: string
  level: string
  wins: number
  losses: number
  points: number
  specialty?: string
}

interface GlobalRankingsProps {
  monthlyRankings: RankingEntry[]
  allTimeRankings: RankingEntry[]
  userRank?: RankingEntry
}

export default function GlobalRankings({ monthlyRankings = [], allTimeRankings = [], userRank }: GlobalRankingsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<Error | null>(null)

  const filterRankings = (rankings: RankingEntry[]) => {
    try {
      if (!searchTerm) return rankings
      return rankings.filter((entry) => entry.name.toLowerCase().includes(searchTerm.toLowerCase()))
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error("An unknown error occurred"))
      }
      return []
    }
  }

  // Fix: Properly handle the error display instead of rendering the error object directly
  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Something went wrong: {error.message}</p>
        </CardContent>
      </Card>
    )
  }

  const renderRankingList = (rankings: RankingEntry[]) => {
    const filteredRankings = filterRankings(rankings)

    return (
      <div className="space-y-4">
        {filteredRankings.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                {entry.rank === 1 ? (
                  <Trophy className="h-4 w-4 text-yellow-500" />
                ) : entry.rank === 2 ? (
                  <Medal className="h-4 w-4 text-gray-400" />
                ) : entry.rank === 3 ? (
                  <Medal className="h-4 w-4 text-amber-600" />
                ) : (
                  <span className="text-sm font-bold">{entry.rank}</span>
                )}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src={entry.avatar} alt={entry.name} />
                <AvatarFallback>{entry.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{entry.name}</div>
                <div className="text-xs text-muted-foreground">
                  {entry.wins}W - {entry.losses}L
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Badge variant={entry.rank <= 3 ? "default" : "outline"}>{entry.level}</Badge>
              <div className="text-sm font-bold mt-1">{entry.points} pts</div>
              {entry.specialty && <div className="text-xs text-muted-foreground">{entry.specialty}</div>}
            </div>
          </div>
        ))}

        {filteredRankings.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No results found for "{searchTerm}"</div>
        )}
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
          Battle Rankings
        </CardTitle>
        <CardDescription>See who's dominating the workout battles</CardDescription>
      </CardHeader>
      <CardContent>
        {userRank && (
          <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="text-sm font-medium mb-2">Your Ranking</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                  <span className="text-sm font-bold">{userRank.rank}</span>
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userRank.avatar} alt={userRank.name} />
                  <AvatarFallback>{userRank.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{userRank.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {userRank.wins}W - {userRank.losses}L
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Badge variant="outline">{userRank.level}</Badge>
                <div className="text-sm font-bold mt-1">{userRank.points} pts</div>
              </div>
            </div>
          </div>
        )}

        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search competitors..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="monthly">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">{renderRankingList(monthlyRankings)}</TabsContent>
          <TabsContent value="alltime">{renderRankingList(allTimeRankings)}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

