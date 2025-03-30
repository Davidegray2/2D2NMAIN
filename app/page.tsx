import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dumbbell,
  Users,
  Trophy,
  ArrowRight,
  Flame,
  Zap,
  Star,
  Crown,
  Camera,
  Watch,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-gradient hero-pattern py-20 px-6 ">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-block mb-6 p-3 bg-white/10 rounded-full animate-pulse-glow">
              <Dumbbell className="h-12 w-12 " />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              2ND2NONE
            </h2>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
              ELEVATE YOUR <span className="text-secondary dark:text-shadow">FITNESS</span> JOURNEY
            </h1>
            <p className="text-xl max-w-2xl mb-8 leading-relaxed">
              The Ultimate Fitness Community Platform to track your progress, connect with others, and achieve your
              fitness goals.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary button-hover-slide"
              >
                <Link href="/membership-selection" className="gap-2">
                  Get Started <Zap className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 hover:bg-white/20">
                <Link href="/membership-selection" className="gap-2">
                  Explore Membership Plans <Star className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 gradient-text">UNLEASH YOUR POTENTIAL</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform your fitness journey in one powerful platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border border-border/40 bg-card/50 backdrop-blur-sm card-hover-effect">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Dumbbell className="h-7 w-7 text-primary" />
              </div>
              <div>
                <CardTitle>Personalized Workouts</CardTitle>
                <CardDescription>Tailored to your fitness level and goals</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              Access hundreds of workout plans designed by professional trainers. Track your progress and see real
              results with our advanced analytics and performance tracking.
            </CardContent>
          </Card>
          <Card className="border border-border/40 bg-card/50 backdrop-blur-sm card-hover-effect">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <div>
                <CardTitle>Community Support</CardTitle>
                <CardDescription>Connect with like-minded fitness enthusiasts</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              Join challenges, share your journey, and get motivated by others in our supportive community. Build your
              fitness network and stay accountable.
            </CardContent>
          </Card>
          <Card className="border border-border/40 bg-card/50 backdrop-blur-sm card-hover-effect">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-7 w-7 text-primary" />
              </div>
              <div>
                <CardTitle>Rewards & Achievements</CardTitle>
                <CardDescription>Earn rewards for your hard work</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              Unlock achievements, earn points, and redeem exclusive rewards as you reach your fitness milestones.
              Celebrate your progress every step of the way.
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile App Section */}
      <div className="fitness-bg-pattern py-20">
        <div className="container">
          <div className="rounded-xl overflow-hidden relative h-[450px] border border-border/40">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 flex items-center p-10">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold mb-4">Download Our Mobile App</h2>
                <p className="mb-8 text-lg">
                  Take your fitness journey on the go with our mobile app. Track workouts, connect with the community,
                  and access premium content anytime, anywhere.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="lg" className="gap-2 button-hover-slide">
                    iOS Coming Soon...
                  </Button>
                  <Button variant="secondary" size="lg" className="gap-2 button-hover-slide">
                    Android Coming Soon...
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features Section */}
      <div className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 gradient-text">PREMIUM FEATURES</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take your fitness to the next level with our exclusive premium features
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border border-border/40 bg-card/50 backdrop-blur-sm card-hover-effect overflow-hidden">
            <div className="absolute top-0 right-0">
              <div className="bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-bl-lg">
                POPULAR
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-primary" />
                <CardTitle>Workout Battles</CardTitle>
              </div>
              <CardDescription>Challenge friends and strangers to fitness competitions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Take your workouts to the next level with our unique Workout Battles feature. Challenge others, compete
                in real-time, and climb the global leaderboards.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/workout-battles">Explore Battles</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border border-border/40 bg-card/50 backdrop-blur-sm card-hover-effect overflow-hidden">
            <div className="absolute top-0 right-0">
              <div className="bg-amber-500  text-xs font-bold py-1 px-3 rounded-bl-lg">ELITE</div>
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-amber-500" />
                <CardTitle>Legend Membership</CardTitle>
              </div>
              <CardDescription>Unlock premium features and exclusive content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Join our Legend Membership for access to advanced training programs, nutrition plans, live coaching
                sessions, and much more.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-amber-500" />
                  <span>Enhanced Body Composition Scanner</span>
                </div>
                <div className="flex items-center gap-2">
                  <Watch className="h-4 w-4 text-amber-500" />
                  <span>Premium Wearable Device Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-amber-500" />
                  <span>Elite AI Fitness Assistant</span>
                </div>
              </div>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 "
              >
                <Link href="/membership-selection">View Membership Plans</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 gradient-text">READY TO TRANSFORM YOUR FITNESS?</h2>
            <Button
              asChild
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary button-hover-slide"
            >
              <Link href="/membership-selection">
                Explore Membership Plans <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

