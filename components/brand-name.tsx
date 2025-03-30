import { cn } from "@/lib/utils"

interface BrandNameProps {
  className?: string
}

export function BrandName({ className }: BrandNameProps) {
  return (
    <span className={cn("font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent", className)}>
      2ND2NONE
    </span>
  )
}

