"use client"

import { useState, useRef, useEffect } from "react"

export function useDebouncedSearch(delay = 300) {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState("")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setDebouncedTerm(value)
    }, delay)
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    setDebouncedTerm("")
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    searchTerm,
    debouncedTerm,
    handleSearchChange,
    clearSearch,
  }
}

