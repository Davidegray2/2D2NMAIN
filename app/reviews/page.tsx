import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Facebook, Globe, MessageSquare, Star, ThumbsUp } from "lucide-react"

export default function ReviewsPage() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Premium Member",
      content:
        "2D2N has completely transformed my fitness journey. The personalized workout plans and nutrition guidance have helped me lose 20 pounds in just 3 months!",
      rating: 5,
      platform: "Google",
    },
    {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Elite Member",
      content:
        "The community aspect of 2D2N is what sets it apart. I've made great friends who keep me accountable and motivated. The trainers are top-notch and always available to answer questions.",
      rating: 5,
      platform: "Facebook",
    },
    {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Basic Member",
      content:
        "Even with the basic plan, I've gotten so much value from 2D2N. The workout library is extensive and the progress tracking features are incredibly helpful.",
      rating: 4,
      platform: "Yelp",
    },
    {
      name: "David Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Premium Member",
      content:
        "The live coaching sessions have been a game-changer for my fitness routine. Being able to get real-time feedback on my form has prevented injuries and improved my results.",
      rating: 5,
      platform: "Trustpilot",
    },
    {
      name: "Jessica Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Elite Member",
      content:
        "I've tried many fitness apps, but 2D2N offers the most comprehensive experience. The nutrition library and meal planning tools have helped me dial in my diet to support my training goals.",
      rating: 5,
      platform: "Google",
    },
    {
      name: "Thomas Wright",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Premium Member",
      content:
        "The rewards system keeps me motivated to hit the gym even on days when I'm not feeling it. I've earned enough points for free merchandise and even a free month of premium!",
      rating: 4,
      platform: "Facebook",
    },
  ]

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-2">Reviews & Testimonials</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        See what our members are saying about their experience with 2D2N Fitness Community.
      </p>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Leave a Review</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          We appreciate your feedback! If you've enjoyed your experience with 2D2N Fitness, please consider leaving a
          review on one of these platforms:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <a
            href="https://g.page/r/2d2n-fitness/review"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 border rounded-lg hover:bg-primary/10 transition-colors"
          >
            <div className="bg-primary/20 p-4 rounded-full mb-4">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Google</h3>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
          </a>

          <a
            href="https://www.facebook.com/2d2n/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 border rounded-lg hover:bg-primary/10 transition-colors"
          >
            <div className="bg-primary/20 p-4 rounded-full mb-4">
              <Facebook className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Facebook</h3>
            <div className="flex items-center">
              <ThumbsUp className="h-5 w-5 text-blue-500 mr-1" />
              <span>Recommend</span>
            </div>
          </a>

          <a
            href="https://www.yelp.com/biz/2d2n-fitness"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 border rounded-lg hover:bg-primary/10 transition-colors"
          >
            <div className="bg-primary/20 p-4 rounded-full mb-4">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Yelp</h3>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-red-500 fill-red-500" />
              ))}
            </div>
          </a>

          <a
            href="https://www.trustpilot.com/review/2d2n.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 border rounded-lg hover:bg-primary/10 transition-colors"
          >
            <div className="bg-primary/20 p-4 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Trustpilot</h3>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-green-500 fill-green-500" />
              ))}
            </div>
          </a>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-10">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Reviews</TabsTrigger>
          <TabsTrigger value="google">Google</TabsTrigger>
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
          <TabsTrigger value="yelp">Yelp</TabsTrigger>
          <TabsTrigger value="trustpilot">Trustpilot</TabsTrigger>
        </TabsList>

        {["all", "google", "facebook", "yelp", "trustpilot"].map((platform) => (
          <TabsContent key={platform} value={platform}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials
                .filter((t) => platform === "all" || t.platform.toLowerCase() === platform)
                .map((testimonial, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={testimonial.avatar} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{testimonial.name}</CardTitle>
                            <CardDescription>{testimonial.role}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{testimonial.content}</p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="text-xs text-muted-foreground">Via {testimonial.platform}</div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-primary/10 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Join Our Community Today</h2>
        <p className="mb-4 max-w-2xl mx-auto">
          Experience the benefits that thousands of members are raving about. Start your fitness journey with 2D2N
          today!
        </p>
        <Button size="lg" asChild>
          <a href="/premium">Get Started</a>
        </Button>
      </div>
    </div>
  )
}

