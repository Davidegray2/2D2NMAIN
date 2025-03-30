import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function TrainersLoading() {
  return (
    <div className="container py-8">
      <div className="text-center mb-10">
        <Skeleton className="h-10 w-[300px] mx-auto mb-2" />
        <Skeleton className="h-4 w-[500px] mx-auto" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-10 w-[400px] mb-6" />
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Skeleton className="h-10 flex-1" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="w-full h-64" />
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-[200px] mb-2" />
                <Skeleton className="h-4 w-[150px]" />
              </CardHeader>
              <CardContent className="pb-2">
                <Skeleton className="h-4 w-[120px] mb-3" />
                <div className="flex flex-wrap gap-2 mb-4">
                  <Skeleton className="h-6 w-[80px]" />
                  <Skeleton className="h-6 w-[100px]" />
                  <Skeleton className="h-6 w-[90px]" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-[180px] mb-2" />
                <Skeleton className="h-6 w-[100px]" />
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

