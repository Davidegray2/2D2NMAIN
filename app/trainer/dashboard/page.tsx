"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BrandName } from "@/components/brand-name"
import { supabase } from "@/utils/supabaseClient"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import toast, { Toaster } from "react-hot-toast"
import { Users, CalendarIcon, Clock, Bell, CheckCircle } from "lucide-react"

// Type for appointments
type Appointment = {
  id: number
  client_id: string
  trainer_id: string
  date: string
  time: string
  status: "pending" | "approved" | "cancelled"
  client_name?: string
  notes?: string
}

export default function TrainerDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [stats, setStats] = useState({
    totalClients: 0,
    pendingAppointments: 0,
    completedSessions: 0,
    upcomingSessions: 0,
  })
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data, error } = await supabase.from("appointments").select("*").eq("trainer_id", "current-trainer-id") // Replace with actual trainer ID logic

        if (error) throw error

        if (data) {
          setAppointments(data)
        }
      } catch (error) {
        console.error("Error fetching appointments:", error)
        toast.error("Failed to load appointments")
      } finally {
        setIsLoading(false)
      }
    }

    const fetchStats = async () => {
      // This would be replaced with actual API calls
      setStats({
        totalClients: 12,
        pendingAppointments: 3,
        completedSessions: 45,
        upcomingSessions: 5,
      })
    }

    fetchAppointments()
    fetchStats()
  }, [])

  // Real-Time Subscription to Appointments for Trainers
  useEffect(() => {
    const channel = supabase
      .channel("trainer-appointments")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "appointments" }, (payload) => {
        toast.success(`New appointment request: ${payload.new.date} at ${payload.new.time}`)
        setAppointments((prev) => [...prev, payload.new as Appointment])
      })
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Get appointments for selected date
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((appt) => new Date(appt.date).toDateString() === date.toDateString())
  }

  const selectedDateAppointments = getAppointmentsForDate(selectedDate)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Toaster position="top-right" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Trainer Dashboard</h1>
          <p className="text-muted-foreground">Manage your schedule and clients</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                <p className="text-3xl font-bold">{stats.totalClients}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Appointments</p>
                <p className="text-3xl font-bold">{stats.pendingAppointments}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Sessions</p>
                <p className="text-3xl font-bold">{stats.completedSessions}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Sessions</p>
                <p className="text-3xl font-bold">{stats.upcomingSessions}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Section */}
        <Card className="w-full lg:w-1/2">
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Manage your appointments and schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="calendar-container">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={({ date }) => {
                  const hasAppointments = appointments.some(
                    (appt) => new Date(appt.date).toDateString() === date.toDateString(),
                  )
                  return hasAppointments ? <div className="bg-green-200 rounded-full w-2 h-2 mx-auto mt-1"></div> : null
                }}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Appointments for Selected Date */}
        <Card className="w-full lg:w-1/2">
          <CardHeader>
            <CardTitle>Appointments for {selectedDate.toDateString()}</CardTitle>
            <CardDescription>Manage appointments for the selected date</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading appointments...</div>
            ) : selectedDateAppointments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No appointments scheduled for this date</div>
            ) : (
              <ul className="space-y-3">
                {selectedDateAppointments.map((appt) => (
                  <li key={appt.id} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{appt.client_name || "Client #" + appt.client_id}</p>
                        <p className="text-sm text-muted-foreground">Time: {appt.time}</p>
                        <p className="text-sm mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              appt.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : appt.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                          </span>
                        </p>
                        {appt.notes && <p className="text-sm mt-2">Notes: {appt.notes}</p>}
                      </div>
                      <div className="space-x-2">
                        {appt.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600"
                              onClick={async () => {
                                try {
                                  await supabase.from("appointments").update({ status: "approved" }).eq("id", appt.id)

                                  setAppointments(
                                    appointments.map((a) => (a.id === appt.id ? { ...a, status: "approved" } : a)),
                                  )

                                  toast.success("Appointment approved")
                                } catch (error) {
                                  console.error("Error approving appointment:", error)
                                  toast.error("Failed to approve appointment")
                                }
                              }}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200"
                              onClick={async () => {
                                try {
                                  await supabase.from("appointments").update({ status: "cancelled" }).eq("id", appt.id)

                                  setAppointments(
                                    appointments.map((a) => (a.id === appt.id ? { ...a, status: "cancelled" } : a)),
                                  )

                                  toast.success("Appointment declined")
                                } catch (error) {
                                  console.error("Error declining appointment:", error)
                                  toast.error("Failed to decline appointment")
                                }
                              }}
                            >
                              Decline
                            </Button>
                          </>
                        )}
                        {appt.status === "approved" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={async () => {
                                const newDate = prompt("Enter new date (YYYY-MM-DD):")
                                if (!newDate) return
                                const newTime = prompt("Enter new time (HH:MM:SS):")
                                if (!newTime) return

                                try {
                                  await supabase
                                    .from("appointments")
                                    .update({ date: newDate, time: newTime })
                                    .eq("id", appt.id)

                                  setAppointments(
                                    appointments.map((a) =>
                                      a.id === appt.id ? { ...a, date: newDate, time: newTime } : a,
                                    ),
                                  )

                                  toast.success("Appointment rescheduled")
                                } catch (error) {
                                  console.error("Error rescheduling appointment:", error)
                                  toast.error("Failed to reschedule appointment")
                                }
                              }}
                            >
                              Reschedule
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200"
                              onClick={async () => {
                                try {
                                  await supabase.from("appointments").update({ status: "cancelled" }).eq("id", appt.id)

                                  setAppointments(
                                    appointments.map((a) => (a.id === appt.id ? { ...a, status: "cancelled" } : a)),
                                  )

                                  toast.success("Appointment cancelled")
                                } catch (error) {
                                  console.error("Error cancelling appointment:", error)
                                  toast.error("Failed to cancel appointment")
                                }
                              }}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Appointments Section */}
      <Card>
        <CardHeader>
          <CardTitle>All Upcoming Appointments</CardTitle>
          <CardDescription>View and manage all your upcoming appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {appointments.filter((a) => a.status === "approved" && new Date(a.date) >= new Date()).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No upcoming appointments</div>
              ) : (
                <ul className="space-y-3">
                  {appointments
                    .filter((a) => a.status === "approved" && new Date(a.date) >= new Date())
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((appt) => (
                      <li key={appt.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{appt.client_name || "Client #" + appt.client_id}</p>
                            <p className="text-sm text-muted-foreground">
                              Date: {new Date(appt.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-muted-foreground">Time: {appt.time}</p>
                          </div>
                          <div className="space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={async () => {
                                const newDate = prompt("Enter new date (YYYY-MM-DD):")
                                if (!newDate) return
                                const newTime = prompt("Enter new time (HH:MM:SS):")
                                if (!newTime) return

                                try {
                                  await supabase
                                    .from("appointments")
                                    .update({ date: newDate, time: newTime })
                                    .eq("id", appt.id)

                                  setAppointments(
                                    appointments.map((a) =>
                                      a.id === appt.id ? { ...a, date: newDate, time: newTime } : a,
                                    ),
                                  )

                                  toast.success("Appointment rescheduled")
                                } catch (error) {
                                  console.error("Error rescheduling appointment:", error)
                                  toast.error("Failed to reschedule appointment")
                                }
                              }}
                            >
                              Reschedule
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200"
                              onClick={async () => {
                                try {
                                  await supabase.from("appointments").update({ status: "cancelled" }).eq("id", appt.id)

                                  setAppointments(
                                    appointments.map((a) => (a.id === appt.id ? { ...a, status: "cancelled" } : a)),
                                  )

                                  toast.success("Appointment cancelled")
                                } catch (error) {
                                  console.error("Error cancelling appointment:", error)
                                  toast.error("Failed to cancel appointment")
                                }
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </TabsContent>

            <TabsContent value="pending">
              {appointments.filter((a) => a.status === "pending").length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No pending appointment requests</div>
              ) : (
                <ul className="space-y-3">
                  {appointments
                    .filter((a) => a.status === "pending")
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((appt) => (
                      <li key={appt.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{appt.client_name || "Client #" + appt.client_id}</p>
                            <p className="text-sm text-muted-foreground">
                              Date: {new Date(appt.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-muted-foreground">Time: {appt.time}</p>
                          </div>
                          <div className="space-x-2">
                            <Button
                              size="sm"
                              className="bg-green-600"
                              onClick={async () => {
                                try {
                                  await supabase.from("appointments").update({ status: "approved" }).eq("id", appt.id)

                                  setAppointments(
                                    appointments.map((a) => (a.id === appt.id ? { ...a, status: "approved" } : a)),
                                  )

                                  toast.success("Appointment approved")
                                } catch (error) {
                                  console.error("Error approving appointment:", error)
                                  toast.error("Failed to approve appointment")
                                }
                              }}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200"
                              onClick={async () => {
                                try {
                                  await supabase.from("appointments").update({ status: "cancelled" }).eq("id", appt.id)

                                  setAppointments(
                                    appointments.map((a) => (a.id === appt.id ? { ...a, status: "cancelled" } : a)),
                                  )

                                  toast.success("Appointment declined")
                                } catch (error) {
                                  console.error("Error declining appointment:", error)
                                  toast.error("Failed to decline appointment")
                                }
                              }}
                            >
                              Decline
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </TabsContent>

            <TabsContent value="past">
              {appointments.filter((a) => new Date(a.date) < new Date()).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No past appointments</div>
              ) : (
                <ul className="space-y-3">
                  {appointments
                    .filter((a) => new Date(a.date) < new Date())
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((appt) => (
                      <li key={appt.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{appt.client_name || "Client #" + appt.client_id}</p>
                            <p className="text-sm text-muted-foreground">
                              Date: {new Date(appt.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-muted-foreground">Time: {appt.time}</p>
                            <p className="text-sm mt-1">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  appt.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : appt.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground pt-4">
        <p>
          As a <BrandName /> trainer, you're making a difference in your clients' lives every day.
        </p>
      </div>
    </div>
  )
}

