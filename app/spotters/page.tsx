"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Users, UserPlus, Check, X, MessageSquare, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabaseClient"
import { DebugPanel } from "@/components/debug-panel"

export default function SpottersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const { toast } = useToast()
  const [addedSpotters, setAddedSpotters] = useState<string[]>([])
  const [mySpotters, setMySpotters] = useState([])
  const [pendingSpotterRequests, setPendingSpotterRequests] = useState([])
  const [suggestedSpottersList, setSuggestedSpottersList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState(null)
  const [debugInfo, setDebugInfo] = useState({ users: 0, error: null })
  const router = useRouter()

  // Function to fetch all users
  const fetchAllUsers = async () => {
    setIsLoading(true)
    try {
      console.log("Fetching all users...")

      // Get current user
      const { data: currentUserData } = await supabase.auth.getUser()
      const currentUser = currentUserData?.user
      setCurrentUserId(currentUser?.id || null)

      console.log("Current user:", currentUser?.id)

      // Simple query to get ALL users from the auth.users table
      // This is a more direct approach that should work even if profiles table isn't set up
      const { data: allUsers, error } = await supabase.from("users").select("*")

      if (error) {
        console.error("Error fetching users from users table:", error)

        // Try fetching from profiles as fallback
        const { data: profileUsers, error: profileError } = await supabase.from("profiles").select("*")

        if (profileError) {
          console.error("Error fetching from profiles too:", profileError)
          throw new Error("Could not fetch users from any table")
        }

        console.log("Found users in profiles table:", profileUsers?.length || 0)
        setDebugInfo({ users: profileUsers?.length || 0, error: null })

        // Transform profile users
        const transformedUsers = (profileUsers || []).map((user) => ({
          id: user.id,
          name: user.full_name || user.username || "User",
          username: user.username || user.id,
          avatar: user.avatar_url || `/placeholder.svg?height=40&width=40`,
          status: user.membership_tier || "Member",
          workoutPreferences: user.workout_preferences || ["Fitness"],
          mutualSpotters: 0,
        }))

        // Filter out current user
        const filteredUsers = transformedUsers.filter((user) => user.id !== currentUser?.id)

        // For simplicity, just put all users in suggested
        setSuggestedSpottersList(filteredUsers)
        setMySpotters([])
        setPendingSpotterRequests([])

        return
      }

      console.log("Found users in users table:", allUsers?.length || 0)
      setDebugInfo({ users: allUsers?.length || 0, error: null })

      // Transform users from auth.users
      const transformedUsers = (allUsers || []).map((user) => ({
        id: user.id,
        name: user.email?.split("@")[0] || "User",
        username: user.email?.split("@")[0] || user.id,
        avatar: `/placeholder.svg?height=40&width=40`,
        status: "Member",
        workoutPreferences: ["Fitness"],
        mutualSpotters: 0,
      }))

      // Filter out current user
      const filteredUsers = transformedUsers.filter((user) => user.id !== currentUser?.id)

      // For simplicity, just put all users in suggested
      setSuggestedSpottersList(filteredUsers)
      setMySpotters([])
      setPendingSpotterRequests([])
    } catch (error) {
      console.error("Error in fetchAllUsers:", error)
      setDebugInfo({ users: 0, error: error.message })

      // Generate mock data as fallback
      const mockUsers = generateMockUsers(5)
      setSuggestedSpottersList(mockUsers)
      setMySpotters([])
      setPendingSpotterRequests([])

      toast({
        title: "Error loading users",
        description: "Could not load users. Using sample data instead.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Load users on component mount
  useEffect(() => {
    fetchAllUsers()
  }, [])

  // Helper function to generate mock users
  function generateMockUsers(count) {
    const workoutTypes = [
      "Strength Training",
      "HIIT",
      "Yoga",
      "Running",
      "CrossFit",
      "Powerlifting",
      "Cardio",
      "Pilates",
    ]

    return Array.from({ length: count }, (_, i) => ({
      id: `mock-${i + 1}`,
      name: `User ${i + 1}`,
      username: `user${i + 1}`,
      avatar: `/placeholder.svg?height=40&width=40`,
      status: "Member",
      workoutPreferences: [workoutTypes[Math.floor(Math.random() * workoutTypes.length)]],
      mutualSpotters: Math.floor(Math.random() * 5),
    }))
  }

  const filteredSpotters = mySpotters.filter((spotter) => {
    const matchesSearch = spotter.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = !activeFilter || spotter.workoutPreferences.includes(activeFilter)
    return matchesSearch && matchesFilter
  })

  const filteredSuggested = suggestedSpottersList.filter((spotter) => {
    const matchesSearch = spotter.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = !activeFilter || spotter.workoutPreferences.includes(activeFilter)
    return matchesSearch && matchesFilter
  })

  const handleAcceptRequest = (requestId) => {
    const request = pendingSpotterRequests.find((req) => req.id === requestId)
    if (request) {
      // Add to spotters
      setMySpotters([...mySpotters, request])
      // Remove from requests
      setPendingSpotterRequests(pendingSpotterRequests.filter((req) => req.id !== requestId))

      toast({
        title: "Request accepted",
        description: `${request.name} has been added to your spotters.`,
      })
    }
  }

  const handleDeclineRequest = (requestId) => {
    const request = pendingSpotterRequests.find((req) => req.id === requestId)
    if (request) {
      setPendingSpotterRequests(pendingSpotterRequests.filter((req) => req.id !== requestId))

      toast({
        title: "Request declined",
        description: `You've declined ${request.name}'s spotter request.`,
        variant: "destructive",
      })
    }
  }

  const handleAddSpotter = (spotterId) => {
    if (addedSpotters.includes(spotterId)) {
      // Remove spotter
      setAddedSpotters(addedSpotters.filter((id) => id !== spotterId))

      // Find the spotter
      const spotter =
        suggestedSpottersList.find((s) => s.id === spotterId) || mySpotters.find((s) => s.id === spotterId)

      if (spotter) {
        toast({
          title: "Spotter removed",
          description: `${spotter.name} has been removed from your spotters.`,
          variant: "destructive",
        })
      }
    } else {
      // Add spotter
      setAddedSpotters([...addedSpotters, spotterId])

      // Find the spotter
      const spotter = suggestedSpottersList.find((s) => s.id === spotterId)

      if (spotter) {
        // Move from suggested to my spotters
        setMySpotters([...mySpotters, spotter])
        setSuggestedSpottersList(suggestedSpottersList.filter((s) => s.id !== spotterId))

        toast({
          title: "Spotter added!",
          description: `${spotter.name} has been added to your spotters.`,
        })
      }
    }
  }

  const handleViewProfile = (username) => {
    router.push(`/profile/${username}`)
  }

  const handleMessageUser = (userId, userName) => {
    toast({
      title: "Starting conversation",
      description: `Opening chat with ${userName}...`,
    })

    setTimeout(() => {
      router.push("/messages")
    }, 500)
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Spotters</h1>
          <p className="text-muted-foreground">Connect with fitness friends who motivate and support you</p>
          {debugInfo.error && <p className="text-xs text-red-500 mt-1">Error: {debugInfo.error}</p>}
          {debugInfo.users > 0 && (
            <p className="text-xs text-green-500 mt-1">Found {debugInfo.users} users in database</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={fetchAllUsers} disabled={isLoading} title="Refresh users">
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>
          <Button
            className="w-full md:w-auto"
            onClick={() => {
              toast({
                title: "Find Spotters",
                description: "Searching for spotters with similar interests...",
              })
              fetchAllUsers()
            }}
            disabled={isLoading}
          >
            Find Spotters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="suggested" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">My Spotters</TabsTrigger>
            <TabsTrigger value="pending">
              Pending Requests
              {pendingSpotterRequests.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {pendingSpotterRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="suggested">All Users</TabsTrigger>
          </TabsList>

          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search spotters"
              placeholder="Search users..."
            />
          </div>
        </div>

        <TabsContent value="all">
          <div className="mb-4 flex flex-wrap gap-2">
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(null)}
            >
              All
            </Button>
            {["Strength Training", "HIIT", "Yoga", "Running", "CrossFit", "Powerlifting", "Cardio", "Pilates"].map(
              (filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter === activeFilter ? null : filter)}
                >
                  {filter}
                </Button>
              ),
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredSpotters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSpotters.map((spotter) => (
                <Card key={spotter.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="cursor-pointer" onClick={() => handleViewProfile(spotter.username)}>
                          <AvatarImage src={spotter.avatar} alt={spotter.name} />
                          <AvatarFallback>{spotter.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div
                            className="font-medium cursor-pointer hover:underline"
                            onClick={() => handleViewProfile(spotter.username)}
                          >
                            {spotter.name}
                          </div>
                          <div className="text-sm text-muted-foreground">{spotter.status}</div>
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
                          onClick={() => handleMessageUser(spotter.id, spotter.name)}
                          title={`Message ${spotter.name}`}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Message</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleViewProfile(spotter.username)}>
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No spotters found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Add spotters from the "All Users" tab to see them here
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : pendingSpotterRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingSpotterRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="cursor-pointer" onClick={() => handleViewProfile(request.username)}>
                          <AvatarImage src={request.avatar} alt={request.name} />
                          <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div
                            className="font-medium cursor-pointer hover:underline"
                            onClick={() => handleViewProfile(request.username)}
                          >
                            {request.name}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{request.mutualSpotters} mutual spotters</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Requested recently</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {request.workoutPreferences.map((pref) => (
                              <Badge key={pref} variant="secondary" className="text-xs">
                                {pref}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                          onClick={() => handleDeclineRequest(request.id)}
                        >
                          <X className="h-4 w-4" />
                          Decline
                        </Button>
                        <Button size="sm" className="gap-1" onClick={() => handleAcceptRequest(request.id)}>
                          <Check className="h-4 w-4" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No pending spotter requests</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="suggested">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredSuggested.length > 0 ? (
            <div className="space-y-4">
              {filteredSuggested.map((spotter) => (
                <Card key={spotter.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="cursor-pointer" onClick={() => handleViewProfile(spotter.username)}>
                          <AvatarImage src={spotter.avatar} alt={spotter.name} />
                          <AvatarFallback>{spotter.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div
                            className="font-medium cursor-pointer hover:underline"
                            onClick={() => handleViewProfile(spotter.username)}
                          >
                            {spotter.name}
                          </div>
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
                          onClick={() => handleMessageUser(spotter.id, spotter.name)}
                          title={`Message ${spotter.name}`}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Message</span>
                        </Button>
                        <Button size="sm" className="gap-1" onClick={() => handleAddSpotter(spotter.id)}>
                          <UserPlus className="h-4 w-4" />
                          Add Spotter
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No users found</p>
              {searchQuery && (
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <DebugPanel />
    </div>
  )
}

