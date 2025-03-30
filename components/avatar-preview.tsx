"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Share2, Rotate3D } from "lucide-react"
import type { AvatarCustomization } from "@/data/avatar-system"
import { motion } from "framer-motion"

interface AvatarPreviewProps {
  customization: AvatarCustomization
  username?: string
  tier?: { name: string; color: string }
  showControls?: boolean
  size?: "sm" | "md" | "lg" | "xl"
  onAvatarRendered?: (url: string) => void
  interactive?: boolean
}

export function AvatarPreview({
  customization,
  username,
  tier,
  showControls = false,
  size = "md",
  onAvatarRendered,
  interactive = false,
}: AvatarPreviewProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>("/assets/avatars/loading-avatar.png")
  const [isRotating, setIsRotating] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const avatarRef = useRef<HTMLImageElement>(null)

  // Size classes based on the size prop
  const sizeClasses = {
    sm: "h-32 w-32",
    md: "h-48 w-48",
    lg: "h-64 w-64",
    xl: "h-80 w-80",
  }

  useEffect(() => {
    // Generate a more detailed avatar preview based on customization
    const bodyType = customization.body?.split("-")[1] || "001"
    const hairType = customization.hair?.split("-")[1] || "001"
    const outfitType = customization.outfit?.split("-")[1] || "001"
    const skinTone = customization.skin?.split("-")[1] || "001"
    const facialHair = customization.facial_hair?.split("-")[1] || "001"
    const accessory = customization.accessories?.split("-")[1] || "001"
    const background = customization.background?.split("-")[1] || "001"
    const eyes = customization.eyes?.split("-")[1] || "001"

    // Use a reliable placeholder that will definitely work
    const newAvatarUrl = `/placeholder.svg?height=400&width=400&text=Avatar+${bodyType}+${hairType}+${outfitType}`

    setIsLoading(true)
    setAvatarUrl(newAvatarUrl)

    // Call the callback if provided
    if (onAvatarRendered) {
      onAvatarRendered(newAvatarUrl)
    }

    // Simulate loading of the avatar
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [customization, onAvatarRendered])

  // Handle 3D rotation effect
  useEffect(() => {
    if (isRotating) {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 5) % 360)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isRotating])

  const toggleRotation = () => {
    setIsRotating(!isRotating)
  }

  const handleDownload = () => {
    if (canvasRef.current && avatarRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Set canvas dimensions
        canvas.width = avatarRef.current.width
        canvas.height = avatarRef.current.height

        // Draw the avatar image
        ctx.drawImage(avatarRef.current, 0, 0)

        // Add username and tier if provided
        if (username) {
          ctx.font = "bold 20px Arial"
          ctx.fillStyle = "white"
          ctx.textAlign = "center"
          ctx.fillText(username, canvas.width / 2, canvas.height - 30)

          if (tier) {
            ctx.font = "16px Arial"
            ctx.fillStyle = tier.color
            ctx.fillText(tier.name, canvas.width / 2, canvas.height - 10)
          }
        }

        // Convert to data URL and trigger download
        const dataUrl = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.download = `${username || "avatar"}-2d2n.png`
        link.href = dataUrl
        link.click()
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClasses[size]} mb-2 overflow-hidden rounded-lg`}>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            <span className="text-muted-foreground">Rendering...</span>
          </div>
        ) : (
          <motion.div animate={{ rotateY: isRotating ? rotation : 0 }} className="w-full h-full">
            <img
              ref={avatarRef}
              src={avatarUrl || "/placeholder.svg?height=400&width=400&text=Avatar"}
              alt="Avatar Preview"
              className="w-full h-full object-cover rounded-lg"
              onLoad={() => setIsLoading(false)}
              onError={(e) => {
                // If image fails to load, replace with a placeholder
                e.currentTarget.src = `/placeholder.svg?height=400&width=400&text=Avatar`
                setIsLoading(false)
              }}
            />
          </motion.div>
        )}

        {/* Overlay for tier badge if provided */}
        {tier && (
          <div className="absolute bottom-2 right-2">
            <Badge className="text-white" style={{ backgroundColor: tier.color }}>
              {tier.name}
            </Badge>
          </div>
        )}

        {/* Hidden canvas for download functionality */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {username && (
        <div className="mt-2 text-center">
          <h3 className="font-medium">{username}</h3>
          {tier && (
            <span className="text-sm px-2 py-0.5 rounded-full" style={{ backgroundColor: tier.color, color: "white" }}>
              {tier.name}
            </span>
          )}
        </div>
      )}

      {showControls && (
        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={toggleRotation}>
            <Rotate3D className="h-4 w-4 mr-2" />
            {isRotating ? "Stop" : "3D View"}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      )}
    </div>
  )
}

