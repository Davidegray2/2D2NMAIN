import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Star, Users, Video, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function LiveTrainersPage() {
  const trainers = [
    {
      id: "trainer1",
      name: "Alex Johnson",
      specialty: "Strength & Conditioning",
      experience: "8 years",
      rating: 4.9,
      reviews: 127,
      nextAvailable: "Today, 3:00 PM",
      image: "/placeholder.svg?height=400&width=400",
      price: "$45",
      featured: true,
      specialties: ["Powerlifting", "HIIT", "Nutrition"],
    },
    {
      id: "trainer2",
      name: "Sarah Williams",
      specialty: "Yoga & Flexibility",
      experience: "6 years",
      rating: 4.8,
      reviews: 93,
      nextAvailable: "Tomorrow, 10:00 AM",
      image: "/placeholder.svg?height=400&width=400",
      price: "$40",
      featured: false,
      specialties: ["Vinyasa Yoga", "Meditation", "Recovery"],
    },
    {
      id: "trainer3",
      name: "Mike Chen",
      specialty: "Sports Performance",
      experience: "10 years",
      rating: 4.7,
      reviews: 156,
      nextAvailable: "Today, 6:30 PM",
      image: "/placeholder.svg?height=400&width=400",
      price: "$50",
      featured: false,
      specialties: ["Athletic Training", "Speed & Agility", "Injury Prevention"],
    },
    {
      id: "trainer4",
      name: "Emma Wilson",
      specialty: "Weight Loss",
      experience: "5 years",
      rating: 4.9,
      reviews: 78,
      nextAvailable: "Tomorrow, 2:15 PM",
      image: "/placeholder.svg?height=400&width=400",
      price: "$42",
      featured: false,
      specialties: ["Cardio", "Nutrition Planning", "Habit Formation"],
    },
    {
      id: "trainer5",
      name: "David Kim",
      specialty: "Bodybuilding",
      experience: "12 years",
      rating: 4.8,
      reviews: 210,
      nextAvailable: "Wednesday, 11:00 AM",
      image: "/placeholder.svg?height=400&width=400",
      price: "$55",
      featured: true,
      specialties: ["Muscle Gain", "Competition Prep", "Advanced Techniques"],
    },
    {
      id: "trainer6",
      name: "Jessica Lee",
      specialty: "Functional Fitness",
      experience: "7 years",
      rating: 4.7,
      reviews: 89,
      nextAvailable: "Today, 5:00 PM",
      image: "/placeholder.svg?height=400&width=400",
      price: "$45",
      featured: false,
      specialties: ["Mobility", "Core Strength", "Everyday Movement"],
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      title: "HIIT Cardio Blast",
      trainer: "Sarah Williams",
      time: "Today, 6:00 PM",
      participants: 24,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Strength Training Fundamentals",
      trainer: "Mike Chen",
      time: "Tomorrow, 7:30 AM",
      participants: 18,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="container py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Live Personal Trainers</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with certified fitness professionals for personalized coaching and real-time guidance.
        </p>
      </div>

      <div className="bg-primary/10 rounded-lg p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Live Group Session</h2>
            <p className="text-muted-foreground mb-4">
              Join our featured trainer Alex for a high-intensity full body workout. Perfect for all fitness levels!
            </p>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Starting in 15 minutes • 45 minute session</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>32 participants joined</span>
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

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Trainers</h2>
          <Button variant="outline" asChild>
            <Link href="/trainers">View All Trainers</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <Card key={trainer.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative">
                <img
                  src={trainer.image || "/placeholder.svg"}
                  alt={trainer.name}
                  className="w-full h-64 object-cover"
                />
                {trainer.featured && (
                  <Badge className="absolute top-3 right-3 bg-primary">
                    <Star className="h-3 w-3 mr-1 fill-primary-foreground" /> FEATURED
                  </Badge>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{trainer.name}</CardTitle>
                <CardDescription>
                  {trainer.specialty} • {trainer.experience} experience
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(trainer.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{trainer.rating}</span>
                  <span className="text-sm text-muted-foreground">({trainer.reviews} reviews)</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {trainer.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="font-normal">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Next available: {trainer.nextAvailable}</span>
                </div>
                <div className="text-lg font-bold">{trainer.price} per session</div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/messages?trainer=${trainer.id}`}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href={`/book-session?trainer=${trainer.id}`}>Book Session</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Upcoming Group Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingSessions.map((session) => (
            <Card key={session.id} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <img
                  src={session.image || "/placeholder.svg"}
                  alt={session.title}
                  className="w-full h-full object-cover md:col-span-1"
                />
                <div className="p-4 md:col-span-2">
                  <h3 className="font-bold text-lg mb-1">{session.title}</h3>
                  <p className="text-muted-foreground mb-3">with {session.trainer}</p>
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{session.participants} participants</span>
                    </div>
                  </div>
                  <Button className="w-full">Join Session</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Become a Certified Trainer</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Are you a fitness professional? Join our platform to connect with clients and grow your business.
        </p>
        <Button variant="outline" size="lg" asChild>
          <Link href="/trainer-application">Apply Now</Link>
        </Button>
      </div>
    </div>
  )
}

