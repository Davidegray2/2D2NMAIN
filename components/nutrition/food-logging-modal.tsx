"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface FoodLoggingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FoodLoggingModal({ open, onOpenChange }: FoodLoggingModalProps) {
  const commonFoods = [
    { name: "Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: "Brown Rice (100g, cooked)", calories: 112, protein: 2.6, carbs: 23, fat: 0.9 },
    { name: "Broccoli (100g)", calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
    { name: "Salmon (100g)", calories: 206, protein: 22, carbs: 0, fat: 13 },
    { name: "Greek Yogurt (100g)", calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    { name: "Banana (medium)", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { name: "Egg (large)", calories: 72, protein: 6.3, carbs: 0.4, fat: 5 },
    { name: "Avocado (half)", calories: 161, protein: 2, carbs: 8.5, fat: 15 },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Log Food</DialogTitle>
          <DialogDescription>Track your nutrition by logging what you eat and drink.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="meal-type">Meal Type</Label>
            <Select defaultValue="breakfast">
              <SelectTrigger id="meal-type">
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="search">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="recent">Recent & Common</TabsTrigger>
            </TabsList>
            <TabsContent value="search" className="space-y-4">
              <div className="relative mt-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search for a food..." className="pl-8" />
              </div>
              <p className="text-sm text-muted-foreground text-center py-4">Type to search for foods in our database</p>
            </TabsContent>
            <TabsContent value="recent">
              <div className="space-y-2 mt-4">
                {commonFoods.map((food, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{food.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {food.calories} cal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

