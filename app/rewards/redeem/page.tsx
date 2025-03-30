"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Gift,
  Star,
  ShoppingBag,
  Trophy,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronLeft,
  Search,
  Filter,
  Dumbbell,
  Zap,
  Crown,
  Shirt,
  Ticket,
  Smartphone,
  Coffee,
  Heart,
  Flame,
  Mail,
  Package,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

// Types for our rewards system
type RewardCategory = "merchandise" | "subscriptions" | "experiences" | "digital" | "nutrition" | "exclusive"

type Reward = {
  id: string
  name: string
  description: string
  points: number
  category: RewardCategory
  image: string
  inStock: boolean
  featured?: boolean
  new?: boolean
  limited?: boolean
  membershipRequired?: string
}

type RedemptionHistory = {
  id: string
  rewardId: string
  rewardName: string
  points: number
  date: string
  status: "processing" | "shipped" | "delivered" | "redeemed" | "expired"
  trackingNumber?: string
}

// Mock data for rewards
const rewards: Reward[] = [
  {
    id: "reward-001",
    name: "2D2N Premium T-Shirt",
    description: "High-quality fitness t-shirt with moisture-wicking technology",
    points: 500,
    category: "merchandise",
    image: "/placeholder.svg?height=200&width=200&text=T-Shirt",
    inStock: true,
    featured: true,
  },
  {
    id: "reward-002",
    name: "Premium Membership - 1 Month",
    description: "Unlock all premium features for 30 days",
    points: 750,
    category: "subscriptions",
    image: "/placeholder.svg?height=200&width=200&text=Premium",
    inStock: true,
  },
  {
    id: "reward-003",
    name: "Personal Training Session",
    description: "One-on-one virtual training session with a certified trainer",
    points: 1000,
    category: "experiences",
    image: "/placeholder.svg?height=200&width=200&text=Training",
    inStock: true,
  },
  {
    id: "reward-004",
    name: "Fitness Tracker Discount",
    description: "25% off select fitness trackers from our partners",
    points: 600,
    category: "digital",
    image: "/placeholder.svg?height=200&width=200&text=Tracker",
    inStock: true,
  },
  {
    id: "reward-005",
    name: "Protein Supplement Pack",
    description: "One-month supply of premium protein supplements",
    points: 850,
    category: "nutrition",
    image: "/placeholder.svg?height=200&width=200&text=Protein",
    inStock: true,
  },
  {
    id: "reward-006",
    name: "Exclusive Workout Program",
    description: "Access to a celebrity trainer's exclusive workout program",
    points: 1200,
    category: "exclusive",
    image: "/placeholder.svg?height=200&width=200&text=Exclusive",
    inStock: true,
    limited: true,
  },
  {
    id: "reward-007",
    name: "2D2N Gym Bag",
    description: "Durable gym bag with multiple compartments",
    points: 700,
    category: "merchandise",
    image: "/placeholder.svg?height=200&width=200&text=Gym+Bag",
    inStock: true,
  },
  {
    id: "reward-008",
    name: "Nutrition Consultation",
    description: "30-minute consultation with a registered dietitian",
    points: 900,
    category: "experiences",
    image: "/placeholder.svg?height=200&width=200&text=Nutrition",
    inStock: true,
  },
  {
    id: "reward-009",
    name: "Premium Shaker Bottle",
    description: "High-quality shaker bottle with mixing ball",
    points: 300,
    category: "merchandise",
    image: "/placeholder.svg?height=200&width=200&text=Bottle",
    inStock: true,
    new: true,
  },
  {
    id: "reward-010",
    name: "Workout Playlist Premium",
    description: "3 months of premium music streaming service",
    points: 550,
    category: "digital",
    image: "/placeholder.svg?height=200&width=200&text=Music",
    inStock: true,
  },
  {
    id: "reward-011",
    name: "Recovery Massage",
    description: "Professional sports massage voucher",
    points: 1100,
    category: "experiences",
    image: "/placeholder.svg?height=200&width=200&text=Massage",
    inStock: true,
  },
  {
    id: "reward-012",
    name: "Fitness E-Book Bundle",
    description: "Collection of bestselling fitness and nutrition e-books",
    points: 400,
    category: "digital",
    image: "/placeholder.svg?height=200&width=200&text=E-Books",
    inStock: true,
  },
  {
    id: "reward-013",
    name: "Legendary Status Badge",
    description: "Exclusive profile badge showing your legendary status",
    points: 2000,
    category: "exclusive",
    image: "/placeholder.svg?height=200&width=200&text=Badge",
    inStock: true,
    membershipRequired: "Warrior",
  },
  {
    id: "reward-014",
    name: "Meal Prep Container Set",
    description: "Set of 7 meal prep containers with portion control",
    points: 450,
    category: "nutrition",
    image: "/placeholder.svg?height=200&width=200&text=Containers",
    inStock: true,
  },
  {
    id: "reward-015",
    name: "VIP Event Access",
    description: "Exclusive access to 2D2N fitness events and meetups",
    points: 1500,
    category: "exclusive",
    image: "/placeholder.svg?height=200&width=200&text=VIP",
    inStock: true,
    limited: true,
  },
]

