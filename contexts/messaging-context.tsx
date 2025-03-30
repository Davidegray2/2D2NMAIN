"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback, useMemo } from "react"

type Message = {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  read: boolean
  attachmentUrl?: string
  deleted?: boolean
}

type Conversation = {
  id: string
  participantIds: string[]
  lastMessage?: Message
  unreadCount: number
}

type MessagingContextType = {
  conversations: Conversation[]
  currentConversation: Conversation | null
  messages: Message[]
  sendMessage: (receiverId: string, content: string, attachmentUrl?: string) => void
  markAsRead: (messageId: string) => void
  selectConversation: (conversationId: string) => void
  startNewConversation: (participantId: string) => void
  deleteMessage: (messageId: string) => void
  deleteConversation: (conversationId: string) => void
  loading: boolean
  error: string | null
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined)

// Mock user data
const currentUserId = "user123"
const mockUsers = [
  { id: "trainer1", name: "Alex Johnson", role: "trainer", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "trainer2", name: "Sarah Williams", role: "trainer", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "user456", name: "Mike Chen", role: "user", avatar: "/placeholder.svg?height=40&width=40", clanId: "wolves" },
  {
    id: "user789",
    name: "Emma Davis",
    role: "user",
    avatar: "/placeholder.svg?height=40&width=40",
    clanId: "spartans",
  },
]

// Mock initial conversations
const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participantIds: [currentUserId, "trainer1"],
    unreadCount: 2,
  },
  {
    id: "conv2",
    participantIds: [currentUserId, "user456"],
    unreadCount: 0,
  },
]

// Mock initial messages
const mockMessages: Record<string, Message[]> = {
  conv1: [
    {
      id: "msg1",
      senderId: "trainer1",
      receiverId: currentUserId,
      content: "How's your progress with the new workout plan?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
    },
    {
      id: "msg2",
      senderId: currentUserId,
      receiverId: "trainer1",
      content: "It's going well! I've been able to increase my weights on all exercises.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
      read: true,
    },
    {
      id: "msg3",
      senderId: "trainer1",
      receiverId: currentUserId,
      content: "That's great! Let's schedule a session to review your form on the deadlifts.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: false,
    },
    {
      id: "msg4",
      senderId: "trainer1",
      receiverId: currentUserId,
      content: "I've also prepared a new nutrition plan for your bulking phase.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
    },
  ],
  conv2: [
    {
      id: "msg5",
      senderId: "user456",
      receiverId: currentUserId,
      content: "Hey! Are you joining the clan challenge this weekend?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      read: true,
    },
    {
      id: "msg6",
      senderId: currentUserId,
      receiverId: "user456",
      content: "Our Wolfpack is going to crush it!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 11),
      read: true,
    },
  ],
}

// Optimize the messaging context for better performance
// Fix potential memory leaks
// Improve error handling

