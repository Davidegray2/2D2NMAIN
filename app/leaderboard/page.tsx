import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy } from "lucide-react"
import Link from "next/link"

export default function LeaderboardPage() {
  const weeklyLeaders = []

  const monthlyLeaders = []

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>See who's leading the fitness community</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly">
              <TabsList className="mb-4">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              <TabsContent value="weekly">
                <div className="space-y-4">
                  {weeklyLeaders.slice(0, 3).map((leader) => (
                    <div key={leader.rank} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                        {leader.rank}
                      </div>
                      <Link
                        href={`/profile/${leader.name.replace(/\s+/g, "-").toLowerCase()}`}
                        className="flex items-center gap-2 hover:underline"
                      >
                        <Avatar>
                          <AvatarImage src={leader.avatar} />
                          <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{leader.name}</div>
                          <div className="text-sm text-muted-foreground">{leader.points} points</div>
                        </div>
                      </Link>
                      <Trophy
                        className={`h-5 w-5 ${
                          leader.rank === 1 ? "text-yellow-500" : leader.rank === 2 ? "text-gray-400" : "text-amber-700"
                        }`}
                      />
                    </div>
                  ))}

                  <div className="border-t pt-4 mt-4">
                    {weeklyLeaders.slice(3).map((leader) => (
                      <div key={leader.rank} className="flex items-center gap-4 py-2">
                        <div className="w-8 text-center font-medium">{leader.rank}</div>
                        <Link
                          href={`/profile/${leader.name.replace(/\s+/g, "-").toLowerCase()}`}
                          className="flex items-center gap-2 hover:underline"
                        >
                          <Avatar>
                            <AvatarImage src={leader.avatar} />
                            <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{leader.name}</div>
                        </Link>
                        <div className="ml-auto">{leader.points} points</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="monthly">
                <div className="space-y-4">
                  {monthlyLeaders.slice(0, 3).map((leader) => (
                    <div key={leader.rank} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                        {leader.rank}
                      </div>
                      <Link
                        href={`/profile/${leader.name.replace(/\s+/g, "-").toLowerCase()}`}
                        className="flex items-center gap-2 hover:underline"
                      >
                        <Avatar>
                          <AvatarImage src={leader.avatar} />
                          <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{leader.name}</div>
                          <div className="text-sm text-muted-foreground">{leader.points} points</div>
                        </div>
                      </Link>
                      <Trophy
                        className={`h-5 w-5 ${
                          leader.rank === 1 ? "text-yellow-500" : leader.rank === 2 ? "text-gray-400" : "text-amber-700"
                        }`}
                      />
                    </div>
                  ))}

                  <div className="border-t pt-4 mt-4">
                    {monthlyLeaders.slice(3).map((leader) => (
                      <div key={leader.rank} className="flex items-center gap-4 py-2">
                        <div className="w-8 text-center font-medium">{leader.rank}</div>
                        <Link
                          href={`/profile/${leader.name.replace(/\s+/g, "-").toLowerCase()}`}
                          className="flex items-center gap-2 hover:underline"
                        >
                          <Avatar>
                            <AvatarImage src={leader.avatar} />
                            <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{leader.name}</div>
                        </Link>
                        <div className="ml-auto">{leader.points} points</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leaderboard Rewards</CardTitle>
          <CardDescription>Top performers earn exclusive rewards and recognition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4 text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-bold text-lg">1st Place</h3>
              <p className="text-sm text-muted-foreground mb-2">Free 3-month Premium subscription</p>
              <p className="text-sm">+ Exclusive 2ND2NONE merchandise</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <h3 className="font-bold text-lg">2nd Place</h3>
              <p className="text-sm text-muted-foreground mb-2">Free 1-month Premium subscription</p>
              <p className="text-sm">+ $50 store credit</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <Trophy className="h-12 w-12 text-amber-700 mx-auto mb-2" />
              <h3 className="font-bold text-lg">3rd Place</h3>
              <p className="text-sm text-muted-foreground mb-2">50% off Premium subscription</p>
              <p className="text-sm">+ $25 store credit</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

