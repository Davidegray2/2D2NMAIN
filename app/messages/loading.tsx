import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function MessagesLoading() {
  return (
    <div className="container py-6">
      <Skeleton className="h-10 w-48 mb-6" />

      <Card className="grid md:grid-cols-3 h-[calc(100vh-200px)]">
        <div className="md:col-span-1 border-r p-4 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />

          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col h-full p-4">
          <div className="flex-1 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                {i % 2 === 0 && <Skeleton className="h-10 w-10 rounded-full mr-2" />}
                <Skeleton className={`h-16 ${i % 2 === 0 ? "w-64" : "w-48"} rounded-lg`} />
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        </div>
      </Card>
    </div>
  )
}

