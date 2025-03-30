import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of paths that require authentication
const protectedPaths = [
  "/dashboard",
  "/profile",
  "/performance-tracking",
  "/settings",
  "/workouts",
  "/create-workout",
  "/workout-battles",
  "/nutrition",
  "/body-composition",
  "/fitness-ai",
  "/spotters",
  "/messages",
  "/community",
  "/hype-wall",
  "/leaderboard",
  "/trainers",
  "/live-trainers",
  "/underground",
  "/elite-membership",
  "/coaching",
  "/rewards",
  "/avatar-studio",
]

// List of paths that are public
const publicPaths = ["/", "/about", "/login", "/register", "/forgot-password", "/contact", "/chat", "/legal"]

// List of paths that require admin access
const adminPaths = ["/admin", "/admin/dashboard"]

/**
 * Middleware function to handle authentication and authorization
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // Check if the path is public
  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // Check if the path requires admin access
  const isAdminPath = adminPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // Check for authentication token in cookies
  const authToken = request.cookies.get("authToken")?.value
  const supabaseAuth = request.cookies.get("supabase.auth.token")?.value
  const sessionCookie = request.cookies.get("session")?.value

  const isAuthenticated = !!(authToken || supabaseAuth || sessionCookie)

  // Check for admin role in cookies (this is a simplified approach - in production, you'd verify this server-side)
  const isAdmin = request.cookies.get("user_role")?.value === "admin"

  // If the path requires admin access and the user is not an admin, redirect to dashboard
  if (isAdminPath && (!isAuthenticated || !isAdmin)) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // If the path is protected and the user is not authenticated, redirect to login
  if (isProtectedPath && !isAuthenticated) {
    const url = new URL("/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // If the path is a login/register page and the user is authenticated, redirect to dashboard
  if ((pathname === "/login" || pathname === "/register") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
}

