import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function CreateWorkoutLoading() {
  return (
    <div className="container py-6 max-w-4xl">
      <Skeleton className="h-10 w-64 mb-6" />

      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-5 w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  )
}

