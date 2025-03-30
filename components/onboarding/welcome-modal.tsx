"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dumbbell, Utensils, Heart, Target, ArrowRight, Camera, Crown } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const [fitnessGoals, setFitnessGoals] = useState<string[]>([])
  const [fitnessLevel, setFitnessLevel] = useState("")
  const [preferences, setPreferences] = useState<string[]>([])

  // Modal is disabled
  useEffect(() => {
    // Set hasSeenWelcome to true to prevent the modal from showing up in the future
    localStorage.setItem("hasSeenWelcome", "true")
    setIsOpen(false)
  }, [])

  const handleClose = () => {
    localStorage.setItem("hasSeenWelcome", "true")
    setIsOpen(false)
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
      setProgress((step + 1) * 25)
    } else {
      handleClose()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      setProgress((step - 1) * 25)
    }
  }

  const toggleFitnessGoal = (goal: string) => {
    setFitnessGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]))
  }

  const togglePreference = (pref: string) => {
    setPreferences((prev) => (prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            Welcome to 2ND2NONE
          </DialogTitle>
          <DialogDescription>Welcome to your fitness journey</DialogDescription>
        </DialogHeader>

        <div className="mt-2 mb-4">
          <Progress value={progress} className="h-2" />
        </div>

        {step === 1 && (
          <div className="space-y-4 py-2">
            <h3 className="text-lg font-medium">What are your fitness goals?</h3>
            <p className="text-sm text-muted-foreground mb-4">Select all that apply to you</p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Build Muscle", icon: <Dumbbell className="h-5 w-5 text-primary" /> },
                { label: "Lose Weight", icon: <Target className="h-5 w-5 text-primary" /> },
                { label: "Improve Fitness", icon: <Heart className="h-5 w-5 text-primary" /> },
                { label: "Better Nutrition", icon: <Utensils className="h-5 w-5 text-primary" /> },
              ].map((goal) => (
                <div
                  key={goal.label}
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    fitnessGoals.includes(goal.label)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => toggleFitnessGoal(goal.label)}
                >
                  {goal.icon}
                  <span>{goal.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-2">
            <h3 className="text-lg font-medium">What's your current fitness level?</h3>
            <p className="text-sm text-muted-foreground mb-4">This helps us recommend appropriate workouts</p>

            <div className="grid grid-cols-1 gap-3">
              {["Beginner", "Intermediate", "Advanced", "Legend"].map((level) => (
                <div
                  key={level}
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    fitnessLevel === level ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setFitnessLevel(level)}
                >
                  <div className={`h-4 w-4 rounded-full ${fitnessLevel === level ? "bg-primary" : "bg-muted"}`} />
                  <span>{level}</span>
                  {level === "Legend" && <Crown className="h-3 w-3 text-amber-500 ml-1" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 py-2">
            <h3 className="text-lg font-medium">What features interest you most?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We'll customize your dashboard based on your preferences
            </p>

            <div className="space-y-3">
              {[
                "Workout tracking",
                "Nutrition planning",
                "Community challenges",
                "Progress photos",
                "Workout battles",
                "Personal training",
                { label: "Body composition analysis", icon: <Camera className="h-3 w-3 text-amber-500" /> },
              ].map((pref) => (
                <div key={typeof pref === "string" ? pref : pref.label} className="flex items-center space-x-2">
                  <Checkbox
                    id={typeof pref === "string" ? pref : pref.label}
                    checked={preferences.includes(typeof pref === "string" ? pref : pref.label)}
                    onCheckedChange={() => togglePreference(typeof pref === "string" ? pref : pref.label)}
                  />
                  <Label htmlFor={typeof pref === "string" ? pref : pref.label} className="flex items-center gap-1">
                    {typeof pref === "string" ? (
                      pref
                    ) : (
                      <>
                        {pref.label}
                        {pref.icon}
                      </>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 py-2 text-center">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Dumbbell className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-medium">You're all set!</h3>
            <p className="text-muted-foreground">
              We've personalized your experience based on your preferences. You can always update these in your settings
              later.
            </p>

            <div className="bg-primary/10 rounded-lg p-4 mt-6">
              <p className="font-medium">Your personalized dashboard is ready</p>
              <p className="text-sm text-muted-foreground">Start your fitness journey today!</p>
            </div>
          </div>
        )}

        <DialogFooter className="flex items-center justify-between mt-6">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button onClick={handleNext} className="gap-2">
            {step < 4 ? "Continue" : "Get Started"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

