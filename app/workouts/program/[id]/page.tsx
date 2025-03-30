import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Calendar, Dumbbell, Clock, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function WorkoutProgramPage({ params }) {
  const { id } = params

  // Convert ID to readable name (e.g., "12-week-strength" to "12 Week Strength")
  const programName = id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Sample program details
  const program = {
    name: programName,
    description:
      "A comprehensive strength training program designed to build muscle and increase overall strength over 12 weeks. This program follows progressive overload principles and includes a variety of exercises targeting all major muscle groups.",
    level: "Intermediate",
    duration: "12 weeks",
    workoutsPerWeek: 4,
    totalWorkouts: 48,
    equipment: "Dumbbells, Barbell, Bench, Squat Rack",
    creator: "Alex Johnson",
    image: "/placeholder.svg?height=400&width=800",
    weeks: [
      {
        week: 1,
        focus: "Foundation & Form",
        workouts: [
          { day: "Monday", name: "Upper Body Push", duration: "45 min" },
          { day: "Tuesday", name: "Rest Day", duration: "0 min" },
          { day: "Wednesday", name: "Lower Body", duration: "50 min" },
          { day: "Thursday", name: "Rest Day", duration: "0 min" },
          { day: "Friday", name: "Upper Body Pull", duration: "45 min" },
          { day: "Saturday", name: "Core & Mobility", duration: "30 min" },
          { day: "Sunday", name: "Rest Day", duration: "0 min" },
        ],
      },
      {
        week: 2,
        focus: "Building Volume",
        workouts: [
          { day: "Monday", name: "Upper Body Push", duration: "50 min" },
          { day: "Tuesday", name: "Rest Day", duration: "0 min" },
          { day: "Wednesday", name: "Lower Body", duration: "55 min" },
          { day: "Thursday", name: "Rest Day", duration: "0 min" },
          { day: "Friday", name: "Upper Body Pull", duration: "50 min" },
          { day: "Saturday", name: "Core & Mobility", duration: "35 min" },
          { day: "Sunday", name: "Rest Day", duration: "0 min" },
        ],
      },
    ],
  }

  return (
    <div className="container py-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/workouts">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{program.name}</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <div className="aspect-video w-full mb-6">
            <img
              src={program.image || "/placeholder.svg"}
              alt={program.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Program Overview</h2>
            <p className="text-muted-foreground">{program.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Program Schedule</h2>
            {program.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="px-3 py-1">
                    Week {week.week}
                  </Badge>
                  <span className="font-medium">{week.focus}</span>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {week.workouts.map((workout, dayIndex) => (
                    <Card key={dayIndex} className={`${workout.name === "Rest Day" ? "bg-muted/50" : ""}`}>
                      <CardContent className="p-3">
                        <div className="text-xs font-medium mb-1">{workout.day}</div>
                        <div className="text-sm font-medium mb-1">{workout.name}</div>
                        <div className="text-xs text-muted-foreground">{workout.duration}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Program Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Difficulty</div>
                <Badge>{program.level}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Duration</div>
                <div className="text-sm font-medium">{program.duration}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Workouts per Week</div>
                <div className="text-sm font-medium">{program.workoutsPerWeek}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Total Workouts</div>
                <div className="text-sm font-medium">{program.totalWorkouts}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Equipment Needed</div>
                <div className="text-sm font-medium">{program.equipment}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Created By</div>
                <div className="text-sm font-medium">{program.creator}</div>
              </div>

              <div className="mt-4">
                <Button className="w-full flex items-center gap-2" asChild>
                  <Link href="/workouts">
                    <RefreshCw className="h-4 w-4" />
                    Change Program
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 space-y-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Flexible Schedule</h3>
                  <p className="text-sm text-muted-foreground">Adjust workout days to fit your calendar</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Progressive Overload</h3>
                  <p className="text-sm text-muted-foreground">Gradually increasing intensity for better results</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Time Efficient</h3>
                  <p className="text-sm text-muted-foreground">Optimized workouts for maximum results</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

