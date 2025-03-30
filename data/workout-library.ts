export type Exercise = {
  id: string
  name: string
  targetMuscle: string[]
  equipment: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  instructions: string[]
  videoUrl?: string
  imageUrl?: string
  variations?: string[]
  tips?: string[]
}

export type Workout = {
  id: string
  name: string
  type: string
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  equipment: string[]
  targetMuscleGroups: string[]
  caloriesBurn: number
  description: string
  exercises: {
    exerciseId: string
    sets: number
    reps: number | string
    restTime?: string
    notes?: string
  }[]
  imageUrl?: string
  tags: string[]
}

// Sample exercises database
export const exercises: Exercise[] = [
  // Bodyweight exercises (no equipment)
  {
    id: "ex-001",
    name: "Push-up",
    targetMuscle: ["chest", "shoulders", "triceps"],
    equipment: ["none"],
    difficulty: "beginner",
    instructions: [
      "Start in a plank position with hands slightly wider than shoulder-width apart",
      "Lower your body until your chest nearly touches the floor",
      "Push yourself back up to the starting position",
      "Repeat for the desired number of repetitions",
    ],
    variations: ["Incline Push-up", "Decline Push-up", "Diamond Push-up"],
    tips: ["Keep your core tight", "Don't let your hips sag", "Fully extend your arms at the top"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Push-up",
  },
  {
    id: "ex-002",
    name: "Bodyweight Squat",
    targetMuscle: ["quadriceps", "hamstrings", "glutes"],
    equipment: ["none"],
    difficulty: "beginner",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower your body by bending your knees and pushing your hips back",
      "Keep your chest up and back straight",
      "Lower until thighs are parallel to the ground or as low as you can go with good form",
      "Push through your heels to return to the starting position",
    ],
    tips: ["Keep your knees in line with your toes", "Keep your weight in your heels"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Bodyweight+Squat",
  },
  {
    id: "ex-003",
    name: "Plank",
    targetMuscle: ["core", "shoulders"],
    equipment: ["none"],
    difficulty: "beginner",
    instructions: [
      "Start in a push-up position, then bend your elbows and rest your weight on your forearms",
      "Your body should form a straight line from your head to your feet",
      "Engage your core and hold the position",
    ],
    variations: ["Side Plank", "Plank with Shoulder Taps", "Plank Jacks"],
    tips: [
      "Don't let your hips sag",
      "Don't hold your breath",
      "Look at a spot on the floor to keep your neck neutral",
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Plank",
  },

  // Dumbbell exercises
  {
    id: "ex-004",
    name: "Dumbbell Bench Press",
    targetMuscle: ["chest", "shoulders", "triceps"],
    equipment: ["dumbbells", "bench"],
    difficulty: "intermediate",
    instructions: [
      "Lie on a flat bench with a dumbbell in each hand",
      "Hold the dumbbells at chest level with palms facing forward",
      "Press the dumbbells up until your arms are fully extended",
      "Lower the dumbbells back to chest level",
    ],
    tips: ["Keep your wrists straight", "Don't arch your back excessively"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Dumbbell+Bench+Press",
  },
  {
    id: "ex-005",
    name: "Dumbbell Row",
    targetMuscle: ["back", "biceps"],
    equipment: ["dumbbells", "bench"],
    difficulty: "beginner",
    instructions: [
      "Place your right knee and right hand on a bench",
      "Hold a dumbbell in your left hand with arm extended",
      "Pull the dumbbell up to your side, keeping your elbow close to your body",
      "Lower the dumbbell back down with control",
      "Complete all reps on one side before switching",
    ],
    tips: ["Keep your back flat", "Squeeze your shoulder blade at the top of the movement"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Dumbbell+Row",
  },

  // Additional exercises with minimal details for brevity
  {
    id: "ex-006",
    name: "Barbell Squat",
    targetMuscle: ["quadriceps", "hamstrings", "glutes"],
    equipment: ["barbell", "squat rack"],
    difficulty: "intermediate",
    instructions: ["Position barbell on upper back", "Squat down keeping chest up", "Push through heels to stand"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Barbell+Squat",
  },
  {
    id: "ex-007",
    name: "Barbell Deadlift",
    targetMuscle: ["hamstrings", "glutes", "back", "traps"],
    equipment: ["barbell"],
    difficulty: "advanced",
    instructions: [
      "Stand with feet hip-width apart",
      "Grip bar with hands shoulder-width",
      "Lift by extending hips and knees",
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Barbell+Deadlift",
  },
  {
    id: "ex-008",
    name: "Leg Press",
    targetMuscle: ["quadriceps", "hamstrings", "glutes"],
    equipment: ["leg press machine"],
    difficulty: "beginner",
    instructions: ["Sit in machine", "Push platform away by extending legs", "Return with control"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Leg+Press",
  },
  {
    id: "ex-009",
    name: "Lat Pulldown",
    targetMuscle: ["back", "biceps"],
    equipment: ["cable machine", "lat pulldown bar"],
    difficulty: "beginner",
    instructions: ["Sit at machine", "Grip bar wide", "Pull down to chest", "Return with control"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Lat+Pulldown",
  },
  {
    id: "ex-010",
    name: "Treadmill Running",
    targetMuscle: ["quadriceps", "hamstrings", "calves", "cardiovascular system"],
    equipment: ["treadmill"],
    difficulty: "intermediate",
    instructions: ["Warm up with walk", "Increase to running pace", "Maintain good posture", "Cool down with walk"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Treadmill+Running",
  },
  {
    id: "ex-011",
    name: "Jumping Jacks",
    targetMuscle: ["full body", "cardiovascular system"],
    equipment: ["none"],
    difficulty: "beginner",
    instructions: ["Stand with feet together", "Jump to spread feet and raise arms", "Jump back to starting position"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Jumping+Jacks",
  },
  {
    id: "ex-012",
    name: "Pull-up",
    targetMuscle: ["back", "biceps", "shoulders"],
    equipment: ["pull-up bar"],
    difficulty: "intermediate",
    instructions: ["Hang from bar", "Pull up until chin above bar", "Lower with control"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Pull-up",
  },
  {
    id: "ex-013",
    name: "Dips",
    targetMuscle: ["chest", "triceps", "shoulders"],
    equipment: ["parallel bars", "dip station"],
    difficulty: "intermediate",
    instructions: ["Support on bars", "Lower body by bending elbows", "Push back up"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Dips",
  },
  {
    id: "ex-014",
    name: "Lunges",
    targetMuscle: ["quadriceps", "hamstrings", "glutes"],
    equipment: ["none"],
    difficulty: "beginner",
    instructions: ["Step forward", "Lower until both knees at 90°", "Push back to start"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Lunges",
  },
  {
    id: "ex-015",
    name: "Bicycle Crunches",
    targetMuscle: ["abs", "obliques"],
    equipment: ["none"],
    difficulty: "beginner",
    instructions: ["Lie on back", "Alternate bringing elbow to opposite knee", "Extend other leg straight"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Bicycle+Crunches",
  },
  {
    id: "ex-016",
    name: "Mountain Climbers",
    targetMuscle: ["core", "shoulders", "cardiovascular system"],
    equipment: ["none"],
    difficulty: "intermediate",
    instructions: ["Start in plank position", "Alternate bringing knees to chest", "Keep hips low"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Mountain+Climbers",
  },
  {
    id: "ex-017",
    name: "Kettlebell Swing",
    targetMuscle: ["glutes", "hamstrings", "back", "shoulders"],
    equipment: ["kettlebell"],
    difficulty: "intermediate",
    instructions: ["Stand with feet shoulder-width", "Hinge at hips", "Swing kettlebell with hip thrust"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Kettlebell+Swing",
  },
  {
    id: "ex-018",
    name: "Box Jumps",
    targetMuscle: ["quadriceps", "hamstrings", "glutes", "calves"],
    equipment: ["plyo box"],
    difficulty: "intermediate",
    instructions: ["Stand in front of box", "Jump onto box", "Land softly", "Step back down"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Box+Jumps",
  },
  {
    id: "ex-019",
    name: "Battle Ropes",
    targetMuscle: ["shoulders", "arms", "back", "core"],
    equipment: ["battle ropes"],
    difficulty: "intermediate",
    instructions: ["Hold rope ends", "Create waves", "Keep core tight", "Maintain rhythm"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Battle+Ropes",
  },
  {
    id: "ex-020",
    name: "Burpees",
    targetMuscle: ["full body", "cardiovascular system"],
    equipment: ["none"],
    difficulty: "advanced",
    instructions: ["Squat down", "Kick feet back to plank", "Do push-up", "Jump up"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Burpees",
  },
  {
    id: "ex-021",
    name: "Russian Twist",
    targetMuscle: ["obliques", "core"],
    equipment: ["medicine ball", "weight plate"],
    difficulty: "beginner",
    instructions: ["Sit with knees bent", "Lean back slightly", "Twist torso side to side"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Russian+Twist",
  },
  {
    id: "ex-022",
    name: "Overhead Press",
    targetMuscle: ["shoulders", "triceps"],
    equipment: ["dumbbells", "barbell"],
    difficulty: "intermediate",
    instructions: ["Stand with weight at shoulders", "Press overhead", "Lower with control"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Overhead+Press",
  },
  {
    id: "ex-023",
    name: "Glute Bridge",
    targetMuscle: ["glutes", "hamstrings"],
    equipment: ["none"],
    difficulty: "beginner",
    instructions: ["Lie on back", "Feet flat on floor", "Lift hips up", "Squeeze glutes at top"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Glute+Bridge",
  },
  {
    id: "ex-024",
    name: "Calf Raises",
    targetMuscle: ["calves"],
    equipment: ["none", "dumbbells"],
    difficulty: "beginner",
    instructions: ["Stand on edge of step", "Lower heels below platform", "Raise up onto toes"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Calf+Raises",
  },
  {
    id: "ex-025",
    name: "Tricep Dips",
    targetMuscle: ["triceps", "shoulders"],
    equipment: ["bench", "chair"],
    difficulty: "beginner",
    instructions: ["Sit on edge of bench", "Hands beside hips", "Lower body", "Push back up"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Tricep+Dips",
  },
  {
    id: "ex-026",
    name: "Hammer Curls",
    targetMuscle: ["biceps", "forearms"],
    equipment: ["dumbbells"],
    difficulty: "beginner",
    instructions: ["Stand with dumbbells", "Palms facing each other", "Curl up", "Lower with control"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Hammer+Curls",
  },
  {
    id: "ex-027",
    name: "Lateral Raises",
    targetMuscle: ["shoulders"],
    equipment: ["dumbbells"],
    difficulty: "beginner",
    instructions: ["Stand with dumbbells", "Raise arms to sides", "Up to shoulder height", "Lower with control"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Lateral+Raises",
  },
  {
    id: "ex-028",
    name: "Leg Raises",
    targetMuscle: ["lower abs"],
    equipment: ["none"],
    difficulty: "intermediate",
    instructions: ["Lie on back", "Hands under lower back", "Raise legs", "Lower with control"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Leg+Raises",
  },
  {
    id: "ex-029",
    name: "Incline Bench Press",
    targetMuscle: ["upper chest", "shoulders", "triceps"],
    equipment: ["dumbbells", "incline bench"],
    difficulty: "intermediate",
    instructions: ["Lie on incline bench", "Press weights up", "Lower to chest", "Press back up"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Incline+Bench+Press",
  },
  {
    id: "ex-030",
    name: "Decline Push-ups",
    targetMuscle: ["lower chest", "triceps"],
    equipment: ["bench", "step"],
    difficulty: "intermediate",
    instructions: ["Feet elevated on bench", "Hands on floor", "Lower chest to floor", "Push back up"],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Decline+Push-ups",
  },
]

// Sample workouts database
export const workouts: Workout[] = [
  // Home workouts (minimal equipment)
  {
    id: "wk-001",
    name: "Full Body Home Workout",
    type: "strength",
    duration: "30 min",
    difficulty: "beginner",
    equipment: ["none", "dumbbells"],
    targetMuscleGroups: ["full body"],
    caloriesBurn: 250,
    description: "A complete full-body workout that can be done at home with minimal equipment.",
    exercises: [
      { exerciseId: "ex-001", sets: 3, reps: 10, restTime: "30 sec" },
      { exerciseId: "ex-002", sets: 3, reps: 15, restTime: "30 sec" },
      { exerciseId: "ex-003", sets: 3, reps: "30 sec", restTime: "30 sec" },
      { exerciseId: "ex-005", sets: 3, reps: 12, restTime: "30 sec" },
      { exerciseId: "ex-011", sets: 3, reps: "30 sec", restTime: "30 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Full+Body+Home+Workout",
    tags: ["home", "beginner", "full body", "minimal equipment"],
  },
  {
    id: "wk-002",
    name: "HIIT Cardio Blast",
    type: "cardio",
    duration: "20 min",
    difficulty: "intermediate",
    equipment: ["none"],
    targetMuscleGroups: ["cardiovascular system", "full body"],
    caloriesBurn: 300,
    description: "High-intensity interval training to boost your cardio fitness and burn calories.",
    exercises: [
      { exerciseId: "ex-011", sets: 4, reps: "30 sec", restTime: "15 sec" },
      { exerciseId: "ex-002", sets: 4, reps: "30 sec", restTime: "15 sec" },
      { exerciseId: "ex-001", sets: 4, reps: "30 sec", restTime: "15 sec" },
      { exerciseId: "ex-003", sets: 4, reps: "30 sec", restTime: "15 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=HIIT+Cardio+Blast",
    tags: ["cardio", "HIIT", "fat loss", "no equipment"],
  },

  // Gym workouts (full equipment)
  {
    id: "wk-003",
    name: "Upper Body Strength",
    type: "strength",
    duration: "45 min",
    difficulty: "intermediate",
    equipment: ["dumbbells", "barbell", "bench", "cable machine"],
    targetMuscleGroups: ["chest", "back", "shoulders", "arms"],
    caloriesBurn: 320,
    description: "Build upper body strength and muscle with this comprehensive gym workout.",
    exercises: [
      { exerciseId: "ex-004", sets: 4, reps: 10, restTime: "60 sec" },
      { exerciseId: "ex-005", sets: 4, reps: 12, restTime: "60 sec" },
      { exerciseId: "ex-009", sets: 3, reps: 12, restTime: "60 sec" },
      { exerciseId: "ex-001", sets: 3, reps: 15, restTime: "60 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Upper+Body+Strength",
    tags: ["gym", "strength", "upper body", "muscle building"],
  },
  {
    id: "wk-004",
    name: "Lower Body Focus",
    type: "strength",
    duration: "50 min",
    difficulty: "advanced",
    equipment: ["barbell", "squat rack", "leg press machine"],
    targetMuscleGroups: ["quadriceps", "hamstrings", "glutes", "calves"],
    caloriesBurn: 400,
    description: "Intense lower body workout to build strength and muscle in your legs and glutes.",
    exercises: [
      { exerciseId: "ex-006", sets: 4, reps: 8, restTime: "90 sec" },
      { exerciseId: "ex-007", sets: 4, reps: 8, restTime: "90 sec" },
      { exerciseId: "ex-008", sets: 3, reps: 12, restTime: "60 sec" },
      { exerciseId: "ex-002", sets: 3, reps: 15, restTime: "60 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Lower+Body+Focus",
    tags: ["gym", "strength", "lower body", "leg day"],
  },
  {
    id: "wk-005",
    name: "Core Crusher",
    type: "strength",
    duration: "20 min",
    difficulty: "intermediate",
    equipment: ["none", "mat"],
    targetMuscleGroups: ["core", "abs"],
    caloriesBurn: 200,
    description: "Strengthen your core with this focused ab workout that can be done anywhere.",
    exercises: [
      { exerciseId: "ex-003", sets: 3, reps: "45 sec", restTime: "30 sec" },
      { exerciseId: "ex-015", sets: 3, reps: 20, restTime: "30 sec" },
      { exerciseId: "ex-021", sets: 3, reps: 15, restTime: "30 sec" },
      { exerciseId: "ex-028", sets: 3, reps: 12, restTime: "30 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Core+Crusher",
    tags: ["core", "abs", "home", "gym", "minimal equipment"],
  },
  {
    id: "wk-006",
    name: "Cardio Endurance",
    type: "cardio",
    duration: "40 min",
    difficulty: "intermediate",
    equipment: ["treadmill", "none"],
    targetMuscleGroups: ["cardiovascular system"],
    caloriesBurn: 450,
    description: "Build your cardiovascular endurance with this varied cardio workout.",
    exercises: [
      { exerciseId: "ex-010", sets: 1, reps: "30 min", notes: "Alternate between 2 min jogging and 1 min running" },
      { exerciseId: "ex-011", sets: 3, reps: "1 min", restTime: "30 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Cardio+Endurance",
    tags: ["cardio", "endurance", "fat loss", "gym"],
  },
  // Adding more workouts
  {
    id: "wk-007",
    name: "Bodyweight HIIT Circuit",
    type: "hiit",
    duration: "25 min",
    difficulty: "intermediate",
    equipment: ["none"],
    targetMuscleGroups: ["full body", "cardiovascular system"],
    caloriesBurn: 350,
    description: "High-intensity interval training using only bodyweight exercises for a full-body burn.",
    exercises: [
      { exerciseId: "ex-020", sets: 4, reps: "30 sec", restTime: "15 sec" },
      { exerciseId: "ex-016", sets: 4, reps: "30 sec", restTime: "15 sec" },
      { exerciseId: "ex-014", sets: 4, reps: "30 sec", restTime: "15 sec" },
      { exerciseId: "ex-011", sets: 4, reps: "30 sec", restTime: "15 sec" },
      { exerciseId: "ex-001", sets: 4, reps: "30 sec", restTime: "15 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Bodyweight+HIIT+Circuit",
    tags: ["HIIT", "cardio", "home", "no equipment", "fat loss"],
  },
  {
    id: "wk-008",
    name: "Dumbbell Full Body",
    type: "strength",
    duration: "45 min",
    difficulty: "beginner",
    equipment: ["dumbbells"],
    targetMuscleGroups: ["full body"],
    caloriesBurn: 280,
    description: "Complete full body workout using only dumbbells, perfect for home or gym.",
    exercises: [
      { exerciseId: "ex-004", sets: 3, reps: 12, restTime: "45 sec" },
      { exerciseId: "ex-005", sets: 3, reps: 12, restTime: "45 sec" },
      { exerciseId: "ex-026", sets: 3, reps: 12, restTime: "45 sec" },
      { exerciseId: "ex-027", sets: 3, reps: 12, restTime: "45 sec" },
      { exerciseId: "ex-022", sets: 3, reps: 12, restTime: "45 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Dumbbell+Full+Body",
    tags: ["strength", "dumbbells", "home", "beginner", "full body"],
  },
  {
    id: "wk-009",
    name: "Functional Fitness",
    type: "functional",
    duration: "35 min",
    difficulty: "intermediate",
    equipment: ["kettlebell", "medicine ball", "resistance bands"],
    targetMuscleGroups: ["full body", "core"],
    caloriesBurn: 320,
    description: "Improve everyday movement patterns with this functional fitness workout.",
    exercises: [
      { exerciseId: "ex-017", sets: 3, reps: 15, restTime: "45 sec" },
      { exerciseId: "ex-021", sets: 3, reps: 20, restTime: "45 sec" },
      { exerciseId: "ex-014", sets: 3, reps: 12, restTime: "45 sec" },
      { exerciseId: "ex-023", sets: 3, reps: 15, restTime: "45 sec" },
      { exerciseId: "ex-024", sets: 3, reps: 20, restTime: "45 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Functional+Fitness",
    tags: ["functional", "kettlebell", "core", "mobility"],
  },
  {
    id: "wk-010",
    name: "Power & Explosiveness",
    type: "power",
    duration: "40 min",
    difficulty: "advanced",
    equipment: ["plyo box", "medicine ball", "barbell"],
    targetMuscleGroups: ["legs", "core", "full body"],
    caloriesBurn: 400,
    description: "Build explosive power and athletic performance with this high-intensity workout.",
    exercises: [
      { exerciseId: "ex-018", sets: 4, reps: 10, restTime: "60 sec" },
      { exerciseId: "ex-020", sets: 4, reps: 10, restTime: "60 sec" },
      { exerciseId: "ex-007", sets: 4, reps: 6, restTime: "60 sec" },
      { exerciseId: "ex-017", sets: 4, reps: 12, restTime: "60 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Power+and+Explosiveness",
    tags: ["power", "explosive", "athletic", "advanced", "performance"],
  },
  {
    id: "wk-011",
    name: "Upper Body Pump",
    type: "hypertrophy",
    duration: "50 min",
    difficulty: "intermediate",
    equipment: ["dumbbells", "cable machine", "bench"],
    targetMuscleGroups: ["chest", "back", "shoulders", "arms"],
    caloriesBurn: 300,
    description: "High-volume upper body workout designed to maximize muscle pump and growth.",
    exercises: [
      { exerciseId: "ex-004", sets: 4, reps: 15, restTime: "45 sec" },
      { exerciseId: "ex-029", sets: 4, reps: 12, restTime: "45 sec" },
      { exerciseId: "ex-009", sets: 4, reps: 12, restTime: "45 sec" },
      { exerciseId: "ex-005", sets: 4, reps: 15, restTime: "45 sec" },
      { exerciseId: "ex-027", sets: 3, reps: 15, restTime: "45 sec" },
      { exerciseId: "ex-026", sets: 3, reps: 12, restTime: "45 sec" },
      { exerciseId: "ex-025", sets: 3, reps: 15, restTime: "45 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Upper+Body+Pump",
    tags: ["hypertrophy", "muscle building", "upper body", "pump", "gym"],
  },
  {
    id: "wk-012",
    name: "30-Minute Fat Burner",
    type: "cardio",
    duration: "30 min",
    difficulty: "beginner",
    equipment: ["none"],
    targetMuscleGroups: ["full body", "cardiovascular system"],
    caloriesBurn: 350,
    description: "Efficient fat-burning workout that can be done anywhere in just 30 minutes.",
    exercises: [
      { exerciseId: "ex-011", sets: 3, reps: "45 sec", restTime: "15 sec" },
      { exerciseId: "ex-016", sets: 3, reps: "45 sec", restTime: "15 sec" },
      { exerciseId: "ex-002", sets: 3, reps: "45 sec", restTime: "15 sec" },
      { exerciseId: "ex-014", sets: 3, reps: "45 sec", restTime: "15 sec" },
      { exerciseId: "ex-015", sets: 3, reps: "45 sec", restTime: "15 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=30-Minute+Fat+Burner",
    tags: ["cardio", "fat loss", "quick", "beginner", "home", "no equipment"],
  },
  {
    id: "wk-013",
    name: "Chest & Triceps Focus",
    type: "strength",
    duration: "45 min",
    difficulty: "intermediate",
    equipment: ["dumbbells", "bench", "cable machine"],
    targetMuscleGroups: ["chest", "triceps"],
    caloriesBurn: 280,
    description: "Targeted workout to build strength and definition in chest and triceps.",
    exercises: [
      { exerciseId: "ex-004", sets: 4, reps: 10, restTime: "60 sec" },
      { exerciseId: "ex-029", sets: 4, reps: 10, restTime: "60 sec" },
      { exerciseId: "ex-001", sets: 3, reps: 12, restTime: "45 sec" },
      { exerciseId: "ex-030", sets: 3, reps: 12, restTime: "45 sec" },
      { exerciseId: "ex-025", sets: 3, reps: 15, restTime: "45 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Chest+and+Triceps+Focus",
    tags: ["strength", "chest", "triceps", "gym", "muscle building"],
  },
  {
    id: "wk-014",
    name: "Back & Biceps Builder",
    type: "strength",
    duration: "45 min",
    difficulty: "intermediate",
    equipment: ["dumbbells", "barbell", "cable machine", "pull-up bar"],
    targetMuscleGroups: ["back", "biceps"],
    caloriesBurn: 290,
    description: "Comprehensive back and biceps workout to build a strong, defined upper body.",
    exercises: [
      { exerciseId: "ex-012", sets: 4, reps: 8, restTime: "60 sec" },
      { exerciseId: "ex-005", sets: 4, reps: 10, restTime: "60 sec" },
      { exerciseId: "ex-009", sets: 3, reps: 12, restTime: "45 sec" },
      { exerciseId: "ex-026", sets: 3, reps: 12, restTime: "45 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Back+and+Biceps+Builder",
    tags: ["strength", "back", "biceps", "gym", "muscle building"],
  },
  {
    id: "wk-015",
    name: "Shoulder Sculptor",
    type: "strength",
    duration: "40 min",
    difficulty: "intermediate",
    equipment: ["dumbbells", "cable machine"],
    targetMuscleGroups: ["shoulders", "traps"],
    caloriesBurn: 260,
    description: "Build impressive, well-rounded shoulders with this targeted workout.",
    exercises: [
      { exerciseId: "ex-022", sets: 4, reps: 10, restTime: "60 sec" },
      { exerciseId: "ex-027", sets: 4, reps: 12, restTime: "45 sec" },
      { exerciseId: "ex-001", sets: 3, reps: 15, restTime: "45 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Shoulder+Sculptor",
    tags: ["strength", "shoulders", "gym", "muscle definition"],
  },
  {
    id: "wk-016",
    name: "Leg Day Destroyer",
    type: "strength",
    duration: "55 min",
    difficulty: "advanced",
    equipment: ["barbell", "squat rack", "leg press machine", "dumbbells"],
    targetMuscleGroups: ["quadriceps", "hamstrings", "glutes", "calves"],
    caloriesBurn: 420,
    description: "Intense leg workout designed to build strength, size, and definition in your lower body.",
    exercises: [
      { exerciseId: "ex-006", sets: 5, reps: 8, restTime: "90 sec" },
      { exerciseId: "ex-008", sets: 4, reps: 12, restTime: "60 sec" },
      { exerciseId: "ex-014", sets: 3, reps: 12, restTime: "60 sec" },
      { exerciseId: "ex-023", sets: 3, reps: 15, restTime: "45 sec" },
      { exerciseId: "ex-024", sets: 4, reps: 20, restTime: "30 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Leg+Day+Destroyer",
    tags: ["strength", "legs", "advanced", "gym", "muscle building"],
  },
  {
    id: "wk-017",
    name: "Beginner's Total Body",
    type: "strength",
    duration: "35 min",
    difficulty: "beginner",
    equipment: ["dumbbells", "resistance bands"],
    targetMuscleGroups: ["full body"],
    caloriesBurn: 220,
    description: "Perfect introduction to strength training for beginners targeting all major muscle groups.",
    exercises: [
      { exerciseId: "ex-002", sets: 3, reps: 12, restTime: "45 sec" },
      { exerciseId: "ex-001", sets: 3, reps: 10, restTime: "45 sec" },
      { exerciseId: "ex-005", sets: 3, reps: 10, restTime: "45 sec" },
      { exerciseId: "ex-026", sets: 3, reps: 10, restTime: "45 sec" },
      { exerciseId: "ex-003", sets: 3, reps: "30 sec", restTime: "30 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Beginner's+Total+Body",
    tags: ["beginner", "full body", "strength", "home", "gym"],
  },
  {
    id: "wk-018",
    name: "HIIT & Core Combo",
    type: "hiit",
    duration: "30 min",
    difficulty: "intermediate",
    equipment: ["none"],
    targetMuscleGroups: ["core", "cardiovascular system"],
    caloriesBurn: 330,
    description:
      "Combination of high-intensity intervals and core exercises for maximum calorie burn and ab definition.",
    exercises: [
      { exerciseId: "ex-020", sets: 3, reps: "30 sec", restTime: "15 sec" },
      { exerciseId: "ex-015", sets: 3, reps: "30 sec", restTime: "15 sec" },
      { exerciseId: "ex-016", sets: 3, reps: "30 sec", restTime: "15 sec" },
      { exerciseId: "ex-021", sets: 3, reps: "30 sec", restTime: "15 sec" },
      { exerciseId: "ex-003", sets: 3, reps: "30 sec", restTime: "15 sec" },
      { exerciseId: "ex-028", sets: 3, reps: "30 sec", restTime: "15 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=HIIT+and+Core+Combo",
    tags: ["HIIT", "core", "abs", "cardio", "home", "no equipment"],
  },
  {
    id: "wk-019",
    name: "Kettlebell Circuit",
    type: "circuit",
    duration: "40 min",
    difficulty: "intermediate",
    equipment: ["kettlebell"],
    targetMuscleGroups: ["full body"],
    caloriesBurn: 350,
    description: "Full-body kettlebell circuit that combines strength, cardio, and functional movement patterns.",
    exercises: [
      { exerciseId: "ex-017", sets: 3, reps: 15, restTime: "30 sec" },
      { exerciseId: "ex-002", sets: 3, reps: 15, restTime: "30 sec" },
      { exerciseId: "ex-022", sets: 3, reps: 12, restTime: "30 sec" },
      { exerciseId: "ex-021", sets: 3, reps: 20, restTime: "30 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Kettlebell+Circuit",
    tags: ["kettlebell", "circuit", "functional", "strength", "cardio"],
  },
  {
    id: "wk-020",
    name: "Quick Morning Energizer",
    type: "cardio",
    duration: "15 min",
    difficulty: "beginner",
    equipment: ["none"],
    targetMuscleGroups: ["full body", "cardiovascular system"],
    caloriesBurn: 150,
    description: "Quick morning workout to boost energy and kickstart your metabolism for the day.",
    exercises: [
      { exerciseId: "ex-011", sets: 2, reps: "45 sec", restTime: "15 sec" },
      { exerciseId: "ex-002", sets: 2, reps: "45 sec", restTime: "15 sec" },
      { exerciseId: "ex-016", sets: 2, reps: "45 sec", restTime: "15 sec" },
      { exerciseId: "ex-001", sets: 2, reps: "45 sec", restTime: "15 sec" },
      { exerciseId: "ex-003", sets: 2, reps: "45 sec", restTime: "15 sec" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=500&text=Quick+Morning+Energizer",
    tags: ["quick", "morning", "energizing", "home", "no equipment", "beginner"],
  },
]

// Helper function to filter workouts by equipment availability
export const filterWorkoutsByEquipment = (availableEquipment: string[]) => {
  try {
    console.log("Filter function received equipment:", availableEquipment)

    if (!Array.isArray(availableEquipment)) {
      console.error("availableEquipment is not an array:", availableEquipment)
      return workouts // Return all workouts instead of empty array
    }

    // If no equipment is specified, return all workouts
    if (availableEquipment.length === 0) {
      console.log("No equipment specified, returning all workouts")
      return workouts
    }

    // If "none" is in the available equipment, include bodyweight workouts
    const includeBodyweight = availableEquipment.includes("none")
    console.log("Include bodyweight workouts:", includeBodyweight)

    // Normalize equipment names for case-insensitive comparison
    const normalizedAvailableEquipment = availableEquipment.map((item) => item.toLowerCase().trim())

    const filteredWorkouts = workouts.filter((workout) => {
      // Include bodyweight workouts if specified
      if (includeBodyweight && (workout.equipment.includes("none") || workout.equipment.length === 0)) {
        return true
      }

      // Check if the workout can be done with the available equipment
      // Use some flexibility in matching equipment names
      return workout.equipment.some((item) => {
        const normalizedItem = item.toLowerCase().trim()
        return normalizedAvailableEquipment.some(
          (available) =>
            normalizedItem === available || normalizedItem.includes(available) || available.includes(normalizedItem),
        )
      })
    })

    console.log(`Found ${filteredWorkouts.length} workouts matching equipment criteria`)
    return filteredWorkouts
  } catch (error) {
    console.error("Error filtering workouts by equipment:", error)
    return workouts // Return all workouts instead of empty array
  }
}

// Helper function to filter workouts by target muscle groups
export function filterWorkoutsByMuscleGroups(targetMuscles: string[]): Workout[] {
  if (!Array.isArray(targetMuscles) || targetMuscles.length === 0) {
    return workouts
  }

  return workouts.filter((workout) => {
    // Check if the workout targets any of the specified muscle groups
    return workout.targetMuscleGroups.some((muscle) => targetMuscles.includes(muscle))
  })
}

// Helper function to filter workouts by difficulty
export function filterWorkoutsByDifficulty(difficulty: "beginner" | "intermediate" | "advanced"): Workout[] {
  return workouts.filter((workout) => workout.difficulty === difficulty)
}

// Helper function to get home workouts (minimal equipment)
export function getHomeWorkouts(): Workout[] {
  return workouts.filter(
    (workout) =>
      workout.tags.includes("home") ||
      workout.equipment.every((eq) => eq === "none" || eq === "dumbbells" || eq === "mat"),
  )
}

// Helper function to get gym workouts (full equipment)
export function getGymWorkouts(): Workout[] {
  return workouts.filter((workout) => workout.tags.includes("gym"))
}

