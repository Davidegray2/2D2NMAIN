"use client"

import { MessagingProvider, useMessaging } from "@/contexts/messaging-context"
import { ConversationList } from "@/components/messaging/conversation-list"
import { MessageList } from "@/components/messaging/message-list"
import { MessageInput } from "@/components/messaging/message-input"
import { Card } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

function MessagesContent() {
  const [showConversations, setShowConversations] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { currentConversation, conversations, loading, error } = useMessaging()

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] p-4 text-center">
        <div className="text-red-500 mb-4">Failed to load messages</div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <Card className="overflow-hidden border shadow-md">
      <div className="flex h-[calc(100vh-200px)] max-h-[800px]">
        {/* Mobile view toggle */}
        {isMobile ? (
          showConversations && !currentConversation ? (
            <div className="w-full h-full">
              <ConversationList onSelectConversation={() => setShowConversations(false)} />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col">
              <div className="p-3 border-b bg-muted/30">
                <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowConversations(true)}>
                  <ChevronLeft className="h-4 w-4" />
                  Back to conversations
                </Button>
              </div>
              <div className="flex-1 overflow-hidden">
                {currentConversation ? (
                  <MessageList />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <div className="text-muted-foreground mb-4">Select a conversation to start messaging</div>
                  </div>
                )}
              </div>
              {currentConversation && <MessageInput />}
            </div>
          )
        ) : (
          <>
            <div className="w-1/3 border-r">
              <ConversationList />
            </div>
            <div className="w-2/3 flex flex-col">
              <div className="flex-1 overflow-hidden">
                {currentConversation ? (
                  <MessageList />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <div className="text-muted-foreground mb-4">Select a conversation to start messaging</div>
                  </div>
                )}
              </div>
              {currentConversation && <MessageInput />}
            </div>
          </>
        )}
      </div>
    </Card>
  )
}

// Main page component that provides the messaging context
export default function MessagesPage() {
  return (
    <div className="container py-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      <MessagingProvider>
        <MessagesContent />
      </MessagingProvider>
    </div>
  )
}

