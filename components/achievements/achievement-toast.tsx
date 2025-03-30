"use client"

import { useState, useEffect } from "react"
import { Trophy, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function AchievementToast() {
  const [show, setShow] = useState(false)
  const [achievement, setAchievement] = useState({
    title: "Consistency Champion",
    description: "Logged in for 7 consecutive days",
    points: 50,
  })

  // Simulate achievement unlock after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)

      // Auto-hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setShow(false)
      }, 5000)

      return () => clearTimeout(hideTimer)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm"
        >
          <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-lg shadow-lg p-4 flex gap-4">
            <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <Trophy className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm">Achievement Unlocked!</h4>
                  <p className="font-medium">{achievement.title}</p>
                </div>
                <button onClick={() => setShow(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
              <div className="mt-2 text-sm font-medium text-yellow-500">+{achievement.points} XP</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

