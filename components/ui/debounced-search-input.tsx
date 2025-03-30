"use client"

import React, { useRef } from "react"
import { Search } from "lucide-react"
import { useDebouncedSearch } from "@/hooks/use-debounced-search"

interface DebouncedSearchInputProps {
  placeholder?: string
  onSearch?: (term: string) => void
  className?: string
  delay?: number
}

export function DebouncedSearchInput({
  placeholder = "Search...",
  onSearch,
  className = "",
  delay = 300,
}: DebouncedSearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { searchTerm, debouncedTerm, handleSearchChange, clearSearch } = useDebouncedSearch(delay)

  // Effect to trigger search callback when debounced term changes
  React.useEffect(() => {
    if (onSearch && debouncedTerm) {
      onSearch(debouncedTerm)
    }
  }, [debouncedTerm, onSearch])

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim() && onSearch) {
      onSearch(searchTerm)
    }
  }

  // Clear search and focus input
  const handleClearSearch = () => {
    clearSearch()
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <form onSubmit={handleSearchSubmit} className={`relative ${className}`}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <input
        ref={inputRef}
        type="search"
        placeholder={placeholder}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </form>
  )
}

