export type Recipe = {
  id: string
  name: string
  category: string
  tags: string[]
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  sugar?: number
  servings: number
  prepTime: string
  cookTime: string
  difficulty: "easy" | "medium" | "hard"
  ingredients: {
    name: string
    amount: string
    category?: string // For grocery list categorization
  }[]
  instructions: string[]
  imageUrl: string
  nutritionTips?: string[]
  mealType: string[]
  dietaryRestrictions: string[]
  workoutPairing?: {
    recommendedFor: string[]
    intensity: "light" | "moderate" | "intense"
  }
}

export const recipes: Recipe[] = [
  // High protein recipes
  {
    id: "recipe-001",
    name: "Protein-Packed Breakfast Bowl",
    category: "Breakfast",
    tags: ["High Protein", "Muscle Building", "Quick & Easy"],
    calories: 420,
    protein: 32,
    carbs: 35,
    fat: 18,
    fiber: 8,
    sugar: 12,
    servings: 1,
    prepTime: "10 min",
    cookTime: "5 min",
    difficulty: "easy",
    ingredients: [
      { name: "Rolled oats", amount: "1/2 cup", category: "Grains" },
      { name: "Unsweetened almond milk", amount: "1 cup", category: "Dairy & Alternatives" },
      { name: "Vanilla protein powder", amount: "1 scoop (25g)", category: "Supplements" },
      { name: "Chia seeds", amount: "1 tbsp", category: "Baking & Spices" },
      { name: "Banana", amount: "1/2", category: "Fruits" },
      { name: "Blueberries", amount: "1/4 cup", category: "Fruits" },
      { name: "Almond butter", amount: "1 tbsp", category: "Nuts & Seeds" },
      { name: "Honey", amount: "1 tsp (optional)", category: "Baking & Spices" },
      { name: "Cinnamon", amount: "1 pinch", category: "Baking & Spices" },
    ],
    instructions: [
      "In a small pot, bring almond milk to a gentle simmer over medium heat.",
      "Add rolled oats and reduce heat to low. Cook for about 5 minutes, stirring occasionally, until oats are soft and have absorbed most of the liquid.",
      "Remove from heat and let cool slightly for 1-2 minutes.",
      "Stir in protein powder and chia seeds until well combined.",
      "Transfer to a serving bowl and top with sliced banana, blueberries, and a dollop of almond butter.",
      "Drizzle with honey if desired, and finish with a sprinkle of cinnamon.",
      "Serve immediately while warm.",
    ],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Protein+Breakfast+Bowl",
    nutritionTips: [
      "This breakfast provides a balanced mix of protein, complex carbs, and healthy fats to fuel your morning.",
      "The protein helps with muscle recovery after morning workouts.",
      "Chia seeds add omega-3 fatty acids and additional protein.",
    ],
    mealType: ["Breakfast"],
    dietaryRestrictions: ["Vegetarian", "Gluten-Free Option"],
    workoutPairing: {
      recommendedFor: ["Morning Workouts", "Strength Training", "Muscle Building"],
      intensity: "moderate",
    },
  },
  {
    id: "recipe-002",
    name: "Grilled Chicken Salad",
    category: "Lunch",
    tags: ["High Protein", "Low Carb", "Weight Loss"],
    calories: 380,
    protein: 35,
    carbs: 12,
    fat: 22,
    fiber: 5,
    sugar: 4,
    servings: 1,
    prepTime: "15 min",
    cookTime: "10 min",
    difficulty: "easy",
    ingredients: [
      { name: "Chicken breast", amount: "6 oz", category: "Meat & Seafood" },
      { name: "Mixed greens", amount: "3 cups", category: "Produce" },
      { name: "Cherry tomatoes", amount: "1/2 cup", category: "Produce" },
      { name: "Cucumber", amount: "1/2", category: "Produce" },
      { name: "Red onion", amount: "1/4", category: "Produce" },
      { name: "Avocado", amount: "1/2", category: "Produce" },
      { name: "Olive oil", amount: "1 tbsp", category: "Oils & Vinegars" },
      { name: "Lemon juice", amount: "1 tbsp", category: "Produce" },
      { name: "Salt", amount: "1/4 tsp", category: "Baking & Spices" },
      { name: "Black pepper", amount: "1/4 tsp", category: "Baking & Spices" },
      { name: "Garlic powder", amount: "1/4 tsp", category: "Baking & Spices" },
    ],
    instructions: [
      "Season chicken breast with salt, pepper, and garlic powder.",
      "Grill chicken for 5-6 minutes per side until fully cooked (internal temperature of 165°F).",
      "Let chicken rest for 5 minutes, then slice.",
      "In a large bowl, combine mixed greens, halved cherry tomatoes, sliced cucumber, and thinly sliced red onion.",
      "Slice avocado and add to the salad.",
      "In a small bowl, whisk together olive oil and lemon juice to make the dressing.",
      "Add sliced chicken to the salad, drizzle with dressing, and toss gently to combine.",
      "Season with additional salt and pepper if desired.",
    ],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Grilled+Chicken+Salad",
    nutritionTips: [
      "This salad is high in protein and healthy fats while being low in carbs, making it ideal for weight management.",
      "The avocado provides healthy monounsaturated fats that help with nutrient absorption.",
      "You can add a small portion of quinoa or brown rice if you need more carbs after an intense workout.",
    ],
    mealType: ["Lunch", "Dinner"],
    dietaryRestrictions: ["Gluten-Free", "Dairy-Free"],
    workoutPairing: {
      recommendedFor: ["After Cardio", "Weight Loss Programs", "Moderate Strength Training"],
      intensity: "moderate",
    },
  },
  {
    id: "recipe-003",
    name: "Salmon with Roasted Vegetables",
    category: "Dinner",
    tags: ["High Protein", "Omega-3", "Gluten-Free"],
    calories: 450,
    protein: 40,
    carbs: 25,
    fat: 22,
    fiber: 7,
    sugar: 6,
    servings: 1,
    prepTime: "15 min",
    cookTime: "25 min",
    difficulty: "medium",
    ingredients: [
      { name: "Salmon fillet", amount: "6 oz", category: "Meat & Seafood" },
      { name: "Broccoli florets", amount: "1 cup", category: "Produce" },
      { name: "Bell pepper", amount: "1", category: "Produce" },
      { name: "Zucchini", amount: "1 small", category: "Produce" },
      { name: "Red onion", amount: "1/2", category: "Produce" },
      { name: "Olive oil", amount: "2 tbsp", category: "Oils & Vinegars" },
      { name: "Lemon", amount: "1", category: "Produce" },
      { name: "Garlic", amount: "2 cloves", category: "Produce" },
      { name: "Dried oregano", amount: "1 tsp", category: "Baking & Spices" },
      { name: "Salt", amount: "1/2 tsp", category: "Baking & Spices" },
      { name: "Black pepper", amount: "1/4 tsp", category: "Baking & Spices" },
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Cut broccoli, bell pepper, zucchini, and red onion into bite-sized pieces.",
      "Toss vegetables with 1 tablespoon olive oil, minced garlic, oregano, salt, and pepper.",
      "Spread vegetables on a baking sheet and roast for 15 minutes.",
      "Meanwhile, season salmon with salt and pepper.",
      "Move vegetables to one side of the baking sheet and place salmon on the other side, skin-side down.",
      "Drizzle salmon with remaining olive oil and squeeze half a lemon over it.",
      "Return to oven and bake for an additional 10-12 minutes until salmon is cooked through and vegetables are tender.",
      "Serve with remaining lemon cut into wedges.",
    ],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Salmon+with+Roasted+Vegetables",
    nutritionTips: [
      "Salmon is rich in omega-3 fatty acids which help reduce inflammation after intense workouts.",
      "This meal provides a good balance of protein, healthy fats, and complex carbs from vegetables.",
      "The colorful vegetables provide a range of antioxidants to support recovery and overall health.",
    ],
    mealType: ["Dinner"],
    dietaryRestrictions: ["Gluten-Free", "Dairy-Free", "Paleo"],
    workoutPairing: {
      recommendedFor: ["After Intense Workouts", "Strength Training", "Muscle Recovery"],
      intensity: "intense",
    },
  },

  // Quick and easy recipes
  {
    id: "recipe-004",
    name: "Greek Yogurt Parfait",
    category: "Breakfast",
    tags: ["Quick & Easy", "High Protein", "Vegetarian"],
    calories: 220,
    protein: 18,
    carbs: 28,
    fat: 5,
    fiber: 4,
    sugar: 18,
    servings: 1,
    prepTime: "5 min",
    cookTime: "0 min",
    difficulty: "easy",
    ingredients: [
      { name: "Greek yogurt, plain", amount: "1 cup", category: "Dairy & Alternatives" },
      { name: "Berries (mixed)", amount: "1/2 cup", category: "Fruits" },
      { name: "Granola", amount: "1/4 cup", category: "Grains" },
      { name: "Honey", amount: "1 tsp", category: "Baking & Spices" },
      { name: "Chia seeds", amount: "1 tsp", category: "Nuts & Seeds" },
    ],
    instructions: [
      "In a glass or bowl, layer half of the Greek yogurt on the bottom.",
      "Add a layer of mixed berries.",
      "Sprinkle half of the granola and chia seeds.",
      "Repeat layers with remaining yogurt, berries, and granola.",
      "Drizzle honey on top.",
      "Serve immediately or refrigerate for up to 2 hours (add granola just before serving for maximum crunch).",
    ],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Greek+Yogurt+Parfait",
    nutritionTips: [
      "Greek yogurt provides high-quality protein with fewer carbs than regular yogurt.",
      "The berries add antioxidants and fiber.",
      "For a lower sugar option, use stevia or monk fruit sweetener instead of honey.",
    ],
    mealType: ["Breakfast", "Snack"],
    dietaryRestrictions: ["Vegetarian", "Gluten-Free Option"],
    workoutPairing: {
      recommendedFor: ["Pre-Workout Snack", "Light Morning Exercise", "Recovery Snack"],
      intensity: "light",
    },
  },

  // Vegetarian/Vegan options
  {
    id: "recipe-005",
    name: "Quinoa and Black Bean Bowl",
    category: "Lunch",
    tags: ["Vegan", "High Protein", "Gluten-Free"],
    calories: 420,
    protein: 18,
    carbs: 65,
    fat: 10,
    fiber: 15,
    sugar: 6,
    servings: 1,
    prepTime: "10 min",
    cookTime: "15 min",
    difficulty: "easy",
    ingredients: [
      { name: "Quinoa", amount: "1/2 cup dry", category: "Grains" },
      { name: "Black beans", amount: "1/2 cup", category: "Canned Goods" },
      { name: "Corn kernels", amount: "1/4 cup", category: "Frozen Foods" },
      { name: "Red bell pepper", amount: "1/2", category: "Produce" },
      { name: "Avocado", amount: "1/2", category: "Produce" },
      { name: "Lime", amount: "1", category: "Produce" },
      { name: "Cilantro", amount: "2 tbsp chopped", category: "Produce" },
      { name: "Olive oil", amount: "1 tbsp", category: "Oils & Vinegars" },
      { name: "Cumin", amount: "1/2 tsp", category: "Baking & Spices" },
      { name: "Salt", amount: "1/4 tsp", category: "Baking & Spices" },
      { name: "Black pepper", amount: "1/4 tsp", category: "Baking & Spices" },
    ],
    instructions: [
      "Rinse quinoa thoroughly under cold water.",
      "In a small pot, combine quinoa with 1 cup of water and a pinch of salt.",
      "Bring to a boil, then reduce heat to low, cover, and simmer for 15 minutes until water is absorbed.",
      "While quinoa cooks, dice red bell pepper and avocado.",
      "Drain and rinse black beans.",
      "In a bowl, combine cooked quinoa, black beans, corn, and diced bell pepper.",
      "Drizzle with olive oil and lime juice, then sprinkle with cumin, salt, and pepper.",
      "Gently mix to combine all ingredients.",
      "Top with diced avocado and chopped cilantro before serving.",
    ],
    imageUrl: "/placeholder.svg?height=400&width=600&text=Quinoa+Black+Bean+Bowl",
    nutritionTips: [
      "Quinoa is a complete protein, containing all nine essential amino acids.",
      "This meal is high in fiber, which helps with digestion and keeps you feeling full longer.",
      "The combination of beans and grains creates a complete protein source for vegans and vegetarians.",
    ],
    mealType: ["Lunch", "Dinner"],
    dietaryRestrictions: ["Vegan", "Gluten-Free", "Dairy-Free"],
    workoutPairing: {
      recommendedFor: ["Endurance Training", "Pre-Workout Meal", "Recovery Meal"],
      intensity: "moderate",
    },
  },

  // More recipes can be added here...
]