// Mock redemption history
const redemptionHistory: RedemptionHistory[] = [
  {
    id: "redeem-001",
    rewardId: "reward-009",
    rewardName: "Premium Shaker Bottle",
    points: 300,
    date: "2023-03-01",
    status: "delivered",
    trackingNumber: "TRK123456789",
  },
  {
    id: "redeem-002",
    rewardId: "reward-002",
    rewardName: "Premium Membership - 1 Month",
    points: 750,
    date: "2023-02-15",
    status: "redeemed",
  },
  {
    id: "redeem-003",
    rewardId: "reward-012",
    rewardName: "Fitness E-Book Bundle",
    points: 400,
    date: "2023-01-20",
    status: "redeemed",
  },
]

// Mock user data
const userData = {
  totalPoints: 1850,
  pointsEarned: {
    thisWeek: 320,
    thisMonth: 950,
  },
  nextReward: {
    name: "Personal Training Session",
    points: 1000,
    progress: 85, // percentage
  },
  membershipTier: "Warrior",
}

export default function RewardsRedeemPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("featured")
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [redemptionSuccess, setRedemptionSuccess] = useState(false)
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  })

  // Add a new state for the redemption details dialog
  const [selectedRedemption, setSelectedRedemption] = useState<RedemptionHistory | null>(null)
  const [redemptionDetailsOpen, setRedemptionDetailsOpen] = useState(false)
  const { toast } = useToast()

  // Filter rewards based on category and search query
  const filteredRewards = rewards.filter((reward) => {
    const matchesCategory = selectedCategory === "all" || reward.category === selectedCategory
    const matchesSearch =
      reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort rewards based on selected option
  const sortedRewards = [...filteredRewards].sort((a, b) => {
    switch (sortOption) {
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      case "points-low":
        return a.points - b.points
      case "points-high":
        return b.points - a.points
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleRedeemClick = (reward: Reward) => {
    setSelectedReward(reward)
    setConfirmationOpen(true)
  }

  const handleConfirmRedemption = () => {
    // In a real app, this would call an API to process the redemption
    setConfirmationOpen(false)
    setRedemptionSuccess(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setRedemptionSuccess(false)
      setSelectedReward(null)
    }, 3000)
  }

  const getCategoryIcon = (category: RewardCategory) => {
    switch (category) {
      case "merchandise":
        return <Shirt className="h-4 w-4" />
      case "subscriptions":
        return <Calendar className="h-4 w-4" />
      case "experiences":
        return <Ticket className="h-4 w-4" />
      case "digital":
        return <Smartphone className="h-4 w-4" />
      case "nutrition":
        return <Coffee className="h-4 w-4" />
      case "exclusive":
        return <Crown className="h-4 w-4" />
      default:
        return <Gift className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: RedemptionHistory["status"]) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
            Shipped
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Delivered
          </Badge>
        )
      case "redeemed":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            Redeemed
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Expired
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Add a function to handle the View Details button click
  const handleViewRedemptionDetails = (redemption: RedemptionHistory) => {
    setSelectedRedemption(redemption)
    setRedemptionDetailsOpen(true)
  }

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/rewards">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Rewards Redemption</h1>
          <p className="text-muted-foreground">Redeem your hard-earned points for exclusive rewards</p>
        </div>
      </div>

      {redemptionSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600">Redemption Successful!</AlertTitle>
          <AlertDescription>
            You have successfully redeemed {selectedReward?.points} points for {selectedReward?.name}. Check your
            redemption history for details.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Your Points Summary</CardTitle>
            <CardDescription>Track your points and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">{userData.totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points Available</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">{userData.pointsEarned.thisWeek}</div>
                <div className="text-sm text-muted-foreground">Points Earned This Week</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">{userData.pointsEarned.thisMonth}</div>
                <div className="text-sm text-muted-foreground">Points Earned This Month</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-medium">Progress to {userData.nextReward.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {userData.totalPoints} / {userData.nextReward.points} points
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{userData.nextReward.progress}%</p>
                  <p className="text-sm text-muted-foreground">
                    {userData.nextReward.points - userData.totalPoints} points to go
                  </p>
                </div>
              </div>
              <Progress value={userData.nextReward.progress} className="h-2" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1">
                <Link href="/rewards">
                  <Trophy className="mr-2 h-4 w-4" />
                  Earn More Points
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="#rewards-catalog">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Rewards
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Membership Benefits</CardTitle>
            <CardDescription>Your {userData.membershipTier} tier perks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Crown className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">{userData.membershipTier} Tier</h3>
                <p className="text-sm text-muted-foreground">Exclusive rewards access</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Early access to limited rewards</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">10% bonus points on all redemptions</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Access to exclusive tier-only rewards</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Priority shipping on physical items</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="catalog" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="catalog">Rewards Catalog</TabsTrigger>
          <TabsTrigger value="history">Redemption History</TabsTrigger>
          <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          <div id="rewards-catalog" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search rewards..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="merchandise">Merchandise</SelectItem>
                    <SelectItem value="subscriptions">Subscriptions</SelectItem>
                    <SelectItem value="experiences">Experiences</SelectItem>
                    <SelectItem value="digital">Digital</SelectItem>
                    <SelectItem value="nutrition">Nutrition</SelectItem>
                    <SelectItem value="exclusive">Exclusive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="points-low">Points: Low to High</SelectItem>
                  <SelectItem value="points-high">Points: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedRewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-square bg-muted relative">
                    <img
                      src={reward.image || "/placeholder.svg"}
                      alt={reward.name}
                      className="w-full h-full object-cover"
                    />
                    {reward.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
                    {reward.new && <Badge className="absolute top-2 left-2 bg-green-600">New</Badge>}
                    {reward.limited && <Badge className="absolute top-2 right-2 bg-orange-600">Limited</Badge>}
                    {reward.membershipRequired && (
                      <Badge className="absolute top-2 right-2 bg-purple-600">{reward.membershipRequired}+</Badge>
                    )}
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <div className="flex items-center gap-1 mb-1">
                      {getCategoryIcon(reward.category)}
                      <span className="text-xs text-muted-foreground capitalize">{reward.category}</span>
                    </div>
                    <h3 className="font-medium mb-1">{reward.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{reward.description}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold">{reward.points} points</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="w-full"
                      disabled={userData.totalPoints < reward.points || !reward.inStock}
                      onClick={() => handleRedeemClick(reward)}
                    >
                      {userData.totalPoints >= reward.points
                        ? "Redeem"
                        : `Need ${reward.points - userData.totalPoints} more points`}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredRewards.length === 0 && (
              <div className="text-center py-12">
                <Gift className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-1">No rewards found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Your Redemption History</CardTitle>
              <CardDescription>Track your past rewards and redemptions</CardDescription>
            </CardHeader>
            <CardContent>
              {redemptionHistory.length > 0 ? (
                <div className="space-y-4">
                  {redemptionHistory.map((redemption) => (
                    <div
                      key={redemption.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{redemption.rewardName}</h3>
                          {getStatusBadge(redemption.status)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(redemption.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{redemption.points} points</span>
                        </div>
                        {redemption.trackingNumber && (
                          <div className="text-sm mt-1">
                            <span className="text-muted-foreground">Tracking: </span>
                            <span className="font-medium">{redemption.trackingNumber}</span>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 sm:mt-0"
                        onClick={() => handleViewRedemptionDetails(redemption)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-1">No redemptions yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't redeemed any rewards yet. Start redeeming to see your history here.
                  </p>
                  <Button asChild>
                    <Link href="#rewards-catalog">Browse Rewards</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="how-it-works">
          <Card>
            <CardHeader>
              <CardTitle>How Rewards Work</CardTitle>
              <CardDescription>Learn how to earn and redeem points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                      <Dumbbell className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Earn Points</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete workouts, win battles, track nutrition, and achieve goals to earn points
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Level Up</h3>
                    <p className="text-sm text-muted-foreground">
                      Increase your membership tier to unlock exclusive rewards and better redemption rates
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                      <Gift className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Redeem Rewards</h3>
                    <p className="text-sm text-muted-foreground">
                      Exchange your points for merchandise, subscriptions, experiences, and more
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Ways to Earn Points</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Dumbbell className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Complete Workouts</h4>
                        <p className="text-sm text-muted-foreground">10-50 points per workout</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Trophy className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Win Battles</h4>
                        <p className="text-sm text-muted-foreground">25-100 points per victory</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Maintain Streaks</h4>
                        <p className="text-sm text-muted-foreground">5 points per day, bonuses at milestones</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <Heart className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Track Nutrition</h4>
                        <p className="text-sm text-muted-foreground">5-15 points per day of tracking</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <Flame className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Burn Calories</h4>
                        <p className="text-sm text-muted-foreground">1 point per 100 calories burned</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                        <Crown className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Complete Challenges</h4>
                        <p className="text-sm text-muted-foreground">50-200 points per challenge</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Redemption FAQs</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">How long do points take to appear in my account?</h4>
                      <p className="text-sm text-muted-foreground">
                        Points are typically credited to your account immediately after completing an activity. In some
                        cases, it may take up to 24 hours for points to appear.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Do my points expire?</h4>
                      <p className="text-sm text-muted-foreground">
                        Points remain valid for 12 months from the date they are earned. Points expiration dates are
                        extended with continued activity.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">How long does shipping take for physical rewards?</h4>
                      <p className="text-sm text-muted-foreground">
                        Physical rewards typically ship within 5-7 business days. Shipping times vary by location.
                        Warrior tier members and above receive priority shipping.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Can I cancel or change my redemption?</h4>
                      <p className="text-sm text-muted-foreground">
                        Digital rewards cannot be canceled once redeemed. Physical rewards can be canceled within 24
                        hours of redemption if they have not yet shipped.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Redemption Confirmation Dialog */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Confirm Redemption</DialogTitle>
            <DialogDescription>
              You are about to redeem {selectedReward?.points} points for {selectedReward?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedReward && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-muted rounded-md overflow-hidden">
                  <img
                    src={selectedReward.image || "/placeholder.svg"}
                    alt={selectedReward.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{selectedReward.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedReward.description}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{selectedReward.points} points</span>
                  </div>
                </div>
              </div>

              {selectedReward.category === "merchandise" && (
                <div className="space-y-3">
                  <h4 className="font-medium">Shipping Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP/Postal Code</Label>
                      <Input
                        id="zip"
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={shippingInfo.country}
                        onValueChange={(value) => setShippingInfo({ ...shippingInfo, country: value })}
                      >
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-muted p-3 rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Current Balance:</span>
                  <span className="font-medium">{userData.totalPoints} points</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Redemption Cost:</span>
                  <span className="font-medium">-{selectedReward.points} points</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-sm font-medium">New Balance:</span>
                  <span className="font-bold">{userData.totalPoints - selectedReward.points} points</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmRedemption}>Confirm Redemption</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Redemption Details Dialog */}
      <Dialog open={redemptionDetailsOpen} onOpenChange={setRedemptionDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Redemption Details</DialogTitle>
            <DialogDescription>Details for your {selectedRedemption?.rewardName} redemption</DialogDescription>
          </DialogHeader>

          {selectedRedemption && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-muted rounded-md overflow-hidden flex items-center justify-center">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedRedemption.rewardName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{selectedRedemption.points} points</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(selectedRedemption.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-background p-1.5 rounded-full">{getStatusBadge(selectedRedemption.status)}</div>
                  <h4 className="font-medium">
                    Status: {selectedRedemption.status.charAt(0).toUpperCase() + selectedRedemption.status.slice(1)}
                  </h4>
                </div>

                <div className="space-y-3">
                  {selectedRedemption.trackingNumber && (
                    <div className="flex flex-col gap-1">
                      <div className="text-sm text-muted-foreground">Tracking Number</div>
                      <div className="flex items-center gap-2">
                        <code className="bg-background px-2 py-1 rounded text-sm font-mono">
                          {selectedRedemption.trackingNumber}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            navigator.clipboard.writeText(selectedRedemption.trackingNumber || "")
                            toast({
                              title: "Copied to clipboard",
                              description: "Tracking number has been copied to your clipboard",
                            })
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-copy"
                          >
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-muted-foreground">Redemption Date</div>
                    <div className="font-medium">
                      {new Date(selectedRedemption.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-muted-foreground">Redemption ID</div>
                    <div className="font-mono text-sm">{selectedRedemption.id}</div>
                  </div>

                  {selectedRedemption.status === "shipped" && (
                    <div className="flex flex-col gap-1">
                      <div className="text-sm text-muted-foreground">Estimated Delivery</div>
                      <div className="font-medium">
                        {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {(selectedRedemption.status === "shipped" || selectedRedemption.status === "processing") && (
                <div className="space-y-3">
                  <h4 className="font-medium">Shipping Address</h4>
                  <div className="text-sm">
                    <p>John Doe</p>
                    <p>123 Fitness Street</p>
                    <p>Workout City, WO 12345</p>
                    <p>United States</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {selectedRedemption.status === "shipped" && selectedRedemption.trackingNumber && (
                  <Button className="w-full" variant="outline">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Track Package
                  </Button>
                )}

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Support request sent",
                      description: "We've received your request and will get back to you shortly.",
                    })
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setRedemptionDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

