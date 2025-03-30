"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Dumbbell, Eye, EyeOff, Loader2, CheckCircle, Mail } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormValidation } from "@/hooks/use-form-validation"
import { ErrorBoundary } from "@/components/error-boundary"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const planFromUrl = searchParams ? searchParams.get("plan") : null

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Import supabase client dynamically to avoid server-side issues
        const { supabase } = await import("@/lib/supabaseClient")
        const { data } = await supabase.auth.getSession()

        // Only redirect if there's a valid session
        if (data.session && data.session.user) {
          console.log("User already logged in, redirecting to dashboard")
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Error checking session:", error)
        // Don't redirect, just allow the page to render
      }
    }

    checkSession()
  }, [router])

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    membershipPlan: planFromUrl || "",
    termsAccepted: false,
  }

  const validationRules = {
    firstName: { required: "First name is required" },
    lastName: { required: "Last name is required" },
    email: {
      required: "Email is required",
      validate: (value: string) => /\S+@\S+\.\S+/.test(value) || "Invalid email format",
    },
    password: {
      required: "Password is required",
      minLength: [8, "Password must be at least 8 characters"],
      validate: (value: string) => {
        if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter"
        if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter"
        if (!/[0-9]/.test(value)) return "Password must contain at least one number"
        return true
      },
    },
    confirmPassword: {
      required: "Please confirm your password",
      validate: (value: string, formValues: any) => value === formValues.password || "Passwords do not match",
    },
    membershipPlan: { required: "Please select a membership plan" },
    termsAccepted: {
      validate: (value: boolean) => value === true || "You must accept the terms and conditions",
    },
  }

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched } = useFormValidation(
    initialValues,
    validationRules,
  )

  // Redirect to subscription selection if no plan is provided
  useEffect(() => {
    if (!planFromUrl && !values.membershipPlan) {
      // Only redirect if they haven't already selected a plan in the form
      const timer = setTimeout(() => {
        router.push("/subscription/select")
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [planFromUrl, values.membershipPlan, router])

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Validate all fields
    const formErrors = Object.values(errors).filter((error) => error)
    if (formErrors.length > 0) {
      setErrorMessage("Please fix the form errors before submitting.")
      return
    }

    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      // Import supabase client dynamically to avoid server-side issues
      const { supabase } = await import("@/lib/supabaseClient")

      // For development/testing purposes, you can disable email confirmation
      // In production, you should always require email confirmation
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            membership_plan: values.membershipPlan,
            full_name: `${values.firstName} ${values.lastName}`,
            terms_accepted: values.termsAccepted,
            terms_accepted_at: new Date().toISOString(),
          },
          // Set this to true to bypass email confirmation (for development only)
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      // Store the email for the confirmation screen
      setUserEmail(values.email)

      // Check if email confirmation is required
      if (data?.user?.identities?.length === 0 || data?.user?.email_confirmed_at) {
        // User already exists or email already confirmed
        setErrorMessage("An account with this email already exists. Please log in instead.")
        return
      }

      if (!data?.user?.email_confirmed_at) {
        // Email confirmation is required
        setEmailConfirmationRequired(true)
        setRegistrationComplete(true)
        setSuccessMessage("Account created successfully! Please check your email to confirm your account.")
        return
      }

      // If we get here, email confirmation is not required (rare case or development setting)
      setSuccessMessage("Account created successfully!")
      setRegistrationComplete(true)

      // Try auto-login (will likely fail in production due to email confirmation)
      setTimeout(async () => {
        try {
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
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
    } catch (error: any) {
      console.error("Registration error:", error)
      setErrorMessage(error.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "No password" }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    const labels = ["Very weak", "Weak", "Fair", "Good", "Strong", "Very strong"]
    return {
      strength,
      label: labels[strength],
      color: ["bg-red-500", "bg-red-500", "bg-yellow-500", "bg-yellow-500", "bg-green-500", "bg-green-500"][strength],
    }
  }

  const passwordStrength = getPasswordStrength(values.password)

  // Get plan display name
  const getPlanDisplayName = (planId: string) => {
    const plans: Record<string, string> = {
      rookie: "Rookie (Free)",
      contender: "Contender ($9.99/month)",
      warrior: "Warrior ($19.99/month)",
      legend: "Legend ($39.99/month)",
    }
    return plans[planId] || "Unknown Plan"
  }

  if (registrationComplete && emailConfirmationRequired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <Card className="w-full max-w-md relative z-10 bg-black/80 border-zinc-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Check Your Email</CardTitle>
            <CardDescription className="text-zinc-400">
              We've sent a confirmation link to <strong>{userEmail}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-center text-zinc-300">
                Please check your email and click the confirmation link to activate your account.
              </p>
              <Alert className="bg-blue-500/20 text-blue-500 border-blue-500/50">
                <AlertDescription>You won't be able to log in until you confirm your email address.</AlertDescription>
              </Alert>
              <div className="flex flex-col space-y-2">
                <Button variant="outline" onClick={() => router.push("/login")} className="w-full">
                  Go to Login
                </Button>
                <Button variant="ghost" onClick={() => setRegistrationComplete(false)} className="w-full">
                  Back to Registration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (registrationComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <Card className="w-full max-w-md relative z-10 bg-black/80 border-zinc-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 p-3 rounded-full">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Registration Successful!</CardTitle>
            <CardDescription className="text-zinc-400">
              Your account has been created successfully. You will be redirected to the dashboard shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="mt-4 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
              <span>Redirecting...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!planFromUrl && !values.membershipPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <Card className="w-full max-w-md relative z-10 bg-black/80 border-zinc-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Select a Membership Plan</CardTitle>
            <CardDescription className="text-zinc-400">
              You need to select a membership plan before registering.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center flex-col items-center gap-4">
            <div className="mt-4 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
              <span>Redirecting to plan selection...</span>
            </div>
            <Link
              href="/subscription/select"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full mt-4"
            >
              Go to Plan Selection
            </Link>
          </CardContent>
        </Card>
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
            <CardTitle className="text-2xl font-bold text-white">Create an account</CardTitle>
            <CardDescription className="text-zinc-400">Enter your information to get started</CardDescription>
            {planFromUrl && (
              <div className="mt-2 p-2 bg-primary/10 rounded-md border border-primary/20">
                <p className="text-sm font-medium flex items-center gap-2">
                  <span>Selected plan:</span>
                  <span className="text-primary font-semibold">{getPlanDisplayName(planFromUrl)}</span>
                </p>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            {successMessage && (
              <Alert className="mb-4 bg-green-500/20 text-green-500 border-green-500/50">
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-zinc-200">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.firstName && touched.firstName ? "border-red-500" : ""}
                    disabled={isLoading}
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-zinc-200">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.lastName && touched.lastName ? "border-red-500" : ""}
                    disabled={isLoading}
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-zinc-200">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.email && touched.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password" className="text-zinc-200">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password && touched.password ? "border-red-500" : ""}
                    disabled={isLoading}
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
                {errors.password && touched.password ? (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                ) : values.password ? (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-zinc-400">Password strength: {passwordStrength.label}</span>
                      <span className="text-xs text-zinc-400">{values.password.length}/8+ chars</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-zinc-200">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.confirmPassword && touched.confirmPassword ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div>
                <Label htmlFor="membershipPlan" className="text-zinc-200">
                  Membership Plan
                </Label>
                <Select
                  value={values.membershipPlan}
                  onValueChange={(value) => setFieldValue("membershipPlan", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger
                    id="membershipPlan"
                    className={errors.membershipPlan && touched.membershipPlan ? "border-red-500" : ""}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rookie">Rookie (Free)</SelectItem>
                    <SelectItem value="contender">Contender ($9.99/month)</SelectItem>
                    <SelectItem value="warrior">Warrior ($19.99/month)</SelectItem>
                    <SelectItem value="legend">Legend ($39.99/month)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.membershipPlan && touched.membershipPlan && (
                  <p className="text-red-500 text-sm mt-1">{errors.membershipPlan}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={values.termsAccepted}
                  onCheckedChange={(checked) => setFieldValue("termsAccepted", checked === true)}
                  disabled={isLoading}
                />
                <Label htmlFor="termsAccepted" className="text-sm text-zinc-200">
                  I agree to the{" "}
                  <Link href="/legal" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/legal" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.termsAccepted && touched.termsAccepted && (
                <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>

              <div className="text-center text-sm text-zinc-400">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  )
}

