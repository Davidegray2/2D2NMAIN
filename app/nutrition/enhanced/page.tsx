"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MacroCalculator } from "@/components/macro-calculator"
import { GroceryListGenerator } from "@/components/grocery-list-generator"
import { WorkoutMealRecommendations } from "@/components/workout-meal-recommendations"

export default function EnhancedNutritionPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-2">Enhanced Nutrition Tools</h1>
      <p className="text-muted-foreground mb-6">Advanced tools to optimize your nutrition and meal planning</p>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="calculator">Calorie & Macro Calculator</TabsTrigger>
          <TabsTrigger value="grocery">Grocery List Generator</TabsTrigger>
          <TabsTrigger value="recommendations">Workout Meal Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="space-y-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-2">Calorie & Macro Calculator</h2>
              <p className="text-muted-foreground mb-6">
                Calculate your daily calorie needs and optimal macronutrient breakdown based on your goals, body
                composition, and activity level.
              </p>
            </div>

            <MacroCalculator />

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Understanding Your Macros</CardTitle>
                <CardDescription>How to use your calculated macronutrient targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Protein</h3>
                  <p className="text-sm text-muted-foreground">
                    Protein is essential for muscle repair and growth. Aim to consume protein with each meal, focusing
                    on high-quality sources like lean meats, fish, eggs, dairy, and plant-based options such as legumes,
                    tofu, and tempeh.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Carbohydrates</h3>
                  <p className="text-sm text-muted-foreground">
                    Carbs are your body's primary energy source. Prioritize complex carbohydrates like whole grains,
                    fruits, vegetables, and legumes. Time your carb intake around your workouts for optimal performance
                    and recovery.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Fats</h3>
                  <p className="text-sm text-muted-foreground">
                    Healthy fats support hormone production and nutrient absorption. Include sources like avocados,
                    nuts, seeds, olive oil, and fatty fish. Limit saturated and trans fats from processed foods.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Tracking Tips</h3>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Use a food tracking app to monitor your daily intake</li>
                    <li>Measure portions accurately, especially when starting out</li>
                    <li>Adjust your macros based on your progress and how you feel</li>
                    <li>Focus on food quality, not just hitting your numbers</li>
                    <li>Stay consistent but allow flexibility for special occasions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="grocery">
          <div className="space-y-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-2">Grocery List Generator</h2>
              <p className="text-muted-foreground mb-6">
                Create a customized grocery list based on your selected recipes for the week. Save time and ensure you
                have all the ingredients you need.
              </p>
            </div>

            <GroceryListGenerator />

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Smart Grocery Shopping Tips</CardTitle>
                <CardDescription>Make the most of your grocery trips</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Plan Before You Shop</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the grocery list generator to plan your meals for the week. Check your pantry before shopping to
                    avoid buying duplicates. Organize your list by store sections to shop more efficiently.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Budget-Friendly Options</h3>
                  <p className="text-sm text-muted-foreground">
                    Buy seasonal produce for better prices and nutrition. Consider frozen fruits and vegetables as
                    affordable alternatives to fresh. Buy proteins in bulk when on sale and freeze portions for later
                    use.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Time-Saving Strategies</h3>
                  <p className="text-sm text-muted-foreground">
                    Shop during off-peak hours to avoid crowds. Consider grocery delivery or pickup services if
                    available. Prep ingredients soon after shopping to make meal preparation faster during the week.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-2">Workout Meal Recommendations</h2>
              <p className="text-muted-foreground mb-6">
                Get personalized meal recommendations based on your workout intensity to optimize performance and
                recovery.
              </p>
            </div>

            <WorkoutMealRecommendations />

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Nutrition Timing for Workouts</CardTitle>
                <CardDescription>Optimize your meal timing around exercise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Pre-Workout Nutrition (1-2 hours before)</h3>
                  <p className="text-sm text-muted-foreground">
                    Focus on easily digestible carbohydrates with moderate protein and low fat. This provides energy for
                    your workout while minimizing digestive discomfort. Examples include oatmeal with fruit and a small
                    amount of protein, or a turkey sandwich on whole grain bread.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Pre-Workout Snack (30 minutes before)</h3>
                  <p className="text-sm text-muted-foreground">
                    If you're eating closer to your workout, choose something small and quick-digesting. Good options
                    include a banana, a small handful of dried fruit, or a rice cake with a thin spread of nut butter.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Post-Workout Nutrition (within 30-60 minutes)</h3>
                  <p className="text-sm text-muted-foreground">
                    After exercise, prioritize protein for muscle repair and include carbohydrates to replenish glycogen
                    stores. Aim for a 3:1 or 4:1 ratio of carbs to protein. Good options include a protein shake with
                    fruit, Greek yogurt with berries, or a chicken and rice bowl.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Hydration Considerations</h3>
                  <p className="text-sm text-muted-foreground">
                    Drink 16-20 oz of water 2-3 hours before exercise, 8 oz 20-30 minutes before, and 7-10 oz every
                    10-20 minutes during exercise. After your workout, drink 16-24 oz of fluid for every pound lost
                    during exercise.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

