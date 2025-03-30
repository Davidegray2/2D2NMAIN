"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { AtSign, Building, MapPin, Phone, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the form data to your backend
    console.log("Form submitted:", formData)

    // Show success message
    setFormSubmitted(true)

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General Contact</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <p className="text-muted-foreground mb-6">
                Have questions about our fitness programs, membership options, or anything else? We're here to help!
                Fill out the form and our team will get back to you as soon as possible.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <AtSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:info@2d2n.com" className="text-primary hover:underline">
                      info@2d2n.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+18005552D2N" className="text-primary hover:underline">
                      1-800-555-2D2N
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      2ND2NONE Fitness HQ, 8721 Sunset Blvd, Los Angeles, CA 90069
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-muted-foreground">Monday - Friday: 6am - 10pm</p>
                    <p className="text-muted-foreground">Saturday - Sunday: 8am - 8pm</p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>We'll respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                {formSubmitted && (
                  <Alert className="mb-4 bg-green-500/10 border-green-500 text-green-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>Your message has been sent. We'll get back to you soon.</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required value={formData.name} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" required value={formData.subject} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmit} className="w-full">
                  Send Message
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "How do I cancel or change my membership?",
                answer:
                  "You can manage your membership from your account settings. If you need assistance, please contact our support team at info@2d2n.com.",
              },
              {
                question: "Can I freeze my membership temporarily?",
                answer:
                  "Yes, Premium members can freeze their membership for up to 3 months per year. This option is available in your account settings.",
              },
              {
                question: "How do I redeem my rewards?",
                answer:
                  "Visit the Rewards page to see your available points and redemption options. Select the reward you want to claim and follow the instructions.",
              },
              {
                question: "Is there a mobile app available?",
                answer:
                  "Yes, our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store.",
              },
              {
                question: "How do I track my workout progress?",
                answer:
                  "Your progress is automatically tracked in the Dashboard section. You can view detailed analytics, set goals, and monitor your improvements.",
              },
              {
                question: "Can I get a personalized workout plan?",
                answer:
                  "Yes, Premium and Elite members receive personalized workout plans based on their fitness goals, experience level, and available equipment.",
              },
              {
                question: "How do I connect with a personal trainer?",
                answer:
                  "Premium and Elite members can book sessions with our certified personal trainers through the Live Coaching section of the app.",
              },
              {
                question: "Where can I leave a review?",
                answer:
                  "We appreciate your feedback! You can leave a review on our Reviews page, which has links to our Google, Facebook, Yelp, and Trustpilot profiles.",
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-10 bg-primary/10 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Join Our Community</h2>
        <p className="mb-4 max-w-2xl mx-auto">
          Connect with other fitness enthusiasts, share your journey, and get inspired by following us on social media.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <a href="https://instagram.com/2d2n" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://facebook.com/2d2n" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://x.com/2d2n" target="_blank" rel="noopener noreferrer">
              X
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://youtube.com/2d2n" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

