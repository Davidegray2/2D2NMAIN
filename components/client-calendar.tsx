"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/utils/supabaseClient"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import toast, { Toaster } from "react-hot-toast"

type Appointment = {
  id: number
  client_id: string
  trainer_id: string
  date: string
  time: string
  status: "pending" | "approved" | "cancelled"
  trainer_name?: string
}

type ClientCalendarProps = {
  clientId: string
}

export function ClientCalendar({ clientId }: ClientCalendarProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data, error } = await supabase.from("appointments").select("*").eq("client_id", clientId)

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

    fetchAppointments()
  }, [clientId])

  // Get appointments for selected date
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((appt) => new Date(appt.date).toDateString() === date.toDateString())
  }

  const selectedDateAppointments = getAppointmentsForDate(selectedDate)

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      <Card>
        <CardHeader>
          <CardTitle>My Calendar</CardTitle>
          <CardDescription>View and manage your training appointments</CardDescription>
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
                return hasAppointments ? <div className="bg-blue-400 rounded-full w-2 h-2 mx-auto mt-1"></div> : null
              }}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appointments for {selectedDate.toDateString()}</CardTitle>
          <CardDescription>Manage your appointments for the selected date</CardDescription>
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
                  <div>
                    <p className="font-medium">Session with {appt.trainer_name || "Trainer #" + appt.trainer_id}</p>
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

                  {appt.status === "approved" && (
                    <div className="mt-3 space-x-2">
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
                              .update({ date: newDate, time: newTime, status: "pending" })
                              .eq("id", appt.id)

                            setAppointments(
                              appointments.map((a) =>
                                a.id === appt.id ? { ...a, date: newDate, time: newTime, status: "pending" } : a,
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
                            await supabase.from("appointments").delete().eq("id", appt.id)

                            setAppointments(appointments.filter((a) => a.id !== appt.id))

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
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

