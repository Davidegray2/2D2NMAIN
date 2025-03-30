"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Settings, Trophy, Medal, Users, Dumbbell, Flame, BarChart, Camera, Edit, Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { getUserTier, getNextTier, getProgressToNextTier, achievements } from "@/data/membership-tiers"

import {
  type AvatarCustomization,
  getAvatarItemsByCategory,
  renderAvatar,
  type AvatarCategory,
} from "@/data/avatar-system"

// Mock user data
const mockUser = {
  id: "user-001",
  username: "FitnessWarrior",
  email: "warrior@example.com",
  fullName: "Alex Johnson",
  joinDate: "2023-01-10",
  points: 850,
  achievements: ["ach-001", "ach-002", "ach-003", "ach-006"],
  stats: {
    workoutsCompleted: 87,
    longestStreak: 21,
    currentStreak: 5,
    challengesWon: 12,
    personalRecords: 8,
  },
  teamId: "team-001",
  useRealPhoto: false,
  profilePhotoUrl: "/placeholder.svg?height=200&width=200&text=Alex",
  avatarCustomization: {
    body: "body-002",
    face: "face-001",
    hair: "hair-004",
    outfit: "outfit-003",
    accessories: "accessory-003",
    background: "background-003",
  } as AvatarCustomization,
}

// Define TeamTheme type and teamThemes object
type TeamTheme = "wolves" | "spartans" | "gladiators" | "vikings" | "fire" | "water" | "earth" | "air"

const teamThemes: { [key in TeamTheme]: { name: string } } = {
  wolves: { name: "Wolves" },
  spartans: { name: "Spartans" },
  gladiators: { name: "Gladiators" },
  vikings: { name: "Vikings" },
  fire: { name: "Fire" },
  water: { name: "Water" },
  earth: { name: "Earth" },
  air: { name: "Air" },
}

