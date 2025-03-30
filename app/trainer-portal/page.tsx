"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dumbbell, Utensils } from "lucide-react"
import { useTrainerAuth } from "@/contexts/trainer-auth-context"
import { TrainerNav } from "@/components/trainer-nav"

export default function TrainerPortalPage() {
  const router = useRouter()
  const { trainer, isLoading, isAuthenticated } = useTrainerAuth()

  useEffect(() => {
    // Check if trainer is logged in
    if (!isLoading && !isAuthenticated) {
      router.push("/trainer-login")
      return
    }
  }, [isLoading, isAuthenticated, router])

  const [activeClient, setActiveClient] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const trainerData = {
    name: trainer?.name,
    upcomingSessions: [],
    clients: [],
    earnings: {
      thisMonth: "$2,450",
      lastMonth: "$2,120",
      pending: "$350",
    },
  }

  const handleLogout = () => {
    localStorage.removeItem("trainerAuth")
    router.push("/trainer-login")
  }

  const filteredClients = trainerData?.clients.filter((client: any) => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || client.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getClientById = (id: string) => {
    return trainerData?.clients.find((client: any) => client.id === id)
  }

  const selectedClient = activeClient ? getClientById(activeClient) : null

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading trainer portal...</p>
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
              <h1 className="text-3xl font-bold">Trainer Portal</h1>
              <p className="text-muted-foreground">Welcome back, {trainer?.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-muted-foreground">Next: Today, 3:00 PM</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <p className="text-muted-foreground">2 online now</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$2,450</div>
                <p className="text-muted-foreground">↑ $330 from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <div className="aspect-video w-full relative">
                <img
                  src="/placeholder.svg?height=300&width=500&text=Client+Progress"
                  alt="Client Progress"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">Client Progress</h3>
                  <p className="text-sm text-gray-300">Track your clients' achievements</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-300 mb-4">
                  Monitor your clients' progress, provide feedback, and adjust their plans as needed.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-primary" />
                    <span className="text-sm text-white">Workouts Completed: 124</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-primary" />
                    <span className="text-sm text-white">Nutrition Adherence: 85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video w-full relative">
                <img
                  src="/placeholder.svg?height=300&width=500&text=Client+Communication"
                  alt="Client Communication"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">Client Communication</h3>
                  <p className="text-sm text-gray-300">Stay connected with your clients</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-300 mb-4">
                  Send messages, provide feedback, and schedule sessions with your clients.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Client Avatar" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-white">John Smith</h4>
                    <p className="text-xs text-muted-foreground">
                      Last message: "Feeling great after today's session!"
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Client Avatar" />
                    <AvatarFallback>ED</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-white">Emily Davis</h4>
                    <p className="text-xs text-muted-foreground">Last message: "Need to adjust my meal plan..."</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

