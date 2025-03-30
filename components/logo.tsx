import { Dumbbell } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "full" | "compact"
  className?: string
  linkWrapper?: boolean
}

export function Logo({ variant = "full", className = "", linkWrapper = true }: LogoProps) {
  const LogoContent = () => (
    <div className={cn("flex items-center gap-2 font-bold", className)}>
      <div className="relative">
        <Dumbbell className="h-6 w-6 text-primary animate-pulse-glow" />
        {variant === "compact" && (
          <span className="absolute -top-1 -right-1 text-xs font-black bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            2D2N
          </span>
        )}
      </div>
      {variant === "full" && (
        <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent text-xl whitespace-nowrap font-extrabold tracking-tight">
          2ND2NONE
        </span>
      )}
    </div>
  )

  if (linkWrapper) {
    return (
      <Link href="/">
        <LogoContent />
      </Link>
    )
  }

  return <LogoContent />
}

