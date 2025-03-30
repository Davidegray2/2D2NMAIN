"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

type NotificationBadgeProps = {
  count?: number
}

export function NotificationBadge({ count = 0 }: NotificationBadgeProps) {
  const [unreadCount, setUnreadCount] = useState(count)

  // In a real app, you would subscribe to real-time updates
  // This is just a mock implementation
  useEffect(() => {
    setUnreadCount(count)

    // Mock receiving a new message after 30 seconds
    const timer = setTimeout(() => {
      setUnreadCount((prev) => prev + 1)
    }, 30000)

    return () => clearTimeout(timer)
  }, [count])

  if (unreadCount === 0) return null

  return (
    <Badge
      variant="destructive"
      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
    >
      {unreadCount > 9 ? "9+" : unreadCount}
    </Badge>
  )
}

