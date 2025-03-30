"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Timer, MessageSquare, ThumbsUp, Heart, Flame, Video, Lock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { membershipTiers } from "@/data/membership-tiers"

interface SpectatorModeProps {
  battleId: string
  competitors: {
    id: string
    name: string
    avatar: string
    score: number
  }[]
  exerciseType: string
  battleType?: string
  timeRemaining: number
  comments: {
    id: string
    user: {
      name: string
      avatar: string
    }
    message: string
    timestamp: string
  }[]
  requiredTier?: string
}

export default function SpectatorMode({
  battleId,
  competitors,
  exerciseType,
  battleType = "Rep Count",
  timeRemaining,
  comments,
  requiredTier = "Rookie",
}: SpectatorModeProps) {
  const [newComment, setNewComment] = useState("")
  const [localComments, setLocalComments] = useState(comments)
  const [error, setError] = useState<Error | null>(null)
  const [hasAccess, setHasAccess] = useState(true)

  // Mock user's membership tier - in a real app, this would come from auth context
  const userMembershipTier = "Contender" // Example: user is a Contender

  useEffect(() => {
    // Check if user has access to this battle
    const checkAccess = () => {
      const tierIndex = membershipTiers.findIndex((tier) => tier.name === requiredTier)
      const userTierIndex = membershipTiers.findIndex((tier) => tier.name === userMembershipTier)
      return userTierIndex >= tierIndex
    }

    setHasAccess(checkAccess())
  }, [requiredTier, userMembershipTier])

  const sendComment = () => {
    try {
      if (!newComment.trim()) return

      // In a real app, this would send to an API
      const newCommentObj = {
        id: `comment-${Date.now()}`,
        user: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        message: newComment,
        timestamp: new Date().toISOString(),
      }

      setLocalComments([...localComments, newCommentObj])
      setNewComment("")
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error("An unknown error occurred"))
      }
    }
  }

  const sendReaction = (type: string) => {
    try {
      // In a real app, this would send to an API
      const reactionMessage = {
        id: `reaction-${Date.now()}`,
        user: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        message: `sent a ${type} reaction!`,
        timestamp: new Date().toISOString(),
      }

      setLocalComments([...localComments, reactionMessage])
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error("An unknown error occurred"))
      }
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
            <span>Spectating: {exerciseType}</span>
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
          <span>Live battle in progress</span>
          {requiredTier !== "Rookie" && (
            <Badge variant="outline" className="ml-2">
              {requiredTier}+ Required
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasAccess ? (
          <div className="space-y-4">
            <Alert variant="destructive">
              <Lock className="h-4 w-4" />
              <AlertTitle>Membership Required</AlertTitle>
              <AlertDescription>
                This battle requires {requiredTier} tier or higher to spectate. Upgrade your membership to watch live
                battles.
              </AlertDescription>
            </Alert>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center p-6">
                <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Premium Content</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upgrade to {requiredTier} tier or higher to watch this live battle
                </p>
                <Button>Upgrade Membership</Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative mb-6">
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
                      {competitors[0]?.name}: {competitors[0]?.score}
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
                      {competitors[1]?.name}: {competitors[1]?.score}
                    </div>
                  </div>
                </div>
                <Badge variant="destructive" className="absolute top-2 left-2 flex items-center gap-1">
                  <Video className="h-3 w-3" /> LIVE
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {competitors.map((competitor) => (
                <div key={competitor.id} className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarImage src={competitor.avatar} alt={competitor.name} />
                    <AvatarFallback>{competitor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold">{competitor.name}</h3>
                  <div className="text-3xl font-bold my-2">{competitor.score}</div>
                  <Badge>{exerciseType} completed</Badge>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{competitors[0]?.name}</span>
                  <span className="text-sm font-medium">{competitors[1]?.name}</span>
                </div>
                <Progress
                  value={(competitors[0]?.score / (competitors[0]?.score + competitors[1]?.score || 1)) * 100}
                  className="h-2"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex space-x-2 mb-4">
                <Button variant="outline" size="sm" onClick={() => sendReaction("fire")} className="flex-1">
                  <Flame className="h-4 w-4 mr-1 text-orange-500" />
                  Fire
                </Button>
                <Button variant="outline" size="sm" onClick={() => sendReaction("heart")} className="flex-1">
                  <Heart className="h-4 w-4 mr-1 text-red-500" />
                  Heart
                </Button>
                <Button variant="outline" size="sm" onClick={() => sendReaction("thumbs up")} className="flex-1">
                  <ThumbsUp className="h-4 w-4 mr-1 text-blue-500" />
                  Like
                </Button>
              </div>

              <h3 className="font-medium mb-2">Live Comments</h3>
              <ScrollArea className="h-40 rounded-md border p-2 mb-4">
                {localComments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {new Date(comment.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-sm">{comment.message}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>

              <div className="flex space-x-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendComment()}
                />
                <Button onClick={sendComment}>
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

