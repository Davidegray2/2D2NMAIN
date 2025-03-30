"use client"
import type React from "react"
import "./globals.css"
import { Mona_Sans as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserPlus, Search, Crown, Dumbbell, LogIn } from "lucide-react"
import { TrainerAuthProvider } from "@/contexts/trainer-auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { AchievementToast } from "@/components/achievements/achievement-toast"
import { Logo } from "@/components/logo"
import { Footer } from "@/components/footer"
import { MobileAppBanner } from "@/components/mobile-app-banner"
import { NotificationDropdown } from "@/components/notifications/notification-dropdown"
import { HeaderLogin } from "@/components/header-login"
import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"
import { supabase, clearSession } from "@/lib/supabaseClient"

function DebouncedSearchInput() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState("")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Improved debounce implementation with proper cleanup
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setDebouncedTerm(value)
      // In a real app, you would trigger the search here
      console.log("Searching for:", value)
    }, 300)
  }

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      console.log("Search submitted:", searchTerm)
      // In a real app, you would navigate to search results page
      // router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    setDebouncedTerm("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <form onSubmit={handleSearchSubmit} className="relative mx-4 flex-1 max-w-md hidden md:flex">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <input
        ref={inputRef}
        type="search"
        placeholder="Search workouts, trainers, challenges..."
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </form>
  )
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Add state to control sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Since we can't use useSession, let's use a simple state to track authentication
  // In a real app, you would check localStorage, cookies, or a context
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  // Check if user is logged in on client side - improved version
  useEffect(() => {
    const checkAuth = async () => {
      setIsAuthLoading(true)
      try {
        // Use Supabase's getSession method to check if the user is authenticated
        const {
          data: { session },
        } = await supabase.auth.getSession()

        // Only set authenticated if we have a valid session
        setIsAuthenticated(!!session)

        console.log("Auth check:", {
          hasSession: !!session,
          sessionExpires: session?.expires_at ? new Date(session.expires_at * 1000).toISOString() : "No session",
        })
      } catch (error) {
        console.error("Error checking authentication:", error)
        setIsAuthenticated(false)
      } finally {
        setIsAuthLoading(false)
      }
    }

    checkAuth()

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event)
      setIsAuthenticated(!!session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  // Function to close sidebar (for mobile)
  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  // Effect to close sidebar on window resize (for responsive behavior)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [sidebarOpen])

  // Enhanced logout function with complete session clearing
  const handleLogout = async () => {
    try {
      console.log("Logout initiated")

      // Update UI state immediately
      setIsAuthenticated(false)

      // Clear all session data
      await clearSession()

      // Force a hard reload to clear any in-memory state
      window.location.href = "/?logout=" + Date.now()
    } catch (error) {
      console.error("Error during logout:", error)

      // Even if there's an error, try to force logout
      if (typeof window !== "undefined") {
        localStorage.clear()
        sessionStorage.clear()

        // Force reload as a last resort
        window.location.href = "/?force_logout=" + Date.now()
      }
    }
  }

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin text-primary mb-4 border-2 border-primary border-t-transparent rounded-full"></div>
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to content
      </a>
      <TrainerAuthProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SidebarProvider defaultOpen={false} open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <div className="flex min-h-screen flex-col">
              <div className="flex flex-1 overflow-hidden">
                <Sidebar className="border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
                  <SidebarHeader className="flex h-16 items-center border-b border-border/40 px-6">
                    <Logo variant="full" />
                  </SidebarHeader>
                  <SidebarContent className="p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
                    <MainNav isAuthenticated={isAuthenticated} />
                  </SidebarContent>
                </Sidebar>
                <div className="flex-1 flex flex-col overflow-hidden hero-gradient hero-pattern">
                  <header className="h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4 sm:px-6 sticky top-0 z-30">
                    <SidebarTrigger
                      className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                      aria-label="Toggle sidebar"
                      onClick={toggleSidebar}
                    />
                    <div className="ml-4 font-medium hidden sm:flex items-center gap-2">
                      <Dumbbell className="h-4 w-4 text-primary" />
                      <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                        2ND2NONE Elite Fitness Community
                      </span>
                    </div>

                    {isAuthenticated && <DebouncedSearchInput />}

                    <div className="ml-auto flex items-center gap-2 sm:gap-4">
                      <ThemeToggle />
                      {isAuthenticated && <NotificationDropdown />}
                      <div className="flex items-center gap-2 sm:gap-3">
                        {!isAuthenticated ? (
                          <>
                            <HeaderLogin />
                            <Link href="/register">
                              <Button
                                variant="default"
                                size="sm"
                                className="gap-2 px-2 sm:px-3 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
                              >
                                <UserPlus className="h-4 w-4" />
                                <span className="hidden sm:inline">Register</span>
                              </Button>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link href="/dashboard">
                              <Button variant="ghost" size="sm" className="gap-2 px-2 sm:px-3">
                                <Dumbbell className="h-4 w-4" />
                                <span className="hidden sm:inline">Dashboard</span>
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-2 px-2 sm:px-3 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                              onClick={handleLogout}
                            >
                              <LogIn className="h-4 w-4 rotate-180" />
                              <span className="hidden sm:inline">Logout</span>
                            </Button>
                          </>
                        )}
                      </div>
                      <Link href="/premium" className="hidden sm:block">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
                        >
                          <Crown className="h-4 w-4" />
                          <span>Legend</span>
                        </Button>
                      </Link>
                      {isAuthenticated && (
                        <Link href="/profile">
                          <Avatar className="h-8 w-8 border border-border/40 cursor-pointer hover:border-primary transition-colors">
                            <AvatarImage src="/images/default-avatar.jpg" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        </Link>
                      )}
                    </div>
                  </header>
                  <main className="flex-1 overflow-auto" id="main-content" onClick={closeSidebar}>
                    <div
                      className={cn("mx-auto transition-all duration-300", sidebarOpen ? "max-w-full" : "max-w-7xl")}
                    >
                      {children}
                    </div>
                  </main>
                  <Footer />
                </div>
              </div>

              {/* Achievement toast notification */}
              <AchievementToast />

              {/* Mobile app banner */}
              <MobileAppBanner />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </TrainerAuthProvider>
    </div>
  )
}

