"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Utensils, ArrowRight } from "lucide-react"
import { type Recipe, getRecipesForWorkoutIntensity } from "@/data/nutrition-library"
import { workouts } from "@/data/workout-library"

export function WorkoutMealRecommendations() {
  const [selectedWorkout, setSelectedWorkout] = useState<string>("")
  const [workoutIntensity, setWorkoutIntensity] = useState<"light" | "moderate" | "intense">("moderate")
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("post")

  // Update workout intensity when workout changes
  useEffect(() => {
    if (selectedWorkout) {
      const workout = workouts.find((w) => w.id === selectedWorkout)
      if (workout) {
        // Determine intensity based on workout difficulty and duration
        if (workout.difficulty === "advanced" || workout.caloriesBurn > 400) {
          setWorkoutIntensity("intense")
        } else if (workout.difficulty === "beginner" && workout.caloriesBurn < 250) {
          setWorkoutIntensity("light")
        } else {
          setWorkoutIntensity("moderate")
        }
      }
    }
  }, [selectedWorkout])

  // Update recommended recipes when workout intensity or timeframe changes
  useEffect(() => {
    if (workoutIntensity) {
      let matchingRecipes = getRecipesForWorkoutIntensity(workoutIntensity)

      // Filter by timeframe (pre or post workout)
      if (selectedTimeframe === "pre") {
        // Pre-workout: focus on carbs, moderate protein, lower fat
        matchingRecipes = matchingRecipes.filter((recipe) => recipe.carbs >= 25 && recipe.fat < 15)
      } else if (selectedTimeframe === "post") {
        // Post-workout: focus on protein and some carbs
        matchingRecipes = matchingRecipes.filter((recipe) => recipe.protein >= 20 && recipe.carbs >= 20)
      }

      // Sort by relevance (protein content for post-workout, carb content for pre-workout)
      if (selectedTimeframe === "post") {
        matchingRecipes.sort((a, b) => b.protein - a.protein)
      } else {
        matchingRecipes.sort((a, b) => b.carbs - a.carbs)
      }

      // Limit to top 3 recommendations
      setRecommendedRecipes(matchingRecipes.slice(0, 3))
    }
  }, [workoutIntensity, selectedTimeframe])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Workout Meal Recommendations</CardTitle>
        <CardDescription>Get personalized meal suggestions based on your workout intensity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Your Workout</label>
          <Select value={selectedWorkout} onValueChange={setSelectedWorkout}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a workout" />
            </SelectTrigger>
            <SelectContent>
              {workouts.map((workout) => (
                <SelectItem key={workout.id} value={workout.id}>
                  {workout.name} ({workout.difficulty})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedWorkout && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Workout Intensity</h3>
                <p className="text-sm text-muted-foreground">Based on your selected workout</p>
              </div>
              <Badge
                variant={
                  workoutIntensity === "light" ? "outline" : workoutIntensity === "moderate" ? "secondary" : "default"
                }
              >
                {workoutIntensity.charAt(0).toUpperCase() + workoutIntensity.slice(1)}
              </Badge>
            </div>

            <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="pre">Pre-Workout</TabsTrigger>
                <TabsTrigger value="post">Post-Workout</TabsTrigger>
              </TabsList>
              <TabsContent value="pre" className="pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <Utensils className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Pre-Workout Meal Recommendations</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Focus on easily digestible carbs with moderate protein and low fat 1-2 hours before your workout.
                </p>
              </TabsContent>
              <TabsContent value="post" className="pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <Utensils className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Post-Workout Meal Recommendations</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Prioritize protein for muscle recovery with moderate carbs to replenish glycogen within 30-60 minutes
                  after your workout.
                </p>
              </TabsContent>
            </Tabs>

            <div className="grid gap-4 md:grid-cols-3">
              {recommendedRecipes.length > 0 ? (
                recommendedRecipes.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden">
                    <div className="aspect-video w-full">
                      <img
                        src={recipe.imageUrl || "/placeholder.svg"}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge className="mb-2">{recipe.category}</Badge>
                      <h3 className="font-medium mb-2">{recipe.name}</h3>
                      <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                        <div className="text-center p-1 bg-muted rounded-md">
                          <div className="font-medium">{recipe.calories}</div>
                          <div className="text-xs text-muted-foreground">kcal</div>
                        </div>
                        <div className="text-center p-1 bg-muted rounded-md">
                          <div className="font-medium">{recipe.protein}g</div>
                          <div className="text-xs text-muted-foreground">protein</div>
                        </div>
                        <div className="text-center p-1 bg-muted rounded-md">
                          <div className="font-medium">{recipe.carbs}g</div>
                          <div className="text-xs text-muted-foreground">carbs</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" className="w-full">
                        View Recipe
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 flex flex-col items-center justify-center py-8 text-center">
                  <Utensils className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-1">No recommendations available</h3>
                  <p className="text-sm text-muted-foreground">
                    Select a workout to get personalized meal recommendations
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <a href="/nutrition/recipes">
            Browse All Recipes
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

