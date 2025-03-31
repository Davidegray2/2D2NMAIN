"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  Trophy,
  Zap,
  Crown,
  Loader2,
  CheckCircle,
  Mail,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

// Reusable components for better readability
const FormField = ({ id, label, type = "text", value, onChange, error, disabled }: any) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={error ? "border-red-500" : ""}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={`${id}-error`}
    />
    {error && <p id={`${id}-error`} className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState("rookie");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const tiers = {
    rookie: { name: "Rookie", price: "Free", color: "bg-slate-600", icon: <Shield className="h-6 w-6" /> },
    contender: { name: "Contender", price: "$9.99/month", color: "bg-blue-600", icon: <Zap className="h-6 w-6" /> },
    warrior: { name: "Warrior", price: "$19.99/month", color: "bg-purple-600", icon: <Trophy className="h-6 w-6" /> },
    legend: { name: "Legend", price: "$39.99/month", color: "bg-amber-600", icon: <Crown className="h-6 w-6" /> },
  };

  const currentTier = tiers[selectedTier] || tiers.rookie;
  const isPaidTier = selectedTier !== "rookie";

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const plan = params.get("plan");
    const tier = params.get("tier");

    if (plan) {
      const planToTier = {
        basic: "rookie",
        contender: "contender",
        warrior: "warrior",
        legend: "legend",
      };
      setSelectedTier(planToTier[plan] || plan);
    } else if (tier) {
      setSelectedTier(tier);
    } else {
      setSelectedTier("rookie");
    }
  }, [searchParams]);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/dashboard");
      }
    };

    checkSession();
  }, [router]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const { fullName, email, password, confirmPassword, termsAccepted } = formData;

    if (!fullName.trim()) errors.fullName = "Full name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!password) errors.password = "Password is required";
    else if (password.length < 8) errors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (!termsAccepted) errors.terms = "You must accept the terms and conditions";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (!isPaidTier) {
        await processSignup();
      } else {
        await processSignupWithPayment();
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const processSignup = async () => {
    // Simplified signup logic
  };

  const processSignupWithPayment = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe initialization failed");

      // Example payment processing logic
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: selectedTier }),
      });

      if (!response.ok) throw new Error("Failed to create checkout session");

      const { sessionId } = await response.json();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Payment processing error:", error);
      throw new Error("Payment processing failed. Please try again.");
    }
  };

  if (registrationComplete) {
    return (
      <div className="container max-w-4xl py-10">
        <Card className="text-center p-6">
          <CardTitle>Registration Successful!</CardTitle>
          <CardDescription>Your {currentTier.name} membership has been created successfully.</CardDescription>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-10">
      <Link href="/membership-selection" className="flex items-center text-sm mb-8 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span>Back to membership selection</span>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Enter your information below to get started with your {currentTier.name} plan</CardDescription>
        </CardHeader>
        <CardContent>
          {errorMsg && <Alert variant="destructive"><AlertDescription>{errorMsg}</AlertDescription></Alert>}
          {successMsg && <Alert><AlertDescription>{successMsg}</AlertDescription></Alert>}

          <form className="space-y-4" onSubmit={handleSignup}>
            <fieldset disabled={loading}>
              <FormField
                id="name"
                label="Full Name"
                value={formData.fullName}
                onChange={(e: any) => setFormData({ ...formData, fullName: e.target.value })}
                error={formErrors.fullName}
              />
              <FormField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                error={formErrors.email}
              />
              <FormField
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
                error={formErrors.password}
              />
              <FormField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e: any) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={formErrors.confirmPassword}
              />
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked === true })}
                  aria-invalid={!!formErrors.terms}
                  aria-describedby="terms-error"
                />
                <Label htmlFor="terms" className={formErrors.terms ? "text-red-500" : ""}>
                  I agree to the{" "}
                  <Link href="/legal" className="text-primary hover:underline">Terms of Service</Link> and{" "}
                  <Link href="/legal" className="text-primary hover:underline">Privacy Policy</Link>
                </Label>
              </div>
              {formErrors.terms && <p id="terms-error" className="text-red-500 text-sm">{formErrors.terms}</p>}

              <Button type="submit" className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
              </Button>
            </fieldset>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}