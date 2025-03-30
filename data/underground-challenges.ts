export type UndergroundChallenge = {
  id: string
  name: string
  type: "challenge" | "routine"
  description: string
  longDescription?: string
  duration: string
  durationText?: string
  intensity: string
  difficulty: string
  warning: string
  exercises: {
    name: string
    sets: number
    reps: string | number
    rest: string
    notes?: string
  }[]
  requirements: string[]
  image: string
  wearableRequired: boolean
  inspirationSource?: string
  tags: string[]
  completionRate?: number
  category: string
  featured?: boolean
  unlockRequirement?: string
  unlocked?: boolean
  points: number
}

export const undergroundCategories = [
  {
    id: "strength-challenges",
    name: "Strength Challenges",
    description: "Push your strength to the absolute limit",
    image: "/placeholder.svg?height=300&width=500&text=Strength+Challenges",
    count: 8,
  },
  {
    id: "endurance-trials",
    name: "Endurance Trials",
    description: "Test your mental and physical endurance",
    image: "/placeholder.svg?height=300&width=500&text=Endurance+Trials",
    count: 6,
  },
  {
    id: "brutal-hiit",
    name: "Brutal HIIT",
    description: "High-intensity interval training at its most extreme",
    image: "/placeholder.svg?height=300&width=500&text=Brutal+HIIT",
    count: 5,
  },
  {
    id: "legendary-workouts",
    name: "Legendary Workouts",
    description: "Workouts inspired by legendary athletes and warriors",
    image: "/placeholder.svg?height=300&width=500&text=Legendary+Workouts",
    count: 4,
  },
  {
    id: "team-battles",
    name: "Team Battles",
    description: "Partner up for these extreme team challenges",
    image: "/placeholder.svg?height=300&width=500&text=Team+Battles",
    count: 3,
  },
  {
    id: "savage-circuits",
    name: "Savage Circuits",
    description: "Circuit training pushed to savage new levels",
    image: "/placeholder.svg?height=300&width=500&text=Savage+Circuits",
    count: 4,
  },
]

