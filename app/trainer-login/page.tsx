"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dumbbell, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function TrainerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // In a real application, this would be an API call to authenticate
      // For demo purposes, we'll simulate authentication with hardcoded credentials

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock trainer accounts for demo
      const trainers = [
        { email: "alex@2d2n.com", password: "trainer123", name: "Alex Johnson", id: "trainer1" },
        { email: "sarah@2d2n.com", password: "trainer123", name: "Sarah Williams", id: "trainer2" },
        { email: "mike@2d2n.com", password: "trainer123", name: "Mike Chen", id: "trainer3" },
      ]

      const trainer = trainers.find((t) => t.email === email && t.password === password)

      if (trainer) {
        // In a real app, you would set a cookie or token here
        // For demo, we'll use localStorage
        localStorage.setItem(
          "trainerAuth",
          JSON.stringify({
            id: trainer.id,
            name: trainer.name,
            email: trainer.email,
            isLoggedIn: true,
          }),
        )

        // Redirect to trainer portal
        router.push("/trainer-portal")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <Dumbbell className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Trainer Login</CardTitle>
          <CardDescription>Access your client dashboard and training tools</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="trainer@2d2n.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/trainer-login/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t pt-4">
          <div className="text-sm text-center text-muted-foreground">
            For demo purposes, use:
            <div className="font-medium text-foreground mt-1">
              Email: alex@2d2n.com
              <br />
              Password: trainer123
            </div>
          </div>
          <div className="text-sm text-center text-muted-foreground">
            Not a trainer?{" "}
            <Link href="/careers" className="text-primary hover:underline">
              Apply to become a trainer
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

