"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"
import type { AvatarItem } from "@/data/avatar-system"
import { motion } from "framer-motion"

interface AvatarItemPreviewProps {
  item: AvatarItem | null
  isLocked?: boolean
  requiredTier?: string
}

export function AvatarItemPreview({ item, isLocked = false, requiredTier }: AvatarItemPreviewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (item) {
      setIsLoading(true)
      // Simulate loading time for the image
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [item])

  if (!item) {
    return (
      <Card className="w-full h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground">Select an item to preview</p>
      </Card>
    )
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
        <motion.div
          className="relative aspect-square w-full"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="animate-pulse h-4 w-4 rounded-full bg-muted-foreground"></div>
            </div>
          ) : (
            <>
              <img
                src={item.imageUrl || `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(item.name)}`}
                alt={item.name}
                className="w-full h-full object-cover"
                onLoad={() => setIsLoading(false)}
                onError={(e) => {
                  // If image fails to load, replace with a placeholder
                  e.currentTarget.src = `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(item.name)}`
                  setIsLoading(false)
                }}
              />
              {isLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                  <Lock className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-center text-muted-foreground">Unlock at {requiredTier} tier</p>
                </div>
              )}
              {isHovered && item.description && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm">{item.description}</p>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
        <div className="p-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">{item.name}</h3>
            {item.isExclusive && (
              <Badge variant="secondary" className="ml-2">
                Exclusive
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

