"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Plus } from "lucide-react"
import { useTrainerAuth } from "@/contexts/trainer-auth-context"
import { TrainerNav } from "@/components/trainer-nav"

export default function TrainerSchedulePage() {
  const router = useRouter()
  const { trainer, isLoading, isAuthenticated } = useTrainerAuth()
  const [schedule, setSchedule] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if trainer is logged in
    if (!isLoading && !isAuthenticated) {
      router.push("/trainer-login")
      return
    }

    // Load schedule data
    const loadScheduleData = async () => {
      // In a real app, this would be an API call to get schedule data
      // For demo, we'll use mock data
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      const mockSchedule = [
        {
          id: "session1",
          date: "2023-03-11",
          time: "3:00 PM",
          clientName: "John Smith",
          type: "1-on-1",
          focus: "Upper Body Strength",
        },
        {
          id: "session2",
          date: "2023-03-12",
          time: "10:00 AM",
          clientName: "Emily Davis",
          type: "1-on-1",
          focus: "HIIT Cardio",
        },
        {
          id: "session3",
          date: "2023-03-11",
          time: "6:00 PM",
          clientName: "Group Session",
          type: "Group",
          focus: "Core Strength",
          participants: 12,
        },
      ]

      setSchedule(mockSchedule)
      setLoading(false)
    }

    if (isAuthenticated) {
      loadScheduleData()
    }
  }, [isLoading, isAuthenticated, router])

  if (loading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading schedule...</p>
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
              <h1 className="text-3xl font-bold">Schedule</h1>
              <p className="text-muted-foreground">Manage your upcoming sessions</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Session
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled sessions for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.length > 0 ? (
                  schedule.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium">{session.clientName}</h3>
                          <div className="text-sm text-muted-foreground">
                            {session.type} • {session.focus}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{session.time}</div>
                          <div className="text-sm text-muted-foreground">{session.duration}</div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="font-medium mb-1">No upcoming sessions</h3>
                    <p className="text-sm">Schedule sessions with your clients to fill your calendar</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

