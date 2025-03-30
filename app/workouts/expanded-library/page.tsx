"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dumbbell, Filter, Play, Search, X } from "lucide-react"
import { workouts, getHomeWorkouts, getGymWorkouts } from "@/data/workout-library"

export default function ExpandedWorkoutLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedDuration, setSelectedDuration] = useState<string[]>([])

  // Equipment options
  const equipmentOptions = [
    "none",
    "dumbbells",
    "barbell",
    "bench",
    "squat rack",
    "cable machine",
    "leg press machine",
    "treadmill",
    "mat",
  ]

  // Muscle group options
  const muscleGroupOptions = [
    "chest",
    "back",
    "shoulders",
    "arms",
    "quadriceps",
    "hamstrings",
    "glutes",
    "core",
    "full body",
    "cardiovascular system",
  ]

  // Difficulty options
  const difficultyOptions = ["beginner", "intermediate", "advanced"]

  // Duration options
  const durationOptions = ["< 20 min", "20-30 min", "30-45 min", "45+ min"]

  // Toggle equipment selection
  const toggleEquipment = (equipment: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(equipment) ? prev.filter((e) => e !== equipment) : [...prev, equipment],
    )
  }

  // Toggle muscle group selection
  const toggleMuscleGroup = (muscleGroup: string) => {
    setSelectedMuscleGroups((prev) =>
      prev.includes(muscleGroup) ? prev.filter((m) => m !== muscleGroup) : [...prev, muscleGroup],
    )
  }

  // Toggle difficulty selection
  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty],
    )
  }

  // Toggle duration selection
  const toggleDuration = (duration: string) => {
    setSelectedDuration((prev) => (prev.includes(duration) ? prev.filter((d) => d !== duration) : [...prev, duration]))
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedEquipment([])
    setSelectedMuscleGroups([])
    setSelectedDifficulty([])
    setSelectedDuration([])
  }

  // Filter workouts based on selected filters and search query
  const filteredWorkouts = workouts.filter((workout) => {
    // Filter by search query
    if (
      searchQuery &&
      !workout.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !workout.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by equipment
    if (selectedEquipment.length > 0 && !selectedEquipment.some((e) => workout.equipment.includes(e))) {
      return false
    }

    // Filter by muscle groups
    if (selectedMuscleGroups.length > 0 && !selectedMuscleGroups.some((m) => workout.targetMuscleGroups.includes(m))) {
      return false
    }

    // Filter by difficulty
    if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(workout.difficulty)) {
      return false
    }

    // Filter by duration
    if (selectedDuration.length > 0) {
      const durationMinutes = Number.parseInt(workout.duration.split(" ")[0])

      const matchesDuration = selectedDuration.some((d) => {
        if (d === "< 20 min") return durationMinutes < 20
        if (d === "20-30 min") return durationMinutes >= 20 && durationMinutes <= 30
        if (d === "30-45 min") return durationMinutes > 30 && durationMinutes <= 45
        if (d === "45+ min") return durationMinutes > 45
        return false
      })

      if (!matchesDuration) return false
    }

    return true
  })

  // Get home workouts
  const homeWorkouts = getHomeWorkouts()

  // Get gym workouts
  const gymWorkouts = getGymWorkouts()

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Expanded Workout Library</h1>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search workouts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 whitespace-nowrap" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {showFilters && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="font-medium mb-3">Equipment</h3>
                <div className="space-y-2">
                  {equipmentOptions.map((equipment) => (
                    <div key={equipment} className="flex items-center space-x-2">
                      <Checkbox
                        id={`equipment-${equipment}`}
                        checked={selectedEquipment.includes(equipment)}
                        onCheckedChange={() => toggleEquipment(equipment)}
                      />
                      <Label htmlFor={`equipment-${equipment}`} className="capitalize">
                        {equipment === "none" ? "No Equipment" : equipment}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Muscle Groups</h3>
                <div className="space-y-2">
                  {muscleGroupOptions.map((muscleGroup) => (
                    <div key={muscleGroup} className="flex items-center space-x-2">
                      <Checkbox
                        id={`muscle-${muscleGroup}`}
                        checked={selectedMuscleGroups.includes(muscleGroup)}
                        onCheckedChange={() => toggleMuscleGroup(muscleGroup)}
                      />
                      <Label htmlFor={`muscle-${muscleGroup}`} className="capitalize">
                        {muscleGroup}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Difficulty</h3>
                <div className="space-y-2">
                  {difficultyOptions.map((difficulty) => (
                    <div key={difficulty} className="flex items-center space-x-2">
                      <Checkbox
                        id={`difficulty-${difficulty}`}
                        checked={selectedDifficulty.includes(difficulty)}
                        onCheckedChange={() => toggleDifficulty(difficulty)}
                      />
                      <Label htmlFor={`difficulty-${difficulty}`} className="capitalize">
                        {difficulty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Duration</h3>
                <div className="space-y-2">
                  {durationOptions.map((duration) => (
                    <div key={duration} className="flex items-center space-x-2">
                      <Checkbox
                        id={`duration-${duration}`}
                        checked={selectedDuration.includes(duration)}
                        onCheckedChange={() => toggleDuration(duration)}
                      />
                      <Label htmlFor={`duration-${duration}`}>{duration}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="text-sm text-muted-foreground">{filteredWorkouts.length} workouts found</div>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(false)}>
              <X className="h-4 w-4 mr-2" />
              Close Filters
            </Button>
          </CardFooter>
        </Card>
      )}

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Workouts</TabsTrigger>
          <TabsTrigger value="home">Home Workouts</TabsTrigger>
          <TabsTrigger value="gym">Gym Workouts</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.length > 0 ? (
              filteredWorkouts.map((workout) => (
                <Card key={workout.id} className="overflow-hidden">
                  <div className="aspect-video w-full relative">
                    <img
                      src={workout.imageUrl || "/placeholder.svg"}
                      alt={workout.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="icon" className="rounded-full h-12 w-12">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{workout.name}</h3>
                      <Badge>{workout.difficulty}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                      <div>{workout.duration}</div>
                      <div>•</div>
                      <div>{workout.caloriesBurn} cal</div>
                      <div>•</div>
                      <div>{workout.equipment.includes("none") ? "No Equipment" : workout.equipment.join(", ")}</div>
                    </div>
                    <p className="text-sm line-clamp-2">{workout.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">Start Workout</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
                <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-1">No workouts found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="home">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeWorkouts.length > 0 ? (
              homeWorkouts.map((workout) => (
                <Card key={workout.id} className="overflow-hidden">
                  <div className="aspect-video w-full relative">
                    <img
                      src={workout.imageUrl || "/placeholder.svg"}
                      alt={workout.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="icon" className="rounded-full h-12 w-12">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{workout.name}</h3>
                      <Badge>{workout.difficulty}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                      <div>{workout.duration}</div>
                      <div>•</div>
                      <div>{workout.caloriesBurn} cal</div>
                      <div>•</div>
                      <div>{workout.equipment.includes("none") ? "No Equipment" : workout.equipment.join(", ")}</div>
                    </div>
                    <p className="text-sm line-clamp-2">{workout.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">Start Workout</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
                <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-1">No home workouts found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="gym">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gymWorkouts.length > 0 ? (
              gymWorkouts.map((workout) => (
                <Card key={workout.id} className="overflow-hidden">
                  <div className="aspect-video w-full relative">
                    <img
                      src={workout.imageUrl || "/placeholder.svg"}
                      alt={workout.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="icon" className="rounded-full h-12 w-12">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{workout.name}</h3>
                      <Badge>{workout.difficulty}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                      <div>{workout.duration}</div>
                      <div>•</div>
                      <div>{workout.caloriesBurn} cal</div>
                      <div>•</div>
                      <div>{workout.equipment.join(", ")}</div>
                    </div>
                    <p className="text-sm line-clamp-2">{workout.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">Start Workout</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
                <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-1">No gym workouts found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

