"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function MembershipSelectionPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the premium page after a short delay
    const timer = setTimeout(() => {
      router.push("/premium")
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Redirecting to Subscription Plans</h1>
        <p className="text-muted-foreground">Please wait...</p>
      </div>
    </div>
  )
}

