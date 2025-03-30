import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <LoadingSpinner size="lg" text="Loading 2ND2NONE..." />
    </div>
  )
}

