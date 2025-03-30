"use client"

import type React from "react"

import { useState } from "react"
import { LogIn, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

export function HeaderLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setErrorMessage("Please enter both email and password")
      return
    }

    try {
      setIsLoading(true)
      setErrorMessage("")

      // Check if Supabase client is available
      if (!supabase) {
        throw new Error("Authentication service is not available. Please try again later.")
      }

      // Authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.user && data.session) {
        // Store session in localStorage as a backup
        localStorage.setItem("authToken", data.session.access_token)

        // Set a cookie as a backup
        document.cookie = `authToken=${data.session.access_token}; path=/; max-age=86400`

        // Close the dialog and refresh the page to update auth state
        setIsOpen(false)
        window.location.href = "/profile"
      } else {
        throw new Error("Login failed. No user or session data returned.")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setErrorMessage(error.message || "Failed to sign in. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    try {
      setIsLoading(true)
      setErrorMessage("")

      if (!supabase) {
        throw new Error("Authentication service is not available. Please try again later.")
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent("/profile")}`,
        },
      })

      if (error) {
        throw error
      }

      // The user will be redirected to the OAuth provider
      console.log(`Redirecting to ${provider} login...`)
    } catch (error: any) {
      console.error(`${provider} login error:`, error)
      setErrorMessage(error.message || `Failed to sign in with ${provider}.`)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-2 sm:px-3">
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Login</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-black/90 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Welcome back</DialogTitle>
          <DialogDescription className="text-zinc-400">Sign in to your account to continue</DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-zinc-200">
                Password
              </Label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>

        <div className="flex flex-col space-y-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-black px-2 text-zinc-500">Or continue with</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading}
            >
              Facebook
            </Button>
          </div>
        </div>

        <DialogFooter className="sm:justify-center border-t border-zinc-800 pt-4">
          <div className="text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