export function EliteProfile() {
  const [activeTab, setActiveTab] = useState("profile")
  const [useRealPhoto, setUseRealPhoto] = useState(mockUser.useRealPhoto)
  const [profileData, setProfileData] = useState({
    fullName: mockUser.fullName,
    username: mockUser.username,
    location: "New York, NY",
    bio: "Fitness enthusiast focused on strength training and nutrition. Working towards my first marathon!",
    email: mockUser.email,
    phone: "+1 (555) 123-4567",
  })

  // Get user's current tier
  const userTier = getUserTier(mockUser.points)

  // Get user's next tier
  const nextTier = getNextTier(mockUser.points)

  // Get progress to next tier
  const progressToNextTier = getProgressToNextTier(mockUser.points)

  // Get user's completed achievements
  const userAchievements = achievements.filter((achievement) => mockUser.achievements.includes(achievement.id))

  // Get user's avatar or photo
  const userAvatar = useRealPhoto ? mockUser.profilePhotoUrl : renderAvatar(mockUser.avatarCustomization)

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar - User info */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardHeader className="relative pb-0">
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile information here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fullName" className="text-right">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input
                          id="username"
                          value={profileData.username}
                          onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bio" className="text-right">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() => {
                          // In a real app, this would save the profile data to the server
                          alert("Profile updated successfully!")
                        }}
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  {useRealPhoto ? (
                    <Avatar className="h-24 w-24 border-4" style={{ borderColor: userTier.color }}>
                      <AvatarImage src={mockUser.profilePhotoUrl} alt={mockUser.username} />
                      <AvatarFallback>{mockUser.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div
                      className="relative h-32 w-32 overflow-hidden rounded-full border-4"
                      style={{ borderColor: userTier.color }}
                    >
                      <img src={userAvatar || "/placeholder.svg"} alt="Avatar" className="object-cover w-full h-full" />
                    </div>
                  )}
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                    onClick={() => setUseRealPhoto(!useRealPhoto)}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-xl">{profileData.username}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="text-white" style={{ backgroundColor: userTier.color }}>
                    {userTier.name}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Member since</span>
                    <span>{new Date(mockUser.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Total Points</span>
                    <span className="font-medium">{mockUser.points}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Achievements</span>
                    <span>{mockUser.achievements.length}</span>
                  </div>
                </div>

                {nextTier && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next Tier</span>
                      <span style={{ color: nextTier.color }}>{nextTier.name}</span>
                    </div>
                    <Progress value={progressToNextTier} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{mockUser.points} pts</span>
                      <span>{nextTier.requiredPoints} pts</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-md">
                    <Dumbbell className="h-4 w-4 mb-1 text-primary" />
                    <span className="text-lg font-bold">{mockUser.stats.workoutsCompleted}</span>
                    <span className="text-xs text-muted-foreground">Workouts</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-md">
                    <Flame className="h-4 w-4 mb-1 text-primary" />
                    <span className="text-lg font-bold">{mockUser.stats.currentStreak}</span>
                    <span className="text-xs text-muted-foreground">Streak</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-md">
                    <Trophy className="h-4 w-4 mb-1 text-primary" />
                    <span className="text-lg font-bold">{mockUser.stats.challengesWon}</span>
                    <span className="text-xs text-muted-foreground">Wins</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Teams</CardTitle>
              <CardDescription>Join a team to compete in challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-1">No Team Joined</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Join a team to compete in challenges and earn exclusive rewards
                </p>
                <Button>Browse Teams</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Medal className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="stats">
                <BarChart className="h-4 w-4 mr-2" />
                Stats
              </TabsTrigger>
              <TabsTrigger value="avatar">
                <User className="h-4 w-4 mr-2" />
                Avatar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Membership Status</CardTitle>
                  <CardDescription>Your current membership tier and benefits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 flex flex-col items-center text-center">
                      <div
                        className="h-24 w-24 rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: userTier.color }}
                      >
                        {userTier.icon && <userTier.icon className="h-12 w-12 text-white" />}
                      </div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: userTier.color }}>
                        {userTier.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{userTier.description}</p>
                    </div>

                    <div className="w-full md:w-2/3">
                      <h3 className="font-medium mb-3">Your Benefits</h3>
                      <ul className="space-y-2">
                        {userTier.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1 text-primary">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-check"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      {userTier.exclusiveFeatures.length > 0 && (
                        <>
                          <h3 className="font-medium mt-6 mb-3">Exclusive Features</h3>
                          <ul className="space-y-2">
                            {userTier.exclusiveFeatures.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="mt-1 text-primary">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-star"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </div>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>

                  {nextTier && (
                    <div className="mt-8">
                      <Separator className="mb-6" />
                      <h3 className="font-medium mb-4">Next Tier: {nextTier.name}</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress to {nextTier.name}</span>
                            <span>{progressToNextTier}%</span>
                          </div>
                          <Progress value={progressToNextTier} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>
                              {mockUser.points} / {nextTier.requiredPoints} points
                            </span>
                            <span>Need {nextTier.requiredPoints - mockUser.points} more points</span>
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Unlock these additional benefits:</h4>
                          <ul className="space-y-2">
                            {nextTier.benefits
                              .filter((benefit) => !userTier.benefits.includes(benefit))
                              .map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <div className="mt-1 text-muted-foreground">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="lucide lucide-lock"
                                    >
                                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                  </div>
                                  <span className="text-muted-foreground">{benefit}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Membership Tiers
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Your earned achievements and badges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userAchievements.map((achievement) => (
                      <Card key={achievement.id} className="overflow-hidden">
                        <div className="flex p-4">
                          <div
                            className="h-12 w-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                            style={{ backgroundColor: userTier.color }}
                          >
                            {achievement.icon && <achievement.icon className="h-6 w-6 text-white" />}
                          </div>
                          <div>
                            <h3 className="font-medium">{achievement.name}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <div className="flex items-center mt-1">
                              <Badge variant="secondary" className="text-xs">
                                +{achievement.points} pts
                              </Badge>
                              <span className="text-xs text-muted-foreground ml-2">
                                Earned on {new Date().toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium mb-4">Locked Achievements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements
                        .filter(
                          (achievement) => !mockUser.achievements.includes(achievement.id) && !achievement.isSecret,
                        )
                        .slice(0, 4)
                        .map((achievement) => (
                          <Card key={achievement.id} className="overflow-hidden bg-muted">
                            <div className="flex p-4">
                              <div className="h-12 w-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 bg-muted-foreground/20">
                                {achievement.icon && <achievement.icon className="h-6 w-6 text-muted-foreground" />}
                              </div>
                              <div>
                                <h3 className="font-medium">{achievement.name}</h3>
                                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                <div className="flex items-center mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    +{achievement.points} pts
                                  </Badge>
                                  <span className="text-xs text-muted-foreground ml-2">{achievement.criteria}</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Achievements
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Fitness Statistics</CardTitle>
                  <CardDescription>Track your progress and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Dumbbell className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold">{mockUser.stats.workoutsCompleted}</div>
                        <div className="text-sm text-muted-foreground">Workouts Completed</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Flame className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold">{mockUser.stats.longestStreak}</div>
                        <div className="text-sm text-muted-foreground">Longest Streak</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold">{mockUser.stats.challengesWon}</div>
                        <div className="text-sm text-muted-foreground">Challenges Won</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Medal className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold">{mockUser.stats.personalRecords}</div>
                        <div className="text-sm text-muted-foreground">Personal Records</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* More detailed stats would go here */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Workout Activity</h3>
                      <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Activity chart would go here</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Recent Personal Records</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <div className="font-medium">Bench Press</div>
                            <div className="text-sm text-muted-foreground">185 lbs x 5 reps</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">+10 lbs</div>
                            <div className="text-xs text-muted-foreground">June 1, 2023</div>
                          </div>
                        </div>
                        <div className="flex justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <div className="font-medium">5K Run</div>
                            <div className="text-sm text-muted-foreground">22:45</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">-1:20</div>
                            <div className="text-xs text-muted-foreground">May 28, 2023</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="avatar">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Customize Your Avatar</CardTitle>
                      <CardDescription>Create your unique fitness persona</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setUseRealPhoto(true)}>
                        <Upload className="h-4 w-4 mr-2" />
                        Use Photo
                      </Button>
                      <Button size="sm">Save Changes</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <div className="bg-muted rounded-lg p-4 flex flex-col items-center">
                        <div className="h-64 w-64 relative mb-4">
                          <img
                            src={userAvatar || "/placeholder.svg"}
                            alt="Avatar Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <h3 className="font-medium">{mockUser.username}</h3>
                        <Badge className="mt-1 text-white" style={{ backgroundColor: userTier.color }}>
                          {userTier.name}
                        </Badge>
                      </div>
                    </div>

                    <div className="w-full md:w-2/3">
                      <Tabs defaultValue="body">
                        <TabsList className="flex flex-wrap h-auto">
                          <TabsTrigger value="body">Body</TabsTrigger>
                          <TabsTrigger value="face">Face</TabsTrigger>
                          <TabsTrigger value="hair">Hair</TabsTrigger>
                          <TabsTrigger value="skin">Skin</TabsTrigger>
                          <TabsTrigger value="facial_hair">Facial Hair</TabsTrigger>
                          <TabsTrigger value="outfit">Outfit</TabsTrigger>
                          <TabsTrigger value="accessories">Accessories</TabsTrigger>
                          <TabsTrigger value="background">Background</TabsTrigger>
                        </TabsList>

                        {["body", "face", "hair", "skin", "facial_hair", "outfit", "accessories", "background"].map(
                          (category) => (
                            <TabsContent key={category} value={category}>
                              <ScrollArea className="h-[300px] pr-4">
                                <div className="grid grid-cols-3 gap-4">
                                  {getAvatarItemsByCategory(category as AvatarCategory).map((item) => (
                                    <div
                                      key={item.id}
                                      className={`p-2 border rounded-lg cursor-pointer transition-all ${
                                        mockUser.avatarCustomization[
                                          category as keyof typeof mockUser.avatarCustomization
                                        ] === item.id
                                          ? "border-primary bg-primary/10"
                                          : "border-muted-foreground/20 hover:border-primary"
                                      }`}
                                    >
                                      <div className="flex flex-col items-center">
                                        <img
                                          src={item.thumbnailUrl || "/placeholder.svg"}
                                          alt={item.name}
                                          className="h-16 w-16 object-cover mb-2"
                                        />
                                        <span className="text-sm font-medium">{item.name}</span>
                                        {item.requiredTier && (
                                          <Badge variant="outline" className="mt-1 text-xs">
                                            {getUserTier(Number.parseInt(item.requiredTier.split("-")[1]) * 100).name}+
                                          </Badge>
                                        )}
                                        {item.isExclusive && (
                                          <Badge variant="secondary" className="mt-1 text-xs">
                                            Exclusive
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            </TabsContent>
                          ),
                        )}
                      </Tabs>

                      <div className="mt-6 flex justify-between">
                        <Button variant="outline">Reset to Default</Button>
                        <Button>Apply Changes</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

