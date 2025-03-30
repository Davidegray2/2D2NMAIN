import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SavageStrengthLoading() {
  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-10 rounded-full mr-2" />
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <Skeleton className="aspect-video w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-4" />

              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>

          <Skeleton className="h-8 w-48 mb-4" />

          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <div className="flex flex-col md:flex-row">
                  <Skeleton className="h-48 md:h-auto md:w-1/3 aspect-video md:aspect-square" />
                  <div className="p-4 md:w-2/3">
                    <Skeleton className="h-6 w-48 mb-4" />
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div>
                        <Skeleton className="h-3 w-10 mb-2" />
                        <Skeleton className="h-5 w-8" />
                      </div>
                      <div>
                        <Skeleton className="h-3 w-10 mb-2" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <div>
                        <Skeleton className="h-3 w-10 mb-2" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-3 w-20 mb-2" />
                    <div className="flex gap-1">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full mb-4" />
              <Skeleton className="h-16 w-full mb-4" />
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-16 w-full mb-4" />
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

