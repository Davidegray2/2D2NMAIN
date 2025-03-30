"use client"

import { useState, useCallback, useMemo } from "react"

interface PaginationOptions {
  initialPage?: number
  initialPageSize?: number
  totalItems?: number
}

export function usePagination({ initialPage = 1, initialPageSize = 10, totalItems = 0 }: PaginationOptions = {}) {
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const totalPages = useMemo(() => {
    return totalItems ? Math.ceil(totalItems / pageSize) : 0
  }, [totalItems, pageSize])

  const nextPage = useCallback(() => {
    setPage((current) => (current < totalPages ? current + 1 : current))
  }, [totalPages])

  const prevPage = useCallback(() => {
    setPage((current) => (current > 1 ? current - 1 : current))
  }, [])

  const goToPage = useCallback(
    (newPage: number) => {
      const pageNumber = Math.max(1, Math.min(newPage, totalPages))
      setPage(pageNumber)
    },
    [totalPages],
  )

  const changePageSize = useCallback(
    (newPageSize: number) => {
      setPageSize(newPageSize)
      // Adjust current page if needed
      setPage((current) => {
        const newTotalPages = Math.ceil(totalItems / newPageSize)
        return current > newTotalPages ? newTotalPages : current
      })
    },
    [totalItems],
  )

  // Calculate pagination metadata
  const metadata = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

    return {
      currentPage: page,
      pageSize,
      totalPages,
      totalItems,
      startIndex,
      endIndex,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    }
  }, [page, pageSize, totalItems, totalPages])

  return {
    ...metadata,
    nextPage,
    prevPage,
    goToPage,
    setPageSize: changePageSize,
  }
}

