"use client"

import { useState } from "react"
import NextImage, { type ImageProps as NextImageProps } from "next/image"
import { cn } from "@/lib/utils"

type ImageProps = {
  fallbackSrc?: string
  alt: string
  className?: string
  wrapperClassName?: string
  showLoader?: boolean
} & Omit<NextImageProps, "alt">

export function Image({
  src,
  alt,
  fallbackSrc = "/placeholder.svg?height=400&width=400",
  className,
  wrapperClassName,
  showLoader = true,
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setError(true)
  }

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {isLoading && showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <span className="sr-only">Loading image</span>
        </div>
      )}
      <NextImage
        src={error ? fallbackSrc : src}
        alt={alt}
        className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100", className)}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}