export const undergroundChallenges: UndergroundChallenge[] = [
  {
    id: "100-day-warrior",
    name: "100-Day Warrior Challenge",
    type: "challenge",
    category: "endurance-trials",
    description:
      "A grueling 100-day commitment to transform your body and mind through progressive overload and mental fortitude training.",
    longDescription:
      "The 100-Day Warrior Challenge is the ultimate test of dedication and perseverance. This challenge progressively increases in intensity over 14 weeks, pushing you to new limits each week. You'll build strength, endurance, and mental toughness through a carefully designed program that leaves no muscle group untouched. Only those with unwavering commitment should attempt this challenge - it will demand everything from you, but the transformation will be worth it.",
    duration: "100 days",
    durationText: "100 Days (14 Weeks)",
    intensity: "Progressive",
    difficulty: "EXTREME",
    warning:
      "This challenge requires absolute dedication for 100 consecutive days. Skipping days will reset your progress. Consult a physician before attempting this extreme regimen.",
    exercises: [
      {
        name: "Progressive Barbell Squats",
        sets: 5,
        reps: "5-10-15-20-25",
        rest: "60 sec",
        notes: "Increase weight each week",
      },
      { name: "Deadlift Ladder", sets: 5, reps: "5-3-2-1-1", rest: "90 sec", notes: "Increase weight each set" },
      { name: "Weighted Pull-ups", sets: 4, reps: "AMRAP", rest: "60 sec" },
      { name: "Military Press", sets: 4, reps: 8, rest: "60 sec" },
      { name: "Farmer's Carries", sets: 3, reps: "100m", rest: "60 sec" },
      { name: "Sandbag Carries", sets: 3, reps: "50m", rest: "60 sec" },
      {
        name: "Burpee Ladder",
        sets: 1,
        reps: "100 total",
        rest: "as needed",
        notes: "Complete 100 burpees as fast as possible",
      },
    ],
    requirements: [
      "Access to a fully equipped gym",
      "Ability to train 5-6 days per week",
      "Previous strength training experience (minimum 1 year)",
      "Commitment to proper nutrition and recovery",
      "Weekly progress tracking",
    ],
    image: "/placeholder.svg?height=400&width=800&text=100-Day+Warrior+Challenge",
    wearableRequired: true,
    inspirationSource: "Special Forces Training",
    tags: ["strength", "endurance", "mental-toughness", "transformation", "elite"],
    completionRate: 12,
    featured: true,
    unlocked: true,
    points: 5000,
  },
  {
    id: "spartan-gauntlet",
    name: "Spartan Gauntlet",
    type: "challenge",
    category: "legendary-workouts",
    description:
      "A 30-day challenge inspired by the training regimens of ancient Spartan warriors, focusing on functional strength, endurance, and mental fortitude.",
    longDescription:
      "The Spartan Gauntlet is a brutal 30-day challenge that will forge your body into a weapon. Inspired by the training methods of ancient Spartan warriors, this program combines functional strength movements, endurance work, and mental conditioning. Each day presents a new battle to overcome, gradually building in intensity until the final week's ultimate tests. Those who complete this gauntlet will emerge stronger, more resilient, and with the mental toughness of a Spartan warrior.",
    duration: "30 days",
    durationText: "30 Days (4 Weeks)",
    intensity: "BRUTAL",
    difficulty: "ADVANCED",
    warning:
      "This challenge involves high-volume training with minimal rest days. Risk of overtraining is high without proper recovery protocols. Not suitable for beginners.",
    exercises: [
      { name: "Shield Carries (Weighted Plate Holds)", sets: 3, reps: "400m", rest: "60 sec" },
      { name: "Spear Throws (Medicine Ball Slams)", sets: 5, reps: 20, rest: "30 sec" },
      { name: "Phalanx Pushes (Sled Push)", sets: 4, reps: "50m", rest: "60 sec" },
      { name: "Battle Rope Drills", sets: 4, reps: "30 sec", rest: "30 sec" },
      { name: "Warrior Crawls", sets: 3, reps: "25m", rest: "45 sec" },
      { name: "Spartan Burpees", sets: 5, reps: 15, rest: "30 sec", notes: "Burpee + Broad Jump" },
      { name: "Hill Sprints with Weighted Vest", sets: 10, reps: "30 sec", rest: "60 sec" },
    ],
    requirements: [
      "Access to outdoor training area with hills",
      "Basic equipment (weighted vest, medicine ball, battle ropes)",
      "Good baseline fitness level",
      "Ability to train 6 days per week",
      "Mental resilience",
    ],
    image: "/placeholder.svg?height=400&width=800&text=Spartan+Gauntlet",
    wearableRequired: false,
    inspirationSource: "Ancient Spartan Training",
    tags: ["functional", "endurance", "historical", "outdoor", "elite"],
    completionRate: 24,
    unlocked: true,
    points: 3000,
  },
  {
    id: "iron-crucible",
    name: "The Iron Crucible",
    type: "routine",
    category: "strength-challenges",
    description:
      "A single-session strength challenge that will test your limits with a brutal combination of heavy compound lifts and minimal rest periods.",
    longDescription:
      "The Iron Crucible is the ultimate test of raw strength and mental fortitude. This single-session challenge combines heavy compound lifts with minimal rest periods to push your body to its absolute limit. The workout follows a descending rep scheme with increasing weights, forcing you to dig deep when your muscles are screaming to stop. Only attempt this challenge when fully rested and prepared - it will demand everything you have and more.",
    duration: "90 min",
    intensity: "EXTREME",
    difficulty: "BRUTAL",
    warning:
      "This workout involves near-maximal lifts under fatigue. Spotters are mandatory for all barbell exercises. Serious injury risk without proper form and preparation.",
    exercises: [
      { name: "Back Squat", sets: 5, reps: "10-8-6-4-2", rest: "120 sec", notes: "Increase weight each set" },
      { name: "Deadlift", sets: 5, reps: "10-8-6-4-2", rest: "120 sec", notes: "Increase weight each set" },
      { name: "Bench Press", sets: 5, reps: "10-8-6-4-2", rest: "120 sec", notes: "Increase weight each set" },
      { name: "Weighted Pull-ups", sets: 4, reps: "8-6-4-2", rest: "90 sec", notes: "Increase weight each set" },
      { name: "Standing Overhead Press", sets: 4, reps: "8-6-4-2", rest: "90 sec", notes: "Increase weight each set" },
      { name: "Farmer's Walk", sets: 3, reps: "30m", rest: "60 sec", notes: "Use heaviest weight possible" },
      { name: "Weighted Plank", sets: 3, reps: "60 sec", rest: "60 sec" },
    ],
    requirements: [
      "Significant strength training experience (2+ years)",
      "Knowledge of proper lifting technique",
      "Access to a fully equipped gym",
      "Reliable spotters",
      "Pre-workout nutrition plan",
    ],
    image: "/placeholder.svg?height=400&width=800&text=Iron+Crucible",
    wearableRequired: false,
    tags: ["strength", "powerlifting", "compound-lifts", "elite"],
    completionRate: 35,
    unlocked: true,
    points: 1000,
  },
  {
    id: "inferno-hiit",
    name: "Inferno HIIT",
    type: "routine",
    category: "brutal-hiit",
    description:
      "A metabolic conditioning nightmare that will incinerate calories and push your cardiovascular system to the edge.",
    longDescription:
      "Inferno HIIT is a metabolic conditioning nightmare designed to incinerate calories and push your cardiovascular system to its absolute limits. This 45-minute session combines explosive movements, minimal rest periods, and maximum effort to create a perfect storm of fatigue. Your heart rate will remain elevated throughout as you cycle through increasingly difficult circuits. Prepare to enter the inferno - your body will be transformed in the flames.",
    duration: "45 min",
    intensity: "INTENSE",
    difficulty: "ADVANCED",
    warning:
      "This workout involves extremely high heart rates and minimal recovery. Monitor for signs of overexertion. Not suitable for those with cardiovascular conditions.",
    exercises: [
      { name: "Battle Rope Slams", sets: 4, reps: "30 sec", rest: "15 sec" },
      { name: "Box Jumps", sets: 4, reps: "30 sec", rest: "15 sec" },
      { name: "Kettlebell Swings", sets: 4, reps: "30 sec", rest: "15 sec" },
      { name: "Burpee to Pull-up", sets: 4, reps: "30 sec", rest: "15 sec" },
      { name: "Assault Bike Sprints", sets: 4, reps: "30 sec", rest: "15 sec" },
      { name: "Medicine Ball Slams", sets: 4, reps: "30 sec", rest: "15 sec" },
      { name: "Mountain Climbers", sets: 4, reps: "30 sec", rest: "15 sec" },
      { name: "Rower Sprints", sets: 4, reps: "30 sec", rest: "15 sec" },
    ],
    requirements: [
      "Good baseline cardiovascular fitness",
      "Access to specified equipment",
      "Ability to maintain high intensity",
      "Proper hydration strategy",
      "Heart rate monitoring recommended",
    ],
    image: "/placeholder.svg?height=400&width=800&text=Inferno+HIIT",
    wearableRequired: true,
    tags: ["hiit", "cardio", "fat-loss", "metabolic"],
    completionRate: 42,
    featured: true,
    unlocked: true,
    points: 750,
  },
  {
    id: "titan-strength",
    name: "Titan Strength Protocol",
    type: "challenge",
    category: "strength-challenges",
    description:
      "A 6-week strength specialization program designed to dramatically increase your maximal strength in the major compound lifts.",
    longDescription:
      "The Titan Strength Protocol is a 6-week specialized program designed to dramatically increase your maximal strength in the major compound lifts. Using advanced training techniques like wave loading, accommodating resistance, and strategic deloads, this protocol will systematically overload your nervous system and muscle fibers to produce remarkable strength gains. This is not a bodybuilding program - it's pure, focused strength development for those who want to move serious weight.",
    duration: "6 weeks",
    durationText: "6 Weeks",
    intensity: "INTENSE",
    difficulty: "ADVANCED",
    warning:
      "This program involves training at very high percentages of your 1RM. Technical breakdown under heavy loads can lead to serious injury. Proper warm-up protocols are mandatory.",
    exercises: [
      {
        name: "Wave Loading Squats",
        sets: 9,
        reps: "3-2-1-4-3-2-5-4-3",
        rest: "3 min",
        notes: "Wave loading pattern with increasing weights",
      },
      { name: "Deadlift with Chains/Bands", sets: 5, reps: 3, rest: "3 min", notes: "Accommodating resistance" },
      {
        name: "Bench Press Clusters",
        sets: 5,
        reps: "5x1",
        rest: "20 sec between reps, 3 min between sets",
        notes: "Cluster sets",
      },
      { name: "Weighted Chin-ups", sets: 5, reps: 5, rest: "2 min" },
      { name: "Safety Bar Squats", sets: 3, reps: 8, rest: "2 min", notes: "Recovery day exercise" },
      { name: "Deficit Deadlifts", sets: 3, reps: 6, rest: "2 min" },
      { name: "Floor Press", sets: 3, reps: 8, rest: "2 min" },
    ],
    requirements: [
      "Established 1RM in main lifts",
      "Access to specialized equipment (chains, bands, safety squat bar)",
      "Previous strength training experience (2+ years)",
      "Ability to train 4 days per week",
      "Proper nutrition to support recovery",
    ],
    image: "/placeholder.svg?height=400&width=800&text=Titan+Strength+Protocol",
    wearableRequired: false,
    tags: ["strength", "powerlifting", "advanced-techniques", "elite"],
    completionRate: 38,
    unlocked: true,
    points: 2500,
  },
  {
    id: "savage-circuit",
    name: "Savage Circuit Challenge",
    type: "routine",
    category: "savage-circuits",
    description:
      "A brutal circuit training session that combines strength, power, and endurance elements with minimal rest to create maximum fatigue.",
    longDescription:
      "The Savage Circuit Challenge is a brutal training session that combines strength, power, and endurance elements with minimal rest to create maximum fatigue. This circuit is designed to attack every energy system in your body simultaneously, forcing adaptations across multiple fitness domains. You'll move continuously through 10 stations, completing 3 full rounds with only brief rest between circuits. This is functional fitness pushed to savage new levels.",
    duration: "60 min",
    intensity: "BRUTAL",
    difficulty: "ADVANCED",
    warning:
      "This circuit involves complex movements under fatigue. Form breakdown is likely without proper focus and preparation. Scale movements as needed.",
    exercises: [
      { name: "Tire Flips", sets: 3, reps: 10, rest: "Move to next station" },
      { name: "Battle Rope Alternating Waves", sets: 3, reps: "30 sec", rest: "Move to next station" },
      { name: "Sandbag Cleans", sets: 3, reps: 15, rest: "Move to next station" },
      { name: "Box Jump Burpees", sets: 3, reps: 12, rest: "Move to next station" },
      { name: "Sledgehammer Strikes", sets: 3, reps: 20, rest: "Move to next station" },
      { name: "Kettlebell Swings", sets: 3, reps: 25, rest: "Move to next station" },
      { name: "TRX Atomic Push-ups", sets: 3, reps: 15, rest: "Move to next station" },
      { name: "Prowler Push/Pull", sets: 3, reps: "30m each", rest: "Move to next station" },
      { name: "Wall Ball Shots", sets: 3, reps: 20, rest: "Move to next station" },
      { name: "Assault Bike Sprint", sets: 3, reps: "30 sec max effort", rest: "2 min after full circuit" },
    ],
    requirements: [
      "Access to specialized equipment",
      "Good baseline of strength and conditioning",
      "Previous circuit training experience",
      "Proper hydration strategy",
      "Heart rate monitoring recommended",
    ],
    image: "/placeholder.svg?height=400&width=800&text=Savage+Circuit+Challenge",
    wearableRequired: true,
    tags: ["circuit", "functional", "conditioning", "full-body"],
    completionRate: 45,
    unlocked: true,
    points: 800,
  },
  {
    id: "hell-week",
    name: "Hell Week",
    type: "challenge",
    category: "endurance-trials",
    description:
      "Inspired by military selection courses, this 7-day challenge will test your physical and mental limits with multiple daily workouts and minimal recovery.",
    longDescription:
      "Hell Week is the ultimate test of mental and physical resilience. Inspired by military selection courses, this 7-day challenge subjects you to multiple daily workouts with minimal recovery time. Sleep deprivation, constant physical demands, and psychological challenges combine to push you beyond your perceived limits. Each day focuses on different aspects of fitness while maintaining a constant baseline of stress. Only the most determined will complete this challenge - many will quit, but those who endure will discover what they're truly capable of.",
    duration: "7 days",
    durationText: "7 Days (1 Week)",
    intensity: "EXTREME",
    difficulty: "BRUTAL",
    warning:
      "This challenge involves sleep deprivation and extreme physical stress. Serious risk of injury and overtraining. Medical clearance strongly recommended before attempting.",
    exercises: [
      { name: "Loaded Ruck Marches", sets: 7, reps: "5-10km daily", rest: "Minimal", notes: "Carrying 20kg backpack" },
      { name: "Ocean Swims", sets: 7, reps: "1km daily", rest: "Minimal", notes: "Cold water immersion" },
      { name: "Log PT (Team Carries)", sets: 7, reps: "30 min daily", rest: "Minimal" },
      { name: "Bodyweight Circuit", sets: 14, reps: "20 min sessions", rest: "Minimal", notes: "Twice daily" },
      { name: "Sand Berm Sprints", sets: 7, reps: "20 min daily", rest: "Minimal" },
      { name: "Obstacle Course", sets: 3, reps: "Complete course", rest: "Minimal", notes: "Days 3, 5, and 7" },
      { name: "Night Navigation Exercise", sets: 2, reps: "3 hours", rest: "Minimal", notes: "Days 2 and 6" },
    ],
    requirements: [
      "Excellent baseline fitness across all domains",
      "Previous experience with endurance events",
      "Mental resilience and stress management skills",
      "Proper nutrition and hydration strategy",
      "Support team recommended",
      "Medical clearance",
    ],
    image: "/placeholder.svg?height=400&width=800&text=Hell+Week",
    wearableRequired: true,
    inspirationSource: "Military Selection Courses",
    tags: ["military", "endurance", "mental-toughness", "team", "elite"],
    completionRate: 8,
    featured: true,
    unlockRequirement: "Complete at least 3 other Underground challenges",
    unlocked: false,
    points: 5000,
  },
  {
    id: "strongman-gauntlet",
    name: "Strongman Gauntlet",
    type: "routine",
    category: "strength-challenges",
    description:
      "A punishing workout featuring classic strongman events designed to test your functional strength, power, and grip endurance.",
    longDescription:
      "The Strongman Gauntlet is a punishing workout featuring classic strongman events designed to test your functional strength, power, and grip endurance. This session combines heavy implements, awkward objects, and timed challenges to create a comprehensive test of raw strength and conditioning. You'll move through a series of stations, each targeting different aspects of strongman performance. This is old-school strength training at its finest - no machines, no isolation work, just you versus gravity and unforgiving implements.",
    duration: "75 min",
    intensity: "BRUTAL",
    difficulty: "ADVANCED",
    warning:
      "This workout involves heavy, awkward implements that can cause injury if mishandled. Proper technique is essential. Previous experience with strongman movements recommended.",
    exercises: [
      { name: "Atlas Stone Loads", sets: 5, reps: 3, rest: "60 sec", notes: "Increasing weight each set" },
      { name: "Farmers Walk", sets: 4, reps: "50m", rest: "90 sec", notes: "Heavy as possible" },
      { name: "Tire Flips", sets: 3, reps: 10, rest: "90 sec" },
      { name: "Log Clean and Press", sets: 5, reps: 5, rest: "90 sec" },
      { name: "Yoke Walk", sets: 3, reps: "30m", rest: "120 sec" },
      { name: "Axle Bar Deadlift", sets: 5, reps: 5, rest: "90 sec" },
      { name: "Sandbag Carry", sets: 3, reps: "50m", rest: "90 sec" },
    ],
    requirements: [
      "Access to strongman implements",
      "Previous strength training experience",
      "Good technical proficiency with movements",
      "Strong core and back",
      "Lifting belt recommended",
    ],
    image: "/placeholder.svg?height=400&width=800&text=Strongman+Gauntlet",
    wearableRequired: false,
    tags: ["strongman", "functional-strength", "power", "grip-strength"],
    completionRate: 40,
    unlocked: true,
    points: 800,
  },
  {
    id: "death-by-burpees",
    name: "Death By Burpees",
    type: "routine",
    category: "brutal-hiit",
    description:
      "A simple but devastating challenge: complete 500 burpees for time. The ultimate test of mental fortitude and conditioning.",
    longDescription:
      "Death By Burpees is deceptively simple but utterly devastating: complete 500 burpees for time. This challenge strips fitness down to its most basic element - the ability to keep moving when your body is screaming to stop. There are no complex movements to master, no equipment to set up, just you versus the burpee. Your lungs will burn, your muscles will fail, and your mind will beg you to quit, but those who conquer this challenge will discover a new level of mental toughness that transfers to every aspect of life.",
    duration: "Varies (30-60 min)",
    intensity: "EXTREME",
    difficulty: "BRUTAL",
    warning:
      "This challenge involves extremely high repetition of a single movement pattern. Risk of form breakdown and repetitive strain injury is high. Scale as needed.",
    exercises: [
      { name: "Burpees", sets: 1, reps: 500, rest: "As needed", notes: "Complete 500 burpees as quickly as possible" },
    ],
    requirements: [
      "Good baseline conditioning",
      "Proper burpee technique",
      "Mental resilience",
      "Hydration strategy",
      "Heart rate monitoring recommended",
    ],
    image: "/placeholder.svg?height=400&width=800&text=Death+By+Burpees",
    wearableRequired: true,
    tags: ["conditioning", "mental-toughness", "bodyweight", "endurance"],
    completionRate: 25,
    unlocked: true,
    points: 1000,
  },
  {
    id: "gladiator-arena",
    name: "Gladiator Arena",
    type: "challenge",
    category: "team-battles",
    description:
      "A partner-based challenge inspired by ancient gladiatorial training, featuring competitive elements and team-based conditioning work.",
    longDescription:
      "The Gladiator Arena is a partner-based challenge inspired by ancient gladiatorial training. This program combines competitive elements with team-based conditioning work to create a unique training experience that builds both physical capabilities and camaraderie. You and your partner will work together through grueling circuits, then face off in head-to-head competitions. The workout concludes with the 'Arena' - a final all-out battle that will determine the ultimate gladiator. Choose your partner wisely - your success depends on their strength as much as your own.",
    duration: "90 min",
    intensity: "INTENSE",
    difficulty: "ADVANCED",
    warning:
      "This challenge involves competitive elements that may push participants beyond safe limits. Partners should monitor each other and communicate clearly.",
    exercises: [
      { name: "Partner Medicine Ball Throws", sets: 3, reps: "2 min", rest: "60 sec" },
      { name: "Alternating Sled Drags", sets: 3, reps: "50m each", rest: "60 sec" },
      { name: "Partner Carries", sets: 3, reps: "50m each", rest: "60 sec", notes: "Fireman's carry" },
      { name: "Battle Rope Face-Off", sets: 3, reps: "60 sec", rest: "60 sec", notes: "Head-to-head competition" },
      { name: "Tire Flip Relay", sets: 3, reps: "10 each", rest: "60 sec" },
      { name: "Wrestling Conditioning Circuit", sets: 3, reps: "3 min", rest: "60 sec" },
      { name: "The Arena", sets: 1, reps: "10 min", notes: "Final competitive circuit combining all elements" },
    ],
    requirements: [
      "Training partner of similar fitness level",
      "Access to specified equipment",
      "Good baseline of strength and conditioning",
      "Competitive mindset",
      "Communication skills",
    ],
    image: "/placeholder.svg?height=400&width=800&text=Gladiator+Arena",
    wearableRequired: false,
    inspirationSource: "Ancient Roman Gladiators",
    tags: ["team", "competitive", "functional", "historical"],
    completionRate: 60,
    unlocked: true,
    points: 1500,
  },
  {
    id: "mountain-crusher",
    name: "Mountain Crusher",
    type: "challenge",
    category: "endurance-trials",
    description:
      "A 4-week outdoor challenge that combines hill sprints, weighted hiking, and outdoor conditioning to build unparalleled endurance and mental toughness.",
    longDescription:
      "Mountain Crusher is a 4-week outdoor challenge that harnesses the natural difficulty of elevation to build unparalleled endurance and mental toughness. This program takes you out of the gym and into the elements, where you'll face progressively more difficult hill sprints, weighted hikes, and outdoor conditioning work. The unpredictable terrain and weather add an additional layer of difficulty that can't be replicated indoors. By the final week, you'll be conquering challenges that seemed impossible at the start, proving that the mountain isn't just outside - it's also the obstacles in your mind that you'll overcome.",
    duration: "4 weeks",
    durationText: "4 Weeks",
    intensity: "EXTREME",
    difficulty: "ADVANCED",
    warning:
      "This challenge involves training in potentially hazardous outdoor conditions. Weather awareness, proper equipment, and safety precautions are essential.",
    exercises: [
      {
        name: "Weighted Hill Climbs",
        sets: 12,
        reps: "Weekly progression",
        rest: "Walk down recovery",
        notes: "Increasing weight and/or distance each week",
      },
      { name: "Trail Running Intervals", sets: 8, reps: "30 sec max effort", rest: "60 sec jog recovery" },
      {
        name: "Weighted Hiking",
        sets: 4,
        reps: "Weekly progression",
        rest: "1 day between sessions",
        notes: "Increasing distance each week",
      },
      { name: "Outdoor Circuit", sets: 5, reps: "5 min rounds", rest: "2 min between rounds" },
      { name: "Rock Carries", sets: 3, reps: "100m", rest: "60 sec" },
      { name: "Log PT", sets: 3, reps: "Various", rest: "60 sec" },
      { name: "Summit Challenge", sets: 1, reps: "Final test", notes: "Week 4 culmination event" },
    ],
    requirements: [
      "Access to hills/mountains",
      "Proper outdoor training gear",
      "Weather-appropriate clothing",
      "Good baseline conditioning",
      "Navigation skills",
      "Safety protocols",
    ],
    image: "/placeholder.svg?height=400&width=800&text=Mountain+Crusher",
    wearableRequired: true,
    tags: ["outdoor", "endurance", "hiking", "elevation", "nature"],
    completionRate: 32,
    unlocked: true,
    points: 2000,
  },
  {
    id: "metcon-madness",
    name: "MetCon Madness",
    type: "routine",
    category: "brutal-hiit",
    description:
      "A metabolic conditioning session featuring five high-intensity circuits designed to maximize calorie burn and cardiovascular demand.",
    longDescription:
      "MetCon Madness is a metabolic conditioning nightmare featuring five high-intensity circuits designed to maximize calorie burn and cardiovascular demand. Each circuit targets different movement patterns and energy systems, creating a comprehensive conditioning effect that leaves no weakness unexposed. You'll move through timed stations with minimal rest, maintaining maximum intensity throughout. This is not about pacing yourself - it's about pushing to your absolute limit at every station, then somehow finding more when you think you're done. Your metabolism will be elevated for hours after completing this brutal session.",
    duration: "50 min",
    intensity: "INTENSE",
    difficulty: "ADVANCED",
    warning:
      "This workout involves extremely high heart rates sustained for extended periods. Monitor for signs of overexertion. Scale intensity as needed.",
    exercises: [
      {
        name: "Circuit 1: Dumbbell Complex",
        sets: 4,
        reps: "45 sec per movement",
        rest: "15 sec between movements, 2 min between rounds",
        notes: "Clean, Front Squat, Push Press, Reverse Lunge",
      },
      {
        name: "Circuit 2: Bodyweight Blast",
        sets: 4,
        reps: "40 sec per movement",
        rest: "10 sec between movements, 2 min between rounds",
        notes: "Pull-ups, Push-ups, Box Jumps, V-ups",
      },
      {
        name: "Circuit 3: Kettlebell Crusher",
        sets: 4,
        reps: "40 sec per movement",
        rest: "10 sec between movements, 2 min between rounds",
        notes: "Swings, Goblet Squats, Snatches, Turkish Get-ups",
      },
      {
        name: "Circuit 4: Cardio Surge",
        sets: 4,
        reps: "30 sec per movement",
        rest: "10 sec between movements, 2 min between rounds",
        notes: "Assault Bike, Rower, Ski Erg, Burpees",
      },
      {
        name: "Circuit 5: The Finisher",
        sets: 2,
        reps: "60 sec per movement",
        rest: "No rest between movements, 60 sec between rounds",
        notes: "Thrusters, Pull-ups, Box Jump Burpees, Toes to Bar",
      },
    ],
    requirements: [
      "Good baseline conditioning",
      "Familiarity with all movements",
      "Access to specified equipment",
      "Proper hydration strategy",
      "Heart rate monitoring recommended",
    ],
    image: "/placeholder.svg?height=400&width=800&text=MetCon+Madness",
    wearableRequired: true,
    tags: ["metcon", "hiit", "conditioning", "fat-loss", "cardio"],
    completionRate: 48,
    unlocked: true,
    points: 750,
  },
  {
    id: "iron-warrior",
    name: "Iron Warrior Challenge",
    type: "challenge",
    category: "legendary-workouts",
    description:
      "A 12-week progressive strength and conditioning program inspired by ancient warrior training methodologies from around the world.",
    longDescription:
      "The Iron Warrior Challenge is a 12-week progressive program that draws inspiration from ancient warrior training methodologies from around the world. Each 4-week phase focuses on different warrior traditions: Viking combat preparation, Samurai conditioning, and Maasai warrior endurance. The program combines strength training with unconventional implements, endurance work, and skill development to create a comprehensive warrior's physique and mindset. This is not just physical training - it's a journey through history's most effective combat preparation systems.",
    duration: "12 weeks",
    durationText: "12 Weeks",
    intensity: "INTENSE",
    difficulty: "ADVANCED",
    warning:
      "This program involves unconventional training methods and implements that may pose injury risk without proper instruction. Research proper technique for all movements.",
    exercises: [
      { name: "Mace Training", sets: 4, reps: 10, rest: "60 sec", notes: "360s, 10-to-2s, gravediggers" },
      { name: "Shield Carries", sets: 3, reps: "100m", rest: "60 sec", notes: "Weighted plate held like a shield" },
      {
        name: "Sword Pattern Training",
        sets: 5,
        reps: "1 min",
        rest: "60 sec",
        notes: "Using steel pipe or training sword",
      },
      { name: "Weighted Vest Runs", sets: 3, reps: "800m", rest: "2 min" },
      { name: "Spear Throwing Practice", sets: 5, reps: 10, rest: "60 sec", notes: "Using javelin or substitute" },
      { name: "Battle Rope Drills", sets: 4, reps: "30 sec", rest: "30 sec" },
      { name: "Warrior Conditioning Circuit", sets: 3, reps: "5 min", rest: "2 min" },
    ],
    requirements: [
      "Access to unconventional training implements",
      "Good baseline of strength and conditioning",
      "Research into historical training methods",
      "Ability to train 4-5 days per week",
      "Open mind to non-traditional training",
    ],
    image: "/placeholder.svg?height=400&width=800&text=Iron+Warrior+Challenge",
    wearableRequired: false,
    inspirationSource: "Ancient Warrior Training",
    tags: ["historical", "unconventional", "functional", "warrior", "elite"],
    completionRate: 28,
    unlocked: true,
    points: 3000,
  },
]

export function getChallengeById(id: string): UndergroundChallenge | undefined {
  return undergroundChallenges.find((challenge) => challenge.id === id)
}

export function getChallengesByCategory(categoryId: string): UndergroundChallenge[] {
  return undergroundChallenges.filter((challenge) => challenge.category === categoryId)
}

export function getFeaturedChallenges(): UndergroundChallenge[] {
  return undergroundChallenges.filter((challenge) => challenge.featured)
}

