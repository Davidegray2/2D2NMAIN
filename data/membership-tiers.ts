import { Trophy, Star, Zap, Shield, Crown, Flame, Dumbbell, Medal } from "lucide-react"

export type AchievementType =
  | "workout_streak"
  | "workout_complete"
  | "challenge_win"
  | "nutrition_plan"
  | "personal_record"
  | "community_engagement"
  | "referral"

export type Achievement = {
  id: string
  name: string
  description: string
  type: AchievementType
  points: number
  icon: any
  criteria: string
  isSecret?: boolean
}

export type MembershipTier = {
  id: string
  name: string
  requiredPoints: number
  color: string
  icon: any
  benefits: string[]
  description: string
  exclusiveFeatures: string[]
  badgeUrl: string
}

export const achievements: Achievement[] = [
  {
    id: "ach-001",
    name: "First Blood",
    description: "Complete your first workout",
    type: "workout_complete",
    points: 10,
    icon: Dumbbell,
    criteria: "Complete 1 workout",
  },
  {
    id: "ach-002",
    name: "Consistency is Key",
    description: "Complete workouts for 7 consecutive days",
    type: "workout_streak",
    points: 50,
    icon: Flame,
    criteria: "Maintain a 7-day workout streak",
  },
  {
    id: "ach-003",
    name: "Team Player",
    description: "Contribute 500 points to your team",
    type: "challenge_win",
    points: 75,
    icon: Shield,
    criteria: "Earn 500 team contribution points",
  },
  {
    id: "ach-004",
    name: "Nutrition Master",
    description: "Follow your nutrition plan for 30 days",
    type: "nutrition_plan",
    points: 100,
    icon: Star,
    criteria: "Log all meals according to your plan for 30 days",
  },
  {
    id: "ach-005",
    name: "Challenge Dominator",
    description: "Win 5 challenges",
    type: "challenge_win",
    points: 150,
    icon: Trophy,
    criteria: "Win 5 fitness challenges",
  },
  {
    id: "ach-006",
    name: "Breaking Barriers",
    description: "Set 10 personal records",
    type: "personal_record",
    points: 100,
    icon: Zap,
    criteria: "Record 10 personal bests in any exercise",
  },
  {
    id: "ach-007",
    name: "Community Pillar",
    description: "Engage with the community for 30 days",
    type: "community_engagement",
    points: 75,
    icon: Medal,
    criteria: "Post, comment, or react in the community feed for 30 days",
  },
  {
    id: "ach-008",
    name: "Legendary Streak",
    description: "Complete workouts for 100 consecutive days",
    type: "workout_streak",
    points: 500,
    icon: Crown,
    criteria: "Maintain a 100-day workout streak",
    isSecret: true,
  },
]

export const membershipTiers: MembershipTier[] = [
  {
    id: "tier-1",
    name: "Rookie",
    requiredPoints: 0,
    color: "#6E7881", // Gray
    icon: Medal,
    benefits: [
      "Basic fitness tracking",
      "Community feed access",
      "Personal profile",
      "Avatar customization",
      "Profile photo upload",
    ],
    description: "Your fitness journey begins here. Prove your commitment to unlock more.",
    exclusiveFeatures: [],
    badgeUrl: "/placeholder.svg?height=100&width=100&text=Rookie",
  },
  {
    id: "tier-2",
    name: "Contender",
    requiredPoints: 100,
    color: "#CD7F32", // Bronze
    icon: Shield,
    benefits: [
      "All Rookie benefits",
      "Basic workout library",
      "Participate in weekly challenges",
      "Additional avatar accessories",
      "Limited access to recipes and meal plans",
    ],
    description: "You've shown dedication. Now push your limits with your fellow warriors.",
    exclusiveFeatures: ["Weekly Challenges", "Limited Recipe & Meal Plan Access", "Basic Workout Library"],
    badgeUrl: "/placeholder.svg?height=100&width=100&text=Contender",
  },
  {
    id: "tier-3",
    name: "Warrior",
    requiredPoints: 500,
    color: "#C0C0C0", // Silver
    icon: Dumbbell,
    benefits: [
      "All Contender benefits",
      "Create custom challenges",
      "Advanced nutrition planning",
      "Body Composition Scanner (basic metrics & analysis)",
      "Warrior avatar items",
      "Priority support",
      "Full access to recipes and meal plans",
      "Complete workout library",
    ],
    description: "Your dedication is undeniable. Lead others to greatness.",
    exclusiveFeatures: [
      "Custom Challenges",
      "Advanced Nutrition Tools",
      "Basic Body Composition Analysis",
      "Full Recipe & Meal Plan Access",
      "Complete Workout Library",
    ],
    badgeUrl: "/placeholder.svg?height=100&width=100&text=Warrior",
  },
  {
    id: "tier-4",
    name: "Legend",
    requiredPoints: 1000,
    color: "#FFD700", // Gold
    icon: Crown,
    benefits: [
      "All Warrior benefits",
      "Enhanced Body Composition Scanner (3D modeling, trend analysis, personalized recommendations)",
      "Exclusive legend avatar items",
      "Featured profile highlights",
      "Early access to new features",
      "Create global challenges",
      "Influence app development",
      "VIP community events",
    ],
    description: "Legendary status achieved. Your name echoes through the halls of fitness glory.",
    exclusiveFeatures: [
      "Featured Profile Status",
      "Premium Body Composition Analysis with 3D Modeling",
      "Global Challenges",
      "VIP Events",
    ],
    badgeUrl: "/placeholder.svg?height=100&width=100&text=Legend",
  },
]

export function getUserTier(points: number): MembershipTier {
  // Find the highest tier the user qualifies for
  for (let i = membershipTiers.length - 1; i >= 0; i--) {
    if (points >= membershipTiers[i].requiredPoints) {
      return membershipTiers[i]
    }
  }

  // Default to the first tier if something goes wrong
  return membershipTiers[0]
}

export function getNextTier(points: number): MembershipTier | null {
  const currentTier = getUserTier(points)
  const currentTierIndex = membershipTiers.findIndex((tier) => tier.id === currentTier.id)

  // If user is at the highest tier, there is no next tier
  if (currentTierIndex === membershipTiers.length - 1) {
    return null
  }

  return membershipTiers[currentTierIndex + 1]
}

export function getProgressToNextTier(points: number): number {
  const currentTier = getUserTier(points)
  const nextTier = getNextTier(points)

  if (!nextTier) {
    return 100 // Already at max tier
  }

  const pointsNeeded = nextTier.requiredPoints - currentTier.requiredPoints
  const pointsEarned = points - currentTier.requiredPoints

  return Math.min(100, Math.round((pointsEarned / pointsNeeded) * 100))
}

