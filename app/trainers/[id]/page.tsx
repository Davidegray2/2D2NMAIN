"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle, Clock, MessageSquare, Star, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function TrainerProfilePage({ params }) {
  const { id } = params
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [bookingType, setBookingType] = useState("virtual")
  const [bookingNotes, setBookingNotes] = useState("")
  const [bookingSubmitted, setBookingSubmitted] = useState(false)

  // Sample trainer data - in a real app, this would be fetched from an API
  const trainer = {
    id: id,
    name: id === "alex-johnson" ? "Alex Johnson" : "Sarah Williams",
    image: "/placeholder.svg?height=400&width=400",
    specialty: id === "alex-johnson" ? "Strength & Conditioning" : "Yoga & Flexibility",
    specialties:
      id === "alex-johnson" ? ["Powerlifting", "HIIT", "Nutrition"] : ["Vinyasa Yoga", "Meditation", "Recovery"],
    experience: id === "alex-johnson" ? "8 years" : "6 years",
    rating: id === "alex-johnson" ? 4.9 : 4.8,
    reviews: id === "alex-johnson" ? 127 : 93,
    availability: id === "alex-johnson" ? "Weekdays, Evenings" : "Mornings, Weekends",
    nextAvailable: id === "alex-johnson" ? "Today, 3:00 PM" : "Tomorrow, 10:00 AM",
    price: id === "alex-johnson" ? "$45" : "$40",
    featured: id === "alex-johnson",
    bio:
      id === "alex-johnson"
        ? "Former competitive powerlifter with a passion for helping clients build strength and confidence. Specializes in strength training, HIIT, and nutrition planning."
        : "Certified yoga instructor with a holistic approach to fitness. Focuses on flexibility, mindfulness, and helping clients achieve balance in their fitness journey.",
    certifications:
      id === "alex-johnson"
        ? ["NASM Certified Personal Trainer", "NSCA Strength & Conditioning Specialist", "Precision Nutrition Level 2"]
        : ["200-Hour Yoga Alliance Certification", "Meditation Instructor", "Corrective Exercise Specialist"],
    education:
      id === "alex-johnson"
        ? "B.S. in Exercise Science, University of California"
        : "B.A. in Health Sciences, New York University",
    approach:
      id === "alex-johnson"
        ? "I believe in a science-based approach to fitness that focuses on progressive overload, proper form, and sustainable nutrition. My training style is challenging but adaptable to all fitness levels."
        : "I take a holistic approach to wellness, focusing on the mind-body connection. My sessions blend physical practice with mindfulness techniques for overall wellbeing.",
    availableTimes: [
      { date: "Monday, March 11", times: ["7:00 AM", "8:00 AM", "5:00 PM", "6:00 PM", "7:00 PM"] },
      { date: "Tuesday, March 12", times: ["8:00 AM", "9:00 AM", "5:00 PM", "6:00 PM"] },
      { date: "Wednesday, March 13", times: ["7:00 AM", "8:00 AM", "9:00 AM", "5:00 PM", "6:00 PM"] },
      { date: "Thursday, March 14", times: ["8:00 AM", "5:00 PM", "6:00 PM", "7:00 PM"] },
      { date: "Friday, March 15", times: ["7:00 AM", "8:00 AM", "9:00 AM", "5:00 PM"] },
      { date: "Saturday, March 16", times: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"] },
    ],
  }

  // Sample client reviews
  const reviews = [
    {
      id: 1,
      name: "Michael P.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "February 15, 2023",
      comment:
        "Alex is an incredible trainer! He pushed me to achieve goals I never thought possible while making sure my form was always correct. Highly recommend!",
    },
    {
      id: 2,
      name: "Jennifer K.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "January 3, 2023",
      comment:
        "I've been working with Alex for 6 months and have seen amazing results. He tailors workouts to my specific needs and is always encouraging.",
    },
    {
      id: 3,
      name: "David R.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "December 10, 2022",
      comment:
        "Great knowledge of nutrition and strength training. Alex helped me prepare for my first powerlifting competition and I exceeded all my goals.",
    },
  ]

  // Sample training packages
  const packages = [
    {
      id: 1,
      name: "Single Session",
      price: trainer.price,
      description: "One-on-one training session tailored to your goals",
      features: ["Personalized workout", "Form correction", "Progress tracking"],
      popular: false,
    },
    {
      id: 2,
      name: "5-Session Package",
      price: `$${Number.parseInt(trainer.price.substring(1)) * 4.5}/session`,
      totalPrice: `$${Number.parseInt(trainer.price.substring(1)) * 4.5 * 5}`,
      description: "Save 10% when you book 5 sessions",
      features: [
        "Personalized workout plan",
        "Nutrition guidance",
        "Form correction",
        "Progress tracking",
        "Email support between sessions",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "10-Session Package",
      price: `$${Number.parseInt(trainer.price.substring(1)) * 4}/session`,
      totalPrice: `$${Number.parseInt(trainer.price.substring(1)) * 4 * 10}`,
      description: "Save 20% when you book 10 sessions",
      features: [
        "Comprehensive fitness assessment",
        "Customized workout program",
        "Detailed nutrition plan",
        "Form correction",
        "Progress tracking",
        "Priority scheduling",
        "Unlimited email support",
      ],
      popular: false,
    },
  ]

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log({
      trainerId: trainer.id,
      date: bookingDate,
      time: bookingTime,
      type: bookingType,
      notes: bookingNotes,
    })

    // Show success message
    setBookingSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setBookingSubmitted(false)
      setBookingDate("")
      setBookingTime("")
      setBookingType("virtual")
      setBookingNotes("")
    }, 5000)
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={trainer.image || "/placeholder.svg"}
                  alt={trainer.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{trainer.name}</h1>
                  <p className="text-muted-foreground mb-3">
                    {trainer.specialty} • {trainer.experience} experience
                  </p>
                </div>
                {trainer.featured && (
                  <Badge className="bg-primary">
                    <Star className="h-3 w-3 mr-1 fill-primary-foreground" /> FEATURED
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(trainer.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{trainer.rating}</span>
                <span className="text-sm text-muted-foreground">({trainer.reviews} reviews)</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {trainer.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="font-normal">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <p className="mb-4">{trainer.bio}</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1">Book a Session</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    {bookingSubmitted ? (
                      <div className="py-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <DialogTitle className="text-xl mb-2">Booking Request Sent!</DialogTitle>
                        <DialogDescription>
                          Your request has been sent to {trainer.name}. You'll receive a confirmation once they accept
                          your booking.
                        </DialogDescription>
                      </div>
                    ) : (
                      <>
                        <DialogHeader>
                          <DialogTitle>Book a Session with {trainer.name}</DialogTitle>
                          <DialogDescription>
                            Select your preferred date, time and session type to book with {trainer.name}.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleBookingSubmit}>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="date">Select Date</Label>
                              <Select value={bookingDate} onValueChange={setBookingDate} required>
                                <SelectTrigger id="date">
                                  <SelectValue placeholder="Select a date" />
                                </SelectTrigger>
                                <SelectContent>
                                  {trainer.availableTimes.map((slot) => (
                                    <SelectItem key={slot.date} value={slot.date}>
                                      {slot.date}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="time">Select Time</Label>
                              <Select
                                value={bookingTime}
                                onValueChange={setBookingTime}
                                disabled={!bookingDate}
                                required
                              >
                                <SelectTrigger id="time">
                                  <SelectValue placeholder="Select a time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {bookingDate &&
                                    trainer.availableTimes
                                      .find((slot) => slot.date === bookingDate)
                                      ?.times.map((time) => (
                                        <SelectItem key={time} value={time}>
                                          {time}
                                        </SelectItem>
                                      ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid gap-2">
                              <Label>Session Type</Label>
                              <RadioGroup value={bookingType} onValueChange={setBookingType} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="virtual" id="virtual" />
                                  <Label htmlFor="virtual" className="cursor-pointer">
                                    Virtual
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="in-person" id="in-person" />
                                  <Label htmlFor="in-person" className="cursor-pointer">
                                    In-Person
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="notes">Additional Notes</Label>
                              <Textarea
                                id="notes"
                                placeholder="Tell the trainer about your goals or any specific needs"
                                value={bookingNotes}
                                onChange={(e) => setBookingNotes(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Request Booking</Button>
                          </DialogFooter>
                        </form>
                      </>
                    )}
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="flex-1" asChild>
                  <Link href={`/messages?trainer=${trainer.id}`}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="about">
            <TabsList className="mb-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="packages">Training Packages</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Training Approach</h3>
                <p>{trainer.approach}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Certifications</h3>
                <ul className="space-y-2">
                  {trainer.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Education</h3>
                <p>{trainer.education}</p>
              </div>
            </TabsContent>

            <TabsContent value="packages">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <Card key={pkg.id} className={`overflow-hidden ${pkg.popular ? "border-primary" : ""}`}>
                    {pkg.popular && (
                      <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{pkg.name}</CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <span className="text-2xl font-bold">{pkg.price}</span>
                        {pkg.totalPrice && (
                          <span className="text-sm text-muted-foreground ml-1">(Total: {pkg.totalPrice})</span>
                        )}
                      </div>

                      <ul className="space-y-2">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">Select Package</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          {bookingSubmitted ? (
                            <div className="py-6 text-center">
                              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                              </div>
                              <DialogTitle className="text-xl mb-2">Package Selected!</DialogTitle>
                              <DialogDescription>
                                Your {pkg.name} package with {trainer.name} has been selected. Please choose a date and
                                time for your first session.
                              </DialogDescription>
                            </div>
                          ) : (
                            <>
                              <DialogHeader>
                                <DialogTitle>
                                  Book {pkg.name} with {trainer.name}
                                </DialogTitle>
                                <DialogDescription>
                                  Select your preferred date and time to start your training package.
                                </DialogDescription>
                              </DialogHeader>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault()
                                  console.log({
                                    trainerId: trainer.id,
                                    packageId: pkg.id,
                                    packageName: pkg.name,
                                    date: bookingDate,
                                    time: bookingTime,
                                    type: bookingType,
                                    notes: bookingNotes,
                                  })
                                  setBookingSubmitted(true)
                                  setTimeout(() => {
                                    setBookingSubmitted(false)
                                    setBookingDate("")
                                    setBookingTime("")
                                    setBookingType("virtual")
                                    setBookingNotes("")
                                  }, 5000)
                                }}
                              >
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor={`date-select-pkg-${pkg.id}`}>Select Date</Label>
                                    <Select value={bookingDate} onValueChange={setBookingDate} required>
                                      <SelectTrigger id={`date-select-pkg-${pkg.id}`}>
                                        <SelectValue placeholder="Select a date" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {trainer.availableTimes.map((slot) => (
                                          <SelectItem key={`pkg-${pkg.id}-${slot.date}`} value={slot.date}>
                                            {slot.date}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="grid gap-2">
                                    <Label htmlFor={`time-select-pkg-${pkg.id}`}>Select Time</Label>
                                    <Select
                                      value={bookingTime}
                                      onValueChange={setBookingTime}
                                      disabled={!bookingDate}
                                      required
                                    >
                                      <SelectTrigger id={`time-select-pkg-${pkg.id}`}>
                                        <SelectValue placeholder="Select a time" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {bookingDate &&
                                          trainer.availableTimes
                                            .find((slot) => slot.date === bookingDate)
                                            ?.times.map((time) => (
                                              <SelectItem key={`pkg-${pkg.id}-${time}`} value={time}>
                                                {time}
                                              </SelectItem>
                                            ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="grid gap-2">
                                    <Label>Session Type</Label>
                                    <RadioGroup
                                      value={bookingType}
                                      onValueChange={setBookingType}
                                      className="flex gap-4"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="virtual" id={`virtual-pkg-${pkg.id}`} />
                                        <Label htmlFor={`virtual-pkg-${pkg.id}`} className="cursor-pointer">
                                          Virtual
                                        </Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="in-person" id={`in-person-pkg-${pkg.id}`} />
                                        <Label htmlFor={`in-person-pkg-${pkg.id}`} className="cursor-pointer">
                                          In-Person
                                        </Label>
                                      </div>
                                    </RadioGroup>
                                  </div>

                                  <div className="grid gap-2">
                                    <Label htmlFor={`notes-pkg-${pkg.id}`}>Additional Notes</Label>
                                    <Textarea
                                      id={`notes-pkg-${pkg.id}`}
                                      placeholder="Tell the trainer about your goals or any specific needs"
                                      value={bookingNotes}
                                      onChange={(e) => setBookingNotes(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Book Package</Button>
                                </DialogFooter>
                              </form>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="schedule">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">Availability</h3>
                  <p className="mb-4">
                    {trainer.name} is generally available during {trainer.availability.toLowerCase()}. Select a date
                    below to see specific available time slots.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trainer.availableTimes.map((slot) => (
                    <Card key={slot.date}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{slot.date}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {slot.times.map((time) => (
                            <Badge key={time} variant="outline" className="cursor-pointer hover:bg-primary/10">
                              <Clock className="h-3 w-3 mr-1" />
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-bold">{trainer.rating}</div>
                  <div>
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(trainer.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{trainer.reviews} reviews</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={review.avatar} alt={review.name} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.name}</div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Book a Session</CardTitle>
              <CardDescription>Schedule a training session with {trainer.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Next available: {trainer.nextAvailable}</span>
              </div>

              <div className="text-lg font-bold mb-2">{trainer.price} per session</div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-normal">
                    <Video className="h-3 w-3 mr-1" />
                    Virtual Sessions
                  </Badge>

                  <Badge variant="outline" className="font-normal">
                    In-Person Training
                  </Badge>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Check Availability</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  {bookingSubmitted ? (
                    <div className="py-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <DialogTitle className="text-xl mb-2">Booking Request Sent!</DialogTitle>
                      <DialogDescription>
                        Your request has been sent to {trainer.name}. You'll receive a confirmation once they accept
                        your booking.
                      </DialogDescription>
                    </div>
                  ) : (
                    <>
                      <DialogHeader>
                        <DialogTitle>Book a Session with {trainer.name}</DialogTitle>
                        <DialogDescription>
                          Select your preferred date, time and session type to book with {trainer.name}.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleBookingSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="date-select">Select Date</Label>
                            <Select value={bookingDate} onValueChange={setBookingDate} required>
                              <SelectTrigger id="date-select">
                                <SelectValue placeholder="Select a date" />
                              </SelectTrigger>
                              <SelectContent>
                                {trainer.availableTimes.map((slot) => (
                                  <SelectItem key={slot.date} value={slot.date}>
                                    {slot.date}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="time-select">Select Time</Label>
                            <Select value={bookingTime} onValueChange={setBookingTime} disabled={!bookingDate} required>
                              <SelectTrigger id="time-select">
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                              <SelectContent>
                                {bookingDate &&
                                  trainer.availableTimes
                                    .find((slot) => slot.date === bookingDate)
                                    ?.times.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid gap-2">
                            <Label>Session Type</Label>
                            <RadioGroup value={bookingType} onValueChange={setBookingType} className="flex gap-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="virtual" id="virtual-session" />
                                <Label htmlFor="virtual-session" className="cursor-pointer">
                                  Virtual
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="in-person" id="in-person-session" />
                                <Label htmlFor="in-person-session" className="cursor-pointer">
                                  In-Person
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="booking-notes">Additional Notes</Label>
                            <Textarea
                              id="booking-notes"
                              placeholder="Tell the trainer about your goals or any specific needs"
                              value={bookingNotes}
                              onChange={(e) => setBookingNotes(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Request Booking</Button>
                        </DialogFooter>
                      </form>
                    </>
                  )}
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full" asChild>
                <Link href={`/messages?trainer=${trainer.id}`}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

