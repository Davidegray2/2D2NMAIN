import { Skeleton } from "@/components/ui/skeleton"

export default function BattleStatsLoading() {
  return (
    <div className="container py-8">
      <div className="mb-6">
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Skeleton className="h-[400px] w-full rounded-lg" />
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>

      <Skeleton className="h-10 w-full max-w-md mb-6" />
      <Skeleton className="h-[300px] w-full rounded-lg" />
    </div>
  )
}

