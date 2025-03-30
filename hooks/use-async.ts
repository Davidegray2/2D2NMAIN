"use client"

import { useState, useCallback } from "react"
import { logError } from "@/lib/error-handling"

interface UseAsyncOptions {
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
  errorMessage?: string
}

/**
 * Custom hook for handling async operations with loading and error states
 */
export function useAsync<T>(options: UseAsyncOptions = {}) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (asyncFunction: () => Promise<T>) => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await asyncFunction()
        setData(result)

        if (options.onSuccess) {
          options.onSuccess(result)
        }

        return result
      } catch (err) {
        logError("useAsync", err)

        const errorMessage =
          options.errorMessage || (err instanceof Error ? err.message : "An unexpected error occurred")

        setError(errorMessage)

        if (options.onError && err instanceof Error) {
          options.onError(err)
        }

        return null
      } finally {
        setIsLoading(false)
      }
    },
    [options],
  )

  return {
    data,
    isLoading,
    error,
    execute,
    setData,
    setError,
    reset: useCallback(() => {
      setData(null)
      setError(null)
      setIsLoading(false)
    }, []),
  }
}

