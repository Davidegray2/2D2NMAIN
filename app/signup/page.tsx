"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, Shield, Trophy, Zap, Crown, Loader2, CheckCircle, Mail, CreditCard } from 'lucide-react'
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { loadStripe } from "@stripe/stripe-js"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export default function SignupPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedTier, setSelectedTier] = useState("rookie")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    const plan = params.get("plan")
    const tier = params.get("tier")

    if (plan) {
      const planToTier: { [key: string]: string } = {
        basic: "rookie",
        contender: "contender",
        warrior: "warrior",
        legend: "legend",
      }
      setSelectedTier(planToTier[plan] || plan)
    } else if (tier) {
      setSelectedTier(tier)
    } else {
      setSelectedTier("rookie")
    }
  }, [searchParams])

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push("/dashboard")
      }
    }

    checkSession()
  }, [router])

  const tiers: { [key: string]: { name: string; price: string; color: string; icon: React.ReactNode; priceId?: string } } = {
    rookie: { name: "Rookie", price: "Free", color: "bg-slate-600", icon: <Shield className="h-6 w-6" /> },
    contender: { 
      name: "Contender", 
      price: "$9.99/month", 
      color: "bg-blue-600", 
      icon: <Zap className="h-6 w-6" />,
      priceId: "price_1234567890" // Replace with your actual Stripe price ID
    },
    warrior: { 
      name: "Warrior", 
      price: "$19.99/month", 
      color: "bg-purple-600", 
      icon: <Trophy className="h-6 w-6" />,
      priceId: "price_2345678901" // Replace with your actual Stripe price ID
    },
    legend: { 
      name: "Legend", 
      price: "$39.99/month", 
      color: "bg-amber-600", 
      icon: <Crown className="h-6 w-6" />,
      priceId: "price_3456789012" // Replace with your actual Stripe price ID
    },
  }

  const currentTier = tiers[selectedTier] || tiers.rookie
  const isPaidTier = selectedTier !== "rookie"

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!fullName.trim()) {
      errors.fullName = "Full name is required"
    }

    if (!email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid"
    }

    if (!password) {
      errors.password = "Password is required"
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (!termsAccepted) {
      errors.terms = "You must accept the terms and conditions"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrorMsg("")
    setSuccessMsg("")

    try {
      // For free tier, proceed with normal signup
      if (!isPaidTier) {
        await processSignup()
      } else {
        // For paid tiers, create account first then redirect to payment
        await processSignupWithPayment()
      }
    } catch (err: any) {
      console.error("Signup error:", err)
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.")
      setLoading(false)
    }
  }

  async function processSignup() {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            fullName,
            tier: selectedTier,
            first_name: fullName.split(" ")[0],
            last_name: fullName.split(" ").slice(1).join(" "),
            terms_accepted: termsAccepted,
            terms_accepted_at: new Date().toISOString(),
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      // Check if email confirmation is required
      if (data?.user?.identities?.length === 0) {
        // User already exists
        setErrorMsg("An account with this email already exists. Please log in instead.")
        setLoading(false)
        return
      }

      if (!data?.user?.email_confirmed_at) {
        // Email confirmation is required
        setEmailConfirmationRequired(true)
        setRegistrationComplete(true)
        setSuccessMsg("Account created successfully! Please check your email to confirm your account.")
        setLoading(false)
        return
      }

      // If we get here, email confirmation is not required (rare case or development setting)
      setSuccessMsg("Account created successfully!")
      setRegistrationComplete(true)
      setLoading(false)

      // Try auto-login (will likely fail in production due to email confirmation)
      setTimeout(async () => {
        try {
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (loginError) {
            // Expected error if email not confirmed
            console.log("Auto-login not possible until email is confirmed")
            return
          }

          // If login succeeds (rare case), redirect to dashboard
          router.push("/dashboard")
        } catch (loginErr: any) {
          console.error("Auto-login error:", loginErr)
          // This is expected if email confirmation is required
        }
      }, 3000)
    } catch (err) {
      throw err
    }
  }

  async function processSignupWithPayment() {
    try {
      setProcessingPayment(true)
      
      // 1. Create the user account first
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            fullName,
            tier: selectedTier, // This will be updated after payment
            first_name: fullName.split(" ")[0],
            last_name: fullName.split(" ").slice(1).join(" "),
            terms_accepted: termsAccepted,
            terms_accepted_at: new Date().toISOString(),
            payment_pending: true,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      if (!data.user) {
        throw new Error("Failed to create account")
      }

      const userId = data.user.id

      // 2. Create a checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: currentTier.priceId,
          userId: userId,
          customerEmail: email,
          tierName: currentTier.name,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const { sessionId } = await response.json()

      // 3. Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to initialize')
      }
      
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        throw stripeError
      }
    } catch (err) {
      throw err
    } finally {
      setProcessingPayment(false)
      setLoading(false)
    }
  }

  if (registrationComplete && emailConfirmationRequired) {
    return (
      <div className="container max-w-4xl py-10">
        <Card className="text-center p-6">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl mb-2">Check Your Email</CardTitle>
          <CardDescription className="text-lg mb-6">
            We've sent a confirmation link to <strong>{email}</strong>
          </CardDescription>
          <div className="mb-6">
            <p>
              Please check your email and click the confirmation link to activate your {currentTier.name} membership.
            </p>
            <Alert className="mt-4 bg-blue-500/20 text-blue-500 border-blue-500/50">
              <AlertDescription>You won't be able to log in until you confirm your email address.</AlertDescription>
            </Alert>
          </div>
          <div className="flex flex-col space-y-2">
            <Button onClick={() => router.push("/login")} className="w-full">
              Go to Login
            </Button>
            <Button variant="outline" onClick={() => setRegistrationComplete(false)} className="w-full">
              Back to Registration
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (registrationComplete) {
    return (
      <div className="container max-w-4xl py-10">
        <Card className="text-center p-6">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl mb-2">Registration Successful!</CardTitle>
          <CardDescription className="text-lg mb-6">
            Your {currentTier.name} membership has been created successfully.
          </CardDescription>
          <div className="mb-6">
            <p>You will be redirected to the dashboard shortly.</p>
            <div className="mt-4 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
              <span>Redirecting...</span>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-10">
      <Link href="/membership-selection" className="flex items-center text-sm mb-8 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span>Back to membership selection</span>
      </Link>

      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div
                className={`${currentTier.color} text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4`}
              >
                {currentTier.icon}
              </div>
              <CardTitle>{currentTier.name}</CardTitle>
              <CardDescription>Selected membership plan</CardDescription>
              <div className="mt-2 text-2xl font-bold">
                {currentTier.price}
                {currentTier.price !== "Free" && (
                  <span className="text-sm font-normal text-muted-foreground ml-1">billed monthly</span>
                )}
              </div>
            </CardHeader>
            {isPaidTier && (
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center mb-2">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>Secure payment via Stripe</span>
                  </div>
                  <p>You'll be redirected to our secure payment processor after creating your account.</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Enter your information below to get started with your {currentTier.name} plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {errorMsg && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{errorMsg}</AlertDescription>
                </Alert>
              )}

              {successMsg && (
                <Alert className="mb-4 bg-green-500/20 text-green-500 border-green-500/50">
                  <AlertDescription>{successMsg}</AlertDescription>
                </Alert>
              )}

              <form className="space-y-4" onSubmit={handleSignup}>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={formErrors.fullName ? "border-red-500" : ""}
                    disabled={loading}
                  />
                  {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={formErrors.email ? "border-red-500" : ""}
                    disabled={loading}
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={formErrors.password ? "border-red-500" : ""}
                    disabled={loading}
                  />
                  {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
                  {password && (
                    <div className="mt-1">
                      <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${password.length < 8 ? "bg-red-500" : password.length < 12 ? "bg-yellow-500" : "bg-green-500"}`}
                          style={{ width: `${Math.min(100, (password.length / 12) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={formErrors.confirmPassword ? "border-red-500" : ""}
                    disabled={loading}
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
                  )}
                </div>

                {/* Fixed Terms and Conditions Checkbox */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => {
                      setTermsAccepted(checked === true);
                      if (checked) {
                        setFormErrors({...formErrors, terms: ""});
                      }
                    }}
                    disabled={loading}
                    className="mt-1"
                  />
                  <div>
                    <Label 
                      htmlFor="terms" 
                      className={`text-sm cursor-pointer ${formErrors.terms ? "text-red-500" : ""}`}
                    >
                      I agree to the{" "}
                      <Link href="/legal" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/legal" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                    {formErrors.terms && <p className="text-red-500 text-sm">{formErrors.terms}</p>}
                  </div>
                </div>

                <Button type="submit" className="w-full min-w-[140px]" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {processingPayment ? "Processing Payment..." : "Creating Account..."}
                    </>
                  ) : (
                    isPaidTier ? "Create Account & Continue to Payment" : "Create Account"
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}