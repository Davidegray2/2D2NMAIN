"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface InfiniteScrollOptions<T> {
  initialData?: T[]
  fetchFn: (page: number, pageSize: number) => Promise<T[]>
  pageSize?: number
  threshold?: number
  enabled?: boolean
}

export function useInfiniteScroll<T>({
  initialData = [],
  fetchFn,
  pageSize = 10,
  threshold = 200,
  enabled = true,
}: InfiniteScrollOptions<T>) {
  const [data, setData] = useState<T[]>(initialData)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore || !enabled) return

    setIsLoading(true)
    setError(null)

    try {
      const newItems = await fetchFn(page, pageSize)

      if (newItems.length === 0) {
        setHasMore(false)
      } else {
        setData((prev) => [...prev, ...newItems])
        setPage((prev) => prev + 1)
        setHasMore(newItems.length === pageSize)
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }, [fetchFn, page, pageSize, isLoading, hasMore, enabled])

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading || !enabled) return

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMore()
          }
        },
        { rootMargin: `0px 0px ${threshold}px 0px` },
      )

      if (node) {
        observer.current.observe(node)
      }
    },
    [isLoading, hasMore, loadMore, threshold, enabled],
  )

  // Initial load
  useEffect(() => {
    if (initialData.length === 0 && enabled) {
      loadMore()
    }
  }, [enabled]) // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [])

  return {
    data,
    isLoading,
    error,
    hasMore,
    loadMore,
    lastElementRef,
  }
}

