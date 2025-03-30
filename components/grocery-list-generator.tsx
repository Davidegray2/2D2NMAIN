"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Printer, Download, Plus, Minus } from "lucide-react"
import { recipes, type Recipe, generateGroceryList } from "@/data/nutrition-library"

export function GroceryListGenerator() {
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([])
  const [groceryList, setGroceryList] = useState<Record<string, string[]>>({})
  const [servings, setServings] = useState<Record<string, number>>({})
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  // Initialize servings when recipes are selected
  useEffect(() => {
    const initialServings: Record<string, number> = {}
    selectedRecipes.forEach((recipe) => {
      if (!initialServings[recipe.id]) {
        initialServings[recipe.id] = 1
      }
    })
    setServings(initialServings)
  }, [selectedRecipes])

  // Generate grocery list when recipes or servings change
  useEffect(() => {
    if (selectedRecipes.length > 0) {
      // Adjust recipes based on servings
      const adjustedRecipes = selectedRecipes.map((recipe) => {
        const servingMultiplier = servings[recipe.id] || 1

        // Create a deep copy of the recipe
        const adjustedRecipe = { ...recipe }

        // Adjust ingredient amounts based on servings
        adjustedRecipe.ingredients = recipe.ingredients.map((ingredient) => {
          // Simple multiplication of numeric values in the amount string
          const originalAmount = ingredient.amount
          let adjustedAmount = originalAmount

          // Extract numeric value if present
          const numericMatch = originalAmount.match(/^(\d+(\.\d+)?)/)
          if (numericMatch && numericMatch[1]) {
            const numericValue = Number.parseFloat(numericMatch[1])
            const adjustedValue = (numericValue * servingMultiplier).toFixed(1).replace(/\.0$/, "")
            adjustedAmount = originalAmount.replace(numericMatch[1], adjustedValue)
          }

          return {
            ...ingredient,
            amount: adjustedAmount,
          }
        })

        return adjustedRecipe
      })

      setGroceryList(generateGroceryList(adjustedRecipes))
    } else {
      setGroceryList({})
    }
  }, [selectedRecipes, servings])

  const handleRecipeToggle = (recipe: Recipe) => {
    setSelectedRecipes((prev) => {
      const isSelected = prev.some((r) => r.id === recipe.id)
      if (isSelected) {
        return prev.filter((r) => r.id !== recipe.id)
      } else {
        return [...prev, recipe]
      }
    })
  }

  const handleServingChange = (recipeId: string, increment: number) => {
    setServings((prev) => {
      const currentServings = prev[recipeId] || 1
      const newServings = Math.max(1, currentServings + increment)
      return { ...prev, [recipeId]: newServings }
    })
  }

  const handleItemCheck = (category: string, item: string) => {
    const itemKey = `${category}-${item}`
    setCheckedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }))
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    let content = "2D2N Fitness - Grocery List\n\n"

    Object.entries(groceryList).forEach(([category, items]) => {
      content += `${category}:\n`
      items.forEach((item) => {
        content += `- ${item}\n`
      })
      content += "\n"
    })

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "2d2n-grocery-list.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Recipes</CardTitle>
          <CardDescription>Choose recipes to generate your grocery list</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="flex items-start space-x-3 pb-3 border-b">
                  <Checkbox
                    id={recipe.id}
                    checked={selectedRecipes.some((r) => r.id === recipe.id)}
                    onCheckedChange={() => handleRecipeToggle(recipe)}
                  />
                  <div className="grid gap-1.5 w-full">
                    <Label htmlFor={recipe.id} className="font-medium cursor-pointer">
                      {recipe.name}
                    </Label>
                    <div className="text-sm text-muted-foreground">
                      {recipe.category} • {recipe.calories} kcal • {recipe.prepTime + recipe.cookTime} total
                    </div>

                    {selectedRecipes.some((r) => r.id === recipe.id) && (
                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleServingChange(recipe.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2 text-sm">
                          {servings[recipe.id] || 1} {servings[recipe.id] === 1 ? "serving" : "servings"}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleServingChange(recipe.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Grocery List</CardTitle>
              <CardDescription>Based on your selected recipes</CardDescription>
            </div>
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          {Object.keys(groceryList).length > 0 ? (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                {Object.entries(groceryList).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="font-medium mb-2">{category}</h3>
                    <div className="space-y-2">
                      {items.map((item, index) => {
                        const itemKey = `${category}-${item}`
                        return (
                          <div key={index} className="flex items-center space-x-2">
                            <Checkbox
                              id={itemKey}
                              checked={!!checkedItems[itemKey]}
                              onCheckedChange={() => handleItemCheck(category, item)}
                            />
                            <Label
                              htmlFor={itemKey}
                              className={`cursor-pointer ${checkedItems[itemKey] ? "line-through text-muted-foreground" : ""}`}
                            >
                              {item}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                    <Separator className="my-4" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium mb-1">Your grocery list is empty</h3>
              <p className="text-sm text-muted-foreground">Select recipes to generate your grocery list</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrint} disabled={Object.keys(groceryList).length === 0}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button onClick={handleDownload} disabled={Object.keys(groceryList).length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

