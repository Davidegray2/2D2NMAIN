"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Apple, Beef, Carrot, ChevronRight, Coffee, Egg, Fish, Leaf, Plus, Search, Utensils } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { FoodLoggingModal } from "@/components/nutrition/food-logging-modal"

export default function NutritionPage() {
  const [foodLoggingOpen, setFoodLoggingOpen] = useState(false)

  const mealPlanCategories = [
    { name: "Weight Loss", description: "Calorie-controlled plans for healthy weight loss", count: 12 },
    { name: "Muscle Building", description: "High-protein plans to support muscle growth", count: 8 },
    { name: "Vegetarian", description: "Plant-based nutrition plans", count: 10 },
    { name: "Keto", description: "Low-carb, high-fat ketogenic diet plans", count: 6 },
    { name: "Paleo", description: "Whole foods based on the paleolithic diet", count: 5 },
    { name: "Intermittent Fasting", description: "Meal timing strategies for metabolic health", count: 4 },
  ]

  const recipes = []

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Nutrition Library</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>Today's Nutrition</CardTitle>
            <CardDescription>Track your daily intake</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Calories</span>
                  <span>0 / 0 kcal</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Protein</span>
                    <span>0 / 0g</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Carbs</span>
                    <span>0 / 0g</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Fat</span>
                    <span>0 / 0g</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </div>

              <Button className="w-full" onClick={() => setFoodLoggingOpen(true)}>
                Log Food
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>Meal Plan</CardTitle>
            <CardDescription>Your personalized meal plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/nutrition/meal-plans/personalized#breakfast" className="w-full">
                <div className="flex items-center justify-between p-2 bg-muted rounded-md hover:bg-muted/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-md">
                      <Coffee className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Breakfast</p>
                      <p className="text-sm text-muted-foreground">0:00 AM • 0 kcal</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>

              <Link href="/nutrition/meal-plans/personalized#snack" className="w-full">
                <div className="flex items-center justify-between p-2 bg-muted rounded-md hover:bg-muted/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-md">
                      <Apple className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Snack</p>
                      <p className="text-sm text-muted-foreground">0:00 AM • 0 kcal</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>

              <Link href="/nutrition/meal-plans/personalized#lunch" className="w-full">
                <div className="flex items-center justify-between p-2 bg-muted rounded-md hover:bg-muted/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-md">
                      <Utensils className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Lunch</p>
                      <p className="text-sm text-muted-foreground">0:00 PM • 0 kcal</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>

              <Link href="/nutrition/meal-plans/personalized#dinner" className="w-full">
                <div className="flex items-center justify-between p-2 bg-muted rounded-md hover:bg-muted/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-md">
                      <Utensils className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Dinner</p>
                      <p className="text-sm text-muted-foreground">0:00 PM • 0 kcal</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/nutrition/meal-plans/personalized">View Full Meal Plan</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recipe Library</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search recipes..." className="pl-8 w-[200px]" />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video w-full">
                <img
                  src={recipe.image || "/images/recipes/default-recipe.jpg"}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2">{recipe.category}</Badge>
                <h3 className="font-medium mb-2">{recipe.name}</h3>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{recipe.calories} kcal</span>
                  <span>{recipe.protein}g protein</span>
                  <span>{recipe.time}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/nutrition/recipes/${recipe.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Recipe
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Button asChild>
            <Link href="/nutrition/recipes">View All Recipes</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="meal-plans">
        <TabsList className="mb-6">
          <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
          <TabsTrigger value="nutrition-guides">Nutrition Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="meal-plans">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlanCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{category.count} meal plans available</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/nutrition/meal-plans/${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      Browse Plans
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nutrition-guides">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="bg-primary/20 p-3 rounded-md w-fit mb-3">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Macronutrient Basics</CardTitle>
                <CardDescription>Understanding proteins, carbs, and fats</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn how to balance your macronutrients for optimal performance and health.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/nutrition/guides/macronutrient-basics">Read Guide</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/20 p-3 rounded-md w-fit mb-3">
                  <Beef className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Protein Sources</CardTitle>
                <CardDescription>Complete guide to protein-rich foods</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover the best sources of protein for muscle building and recovery.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/nutrition/guides/protein-sources">Read Guide</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/20 p-3 rounded-md w-fit mb-3">
                  <Carrot className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Micronutrients</CardTitle>
                <CardDescription>Vitamins and minerals for athletes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn about essential vitamins and minerals that support athletic performance.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/nutrition/guides/micronutrients">Read Guide</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/20 p-3 rounded-md w-fit mb-3">
                  <Fish className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Omega-3 Fatty Acids</CardTitle>
                <CardDescription>Benefits and sources</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Understand the importance of omega-3s for recovery and overall health.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/nutrition/guides/omega-3-fatty-acids">Read Guide</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/20 p-3 rounded-md w-fit mb-3">
                  <Egg className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Meal Timing</CardTitle>
                <CardDescription>When to eat for optimal results</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn the science behind meal timing for performance and recovery.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/nutrition/guides/meal-timing">Read Guide</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/20 p-3 rounded-md w-fit mb-3">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>More Guides</CardTitle>
                <CardDescription>Browse our complete library</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access our full collection of nutrition guides and resources.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/nutrition/guides">View All</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Food Logging Modal */}
      <FoodLoggingModal open={foodLoggingOpen} onOpenChange={setFoodLoggingOpen} />
    </div>
  )
}

