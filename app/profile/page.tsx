"use client"

import { CardDescription } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Camera, User, Upload, Check, MessageSquare, Users, UserPlus } from "lucide-react"
import { supabase, getCurrentUser } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FindSpottersDialog } from "@/components/find-spotters-dialog"
import { SpotterActionsMenu } from "@/components/spotter-actions-menu"

// Empty array for spotters until they're loaded from the database
const mockSpotters = []

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profileComplete, setProfileComplete] = useState(false)
  const [activeTab, setActiveTab] = useState("info")
  const [spotters, setSpotters] = useState(mockSpotters)
  const [activeProfileTab, setActiveProfileTab] = useState("posts")

  // Profile data state
  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    bio: "",
    location: "",
    fitnessLevel: "beginner",
    fitnessGoals: [],
    useRealPhoto: true,
  })

  // Photo/avatar state
  const [photoUrl, setPhotoUrl] = useState("/assets/default-profile.png")
  const [avatarUrl, setAvatarUrl] = useState("/assets/default-avatar.png")
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  // Stats for profile
  const [profileStats, setProfileStats] = useState({
    workoutsCompleted: 0,
    spottersCount: 0,
    achievements: 0,
    streakDays: 0,
  })

  // Avatar customization options
  const [selectedAvatar, setSelectedAvatar] = useState("default")
  const avatarOptions = [
    { id: "default", name: "Default", url: "/assets/avatars/default.png" },
    { id: "fitness1", name: "Fitness Pro", url: "/assets/avatars/fitness.png" },
    { id: "strength1", name: "Strength", url: "/assets/avatars/strength.png" },
    { id: "cardio1", name: "Cardio", url: "/assets/avatars/cardio.png" },
  ]

  // Fitness goals options
  const fitnessGoalsOptions = [
    "Lose Weight",
    "Build Muscle",
    "Improve Endurance",
    "Increase Strength",
    "Better Flexibility",
    "General Fitness",
  ]

  // Check authentication and get user data
  useEffect(() => {
    async function loadUserProfile() {
      try {
        setIsLoading(true)
        const currentUser = await getCurrentUser()

        if (!currentUser) {
          console.log("No authenticated user found, redirecting to login")
          // Don't redirect immediately, let the component handle the null user state
          setUser(null)
          setIsLoading(false)
          return
        }

        setUser(currentUser)
        console.log("User profile loaded:", currentUser)

        // Check if user has profile data in user metadata
        const userData = currentUser.user_metadata || {}

        if (userData.has_profile) {
          // User has existing profile data in metadata
          setProfileComplete(true)
          setProfileData({
            fullName: userData.full_name || "",
            username: userData.username || "",
            bio: userData.bio || "",
            location: userData.location || "",
            fitnessLevel: userData.fitness_level || "beginner",
            fitnessGoals: userData.fitness_goals || [],
            useRealPhoto: userData.use_real_photo !== undefined ? userData.use_real_photo : true,
          })

          if (userData.avatar_url) {
            setAvatarUrl(userData.avatar_url)
            setSelectedAvatar(userData.avatar_id || "default")
          }

          if (userData.photo_url) {
            setPhotoUrl(userData.photo_url)
          }

          // Set profile stats
          setProfileStats({
            workoutsCompleted: userData.workouts_completed || 0,
            spottersCount: spotters.length,
            achievements: userData.achievements_count || 0,
            streakDays: userData.streak_days || 0,
          })
        } else {
          // New user, pre-fill with any available data from auth
          setProfileData((prev) => ({
            ...prev,
            fullName: userData.full_name || "",
            username: userData.username || "",
          }))
        }

        // If this is a new user (first login), show a welcome message
        if (!userData.has_profile && !profileComplete) {
          toast({
            title: "Welcome to 2D2N!",
            description: "Please complete your profile to get started.",
            duration: 5000,
          })
        }
      } catch (error) {
        console.error("Error loading user profile:", error)
        toast({
          title: "Error loading profile",
          description: "There was a problem loading your profile data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [router, toast])

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await supabase.auth.signOut()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGoalToggle = (goal: string) => {
    setProfileData((prev) => {
      const currentGoals = [...(prev.fitnessGoals as string[])]
      if (currentGoals.includes(goal)) {
        return { ...prev, fitnessGoals: currentGoals.filter((g) => g !== goal) }
      } else {
        return { ...prev, fitnessGoals: [...currentGoals, goal] }
      }
    })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setPhotoFile(file)
      setPhotoUrl(URL.createObjectURL(file))
      setProfileData((prev) => ({ ...prev, useRealPhoto: true }))
    }
  }

  const handleAvatarSelect = (avatarId: string) => {
    const avatar = avatarOptions.find((a) => a.id === avatarId)
    if (avatar) {
      setSelectedAvatar(avatarId)
      setAvatarUrl(avatar.url)
      setProfileData((prev) => ({ ...prev, useRealPhoto: false }))
    }
  }

  const handlePhotoUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleTogglePhotoType = () => {
    setProfileData((prev) => ({ ...prev, useRealPhoto: !prev.useRealPhoto }))
  }

  const handleViewSpotterProfile = (username: string) => {
    router.push(`/profile/${username}`)
  }

  const handleMessageSpotter = (spotterId: number, spotterName: string) => {
    toast({
      title: "Opening conversation",
      description: `Starting chat with ${spotterName}...`,
    })

    // Navigate to messages page
    setTimeout(() => {
      router.push("/messages")
    }, 500)
  }

  const saveProfile = async () => {
    try {
      setIsSaving(true)

      if (!user) {
        throw new Error("User not authenticated")
      }

      let photoPath = photoUrl

      // Upload photo if there's a new one
      if (photoFile && profileData.useRealPhoto) {
        const fileName = `${user.id}-${Date.now()}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("profile-photos")
          .upload(fileName, photoFile)

        if (uploadError) {
          // If the bucket doesn't exist, we'll just use the URL of the file
          console.error("Error uploading photo:", uploadError)
          // Create object URL for the file
          photoPath = URL.createObjectURL(photoFile)
        } else {
          // Get public URL
          const { data: urlData } = supabase.storage.from("profile-photos").getPublicUrl(fileName)

          photoPath = urlData.publicUrl
        }
      }

      // Save profile data to user metadata
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: profileData.fullName,
          username: profileData.username,
          bio: profileData.bio,
          location: profileData.location,
          fitness_level: profileData.fitnessLevel,
          fitness_goals: profileData.fitnessGoals,
          use_real_photo: profileData.useRealPhoto,
          photo_url: photoPath,
          avatar_url: avatarUrl,
          avatar_id: selectedAvatar,
          has_profile: true,
          updated_at: new Date().toISOString(),
        },
      })

      if (error) {
        throw error
      }

      // Update the user state with the new data
      setUser(data.user)
      setProfileComplete(true)

      toast({
        title: "Profile saved",
        description: "Your profile has been updated successfully.",
      })
    } catch (error: any) {
      console.error("Error saving profile:", error)
      toast({
        title: "Error saving profile",
        description: error.message || "There was a problem saving your profile.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-6 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container py-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="mb-4">You need to be logged in to view your profile.</p>
              <Button onClick={() => router.push("/login?redirectTo=/profile")}>Sign In</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // New user profile setup view
  if (!profileComplete) {
    return (
      <div className="container py-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>Set up your profile to get the most out of 2D2N</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="info">
                  <User className="h-4 w-4 mr-2" />
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="photo">
                  <Camera className="h-4 w-4 mr-2" />
                  Profile Photo
                </TabsTrigger>
                <TabsTrigger value="fitness">
                  <User className="h-4 w-4 mr-2" />
                  Fitness Profile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Your full name"
                        value={profileData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="Choose a username"
                        value={profileData.username}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="City, Country"
                        value={profileData.location}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        placeholder="Tell us about yourself"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setActiveTab("photo")}>Next: Profile Photo</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="photo" className="space-y-4">
                <div className="flex flex-col items-center space-y-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-center mb-2">
                      <h3 className="text-lg font-medium">Choose Your Profile Image</h3>
                      <p className="text-sm text-muted-foreground">Upload a photo or select an avatar</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`relative h-24 w-24 rounded-full overflow-hidden border-2 ${
                            profileData.useRealPhoto ? "border-primary" : "border-transparent"
                          }`}
                          onClick={handleTogglePhotoType}
                        >
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={photoUrl} />
                            <AvatarFallback>
                              {profileData.fullName?.charAt(0) || user?.email?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          {profileData.useRealPhoto && (
                            <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <span className="text-sm mt-2">Photo</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`relative h-24 w-24 rounded-full overflow-hidden border-2 ${
                            !profileData.useRealPhoto ? "border-primary" : "border-transparent"
                          }`}
                          onClick={handleTogglePhotoType}
                        >
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback>{profileData.username?.charAt(0) || "A"}</AvatarFallback>
                          </Avatar>
                          {!profileData.useRealPhoto && (
                            <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <span className="text-sm mt-2">Avatar</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {profileData.useRealPhoto ? (
                    <div className="w-full max-w-md">
                      <h3 className="text-lg font-medium mb-4">Upload Your Photo</h3>
                      <div className="flex flex-col items-center space-y-4">
                        <Button onClick={handlePhotoUploadClick} className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Photo
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handlePhotoChange}
                        />
                        <p className="text-sm text-muted-foreground text-center">
                          Recommended: Square image, at least 200x200 pixels
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-md">
                      <h3 className="text-lg font-medium mb-4">Select an Avatar</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {avatarOptions.map((avatar) => (
                          <div
                            key={avatar.id}
                            className={`cursor-pointer rounded-lg p-2 flex flex-col items-center ${
                              selectedAvatar === avatar.id
                                ? "bg-primary/10 border border-primary"
                                : "border border-transparent hover:bg-muted"
                            }`}
                            onClick={() => handleAvatarSelect(avatar.id)}
                          >
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={avatar.url} />
                              <AvatarFallback>{avatar.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs mt-2 text-center">{avatar.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between w-full">
                    <Button variant="outline" onClick={() => setActiveTab("info")}>
                      Back
                    </Button>
                    <Button onClick={() => setActiveTab("fitness")}>Next: Fitness Profile</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fitness" className="space-y-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fitnessLevel">Fitness Level</Label>
                      <Select
                        value={profileData.fitnessLevel}
                        onValueChange={(value) => handleSelectChange("fitnessLevel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your fitness level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Fitness Goals (select all that apply)</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {fitnessGoalsOptions.map((goal) => (
                          <div
                            key={goal}
                            className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                              (profileData.fitnessGoals as string[]).includes(goal)
                                ? "bg-primary/10 border border-primary"
                                : "border hover:bg-muted"
                            }`}
                            onClick={() => handleGoalToggle(goal)}
                          >
                            <div
                              className={`h-4 w-4 rounded-sm flex items-center justify-center ${
                                (profileData.fitnessGoals as string[]).includes(goal)
                                  ? "bg-primary text-primary-foreground"
                                  : "border"
                              }`}
                            >
                              {(profileData.fitnessGoals as string[]).includes(goal) && <Check className="h-3 w-3" />}
                            </div>
                            <span>{goal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("photo")}>
                      Back
                    </Button>
                    <Button onClick={saveProfile} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Complete Profile"
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Existing user profile view
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Profile info */}
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profileData.useRealPhoto ? photoUrl : avatarUrl} />
                    <AvatarFallback>{profileData.fullName?.charAt(0) || user?.email?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                    onClick={() => setProfileComplete(false)}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h1 className="text-2xl font-bold">{profileData.fullName}</h1>
                <p className="text-muted-foreground">@{profileData.username}</p>
                {profileData.location && <p className="text-sm text-muted-foreground mt-1">{profileData.location}</p>}

                <div className="mt-4 flex flex-wrap justify-center gap-1">
                  {(profileData.fitnessGoals as string[]).map((goal) => (
                    <Badge key={goal} variant="secondary" className="text-xs">
                      {goal}
                    </Badge>
                  ))}
                </div>

                {profileData.bio && (
                  <div className="mt-4 text-sm">
                    <p>{profileData.bio}</p>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{profileStats.workoutsCompleted}</p>
                    <p className="text-xs text-muted-foreground">Workouts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{profileStats.spottersCount}</p>
                    <p className="text-xs text-muted-foreground">Spotters</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{profileStats.achievements}</p>
                    <p className="text-xs text-muted-foreground">Achievements</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{profileStats.streakDays}</p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                </div>

                <div className="mt-6 flex gap-2 w-full">
                  <Button variant="outline" onClick={handleSignOut} className="flex-1">
                    Sign Out
                  </Button>
                  <Button onClick={() => setProfileComplete(false)} className="flex-1">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Content */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <Tabs defaultValue="posts" onValueChange={setActiveProfileTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="workouts">Workouts</TabsTrigger>
                  <TabsTrigger value="spotters">Spotters</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent>
              {activeProfileTab === "posts" && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-2">Share your fitness journey with the community</p>
                  <Button className="mt-2" onClick={() => router.push("/community")}>
                    Create Your First Post
                  </Button>
                </div>
              )}
              {activeProfileTab === "workouts" && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-2">Track your fitness progress by logging workouts</p>
                  <Button className="mt-2" onClick={() => router.push("/workouts")}>
                    Start a Workout
                  </Button>
                </div>
              )}

              {activeProfileTab === "spotters" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Your Spotters</h3>
                    <FindSpottersDialog />
                  </div>

                  {spotters.length > 0 ? (
                    <div className="space-y-4">
                      {spotters.map((spotter) => (
                        <Card key={spotter.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar
                                  className="cursor-pointer"
                                  onClick={() => handleViewSpotterProfile(spotter.username)}
                                >
                                  <AvatarImage src={spotter.avatar} alt={spotter.name} />
                                  <AvatarFallback>{spotter.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div
                                    className="font-medium cursor-pointer hover:underline"
                                    onClick={() => handleViewSpotterProfile(spotter.username)}
                                  >
                                    {spotter.name}
                                  </div>
                                  <div className="text-sm text-muted-foreground">{spotter.status}</div>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Users className="h-3 w-3" />
                                    <span>{spotter.mutualSpotters} mutual spotters</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {spotter.workoutPreferences.map((pref) => (
                                      <Badge key={pref} variant="secondary" className="text-xs">
                                        {pref}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleMessageSpotter(spotter.id, spotter.name)}
                                  title={`Message ${spotter.name}`}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  <span className="sr-only">Message</span>
                                </Button>
                                <SpotterActionsMenu spotterId={spotter.id} spotterName={spotter.name} />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground mb-2">Connect with other fitness enthusiasts</p>
                      <Button className="mt-2" onClick={() => router.push("/spotters")}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Find Spotters
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>

            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" className="w-full" onClick={() => router.push("/spotters")}>
                Go to Spotters Page
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

