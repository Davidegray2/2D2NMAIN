"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Settings } from "lucide-react"
import { useTrainerAuth } from "@/contexts/trainer-auth-context"
import { TrainerNav } from "@/components/trainer-nav"

export default function TrainerSettingsPage() {
  const router = useRouter()
  const { trainer, isLoading, isAuthenticated } = useTrainerAuth()

  useEffect(() => {
    // Check if trainer is logged in
    if (!isLoading && !isAuthenticated) {
      router.push("/trainer-login")
      return
    }
  }, [isLoading, isAuthenticated, router])

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden md:block border-r pr-6">
          <TrainerNav />
        </aside>

        <main>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your trainer account</p>
            </div>
          </div>

          <Card className="h-[400px] flex items-center justify-center">
            <CardContent className="text-center">
              <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Settings coming soon!</h3>
              <p className="text-muted-foreground">Manage your account settings</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

