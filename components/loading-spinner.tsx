import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  text?: string
}

/**
 * LoadingSpinner - Accessible loading indicator component
 */
export function LoadingSpinner({ size = "md", className, text = "Loading..." }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  }

  return (
    <div
      className={cn("flex flex-col items-center justify-center", className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={cn("animate-spin rounded-full border-solid border-primary border-t-transparent", sizeClasses[size])}
        aria-hidden="true"
      />
      {text && (
        <>
          <span className="sr-only">{text}</span>
          <span className="text-sm text-muted-foreground mt-2" aria-hidden="true">
            {text}
          </span>
        </>
      )}
    </div>
  )
}

