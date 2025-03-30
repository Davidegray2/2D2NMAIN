"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, User, Dumbbell, Activity, MessageSquare, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTrainerAuth } from "@/contexts/trainer-auth-context"
import { TrainerNav } from "@/components/trainer-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClientManagementPage() {
  const router = useRouter()
  const { trainer, isLoading, isAuthenticated } = useTrainerAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [clients, setClients] = useState<any[]>([])
  const [view, setView] = useState("grid")

  useEffect(() => {
    // Check if trainer is logged in
    if (!isLoading && !isAuthenticated) {
      router.push("/trainer-login")
      return
    }

    // Load client data
    const loadClientData = async () => {
      // In a real app, this would be an API call
      // For demo, we'll use mock data
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      const mockClients = [
        {
          id: "client1",
          name: "John Smith",
          plan: "12-Week Strength Program",
          nextSession: "Today, 3:00 PM",
          progress: 68,
          image: "/placeholder.svg?height=100&width=100",
          lastActive: "2 hours ago",
          goal: "Muscle gain",
          memberSince: "3 months ago",
          status: "active",
          stats: {
            workoutsCompleted: 42,
            averageRating: 4.8,
            missedSessions: 2,
          },
        },
        {
          id: "client2",
          name: "Emily Davis",
          plan: "Weight Loss Program",
          nextSession: "Tomorrow, 10:00 AM",
          progress: 45,
          image: "/placeholder.svg?height=100&width=100",
          lastActive: "Yesterday",
          goal: "Weight loss",
          memberSince: "2 months ago",
          status: "active",
          stats: {
            workoutsCompleted: 24,
            averageRating: 4.9,
            missedSessions: 1,
          },
        },
        {
          id: "client3",
          name: "Michael Brown",
          plan: "Athletic Performance",
          nextSession: "Wednesday, 4:30 PM",
          progress: 82,
          image: "/placeholder.svg?height=100&width=100",
          lastActive: "Just now",
          goal: "Sports performance",
          memberSince: "5 months ago",
          status: "active",
          stats: {
            workoutsCompleted: 58,
            averageRating: 4.7,
            missedSessions: 3,
          },
        },
        {
          id: "client4",
          name: "Jessica Wilson",
          plan: "Bodyweight Fitness",
          nextSession: "Friday, 5:15 PM",
          progress: 30,
          image: "/placeholder.svg?height=100&width=100",
          lastActive: "3 days ago",
          goal: "Toning",
          memberSince: "1 month ago",
          status: "inactive",
          stats: {
            workoutsCompleted: 12,
            averageRating: 4.6,
            missedSessions: 1,
          },
        },
        {
          id: "client5",
          name: "Robert Johnson",
          plan: "Powerlifting Program",
          nextSession: "Thursday, 2:00 PM",
          progress: 75,
          image: "/placeholder.svg?height=100&width=100",
          lastActive: "5 hours ago",
          goal: "Strength",
          memberSince: "4 months ago",
          status: "active",
          stats: {
            workoutsCompleted: 48,
            averageRating: 4.9,
            missedSessions: 0,
          },
        },
        {
          id: "client6",
          name: "Sarah Miller",
          plan: "Yoga & Flexibility",
          nextSession: "Saturday, 9:00 AM",
          progress: 60,
          image: "/placeholder.svg?height=100&width=100",
          lastActive: "1 day ago",
          goal: "Flexibility",
          memberSince: "2 months ago",
          status: "active",
          stats: {
            workoutsCompleted: 18,
            averageRating: 4.7,
            missedSessions: 2,
          },
        },
        {
          id: "client7",
          name: "David Wilson",
          plan: "Marathon Training",
          nextSession: "Monday, 6:00 AM",
          progress: 90,
          image: "/placeholder.svg?height=100&width=100",
          lastActive: "4 hours ago",
          goal: "Endurance",
          memberSince: "6 months ago",
          status: "active",
          stats: {
            workoutsCompleted: 65,
            averageRating: 4.8,
            missedSessions: 1,
          },
        },
        {
          id: "client8",
          name: "Jennifer Lee",
          plan: "Post-Pregnancy Fitness",
          nextSession: "Wednesday, 11:00 AM",
          progress: 40,
          image: "/placeholder.svg?height=100&width=100",
          lastActive: "2 days ago",
          goal: "Recovery",
          memberSince: "1 month ago",
          status: "active",
          stats: {
            workoutsCompleted: 8,
            averageRating: 5.0,
            missedSessions: 0,
          },
        },
      ]

      setClients(mockClients)
    }

    if (isAuthenticated) {
      loadClientData()
    }
  }, [isLoading, isAuthenticated, router])

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || client.status === filterStatus
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading client management...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden md:block border-r pr-6">
          <TrainerNav />
        </aside>

        <main>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Client Management</h1>
              <p className="text-muted-foreground">Manage and track all your clients</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle>Client Search & Filters</CardTitle>
                  <CardDescription>Find specific clients or filter by status</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={view === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setView("grid")}
                    className="w-10 p-0"
                  >
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
                      className="lucide lucide-grid-2x2"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 12h18" />
                      <path d="M12 3v18" />
                    </svg>
                  </Button>
                  <Button
                    variant={view === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setView("list")}
                    className="w-10 p-0"
                  >
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
                      className="lucide lucide-list"
                    >
                      <line x1="8" x2="21" y1="6" y2="6" />
                      <line x1="8" x2="21" y1="12" y2="12" />
                      <line x1="8" x2="21" y1="18" y2="18" />
                      <line x1="3" x2="3.01" y1="6" y2="6" />
                      <line x1="3" x2="3.01" y1="12" y2="12" />
                      <line x1="3" x2="3.01" y1="18" y2="18" />
                    </svg>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clients by name..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clients</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Clients ({clients.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({clients.filter((c) => c.status === "active").length})</TabsTrigger>
              <TabsTrigger value="inactive">
                Inactive ({clients.filter((c) => c.status === "inactive").length})
              </TabsTrigger>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              {view === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <Card key={client.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={client.image} alt={client.name} />
                              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{client.name}</CardTitle>
                              <CardDescription>
                                {client.goal} • {client.memberSince}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Program Progress</span>
                                <span className="font-medium">{client.progress}%</span>
                              </div>
                              <Progress value={client.progress} className="h-2" />
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Activity className="h-4 w-4" />
                              <span>Last active: {client.lastActive}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Dumbbell className="h-4 w-4" />
                              <span>{client.stats.workoutsCompleted} workouts completed</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <User className="h-4 w-4" />
                              <span>Next session: {client.nextSession}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href={`/messages?client=${client.id}`}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Link>
                          </Button>
                          <Button size="sm" className="w-full" asChild>
                            <Link href={`/trainer-portal/clients/${client.id}`}>
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 bg-muted rounded-lg">
                      <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No clients found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search or filters to find what you're looking for.
                      </p>
                      <Button>Add New Client</Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <Card key={client.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center p-4 gap-4">
                          <div className="flex items-center gap-3 flex-1">
                            <Avatar>
                              <AvatarImage src={client.image} alt={client.name} />
                              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{client.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {client.goal} • {client.memberSince}
                              </p>
                            </div>
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Program: {client.plan}</span>
                              <Badge variant={client.status === "active" ? "default" : "secondary"}>
                                {client.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span className="font-medium">{client.progress}%</span>
                            </div>
                            <Progress value={client.progress} className="h-1.5" />
                          </div>
                          <div className="flex-1 flex flex-col md:flex-row gap-2">
                            <Button variant="outline" size="sm" className="flex-1" asChild>
                              <Link href={`/messages?client=${client.id}`}>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message
                              </Link>
                            </Button>
                            <Button size="sm" className="flex-1" asChild>
                              <Link href={`/trainer-portal/clients/${client.id}`}>
                                View Details
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-muted rounded-lg">
                      <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No clients found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search or filters to find what you're looking for.
                      </p>
                      <Button>Add New Client</Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            <TabsContent value="active" className="mt-6">
              {/* Active clients content */}
            </TabsContent>
            <TabsContent value="inactive" className="mt-6">
              {/* Inactive clients content */}
            </TabsContent>
            <TabsContent value="recent" className="mt-6">
              {/* Recent activity content */}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

