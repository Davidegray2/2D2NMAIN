"use client"

import { useRef, useEffect } from "react"

export function useFocusTrap(isActive = true) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) return

    const root = rootRef.current
    if (!root) return

    // Save the active element to restore focus later
    const previousActiveElement = document.activeElement as HTMLElement

    // Find all focusable elements
    const focusableElements = root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus the first element
    firstElement.focus()

    // Handle tab key presses
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      // Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
        return
      }

      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // If there's a close button, click it
        const closeButton = root.querySelector<HTMLButtonElement>("[data-close-modal]")
        if (closeButton) {
          closeButton.click()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keydown", handleEscape)

      // Restore focus when unmounting
      if (previousActiveElement) {
        previousActiveElement.focus()
      }
    }
  }, [isActive])

  return rootRef
}

