import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Flame, Heart, Printer, Share2, Star, Utensils } from "lucide-react"
import Link from "next/link"

interface RecipePageProps {
  params: {
    id: string
  }
}

export default function RecipeDetailPage({ params }: RecipePageProps) {
  // In a real app, you would fetch the recipe data based on the ID
  // For now, we'll just use the ID from the URL and display static content
  const recipeId = params.id

  const recipe = {
    id: recipeId,
    name: getRecipeNameFromId(recipeId),
    category: "High Protein",
    tags: ["Breakfast", "Muscle Building", "Quick & Easy"],
    calories: 420,
    protein: 32,
    carbs: 35,
    fat: 18,
    time: "15 min",
    servings: 1,
    difficulty: "Easy",
    rating: 4.8,
    reviews: 124,
    author: "Sarah Williams",
    image: "/placeholder.svg?height=400&width=800",
    description:
      "Start your day with this nutrient-dense breakfast bowl that's packed with protein to fuel your muscles and complex carbs for sustained energy. Perfect for post-workout mornings!",
    ingredients: [
      "1/2 cup rolled oats",
      "1 cup unsweetened almond milk",
      "1 scoop (25g) vanilla protein powder",
      "1 tablespoon chia seeds",
      "1/2 banana, sliced",
      "1/4 cup blueberries",
      "1 tablespoon almond butter",
      "1 teaspoon honey or maple syrup (optional)",
      "Sprinkle of cinnamon",
    ],
    instructions: [
      "In a small pot, bring almond milk to a gentle simmer over medium heat.",
      "Add rolled oats and reduce heat to low. Cook for about 5 minutes, stirring occasionally, until oats are soft and have absorbed most of the liquid.",
      "Remove from heat and let cool slightly for 1-2 minutes.",
      "Stir in protein powder and chia seeds until well combined.",
      "Transfer to a serving bowl and top with sliced banana, blueberries, and a dollop of almond butter.",
      "Drizzle with honey or maple syrup if desired, and finish with a sprinkle of cinnamon.",
      "Serve immediately while warm.",
    ],
    nutrition: {
      calories: 420,
      protein: 32,
      carbs: 35,
      fat: 18,
      fiber: 8,
      sugar: 12,
      sodium: 220,
    },
    tips: [
      "For meal prep, prepare the oats ahead of time and store in the refrigerator. Reheat and add toppings when ready to eat.",
      "Substitute any fruits based on your preference or what's in season.",
      "For extra protein, add a soft-boiled egg on the side.",
      "Make it vegan by ensuring your protein powder is plant-based and using maple syrup instead of honey.",
    ],
  }

  return (
    <div className="container py-6">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <img
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.name}
            className="w-full rounded-lg object-cover aspect-video"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="outline">{recipe.category}</Badge>
            {recipe.tags.map((tag, i) => (
              <Badge key={i} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>

          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(recipe.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
              />
            ))}
            <span className="text-sm ml-1">
              {recipe.rating} ({recipe.reviews} reviews)
            </span>
          </div>

          <p className="text-muted-foreground mb-6">{recipe.description}</p>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-muted rounded-lg">
              <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">{recipe.time}</div>
              <div className="text-xs text-muted-foreground">Prep Time</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Utensils className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">{recipe.servings}</div>
              <div className="text-xs text-muted-foreground">Servings</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Flame className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">{recipe.calories}</div>
              <div className="text-xs text-muted-foreground">Calories</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium">{recipe.difficulty}</div>
              <div className="text-xs text-muted-foreground">Difficulty</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Button className="gap-2">
              <Heart className="h-4 w-4" />
              Save Recipe
            </Button>
            <Button variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Protein</div>
              <div className="font-medium">{recipe.protein}g</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Carbs</div>
              <div className="font-medium">{recipe.carbs}g</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Fat</div>
              <div className="font-medium">{recipe.fat}g</div>
            </div>
          </div>

          <div className="text-sm">
            <span className="text-muted-foreground">By </span>
            <span className="font-medium">{recipe.author}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="ingredients" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition Facts</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="ingredients">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button>Add All to Shopping List</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructions">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </div>
                    <p>{instruction}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Nutrition Facts</h2>
              <div className="border-b pb-2 mb-4">
                <div className="text-lg font-bold">Amount Per Serving</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <div className="font-bold">Calories</div>
                  <div>{recipe.nutrition.calories}</div>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <div className="font-bold">Total Fat</div>
                  <div>{recipe.nutrition.fat}g</div>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <div className="font-bold">Total Carbohydrates</div>
                  <div>{recipe.nutrition.carbs}g</div>
                </div>
                <div className="flex justify-between border-b pb-2 pl-4">
                  <div>Dietary Fiber</div>
                  <div>{recipe.nutrition.fiber}g</div>
                </div>
                <div className="flex justify-between border-b pb-2 pl-4">
                  <div>Sugars</div>
                  <div>{recipe.nutrition.sugar}g</div>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <div className="font-bold">Protein</div>
                  <div>{recipe.nutrition.protein}g</div>
                </div>
                <div className="flex justify-between pb-2">
                  <div className="font-bold">Sodium</div>
                  <div>{recipe.nutrition.sodium}mg</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower
                depending on your calorie needs.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Chef's Tips</h2>
              <ul className="space-y-3">
                {recipe.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <p>{tip}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Similar Recipes</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { id: "greek-yogurt-parfait", name: "Greek Yogurt Parfait", calories: 220, protein: 18, time: "5 min" },
            { id: "protein-pancakes", name: "Protein Pancakes", calories: 380, protein: 30, time: "15 min" },
            {
              id: "egg-white-vegetable-omelette",
              name: "Egg White Omelette",
              calories: 250,
              protein: 28,
              time: "15 min",
            },
          ].map((similarRecipe, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video w-full">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt={similarRecipe.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2">{recipe.category}</Badge>
                <h3 className="font-medium mb-2">{similarRecipe.name}</h3>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{similarRecipe.calories} kcal</span>
                  <span>{similarRecipe.protein}g protein</span>
                  <span>{similarRecipe.time}</span>
                </div>
                <div className="mt-4">
                  <Link href={`/nutrition/recipes/${similarRecipe.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View Recipe
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-primary/10 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Want More Recipes Like This?</h2>
        <p className="mb-4 max-w-2xl mx-auto">
          Upgrade to our Pro plan for unlimited access to our full recipe library, personalized meal plans, and
          exclusive nutrition guides.
        </p>
        <Button size="lg">Upgrade to Pro</Button>
      </div>
    </div>
  )
}

// Helper function to convert ID to a readable name
function getRecipeNameFromId(id: string): string {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

