"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Facebook, Instagram, MapPin, Twitter, Youtube, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MessagingProvider } from "@/contexts/messaging-context"
import { useParams } from "next/navigation"

// Mock user data
const mockUsers = {
  /* Mock user data remains unchanged */
}
const achievements = [
  /* Achievements data remains unchanged */
]
const workouts = [
  /* Workouts data remains unchanged */
]

export default function UserProfilePage() {
  const params = useParams()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!params?.username) return
    setTimeout(() => {
      const user = mockUsers[params.username]
      if (user) {
        setUserData(user)
      } else {
        setNotFound(true)
      }
      setLoading(false)
    }, 500)
  }, [params?.username])

  if (loading) {
    return (
      <div className="container py-6 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="container py-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The user profile you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/hype-wall">
          <Button>Back to Hype Wall</Button>
        </Link>
      </div>
    )
  }

  return (
    <MessagingProvider>
      <div className="container py-6">
        <div className="mb-6">
          <Link href="/hype-wall" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hype Wall
          </Link>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userData.photoUrl} alt={userData.fullName} />
                  <AvatarFallback>{userData.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <Badge className="absolute -top-2 -right-2" variant="secondary">
                  {userData.tier}
                </Badge>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{userData.fullName}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{userData.location}</span>
                </div>
                <p className="mb-4">{userData.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {userData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Youtube className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="workouts">
          <TabsList className="mb-6">
            <TabsTrigger value="workouts">Recent Workouts</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="transformations">Transformations</TabsTrigger>
          </TabsList>
          <TabsContent value="workouts">{/* Workout content remains unchanged */}</TabsContent>
          <TabsContent value="achievements">{/* Achievements content remains unchanged */}</TabsContent>
          <TabsContent value="transformations">{/* Transformations content remains unchanged */}</TabsContent>
        </Tabs>
      </div>
    </MessagingProvider>
  )
}

