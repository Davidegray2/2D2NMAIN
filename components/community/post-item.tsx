"use client"

import { useState, useCallback, memo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageSquare, UserPlus, UserCheck } from "lucide-react"
import { SocialShare } from "@/components/social-share"

export type PostComment = {
  id: number
  author: string
  text: string
  time: string
}

export type PostAuthor = {
  name: string
  username?: string
  avatar: string
  bio: string
  status?: string
  stats: {
    workouts: number
    followers: number
    following: number
  }
}

export type Post = {
  id: number
  author: PostAuthor
  content: string
  image: string | null
  likes: number
  comments: number
  time: string
}

type PostItemProps = {
  post: Post
  comments?: PostComment[]
  isLiked: boolean
  onLike: (postId: number) => void
  onComment: (postId: number, comment: string) => void
  onToggleComments: (postId: number) => void
  onAddSpotter: (userName: string) => void
  showComments: boolean
  addedSpotters: string[]
  onViewProfile: (username: string) => void
}

// Memoized comment component for better performance
const Comment = memo(({ comment }: { comment: PostComment }) => (
  <div className="flex gap-2">
    <Avatar className="h-8 w-8">
      <AvatarFallback>{comment.author[0]}</AvatarFallback>
    </Avatar>
    <div className="bg-muted p-2 rounded-md flex-1">
      <div className="flex justify-between">
        <span className="font-medium text-sm">{comment.author}</span>
        <span className="text-xs text-muted-foreground">{comment.time}</span>
      </div>
      <p className="text-sm mt-1">{comment.text}</p>
    </div>
  </div>
))

Comment.displayName = "Comment"

// Memoized post item component to prevent unnecessary re-renders
export const PostItem = memo(function PostItem({
  post,
  comments = [],
  isLiked,
  onLike,
  onComment,
  onToggleComments,
  onAddSpotter,
  showComments,
  addedSpotters,
  onViewProfile,
}: PostItemProps) {
  const [commentText, setCommentText] = useState("")

  const handleAddComment = useCallback(() => {
    if (commentText.trim()) {
      onComment(post.id, commentText)
      setCommentText("")
    }
  }, [commentText, post.id, onComment])

  const handleLike = useCallback(() => {
    onLike(post.id)
  }, [post.id, onLike])

  const handleToggleComments = useCallback(() => {
    onToggleComments(post.id)
  }, [post.id, onToggleComments])

  const handleAddSpotter = useCallback(() => {
    onAddSpotter(post.author.name)
  }, [post.author.name, onAddSpotter])

  const handleViewProfile = useCallback(() => {
    onViewProfile(post.author.username || post.author.name)
  }, [post.author.username, post.author.name, onViewProfile])

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleViewProfile}
          >
            <Avatar>
              <AvatarImage src={post.author.avatar || "/placeholder.svg?height=40&width=40"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-primary hover:underline">{post.author.name}</div>
              <div className="text-xs text-muted-foreground">{post.time}</div>
            </div>
          </div>

          <Button
            variant={addedSpotters.includes(post.author.name) ? "secondary" : "outline"}
            size="sm"
            className="gap-1"
            onClick={handleAddSpotter}
            disabled={addedSpotters.includes(post.author.name)}
            aria-label={addedSpotters.includes(post.author.name) ? "Spotter Added" : "Add Spotter"}
          >
            {addedSpotters.includes(post.author.name) ? (
              <>
                <UserCheck className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only md:not-sr-only">Spotter Added</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only md:not-sr-only">Add Spotter</span>
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p>{post.content}</p>
        {post.image && (
          <div className="mt-3">
            <img
              src={post.image || "/placeholder.svg?height=400&width=600"}
              alt="Post content"
              className="rounded-md w-full object-cover max-h-[400px]"
              loading="lazy"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex gap-6 w-full">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1 ${isLiked ? "text-red-500" : ""}`}
            onClick={handleLike}
            aria-label={isLiked ? "Unlike post" : "Like post"}
            aria-pressed={isLiked}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} aria-hidden="true" />
            <span>{isLiked ? post.likes + 1 : post.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={handleToggleComments}
            aria-label="View comments"
            aria-expanded={showComments}
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            <span>{comments.length}</span>
          </Button>
          <SocialShare
            variant="icon-button"
            size="sm"
            title={`${post.author.name}'s fitness update on 2D2N`}
            description={post.content}
            imageUrl={post.image || ""}
          />
        </div>

        {showComments && (
          <div className="w-full mt-4 space-y-4">
            <div className="space-y-3">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>

            <div className="flex gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>YN</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Write a comment..."
                  className="min-h-[60px] text-sm"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  aria-label="Comment text"
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" onClick={handleAddComment} disabled={!commentText.trim()}>
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
})

