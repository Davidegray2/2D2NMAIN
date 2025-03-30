import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Video } from "lucide-react"

export default function Coaching() {
  const upcomingSessions = [
    {
      id: 1,
      title: "HIIT Cardio Blast",
      coach: "Sarah Williams",
      time: "Today, 6:00 PM",
      participants: 24,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Strength Training Fundamentals",
      coach: "Mike Chen",
      time: "Tomorrow, 7:30 AM",
      participants: 18,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Yoga for Recovery",
      coach: "Emma Wilson",
      time: "Wed, 5:15 PM",
      participants: 32,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const recordedSessions = [
    {
      id: 1,
      title: "Core Strength Masterclass",
      coach: "Thomas Wright",
      duration: "45 minutes",
      views: 1240,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Nutrition for Muscle Building",
      coach: "Jessica Lee",
      duration: "60 minutes",
      views: 980,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Mobility and Flexibility",
      coach: "David Kim",
      duration: "30 minutes",
      views: 1560,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">Live Coaching</h1>
          <p className="text-blue-200">Join live sessions with expert coaches or watch recorded content</p>
        </div>

        <div className="bg-blue-800/40 backdrop-blur-sm border border-blue-700 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Live Now: Full Body HIIT</h2>
              <p className="text-blue-200 mb-4">
                Join Coach Alex for a high-intensity interval training session designed to burn calories and build
                strength.
              </p>
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-2 text-blue-300">
                  <Clock className="h-4 w-4" />
                  <span>Started 10 minutes ago • 50 minutes remaining</span>
                </div>
                <div className="flex items-center gap-2 text-blue-300">
                  <Users className="h-4 w-4" />
                  <span>42 participants</span>
                </div>
              </div>
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Video className="h-5 w-5 mr-2" />
                Join Live Session
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="Live session preview"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Upcoming Live Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="bg-blue-800/40 backdrop-blur-sm border-blue-700 overflow-hidden">
                <img
                  src={session.image || "/placeholder.svg"}
                  alt={session.title}
                  className="w-full h-40 object-cover"
                />
                <CardHeader className="pb-2">
                  <CardTitle>{session.title}</CardTitle>
                  <CardDescription>Coach {session.coach}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-blue-300">
                      <Calendar className="h-4 w-4" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-300">
                      <Users className="h-4 w-4" />
                      <span>{session.participants} participants</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Reserve Spot</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Recorded Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recordedSessions.map((session) => (
              <Card key={session.id} className="bg-blue-800/40 backdrop-blur-sm border-blue-700 overflow-hidden">
                <img
                  src={session.image || "/placeholder.svg"}
                  alt={session.title}
                  className="w-full h-40 object-cover"
                />
                <CardHeader className="pb-2">
                  <CardTitle>{session.title}</CardTitle>
                  <CardDescription>Coach {session.coach}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-blue-300">
                      <Clock className="h-4 w-4" />
                      <span>{session.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-300">
                      <Video className="h-4 w-4" />
                      <span>{session.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Watch Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

