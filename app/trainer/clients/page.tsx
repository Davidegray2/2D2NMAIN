"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BrandName } from "@/components/brand-name"
import { Search, Filter, UserPlus, MessageSquare, Calendar, Activity, ChevronRight } from "lucide-react"

// Mock client data
const mockClients = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    goal: "Weight Loss",
    progress: 65,
    nextSession: "Tomorrow, 9:00 AM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jamie Smith",
    email: "jamie@example.com",
    goal: "Muscle Gain",
    progress: 42,
    nextSession: "Thursday, 4:30 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Taylor Wilson",
    email: "taylor@example.com",
    goal: "General Fitness",
    progress: 78,
    nextSession: "Friday, 6:00 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function TrainerClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClient, setSelectedClient] = useState<number | null>(null)

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.goal.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleClientSelect = (clientId: number) => {
    setSelectedClient(clientId === selectedClient ? null : clientId)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Client Management</h1>
          <p className="text-muted-foreground">Manage your clients and their fitness journeys</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full lg:w-2/3">
          <CardHeader>
            <CardTitle>Your Clients</CardTitle>
            <CardDescription>Manage and track your clients' progress</CardDescription>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active Clients</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {filteredClients.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No clients found. Try a different search term.</p>
                  </div>
                ) : (
                  filteredClients.map((client) => (
                    <div
                      key={client.id}
                      className={`p-4 rounded-lg border transition-all cursor-pointer ${
                        selectedClient === client.id ? "border-blue-400 bg-blue-50" : "hover:border-blue-200"
                      }`}
                      onClick={() => handleClientSelect(client.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={client.image} alt={client.name} />
                            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{client.name}</h3>
                            <p className="text-sm text-muted-foreground">{client.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {client.goal}
                          </span>
                          <ChevronRight
                            className={`h-5 w-5 transition-transform ${
                              selectedClient === client.id ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </div>

                      {selectedClient === client.id && (
                        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                            <Activity className="h-5 w-5 text-blue-500 mb-1" />
                            <span className="text-sm font-medium">Progress</span>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${client.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs mt-1">{client.progress}%</span>
                          </div>

                          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                            <Calendar className="h-5 w-5 text-blue-500 mb-1" />
                            <span className="text-sm font-medium">Next Session</span>
                            <span className="text-xs mt-1 text-center">{client.nextSession}</span>
                          </div>

                          <div className="flex justify-around items-center p-3 bg-gray-50 rounded-lg">
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              Message
                            </Button>
                            <Button size="sm" className="bg-blue-600">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="pending">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No pending client requests.</p>
                </div>
              </TabsContent>

              <TabsContent value="archived">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No archived clients.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Client Insights</CardTitle>
            <CardDescription>Quick stats about your client base</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600">{mockClients.length}</p>
                  <p className="text-sm text-muted-foreground">Active Clients</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600">2</p>
                  <p className="text-sm text-muted-foreground">Sessions Today</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Goals Breakdown</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Weight Loss</span>
                      <span>33%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "33%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Muscle Gain</span>
                      <span>33%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "33%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>General Fitness</span>
                      <span>33%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "33%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="text-sm p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Alex completed workout</p>
                    <p className="text-muted-foreground text-xs">Today, 10:23 AM</p>
                  </div>
                  <div className="text-sm p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Jamie updated goals</p>
                    <p className="text-muted-foreground text-xs">Yesterday, 4:45 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-center text-sm">
                  As a <BrandName /> trainer, you're making a difference in your clients' lives every day.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

