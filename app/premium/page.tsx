import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Check,
  X,
  Camera,
  Dumbbell,
  Users,
  Video,
  Activity,
  Award,
  Crown,
  Medal,
  Shield,
  Trophy,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function PremiumPage() {
  return (
    <div className="container py-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">2ND2NONE Membership Plans</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect membership plan to take your fitness journey to the next level with 2ND2NONE.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        {/* ROOKIE PLAN */}
        <Card className="flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-slate-500 text-white p-2 rounded-full">
                <Medal className="h-5 w-5" />
              </div>
              <CardTitle>Rookie</CardTitle>
            </div>
            <CardDescription>Essential features for beginners</CardDescription>
            <div className="text-3xl font-bold mt-2">
              Free<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              {["Community forum access", "Basic progress tracking", "Standard workout library", "Email support"].map(
                (feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-slate-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ),
              )}
              <li className="flex items-center gap-2 text-muted-foreground">
                <X className="h-4 w-4 flex-shrink-0" />
                <span>Access to one-on-one coaching (pay per session)</span>
              </li>
              {[
                "Advanced workout library",
                "Personalized workout plans",
                "Nutrition meal planning",
                "Body composition scanner",
                "Voice-guided workouts",
                "Progress analytics",
                "Priority support",
                "Free coaching sessions",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                  <X className="h-4 w-4 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="pt-4">
            <Button className="w-full bg-slate-500 hover:bg-slate-600 text-white" asChild>
              <Link href="/subscription/select?tier=rookie">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* CONTENDER PLAN */}
        <Card className="flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-500 text-white p-2 rounded-full">
                <Shield className="h-5 w-5" />
              </div>
              <CardTitle>Contender</CardTitle>
            </div>
            <CardDescription>Great for fitness enthusiasts</CardDescription>
            <div className="text-3xl font-bold mt-2">
              $9.99<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              {[
                "Everything in Rookie",
                "Advanced workout library",
                "Basic nutrition guides",
                "Weekly challenges",
                "Basic progress analytics",
                "Chat support",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              <li className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 p-2 rounded-md border border-blue-100 dark:border-blue-900">
                <Check className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-medium text-blue-600 dark:text-blue-400">One-on-One Coaching</span>
                  <span className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 1 free 45-min session per month
                  </span>
                  <span className="text-xs text-blue-600/70 dark:text-blue-400/70">
                    Additional sessions at trainer's hourly rate
                  </span>
                </div>
              </li>
              {[
                "Personalized workout plans",
                "Body composition scanner",
                "Voice-guided workouts",
                "Advanced progress analytics",
                "Priority support",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                  <X className="h-4 w-4 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="pt-4">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" asChild>
              <Link href="/subscription/select?tier=contender">Subscribe Now</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* WARRIOR PLAN */}
        <Card className="flex flex-col relative overflow-hidden border-primary shadow-md scale-[1.02] z-10">
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
          <CardHeader>
            <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full w-fit mb-2">
              MOST POPULAR
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-purple-500 text-white p-2 rounded-full">
                <Trophy className="h-5 w-5" />
              </div>
              <CardTitle>Warrior</CardTitle>
            </div>
            <CardDescription>Advanced features for serious athletes</CardDescription>
            <div className="text-3xl font-bold mt-2">
              $19.99<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              {[
                "Everything in Contender",
                "Personalized workout plans",
                <span key="body-scanner" className="flex items-center gap-1 font-medium text-purple-500">
                  Body composition scanner <Camera className="h-3 w-3" />
                </span>,
                "Nutrition meal planning",
                "Voice-guided workouts",
                "Advanced progress analytics",
                "Priority support",
                "Monthly fitness assessment",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  {typeof feature === "string" ? <span>{feature}</span> : feature}
                </li>
              ))}
              <li className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950/30 p-2 rounded-md border border-purple-100 dark:border-purple-900">
                <Check className="h-4 w-4 text-purple-500 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-medium text-purple-600 dark:text-purple-400">One-on-One Coaching</span>
                  <span className="text-sm text-purple-700 dark:text-purple-300 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 3 free 45-min sessions per month
                  </span>
                  <span className="text-xs text-purple-600/70 dark:text-purple-400/70">
                    Additional sessions at trainer's hourly rate
                  </span>
                </div>
              </li>
              {["VIP leaderboard access", "Exclusive premium content"].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                  <X className="h-4 w-4 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="pt-4">
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white" asChild>
              <Link href="/subscription/select?tier=warrior">Subscribe Now</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* LEGEND PLAN */}
        <Card className="flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-600"></div>
          <CardHeader>
            <div className="bg-gradient-to-r from-yellow-400 to-amber-600 text-primary-foreground text-xs font-medium px-2 py-1 rounded-full w-fit mb-2">
              ULTIMATE
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gradient-to-r from-yellow-400 to-amber-600 text-white p-2 rounded-full">
                <Crown className="h-5 w-5" />
              </div>
              <CardTitle>Legend</CardTitle>
            </div>
            <CardDescription>Premium features for maximum results</CardDescription>
            <div className="text-3xl font-bold mt-2">
              $39.99<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              {[
                "Everything in Warrior",
                <span key="enhanced-scanner" className="flex items-center gap-1 font-medium text-amber-500">
                  Enhanced body composition scanner <Camera className="h-3 w-3" />
                </span>,
                "Live coaching sessions",
                "VIP leaderboard access",
                "Exclusive premium content",
                "AI-powered recommendations",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  {typeof feature === "string" ? <span>{feature}</span> : feature}
                </li>
              ))}
              <li className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-md border border-amber-100 dark:border-amber-900">
                <Check className="h-4 w-4 text-amber-500 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-medium text-amber-600 dark:text-amber-400">One-on-One Coaching</span>
                  <span className="text-sm text-amber-700 dark:text-amber-300 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 4 free 45-min sessions per month
                  </span>
                  <span className="text-xs text-amber-600/70 dark:text-amber-400/70">
                    Additional sessions at trainer's hourly rate
                  </span>
                </div>
              </li>
              {["24/7 dedicated support", "Early access to new features"].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="pt-4">
            <Button
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-white"
              asChild
            >
              <Link href="/subscription/select?tier=legend">Become a Legend</Link>
            </Button>
          </CardFooter>
        </Card>
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
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/subscription/select">Start Free Trial</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

