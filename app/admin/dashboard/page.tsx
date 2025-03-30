"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabaseClient"
import { Loader2, Users, CreditCard, Activity } from "lucide-react"

export default function AdminDashboard() {
  const { isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    rookies: 0,
    contenders: 0,
    warriors: 0,
    legends: 0,
  })
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  useEffect(() => {
    // Redirect if not admin
    if (!isLoading && !isAdmin) {
      router.push("/dashboard")
    }
  }, [isAdmin, isLoading, router])

  useEffect(() => {
    const fetchStats = async () => {
      if (!isAdmin) return

      setIsLoadingStats(true)
      const supabase = createClient()

      try {
        // Get total users
        const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

        // Get subscription stats
        const { data: subscriptions } = await supabase.from("user_subscriptions").select("tier").eq("isActive", true)

        const subscriptionCounts = {
          rookie: 0,
          contender: 0,
          warrior: 0,
          legend: 0,
        }

        subscriptions?.forEach((sub) => {
          if (subscriptionCounts[sub.tier as keyof typeof subscriptionCounts] !== undefined) {
            subscriptionCounts[sub.tier as keyof typeof subscriptionCounts]++
          }
        })

        setStats({
          totalUsers: totalUsers || 0,
          activeSubscriptions: subscriptions?.length || 0,
          rookies: subscriptionCounts.rookie,
          contenders: subscriptionCounts.contender,
          warriors: subscriptionCounts.warrior,
          legends: subscriptionCounts.legend,
        })
      } catch (error) {
        console.error("Error fetching admin stats:", error)
      } finally {
        setIsLoadingStats(false)
      }
    }

    fetchStats()
  }, [isAdmin])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAdmin) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">
                {isLoadingStats ? <Loader2 className="h-4 w-4 animate-spin" /> : stats.totalUsers}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">
                {isLoadingStats ? <Loader2 className="h-4 w-4 animate-spin" /> : stats.activeSubscriptions}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Legend Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">
                {isLoadingStats ? <Loader2 className="h-4 w-4 animate-spin" /> : stats.legends}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Warrior Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">
                {isLoadingStats ? <Loader2 className="h-4 w-4 animate-spin" /> : stats.warriors}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage all users in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This section will allow you to view, edit, and manage all user accounts.
              </p>
              <Button>View All Users</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>Manage user subscriptions and payment information.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This section will allow you to view and manage all user subscriptions.
              </p>
              <Button>View All Subscriptions</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage workouts, nutrition plans, and other content.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This section will allow you to create, edit, and manage all content on the platform.
              </p>
              <Button>Manage Content</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system-wide settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This section will allow you to configure global settings for the platform.
              </p>
              <Button>Edit Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

