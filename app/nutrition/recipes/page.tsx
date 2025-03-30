import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Filter, Search } from "lucide-react"
import Link from "next/link"

export default function RecipesPage() {
  const categories = [
    "All Recipes",
    "Weight Loss",
    "Muscle Building",
    "High Protein",
    "Low Carb",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Quick & Easy",
  ]

  const recipes = [
    {
      id: "protein-packed-breakfast-bowl",
      name: "Protein-Packed Breakfast Bowl",
      category: "High Protein",
      tags: ["Breakfast", "Muscle Building", "Quick & Easy"],
      calories: 420,
      protein: 32,
      carbs: 35,
      fat: 18,
      time: "15 min",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Easy",
    },
    {
      id: "grilled-chicken-salad",
      name: "Grilled Chicken Salad",
      category: "Weight Loss",
      tags: ["Lunch", "High Protein", "Low Carb"],
      calories: 380,
      protein: 35,
      carbs: 12,
      fat: 22,
      time: "20 min",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Easy",
    },
    {
      id: "salmon-with-roasted-vegetables",
      name: "Salmon with Roasted Vegetables",
      category: "Muscle Building",
      tags: ["Dinner", "High Protein", "Gluten-Free"],
      calories: 450,
      protein: 40,
      carbs: 25,
      fat: 22,
      time: "30 min",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Medium",
    },
    {
      id: "greek-yogurt-parfait",
      name: "Greek Yogurt Parfait",
      category: "Weight Loss",
      tags: ["Breakfast", "Snack", "Vegetarian"],
      calories: 220,
      protein: 18,
      carbs: 28,
      fat: 5,
      time: "5 min",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Easy",
    },
    {
      id: "turkey-sweet-potato-skillet",
      name: "Turkey and Sweet Potato Skillet",
      category: "Muscle Building",
      tags: ["Lunch", "Dinner", "High Protein"],
      calories: 410,
      protein: 38,
      carbs: 30,
      fat: 15,
      time: "25 min",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Medium",
    },
    {
      id: "vegan-protein-smoothie-bowl",
      name: "Vegan Protein Smoothie Bowl",
      category: "Vegan",
      tags: ["Breakfast", "High Protein", "Quick & Easy"],
      calories: 350,
      protein: 25,
      carbs: 45,
      fat: 10,
      time: "10 min",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Easy",
    },
    {
      id: "cauliflower-rice-stir-fry",
      name: "Cauliflower Rice Stir Fry",
      category: "Low Carb",
      tags: ["Dinner", "Vegetarian", "Gluten-Free"],
      calories: 280,
      protein: 15,
      carbs: 18,
      fat: 16,
      time: "20 min",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Medium",
    },
    {
      id: "protein-pancakes",
      name: "Protein Pancakes",
      category: "Muscle Building",
      tags: ["Breakfast", "High Protein", "Vegetarian"],
      calories: 380,
      protein: 30,
      carbs: 40,
      fat: 12,
      time: "15 min",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Easy",
    },
    {
      id: "quinoa-black-bean-bowl",
      name: "Quinoa and Black Bean Bowl",
      category: "Vegan",
      tags: ["Lunch", "High Protein", "Gluten-Free"],
      calories: 420,
      protein: 18,
      carbs: 65,
      fat: 10,
      time: "25 min",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Easy",
    },
    {
      id: "zucchini-noodles-turkey-meatballs",
      name: "Zucchini Noodles with Turkey Meatballs",
      category: "Low Carb",
      tags: ["Dinner", "High Protein", "Gluten-Free"],
      calories: 350,
      protein: 35,
      carbs: 15,
      fat: 18,
      time: "30 min",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Medium",
    },
    {
      id: "egg-white-vegetable-omelette",
      name: "Egg White and Vegetable Omelette",
      category: "Weight Loss",
      tags: ["Breakfast", "High Protein", "Low Carb"],
      calories: 250,
      protein: 28,
      carbs: 8,
      fat: 12,
      time: "15 min",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Easy",
    },
    {
      id: "baked-chicken-sweet-potato",
      name: "Baked Chicken and Sweet Potato",
      category: "Muscle Building",
      tags: ["Dinner", "High Protein", "Gluten-Free"],
      calories: 480,
      protein: 45,
      carbs: 35,
      fat: 16,
      time: "45 min",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Medium",
    },
  ]

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Recipe Catalog</h1>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search recipes..." className="pl-8" />
        </div>
        <Button variant="outline" className="gap-2 whitespace-nowrap">
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>
      </div>

      <Tabs defaultValue="All Recipes" className="mb-8">
        <TabsList className="mb-6 flex flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="mb-1">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes
                .filter(
                  (recipe) =>
                    category === "All Recipes" || recipe.category === category || recipe.tags.includes(category),
                )
                .map((recipe, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-video w-full">
                      <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        <Badge variant="outline">{recipe.category}</Badge>
                        <Badge variant="secondary">{recipe.difficulty}</Badge>
                      </div>
                      <h3 className="font-medium mb-2">{recipe.name}</h3>
                      <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                        <div className="text-center p-1 bg-muted rounded-md">
                          <div className="font-medium">{recipe.calories}</div>
                          <div className="text-xs text-muted-foreground">kcal</div>
                        </div>
                        <div className="text-center p-1 bg-muted rounded-md">
                          <div className="font-medium">{recipe.protein}g</div>
                          <div className="text-xs text-muted-foreground">protein</div>
                        </div>
                        <div className="text-center p-1 bg-muted rounded-md">
                          <div className="font-medium">{recipe.time}</div>
                          <div className="text-xs text-muted-foreground">time</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {recipe.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link href={`/nutrition/recipes/${recipe.id}`} className="w-full">
                        <Button className="w-full">View Recipe</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-primary/10 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Need a Custom Meal Plan?</h2>
        <p className="mb-4 max-w-2xl mx-auto">
          Get a personalized meal plan tailored to your fitness goals, dietary preferences, and calorie needs.
        </p>
        <Button size="lg">Create Custom Meal Plan</Button>
      </div>
    </div>
  )
}

