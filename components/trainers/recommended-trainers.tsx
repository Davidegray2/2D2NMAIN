import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function RecommendedTrainers() {
  // Sample trainers data - in a real app, this would be fetched based on user preferences
  const recommendedTrainers = [
    {
      id: "alex-johnson",
      name: "Alex Johnson",
      image: "/placeholder.svg?height=200&width=200",
      specialty: "Strength & Conditioning",
      rating: 4.9,
      reviews: 127,
    },
    {
      id: "sarah-williams",
      name: "Sarah Williams",
      image: "/placeholder.svg?height=200&width=200",
      specialty: "Yoga & Flexibility",
      rating: 4.8,
      reviews: 93,
    },
    {
      id: "mike-chen",
      name: "Mike Chen",
      image: "/placeholder.svg?height=200&width=200",
      specialty: "Sports Performance",
      rating: 4.7,
      reviews: 156,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Trainers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedTrainers.map((trainer) => (
            <div key={trainer.id} className="flex flex-col items-center text-center">
              <div className="relative mb-2">
                <img
                  src={trainer.image || "/placeholder.svg"}
                  alt={trainer.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <Badge className="absolute -bottom-2 -right-2 text-xs">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400" />
                  {trainer.rating}
                </Badge>
              </div>
              <h4 className="font-medium">{trainer.name}</h4>
              <p className="text-xs text-muted-foreground mb-2">{trainer.specialty}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/trainers">View All Trainers</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

