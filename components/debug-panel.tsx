"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabaseClient"

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchDebugInfo = async () => {
    setIsLoading(true)
    try {
      // Get current user
      const { data: currentUserData } = await supabase.auth.getUser()

      // Try to get users from auth.users
      const { data: authUsers, error: authError } = await supabase.from("users").select("*")

      // Try to get users from profiles
      const { data: profileUsers, error: profileError } = await supabase.from("profiles").select("*")

      setDebugInfo({
        timestamp: new Date().toISOString(),
        currentUser: currentUserData?.user?.id || null,
        authUsers: {
          count: authUsers?.length || 0,
          error: authError?.message || null,
          data: authUsers || [],
        },
        profileUsers: {
          count: profileUsers?.length || 0,
          error: profileError?.message || null,
          data: profileUsers || [],
        },
      })
    } catch (error) {
      setDebugInfo({
        timestamp: new Date().toISOString(),
        error: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setIsOpen(true)} className="bg-white dark:bg-gray-800">
          Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[90vw]">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Debug Panel</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </CardHeader>
        <CardContent className="text-xs">
          <div className="flex justify-between mb-2">
            <span>Database Info</span>
            <Button variant="outline" size="sm" onClick={fetchDebugInfo} disabled={isLoading} className="h-6 text-xs">
              {isLoading ? "Loading..." : "Refresh"}
            </Button>
          </div>

          {debugInfo ? (
            <div className="space-y-2 max-h-80 overflow-auto">
              <div>
                <strong>Timestamp:</strong> {debugInfo.timestamp}
              </div>
              <div>
                <strong>Current User:</strong> {debugInfo.currentUser || "Not logged in"}
              </div>

              <div>
                <strong>Auth Users:</strong> {debugInfo.authUsers?.count || 0}
                {debugInfo.authUsers?.error && <div className="text-red-500">Error: {debugInfo.authUsers.error}</div>}
                {debugInfo.authUsers?.data?.length > 0 && (
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs mt-1 overflow-auto">
                    {JSON.stringify(
                      debugInfo.authUsers.data.map((u) => ({ id: u.id, email: u.email })),
                      null,
                      2,
                    )}
                  </pre>
                )}
              </div>

              <div>
                <strong>Profile Users:</strong> {debugInfo.profileUsers?.count || 0}
                {debugInfo.profileUsers?.error && (
                  <div className="text-red-500">Error: {debugInfo.profileUsers.error}</div>
                )}
                {debugInfo.profileUsers?.data?.length > 0 && (
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs mt-1 overflow-auto">
                    {JSON.stringify(
                      debugInfo.profileUsers.data.map((u) => ({ id: u.id, username: u.username })),
                      null,
                      2,
                    )}
                  </pre>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-4">Click Refresh to load debug information</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

