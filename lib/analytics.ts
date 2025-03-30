"use client"

// Define event types for type safety
export type AnalyticsEventName =
  | "page_view"
  | "sign_up"
  | "login"
  | "logout"
  | "subscription_started"
  | "subscription_cancelled"
  | "workout_created"
  | "workout_completed"
  | "profile_updated"
  | "post_created"
  | "post_liked"
  | "post_commented"
  | "search_performed"
  | "feature_used"

export type AnalyticsEventProperties = Record<string, string | number | boolean | null>

// Initialize analytics (placeholder for actual implementation)
export function initAnalytics(): void {
  if (typeof window === "undefined") return

  // Load analytics script
  const script = document.createElement("script")
  script.src = "https://analytics.example.com/script.js"
  script.async = true
  script.onload = () => {
    console.log("Analytics loaded")
    // Initialize with user data if available
    const userId = localStorage.getItem("userId")
    if (userId) {
      identifyUser(userId)
    }
  }
  document.head.appendChild(script)
}

// Track an event
export function trackEvent(eventName: AnalyticsEventName, properties: AnalyticsEventProperties = {}): void {
  if (typeof window === "undefined") return

  // Add common properties
  const commonProps = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    referrer: document.referrer,
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
  }

  const allProperties = { ...commonProps, ...properties }

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${eventName}`, allProperties)
  }

  // Send to analytics service (placeholder)
  if (window.analytics) {
    window.analytics.track(eventName, allProperties)
  }
}

// Identify a user
export function identifyUser(userId: string, traits: Record<string, any> = {}): void {
  if (typeof window === "undefined") return

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] Identify user: ${userId}`, traits)
  }

  // Send to analytics service (placeholder)
  if (window.analytics) {
    window.analytics.identify(userId, traits)
  }
}

// Track page view
export function trackPageView(pageName: string, properties: AnalyticsEventProperties = {}): void {
  trackEvent("page_view", { pageName, ...properties })
}

import { useEffect } from "react"

// Create a hook for tracking page views
export function usePageView(pageName: string, properties: AnalyticsEventProperties = {}): void {
  useEffect(() => {
    if (typeof window !== "undefined") {
      trackPageView(pageName, properties)
    }
  }, [pageName, JSON.stringify(properties)])
}

