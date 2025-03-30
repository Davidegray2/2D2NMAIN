"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Clock, Flame, Search, Plus, Filter } from "lucide-react"
import { workouts, getHomeWorkouts, getGymWorkouts } from "@/data/workout-library"

export default function WorkoutsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter workouts based on search query and active tab
  const filteredWorkouts = workouts
    .filter((workout) => {
      if (activeTab === "home") {
        return getHomeWorkouts().some((hw) => hw.id === workout.id)
      } else if (activeTab === "gym") {
        return getGymWorkouts().some((gw) => gw.id === workout.id)
      }
      return true
    })
    .filter((workout) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        workout.name.toLowerCase().includes(query) ||
        workout.description.toLowerCase().includes(query) ||
        workout.targetMuscleGroups.some((muscle) => muscle.toLowerCase().includes(query)) ||
        workout.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    })

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Workouts</h1>
          <p className="text-muted-foreground">Find and track your perfect workout routine</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/create-workout">
              <Plus className="mr-2 h-4 w-4" />
              Create Workout
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search workouts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Workouts</TabsTrigger>
          <TabsTrigger value="home">Home Workouts</TabsTrigger>
          <TabsTrigger value="gym">Gym Workouts</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredWorkouts.length === 0 ? (
        <div className="text-center py-12 col-span-3">
          <Dumbbell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No workouts found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <Link href={`/workouts/${workout.id}`} key={workout.id}>
              <Card className="h-full overflow-hidden hover:border-primary transition-colors cursor-pointer">
                <div className="aspect-video w-full relative">
                  <img
                    src={workout.imageUrl || "/images/workouts/default-workout.jpg"}
                    alt={workout.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge>{workout.difficulty}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{workout.name}</h3>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4" />
                      <span>{workout.caloriesBurn} cal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Dumbbell className="h-4 w-4" />
                      <span>
                        {workout.equipment.includes("none")
                          ? "No Equipment"
                          : workout.equipment.length > 2
                            ? `${workout.equipment.length} items`
                            : workout.equipment.join(", ")}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2">{workout.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

