"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LazyImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
  fallbackSrc?: string
  loadingClassName?: string
  loadedClassName?: string
}

export function LazyImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  loadingClassName,
  loadedClassName,
  className,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(fallbackSrc)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false)
    setError(false)
    setCurrentSrc(fallbackSrc)

    if (!src) {
      setError(true)
      return
    }

    // Check if the image is already in the browser cache
    const img = new Image()
    img.src = src as string

    if (img.complete) {
      setIsLoaded(true)
      setCurrentSrc(src as string)
    } else {
      img.onload = () => {
        setIsLoaded(true)
        setCurrentSrc(src as string)
      }
      img.onerror = () => {
        setError(true)
        setCurrentSrc(fallbackSrc)
      }
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src, fallbackSrc])

  return (
    <Image
      ref={imageRef}
      src={error ? fallbackSrc : currentSrc}
      alt={alt}
      className={cn(
        className,
        !isLoaded && loadingClassName,
        isLoaded && loadedClassName,
        !isLoaded && "animate-pulse bg-muted",
      )}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        setError(true)
        setCurrentSrc(fallbackSrc)
      }}
      {...props}
    />
  )
}

