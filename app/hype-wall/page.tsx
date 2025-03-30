"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronUp, Heart, MessageSquare, Flag, Image, Calendar, Award, FlameIcon as Fire, Camera } from "lucide-react"
import { SocialShare } from "@/components/social-share"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock data for transformations
const transformations = []

export default function HypeWallPage() {
  const [activeTab, setActiveTab] = useState("recent")
  const [showPostDialog, setShowPostDialog] = useState(false)
  const [beforeImage, setBeforeImage] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [tags, setTags] = useState("")

  const handleBeforeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setBeforeImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAfterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setAfterImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    // In a real app, you would send this data to your backend
    console.log({
      title,
      description,
      duration,
      tags: tags.split(",").map((tag) => tag.trim()),
      beforeImage,
      afterImage,
    })

    // Reset form
    setTitle("")
    setDescription("")
    setDuration("")
    setTags("")
    setBeforeImage(null)
    setAfterImage(null)
    setShowPostDialog(false)

    // Show success message or redirect
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transformation Hype Wall</h1>
          <p className="text-muted-foreground">Celebrate progress and inspire others with your fitness journey</p>
        </div>
        <Button
          onClick={() => setShowPostDialog(true)}
          size="lg"
          className="gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light"
        >
          <Image className="h-4 w-4" />
          Share Your Transformation
        </Button>
      </div>

      {/* Add this new community guidelines banner */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
        <h3 className="font-semibold flex items-center text-primary">
          <Heart className="h-4 w-4 mr-2 fill-primary" /> Community Guidelines
        </h3>
        <p className="text-sm mt-1">
          The Hype Wall is a positive space to celebrate transformations. Negativity, criticism, and disrespectful
          comments are not allowed. Let's keep this a supportive environment where everyone feels comfortable sharing
          their journey.
        </p>
      </div>

      <Tabs defaultValue="recent" className="mb-6" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Fire className="h-4 w-4 mr-2" />
              This Month
            </Button>
            <Button variant="outline" size="sm">
              <Award className="h-4 w-4 mr-2" />
              All Time
            </Button>
          </div>
        </div>

        <TabsContent value="recent" className="mt-6">
          <div className="grid gap-6">
            {transformations.length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-lg col-span-3">
                <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No transformations yet</h3>
                <p className="text-muted-foreground mb-4">Be the first to share your fitness transformation!</p>
                <Button onClick={() => setShowPostDialog(true)} className="gap-2">
                  <Image className="h-4 w-4" />
                  Share Your Transformation
                </Button>
              </div>
            )}
            {transformations.map((transformation) => (
              <TransformationCard key={transformation.id} transformation={transformation} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="grid gap-6">
            {transformations.length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-lg col-span-3">
                <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No transformations yet</h3>
                <p className="text-muted-foreground mb-4">Be the first to share your fitness transformation!</p>
                <Button onClick={() => setShowPostDialog(true)} className="gap-2">
                  <Image className="h-4 w-4" />
                  Share Your Transformation
                </Button>
              </div>
            )}
            {[...transformations]
              .sort((a, b) => b.likes - a.likes)
              .map((transformation) => (
                <TransformationCard key={transformation.id} transformation={transformation} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <div className="grid gap-6">
            {transformations.length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-lg col-span-3">
                <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No transformations yet</h3>
                <p className="text-muted-foreground mb-4">Be the first to share your fitness transformation!</p>
                <Button onClick={() => setShowPostDialog(true)} className="gap-2">
                  <Image className="h-4 w-4" />
                  Share Your Transformation
                </Button>
              </div>
            )}
            {transformations
              .filter((t, i) => i === 2)
              .map((transformation) => (
                <TransformationCard key={transformation.id} transformation={transformation} featured />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="following" className="mt-6">
          <div className="grid gap-6">
            {transformations.length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-lg col-span-3">
                <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No transformations yet</h3>
                <p className="text-muted-foreground mb-4">Be the first to share your fitness transformation!</p>
                <Button onClick={() => setShowPostDialog(true)} className="gap-2">
                  <Image className="h-4 w-4" />
                  Share Your Transformation
                </Button>
              </div>
            )}
            {transformations
              .filter((t, i) => i === 0)
              .map((transformation) => (
                <TransformationCard key={transformation.id} transformation={transformation} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Share Your Transformation</DialogTitle>
            <DialogDescription>
              Post your before and after pictures to inspire others and celebrate your progress.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., My 6 Month Transformation"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Share your journey, challenges, and what helped you succeed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 6 months"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., WeightLoss, Strength"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label className="block mb-2">Before Picture</Label>
                <div className="border-2 border-dashed rounded-md p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  {beforeImage ? (
                    <div className="relative">
                      <img
                        src={beforeImage || "/images/transformations/default-before.jpg"}
                        alt="Before"
                        className="max-h-[200px] mx-auto rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setBeforeImage(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Click to upload</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleBeforeImageChange} />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <Label className="block mb-2">After Picture</Label>
                <div className="border-2 border-dashed rounded-md p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  {afterImage ? (
                    <div className="relative">
                      <img
                        src={afterImage || "/images/transformations/default-after.jpg"}
                        alt="After"
                        className="max-h-[200px] mx-auto rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setAfterImage(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Click to upload</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleAfterImageChange} />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPostDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!title || !description || !beforeImage || !afterImage}>
              Post Transformation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface TransformationCardProps {
  transformation: (typeof transformations)[0]
  featured?: boolean
}

function TransformationCard({ transformation, featured = false }: TransformationCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(transformation.likes)
  const [hyped, setHyped] = useState(false)
  const [hypeCount, setHypeCount] = useState(transformation.hypes)
  const { toast } = useToast()

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleHype = () => {
    if (hyped) {
      setHypeCount(hypeCount - 1)
      toast({
        title: "Hype removed",
        description: "You've removed your hype from this transformation",
      })
    } else {
      setHypeCount(hypeCount + 1)
      toast({
        title: "Transformation hyped! 🔥",
        description: "You've hyped this amazing transformation",
      })
    }
    setHyped(!hyped)
  }

  return (
    <Card className={featured ? "border-primary/50 bg-primary-light/10" : ""}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Link
              href={`/profile/${transformation.user.name.toLowerCase().replace(/ /g, "-")}`}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
              title={`View ${transformation.user.name}'s profile`}
            >
              <Avatar>
                <AvatarImage src={transformation.user.avatar || "/images/avatars/default.jpg"} />
                <AvatarFallback>{transformation.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium flex items-center gap-2 group-hover:text-primary transition-colors">
                  {transformation.user.name}
                  <Badge variant="outline" className="ml-2">
                    {transformation.user.tier}
                  </Badge>
                  {featured && (
                    <Badge variant="default" className="ml-1">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>{transformation.timeAgo}</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Member since {transformation.user.memberSince}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <Button variant="ghost" size="icon">
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <Link href={`/hype-wall/${transformation.id}`} className="hover:underline">
          <h3 className="text-xl font-bold mb-2">{transformation.title}</h3>
        </Link>
        <p className="mb-4">{transformation.description}</p>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">
            <Calendar className="h-3 w-3 mr-1" />
            {transformation.duration}
          </Badge>
          {transformation.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>

        <Link href={`/hype-wall/${transformation.id}`} className="block">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden">
                <img
                  src={transformation.beforeImage || "/images/transformations/default-before.jpg"}
                  alt="Before"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-sm font-medium">Before</p>
            </div>
            <div className="space-y-2">
              <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden">
                <img
                  src={transformation.afterImage || "/images/transformations/default-after.jpg"}
                  alt="After"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-sm font-medium">After</p>
            </div>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className={`gap-2 ${liked ? "text-red-500" : ""}`} onClick={handleLike}>
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              <span>{likeCount}</span>
            </Button>
            <Link href={`/hype-wall/${transformation.id}#comments`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{transformation.comments}</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${hyped ? "text-primary font-medium" : ""}`}
              onClick={handleHype}
            >
              <ChevronUp className={`h-4 w-4 ${hyped ? "text-primary" : ""}`} />
              <span>{hypeCount}</span>
            </Button>
          </div>
          <SocialShare
            variant="icon"
            title={`Check out ${transformation.user.name}'s amazing transformation on 2D2N Fitness!`}
            description={transformation.description}
            imageUrl={transformation.afterImage}
          />
        </div>
      </CardFooter>
    </Card>
  )
}

