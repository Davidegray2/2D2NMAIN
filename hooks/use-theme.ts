"use client"

import { useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function useTheme(defaultTheme: Theme = "system") {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    return (localStorage.getItem("theme") as Theme) || defaultTheme
  })

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    if (theme === "system") {
      return getSystemTheme()
    }
    return theme as "light" | "dark"
  })

  useEffect(() => {
    const root = window.document.documentElement

    // Remove the previous theme class
    root.classList.remove("light", "dark")

    // Add the new theme class
    const newTheme = theme === "system" ? getSystemTheme() : theme
    root.classList.add(newTheme)
    setResolvedTheme(newTheme)

    // Save to localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    if (theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      const newSystemTheme = getSystemTheme()
      setResolvedTheme(newSystemTheme)
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(newSystemTheme)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return {
    theme,
    setTheme,
    resolvedTheme,
    themes: ["light", "dark", "system"] as const,
  }
}

