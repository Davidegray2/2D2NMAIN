"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Share2, Save, Undo2, Camera, Sparkles, Lock, Rotate3D } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/hooks/use-toast"

import { AvatarPreview } from "@/components/avatar-preview"
import {
  type AvatarCategory,
  type AvatarCustomization,
  getAvatarItemsByCategory,
  type AvatarItem,
  getAvatarItemById,
  getUnlockedAvatarItems,
} from "@/data/avatar-system"
import { getUserTier } from "@/data/membership-tiers"
import { AvatarItemPreview } from "@/components/avatar-item-preview"
import { ShareAvatarDialog } from "@/components/share-avatar-dialog"

// Mock user data
const mockUser = {
  username: "FitnessWarrior",
  points: 850,
  achievements: ["ach-001", "ach-002"],
  clanTheme: "wolves",
  avatarCustomization: {
    body: "body-002",
    face: "face-001",
    hair: "hair-004",
    outfit: "outfit-003",
    accessories: "accessory-003",
    background: "background-003",
    skin: "skin-003",
    facial_hair: "facial-hair-002",
    eyes: "eyes-001",
  } as AvatarCustomization,
}

const categories: AvatarCategory[] = [
  "body",
  "face",
  "hair",
  "skin",
  "eyes",
  "facial_hair",
  "outfit",
  "accessories",
  "background",
]

const categoryNames: Record<AvatarCategory, string> = {
  body: "Body Type",
  face: "Face Shape",
  hair: "Hairstyle",
  skin: "Skin Tone",
  eyes: "Eyes",
  facial_hair: "Facial Hair",
  outfit: "Outfit",
  accessories: "Accessories",
  background: "Background",
}

