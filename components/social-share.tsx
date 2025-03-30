"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, Share2, Ghost, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

interface SocialShareProps {
  title?: string
  description?: string
  imageUrl?: string
  achievementType?: string
  data?: {
    [key: string]: any
  }
  variant?: "icon" | "button" | "icon-button"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SocialShare({
  title = "Check out my progress on 2D2N Fitness!",
  description = "I've been crushing my fitness goals with 2D2N Fitness. Join me on this journey!",
  imageUrl = "/placeholder.svg?height=600&width=600",
  achievementType = "progress",
  data = {},
  variant = "button",
  size = "md",
  className = "",
}: SocialShareProps) {
  const [shareSuccess, setShareSuccess] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    facebook: true,
    instagram: true,
    twitter: true,
    snapchat: false,
  })
  const [customMessage, setCustomMessage] = useState("")
  const [includeStats, setIncludeStats] = useState(true)

  const handleShare = async () => {
    // In a real implementation, this would use the respective social media APIs
    // For now, we'll simulate a successful share
    console.log("Sharing to platforms:", selectedPlatforms)
    console.log("Custom message:", customMessage || description)
    console.log("Include stats:", includeStats)
    console.log("Data to share:", data)

    // Show success message
    setShareSuccess(true)

    // Reset success message after 3 seconds
    setTimeout(() => {
      setShareSuccess(false)
    }, 3000)
  }

  const togglePlatform = (platform: keyof typeof selectedPlatforms) => {
    setSelectedPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }))
  }

  // Format the data based on achievement type
  const getFormattedStats = () => {
    if (!includeStats) return ""

    switch (achievementType) {
      case "workout":
        return `🏋️ Workout: ${data.type || "Completed"}\n⏱️ Duration: ${data.duration || "30 mins"}\n🔥 Calories: ${data.calories || "300"} burned`
      case "weight-loss":
        return `⚖️ Weight Loss: ${data.amount || "5"} lbs\n📅 Time Period: ${data.period || "1 month"}\n🎯 Progress: ${data.progress || "25%"} to goal`
      case "streak":
        return `🔥 Current Streak: ${data.days || "7"} days\n🏆 Personal Best: ${data.best || "14"} days\n💪 Consistency Score: ${data.score || "85%"}`
      case "milestone":
        return `🏆 Achievement: ${data.name || "Milestone Reached"}\n🌟 Level: ${data.level || "Intermediate"}\n🎖️ Earned: ${data.date || "Today"}`
      default:
        return `💪 Progress Update\n🔥 Feeling great on my fitness journey!\n🏆 Join me on 2D2N Fitness`
    }
  }

  const getShareContent = () => {
    const message = customMessage || description
    const stats = getFormattedStats()

    return `${message}\n\n${stats ? stats + "\n\n" : ""}#2D2NFitness #FitnessJourney #FitnessGoals`
  }

  // Render button based on variant
  const renderTrigger = () => {
    switch (variant) {
      case "icon":
        return (
          <Button variant="ghost" size="icon" className={className}>
            <Share2 className="h-4 w-4" />
          </Button>
        )
      case "icon-button":
        return (
          <Button variant="outline" size={size} className={`gap-2 ${className}`}>
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        )
      default:
        return (
          <Button variant="outline" size={size} className={className}>
            Share
          </Button>
        )
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{renderTrigger()}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Your Progress</DialogTitle>
          <DialogDescription>Share your fitness achievements with friends and followers</DialogDescription>
        </DialogHeader>

        {shareSuccess && (
          <Alert className="bg-green-500/10 border-green-500 text-green-500">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>Successfully shared to your selected platforms!</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="message">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="message">Message</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
          </TabsList>

          <TabsContent value="message" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-message">Customize your message</Label>
              <Textarea
                id="custom-message"
                placeholder={description}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="include-stats" checked={includeStats} onCheckedChange={setIncludeStats} />
              <Label htmlFor="include-stats">Include my stats</Label>
            </div>

            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Preview</h4>
              <div className="text-sm whitespace-pre-line text-muted-foreground">{getShareContent()}</div>
            </div>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <Label htmlFor="facebook">Facebook</Label>
                </div>
                <Switch
                  id="facebook"
                  checked={selectedPlatforms.facebook}
                  onCheckedChange={() => togglePlatform("facebook")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Instagram className="h-5 w-5 text-pink-600" />
                  <Label htmlFor="instagram">Instagram</Label>
                </div>
                <Switch
                  id="instagram"
                  checked={selectedPlatforms.instagram}
                  onCheckedChange={() => togglePlatform("instagram")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <X className="h-5 w-5 text-blue-400" />
                  <Label htmlFor="twitter">X (Twitter)</Label>
                </div>
                <Switch
                  id="twitter"
                  checked={selectedPlatforms.twitter}
                  onCheckedChange={() => togglePlatform("twitter")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ghost className="h-5 w-5 text-yellow-400" />
                  <Label htmlFor="snapchat">Snapchat</Label>
                </div>
                <Switch
                  id="snapchat"
                  checked={selectedPlatforms.snapchat}
                  onCheckedChange={() => togglePlatform("snapchat")}
                />
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Image Preview</h4>
              <div className="aspect-square max-h-[200px] rounded-md overflow-hidden bg-muted">
                <img src={imageUrl || "/placeholder.svg"} alt="Share preview" className="w-full h-full object-cover" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={handleShare}>Share Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

