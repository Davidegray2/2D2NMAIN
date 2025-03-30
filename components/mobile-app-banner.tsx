"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

export function MobileAppBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if the banner has been dismissed before
    const dismissed = localStorage.getItem("appBannerDismissed")
    if (!dismissed) {
      // Only show after 5 seconds of being on the site
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  const dismissBanner = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem("appBannerDismissed", "true")
  }

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/40 p-4 z-40 md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo variant="compact" />
          <div>
            <h3 className="font-medium text-sm">Get the 2D2N App</h3>
            <p className="text-xs text-muted-foreground">Track workouts on the go</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="default" className="bg-primary">
            Download
          </Button>
          <Button size="sm" variant="ghost" onClick={dismissBanner}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