export function MessagingProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Optimize the useEffect hook in the MessagingProvider component

  // Simulate loading conversations from API
  useEffect(() => {
    let isMounted = true

    const fetchConversations = async () => {
      try {
        setLoading(true)
        setError(null)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Only update state if component is still mounted
        if (isMounted) {
          // Update conversations with last message
          const updatedConversations = mockConversations.map((conv) => {
            const conversationMessages = mockMessages[conv.id] || []
            const lastMessage =
              conversationMessages.length > 0 ? conversationMessages[conversationMessages.length - 1] : undefined

            return {
              ...conv,
              lastMessage,
            }
          })

          setConversations(updatedConversations)
          setLoading(false)
        }
      } catch (err) {
        console.error("Error fetching conversations:", err)
        if (isMounted) {
          setError("Failed to load conversations. Please try again.")
          setLoading(false)
        }
      }
    }

    fetchConversations()

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false
    }
  }, [])

  const selectConversation = useCallback(
    (conversationId: string) => {
      try {
        const conversation = conversations.find((c) => c.id === conversationId)
        if (conversation) {
          setCurrentConversation(conversation)
          setMessages(mockMessages[conversationId] || [])

          // Mark all messages as read
          if (conversation.unreadCount > 0) {
            const updatedMessages = mockMessages[conversationId].map((msg) => {
              if (msg.receiverId === currentUserId && !msg.read) {
                return { ...msg, read: true }
              }
              return msg
            })

            mockMessages[conversationId] = updatedMessages
            setMessages(updatedMessages)

            // Update conversation unread count
            const updatedConversations = conversations.map((c) => {
              if (c.id === conversationId) {
                return { ...c, unreadCount: 0 }
              }
              return c
            })

            setConversations(updatedConversations)
          }
        }
      } catch (err) {
        console.error("Error selecting conversation:", err)
        setError("Failed to load conversation. Please try again.")
      }
    },
    [conversations],
  )

  const startNewConversation = useCallback(
    (participantId: string) => {
      try {
        // Check if conversation already exists
        const existingConv = conversations.find(
          (c) => c.participantIds.includes(currentUserId) && c.participantIds.includes(participantId),
        )

        if (existingConv) {
          selectConversation(existingConv.id)
          return
        }

        // Create new conversation
        const newConvId = `conv${conversations.length + 1}`
        const newConversation: Conversation = {
          id: newConvId,
          participantIds: [currentUserId, participantId],
          unreadCount: 0,
        }

        mockMessages[newConvId] = []
        setConversations((prev) => [...prev, newConversation])
        setCurrentConversation(newConversation)
        setMessages([])
      } catch (err) {
        console.error("Error starting new conversation:", err)
        setError("Failed to start conversation. Please try again.")
      }
    },
    [conversations, selectConversation],
  )

  const sendMessage = useCallback(
    (receiverId: string, content: string, attachmentUrl?: string) => {
      try {
        if (!content.trim() && !attachmentUrl) return

        // Find or create conversation
        let conversation = conversations.find(
          (c) => c.participantIds.includes(currentUserId) && c.participantIds.includes(receiverId),
        )

        if (!conversation) {
          startNewConversation(receiverId)
          conversation = currentConversation
        }

        if (!conversation) return

        // Create new message
        const newMessage: Message = {
          id: `msg${Date.now()}`,
          senderId: currentUserId,
          receiverId,
          content,
          timestamp: new Date(),
          read: false,
          attachmentUrl,
        }

        // Update messages
        const conversationMessages = [...(mockMessages[conversation.id] || []), newMessage]
        mockMessages[conversation.id] = conversationMessages

        // Update current messages if in this conversation
        if (currentConversation?.id === conversation.id) {
          setMessages(conversationMessages)
        }

        // Update conversation with last message
        const updatedConversations = conversations.map((c) => {
          if (c.id === conversation?.id) {
            return {
              ...c,
              lastMessage: newMessage,
            }
          }
          return c
        })

        setConversations(updatedConversations)

        // If this is the current conversation, update it
        if (currentConversation?.id === conversation.id) {
          setCurrentConversation({
            ...currentConversation,
            lastMessage: newMessage,
          })
        }
      } catch (err) {
        console.error("Error sending message:", err)
        setError("Failed to send message. Please try again.")
      }
    },
    [conversations, currentConversation, startNewConversation],
  )

  const contextValue = useMemo(
    () => ({
      conversations,
      currentConversation,
      messages,
      sendMessage,
      markAsRead: (messageId: string) => {
        if (!currentConversation) return

        const updatedMessages = messages.map((msg) => {
          if (msg.id === messageId) {
            return { ...msg, read: true }
          }
          return msg
        })

        mockMessages[currentConversation.id] = updatedMessages
        setMessages(updatedMessages)

        // Update unread count
        const unreadCount = updatedMessages.filter((msg) => msg.receiverId === currentUserId && !msg.read).length

        const updatedConversations = conversations.map((c) => {
          if (c.id === currentConversation.id) {
            return { ...c, unreadCount }
          }
          return c
        })

        setConversations(updatedConversations)
        setCurrentConversation({
          ...currentConversation,
          unreadCount,
        })
      },
      selectConversation,
      startNewConversation,
      deleteMessage: (messageId: string) => {
        if (!currentConversation) return

        // Mark message as deleted
        const updatedMessages = messages.map((msg) => {
          if (msg.id === messageId) {
            return { ...msg, deleted: true, content: "This message was deleted" }
          }
          return msg
        })

        mockMessages[currentConversation.id] = updatedMessages
        setMessages(updatedMessages)

        // If the deleted message was the last message in the conversation, update the last message
        const lastMessage = updatedMessages[updatedMessages.length - 1]

        const updatedConversations = conversations.map((c) => {
          if (c.id === currentConversation.id) {
            if (c.lastMessage?.id === messageId) {
              return {
                ...c,
                lastMessage: { ...lastMessage },
              }
            }
            return c
          }
          return c
        })

        setConversations(updatedConversations)
      },
      deleteConversation: (conversationId: string) => {
        // Remove the conversation from the list
        const updatedConversations = conversations.filter((c) => c.id !== conversationId)
        setConversations(updatedConversations)

        // Clear messages if the deleted conversation was the current one
        if (currentConversation?.id === conversationId) {
          setCurrentConversation(null)
          setMessages([])
        }

        // Remove the messages from the mockMessages object
        delete mockMessages[conversationId]
      },
      loading,
      error,
    }),
    [
      conversations,
      currentConversation,
      messages,
      loading,
      error,
      sendMessage,
      selectConversation,
      startNewConversation,
    ],
  )

  return <MessagingContext.Provider value={contextValue}>{children}</MessagingContext.Provider>
}

export function useMessaging() {
  const context = useContext(MessagingContext)
  if (context === undefined) {
    throw new Error("useMessaging must be used within a MessagingProvider")
  }
  return context
}

