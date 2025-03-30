"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Check,
  Crown,
  Shield,
  Trophy,
  Medal,
  X,
  Camera,
  Clock,
  Users,
  Video,
  Activity,
  Award,
  Dumbbell,
} from "lucide-react"

export default function SubscriptionSelectPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  const tiers = [
    {
      id: "rookie",
      name: "Rookie",
      price: "Free",
      description: "Essential features for beginners",
      icon: <Medal className="h-5 w-5" />,
      color: "bg-slate-500",
      headerColor: "bg-slate-500",
      features: ["Community forum access", "Basic progress tracking", "Standard workout library", "Email support"],
      notIncluded: [
        "Access to one-on-one coaching (pay per session)",
        "Advanced workout library",
        "Personalized workout plans",
        "Nutrition meal planning",
        "Body composition scanner",
        "Voice-guided workouts",
        "Progress analytics",
        "Priority support",
        "Free coaching sessions",
      ],
      coaching: null,
    },
    {
      id: "contender",
      name: "Contender",
      price: "$9.99",
      description: "Great for fitness enthusiasts",
      icon: <Shield className="h-5 w-5" />,
      color: "bg-blue-500",
      headerColor: "bg-blue-500",
      features: [
        "Everything in Rookie",
        "Advanced workout library",
        "Basic nutrition guides",
        "Weekly challenges",
        "Basic progress analytics",
        "Chat support",
      ],
      notIncluded: [
        "Personalized workout plans",
        "Body composition scanner",
        "Voice-guided workouts",
        "Advanced progress analytics",
        "Priority support",
      ],
      coaching: {
        sessions: 1,
        color: "bg-blue-50 dark:bg-blue-950/30",
        borderColor: "border-blue-100 dark:border-blue-900",
        textColor: "text-blue-600 dark:text-blue-400",
        detailColor: "text-blue-700 dark:text-blue-300",
        noteColor: "text-blue-600/70 dark:text-blue-400/70",
      },
    },
    {
      id: "warrior",
      name: "Warrior",
      price: "$19.99",
      description: "Advanced features for serious athletes",
      icon: <Trophy className="h-5 w-5" />,
      color: "bg-purple-500",
      headerColor: "bg-purple-500",
      features: [
        "Everything in Contender",
        "Personalized workout plans",
        {
          text: "Body composition scanner",
          icon: <Camera className="h-3 w-3" />,
          highlight: "text-purple-500",
        },
        "Nutrition meal planning",
        "Voice-guided workouts",
        "Advanced progress analytics",
        "Priority support",
        "Monthly fitness assessment",
      ],
      notIncluded: ["VIP leaderboard access", "Exclusive premium content"],
      coaching: {
        sessions: 3,
        color: "bg-purple-50 dark:bg-purple-950/30",
        borderColor: "border-purple-100 dark:border-purple-900",
        textColor: "text-purple-600 dark:text-purple-400",
        detailColor: "text-purple-700 dark:text-purple-300",
        noteColor: "text-purple-600/70 dark:text-purple-400/70",
      },
      popular: true,
    },
    {
      id: "legend",
      name: "Legend",
      price: "$39.99",
      description: "Premium features for maximum results",
      icon: <Crown className="h-5 w-5" />,
      color: "bg-gradient-to-r from-yellow-400 to-amber-600",
      headerColor: "bg-gradient-to-r from-yellow-400 to-amber-600",
      features: [
        "Everything in Warrior",
        {
          text: "Enhanced body composition scanner",
          icon: <Camera className="h-3 w-3" />,
          highlight: "text-amber-500",
        },
        "Live coaching sessions",
        "VIP leaderboard access",
        "Exclusive premium content",
        "AI-powered recommendations",
        "24/7 dedicated support",
        "Early access to new features",
      ],
      notIncluded: [],
      coaching: {
        sessions: 4,
        color: "bg-amber-50 dark:bg-amber-950/30",
        borderColor: "border-amber-100 dark:border-amber-900",
        textColor: "text-amber-600 dark:text-amber-400",
        detailColor: "text-amber-700 dark:text-amber-300",
        noteColor: "text-amber-600/70 dark:text-amber-400/70",
      },
      ultimate: true,
    },
  ]

  return (
    <div className="container py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Choose Your Membership Plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the perfect membership plan to take your fitness journey to the next level with 2ND2NONE.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={`flex flex-col relative overflow-hidden cursor-pointer transition-all ${
              selectedTier === tier.id
                ? "border-primary ring-2 ring-primary ring-opacity-50"
                : "hover:border-primary/50"
            } ${tier.popular ? "border-primary shadow-md scale-[1.02] z-10" : ""}`}
            onClick={() => setSelectedTier(tier.id)}
          >
            <div className={`absolute top-0 left-0 w-full h-1 ${tier.headerColor}`}></div>

            {tier.popular && (
              <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full w-fit absolute top-3 left-3">
                MOST POPULAR
              </div>
            )}

            {tier.ultimate && (
              <div
                className={`${tier.color} text-primary-foreground text-xs font-medium px-2 py-1 rounded-full w-fit absolute top-3 left-3`}
              >
                ULTIMATE
              </div>
            )}

            {selectedTier === tier.id && (
              <div className="absolute top-3 right-3 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            )}

            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className={`${tier.color} text-white p-2 rounded-full`}>{tier.icon}</div>
                <CardTitle>{tier.name}</CardTitle>
              </div>
              <CardDescription>{tier.description}</CardDescription>
              <div className="text-3xl font-bold mt-2">
                {tier.price}
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-2">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check
                      className={`h-4 w-4 ${typeof feature === "string" ? tier.color.replace("bg-", "text-") : ""} flex-shrink-0`}
                    />
                    {typeof feature === "string" ? (
                      <span>{feature}</span>
                    ) : (
                      <span className={`flex items-center gap-1 font-medium ${feature.highlight}`}>
                        {feature.text} {feature.icon}
                      </span>
                    )}
                  </li>
                ))}

                {tier.coaching && (
                  <li
                    className={`flex items-center gap-2 ${tier.coaching.color} p-2 rounded-md border ${tier.coaching.borderColor}`}
                  >
                    <Check className={`h-4 w-4 ${tier.color.replace("bg-", "text-")} flex-shrink-0`} />
                    <div className="flex flex-col">
                      <span className={`font-medium ${tier.coaching.textColor}`}>One-on-One Coaching</span>
                      <span className={`text-sm ${tier.coaching.detailColor} flex items-center gap-1`}>
                        <Clock className="h-3 w-3" /> {tier.coaching.sessions} free 45-min{" "}
                        {tier.coaching.sessions === 1 ? "session" : "sessions"} per month
                      </span>
                      <span className={`text-xs ${tier.coaching.noteColor}`}>
                        Additional sessions at trainer's hourly rate
                      </span>
                    </div>
                  </li>
                )}

                {tier.notIncluded.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <X className="h-4 w-4 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-4">
              <Link
                href={`/register?plan=${tier.id}`}
                className={`w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${tier.color} hover:opacity-90 text-white h-10 px-4 py-2`}
              >
                {tier.id === "rookie" ? "Get Started" : tier.id === "legend" ? "Become a Legend" : "Subscribe Now"}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
        <Card className="border border-muted/60">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Personalized Training</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Get customized workout plans tailored to your fitness level, goals, and available equipment.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-muted/60">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Camera className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Body Composition Scanner</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Track your body composition changes over time with our advanced AI-powered scanner technology.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-muted/60">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Community Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Participate in weekly challenges and compete with other members to stay motivated and win rewards.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-muted/60">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Video className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">One-on-One Coaching</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Get personalized guidance from professional trainers with free sessions included in premium plans.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-muted/60">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Advanced Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Visualize your fitness journey with detailed progress tracking, performance metrics, and insights.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-muted/60">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Award className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Rewards Program</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Earn points for completing workouts, logging meals, and referring friends to redeem exclusive rewards.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Start Your Free Trial Today</h2>
        <p className="mb-6 max-w-2xl mx-auto text-muted-foreground">
          Try any premium plan free for 7 days before committing. No credit card required.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {selectedTier ? (
            <Link
              href={`/register?plan=${selectedTier}`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-8 py-2"
            >
              Continue with Selected Plan
            </Link>
          ) : (
            <Button size="lg" className="bg-primary hover:bg-primary/90" disabled>
              Select a plan to continue
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