export default function AvatarStudioPage() {
  const [customization, setCustomization] = useState<AvatarCustomization>(mockUser.avatarCustomization)
  const [originalCustomization] = useState<AvatarCustomization>(mockUser.avatarCustomization)
  const [selectedItemPreview, setSelectedItemPreview] = useState<AvatarItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<AvatarCategory>("body")
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d")
  const [autoRotate, setAutoRotate] = useState(false)
  const [showLockedItems, setShowLockedItems] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredItems, setFilteredItems] = useState<AvatarItem[]>([])
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null)

  // Get user's current tier
  const userTier = getUserTier(mockUser.points)

  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<null | "success" | "error">(null)
  const [showRandomizeConfirm, setShowRandomizeConfirm] = useState(false)

  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [avatarUrlForSharing, setAvatarUrlForSharing] = useState("")

  const [zoomLevel, setZoomLevel] = useState(100)
  const [showHighQuality, setShowHighQuality] = useState(true)
  const [showEffects, setShowEffects] = useState(true)

  const screenshotRef = useRef<HTMLDivElement>(null)

  // Filter items based on search query and locked status
  useEffect(() => {
    const allItems = getAvatarItemsByCategory(activeCategory)
    const unlockedItems = getUnlockedAvatarItems(userTier.id, mockUser.achievements, mockUser.clanTheme)

    let items = showLockedItems ? allItems : allItems.filter((item) => unlockedItems.some((ui) => ui.id === item.id))

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query)),
      )
    }

    setFilteredItems(items)
  }, [activeCategory, searchQuery, showLockedItems, userTier.id])

  const handleSelectItem = (category: AvatarCategory, itemId: string) => {
    // Check if item is locked
    const item = getAvatarItemById(itemId)
    if (item) {
      const unlockedItems = getUnlockedAvatarItems(userTier.id, mockUser.achievements, mockUser.clanTheme)
      const isUnlocked = unlockedItems.some((ui) => ui.id === itemId)

      if (!isUnlocked) {
        toast({
          title: "Item Locked",
          description: `This item requires a higher membership tier or special achievement.`,
          variant: "destructive",
        })
        return
      }

      // Update the customization state
      setCustomization((prev) => ({
        ...prev,
        [category]: itemId,
      }))

      // Set the selected item for preview
      setSelectedItemPreview(item)

      // Highlight the selected item briefly
      setHighlightedItemId(itemId)
      setTimeout(() => setHighlightedItemId(null), 1000)

      // Show a toast to confirm selection
      toast({
        title: "Item Selected",
        description: `${item.name} has been applied to your avatar.`,
      })
    }
  }

  const handleReset = () => {
    setCustomization(originalCustomization)
    toast({
      title: "Avatar Reset",
      description: "Your avatar has been reset to its original state.",
    })
  }

  const handleRandomize = () => {
    const newCustomization: Partial<AvatarCustomization> = {}
    const unlockedItems = getUnlockedAvatarItems(userTier.id, mockUser.achievements, mockUser.clanTheme)

    categories.forEach((category) => {
      const categoryItems = unlockedItems.filter((item) => item.category === category)
      if (categoryItems.length > 0) {
        const randomIndex = Math.floor(Math.random() * categoryItems.length)
        newCustomization[category] = categoryItems[randomIndex].id
      }
    })

    setCustomization((prev) => ({
      ...prev,
      ...newCustomization,
    }))

    setShowRandomizeConfirm(false)

    toast({
      title: "Avatar Randomized",
      description: "Your avatar has been randomly customized with available items.",
    })
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setSaveStatus(null)

      // Simulate API call to save avatar customization
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, this would save the customization to the user's profile
      // For example: await updateUserAvatar(user.id, customization)

      setSaveStatus("success")
      // Store in localStorage for persistence between page refreshes
      localStorage.setItem("savedAvatarCustomization", JSON.stringify(customization))

      toast({
        title: "Avatar Saved",
        description: "Your custom avatar has been saved successfully!",
      })
    } catch (error) {
      console.error("Error saving avatar:", error)
      setSaveStatus("error")

      toast({
        title: "Save Failed",
        description: "There was a problem saving your avatar. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const takeScreenshot = () => {
    if (screenshotRef.current) {
      // In a real implementation, this would use html2canvas or a similar library
      // to capture the avatar as an image
      toast({
        title: "Screenshot Taken",
        description: "Your avatar screenshot has been saved to your gallery.",
      })
    }
  }

  // Load saved customization from localStorage on initial render
  useEffect(() => {
    const savedCustomization = localStorage.getItem("savedAvatarCustomization")
    if (savedCustomization) {
      try {
        setCustomization(JSON.parse(savedCustomization))
      } catch (error) {
        console.error("Error parsing saved avatar customization:", error)
      }
    }
  }, [])

  // Add this useEffect after the other useEffect hooks
  useEffect(() => {
    // Initialize the selected item preview with the current customization
    if (customization[activeCategory]) {
      const currentItem = getAvatarItemById(customization[activeCategory] as string)
      if (currentItem) {
        setSelectedItemPreview(currentItem)
      }
    }
  }, [activeCategory, customization])

  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Avatar Studio</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch id="high-quality" checked={showHighQuality} onCheckedChange={setShowHighQuality} />
              <Label htmlFor="high-quality">High Quality</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="effects" checked={showEffects} onCheckedChange={setShowEffects} />
              <Label htmlFor="effects">Effects</Label>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Preview Panel */}
          <div>
            <Card className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>See how your avatar looks</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "2d" ? "3d" : "2d")}>
                      <Rotate3D className="h-4 w-4 mr-2" />
                      {viewMode === "2d" ? "3D View" : "2D View"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={takeScreenshot}>
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Screenshot</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center pb-0">
                <div ref={screenshotRef} className="relative">
                  <motion.div animate={{ scale: zoomLevel / 100 }} transition={{ duration: 0.3 }}>
                    <AvatarPreview
                      customization={customization}
                      username={mockUser.username}
                      tier={userTier}
                      showControls={false}
                      size="xl"
                      onAvatarRendered={(url) => setAvatarUrlForSharing(url)}
                      interactive={viewMode === "3d"}
                    />
                  </motion.div>

                  {showEffects && (
                    <AnimatePresence>
                      <motion.div
                        className="absolute -inset-4 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {Array.from({ length: 20 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute h-1 w-1 bg-primary rounded-full"
                            initial={{
                              x: Math.random() * 300 - 150,
                              y: Math.random() * 300 - 150,
                              opacity: 0,
                            }}
                            animate={{
                              x: Math.random() * 300 - 150,
                              y: Math.random() * 300 - 150,
                              opacity: [0, 0.8, 0],
                              scale: [0, 1, 0],
                            }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 2 + Math.random() * 3,
                              delay: Math.random() * 5,
                            }}
                          />
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>

                <div className="w-full mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Zoom</span>
                    <span className="text-sm">{zoomLevel}%</span>
                  </div>
                  <Slider
                    value={[zoomLevel]}
                    min={50}
                    max={150}
                    step={5}
                    onValueChange={(value) => setZoomLevel(value[0])}
                  />
                </div>

                {viewMode === "3d" && (
                  <div className="w-full mt-4 flex items-center space-x-2">
                    <Switch id="auto-rotate" checked={autoRotate} onCheckedChange={setAutoRotate} />
                    <Label htmlFor="auto-rotate">Auto-rotate</Label>
                  </div>
                )}
              </CardContent>

              <Separator className="my-6" />

              <CardFooter className="flex flex-col space-y-3 pb-6">
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button variant="outline" onClick={handleReset}>
                    <Undo2 className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  {showRandomizeConfirm ? (
                    <div className="col-span-2 flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          handleRandomize()
                          setShowRandomizeConfirm(false)
                        }}
                      >
                        Confirm
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowRandomizeConfirm(false)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => setShowRandomizeConfirm(true)}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Randomize
                    </Button>
                  )}
                  <Button variant="outline" className="col-span-2" onClick={() => setShareDialogOpen(true)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Avatar
                  </Button>
                  <Button className="col-span-2" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>

                  {saveStatus === "success" && (
                    <p className="text-green-500 text-sm mt-2 text-center col-span-2">Avatar saved successfully!</p>
                  )}

                  {saveStatus === "error" && (
                    <p className="text-red-500 text-sm mt-2 text-center col-span-2">
                      Error saving avatar. Please try again.
                    </p>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Customization Panel */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Customize Your Avatar</CardTitle>
                    <CardDescription>Mix and match to create your perfect fitness persona</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="show-locked" checked={showLockedItems} onCheckedChange={setShowLockedItems} />
                    <Label htmlFor="show-locked">Show Locked Items</Label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                <Tabs defaultValue="body" onValueChange={(value) => setActiveCategory(value as AvatarCategory)}>
                  <TabsList className="flex flex-wrap h-auto mb-4">
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category}>
                        {categoryNames[category]}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {categories.map((category) => (
                    <TabsContent key={category} value={category}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="md:col-span-2">
                          <ScrollArea className="h-[400px] pr-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                              {filteredItems.map((item) => {
                                const isSelected = customization[category] === item.id
                                const unlockedItems = getUnlockedAvatarItems(
                                  userTier.id,
                                  mockUser.achievements,
                                  mockUser.clanTheme,
                                )
                                const isLocked = !unlockedItems.some((ui) => ui.id === item.id)
                                const isHighlighted = highlightedItemId === item.id

                                return (
                                  <motion.div
                                    key={item.id}
                                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                      isSelected
                                        ? "border-primary bg-primary/10 ring-2 ring-primary"
                                        : isLocked
                                          ? "border-muted-foreground/20 opacity-50"
                                          : "border-muted-foreground/20 hover:border-primary hover:bg-primary/5"
                                    } ${isHighlighted ? "ring-2 ring-primary animate-pulse" : ""}`}
                                    onClick={() => !isLocked && handleSelectItem(category, item.id)}
                                    whileHover={{ scale: isLocked ? 1 : 1.05 }}
                                    animate={isHighlighted ? { scale: [1, 1.05, 1] } : {}}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div className="flex flex-col items-center">
                                      <div className="relative">
                                        <img
                                          src={
                                            item.thumbnailUrl ||
                                            `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(item.name)}`
                                          }
                                          alt={item.name}
                                          className="h-20 w-20 object-cover mb-2 rounded-md"
                                          onError={(e) => {
                                            // If image fails to load, replace with a placeholder
                                            e.currentTarget.src = `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(item.name)}`
                                          }}
                                        />
                                        {isLocked && (
                                          <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded">
                                            <Lock className="h-6 w-6 text-muted-foreground" />
                                          </div>
                                        )}
                                      </div>
                                      <span className="text-sm font-medium">{item.name}</span>
                                      {item.requiredTier && (
                                        <Badge variant="outline" className="mt-1 text-xs">
                                          {getUserTier(Number.parseInt(item.requiredTier.split("-")[1]) * 100).name}+
                                        </Badge>
                                      )}
                                      {item.isExclusive && (
                                        <Badge variant="secondary" className="mt-1 text-xs">
                                          Exclusive
                                        </Badge>
                                      )}
                                    </div>
                                  </motion.div>
                                )
                              })}

                              {filteredItems.length === 0 && (
                                <div className="col-span-3 py-8 text-center text-muted-foreground">
                                  {searchQuery ? (
                                    <p>No items found matching "{searchQuery}"</p>
                                  ) : (
                                    <p>No items available in this category</p>
                                  )}
                                </div>
                              )}
                            </div>
                          </ScrollArea>
                        </div>
                        <div className="hidden md:block">
                          <AvatarItemPreview
                            item={selectedItemPreview}
                            isLocked={
                              selectedItemPreview
                                ? !getUnlockedAvatarItems(userTier.id, mockUser.achievements, mockUser.clanTheme).some(
                                    (ui) => ui.id === selectedItemPreview.id,
                                  )
                                : false
                            }
                            requiredTier={
                              selectedItemPreview?.requiredTier
                                ? getUserTier(Number.parseInt(selectedItemPreview.requiredTier.split("-")[1]) * 100)
                                    .name
                                : undefined
                            }
                          />
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      <ShareAvatarDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        avatarUrl={avatarUrlForSharing}
        username={mockUser.username}
        customization={customization}
      />
    </div>
  )
}

