"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, UserPlus, Users, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for suggested spotters
const suggestedSpotters = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualSpotters: 5,
    workoutPreferences: ["Strength Training", "HIIT"],
    status: "Elite Member",
  },
  {
    id: 2,
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualSpotters: 3,
    workoutPreferences: ["Yoga", "Running"],
    status: "Premium Member",
  },
  {
    id: 3,
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualSpotters: 2,
    workoutPreferences: ["CrossFit", "Powerlifting"],
    status: "Elite Member",
  },
  {
    id: 4,
    name: "Sophia Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualSpotters: 4,
    workoutPreferences: ["Cardio", "Pilates"],
    status: "Premium Member",
  },
]

// Mock data for all users
const allUsers = [
  ...suggestedSpotters,
  {
    id: 5,
    name: "Daniel Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualSpotters: 0,
    workoutPreferences: ["Bodybuilding", "Nutrition"],
    status: "Basic Member",
  },
  {
    id: 6,
    name: "Olivia Anderson",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualSpotters: 1,
    workoutPreferences: ["Cycling", "Swimming"],
    status: "Premium Member",
  },
  {
    id: 7,
    name: "William Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualSpotters: 0,
    workoutPreferences: ["Calisthenics", "Martial Arts"],
    status: "Basic Member",
  },
]

// Mock data for sent requests
const sentRequests = [
  {
    id: 1,
    name: "Ethan Miller",
    avatar: "/placeholder.svg?height=40&width=40",
    sentDate: "2 days ago",
  },
  {
    id: 2,
    name: "Ava Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    sentDate: "1 week ago",
  },
]

export function FindSpottersDialog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [requestSent, setRequestSent] = useState<number[]>([])
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleSendRequest = (userId: number, userName: string) => {
    setRequestSent((prev) => [...prev, userId])

    toast({
      title: "Request sent",
      description: `Spotter request sent to ${userName}.`,
    })
  }

  const handleCancelRequest = (userId: number, userName: string) => {
    setRequestSent((prev) => prev.filter((id) => id !== userId))

    toast({
      title: "Request canceled",
      description: `Spotter request to ${userName} has been canceled.`,
      variant: "destructive",
    })
  }

  const handleViewProfile = (userName: string) => {
    // Navigate to profile
    window.location.href = `/profile/${userName.toLowerCase().replace(" ", "-")}`
    setOpen(false)
  }

  const filteredUsers = allUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <UserPlus className="h-4 w-4" />
          Find Spotters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Find Spotters</DialogTitle>
          <DialogDescription>
            Connect with other fitness enthusiasts to motivate each other and share your fitness journey
          </DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="suggested">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="suggested">Suggested</TabsTrigger>
            <TabsTrigger value="search">Search Results</TabsTrigger>
            <TabsTrigger value="sent">Sent Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="suggested" className="max-h-[400px] overflow-y-auto">
            <div className="space-y-4 py-2">
              {suggestedSpotters.map((spotter) => (
                <div key={spotter.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="cursor-pointer" onClick={() => handleViewProfile(spotter.name)}>
                      <Avatar>
                        <AvatarImage src={spotter.avatar} />
                        <AvatarFallback>{spotter.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div
                        className="font-medium cursor-pointer hover:underline"
                        onClick={() => handleViewProfile(spotter.name)}
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
                  {requestSent.includes(spotter.id) ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleCancelRequest(spotter.id, spotter.name)}
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  ) : (
                    <Button size="sm" className="gap-1" onClick={() => handleSendRequest(spotter.id, spotter.name)}>
                      <UserPlus className="h-4 w-4" />
                      Add
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="search" className="max-h-[400px] overflow-y-auto">
            {searchQuery.trim() === "" ? (
              <div className="text-center py-8">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Enter a name to search for spotters</p>
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="space-y-4 py-2">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="cursor-pointer" onClick={() => handleViewProfile(user.name)}>
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div
                          className="font-medium cursor-pointer hover:underline"
                          onClick={() => handleViewProfile(user.name)}
                        >
                          {user.name}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{user.mutualSpotters} mutual spotters</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.workoutPreferences.map((pref) => (
                            <Badge key={pref} variant="secondary" className="text-xs">
                              {pref}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    {requestSent.includes(user.id) ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => handleCancelRequest(user.id, user.name)}
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    ) : (
                      <Button size="sm" className="gap-1" onClick={() => handleSendRequest(user.id, user.name)}>
                        <UserPlus className="h-4 w-4" />
                        Add
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No users found matching "{searchQuery}"</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sent" className="max-h-[400px] overflow-y-auto">
            {sentRequests.length > 0 ? (
              <div className="space-y-4 py-2">
                {sentRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="cursor-pointer" onClick={() => handleViewProfile(request.name)}>
                        <Avatar>
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div
                          className="font-medium cursor-pointer hover:underline"
                          onClick={() => handleViewProfile(request.name)}
                        >
                          {request.name}
                        </div>
                        <div className="text-xs text-muted-foreground">Sent {request.sentDate}</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleCancelRequest(request.id, request.name)}
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No pending spotter requests</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

