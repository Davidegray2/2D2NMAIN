"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

export function StreakCalendar() {
  // Current date for highlighting today
  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  // Mock data for streak days (in a real app, this would come from your backend)
  const streakDays = [
    new Date(currentYear, currentMonth, currentDay - 5),
    new Date(currentYear, currentMonth, currentDay - 4),
    new Date(currentYear, currentMonth, currentDay - 3),
    new Date(currentYear, currentMonth, currentDay - 2),
    new Date(currentYear, currentMonth, currentDay - 1),
    new Date(currentYear, currentMonth, currentDay),
  ]

  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Create calendar days array
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Check if a date is in the streak
  const isStreakDay = (day: number) => {
    return streakDays.some(
      (date) => date.getDate() === day && date.getMonth() === currentMonth && date.getFullYear() === currentYear,
    )
  }

  // Check if a date is today
  const isToday = (day: number) => day === currentDay

  // Check if a date is in the future
  const isFutureDay = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    return date > today
  }

  // Check if a date is in the past but not a streak day
  const isMissedDay = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    return date < today && !isStreakDay(day) && day !== currentDay
  }

  // Get day names for header
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"]

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Workout Streak</CardTitle>
            <CardDescription>Keep your streak going!</CardDescription>
          </div>
          <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full">
            <Flame className="h-4 w-4" />
            <span className="font-bold">{streakDays.length} days</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {dayNames.map((day, i) => (
            <div key={i} className="text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the 1st of the month */}
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} className="h-9"></div>
          ))}

          {/* Calendar days */}
          {calendarDays.map((day) => (
            <div
              key={day}
              className={cn(
                "h-9 flex items-center justify-center rounded-full text-sm relative",
                isToday(day) && "bg-primary text-primary-foreground font-bold",
                isStreakDay(day) && !isToday(day) && "bg-primary/20 text-primary font-medium",
                isMissedDay(day) && "text-muted-foreground",
                isFutureDay(day) && "text-muted-foreground/50",
              )}
            >
              {day}
              {isStreakDay(day) && !isToday(day) && (
                <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary"></span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