// Helper function to filter recipes by dietary restrictions
export function filterRecipesByDiet(dietaryRestrictions: string[]): Recipe[] {
  return recipes.filter((recipe) => {
    return dietaryRestrictions.every((restriction) => recipe.dietaryRestrictions.includes(restriction))
  })
}

// Helper function to filter recipes by calorie range
export function filterRecipesByCalories(minCalories: number, maxCalories: number): Recipe[] {
  return recipes.filter((recipe) => recipe.calories >= minCalories && recipe.calories <= maxCalories)
}

// Helper function to filter recipes by protein content
export function filterRecipesByProtein(minProtein: number): Recipe[] {
  return recipes.filter((recipe) => recipe.protein >= minProtein)
}

// Helper function to get recipes based on workout intensity
export function getRecipesForWorkoutIntensity(intensity: "light" | "moderate" | "intense"): Recipe[] {
  return recipes.filter((recipe) => recipe.workoutPairing && recipe.workoutPairing.intensity === intensity)
}

// Helper function to generate a grocery list from selected recipes
export function generateGroceryList(selectedRecipes: Recipe[]): Record<string, string[]> {
  const groceryList: Record<string, string[]> = {}

  selectedRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const category = ingredient.category || "Other"

      if (!groceryList[category]) {
        groceryList[category] = []
      }

      // Check if the ingredient is already in the list
      const existingIndex = groceryList[category].findIndex((item) =>
        item.toLowerCase().includes(ingredient.name.toLowerCase()),
      )

      if (existingIndex === -1) {
        // Add new ingredient
        groceryList[category].push(`${ingredient.name} - ${ingredient.amount}`)
      } else {
        // Update existing ingredient (simplified approach)
        groceryList[category][existingIndex] += ` + ${ingredient.amount}`
      }
    })
  })

  return groceryList
}

