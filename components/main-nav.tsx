"use client"
import Link from "next/link"
import {
  Dumbbell,
  Home,
  Info,
  MessageSquare,
  Settings,
  Trophy,
  Users,
  Crown,
  Flame,
  Swords,
  User,
  LineChart,
  Plus,
  Apple,
  Ruler,
  Bot,
  Globe,
  Headphones,
  Video,
  Skull,
  Megaphone,
  Gift,
  UserCircle,
  Mail,
  MessageCircle,
  FileText,
  LayoutDashboard,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { SubscriptionContext } from "@/contexts/subscription-context"

interface MainNavProps {
  isAuthenticated: boolean
}

export const MainNav = ({ isAuthenticated }: MainNavProps) => {
  // Safely access the subscription context
  const subscriptionContext = useContext(SubscriptionContext)

  // Function to check if user has access to a specific tier
  // Falls back to false if context is not available
  const hasAccess = (requiredTier: string): boolean => {
    if (!subscriptionContext) return false
    return subscriptionContext.hasAccess(requiredTier as any)
  }

  return (
    <nav className="flex flex-col gap-4">
      {/* Public sections - always visible */}
      <div className="px-2 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Welcome</h2>
        <div className="space-y-1">
          <Link href="/" passHref>
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/about" passHref>
            <Button variant="ghost" className="w-full justify-start">
              <Info className="mr-2 h-4 w-4" />
              About
            </Button>
          </Link>
          <Link href="/trainer/login" passHref>
            <Button variant="ghost" className="w-full justify-start">
              <Briefcase className="mr-2 h-4 w-4" />
              Trainer Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Protected sections - only visible to authenticated users */}
      {isAuthenticated && (
        <>
          <div className="px-2 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Core</h2>
            <div className="space-y-1">
              <Link href="/dashboard" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/profile" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Link href="/performance-tracking" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <LineChart className="mr-2 h-4 w-4" />
                  Performance
                </Button>
              </Link>
              <Link href="/settings" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>

          <div className="px-2 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Training</h2>
            <div className="space-y-1">
              <Link href="/workouts" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Workouts
                </Button>
              </Link>
              <Link href="/create-workout" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Workout
                </Button>
              </Link>
              <Link href="/workout-battles" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Swords className="mr-2 h-4 w-4" />
                  Workout Battles
                </Button>
              </Link>
              <Link href="/nutrition" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Apple className="mr-2 h-4 w-4" />
                  Nutrition
                </Button>
              </Link>
              <Link href="/body-composition" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Ruler className="mr-2 h-4 w-4" />
                  Body Composition
                </Button>
              </Link>
              <Link href="/fitness-ai" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Bot className="mr-2 h-4 w-4" />
                  Fitness AI
                </Button>
              </Link>
            </div>
          </div>

          <div className="px-2 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Community</h2>
            <div className="space-y-1">
              <Link href="/spotters" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Spotters
                </Button>
              </Link>
              <Link href="/messages" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </Link>
              <Link href="/community" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Globe className="mr-2 h-4 w-4" />
                  Community Feed
                </Button>
              </Link>
              <Link href="/hype-wall" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Flame className="mr-2 h-4 w-4" />
                  Hype Wall
                </Button>
              </Link>
              <Link href="/leaderboard" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Trophy className="mr-2 h-4 w-4" />
                  Leaderboard
                </Button>
              </Link>
              <Link href="/trainers" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Headphones className="mr-2 h-4 w-4" />
                  Trainers
                </Button>
              </Link>
              <Link href="/live-trainers" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Video className="mr-2 h-4 w-4" />
                  Live Trainers
                </Button>
              </Link>
            </div>
          </div>

          <div className="px-2 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Premium</h2>
            <div className="space-y-1">
              <Link href="/underground" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Skull className="mr-2 h-4 w-4" />
                  Underground
                </Button>
              </Link>
              <Link href="/elite-membership" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Crown className="mr-2 h-4 w-4" />
                  Elite Membership
                </Button>
              </Link>
              <Link href="/coaching" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Megaphone className="mr-2 h-4 w-4" />
                  Coaching
                </Button>
              </Link>
              <Link href="/rewards" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Gift className="mr-2 h-4 w-4" />
                  Rewards
                </Button>
              </Link>
              <Link href="/avatar-studio" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Avatar Studio
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Support section - always visible */}
      <div className="px-2 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Support</h2>
        <div className="space-y-1">
          <Link href="/contact" passHref>
            <Button variant="ghost" className="w-full justify-start">
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Button>
          </Link>
          {isAuthenticated && hasAccess("contender") && (
            <Link href="/chat" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <MessageCircle className="mr-2 h-4 w-4" />
                Live Chat
              </Button>
            </Link>
          )}
          <Link href="/legal" passHref>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Legal
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default MainNav

