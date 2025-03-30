"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Skull,
  Flame,
  Search,
  Filter,
  Clock,
  Trophy,
  Lock,
  ChevronRight,
  Dumbbell,
  Heart,
  AlertTriangle,
  Users,
  Star,
  Shield,
  Crown,
  Check,
} from "lucide-react"
import { undergroundCategories, undergroundChallenges, getFeaturedChallenges } from "@/data/underground-challenges"

export default function UndergroundPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("featured")
  const [membershipTier, setMembershipTier] = useState("basic")

  const isPremiumMember = membershipTier !== "basic"

  const featuredChallenges = getFeaturedChallenges()

  // Filter challenges based on search query
  const filteredChallenges = searchQuery
    ? undergroundChallenges.filter(
        (challenge) =>
          challenge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          challenge.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : undergroundChallenges

  return (
    <div className="container py-6">
      {/* Demo Selector - For testing only */}
      <Card className="bg-yellow-100/20 border-yellow-300 dark:bg-yellow-900/10 mb-6">
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
              <span className="font-medium">{membershipTier.charAt(0).toUpperCase() + membershipTier.slice(1)}</span>
            </span>
          </div>
        </CardContent>
      </Card>

      {isPremiumMember ? (
        <>
          <div className="relative mb-8 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <img
              src="/placeholder.svg?height=400&width=1200&text=UNDERGROUND+CHALLENGES"
              alt="Underground Challenges"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6">
              <Badge className="mb-4 bg-red-500 hover:bg-red-600">EXTREME TRAINING ZONE</Badge>
              <h1 className="text-4xl font-bold text-white mb-2">The Underground</h1>
              <p className="text-white/80 max-w-2xl mb-6">
                Enter at your own risk. These extreme challenges push beyond conventional limits and are designed for
                elite fitness enthusiasts only.
              </p>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="text-red-300 text-sm">
                  Consult a physician before attempting these extreme workouts
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search challenges..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>

          <Tabs defaultValue="featured" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="all">All Challenges</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="featured">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Flame className="h-5 w-5 text-red-500" />
                    Featured Challenges
                  </h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredChallenges.map((challenge) => (
                      <Card key={challenge.id} className="overflow-hidden">
                        <div className="aspect-video w-full relative">
                          <img
                            src={challenge.image || "/placeholder.svg"}
                            alt={challenge.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-red-500 hover:bg-red-600">
                              {challenge.type === "challenge" ? "CHALLENGE" : "ROUTINE"}
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
                            <Link href={`/underground/${challenge.id}`}>
                              {challenge.unlocked ? "View Challenge" : "Locked"}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Skull className="h-5 w-5 text-red-500" />
                    Extreme Workouts
                  </h2>

                  <div className="grid md:grid-cols-3 gap-6">
                    {undergroundChallenges
                      .filter((challenge) => challenge.type === "routine" && challenge.unlocked)
                      .slice(0, 3)
                      .map((challenge) => (
                        <Card key={challenge.id} className="overflow-hidden">
                          <div className="aspect-video w-full relative">
                            <img
                              src={challenge.image || "/placeholder.svg"}
                              alt={challenge.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-purple-500 hover:bg-purple-600">WORKOUT</Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{challenge.name}</h3>
                              <Badge variant="outline">{challenge.difficulty}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{challenge.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Flame className="h-3 w-3 text-red-500" />
                                <span>{challenge.intensity}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <Button className="w-full" asChild>
                              <Link href={`/underground/${challenge.id}`}>View Workout</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>

                  <div className="mt-4 text-center">
                    <Button variant="outline" className="gap-2" onClick={() => setActiveTab("all")}>
                      <span>View All Workouts</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="categories">
              <h2 className="text-2xl font-bold mb-6">Challenge Categories</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {undergroundCategories.map((category) => (
                  <Card key={category.id} className="overflow-hidden">
                    <div className="aspect-video w-full relative">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                        <p className="text-white/80 text-sm mb-2">{category.description}</p>
                        <div className="flex items-center gap-1 text-white/60 text-xs">
                          <Dumbbell className="h-3 w-3" />
                          <span>{category.count} challenges</span>
                        </div>
                      </div>
                    </div>
                    <CardFooter className="p-4">
                      <Button className="w-full" variant="outline" asChild>
                        <Link href={`/underground/category/${category.id}`}>Browse Challenges</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">All Underground Challenges</h2>

                {searchQuery && (
                  <div className="mb-6">
                    <p className="text-muted-foreground mb-2">
                      {filteredChallenges.length} results for "{searchQuery}"
                    </p>
                    <Button variant="ghost" onClick={() => setSearchQuery("")} className="h-8 px-2 text-xs">
                      Clear search
                    </Button>
                  </div>
                )}

                <div className="space-y-4">
                  {filteredChallenges.map((challenge) => (
                    <Card key={challenge.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 relative">
                          <img
                            src={challenge.image || "/placeholder.svg"}
                            alt={challenge.name}
                            className="w-full h-full object-cover aspect-video md:aspect-auto"
                          />
                          {!challenge.unlocked && (
                            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4">
                              <Lock className="h-6 w-6 text-red-500 mb-1" />
                              <p className="text-white text-center text-xs">Locked</p>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{challenge.name}</h3>
                              <Badge className={challenge.type === "challenge" ? "bg-red-500" : "bg-purple-500"}>
                                {challenge.type === "challenge" ? "CHALLENGE" : "WORKOUT"}
                              </Badge>
                            </div>
                            <Badge variant="outline">{challenge.difficulty}</Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{challenge.durationText || challenge.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Flame className="h-4 w-4 text-red-500" />
                              <span>{challenge.intensity}</span>
                            </div>
                            {challenge.completionRate !== undefined && (
                              <div className="flex items-center gap-1">
                                <Trophy className="h-4 w-4 text-amber-500" />
                                <span>{challenge.completionRate}% completion rate</span>
                              </div>
                            )}
                            {challenge.wearableRequired && (
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4 text-red-500" />
                                <span>Wearable Required</span>
                              </div>
                            )}
                            {challenge.tags.includes("team") && (
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>Partner Required</span>
                              </div>
                            )}
                          </div>

                          {challenge.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {challenge.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="h-4 w-4" />
                              <span className="font-medium">{challenge.points} points</span>
                            </div>
                            <Button
                              variant={challenge.unlocked ? "default" : "outline"}
                              disabled={!challenge.unlocked}
                              asChild
                            >
                              <Link href={`/underground/${challenge.id}`}>
                                {challenge.unlocked ? "View Challenge" : "Locked"}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {filteredChallenges.length === 0 && (
                    <div className="text-center py-12">
                      <Skull className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No challenges found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Your Completed Challenges</h2>

                <div className="text-center py-12">
                  <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No completed challenges yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Complete your first Underground challenge to earn elite status
                  </p>
                  <Button onClick={() => setActiveTab("featured")}>Browse Challenges</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-8" />

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/4 flex justify-center">
                <Skull className="h-16 w-16 text-red-500" />
              </div>
              <div className="md:w-3/4 text-center md:text-left">
                <h2 className="text-xl font-bold mb-2">Underground Rules</h2>
                <p className="text-muted-foreground mb-4">
                  The Underground is our most extreme training zone. These challenges are designed for elite fitness
                  enthusiasts and may not be suitable for everyone.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <span>Consult a physician before attempting any Underground challenge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <span>Always use proper form and safety equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <span>Scale exercises as needed based on your fitness level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <span>Stop immediately if you experience pain (not normal discomfort)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-6 p-4 rounded-full bg-muted">
            <Skull className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Premium Feature</h1>
          <p className="text-muted-foreground max-w-md mb-8">
            The Underground challenges are available exclusively to Contender, Warrior, and Legend members. Upgrade your
            membership to access extreme workouts and challenges designed for elite fitness enthusiasts.
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
                    <span>Basic Underground Challenges</span>
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
                    <span>Advanced Underground Challenges</span>
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
                    <span>Exclusive Underground Challenges</span>
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
  )
}

