"use client"

import { useState, useEffect } from "react"

export function useMobileDetector() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape")

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i

      // Check if mobile device based on user agent
      const isMobileDevice = mobileRegex.test(userAgent)

      // Check screen size
      const width = window.innerWidth
      const height = window.innerHeight

      setIsMobile(isMobileDevice || width < 768)
      setIsTablet(width >= 768 && width < 1024)
      setIsDesktop(width >= 1024)
      setOrientation(height > width ? "portrait" : "landscape")
    }

    // Initial check
    checkDevice()

    // Listen for resize events
    window.addEventListener("resize", checkDevice)

    // Listen for orientation change
    window.addEventListener("orientationchange", checkDevice)

    return () => {
      window.removeEventListener("resize", checkDevice)
      window.removeEventListener("orientationchange", checkDevice)
    }
  }, [])

  return { isMobile, isTablet, isDesktop, orientation }
}

