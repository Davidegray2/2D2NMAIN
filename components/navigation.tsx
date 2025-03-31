"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Megaphone, Trophy, User, BarChart, Utensils, Dumbbell, Video, MessageSquare, Settings, CreditCard, Menu, X } from 'lucide-react'
import { useState, useMemo, useEffect, useCallback } from "react"
import FocusLock from "react-focus-lock"

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/dashboard", icon: BarChart, label: "Dashboard" },
  { href: "/membership-selection", icon: CreditCard, label: "Membership Plans" },
  { href: "/community", icon: Megaphone, label: "Community Feed" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/profile", icon: User, label: "My Profile" },
  { href: "/progress", icon: BarChart, label: "Premium Progress" },
  { href: "/nutrition", icon: Utensils, label: "Nutrition Library" },
  { href: "/workouts", icon: Dumbbell, label: "Workout Library" },
  { href: "/coaching", icon: Video, label: "Live Coaching" },
  { href: "/chat", icon: MessageSquare, label: "Live Chat" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/login", icon: null, label: "Login" },
];

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Memoize nav items to prevent unnecessary re-renders
  const navItems = useMemo(() => NAV_ITEMS, [])

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
              const isActive = pathname.startsWith(item.href)
              return (
                <Link href={item.href} key={item.href} aria-current={isActive ? "page" : undefined}>
                  <Button variant={isActive ? "secondary" : "ghost"} className="flex items-center gap-2" size="sm">
                    {item.icon && <item.icon size={16} aria-hidden="true" />}
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
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
              {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <FocusLock>
            <div
              id="mobile-menu"
              className="absolute top-16 left-0 right-0 bg-blue-950 border-b border-blue-800 p-4 z-50 shadow-lg"
              role="menu"
            >
              <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
                {navItems.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <Link
                      href={item.href}
                      key={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      role="menuitem"
                    >
                      <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start" size="sm">
                        {item.icon && <item.icon size={16} className="mr-2" aria-hidden="true" />}
                        <span>{item.label}</span>
                      </Button>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </FocusLock>
        )}
      </div>
    </header>
  )
}
