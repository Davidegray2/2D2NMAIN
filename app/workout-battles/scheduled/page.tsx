import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Dumbbell, Trophy, Users, Check, X, CalendarIcon, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ScheduledBattlesPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <Calendar className="mr-2 h-8 w-8 text-primary" />
          Scheduled Battles
        </h1>
        <p className="text-muted-foreground">Manage your upcoming battle schedule</p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-primary" />
                  Push-up Challenge
                </div>
                <Badge className="bg-green-600">Tomorrow</Badge>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>March 13, 2025 • 7:00 PM (Your Local Time)</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    <span>Max push-ups in 60 seconds</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Opponent: Alex Johnson</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>100 points wagered</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                    <AvatarFallback>YA</AvatarFallback>
                  </Avatar>
                  <div className="text-center font-bold">VS</div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Johnson" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Add to Calendar
              </Button>
              <Button variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Cancel Battle
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-primary" />
                  Squat Endurance
                </div>
                <Badge>March 17, 2025</Badge>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>March 17, 2025 • 6:30 PM (Your Local Time)</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    <span>Most squats in 2 minutes</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Opponent: Jordan Williams</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>250 points wagered</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                    <AvatarFallback>YA</AvatarFallback>
                  </Avatar>
                  <div className="text-center font-bold">VS</div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Jordan Williams" />
                    <AvatarFallback>JW</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Add to Calendar
              </Button>
              <Button variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Cancel Battle
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-primary" />
                  Deadlift Challenge
                </div>
                <Badge variant="outline" className="border-amber-500 text-amber-500">
                  Awaiting Response
                </Badge>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Proposed: March 20, 2025 • 5:00 PM</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    <span>Max weight deadlift (3 attempts)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Challenged: Taylor Smith</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>500 points wagered</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                    <AvatarFallback>YA</AvatarFallback>
                  </Avatar>
                  <div className="text-center font-bold">VS</div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Taylor Smith" />
                    <AvatarFallback>TS</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Alternative Times Proposed:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>March 21, 2025 • 6:00 PM</span>
                    </div>
                    <div>
                      <Badge variant="outline" className="border-amber-500 text-amber-500">
                        Pending
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>March 22, 2025 • 10:00 AM</span>
                    </div>
                    <div>
                      <Badge variant="outline" className="border-amber-500 text-amber-500">
                        Pending
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <AlertCircle className="mr-2 h-4 w-4" />
                Send Reminder
              </Button>
              <Button variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Cancel Challenge
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-primary" />
                  AMRAP Challenge
                </div>
                <Badge variant="outline" className="border-blue-500 text-blue-500">
                  Response Required
                </Badge>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Proposed by: Casey Brown</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    <span>AMRAP in 10 minutes: 10 burpees, 15 kettlebell swings, 20 air squats</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Challenger: Casey Brown</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>300 points wagered</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Casey Brown" />
                    <AvatarFallback>CB</AvatarFallback>
                  </Avatar>
                  <div className="text-center font-bold">VS</div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                    <AvatarFallback>YA</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Proposed Times:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>March 18, 2025 • 7:30 PM</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <X className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="h-8">
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>March 19, 2025 • 6:00 PM</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <X className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="h-8">
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Message from Casey:</h4>
                <div className="p-3 bg-muted rounded-md text-sm">
                  "Hey, I've been working on my burpees and want to see how I stack up against you. Let me know if
                  either of these times work for you!"
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Propose Alternative Time
              </Button>
              <Button variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Decline Challenge
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-primary" />
                  Pull-up Challenge
                </div>
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Victory
                </Badge>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>March 5, 2025 • 5:30 PM</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    <span>Max pull-ups in 2 minutes</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Opponent: Morgan Lee</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-green-500">+200 points earned</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <Avatar className="h-12 w-12 mb-1">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                      <AvatarFallback>YA</AvatarFallback>
                    </Avatar>
                    <div className="text-lg font-bold">24</div>
                    <div className="text-xs text-muted-foreground">reps</div>
                  </div>
                  <div className="text-center font-bold">VS</div>
                  <div className="text-center">
                    <Avatar className="h-12 w-12 mb-1">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Morgan Lee" />
                      <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <div className="text-lg font-bold">19</div>
                    <div className="text-xs text-muted-foreground">reps</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Rematch
              </Button>
              <Link href="/workout-battles/past/pull-up-challenge-03052025">
                <Button>
                  <Trophy className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-primary" />
                  Burpee Challenge
                </div>
                <Badge variant="outline" className="border-red-500 text-red-500">
                  Defeat
                </Badge>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>February 28, 2025 • 6:00 PM</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    <span>Max burpees in 3 minutes</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Opponent: Alex Johnson</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-red-500">-150 points lost</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <Avatar className="h-12 w-12 mb-1">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                      <AvatarFallback>YA</AvatarFallback>
                    </Avatar>
                    <div className="text-lg font-bold">42</div>
                    <div className="text-xs text-muted-foreground">reps</div>
                  </div>
                  <div className="text-center font-bold">VS</div>
                  <div className="text-center">
                    <Avatar className="h-12 w-12 mb-1">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Johnson" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="text-lg font-bold">51</div>
                    <div className="text-xs text-muted-foreground">reps</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Rematch
              </Button>
              <Link href="/workout-battles/past/burpee-challenge-02282025">
                <Button>
                  <Trophy className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-primary" />
                  Kettlebell Swing Challenge
                </div>
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Victory
                </Badge>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>February 20, 2025 • 5:15 PM</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    <span>Most kettlebell swings in 5 minutes (35lb/16kg)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Opponent: Jordan Williams</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-green-500">+300 points earned</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <Avatar className="h-12 w-12 mb-1">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                      <AvatarFallback>YA</AvatarFallback>
                    </Avatar>
                    <div className="text-lg font-bold">112</div>
                    <div className="text-xs text-muted-foreground">reps</div>
                  </div>
                  <div className="text-center font-bold">VS</div>
                  <div className="text-center">
                    <Avatar className="h-12 w-12 mb-1">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Jordan Williams" />
                      <AvatarFallback>JW</AvatarFallback>
                    </Avatar>
                    <div className="text-lg font-bold">98</div>
                    <div className="text-xs text-muted-foreground">reps</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Rematch
              </Button>
              <Link href="/workout-battles/past/kettlebell-challenge-02202025">
                <Button>
                  <Trophy className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

