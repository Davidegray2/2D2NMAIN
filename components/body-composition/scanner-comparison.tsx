import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Crown, Check } from "lucide-react"

export default function ScannerComparison() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Trophy className="h-5 w-5 text-purple-500" />
          <CardTitle className="text-base">Warrior Tier Scanner</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span>Basic body composition metrics</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span>Body fat percentage analysis</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span>Muscle mass tracking</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span>Basic progress tracking</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10">
        <CardHeader className="flex flex-row items-center gap-2">
          <Crown className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-base">Legend Tier Enhanced Scanner</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center">
                <Check className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              </div>
              <span>All Warrior tier features</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center">
                <Check className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              </div>
              <span>3D body modeling</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center">
                <Check className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              </div>
              <span>Advanced trend analysis</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center">
                <Check className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              </div>
              <span>Personalized recommendations</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center">
                <Check className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              </div>
              <span>Muscle balance assessment</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center">
                <Check className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              </div>
              <span>Unlimited scan history</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

