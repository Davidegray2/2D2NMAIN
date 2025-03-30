import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function WorkoutBattleLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-64 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-20 w-20 rounded-full mb-2" />
                  <Skeleton className="h-5 w-20 mb-2" />
                  <Skeleton className="h-8 w-12 mb-2" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="flex flex-col items-center">
                  <Skeleton className="h-20 w-20 rounded-full mb-2" />
                  <Skeleton className="h-5 w-20 mb-2" />
                  <Skeleton className="h-8 w-12 mb-2" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
              <Skeleton className="h-2 w-full mb-4" />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2 mb-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-16 w-full rounded-md" />
                  </div>
                </div>
                <div className="flex items-start gap-2 mb-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-16 w-full rounded-md" />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40 mb-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between mb-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-6 w-32 mx-auto" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-16 w-16 rounded-full mb-2" />
                  <Skeleton className="h-5 w-16 mb-2" />
                  <Skeleton className="h-8 w-10 mb-2" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <div className="flex flex-col items-center">
                  <Skeleton className="h-16 w-16 rounded-full mb-2" />
                  <Skeleton className="h-5 w-16 mb-2" />
                  <Skeleton className="h-8 w-10 mb-2" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
              <Skeleton className="h-2 w-full mb-6" />
              <div className="flex space-x-2 mb-4">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 flex-1" />
              </div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-40 w-full mb-4" />
              <div className="flex space-x-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-36 mb-2" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-8 w-full mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

