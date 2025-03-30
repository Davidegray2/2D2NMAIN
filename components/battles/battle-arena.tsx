"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Timer, Trophy, MessageSquare, Video, VideoOff, Mic, MicOff } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { membershipTiers } from "@/data/membership-tiers"

interface BattleArenaProps {
  battleId: string
  opponent?: {
    id: string
    name: string
    avatar: string
    level: string
  }
  exerciseType: string
  battleType?: string
  timeLimit: number
  wagerAmount: number
  requiredTier?: string
}

export default function BattleArena({
  battleId,
  opponent,
  exerciseType,
  battleType = "Rep Count",
  timeLimit,
  wagerAmount,
  requiredTier = "Rookie",
}: BattleArenaProps) {
  const [userScore, setUserScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit)
  const [battleStatus, setBattleStatus] = useState<"waiting" | "countdown" | "active" | "completed">("waiting")
  const [countdown, setCountdown] = useState(3)
  const [error, setError] = useState<Error | null>(null)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(true)
  const [viewMode, setViewMode] = useState<"battle" | "spectator">("battle")

  // Refs for video elements
  const userVideoRef = useRef<HTMLVideoElement>(null)
  const opponentVideoRef = useRef<HTMLVideoElement>(null)

  // Mock user's membership tier - in a real app, this would come from auth context
  const userMembershipTier = "Warrior" // Example: user is a Warrior

  // Check if user has access to this battle
  const hasAccess = () => {
    const tierIndex = membershipTiers.findIndex((tier) => tier.name === requiredTier)
    const userTierIndex = membershipTiers.findIndex((tier) => tier.name === userMembershipTier)
    return userTierIndex >= tierIndex
  }

  useEffect(() => {
    // Simulate opponent progress
    if (battleStatus === "active") {
      const interval = setInterval(() => {
        setOpponentScore((prev) => prev + Math.floor(Math.random() * 2))
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [battleStatus])

  useEffect(() => {
    // Handle countdown and timer
    if (battleStatus === "countdown" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (battleStatus === "countdown" && countdown === 0) {
      setBattleStatus("active")
    }

    if (battleStatus === "active" && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    } else if (battleStatus === "active" && timeRemaining === 0) {
      setBattleStatus("completed")
    }
  }, [battleStatus, countdown, timeRemaining])

  // Mock function to simulate setting up video streams
  useEffect(() => {
    if (battleStatus === "active" && videoEnabled) {
      // In a real app, this would use WebRTC to set up peer connections
      console.log("Setting up video streams")

      // Mock video setup with placeholder videos
      if (userVideoRef.current) {
        userVideoRef.current.poster = "/placeholder.svg?height=240&width=320&text=Your+Camera"
      }

      if (opponentVideoRef.current) {
        opponentVideoRef.current.poster = "/placeholder.svg?height=240&width=320&text=Opponent+Camera"
      }
    }
  }, [battleStatus, videoEnabled])

  const startBattle = () => {
    try {
      if (!hasAccess()) {
        throw new Error(`This battle requires ${requiredTier} tier or higher`)
      }
      setBattleStatus("countdown")
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error("An unknown error occurred"))
      }
    }
  }

  const incrementUserScore = () => {
    if (battleStatus === "active") {
      setUserScore(userScore + 1)
    }
  }

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled)
  }

  const toggleMic = () => {
    setMicEnabled(!micEnabled)
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
        <CardFooter>
          <Button onClick={() => setError(null)}>Dismiss</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>Live Battle: {exerciseType}</span>
            <Badge variant="secondary" className="ml-1">
              {battleType}
            </Badge>
          </div>
          <Badge variant="outline" className="ml-2">
            <Timer className="h-4 w-4 mr-1" />
            {timeRemaining}s
          </Badge>
        </CardTitle>
        <CardDescription className="flex justify-between">
          <span>Wager: {wagerAmount} Respect Points</span>
          {requiredTier !== "Rookie" && (
            <Badge variant="outline" className="ml-2">
              {requiredTier}+ Required
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="battle" onValueChange={(value) => setViewMode(value as "battle" | "spectator")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="battle">Battle View</TabsTrigger>
            <TabsTrigger value="spectator">Spectator View</TabsTrigger>
          </TabsList>

          <TabsContent value="battle">
            {battleStatus === "waiting" && (
              <div className="flex flex-col items-center justify-center p-6">
                <h3 className="text-xl font-bold mb-4">Ready to Battle?</h3>
                <p className="text-center mb-6">
                  You're about to challenge {opponent?.name || "an opponent"} to a {exerciseType}{" "}
                  {battleType.toLowerCase()} battle!
                </p>
                {!hasAccess() ? (
                  <Alert className="mb-4">
                    <AlertTitle>Membership Required</AlertTitle>
                    <AlertDescription>
                      This battle requires {requiredTier} tier or higher. Upgrade your membership to participate.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Button onClick={startBattle} size="lg">
                    Start Battle
                  </Button>
                )}
              </div>
            )}

            {battleStatus === "countdown" && (
              <div className="flex flex-col items-center justify-center p-12">
                <h1 className="text-6xl font-bold animate-pulse">{countdown}</h1>
                <p className="mt-4">Get ready!</p>
              </div>
            )}

            {(battleStatus === "active" || battleStatus === "completed") && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden mb-3">
                      {videoEnabled ? (
                        <video
                          ref={userVideoRef}
                          className="w-full h-full object-cover"
                          poster="/placeholder.svg?height=240&width=320&text=Your+Camera"
                          muted
                          playsInline
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Your avatar" />
                            <AvatarFallback>YOU</AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 flex gap-2">
                        <Button size="icon" variant="secondary" onClick={toggleVideo}>
                          {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                        </Button>
                        <Button size="icon" variant="secondary" onClick={toggleMic}>
                          {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold">You</h3>
                    <div className="text-3xl font-bold my-2">{userScore}</div>
                    <Badge>{exerciseType} completed</Badge>
                    {battleStatus === "active" && (
                      <Button className="mt-4 h-20 w-full text-lg" onClick={incrementUserScore}>
                        <Dumbbell className="mr-2 h-5 w-5" />
                        TAP TO COUNT REP
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden mb-3">
                      {videoEnabled ? (
                        <video
                          ref={opponentVideoRef}
                          className="w-full h-full object-cover"
                          poster="/placeholder.svg?height=240&width=320&text=Opponent+Camera"
                          muted
                          playsInline
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Avatar className="h-20 w-20">
                            <AvatarImage
                              src={opponent?.avatar || "/placeholder.svg?height=80&width=80"}
                              alt={opponent?.name || "Opponent"}
                            />
                            <AvatarFallback>OPP</AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-black/50 text-white">
                          LIVE
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold">{opponent?.name || "Opponent"}</h3>
                    <div className="text-3xl font-bold my-2">{opponentScore}</div>
                    <Badge>{exerciseType} completed</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Your progress</span>
                      <span className="text-sm font-medium">{userScore > opponentScore ? "Leading" : "Trailing"}</span>
                    </div>
                    <Progress value={(userScore / (userScore + opponentScore || 1)) * 100} className="h-2" />
                  </div>
                </div>
              </>
            )}

            {battleStatus === "completed" && (
              <div className="mt-6 p-4 border rounded-lg bg-muted">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                  {userScore > opponentScore ? "Victory!" : userScore === opponentScore ? "Draw!" : "Defeat!"}
                </h3>
                <p>
                  {userScore > opponentScore
                    ? `You won by ${userScore - opponentScore} reps!`
                    : userScore === opponentScore
                      ? "It's a tie! Both of you gave it your all."
                      : `You were defeated by ${opponentScore - userScore} reps. Train harder!`}
                </p>
                <div className="flex justify-between mt-4">
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button>Rematch</Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="spectator">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="lg:col-span-2 bg-muted rounded-lg p-4 text-center">
                <h3 className="text-lg font-bold mb-2">Live Battle Stream</h3>
                <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-2 w-full h-full">
                      <div className="relative">
                        <video
                          className="w-full h-full object-cover"
                          poster="/placeholder.svg?height=240&width=320&text=Competitor+1"
                          muted
                          playsInline
                        />
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                          {opponent?.name || "Competitor 1"}: {opponentScore}
                        </div>
                      </div>
                      <div className="relative">
                        <video
                          className="w-full h-full object-cover"
                          poster="/placeholder.svg?height=240&width=320&text=Competitor+2"
                          muted
                          playsInline
                        />
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                          You: {userScore}
                        </div>
                      </div>
                    </div>
                    <Badge variant="destructive" className="absolute top-2 left-2">
                      LIVE
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium">{exerciseType}</span> • <span>{battleType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      <Timer className="h-4 w-4 mr-1" />
                      {timeRemaining}s
                    </Badge>
                    <Badge variant="secondary">24 watching</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2">Battle Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Exercise Type:</span>
                    <span className="font-medium">{exerciseType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Battle Type:</span>
                    <span className="font-medium">{battleType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Points Wagered:</span>
                    <span className="font-medium">{wagerAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Leader:</span>
                    <span className="font-medium">
                      {userScore > opponentScore ? "You" : opponent?.name || "Opponent"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lead Amount:</span>
                    <span className="font-medium">{Math.abs(userScore - opponentScore)} reps</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2">Live Comments</h3>
                <div className="h-[200px] overflow-y-auto space-y-2">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-xs font-medium">JohnDoe</div>
                      <p className="text-sm">Great form on those reps!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-xs font-medium">JaneSmith</div>
                      <p className="text-sm">This is an intense battle!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback>FW</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-xs font-medium">FitnessWarrior</div>
                      <p className="text-sm">Let's go! You can do it!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

