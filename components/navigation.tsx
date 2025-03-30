"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Megaphone, Trophy, User, BarChart, Utensils, Dumbbell, Video, MessageSquare, Settings, CreditCard } from 'lucide-react'
import { useState, useMemo, useEffect, useCallback } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Memoize nav items to prevent unnecessary re-renders
  const navItems = useMemo(
    () => [
      { href: "/", icon: Home, label: "Home" },
      { href: "/dashboard", icon: BarChart, label: "Dashboard" },
      { href: "/membership-selection", icon: CreditCard, label: "Membership Plans" }, // Added new navigation item
      { href: "/community", icon: Megaphone, label: "Community Feed" },
      { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
      { href: "/profile", icon: User, label: "My Profile" },
      { href: "/progress", icon: BarChart, label: "Premium Progress" },
      { href: "/nutrition", icon: Utensils, label: "Nutrition Library" },
      { href: "/workouts", icon: Dumbbell, label: "Workout Library" },
      { href: "/coaching", icon: Video, label: "Live Coaching" },
      { href: "/chat", icon: MessageSquare, label: "Live Chat" },
      { href: "/settings", icon: Settings, label: "Settings" },
    ],
    [],
  )

  // Close mobile menu when route changes - fixed potential memory leak with cleanup function
  useEffect(() => {
    if (pathname) {
      setMobileMenuOpen(false)
    }

    // No need for cleanup as this doesn't create any subscriptions or timers
  }, [pathname])

  // Memoize toggle handler to prevent recreation on each render
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-blue-950/90 backdrop-blur-sm border-b border-blue-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">2ND2NONE</span>
          </div>

          <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link href={item.href} key={item.href} aria-current={isActive ? "page" : undefined}>
                  <Button variant={isActive ? "secondary" : "ghost"} className="flex items-center gap-2" size="sm">
                    <item.icon size={16} aria-hidden="true" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
            <Link href="/login">Login</Link>
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-16 left-0 right-0 bg-blue-950 border-b border-blue-800 p-4 z-50 shadow-lg"
            role="menu"
          >
            <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    href={item.href}
                    key={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    role="menuitem"
                  >
                    <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start" size="sm">
                      <item.icon size={16} className="mr-2" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
              <Link href="/login">Login</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
