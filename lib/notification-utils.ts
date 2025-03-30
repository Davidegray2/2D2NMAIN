"use client"

import { useEffect } from "react"

import { useState } from "react"

type NotificationType = "success" | "error" | "info" | "warning"

interface Notification {
  id: string
  type: NotificationType
  message: string
  duration?: number
}

// This is a simple in-memory store for notifications
// In a real app, you might want to use a more robust state management solution
let listeners: ((notifications: Notification[]) => void)[] = []
let notifications: Notification[] = []

function notifyListeners() {
  listeners.forEach((listener) => listener([...notifications]))
}

export function addNotification(message: string, type: NotificationType = "info", duration = 5000): string {
  const id = Date.now().toString()
  const notification: Notification = {
    id,
    type,
    message,
    duration,
  }

  notifications.push(notification)
  notifyListeners()

  if (duration > 0) {
    setTimeout(() => {
      removeNotification(id)
    }, duration)
  }

  return id
}

export function removeNotification(id: string): void {
  notifications = notifications.filter((n) => n.id !== id)
  notifyListeners()
}

export function clearAllNotifications(): void {
  notifications = []
  notifyListeners()
}

export function useNotifications(): {
  notifications: Notification[]
  addNotification: typeof addNotification
  removeNotification: typeof removeNotification
  clearAllNotifications: typeof clearAllNotifications
} {
  const [state, setState] = useState<Notification[]>(notifications)

  useEffect(() => {
    const listener = (newNotifications: Notification[]) => {
      setState(newNotifications)
    }

    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  return {
    notifications: state,
    addNotification,
    removeNotification,
    clearAllNotifications,
  }
}

