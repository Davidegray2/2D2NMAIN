"use client"

import { useRef, useEffect, useState } from "react"
import { useMessaging } from "@/contexts/messaging-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { Check, CheckCheck, MoreVertical, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Empty mock user data
const mockUsers = {
  user123: { name: "You", avatar: "/placeholder.svg?height=40&width=40" },
}

export function MessageList() {
  const { messages, currentConversation, deleteMessage } = useMessaging()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Get the other participant's info
  const otherParticipantId = currentConversation?.participantIds.find((id) => id !== "user123")
  const otherUser = otherParticipantId ? mockUsers[otherParticipantId as keyof typeof mockUsers] : null

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleDeleteMessage = () => {
    if (messageToDelete) {
      deleteMessage(messageToDelete)
      setMessageToDelete(null)
    }
  }

  if (!currentConversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="mb-4 p-4 rounded-full bg-primary/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary h-8 w-8"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Your Messages</h3>
        <p className="text-muted-foreground">Select a conversation or start a new message</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Conversation header */}
      {otherUser && (
        <div className="p-3 border-b bg-muted/30 flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={otherUser.avatar} />
            <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{otherUser.name}</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={containerRef}>
        {messages.length > 0 ? (
          messages.map((message) => {
            const isCurrentUser = message.senderId === "user123"
            const user = mockUsers[message.senderId as keyof typeof mockUsers]

            return (
              <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-2 max-w-[75%] ${isCurrentUser ? "flex-row-reverse" : ""}`}>
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8 flex-shrink-0 mt-1">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div className="flex items-start gap-1">
                      <div
                        className={`rounded-lg px-3 py-2 ${
                          isCurrentUser
                            ? message.deleted
                              ? "bg-muted/50 text-muted-foreground italic"
                              : "bg-primary text-primary-foreground"
                            : message.deleted
                              ? "bg-muted/50 text-muted-foreground italic"
                              : "bg-muted"
                        }`}
                      >
                        {message.deleted ? "This message was deleted" : message.content}
                      </div>

                      {isCurrentUser && !message.deleted && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 rounded-full hover:bg-muted">
                              <MoreVertical className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive flex items-center gap-2"
                              onClick={() => setMessageToDelete(message.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete Message
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <span>{formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</span>
                      {isCurrentUser &&
                        !message.deleted &&
                        (message.read ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />)}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <p>No messages yet</p>
            <p className="text-sm">Start the conversation by sending a message below</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <AlertDialog open={!!messageToDelete} onOpenChange={(open) => !open && setMessageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMessage} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

