"use client"

import { useState } from "react"
import { useMessaging } from "@/contexts/messaging-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Search, Plus, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
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

interface ConversationListProps {
  onSelectConversation?: () => void
}

export function ConversationList({ onSelectConversation }: ConversationListProps) {
  const { conversations, selectConversation, currentConversation, loading, startNewConversation, deleteConversation } =
    useMessaging()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null)
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null)

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conversation) => {
    const otherParticipantId = conversation.participantIds.find((id) => id !== "user123")
    if (!otherParticipantId) return false

    const otherUser = mockUsers[otherParticipantId as keyof typeof mockUsers]
    if (!otherUser) return false

    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleSelectConversation = (conversationId: string) => {
    selectConversation(conversationId)
    if (onSelectConversation) {
      onSelectConversation()
    }
  }

  const handleDeleteConversation = () => {
    if (conversationToDelete) {
      deleteConversation(conversationToDelete)
      setConversationToDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <div className="animate-pulse h-10 bg-muted rounded-md"></div>
        <div className="animate-pulse h-16 bg-muted rounded-md"></div>
        <div className="animate-pulse h-16 bg-muted rounded-md"></div>
        <div className="animate-pulse h-16 bg-muted rounded-md"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b bg-muted/30">
        <h2 className="font-semibold mb-2">Conversations</h2>
        <div className="relative mb-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
              <DialogDescription>Select a user to start a new conversation.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Select onValueChange={(value) => setSelectedRecipient(value)}>
                  <SelectTrigger id="recipient">
                    <SelectValue placeholder="Select a recipient" />
                  </SelectTrigger>
                  <SelectContent>{/* Empty recipient list */}</SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  disabled={!selectedRecipient}
                  onClick={() => {
                    if (selectedRecipient) {
                      startNewConversation(selectedRecipient)
                    }
                  }}
                >
                  Start Conversation
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => {
            const otherParticipantId = conversation.participantIds.find((id) => id !== "user123")
            if (!otherParticipantId) return null

            const otherUser = mockUsers[otherParticipantId as keyof typeof mockUsers]
            if (!otherUser) return null

            const lastMessage = conversation.lastMessage
            const isActive = currentConversation?.id === conversation.id

            return (
              <div
                key={conversation.id}
                className={`border-b last:border-b-0 hover:bg-muted/50 transition-colors ${isActive ? "bg-muted" : ""}`}
              >
                <div className="flex items-center p-3">
                  <div
                    className="flex-1 flex items-center gap-3 cursor-pointer"
                    onClick={() => handleSelectConversation(conversation.id)}
                  >
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={otherUser.avatar} />
                      <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{otherUser.name}</p>
                        <span className="text-xs text-muted-foreground">
                          {lastMessage
                            ? formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: false })
                            : ""}
                        </span>
                      </div>
                      {lastMessage && (
                        <p className="text-sm text-muted-foreground truncate">
                          {lastMessage.senderId === "user123" ? "You: " : ""}
                          {lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-2">
                    {conversation.unreadCount > 0 && (
                      <Badge variant="default" className="h-5 w-5 flex items-center justify-center p-0 rounded-full">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        setConversationToDelete(conversation.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete conversation</span>
                    </Button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="bg-muted inline-flex p-3 rounded-full mb-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium">No conversations found</p>
            <p className="text-sm text-muted-foreground">Start a new conversation</p>
          </div>
        )}
      </div>

      <AlertDialog open={!!conversationToDelete} onOpenChange={(open) => !open && setConversationToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this entire conversation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConversation}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

