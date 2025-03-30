"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useMessaging } from "@/contexts/messaging-context"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Paperclip, Send, Image, Smile } from "lucide-react"

export function MessageInput() {
  const { currentConversation, sendMessage } = useMessaging()
  const [message, setMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = () => {
    if (!currentConversation || !message.trim()) return

    const receiverId = currentConversation.participantIds.find((id) => id !== "user123")
    if (!receiverId) return

    sendMessage(receiverId, message)
    setMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !currentConversation) return

    // In a real app, you would upload the file to your storage service
    // and then get back a URL to use
    setIsUploading(true)

    // Simulate file upload
    setTimeout(() => {
      const receiverId = currentConversation.participantIds.find((id) => id !== "user123")
      if (receiverId) {
        // Use a placeholder image URL
        sendMessage(receiverId, `Sent an image: ${file.name}`, "/placeholder.svg?height=200&width=300")
      }
      setIsUploading(false)
    }, 1000)
  }

  if (!currentConversation) return null

  return (
    <div className="p-3 border-t bg-background">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[60px] max-h-[120px] resize-none border-muted"
          />
          <div className="flex items-center gap-2 mt-2">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="h-8 w-8"
            >
              <Image className="h-4 w-4" />
              <span className="sr-only">Attach image</span>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="h-8 w-8"
            >
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Button type="button" size="icon" variant="ghost" className="h-8 w-8">
              <Smile className="h-4 w-4" />
              <span className="sr-only">Add emoji</span>
            </Button>
          </div>
        </div>
        <Button
          type="button"
          onClick={handleSendMessage}
          disabled={!message.trim() || isUploading}
          className="h-10 px-4"
        >
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  )
}

