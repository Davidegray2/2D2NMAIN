"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Flame, Heart, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface WeeklyReportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WeeklyReportModal({ open, onOpenChange }: WeeklyReportModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data for the weekly report
  const weeklyData = {
    workouts: {
      completed: 5,
      goal: 6,
      percentChange: 25,
      isPositive: true,
    },
    calories: {
      burned: 3250,
      goal: 4000,
      percentChange: 15,
      isPositive: true,
    },
    steps: {
      count: 58750,
      goal: 70000,
      percentChange: 8,
      isPositive: true,
    },
    heartRate: {
      average: 68,
      percentChange: 3,
      isPositive: false,
    },
    workoutsByDay: [
      { day: "Mon", duration: 45, type: "Strength" },
      { day: "Tue", duration: 30, type: "Cardio" },
      { day: "Wed", duration: 0, type: "Rest" },
      { day: "Thu", duration: 60, type: "Strength" },
      { day: "Fri", duration: 20, type: "HIIT" },
      { day: "Sat", duration: 45, type: "Strength" },
      { day: "Sun", duration: 0, type: "Rest" },
    ],
    nutritionByDay: [
      { day: "Mon", calories: 2100, protein: 140, carbs: 210, fat: 70 },
      { day: "Tue", calories: 1950, protein: 135, carbs: 195, fat: 65 },
      { day: "Wed", calories: 2200, protein: 150, carbs: 220, fat: 73 },
      { day: "Thu", calories: 2050, protein: 145, carbs: 205, fat: 68 },
      { day: "Fri", calories: 2150, protein: 155, carbs: 215, fat: 72 },
      { day: "Sat", calories: 2300, protein: 160, carbs: 230, fat: 77 },
      { day: "Sun", calories: 2000, protein: 130, carbs: 200, fat: 67 },
    ],
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Weekly Fitness Report</DialogTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            March 5 - March 11, 2023
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Workouts</span>
                      <div className="flex items-center">
                        {weeklyData.workouts.isPositive ? (
                          <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                        )}
                        <span
                          className={`text-xs ${weeklyData.workouts.isPositive ? "text-green-500" : "text-red-500"}`}
                        >
                          {weeklyData.workouts.percentChange}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">{weeklyData.workouts.completed}</span>
                      <span className="text-sm text-muted-foreground ml-1">/ {weeklyData.workouts.goal}</span>
                    </div>
                    <Progress
                      value={(weeklyData.workouts.completed / weeklyData.workouts.goal) * 100}
                      className="h-1"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Calories Burned</span>
                      <div className="flex items-center">
                        {weeklyData.calories.isPositive ? (
                          <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                        )}
                        <span
                          className={`text-xs ${weeklyData.calories.isPositive ? "text-green-500" : "text-red-500"}`}
                        >
                          {weeklyData.calories.percentChange}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">{weeklyData.calories.burned.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground ml-1">
                        / {weeklyData.calories.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(weeklyData.calories.burned / weeklyData.calories.goal) * 100} className="h-1" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Steps</span>
                      <div className="flex items-center">
                        {weeklyData.steps.isPositive ? (
                          <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                        )}
                        <span className={`text-xs ${weeklyData.steps.isPositive ? "text-green-500" : "text-red-500"}`}>
                          {weeklyData.steps.percentChange}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">{weeklyData.steps.count.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground ml-1">
                        / {weeklyData.steps.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(weeklyData.steps.count / weeklyData.steps.goal) * 100} className="h-1" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Heart Rate</span>
                      <div className="flex items-center">
                        {weeklyData.heartRate.isPositive ? (
                          <ArrowUpRight className="h-3 w-3 text-red-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-green-500 mr-1" />
                        )}
                        <span
                          className={`text-xs ${weeklyData.heartRate.isPositive ? "text-red-500" : "text-green-500"}`}
                        >
                          {weeklyData.heartRate.percentChange}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">{weeklyData.heartRate.average}</span>
                      <span className="text-sm text-muted-foreground ml-1">bpm</span>
                    </div>
                    <div className="h-1"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Weekly Activity</h3>
                <div className="grid grid-cols-7 gap-2">
                  {weeklyData.workoutsByDay.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="text-sm text-muted-foreground mb-1">{day.day}</div>
                      <div
                        className={`w-full rounded-md flex items-end justify-center ${
                          day.duration > 0 ? "bg-primary/10" : "bg-muted"
                        }`}
                        style={{ height: "100px" }}
                      >
                        <div
                          className="w-full bg-primary rounded-md"
                          style={{ height: `${(day.duration / 60) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs">
                        {day.duration > 0 ? (
                          <>
                            <span className="font-medium">{day.duration}m</span>
                            <Badge
                              variant="outline"
                              className={`ml-1 text-[10px] px-1 ${
                                day.type === "Strength"
                                  ? "border-primary text-primary"
                                  : day.type === "Cardio"
                                    ? "border-red-500 text-red-500"
                                    : day.type === "HIIT"
                                      ? "border-orange-500 text-orange-500"
                                      : ""
                              }`}
                            >
                              {day.type}
                            </Badge>
                          </>
                        ) : (
                          <span className="text-muted-foreground">Rest</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Weekly Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      title: "5-Day Streak",
                      description: "Completed workouts for 5 consecutive days",
                      icon: Flame,
                      color: "text-orange-500",
                    },
                    {
                      title: "Cardio Master",
                      description: "Burned over 1,000 calories in cardio sessions",
                      icon: Heart,
                      color: "text-red-500",
                    },
                    {
                      title: "Strength Milestone",
                      description: "Increased weights in 3 major lifts",
                      icon: Dumbbell,
                      color: "text-primary",
                    },
                    {
                      title: "Consistency Champion",
                      description: "Met all weekly workout goals",
                      icon: Calendar,
                      color: "text-green-500",
                    },
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${achievement.color} bg-background`}
                      >
                        <achievement.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workouts" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Workout Summary</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Total Workouts</div>
                      <div className="text-2xl font-bold">5</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Total Time</div>
                      <div className="text-2xl font-bold">200 min</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Avg. Intensity</div>
                      <div className="text-2xl font-bold">7.5/10</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Calories Burned</div>
                      <div className="text-2xl font-bold">3,250</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Workout Types</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Strength Training</span>
                          <span>60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Cardio</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>HIIT</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Workout Details</h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Upper Body Strength",
                      day: "Monday",
                      duration: 45,
                      calories: 350,
                      type: "Strength",
                      exercises: ["Bench Press", "Shoulder Press", "Pull-ups", "Bicep Curls"],
                    },
                    {
                      name: "Cardio Session",
                      day: "Tuesday",
                      duration: 30,
                      calories: 400,
                      type: "Cardio",
                      exercises: ["Treadmill", "Stair Climber"],
                    },
                    {
                      name: "Lower Body Strength",
                      day: "Thursday",
                      duration: 60,
                      calories: 500,
                      type: "Strength",
                      exercises: ["Squats", "Deadlifts", "Lunges", "Leg Press"],
                    },
                    {
                      name: "HIIT Circuit",
                      day: "Friday",
                      duration: 20,
                      calories: 300,
                      type: "HIIT",
                      exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "Kettlebell Swings"],
                    },
                    {
                      name: "Full Body Workout",
                      day: "Saturday",
                      duration: 45,
                      calories: 400,
                      type: "Strength",
                      exercises: ["Deadlifts", "Push-ups", "Rows", "Shoulder Press"],
                    },
                  ].map((workout, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{workout.name}</h4>
                            <Badge
                              variant="outline"
                              className={`${
                                workout.type === "Strength"
                                  ? "border-primary text-primary"
                                  : workout.type === "Cardio"
                                    ? "border-red-500 text-red-500"
                                    : workout.type === "HIIT"
                                      ? "border-orange-500 text-orange-500"
                                      : ""
                              }`}
                            >
                              {workout.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">{workout.day}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{workout.duration} min</div>
                          <div className="text-sm text-muted-foreground">{workout.calories} cal</div>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {workout.exercises.map((exercise, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {exercise}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Nutrition Summary</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Avg. Daily Calories</div>
                      <div className="text-2xl font-bold">2,107</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Avg. Protein</div>
                      <div className="text-2xl font-bold">145g</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Avg. Carbs</div>
                      <div className="text-2xl font-bold">211g</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Avg. Fat</div>
                      <div className="text-2xl font-bold">70g</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Macronutrient Breakdown</h4>
                    <div className="h-[200px] bg-muted/20 rounded-md p-4">
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        Macronutrient chart
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Daily Nutrition</h3>
                <div className="space-y-3">
                  {weeklyData.nutritionByDay.map((day, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">
                          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][index]}
                        </h4>
                        <div className="font-medium">{day.calories} calories</div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Protein ({Math.round((day.protein * 4 * 100) / day.calories)}%)</span>
                            <span>{day.protein}g</span>
                          </div>
                          <Progress value={(day.protein * 4 * 100) / day.calories} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Carbs ({Math.round((day.carbs * 4 * 100) / day.calories)}%)</span>
                            <span>{day.carbs}g</span>
                          </div>
                          <Progress value={(day.carbs * 4 * 100) / day.calories} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Fat ({Math.round((day.fat * 9 * 100) / day.calories)}%)</span>
                            <span>{day.fat}g</span>
                          </div>
                          <Progress value={(day.fat * 9 * 100) / day.calories} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

