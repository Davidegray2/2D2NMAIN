"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dumbbell, Flame, ArrowLeft, Clock, BarChart3, Heart, Activity } from "lucide-react"
import Link from "next/link"

export default function SavageStrengthPage() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [heartRate, setHeartRate] = useState(72)
  const [showWearableData, setShowWearableData] = useState(true)

  // Mock workout data
  const workout = {
    title: "SAVAGE STRENGTH",
    subtitle: "Golden Era Bodybuilding",
    description:
      "This brutal workout is inspired by the training methods of the Golden Era bodybuilders. High volume, high intensity, and maximum pain for maximum gain.",
    duration: "90 min",
    difficulty: "ADVANCED",
    equipment: "Full Gym",
    exercises: [
      {
        name: "Bench Press",
        sets: "5",
        reps: "12, 10, 8, 6, 4",
        rest: "90-120 sec",
        techniques: ["Drop sets on last set", "Forced negatives"],
        image: "/placeholder.svg?height=300&width=500&text=Bench+Press",
      },
      {
        name: "Incline Dumbbell Press",
        sets: "4",
        reps: "10-12",
        rest: "60-90 sec",
        techniques: ["Squeeze at top", "Full stretch at bottom"],
        image: "/placeholder.svg?height=300&width=500&text=Incline+DB+Press",
      },
      {
        name: "Cable Flyes",
        sets: "3",
        reps: "12-15",
        rest: "60 sec",
        techniques: ["Superset with pushups", "Hold peak contraction"],
        image: "/placeholder.svg?height=300&width=500&text=Cable+Flyes",
      },
      {
        name: "Barbell Rows",
        sets: "5",
        reps: "12, 10, 8, 8, 6",
        rest: "90 sec",
        techniques: ["Explosive concentric", "Controlled eccentric"],
        image: "/placeholder.svg?height=300&width=500&text=Barbell+Rows",
      },
      {
        name: "Pullups",
        sets: "4",
        reps: "AMRAP",
        rest: "120 sec",
        techniques: ["Add weight if possible", "Slow negatives on last rep"],
        image: "/placeholder.svg?height=300&width=500&text=Pullups",
      },
      {
        name: "T-Bar Rows",
        sets: "3",
        reps: "10-12",
        rest: "90 sec",
        techniques: ["Drop set on last set", "Focus on contraction"],
        image: "/placeholder.svg?height=300&width=500&text=T-Bar+Rows",
      },
    ],
  }

  // Simulate heart rate changes when navigating exercises
  const updateHeartRate = (index: number) => {
    setCurrentExercise(index)
    // Simulate heart rate based on exercise intensity
    const baseRate = 120
    const variation = Math.floor(Math.random() * 30)
    setHeartRate(baseRate + variation)
  }

  return (
    <div className="relative min-h-screen">
      {/* Old School Weight Room Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <img
          src="/placeholder.svg?height=1200&width=1600&text=Vintage+Gym+Background"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" asChild className="mr-2 text-white">
            <Link href="/underground">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-white">{workout.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-black/80 border-red-500/20 mb-6 overflow-hidden">
              <div className="aspect-video w-full relative">
                <img
                  src="/placeholder.svg?height=500&width=1000&text=Arnold+Training+Chest"
                  alt="Workout Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-2xl font-bold text-white">{workout.title}</h2>
                  <p className="text-gray-300">{workout.subtitle}</p>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="destructive">{workout.difficulty}</Badge>
                  <Badge variant="outline" className="bg-black/50 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    {workout.duration}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-300 mb-4">{workout.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-black text-gray-300 border-gray-700">
                    Drop Sets
                  </Badge>
                  <Badge variant="outline" className="bg-black text-gray-300 border-gray-700">
                    Forced Reps
                  </Badge>
                  <Badge variant="outline" className="bg-black text-gray-300 border-gray-700">
                    Supersets
                  </Badge>
                  <Badge variant="outline" className="bg-black text-gray-300 border-gray-700">
                    Negatives
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Card className="bg-black/50 border-gray-800">
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm flex items-center text-gray-300">
                        <Dumbbell className="h-4 w-4 mr-2 text-red-500" />
                        Equipment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <p className="text-white font-medium">{workout.equipment}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/50 border-gray-800">
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm flex items-center text-gray-300">
                        <Flame className="h-4 w-4 mr-2 text-red-500" />
                        Intensity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <p className="text-white font-medium">Maximum Effort</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/50 border-gray-800">
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm flex items-center text-gray-300">
                        <BarChart3 className="h-4 w-4 mr-2 text-red-500" />
                        Focus
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <p className="text-white font-medium">Hypertrophy</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-between">
                  <Button className="bg-red-900 hover:bg-red-800 text-white">Start Workout</Button>
                  <Button variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-500/10">
                    Save for Later
                  </Button>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-xl font-bold text-white mb-4">WORKOUT BREAKDOWN</h2>
            <div className="space-y-4">
              {workout.exercises.map((exercise, index) => (
                <Card
                  key={index}
                  className={`bg-black/80 border-gray-800 hover:border-red-500/30 transition-all cursor-pointer ${
                    currentExercise === index ? "border-red-500/50" : ""
                  }`}
                  onClick={() => updateHeartRate(index)}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-video md:aspect-square">
                      <img
                        src={exercise.image || "/placeholder.svg"}
                        alt={exercise.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 md:w-2/3">
                      <h3 className="text-lg font-medium text-white mb-2">{exercise.name}</h3>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div>
                          <p className="text-xs text-gray-400">Sets</p>
                          <p className="text-white font-medium">{exercise.sets}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Reps</p>
                          <p className="text-white font-medium">{exercise.reps}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Rest</p>
                          <p className="text-white font-medium">{exercise.rest}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Techniques</p>
                        <div className="flex flex-wrap gap-1">
                          {exercise.techniques.map((technique, i) => (
                            <Badge key={i} variant="outline" className="bg-black text-gray-300 border-gray-700">
                              {technique}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {showWearableData && (
              <Card className="bg-black/80 border-red-500/20">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-white flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-red-500" />
                      Wearable Data
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowWearableData(false)}
                      className="h-8 w-8 p-0 text-gray-400"
                    >
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm text-gray-300">Current Heart Rate</p>
                        <p className="text-lg font-bold text-white flex items-center">
                          {heartRate} <Heart className="h-4 w-4 ml-1 text-red-500" />
                        </p>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-red-500"
                          style={{ width: `${(heartRate / 200) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Rest (60-80)</span>
                        <span>Moderate (80-140)</span>
                        <span>Max (140+)</span>
                      </div>
                    </div>

                    <Alert className="bg-yellow-500/10 border-yellow-500/30">
                      <AlertDescription className="text-sm text-yellow-200">
                        Your Apple Watch is tracking this workout. Stay in Zone 4-5 for optimal hypertrophy results.
                      </AlertDescription>
                    </Alert>

                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Previous Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-300">Bench Press (Last Workout)</p>
                          <p className="text-xs font-medium text-white">225 lbs × 8 reps</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-300">Barbell Rows (Last Workout)</p>
                          <p className="text-xs font-medium text-white">185 lbs × 10 reps</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-300">Pullups (Last Workout)</p>
                          <p className="text-xs font-medium text-white">BW+25 lbs × 8 reps</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-black/80 border-red-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Golden Era Wisdom</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video mb-4 overflow-hidden rounded-md">
                  <img
                    src="/placeholder.svg?height=300&width=500&text=Arnold+Posing"
                    alt="Arnold Posing"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs">
                    "The mind is the limit. As long as the mind can envision the fact that you can do something, you can
                    do it, as long as you really believe 100 percent."
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-l-2 border-red-500 pl-3">
                    <p className="text-gray-300 italic text-sm">
                      "The resistance that you fight physically in the gym and the resistance that you fight in life can
                      only build a strong character."
                    </p>
                    <p className="text-xs text-gray-400 mt-1">- Arnold Schwarzenegger</p>
                  </div>
                  <div className="border-l-2 border-red-500 pl-3">
                    <p className="text-gray-300 italic text-sm">
                      "If you want to turn a vision into reality, you have to give 100% and never stop believing in your
                      dream."
                    </p>
                    <p className="text-xs text-gray-400 mt-1">- Arnold Schwarzenegger</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-red-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Training Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                    <span>Focus on mind-muscle connection over ego lifting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                    <span>Use a controlled negative on every rep - 2-3 seconds down</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                    <span>Rest periods are strict - use your wearable timer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                    <span>Log your weights and reps for progressive overload</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                    <span>Hydrate between sets - aim for 1L during workout</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

