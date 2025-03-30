import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/profile"
  const provider = requestUrl.searchParams.get("provider") // This will be set for social logins

  console.log("Auth callback received with code:", !!code, "provider:", provider)

  if (code) {
    try {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Error exchanging code for session:", error)
        // Redirect to login with error
        return NextResponse.redirect(
          new URL(`/login?error=${encodeURIComponent("Authentication failed: " + error.message)}`, request.url),
        )
      }

      console.log("Successfully exchanged code for session, redirecting to:", redirectTo)
    } catch (error: any) {
      console.error("Exception in auth callback:", error)
      // Redirect to login with error
      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent("Authentication failed: " + (error.message || "Unknown error"))}`,
          request.url,
        ),
      )
    }
  } else {
    console.warn("No code provided in auth callback")
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent("Authentication failed: No code provided")}`, request.url),
    )
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(redirectTo, request.url))
}

