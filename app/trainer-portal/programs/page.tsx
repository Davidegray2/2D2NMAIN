"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Plus } from "lucide-react"
import { useTrainerAuth } from "@/contexts/trainer-auth-context"
import { TrainerNav } from "@/components/trainer-nav"

export default function TrainerProgramsPage() {
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
              <h1 className="text-3xl font-bold">Programs</h1>
              <p className="text-muted-foreground">Manage your workout programs</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Program
            </Button>
          </div>

          <Card className="h-[400px] flex items-center justify-center">
            <CardContent className="text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No programs created yet</h3>
              <p className="text-muted-foreground">Create workout programs for your clients</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

