import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Flame, Utensils } from "lucide-react"
import Link from "next/link"

export default function MealPlanPage({ params }: { params: { slug: string } }) {
  // Convert slug back to readable format
  const planName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Sample meal plan data - in a real app, this would come from a database
  const mealPlan = {
    name: planName,
    description: `Our ${planName} meal plan is designed to help you achieve your fitness goals with delicious, nutritionally balanced meals.`,
    duration: "4 weeks",
    mealsPerDay: 5,
    averageCalories: planName === "Weight Loss" ? 1600 : planName === "Muscle Building" ? 2800 : 2000,
    features: [
      "Personalized calorie targets",
      "Balanced macronutrient ratios",
      "Weekly grocery lists",
      "Meal prep instructions",
      "Alternative meal options",
    ],
    sampleDays: [
      {
        day: "Day 1",
        meals: [
          {
            name: "Breakfast",
            description: "Protein Oatmeal with Berries",
            calories: 420,
            protein: 30,
            time: "15 min",
          },
          {
            name: "Morning Snack",
            description: "Greek Yogurt with Honey and Almonds",
            calories: 220,
            protein: 18,
            time: "5 min",
          },
          {
            name: "Lunch",
            description: "Grilled Chicken Salad with Avocado",
            calories: 450,
            protein: 35,
            time: "20 min",
          },
          {
            name: "Afternoon Snack",
            description: "Protein Shake with Banana",
            calories: 250,
            protein: 25,
            time: "5 min",
          },
          {
            name: "Dinner",
            description: "Baked Salmon with Roasted Vegetables",
            calories: 520,
            protein: 40,
            time: "30 min",
          },
        ],
      },
      {
        day: "Day 2",
        meals: [
          {
            name: "Breakfast",
            description: "Vegetable Omelette with Whole Grain Toast",
            calories: 380,
            protein: 25,
            time: "15 min",
          },
          {
            name: "Morning Snack",
            description: "Apple with Almond Butter",
            calories: 200,
            protein: 5,
            time: "5 min",
          },
          {
            name: "Lunch",
            description: "Turkey and Vegetable Wrap",
            calories: 420,
            protein: 30,
            time: "15 min",
          },
          {
            name: "Afternoon Snack",
            description: "Cottage Cheese with Pineapple",
            calories: 180,
            protein: 20,
            time: "5 min",
          },
          {
            name: "Dinner",
            description: "Lean Beef Stir Fry with Brown Rice",
            calories: 550,
            protein: 35,
            time: "25 min",
          },
        ],
      },
    ],
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link href="/nutrition" className="flex items-center text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Nutrition Library
        </Link>
        <h1 className="text-3xl font-bold">{mealPlan.name} Meal Plan</h1>
        <p className="text-muted-foreground mt-2">{mealPlan.description}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mealPlan.duration}</p>
            <p className="text-sm text-muted-foreground">Structured progression</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Utensils className="mr-2 h-5 w-5 text-primary" />
              Meals Per Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mealPlan.mealsPerDay}</p>
            <p className="text-sm text-muted-foreground">Optimized meal timing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Flame className="mr-2 h-5 w-5 text-primary" />
              Average Calories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mealPlan.averageCalories}</p>
            <p className="text-sm text-muted-foreground">Personalized to your goals</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Plan Features</CardTitle>
          <CardDescription>What's included in this meal plan</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-2">
            {mealPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <div className="rounded-full bg-primary/20 p-1 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Get This Meal Plan</Button>
        </CardFooter>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Sample Meal Plan</h2>

      <Tabs defaultValue={mealPlan.sampleDays[0].day} className="mb-8">
        <TabsList className="mb-4">
          {mealPlan.sampleDays.map((day, index) => (
            <TabsTrigger key={index} value={day.day}>
              {day.day}
            </TabsTrigger>
          ))}
        </TabsList>

        {mealPlan.sampleDays.map((day, dayIndex) => (
          <TabsContent key={dayIndex} value={day.day}>
            <div className="space-y-4">
              {day.meals.map((meal, mealIndex) => (
                <Card key={mealIndex}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2">{meal.name}</Badge>
                        <h3 className="font-medium text-lg">{meal.description}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Flame className="mr-1 h-4 w-4" />
                            {meal.calories} kcal
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-1">P:</span>
                            {meal.protein}g
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {meal.time}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Recipe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-primary/10 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to Start Your {mealPlan.name} Journey?</h2>
        <p className="mb-4 max-w-2xl mx-auto">
          Get a personalized meal plan tailored to your specific needs, preferences, and fitness goals.
        </p>
        <Button size="lg">Get Started Now</Button>
      </div>
    </div>
  )
}

