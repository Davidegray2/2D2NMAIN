"use client"

import { useState, useEffect, useCallback } from "react"

interface FetchOptions<T> {
  initialData?: T
  revalidateOnFocus?: boolean
  revalidateOnReconnect?: boolean
  dedupingInterval?: number
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

interface FetchState<T> {
  data: T | undefined
  isLoading: boolean
  error: Error | null
  isValidating: boolean
}

// Simple cache implementation
const cache = new Map<string, { data: any; timestamp: number }>()

export function useDataFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: FetchOptions<T> = {},
): FetchState<T> & { mutate: () => Promise<void> } {
  const {
    initialData,
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    dedupingInterval = 2000, // 2 seconds
    onSuccess,
    onError,
  } = options

  const [state, setState] = useState<FetchState<T>>({
    data: initialData,
    isLoading: true,
    error: null,
    isValidating: false,
  })

  const fetchData = useCallback(
    async (shouldUpdateLoading = true) => {
      // Check cache first
      const cachedData = cache.get(key)
      const now = Date.now()

      if (cachedData && now - cachedData.timestamp < dedupingInterval) {
        setState((prev) => ({
          ...prev,
          data: cachedData.data,
          isLoading: false,
        }))
        return
      }

      if (shouldUpdateLoading) {
        setState((prev) => ({ ...prev, isLoading: true }))
      }

      setState((prev) => ({ ...prev, isValidating: true }))

      try {
        const data = await fetcher()
        setState({ data, isLoading: false, error: null, isValidating: false })
        cache.set(key, { data, timestamp: Date.now() })
        onSuccess?.(data)
      } catch (error) {
        setState({
          data: initialData,
          isLoading: false,
          error: error instanceof Error ? error : new Error(String(error)),
          isValidating: false,
        })
        onError?.(error instanceof Error ? error : new Error(String(error)))
      }
    },
    [key, fetcher, initialData, dedupingInterval, onSuccess, onError],
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (!revalidateOnFocus) return

    const onFocus = () => {
      fetchData(false)
    }

    window.addEventListener("focus", onFocus)
    return () => {
      window.removeEventListener("focus", onFocus)
    }
  }, [fetchData, revalidateOnFocus])

  useEffect(() => {
    if (!revalidateOnReconnect) return

    const onOnline = () => {
      fetchData(false)
    }

    window.addEventListener("online", onOnline)
    return () => {
      window.removeEventListener("online", onOnline)
    }
  }, [fetchData, revalidateOnReconnect])

  const mutate = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  return { ...state, mutate }
}

