"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { useMessaging } from "@/contexts/messaging-context"
import { useRouter } from "next/navigation"

interface ProfileMessageButtonProps {
  userId: string
  userName: string
}

export function ProfileMessageButton({ userId, userName }: ProfileMessageButtonProps) {
  const { startNewConversation } = useMessaging()
  const router = useRouter()

  const handleMessageUser = () => {
    // Start a new conversation with this user
    startNewConversation(userId)

    // Navigate to the messages page
    router.push("/messages")
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={handleMessageUser}
      title={`Send a message to ${userName}`}
    >
      <MessageSquare className="h-4 w-4" />
      Message
    </Button>
  )
}

