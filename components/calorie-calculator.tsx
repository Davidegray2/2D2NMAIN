"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, ArrowRight } from "lucide-react"

type Goal = "lose" | "maintain" | "gain" | "bulk" | "tone"
type Gender = "male" | "female"
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very-active"

export function CalorieCalculator() {
  const [height, setHeight] = useState<number | "">("")
  const [weight, setWeight] = useState<number | "">("")
  const [age, setAge] = useState<number | "">("")
  const [gender, setGender] = useState<Gender>("male")
  const [goal, setGoal] = useState<Goal>("maintain")
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate")
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [result, setResult] = useState<{
    calories: number
    protein: number
    carbs: number
    fat: number
  } | null>(null)

  const calculateBMR = () => {
    if (height === "" || weight === "" || age === "") return 0

    // Convert imperial to metric if needed
    const weightKg = unit === "imperial" ? weight * 0.453592 : weight
    const heightCm = unit === "imperial" ? height * 2.54 : height

    // Mifflin-St Jeor Equation
    if (gender === "male") {
      return 10 * weightKg + 6.25 * heightCm - 5 * Number(age) + 5
    } else {
      return 10 * weightKg + 6.25 * heightCm - 5 * Number(age) - 161
    }
  }

  const calculateTDEE = (bmr: number) => {
    const activityMultipliers = {
      sedentary: 1.2, // Little or no exercise
      light: 1.375, // Light exercise 1-3 days/week
      moderate: 1.55, // Moderate exercise 3-5 days/week
      active: 1.725, // Heavy exercise 6-7 days/week
      "very-active": 1.9, // Very heavy exercise, physical job or training twice a day
    }

    return bmr * activityMultipliers[activityLevel]
  }

  const calculateCalories = () => {
    const bmr = calculateBMR()
    const tdee = calculateTDEE(bmr)

    // Adjust based on goal
    let calories = tdee
    switch (goal) {
      case "lose":
        calories = tdee - 500 // 500 calorie deficit for weight loss
        break
      case "gain":
        calories = tdee + 500 // 500 calorie surplus for weight gain
        break
      case "bulk":
        calories = tdee + 700 // 700 calorie surplus for muscle building
        break
      case "tone":
        calories = tdee - 250 // Moderate deficit for toning
        break
      default:
        calories = tdee // Maintenance
    }

    // Calculate macros
    let protein = 0
    let fat = 0
    let carbs = 0

    switch (goal) {
      case "lose":
        protein = unit === "imperial" ? weight * 0.8 : weight * 1.8 // Higher protein for weight loss
        fat = (calories * 0.25) / 9 // 25% of calories from fat
        carbs = (calories - protein * 4 - fat * 9) / 4
        break
      case "bulk":
        protein = unit === "imperial" ? weight * 0.9 : weight * 2 // Higher protein for muscle building
        fat = (calories * 0.25) / 9 // 25% of calories from fat
        carbs = (calories - protein * 4 - fat * 9) / 4 // Rest from carbs
        break
      case "tone":
        protein = unit === "imperial" ? weight * 0.9 : weight * 2 // Higher protein for toning
        fat = (calories * 0.3) / 9 // 30% of calories from fat
        carbs = (calories - protein * 4 - fat * 9) / 4 // Rest from carbs
        break
      default:
        protein = unit === "imperial" ? weight * 0.7 : weight * 1.6 // Moderate protein
        fat = (calories * 0.3) / 9 // 30% of calories from fat
        carbs = (calories - protein * 4 - fat * 9) / 4 // Rest from carbs
    }

    setResult({
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    calculateCalories()
  }

  const getGoalDescription = () => {
    switch (goal) {
      case "lose":
        return "Weight loss - calorie deficit to reduce body fat"
      case "maintain":
        return "Maintenance - maintain current weight and body composition"
      case "gain":
        return "Weight gain - calorie surplus to increase overall weight"
      case "bulk":
        return "Muscle building - higher protein and calories for muscle growth"
      case "tone":
        return "Body toning - moderate deficit with higher protein for definition"
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Elite Calorie & Macro Calculator
        </CardTitle>
        <CardDescription>
          Calculate your daily calorie needs based on your body metrics and fitness goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results" disabled={!result}>
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label>Unit System</Label>
                  <RadioGroup
                    defaultValue="metric"
                    className="grid grid-cols-2 gap-4 pt-2"
                    value={unit}
                    onValueChange={(value) => setUnit(value as "metric" | "imperial")}
                  >
                    <div>
                      <RadioGroupItem value="metric" id="metric" className="peer sr-only" />
                      <Label
                        htmlFor="metric"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span>Metric</span>
                        <span className="text-xs text-muted-foreground">(cm, kg)</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="imperial" id="imperial" className="peer sr-only" />
                      <Label
                        htmlFor="imperial"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span>Imperial</span>
                        <span className="text-xs text-muted-foreground">(in, lbs)</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "inches"})</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder={unit === "metric" ? "175" : "69"}
                      value={height}
                      onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder={unit === "metric" ? "70" : "154"}
                      value={weight}
                      onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="30"
                      value={age}
                      onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup
                      defaultValue="male"
                      className="grid grid-cols-2 gap-4 pt-2"
                      value={gender}
                      onValueChange={(value) => setGender(value as Gender)}
                    >
                      <div>
                        <RadioGroupItem value="male" id="male" className="peer sr-only" />
                        <Label
                          htmlFor="male"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Male
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="female" id="female" className="peer sr-only" />
                        <Label
                          htmlFor="female"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Female
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Fitness Goal</Label>
                  <RadioGroup
                    defaultValue="maintain"
                    className="grid grid-cols-3 gap-4 pt-2"
                    value={goal}
                    onValueChange={(value) => setGoal(value as Goal)}
                  >
                    <div>
                      <RadioGroupItem value="lose" id="lose" className="peer sr-only" />
                      <Label
                        htmlFor="lose"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Lose Weight
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="maintain" id="maintain" className="peer sr-only" />
                      <Label
                        htmlFor="maintain"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Maintain
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="gain" id="gain" className="peer sr-only" />
                      <Label
                        htmlFor="gain"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Gain Weight
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="bulk" id="bulk" className="peer sr-only" />
                      <Label
                        htmlFor="bulk"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Bulk Up
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="tone" id="tone" className="peer sr-only" />
                      <Label
                        htmlFor="tone"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Tone Body
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity">Activity Level</Label>
                  <Select value={activityLevel} onValueChange={(value) => setActivityLevel(value as ActivityLevel)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                      <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Very active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="very-active">Extra active (very hard exercise & physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Calculate
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="results">
            {result && (
              <div className="space-y-6 py-4">
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-semibold mb-2">Your Personalized Plan</h3>
                  <p className="text-muted-foreground mb-4">{getGoalDescription()}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">{result.calories}</div>
                      <div className="text-sm text-muted-foreground">Calories/day</div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">{result.protein}g</div>
                      <div className="text-sm text-muted-foreground">Protein</div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">{result.carbs}g</div>
                      <div className="text-sm text-muted-foreground">Carbs</div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">{result.fat}g</div>
                      <div className="text-sm text-muted-foreground">Fat</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Macro Breakdown</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-2 bg-blue-500 rounded"></div>
                      <div className="h-2 bg-green-500 rounded"></div>
                      <div className="h-2 bg-red-500 rounded"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm text-center">
                      <div>
                        <span className="font-medium">
                          {Math.round(((result.protein * 4) / result.calories) * 100)}%
                        </span>
                        <span className="block text-xs text-muted-foreground">Protein</span>
                      </div>
                      <div>
                        <span className="font-medium">{Math.round(((result.carbs * 4) / result.calories) * 100)}%</span>
                        <span className="block text-xs text-muted-foreground">Carbs</span>
                      </div>
                      <div>
                        <span className="font-medium">{Math.round(((result.fat * 9) / result.calories) * 100)}%</span>
                        <span className="block text-xs text-muted-foreground">Fat</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
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
                      <span>
                        Aim for {result.protein}g of protein daily (about {Math.round(result.protein / 25)} servings of
                        protein-rich foods)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
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
                      <span>
                        {goal === "lose" || goal === "tone"
                          ? "Focus on high-protein, low-calorie foods to maintain muscle while losing fat"
                          : goal === "bulk"
                            ? "Prioritize protein intake and calorie surplus on training days"
                            : "Balance your macros throughout the day for sustained energy"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
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
                      <span>
                        Drink at least {Math.round(weight * (unit === "metric" ? 0.033 : 0.015))} liters of water daily
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setResult(null)}>
                    Recalculate
                  </Button>
                  <Button>Save to Profile</Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

