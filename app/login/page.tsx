"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Dumbbell, Eye, EyeOff, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ErrorBoundary } from "@/components/error-boundary"
import { Separator } from "@/components/ui/separator"
import { LoadingState } from "@/components/loading-state"
import { formatErrorMessage, logError } from "@/lib/error-utils"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams ? searchParams.get("redirect") : null
  const logoutParam = searchParams ? searchParams.get("logout") : null

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      // If we have a logout parameter, skip the auth check
      if (logoutParam) {
        setIsCheckingAuth(false)
        return
      }

      try {
        setIsCheckingAuth(true)
        // Import supabase client dynamically to avoid server-side issues
        const { supabase } = await import("@/lib/supabaseClient")
        const { data } = await supabase.auth.getSession()

        if (data.session && data.session.user) {
          router.push(redirectUrl || "/dashboard")
        }
      } catch (error) {
        logError("checkSession", error)
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkSession()
  }, [router, redirectUrl, logoutParam])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!email || !password) {
      setErrorMessage("Please enter both email and password")
      return
    }

    setIsLoading(true)

    try {
      // Import supabase client dynamically to avoid server-side issues
      const { supabase } = await import("@/lib/supabaseClient")

      if (!supabase) {
        throw new Error("Authentication service is not available. Please try again later.")
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Handle specific error cases with user-friendly messages
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("The email or password you entered is incorrect. Please try again.")
        } else if (error.message.includes("Email not confirmed")) {
          throw new Error(
            "Please confirm your email address before logging in. Check your inbox for a confirmation link.",
          )
        } else {
          throw error
        }
      }

      if (data.user) {
        // Redirect to dashboard or the specified redirect URL
        router.push(redirectUrl || "/dashboard")
      } else {
        throw new Error("Login failed. Please try again.")
      }
    } catch (error) {
      logError("handleLogin", error)
      setErrorMessage(formatErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setErrorMessage("")
    setIsLoading(true)

    try {
      // Import supabase client dynamically to avoid server-side issues
      const { supabase } = await import("@/lib/supabaseClient")

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect=${redirectUrl || "/dashboard"}`,
        },
      })

      if (error) {
        throw error
      }

      // The user will be redirected to the provider's login page
    } catch (error) {
      logError(`${provider}Login`, error)
      setErrorMessage(formatErrorMessage(error))
      setIsLoading(false)
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <LoadingState message="Checking authentication..." size="md" />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <Card className="w-full max-w-md relative z-10 bg-black/80 border-zinc-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-primary p-2 rounded-full">
                <Dumbbell className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
            <CardDescription className="text-zinc-400">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-zinc-200">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  disabled={isLoading}
                  className="bg-zinc-900 border-zinc-700"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-zinc-200">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:text-primary/90 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="bg-zinc-900 border-zinc-700"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-zinc-400"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <Separator className="bg-zinc-800" />
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-black/80 text-zinc-500 text-xs">
                OR
              </span>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                  <path
                    fill="#EA4335"
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4909091,6.5 L19.6954545,3.29545455 C17.5272727,1.25 14.9090909,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9382731,24 17.5742724,22.7655 19.7000001,20.6999999 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.7000001,20.6999999 L19.6999999,20.7000001 C17.5742724,22.7655 14.9382731,24 12,24 C7.27006974,24 3.1977497,21.3017021 1.23999023,17.3499756 L5.26620003,14.2351706 C6.19878754,17.061068 8.85444915,19.0909091 12,19.0909091 C13.5660892,19.0909091 14.9509167,18.7163016 16.0407269,18.0125889 L19.7000001,20.6999999 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
                Continue with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
                onClick={() => handleSocialLogin("facebook")}
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 mr-2 text-[#1877F2]"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                </svg>
                Continue with Facebook
              </Button>
            </div>

            <div className="text-center mt-6 text-sm text-zinc-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  )
}

