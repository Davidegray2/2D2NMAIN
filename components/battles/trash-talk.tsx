"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send } from "lucide-react"

interface TrashTalkProps {
  battleId: string
  className?: string
}

export default function TrashTalk({ battleId, className = "" }: TrashTalkProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: "1",
      user: {
        name: "Opponent",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      text: "You call those push-ups? My grandma can do better!",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "2",
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      text: "Just warming up! Watch this!",
      timestamp: new Date(Date.now() - 60000).toISOString(),
    },
  ])

  const sendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      text: message,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate opponent response after a delay
    setTimeout(
      () => {
        const responses = [
          "Is that all you've got?",
          "You're going down!",
          "I'm just getting started!",
          "Nice try, but not good enough!",
          "You'll need more than that to beat me!",
        ]

        const opponentMessage = {
          id: (Date.now() + 1).toString(),
          user: {
            name: "Opponent",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, opponentMessage])
      },
      2000 + Math.random() * 3000,
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          Trash Talk
        </CardTitle>
        <CardDescription>Intimidate your opponent with some friendly banter</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] mb-4 p-4 rounded-md border">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 mb-4 ${msg.user.name === "You" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                <AvatarFallback>{msg.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.user.name === "You" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">{msg.user.name}</span>
                  <span className="text-xs opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            placeholder="Type your trash talk..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

