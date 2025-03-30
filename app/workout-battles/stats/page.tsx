"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Dumbbell, Calendar, Clock, Flame } from "lucide-react"
import Link from "next/link"

export default function WorkoutBattleStatsPage() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link href="/workout-battles" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Workout Battles
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Trophy className="mr-2 h-8 w-8 text-primary" />
            Your Battle Statistics
          </h1>
          <p className="text-muted-foreground">Track your performance and progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-3xl font-bold">24</h3>
            <p className="text-muted-foreground">Battles Won</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-3xl font-bold">16</h3>
            <p className="text-muted-foreground">Battles Lost</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-3xl font-bold">60%</h3>
            <p className="text-muted-foreground">Win Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-3xl font-bold">1,250</h3>
            <p className="text-muted-foreground">Points Earned</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history">
        <TabsList className="mb-6">
          <TabsTrigger value="history">Battle History</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{index % 2 === 0 ? "Push-up Challenge" : "Squat Battle"}</h3>
                        <Badge variant={index % 3 === 0 ? "destructive" : "default"}>
                          {index % 3 === 0 ? "Lost" : "Won"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{`March ${10 - index}, 2023`}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>2:30 min</span>
                        </div>
                        <div className="flex items-center">
                          <Dumbbell className="h-4 w-4 mr-1" />
                          <span>{`${20 + index * 2} vs ${18 + (index % 3 === 0 ? index * 3 : index)}`}</span>
                        </div>
                        <div className="flex items-center">
                          <Flame className="h-4 w-4 mr-1" />
                          <span>{`${100 + index * 10} points`}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/workout-battles/battle-${index + 1}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Battle Champion
                </CardTitle>
                <CardDescription>Win 10 battles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-2">
                  <Badge variant="outline" className="mb-2">
                    Completed
                  </Badge>
                  <p className="text-sm text-muted-foreground">Earned on March 5, 2023</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Flame className="h-5 w-5 mr-2 text-orange-500" />
                  Streak Master
                </CardTitle>
                <CardDescription>Win 5 battles in a row</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-2">
                  <Badge variant="outline" className="mb-2">
                    Completed
                  </Badge>
                  <p className="text-sm text-muted-foreground">Earned on February 20, 2023</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Dumbbell className="h-5 w-5 mr-2 text-blue-500" />
                  Push-up King
                </CardTitle>
                <CardDescription>Complete 100 push-ups in battles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-2">
                  <Badge variant="outline" className="mb-2">
                    In Progress: 78/100
                  </Badge>
                  <p className="text-sm text-muted-foreground">78% complete</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rankings">
          <Card>
            <CardHeader>
              <CardTitle>Global Rankings</CardTitle>
              <CardDescription>See how you compare to other fitness enthusiasts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-lg">#41</div>
                    <div>FitnessWarrior</div>
                  </div>
                  <div>1,280 points</div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-lg">#42</div>
                    <div className="font-semibold text-primary">You</div>
                  </div>
                  <div>1,250 points</div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-lg">#43</div>
                    <div>GymBeast</div>
                  </div>
                  <div>1,235 points</div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-lg">#44</div>
                    <div>IronPumper</div>
                  </div>
                  <div>1,210 points</div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-lg">#45</div>
                    <div>FitQueen</div>
                  </div>
                  <div>1,190 points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

