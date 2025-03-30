"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Check, Clock, Dumbbell, Gift, ShoppingBag, Star, Trophy, Bell, Mail } from "lucide-react"
import { SocialShare } from "@/components/social-share"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

export default function RewardsPage() {
  const [selectedReward, setSelectedReward] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [reminderReward, setReminderReward] = useState(null)
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false)
  const [reminderType, setReminderType] = useState("push")
  const [reminderTime, setReminderTime] = useState("1-day")
  const [emailReminder, setEmailReminder] = useState(true)
  const [pushReminder, setPushReminder] = useState(true)

  const currentMonthRewards = []

  const completedRewards = []

  const upcomingRewards = []

  const handleViewDetails = (reward) => {
    setSelectedReward(reward)
    setIsDialogOpen(true)
  }

  const handleSetReminder = (reward) => {
    setReminderReward(reward)
    setIsReminderDialogOpen(true)
  }

  const handleSaveReminder = () => {
    // In a real app, this would save the reminder to a database
    toast({
      title: "Reminder Set",
      description: `You'll be reminded about the ${reminderReward?.title} challenge.`,
    })
    setIsReminderDialogOpen(false)
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Rewards & Achievements</h1>
          <p className="text-muted-foreground">Complete challenges to earn exclusive rewards</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold"></div>
            <div className="text-sm text-muted-foreground">Points Earned</div>
          </div>
          <Button className="gap-2" asChild>
            <Link href="/rewards/redeem">
              <Gift className="h-4 w-4" />
              Redeem Points
            </Link>
          </Button>
          <SocialShare
            variant="icon-button"
            title="I've earned 1,250 points on 2D2N Fitness!"
            description="Check out my rewards and achievements on my fitness journey."
            achievementType="milestone"
            data={{
              name: "Points Milestone",
              level: "Silver",
              date: "This Month",
            }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">This Month's Challenges</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMonthRewards.map((reward) => (
            <Card key={reward.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <reward.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline">{Math.round((reward.progress / reward.target) * 100)}% Complete</Badge>
                </div>
                <CardTitle className="mt-4">{reward.title}</CardTitle>
                <CardDescription>{reward.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{reward.progress}</span>
                    <span>{reward.target}</span>
                  </div>
                  <Progress value={(reward.progress / reward.target) * 100} className="h-2" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="font-medium">Reward: {reward.reward}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleViewDetails(reward)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Tabs defaultValue="completed">
        <TabsList className="mb-6">
          <TabsTrigger value="completed">Completed Rewards</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Challenges</TabsTrigger>
          <TabsTrigger value="redeem">Redeem Points</TabsTrigger>
        </TabsList>

        <TabsContent value="completed">
          <div className="grid md:grid-cols-2 gap-6">
            {completedRewards.map((reward) => (
              <Card key={reward.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="bg-primary/20 p-3 rounded-full h-fit">
                      <reward.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{reward.title}</h3>
                        <Badge variant="outline">{reward.date}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span className="font-medium">Reward: {reward.reward}</span>
                        </div>
                        <Badge variant="secondary" className="gap-1">
                          <Check className="h-3 w-3" />
                          Claimed
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <SocialShare
                      variant="icon"
                      achievementType="milestone"
                      data={{
                        name: reward.title,
                        level: "Completed",
                        date: reward.date,
                      }}
                      title={`I earned the ${reward.title} reward on 2D2N Fitness!`}
                      description={reward.description}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingRewards.map((reward) => (
              <Card key={reward.id}>
                <CardHeader>
                  <div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
                    <reward.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{reward.title}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Starts: {reward.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="font-medium">Reward: {reward.reward}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => handleSetReminder(reward)}>
                    Set Reminder
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="redeem">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Redeem Your Points</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You have <span className="font-bold">1,250 points</span> to redeem for exclusive rewards and merchandise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[].map((item, index) => (
              <Card key={index}>
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="max-h-[150px]" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="font-bold">{item.points} points</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" disabled={item.points > 1250} asChild>
                    <Link href="/rewards/redeem">{item.points <= 1250 ? "Redeem" : "Not Enough Points"}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 bg-primary/10 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Want More Rewards?</h2>
            <p className="mb-4 max-w-2xl mx-auto">
              Complete more challenges and workouts to earn additional points and unlock exclusive rewards!
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="gap-2" asChild>
                <Link href="/workouts">
                  <Dumbbell className="h-4 w-4" />
                  View Workouts
                </Link>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/rewards/redeem">
                  <ShoppingBag className="h-4 w-4" />
                  View All Rewards
                </Link>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedReward && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <selectedReward.icon className="h-6 w-6 text-primary" />
                  </div>
                  <DialogTitle>{selectedReward.title}</DialogTitle>
                </div>
                <DialogDescription>{selectedReward.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">
                      {Math.round((selectedReward.progress / selectedReward.target) * 100)}%
                    </span>
                  </div>
                  <Progress value={(selectedReward.progress / selectedReward.target) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{selectedReward.progress} completed</span>
                    <span>{selectedReward.target} required</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Trophy className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Reward</h4>
                      <p className="text-sm">{selectedReward.reward}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Deadline</h4>
                      <p className="text-sm">{selectedReward.deadline}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">How to earn</h4>
                      <p className="text-sm">{selectedReward.howToEarn}</p>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="sm:justify-between">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
                <Button className="gap-2">
                  <Dumbbell className="h-4 w-4" />
                  Start Workout
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reminder Dialog */}
      <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {reminderReward && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <DialogTitle>Set Reminder</DialogTitle>
                </div>
                <DialogDescription>
                  Get notified when the {reminderReward.title} challenge starts on {reminderReward.startDateFull}.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-2">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">When to remind you</h4>
                  <RadioGroup defaultValue="1-day" onValueChange={setReminderTime} value={reminderTime}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-week" id="r1" />
                      <Label htmlFor="r1">1 week before</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3-days" id="r2" />
                      <Label htmlFor="r2">3 days before</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-day" id="r3" />
                      <Label htmlFor="r3">1 day before</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="same-day" id="r4" />
                      <Label htmlFor="r4">On the day</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Notification preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-notifications" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Push notifications
                      </Label>
                      <Switch id="push-notifications" checked={pushReminder} onCheckedChange={setPushReminder} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email notifications
                      </Label>
                      <Switch id="email-notifications" checked={emailReminder} onCheckedChange={setEmailReminder} />
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Challenge details</h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">Start date:</span> {reminderReward.startDateFull}
                    </p>
                    <p>
                      <span className="font-medium">Duration:</span> {reminderReward.duration}
                    </p>
                    <p>
                      <span className="font-medium">Reward:</span> {reminderReward.reward}
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReminderDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveReminder}>Save Reminder</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

