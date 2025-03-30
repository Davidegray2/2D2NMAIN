import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Logo } from "@/components/logo"

export default function PlatformApplicationLoading() {
  return (
    <div className="container py-6">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="mb-4">
          <Logo variant="compact" className="text-3xl" />
        </div>
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-72 mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-lg" />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Skeleton className="h-64 w-full rounded-lg" />
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-2 w-full mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Skeleton className="h-6 w-32" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Skeleton className="h-8 w-64 mb-6" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="mb-2">
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg p-6">
            <Skeleton className="h-8 w-64 mx-auto mb-2" />
            <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-4" />
            <Skeleton className="h-10 w-40 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}

