"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SkipLinkProps {
  href: string
  className?: string
}

export function SkipLink({ href, className }: SkipLinkProps) {
  const [isFocused, setIsFocused] = useState(false)

  // Reset focus state when route changes
  useEffect(() => {
    setIsFocused(false)
  }, [href])

  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
        isFocused && "not-sr-only",
        className,
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      Skip to content
    </a>
  )
}

