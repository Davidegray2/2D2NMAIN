"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, ChevronUp, Flag, Calendar, ArrowLeft, Users, AlertTriangle } from "lucide-react"
import { SocialShare } from "@/components/social-share"
import { HypeComments } from "@/components/hype-comments"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function TransformationDetailPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(342)
  const [hyped, setHyped] = useState(false)
  const [hypeCount, setHypeCount] = useState(203)
  const { toast } = useToast()

  // Mock data for a single transformation
  const transformation = {
    id: Number.parseInt(params.id),
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      tier: "Elite",
      memberSince: "2022",
    },
    title: "6 Month Transformation - Down 30lbs!",
    description:
      "Started my journey 6 months ago at 210lbs. Now down to 180lbs and feeling stronger than ever! Couldn't have done it without this amazing community's support.\n\nMy approach was simple but consistent: strength training 4x per week, cardio 2x per week, and maintaining a caloric deficit of about 500 calories per day. I focused on protein intake (1g per pound of body weight) and made sure to get 7-8 hours of sleep every night.\n\nThe first month was the hardest, but once I started seeing results, it became addictive. The support from this community kept me going on tough days.",
    beforeImage: "/placeholder.svg?height=600&width=400&text=Before",
    afterImage: "/placeholder.svg?height=600&width=400&text=After",
    duration: "6 months",
    likes: 342,
    comments: 48,
    tags: ["WeightLoss", "Strength", "Consistency"],
    timeAgo: "2 days ago",
    stats: {
      weightLost: "30 lbs",
      muscleGained: "8 lbs",
      bodyFatReduction: "12%",
      workoutsCompleted: 124,
    },
  }

  // Mock comments
  const comments = [
    {
      id: 1,
      user: {
        name: "Jennifer Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        tier: "Warrior",
      },
      comment:
        "This is absolutely incredible! Your dedication really shows. What was the biggest change you made to your diet that helped the most?",
      likes: 24,
      timeAgo: "1 day ago",
    },
    {
      id: 2,
      user: {
        name: "Marcus Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        tier: "Beast Mode",
      },
      comment: "Beast mode activated! 💪 This is the kind of transformation that inspires everyone. Keep crushing it!",
      likes: 18,
      timeAgo: "1 day ago",
    },
    {
      id: 3,
      user: {
        name: "Sophia Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        tier: "Elite",
      },
      comment: "I'm just starting my journey and seeing this gives me so much hope. Thanks for sharing your progress!",
      likes: 15,
      timeAgo: "2 days ago",
    },
  ]

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleHype = () => {
    if (hyped) {
      setHypeCount(hypeCount - 1)
      toast({
        title: "Hype removed",
        description: "You've removed your hype from this transformation",
      })
    } else {
      setHypeCount(hypeCount + 1)
      toast({
        title: "Transformation hyped! 🔥",
        description: "You've hyped this amazing transformation",
      })
    }
    setHyped(!hyped)
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link href="/hype-wall" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Hype Wall
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/profile/${transformation.user.name.toLowerCase().replace(/ /g, "-")}`}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
                    title={`View ${transformation.user.name}'s profile`}
                  >
                    <Avatar>
                      <AvatarImage src={transformation.user.avatar} />
                      <AvatarFallback>{transformation.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center gap-2 group-hover:text-primary transition-colors">
                        {transformation.user.name}
                        <Badge variant="outline" className="ml-2">
                          {transformation.user.tier}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <span>{transformation.timeAgo}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Member since {transformation.user.memberSince}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <Button variant="ghost" size="icon">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>

              <h1 className="text-2xl font-bold mb-2">{transformation.title}</h1>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">
                  <Calendar className="h-3 w-3 mr-1" />
                  {transformation.duration}
                </Badge>
                {transformation.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden">
                    <img
                      src={transformation.beforeImage || "/placeholder.svg"}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center text-sm font-medium">Before</p>
                </div>
                <div className="space-y-2">
                  <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden">
                    <img
                      src={transformation.afterImage || "/placeholder.svg"}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center text-sm font-medium">After</p>
                </div>
              </div>

              <div className="whitespace-pre-line mb-6">{transformation.description}</div>

              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-2 ${liked ? "text-red-500" : ""}`}
                    onClick={handleLike}
                  >
                    <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                    <span>{likeCount}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{transformation.comments}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-2 ${hyped ? "text-primary font-medium" : ""}`}
                    onClick={handleHype}
                  >
                    <ChevronUp className={`h-4 w-4 ${hyped ? "text-primary" : ""}`} />
                    <span>{hypeCount}</span>
                  </Button>
                </div>
                <SocialShare
                  variant="icon"
                  title={`Check out ${transformation.user.name}'s amazing transformation on 2D2N Fitness!`}
                  description={transformation.description.substring(0, 100) + "..."}
                  imageUrl={transformation.afterImage}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              {/* Make sure the HypeComments component properly links to user profiles */}
              <HypeComments transformationId={transformation.id} comments={comments} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Transformation Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Weight Lost</span>
                    <span className="font-medium">{transformation.stats.weightLost}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Muscle Gained</span>
                    <span className="font-medium">{transformation.stats.muscleGained}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Body Fat Reduction</span>
                    <span className="font-medium">{transformation.stats.bodyFatReduction}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Workouts Completed</span>
                    <span className="font-medium">{transformation.stats.workoutsCompleted}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Similar Transformations</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((id) => (
                  <Link href={`/hype-wall/${id}`} key={id} className="block">
                    <div className="flex gap-3 group">
                      <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=64&width=64&text=Transformation+${id}`}
                          alt={`Transformation ${id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {id === 1
                            ? "Lost 25lbs in 4 Months"
                            : id === 2
                              ? "From Skinny to Strong"
                              : "My Fitness Comeback"}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {id === 1 ? "by Michael T." : id === 2 ? "by Sarah L." : "by David K."}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Hype Guidelines</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="bg-primary/20 p-1 rounded-full mt-0.5">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Keep all comments positive and supportive</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-primary/20 p-1 rounded-full mt-0.5">
                    <ChevronUp className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Celebrate progress of all kinds</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-primary/20 p-1 rounded-full mt-0.5">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Ask constructive questions</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-primary/20 p-1 rounded-full mt-0.5">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Share your own experiences</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-primary/20 p-1 rounded-full mt-0.5">
                    <Flag className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Report any negativity or inappropriate content</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-md border border-red-100 dark:border-red-900/30 mt-4">
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    <AlertTriangle className="h-4 w-4 inline mr-1" />
                    Negativity is not tolerated on the Hype Wall. Comments that criticize, mock, or discourage will be
                    removed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

