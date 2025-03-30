"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Flag, AlertTriangle, MessageSquare } from "lucide-react"
import Link from "next/link"

interface HypeComment {
  id: number
  user: {
    name: string
    avatar: string
    tier: string
  }
  comment: string
  likes: number
  timeAgo: string
}

interface HypeCommentsProps {
  transformationId: number
  comments: HypeComment[]
}

export function HypeComments({ transformationId, comments: initialComments }: HypeCommentsProps) {
  const [comments, setComments] = useState<HypeComment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [likedComments, setLikedComments] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [commentError, setCommentError] = useState<string | null>(null)

  const handleAddComment = () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    // Check for negative language (this is a simple example - in a real app you'd use a more sophisticated approach)
    const negativeWords = ["hate", "ugly", "terrible", "awful", "stupid", "bad", "worst", "sucks", "pathetic"]
    const hasNegativeLanguage = negativeWords.some((word) => newComment.toLowerCase().includes(word))

    if (hasNegativeLanguage) {
      setCommentError(
        "Your comment appears to contain negative language. Please keep all comments positive and supportive.",
      )
      setIsSubmitting(false)
      return
    }

    // Simulate a small delay to mimic API call
    setTimeout(() => {
      const comment: HypeComment = {
        id: Date.now(),
        user: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
          tier: "Elite",
        },
        comment: newComment,
        likes: 0,
        timeAgo: "Just now",
      }

      setComments([comment, ...comments])
      setNewComment("")
      setCommentError(null)
      setIsSubmitting(false)
    }, 500)
  }

  const handleLikeComment = (commentId: number) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter((id) => id !== commentId))
      setComments(
        comments.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes - 1 } : comment)),
      )
    } else {
      setLikedComments([...likedComments, commentId])
      setComments(
        comments.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
      )
    }
  }

  return (
    <div className="space-y-6" id="comments">
      <h3 className="text-xl font-bold flex items-center">
        <MessageSquare className="h-5 w-5 mr-2" />
        Hype Comments ({comments.length})
      </h3>

      <Alert className="bg-primary/10 border-primary/20">
        <AlertTriangle className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          <strong>Positivity Only Zone:</strong> Please keep all comments supportive and encouraging. Negative or
          critical comments will be removed, and repeat offenders may lose commenting privileges.
        </AlertDescription>
      </Alert>

      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback>YO</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Leave some positive hype! Remember, this is a supportive space..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={`resize-none ${commentError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          />
          {commentError && <p className="text-red-500 text-sm">{commentError}</p>}
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              <Heart className="h-3 w-3 inline mr-1" /> Keep it positive and supportive!
            </p>
            <Button onClick={handleAddComment} disabled={!newComment.trim() || isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Be the first to leave a supportive comment!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 rounded-lg bg-muted/30">
              <Link
                href={`/profile/${comment.user.name.toLowerCase().replace(/ /g, "-")}`}
                className="flex-shrink-0 hover:opacity-80 transition-opacity"
                title={`View ${comment.user.name}'s profile`}
              >
                <Avatar>
                  <AvatarImage src={comment.user.avatar || "/images/avatars/default.jpg"} />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/profile/${comment.user.name.toLowerCase().replace(/ /g, "-")}`}
                    className="font-medium hover:text-primary transition-colors"
                    title={`View ${comment.user.name}'s profile`}
                  >
                    {comment.user.name}
                  </Link>
                  <Badge variant="outline" className="text-xs">
                    {comment.user.tier}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                </div>
                <p className="mt-1">{comment.comment}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-2 ${likedComments.includes(comment.id) ? "text-red-500" : ""}`}
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <Heart className={`h-4 w-4 ${likedComments.includes(comment.id) ? "fill-current" : ""}`} />
                    <span>{comment.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

