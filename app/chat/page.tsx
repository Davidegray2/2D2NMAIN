"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

type Message = {
  id: number
  sender: "user" | "coach"
  text: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "coach",
      text: "Hi there! I'm your fitness coach. How can I help you today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: 2,
      sender: "user",
      text: "I'm looking for advice on my workout routine.",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: 3,
      sender: "coach",
      text: "Great! I'd be happy to help. What's your current routine like?",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (newMessage.trim() === "") return

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate coach response
    setTimeout(() => {
      const coachMessage: Message = {
        id: messages.length + 2,
        sender: "coach",
        text: "Thanks for sharing that information. I'll analyze your routine and get back to you with some recommendations soon!",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, coachMessage])
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Live Chat</h1>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Chat with Your Fitness Coach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          message.sender === "user"
                            ? "/placeholder.svg?height=32&width=32"
                            : "/placeholder.svg?height=32&width=32"
                        }
                      />
                      <AvatarFallback>{message.sender === "user" ? "U" : "C"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

