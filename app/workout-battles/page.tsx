"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Dumbbell, Trophy, Video, Filter, Search, Lock, Crown, Shield, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

// Import the SubscriptionGate component
import { SubscriptionGate } from "@/components/subscription-gate"

// Mock data for recommended opponents
const recommendedOpponents = []

export default function WorkoutBattlesPage() {
  const [membershipTier, setMembershipTier] = useState("basic")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [challengedUsers, setChallengedUsers] = useState<string[]>([])

  const router = useRouter()
  const { toast } = useToast()

  const isPremiumMember = membershipTier !== "basic"

  // Handle challenging an opponent
  const handleChallenge = (opponentId: string, opponentName: string) => {
    // Check if already challenged
    if (challengedUsers.includes(opponentId)) {
      toast({
        title: "Already Challenged",
        description: `You've already challenged ${opponentName}. Check your scheduled battles.`,
        variant: "destructive",
      })
      return
    }

    // Add to challenged users
    setChallengedUsers((prev) => [...prev, opponentId])

    // Show success toast
    toast({
      title: "Challenge Sent!",
      description: `Your challenge has been sent to ${opponentName}. They'll have 24 hours to accept.`,
    })

    // In a real app, this would navigate to a challenge creation page or open a modal
    // router.push(`/workout-battles/create?opponent=${opponentId}`);
  }

  // Navigate to user profile
  const navigateToProfile = (username: string) => {
    router.push(`/profile/${username}`)
  }

  // Filter live battles based on search term and filter type
  const filterBattles = (battles) => {
    return battles.filter((battle) => {
      const matchesSearch =
        battle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        battle.competitors.some((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesType = filterType === "all" || battle.type === filterType
      return matchesSearch && matchesType
    })
  }

  // Mock data for live battles
  const liveBattles = []

  const filteredBattles = filterBattles(liveBattles)

  // For demo purposes, we'll set hasAccess to true
  // In a real app, you would fetch this from your subscription system
  const subscriptionHasAccess = true

  // Wrap the content with the SubscriptionGate
  return (
    <div className="container py-6">
      <SubscriptionGate
        requiredTier="contender"
        title="Workout Battles"
        description="Compete with other members in real-time workout challenges."
        hasAccess={subscriptionHasAccess}
      >
        <div className="container mx-auto py-6 space-y-6">
          {/* Demo Selector - For testing only */}
          <Card className="bg-yellow-100/20 border-yellow-300 dark:bg-yellow-900/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Crown className="h-4 w-4 mr-2 text-yellow-600" />
                Demo Mode - Membership Tier Selector
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Select value={membershipTier} onValueChange={setMembershipTier}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select membership" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (Free)</SelectItem>
                    <SelectItem value="contender">Contender ($9.99)</SelectItem>
                    <SelectItem value="warrior">Warrior ($19.99)</SelectItem>
                    <SelectItem value="legend">Legend ($39.99)</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">
                  Current tier:{" "}
                  <span className="font-medium">
                    {membershipTier.charAt(0).toUpperCase() + membershipTier.slice(1)}
                  </span>
                </span>
              </div>
            </CardContent>
          </Card>

          {isPremiumMember ? (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight flex items-center">
                    <Trophy className="mr-2 h-8 w-8 text-primary" />
                    Workout Battles
                  </h1>
                  <p className="text-muted-foreground">Challenge others and prove your strength</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button asChild>
                    <Link href="/workout-battles/create">
                      <Dumbbell className="mr-2 h-4 w-4" />
                      Create Battle
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/workout-battles/scheduled">
                      <Calendar className="mr-2 h-4 w-4" />
                      Scheduled Battles
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Live Battles</CardTitle>
                    <CardDescription>Watch ongoing battles happening right now</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search battles..."
                            className="pl-8 w-[200px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>

                      <Select defaultValue="all" onValueChange={setFilterType}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="rep-count">Rep Count</SelectItem>
                          <SelectItem value="endurance">Endurance</SelectItem>
                          <SelectItem value="weight">Weight</SelectItem>
                          <SelectItem value="circuit">Circuit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      {filteredBattles.length > 0 ? (
                        filteredBattles.map((battle) => (
                          <div key={battle.id} className="relative border rounded-lg overflow-hidden">
                            <div className="aspect-video bg-muted">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-2 w-full h-full">
                                  <div className="relative">
                                    <video
                                      className="w-full h-full object-cover"
                                      poster="/placeholder.svg?height=240&width=320&text=Competitor+1"
                                      muted
                                      playsInline
                                    />
                                  </div>
                                  <div className="relative">
                                    <video
                                      className="w-full h-full object-cover"
                                      poster="/placeholder.svg?height=240&width=320&text=Competitor+2"
                                      muted
                                      playsInline
                                    />
                                  </div>
                                </div>
                                <Badge variant="destructive" className="absolute top-2 left-2">
                                  LIVE
                                </Badge>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold">{battle.title}</h3>
                                <Badge variant="secondary">
                                  {battle.type === "rep-count"
                                    ? "Rep Count"
                                    : battle.type === "endurance"
                                      ? "Endurance"
                                      : battle.type}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarImage src={battle.competitors[0].avatar} />
                                      <AvatarFallback>
                                        {battle.competitors[0].name.substring(0, 2).toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{battle.competitors[0].name}</span>
                                  </div>
                                  <span className="text-sm text-muted-foreground">vs</span>
                                  <div className="flex items-center">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarImage src={battle.competitors[1].avatar} />
                                      <AvatarFallback>
                                        {battle.competitors[1].name.substring(0, 2).toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{battle.competitors[1].name}</span>
                                  </div>
                                </div>
                                <Button size="sm" asChild>
                                  <Link href={`/workout-battles/${battle.id}`}>
                                    <Video className="h-4 w-4 mr-2" />
                                    Watch
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No battles found matching your search criteria
                        </div>
                      )}

                      {filteredBattles.length > 0 && (
                        <Button variant="outline" className="w-full">
                          Load More
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Stats</CardTitle>
                      <CardDescription>Battle performance summary</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4"></div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/workout-battles/stats">View Detailed Stats</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Battles</CardTitle>
                      <CardDescription>Your scheduled challenges</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4"></div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/workout-battles/scheduled">
                          <Calendar className="mr-2 h-4 w-4" />
                          View All Scheduled
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Opponents</CardTitle>
                      <CardDescription>Based on your skill level</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recommendedOpponents.map((opponent) => (
                          <div key={opponent.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar
                                className="h-10 w-10 mr-3 cursor-pointer"
                                onClick={() => navigateToProfile(opponent.username)}
                              >
                                <AvatarImage src={opponent.avatar} />
                                <AvatarFallback>{opponent.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div
                                  className="font-medium cursor-pointer hover:underline"
                                  onClick={() => navigateToProfile(opponent.username)}
                                >
                                  {opponent.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {opponent.tier} • {opponent.matchPercentage}% match
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant={challengedUsers.includes(opponent.id) ? "secondary" : "outline"}
                              onClick={() => handleChallenge(opponent.id, opponent.name)}
                              disabled={challengedUsers.includes(opponent.id)}
                            >
                              {challengedUsers.includes(opponent.id) ? "Challenged" : "Challenge"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-6 p-4 rounded-full bg-muted">
                <Lock className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Premium Feature</h1>
              <p className="text-muted-foreground max-w-md mb-8">
                Workout Battles are available exclusively to Contender, Warrior, and Legend members. Upgrade your
                membership to challenge other fitness enthusiasts and prove your strength.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mb-8">
                <Card className="border border-blue-500/30 bg-blue-500/5">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Contender</CardTitle>
                      <Shield className="h-5 w-5 text-blue-500" />
                    </div>
                    <CardDescription>$9.99/month</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>Basic Workout Battles</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-blue-500/30 hover:bg-blue-500/10" asChild>
                      <Link href="/membership-selection?plan=contender">Choose Plan</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border border-primary/30 bg-primary/5">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Warrior</CardTitle>
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <CardDescription>$19.99/month</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>Enhanced Workout Battles</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/membership-selection?plan=warrior">Choose Plan</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border border-amber-500/30 bg-amber-500/5">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Legend</CardTitle>
                      <Crown className="h-5 w-5 text-amber-500" />
                    </div>
                    <CardDescription>$39.99/month</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>Premium Workout Battles</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-amber-500/30 hover:bg-amber-500/10" asChild>
                      <Link href="/membership-selection?plan=legend">Choose Plan</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Button asChild>
                <Link href="/membership-selection">Upgrade Membership</Link>
              </Button>
            </div>
          )}
        </div>
      </SubscriptionGate>
    </div>
  )
}

