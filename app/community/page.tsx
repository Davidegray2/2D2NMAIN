"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Camera, AlertTriangle, Users } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useInView } from "react-intersection-observer"
import { useToast } from "@/hooks/use-toast"
import { ErrorBoundary } from "@/components/error-boundary"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { PostItem, type Post, type PostComment } from "@/components/community/post-item"

export default function CommunityPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [postText, setPostText] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [showComments, setShowComments] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")
  const [addedSpotters, setAddedSpotters] = useState<string[]>([])
  const [isPosting, setIsPosting] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [posts, setPosts] = useState<Post[]>([])

  // Store comments for each post
  const [postComments, setPostComments] = useState<Record<number, PostComment[]>>({})

  // Handle post creation
  const handlePost = useCallback(async () => {
    if (!postText.trim() && !selectedImage) return
    if (!navigator.onLine) {
      toast({
        title: "You're offline",
        description: "Please connect to the internet to create a post.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsPosting(true)

      // Generate a unique ID for the post
      const postId = Date.now()

      // Create the new post
      const newPost: Post = {
        id: postId,
        author: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
          bio: "Your bio",
          stats: { workouts: 0, followers: 0, following: 0 },
        },
        content: postText,
        image: previewImage,
        likes: 0,
        comments: 0,
        time: "Just now",
      }

      // Add the post to the state
      setPosts((prevPosts) => [newPost, ...prevPosts])

      // Initialize empty comments array for this post
      setPostComments((prev) => ({
        ...prev,
        [postId]: [],
      }))

      // Reset form after successful post
      setPostText("")
      setSelectedImage(null)
      setPreviewImage(null)

      toast({
        title: "Post created",
        description: "Your post has been published successfully!",
      })
    } catch (err) {
      console.error("Error creating post:", err)
      toast({
        title: "Failed to create post",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsPosting(false)
    }
  }, [postText, selectedImage, previewImage, toast])

  // Handle image selection
  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: "Please select an image under 5MB",
            variant: "destructive",
          })
          return
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Invalid file type",
            description: "Please select an image file",
            variant: "destructive",
          })
          return
        }

        setSelectedImage(file.name)

        // Create a preview URL for the selected image
        const reader = new FileReader()

        reader.onload = (event) => {
          if (event.target) {
            setPreviewImage(event.target.result as string)
          }
        }

        reader.onerror = () => {
          toast({
            title: "Error reading file",
            description: "There was a problem processing your image. Please try another file.",
            variant: "destructive",
          })
          setSelectedImage(null)
          setPreviewImage(null)
        }

        try {
          reader.readAsDataURL(file)
        } catch (error) {
          console.error("Error reading file:", error)
          toast({
            title: "Error reading file",
            description: "There was a problem processing your image. Please try another file.",
            variant: "destructive",
          })
          setSelectedImage(null)
          setPreviewImage(null)
        }
      }
    },
    [toast],
  )

  // Remove selected image
  const handleRemoveImage = useCallback(() => {
    setSelectedImage(null)
    setPreviewImage(null)
  }, [])

  // Toggle like on a post
  const handleLike = useCallback(
    (postId: number) => {
      setLikedPosts((prev) => {
        if (prev.includes(postId)) {
          return prev.filter((id) => id !== postId)
        } else {
          return [...prev, postId]
        }
      })

      // Update the post's like count
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            const isLiked = likedPosts.includes(postId)
            return {
              ...post,
              likes: isLiked ? post.likes - 1 : post.likes + 1,
            }
          }
          return post
        }),
      )
    },
    [likedPosts],
  )

  // Toggle comments visibility
  const handleCommentToggle = useCallback((postId: number) => {
    setShowComments((prev) => (prev === postId ? null : postId))
    setCommentText("")
  }, [])

  // Add a comment to a post
  const handleAddComment = useCallback(
    (postId: number, text: string) => {
      if (text.trim()) {
        // Create a new comment
        const newComment: PostComment = {
          id: Date.now(),
          author: "You",
          text: text,
          time: "Just now",
        }

        // Add the comment to the post's comments
        setPostComments((prev) => {
          const postCommentsList = prev[postId] || []
          return {
            ...prev,
            [postId]: [...postCommentsList, newComment],
          }
        })

        // Update the post's comment count
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                comments: post.comments + 1,
              }
            }
            return post
          }),
        )

        toast({
          title: "Comment added",
          description: "Your comment has been posted",
        })
      }
    },
    [toast],
  )

  // Add a user as a spotter
  const handleAddSpotter = useCallback(
    (userName: string) => {
      if (!addedSpotters.includes(userName)) {
        setAddedSpotters((prev) => [...prev, userName])

        toast({
          title: "Spotter added",
          description: `${userName} has been added to your spotters`,
        })
      }
    },
    [addedSpotters, toast],
  )

  // Navigate to user profile
  const handleViewProfile = useCallback(
    (username: string) => {
      router.push(`/profile/${username}`)
    },
    [router],
  )

  // Add this effect to detect network connectivity
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      toast({
        title: "You're back online",
        description: "Your connection has been restored.",
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast({
        title: "You're offline",
        description: "Some features may be limited until your connection is restored.",
        variant: "destructive",
      })
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [toast])

  // Intersection observer for infinite scroll (for future implementation)
  const { ref } = useInView({
    threshold: 0.5,
    rootMargin: "100px",
  })

  // Memoize the post creation form to prevent unnecessary re-renders
  const PostCreationForm = useMemo(
    () => (
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-start mb-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
              <AvatarFallback>YN</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share your fitness journey..."
                className="w-full bg-muted p-2 rounded-md min-h-[80px] resize-none"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                aria-label="Post content"
              />

              {previewImage && (
                <div className="relative mt-2">
                  <img
                    src={previewImage || "/placeholder.svg"}
                    alt="Preview"
                    className="rounded-md max-h-[200px] object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 rounded-full"
                    onClick={handleRemoveImage}
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <label>
                    <Camera className="h-4 w-4" />
                    <span>Add Photo</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      aria-label="Upload image"
                    />
                  </label>
                </Button>
                {selectedImage && <span className="text-xs text-muted-foreground">{selectedImage}</span>}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handlePost}
              disabled={(!postText.trim() && !selectedImage) || isPosting}
              aria-label="Create post"
            >
              {isPosting ? "Posting..." : "Post"}
            </Button>
          </div>
        </CardContent>
      </Card>
    ),
    [postText, selectedImage, previewImage, isPosting, handleImageChange, handlePost, handleRemoveImage],
  )

  return (
    <ErrorBoundary>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Community Feed</h1>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Offline alert */}
          {!isOnline && (
            <div className="bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-400 p-4 rounded-md mb-6 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <div>
                <p className="font-medium">You're currently offline</p>
                <p className="text-sm">Some features may be limited until your connection is restored.</p>
              </div>
            </div>
          )}

          {/* Post creation form */}
          <div className={isOnline ? "" : "opacity-70 pointer-events-none"}>{PostCreationForm}</div>

          {/* Empty state */}
          {posts.length === 0 && !isLoading && !error && (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No posts yet</h3>
              <p className="text-muted-foreground mb-4">Be the first to share your fitness journey!</p>
              <Button
                onClick={() => {
                  setPostText("Just completed my workout! 💪")
                  // Scroll to the post creation form and focus on it
                  window.scrollTo({ top: 0, behavior: "smooth" })
                  // Focus on the textarea after a short delay to allow for scrolling
                  setTimeout(() => {
                    const textarea = document.querySelector('textarea[aria-label="Post content"]')
                    if (textarea) {
                      ;(textarea as HTMLTextAreaElement).focus()
                    }
                  }, 500)
                }}
              >
                Create Your First Post
              </Button>
            </div>
          )}

          {/* Posts list */}
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              comments={postComments[post.id] || []}
              isLiked={likedPosts.includes(post.id)}
              onLike={handleLike}
              onComment={(postId, text) => {
                handleAddComment(postId, text)
                setCommentText("")
              }}
              onToggleComments={handleCommentToggle}
              onAddSpotter={handleAddSpotter}
              showComments={showComments === post.id}
              addedSpotters={addedSpotters}
              onViewProfile={handleViewProfile}
            />
          ))}

          {/* Loading indicator */}
          {isLoading && <LoadingSkeleton variant="post" count={2} />}

          {/* Error message */}
          {error && (
            <div className="p-4 text-center text-red-500 bg-red-50 rounded-md">
              {error}
              <Button
                variant="outline"
                className="ml-2"
                onClick={() => {
                  setError(null)
                }}
              >
                Dismiss
              </Button>
            </div>
          )}

          {/* Infinite scroll trigger (for future implementation) */}
          {hasMore && !isLoading && <div ref={ref} className="h-10" />}

          {/* End of feed message */}
          {!hasMore && posts.length > 0 && (
            <div className="text-center text-muted-foreground py-8">You've reached the end of the feed</div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}

