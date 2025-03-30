import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { BrandName } from "@/components/brand-name"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-bold mb-6">
          About <BrandName />
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Discover our journey, mission, and the team behind the movement that's transforming fitness.
        </p>
      </header>

      <Tabs defaultValue="story" className="w-full">
        <TabsList className="grid grid-cols-4 mb-12 w-full max-w-3xl mx-auto">
          <TabsTrigger value="story">Our Story</TabsTrigger>
          <TabsTrigger value="mission">Our Mission</TabsTrigger>
          <TabsTrigger value="team">Our Team</TabsTrigger>
          <TabsTrigger value="values">Our Values</TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="story" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg">
                  <BrandName /> was born out of the grind. The early mornings, the late nights, the reps that no one
                  saw, and the sacrifices that no one talked about. It started as a personal mission: a desire to
                  transform, not just physically, but mentally. What began with a pair of dumbbells and relentless drive
                  evolved into a movement.
                </p>
                <p className="text-lg">
                  <BrandName /> isn't just a name. It's a mindset. It's about being better than your excuses, better
                  than yesterday, and never settling for second place in anything you do. This is where fitness meets
                  purpose, and transformation becomes a lifestyle.
                </p>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image src="/placeholder.svg?height=600&width=800" alt="Our journey" fill className="object-cover" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mission" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
                <Image src="/placeholder.svg?height=600&width=800" alt="Our mission" fill className="object-cover" />
              </div>
              <div className="space-y-6 order-1 md:order-2">
                <p className="text-2xl font-semibold">
                  To empower everyday warriors and legends to become their strongest, most confident selves physically,
                  mentally, and emotionally.
                </p>
                <p className="text-lg">
                  We deliver personalized fitness programs, real-time coaching, nutrition guidance, and a community
                  built to elevate. Whether you're looking to shred fat, build muscle, or simply take back control of
                  your health, <BrandName /> gives you the tools and motivation to dominate your goals.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg">We're more than coaches, we're motivators, creators, and innovators.</p>
                <p className="text-lg">
                  Led by David Gray, a man on a mission to rewrite the rules of fitness, our team includes certified
                  trainers, wellness experts, tech engineers, and a growing crew of die-hard fitness junkies who live
                  and breathe results. We don't just talk the talk - we train, test, and live every program we deliver.
                </p>
                <p className="text-lg">
                  You'll find us in the trenches testing workouts, refining recipes, building tech, and pushing
                  boundaries to make sure <BrandName /> stays ahead of the game. We're obsessed with one thing: YOUR
                  progress.
                </p>
              </div>

              <div className="bg-gray-100 rounded-xl p-8 text-center shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Trainer Recruitment Coming Soon</h3>
                <p className="text-lg mb-8">
                  We'll be recruiting passionate, certified trainers once the app goes live. Join our team of fitness
                  professionals dedicated to helping others achieve their goals.
                </p>
                <div className="flex justify-center mb-6">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="David Gray, Founder"
                    width={200}
                    height={200}
                    className="rounded-full object-cover border-4 border-blue-400"
                  />
                </div>
                <p className="font-bold text-xl">David Gray</p>
                <p className="text-gray-600">Founder & Lead Trainer</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="values" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-white to-blue-400 flex items-center justify-center text-black font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Relentless Progress</h3>
                  <p className="text-lg">We never stop improving—because you never stop evolving.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-white to-blue-400 flex items-center justify-center text-black font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Authenticity Over Hype</h3>
                  <p className="text-lg">No gimmicks. No BS. Just real people chasing real results.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-white to-blue-400 flex items-center justify-center text-black font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Community Over Competition</h3>
                  <p className="text-lg">We rise together. We push each other. Iron sharpens iron.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-white to-blue-400 flex items-center justify-center text-black font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Discipline Is Freedom</h3>
                  <p className="text-lg">Success isn't luck—it's reps, grind, sweat, and consistency.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start md:col-span-2 max-w-2xl mx-auto">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-white to-blue-400 flex items-center justify-center text-black font-bold text-xl">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    <BrandName /> Means First In Everything
                  </h3>
                  <p className="text-lg">Our name is our promise. We never settle for less. Neither should you.</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <Link href="/membership-selection">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-white to-blue-400 text-black hover:from-white hover:to-blue-500 px-8 py-6 text-lg"
                >
                  Join The Movement
                </Button>
              </Link>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

