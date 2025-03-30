"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Skull,
  Flame,
  AlertTriangle,
  Clock,
  Dumbbell,
  Heart,
  Zap,
  CheckCircle2,
  Calendar,
  Trophy,
  Users,
  Star,
  ChevronRight,
  Info,
  Sparkles,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

type ExtremeWorkoutProps = {
  id: string
  name: string
  type: "challenge" | "routine"
  description: string
  longDescription?: string
  duration: string
  intensity?: string
  difficulty?: string
  warning: string
  exercises: {
    name: string
    sets: number
    reps: string | number
    rest: string
    notes?: string
  }[]
  requirements: string[]
  image: string
  wearableRequired: boolean
  inspirationSource?: string
  tags?: string[]
  completionRate?: number
  durationText?: string
}

export function ExtremeWorkoutDetail({
  id,
  name,
  type,
  description,
  longDescription,
  duration,
  intensity,
  difficulty,
  warning,
  exercises,
  requirements,
  image,
  wearableRequired,
  inspirationSource,
  tags,
  completionRate,
  durationText,
}: ExtremeWorkoutProps) {
  const [acknowledged, setAcknowledged] = useState(false)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Calculate difficulty level for progress bar
  const getDifficultyLevel = () => {
    if (!difficulty) return 50

    const difficultyMap: Record<string, number> = {
      beginner: 20,
      intermediate: 40,
      advanced: 60,
      extreme: 80,
      brutal: 90,
      insane: 95,
      legendary: 100,
      ADVANCED: 60,
      EXTREME: 80,
      BRUTAL: 90,
      INTENSE: 70,
    }

    const difficultyString = typeof difficulty === "string" ? difficulty : String(difficulty)
    return difficultyMap[difficultyString] || 50
  }

  return (
    <div className="space-y-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
          <Badge className="mb-2 self-start bg-red-500 hover:bg-red-600">
            {type === "challenge" ? "EXTREME CHALLENGE" : "BRUTAL ROUTINE"}
          </Badge>
          <h1 className="text-3xl font-bold text-white">{name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-white/80">
              <Clock className="h-4 w-4" />
              <span>{durationText || duration}</span>
            </div>
            <div className="flex items-center gap-1 text-white/80">
              <Flame className="h-4 w-4 text-red-500" />
              <span>{intensity || difficulty}</span>
            </div>
            {inspirationSource && (
              <div className="flex items-center gap-1 text-white/80">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Inspired by {inspirationSource}</span>
              </div>
            )}
            {completionRate !== undefined && (
              <div className="flex items-center gap-1 text-white/80">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>Completion Rate: {completionRate}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Extreme Workout Warning</AlertTitle>
        <AlertDescription>{warning}</AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About This {type === "challenge" ? "Challenge" : "Routine"}</CardTitle>
              <CardDescription>Push beyond your limits with this extreme workout</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{longDescription || description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">What You'll Need</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-black/10 dark:bg-white/5">
                    <Dumbbell className="h-3 w-3 mr-1" /> Heavy Weights
                  </Badge>
                  <Badge variant="outline" className="bg-black/10 dark:bg-white/5">
                    <Heart className="h-3 w-3 mr-1" /> Mental Toughness
                  </Badge>
                  <Badge variant="outline" className="bg-black/10 dark:bg-white/5">
                    <Zap className="h-3 w-3 mr-1" /> Recovery Plan
                  </Badge>
                  <Badge variant="outline" className="bg-black/10 dark:bg-white/5">
                    <Clock className="h-3 w-3 mr-1" /> {duration} Available
                  </Badge>
                  {wearableRequired && (
                    <Badge variant="outline" className="bg-black/10 dark:bg-white/5">
                      <Zap className="h-3 w-3 mr-1" /> Wearable Device
                    </Badge>
                  )}
                  {type === "challenge" && (
                    <Badge variant="outline" className="bg-black/10 dark:bg-white/5">
                      <Calendar className="h-3 w-3 mr-1" /> {durationText} Commitment
                    </Badge>
                  )}
                  {tags?.includes("team") && (
                    <Badge variant="outline" className="bg-black/10 dark:bg-white/5">
                      <Users className="h-3 w-3 mr-1" /> Training Partner
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Skull className="h-5 w-5 text-red-500" />
                Workout Breakdown
              </CardTitle>
              <CardDescription>{exercises.length} brutal exercises to push your limits</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed</TabsTrigger>
                  {type === "challenge" && <TabsTrigger value="schedule">Schedule</TabsTrigger>}
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-4">
                    {exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className={`flex justify-between items-center p-3 rounded-md transition-colors cursor-pointer ${
                          index === currentExercise
                            ? "bg-red-900/20 border border-red-500/30"
                            : "bg-black/5 dark:bg-white/5 hover:bg-red-900/10"
                        }`}
                        onClick={() => setCurrentExercise(index)}
                      >
                        <div>
                          <h4 className="font-medium">{exercise.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {exercise.sets} sets × {exercise.reps} | Rest: {exercise.rest}
                          </p>
                        </div>
                        <Badge variant={index === currentExercise ? "default" : "outline"}>
                          {index + 1}/{exercises.length}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="detailed">
                  <div className="space-y-6">
                    {exercises.map((exercise, index) => (
                      <Card key={index} className={index === currentExercise ? "border-red-500" : ""}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle>{exercise.name}</CardTitle>
                            <Badge>
                              {index + 1}/{exercises.length}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center p-2 rounded-md bg-black/5 dark:bg-white/5">
                              <p className="text-sm text-muted-foreground">Sets</p>
                              <p className="font-bold">{exercise.sets}</p>
                            </div>
                            <div className="text-center p-2 rounded-md bg-black/5 dark:bg-white/5">
                              <p className="text-sm text-muted-foreground">Reps</p>
                              <p className="font-bold">{exercise.reps}</p>
                            </div>
                            <div className="text-center p-2 rounded-md bg-black/5 dark:bg-white/5">
                              <p className="text-sm text-muted-foreground">Rest</p>
                              <p className="font-bold">{exercise.rest}</p>
                            </div>
                          </div>
                          {exercise.notes && (
                            <Alert>
                              <Info className="h-4 w-4" />
                              <AlertDescription>{exercise.notes}</AlertDescription>
                            </Alert>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="schedule">
                  <div className="space-y-4">
                    <Alert className="bg-amber-500/10 border-amber-500/30">
                      <Info className="h-4 w-4 text-amber-500" />
                      <AlertDescription className="text-amber-200">
                        This is a {durationText} challenge. Below is a sample schedule of how the challenge progresses.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      <div className="p-3 rounded-md bg-black/5 dark:bg-white/5">
                        <h4 className="font-medium mb-1">Week 1: Foundation</h4>
                        <p className="text-sm text-muted-foreground">
                          Establishing baseline performance and preparing your body for the challenges ahead.
                        </p>
                      </div>

                      <div className="p-3 rounded-md bg-black/5 dark:bg-white/5">
                        <h4 className="font-medium mb-1">Week 2: Intensity</h4>
                        <p className="text-sm text-muted-foreground">
                          Increasing workout intensity and volume to push beyond comfort zones.
                        </p>
                      </div>

                      {durationText?.includes("30") && (
                        <>
                          <div className="p-3 rounded-md bg-black/5 dark:bg-white/5">
                            <h4 className="font-medium mb-1">Week 3: Breaking Point</h4>
                            <p className="text-sm text-muted-foreground">
                              Maximum intensity week designed to test mental and physical limits.
                            </p>
                          </div>

                          <div className="p-3 rounded-md bg-black/5 dark:bg-white/5">
                            <h4 className="font-medium mb-1">Week 4: Culmination</h4>
                            <p className="text-sm text-muted-foreground">
                              Final push with performance tests to measure improvements.
                            </p>
                          </div>
                        </>
                      )}

                      {durationText?.includes("100") && (
                        <>
                          <div className="p-3 rounded-md bg-black/5 dark:bg-white/5">
                            <h4 className="font-medium mb-1">Weeks 3-10: Progressive Overload</h4>
                            <p className="text-sm text-muted-foreground">
                              Systematic increase in training volume and intensity over 8 weeks.
                            </p>
                          </div>

                          <div className="p-3 rounded-md bg-black/5 dark:bg-white/5">
                            <h4 className="font-medium mb-1">Weeks 11-14: Peak Phase</h4>
                            <p className="text-sm text-muted-foreground">
                              Maximum intensity training to solidify gains and test mental fortitude.
                            </p>
                          </div>
                        </>
                      )}

                      <div className="p-3 rounded-md bg-red-900/20 border border-red-500/30">
                        <h4 className="font-medium mb-1 flex items-center">
                          <Sparkles className="h-4 w-4 mr-1 text-amber-500" />
                          Completion Reward
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Finishers receive exclusive Underground status, digital badge, and 5000 reward points.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Difficulty Level</span>
                  <span className="text-sm font-medium">{typeof difficulty === "string" ? difficulty : "Unknown"}</span>
                </div>
                <Progress value={getDifficultyLevel()} className="h-2" />
              </div>

              {completionRate !== undefined && (
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Completion Rate</span>
                    <span className="text-sm font-medium">{completionRate}%</span>
                  </div>
                  <Progress value={completionRate} max={100} className="h-2" />
                </div>
              )}

              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Challenge Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <span className="text-sm">{type === "challenge" ? "Multi-day Challenge" : "Single Workout"}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Duration:</span>
                    <span className="text-sm">{durationText || duration}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Exercises:</span>
                    <span className="text-sm">{exercises.length}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Wearable Required:</span>
                    <span className="text-sm">{wearableRequired ? "Yes" : "No"}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Points Reward:</span>
                    <span className="text-sm font-medium text-amber-500">
                      {type === "challenge" ? "5,000" : "500"} pts
                    </span>
                  </div>
                </div>
              </div>

              {tags && Array.isArray(tags) && tags.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {String(tag)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Leaderboard Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-amber-500/10 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                      1
                    </div>
                    <span>JasonT92</span>
                  </div>
                  <span className="text-sm font-medium">{type === "challenge" ? "Completed" : "00:42:18"}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-500/10 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                      2
                    </div>
                    <span>IronWarrior</span>
                  </div>
                  <span className="text-sm font-medium">{type === "challenge" ? "Completed" : "00:45:33"}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-amber-800/10 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                      3
                    </div>
                    <span>FitnessQueen88</span>
                  </div>
                  <span className="text-sm font-medium">{type === "challenge" ? "Completed" : "00:47:05"}</span>
                </div>
                <Link
                  href="#"
                  className="flex items-center justify-center text-sm text-muted-foreground mt-2 hover:underline"
                >
                  View full leaderboard
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border-l-2 border-red-500 pl-3">
                  <p className="text-sm italic mb-1">
                    "This challenge broke me mentally and physically, then rebuilt me stronger. Worth every drop of
                    sweat."
                  </p>
                  <p className="text-xs text-muted-foreground">- IronWarrior</p>
                </div>
                <div className="border-l-2 border-red-500 pl-3">
                  <p className="text-sm italic mb-1">
                    "I've never pushed myself this hard before. Discovered what I'm truly capable of."
                  </p>
                  <p className="text-xs text-muted-foreground">- FitnessQueen88</p>
                </div>
                <div className="border-l-2 border-red-500 pl-3">
                  <p className="text-sm italic mb-1">
                    "Not for the faint of heart. I failed twice before completing it. Life-changing experience."
                  </p>
                  <p className="text-xs text-muted-foreground">- GymBeast24</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          disabled={!acknowledged}
          className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700"
          onClick={() => setShowSuccessModal(true)}
        >
          Begin {type === "challenge" ? "Challenge" : "Workout"}
        </Button>

        <div className="flex items-center gap-2">
          <Checkbox
            id="acknowledge"
            checked={acknowledged}
            onCheckedChange={() => setAcknowledged(!acknowledged)}
            className="rounded text-red-500 focus:ring-red-500"
          />
          <label htmlFor="acknowledge" className="text-sm">
            I acknowledge the extreme nature of this workout and accept all risks
          </label>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                Challenge Accepted!
              </CardTitle>
              <CardDescription>You've taken the first step toward conquering this extreme challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-md">
                <p className="text-sm">
                  {type === "challenge"
                    ? "Your challenge has been added to your active challenges. The first workout is now available."
                    : "Your workout has been added to your schedule. You can start it now or later today."}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">{name}</h4>
                  <p className="text-xs text-muted-foreground">{type === "challenge" ? durationText : duration}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Acceptance Bonus:</span>
                  <span className="font-medium text-amber-500">+100 points</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completion Reward:</span>
                  <span className="font-medium text-amber-500">+{type === "challenge" ? "5,000" : "500"} points</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600"
                onClick={() => setShowSuccessModal(false)}
              >
                {type === "challenge" ? "View Challenge Details" : "Start Workout Now"}
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => {
                  setShowSuccessModal(false)
                  window.location.href = "/dashboard"
                }}
              >
                Return to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

