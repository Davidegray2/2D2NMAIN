"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export function MacroCalculator() {
  // State for form inputs
  const [age, setAge] = useState<number | "">("")
  const [gender, setGender] = useState<string>("male")
  const [weight, setWeight] = useState<number | "">("")
  const [height, setHeight] = useState<number | "">("")
  const [activityLevel, setActivityLevel] = useState<string>("moderate")
  const [goal, setGoal] = useState<string>("maintain")

  // State for results
  const [bmr, setBmr] = useState<number | null>(null)
  const [tdee, setTdee] = useState<number | null>(null)
  const [targetCalories, setTargetCalories] = useState<number | null>(null)
  const [macros, setMacros] = useState<{ protein: number; carbs: number; fat: number } | null>(null)

  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Hard exercise 6-7 days/week
    veryActive: 1.9, // Very hard exercise & physical job or 2x training
  }

  // Goal adjustments
  const goalAdjustments = {
    lose: 0.8, // 20% calorie deficit
    maintain: 1, // No adjustment
    gain: 1.1, // 10% calorie surplus
  }

  // Calculate BMR using Mifflin-St Jeor Equation
  const calculateBMR = () => {
    if (age === "" || weight === "" || height === "") return null

    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * Number(age) + 5
    } else {
      return 10 * weight + 6.25 * height - 5 * Number(age) - 161
    }
  }

  // Calculate TDEE (Total Daily Energy Expenditure)
  const calculateTDEE = (baseBMR: number) => {
    return baseBMR * activityMultipliers[activityLevel as keyof typeof activityMultipliers]
  }

  // Calculate target calories based on goal
  const calculateTargetCalories = (baseTDEE: number) => {
    return Math.round(baseTDEE * goalAdjustments[goal as keyof typeof goalAdjustments])
  }

  // Calculate macros based on target calories
  const calculateMacros = (calories: number) => {
    let protein = 0
    let fat = 0
    let carbs = 0

    switch (goal) {
      case "lose":
        // Higher protein for weight loss
        protein = Math.round((calories * 0.4) / 4) // 40% of calories from protein
        fat = Math.round((calories * 0.35) / 9) // 35% of calories from fat
        carbs = Math.round((calories * 0.25) / 4) // 25% of calories from carbs
        break
      case "maintain":
        // Balanced macros
        protein = Math.round((calories * 0.3) / 4) // 30% of calories from protein
        fat = Math.round((calories * 0.3) / 9) // 30% of calories from fat
        carbs = Math.round((calories * 0.4) / 4) // 40% of calories from carbs
        break
      case "gain":
        // Higher carbs for muscle gain
        protein = Math.round((calories * 0.3) / 4) // 30% of calories from protein
        fat = Math.round((calories * 0.25) / 9) // 25% of calories from fat
        carbs = Math.round((calories * 0.45) / 4) // 45% of calories from carbs
        break
    }

    return { protein, carbs, fat }
  }

  // Handle form submission
  const handleCalculate = () => {
    if (age === "" || weight === "" || height === "") return

    const calculatedBMR = calculateBMR()
    if (calculatedBMR) {
      const calculatedTDEE = calculateTDEE(calculatedBMR)
      const calculatedTargetCalories = calculateTargetCalories(calculatedTDEE)
      const calculatedMacros = calculateMacros(calculatedTargetCalories)

      setBmr(Math.round(calculatedBMR))
      setTdee(Math.round(calculatedTDEE))
      setTargetCalories(calculatedTargetCalories)
      setMacros(calculatedMacros)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Calorie & Macro Calculator</CardTitle>
        <CardDescription>Calculate your daily calorie needs and optimal macronutrient breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator">
          <TabsList className="mb-4">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results" disabled={!targetCalories}>
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Years"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="cm"
                    value={height}
                    onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="activity">Activity Level</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger id="activity">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                      <SelectItem value="light">Lightly Active (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderately Active (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Very Active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="veryActive">
                        Extremely Active (very hard exercise, physical job, or training 2x/day)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal">Goal</Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger id="goal">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose">Lose Weight</SelectItem>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                      <SelectItem value="gain">Gain Muscle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button onClick={handleCalculate} className="w-full">
                    Calculate
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results">
            {targetCalories && macros && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Basal Metabolic Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{bmr} kcal</div>
                      <p className="text-sm text-muted-foreground">Calories your body needs at complete rest</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total Daily Energy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{tdee} kcal</div>
                      <p className="text-sm text-muted-foreground">Calories you burn daily with activity</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Target Calories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{targetCalories} kcal</div>
                      <p className="text-sm text-muted-foreground">Daily calories to reach your goal</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Macronutrients</CardTitle>
                    <CardDescription>
                      {goal === "lose"
                        ? "Higher protein to preserve muscle while losing fat"
                        : goal === "gain"
                          ? "Higher carbs to fuel muscle growth"
                          : "Balanced macros for maintenance"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Protein ({macros.protein}g)</Label>
                        <span className="text-sm text-muted-foreground">{Math.round(macros.protein * 4)} kcal</span>
                      </div>
                      <Progress value={Math.round(((macros.protein * 4) / targetCalories) * 100)} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Carbohydrates ({macros.carbs}g)</Label>
                        <span className="text-sm text-muted-foreground">{Math.round(macros.carbs * 4)} kcal</span>
                      </div>
                      <Progress value={Math.round(((macros.carbs * 4) / targetCalories) * 100)} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Fat ({macros.fat}g)</Label>
                        <span className="text-sm text-muted-foreground">{Math.round(macros.fat * 9)} kcal</span>
                      </div>
                      <Progress value={Math.round(((macros.fat * 9) / targetCalories) * 100)} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-muted-foreground">
                      <p>• Protein: 4 calories per gram - builds and repairs muscle tissue</p>
                      <p>• Carbohydrates: 4 calories per gram - primary energy source</p>
                      <p>• Fat: 9 calories per gram - essential for hormone production and nutrient absorption</p>
                    </div>
                    <Button variant="outline" onClick={() => window.print()}>
                      Print Results
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

