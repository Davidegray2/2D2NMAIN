import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TrainerProfileLoading() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <Skeleton className="w-full aspect-square rounded-lg" />
            </div>

            <div className="w-full md:w-2/3">
              <Skeleton className="h-10 w-[250px] mb-2" />
              <Skeleton className="h-4 w-[200px] mb-3" />
              <Skeleton className="h-4 w-[150px] mb-4" />

              <div className="flex flex-wrap gap-2 mb-4">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-6 w-[120px]" />
              </div>

              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />

              <div className="flex flex-col sm:flex-row gap-3">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </div>
          </div>

          <Skeleton className="h-10 w-[400px] mb-6" />

          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-[200px] mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div>
              <Skeleton className="h-8 w-[200px] mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[150px] mb-2" />
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-[180px]" />
              <Skeleton className="h-6 w-[100px] mb-2" />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-[120px]" />
                  <Skeleton className="h-6 w-[120px]" />
                </div>
              </div>

              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

