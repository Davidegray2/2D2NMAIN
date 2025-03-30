"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Handle SSR
    if (typeof window === "undefined") {
      return
    }

    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler)
      return () => mediaQuery.removeEventListener("change", handler)
    }
    // Older browsers
    else {
      mediaQuery.addListener(handler)
      return () => mediaQuery.removeListener(handler)
    }
  }, [query])

  return matches
}

// Predefined breakpoints based on Tailwind CSS defaults
export function useBreakpoint() {
  const isSm = useMediaQuery("(min-width: 640px)")
  const isMd = useMediaQuery("(min-width: 768px)")
  const isLg = useMediaQuery("(min-width: 1024px)")
  const isXl = useMediaQuery("(min-width: 1280px)")
  const is2xl = useMediaQuery("(min-width: 1536px)")

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    // Current active breakpoint
    current: is2xl ? "2xl" : isXl ? "xl" : isLg ? "lg" : isMd ? "md" : isSm ? "sm" : "xs",
  }
}

