export type AvatarCategory =
  | "body"
  | "face"
  | "hair"
  | "facial_hair"
  | "eyes"
  | "eyebrows"
  | "mouth"
  | "nose"
  | "outfit"
  | "accessories"
  | "background"
  | "skin"

export type AvatarItem = {
  id: string
  name: string
  category: AvatarCategory
  imageUrl: string
  thumbnailUrl: string
  requiredTier?: string
  isExclusive?: boolean
  clanThemeExclusive?: string
  achievementUnlock?: string
  description?: string
}

export type AvatarCustomization = {
  [key in AvatarCategory]?: string // Item ID
}

// High-quality realistic avatar items
export const avatarItems: AvatarItem[] = [
  // Bodies - Realistic physique options
  {
    id: "body-001",
    name: "Athletic",
    category: "body",
    imageUrl: "/assets/avatars/bodies/athletic-body.png",
    thumbnailUrl: "/assets/avatars/bodies/thumbnails/athletic-body.png",
    description: "A fit, athletic body type with defined muscles",
  },
  {
    id: "body-002",
    name: "Muscular",
    category: "body",
    imageUrl: "/assets/avatars/bodies/muscular-body.png",
    thumbnailUrl: "/assets/avatars/bodies/thumbnails/muscular-body.png",
    requiredTier: "tier-3",
    description: "A well-defined, muscular physique with prominent definition",
  },
  {
    id: "body-003",
    name: "Lean",
    category: "body",
    imageUrl: "/assets/avatars/bodies/lean-body.png",
    thumbnailUrl: "/assets/avatars/bodies/thumbnails/lean-body.png",
    description: "A slim, toned body type with light muscle definition",
  },
  {
    id: "body-004",
    name: "Curvy",
    category: "body",
    imageUrl: "/assets/avatars/bodies/curvy-body.png",
    thumbnailUrl: "/assets/avatars/bodies/thumbnails/curvy-body.png",
    description: "A curvy, strong body type with natural proportions",
  },
  {
    id: "body-005",
    name: "Petite",
    category: "body",
    imageUrl: "/assets/avatars/bodies/petite-body.png",
    thumbnailUrl: "/assets/avatars/bodies/thumbnails/petite-body.png",
    description: "A smaller, compact body type with natural muscle tone",
  },
  {
    id: "body-006",
    name: "Tall",
    category: "body",
    imageUrl: "/assets/avatars/bodies/tall-body.png",
    thumbnailUrl: "/assets/avatars/bodies/thumbnails/tall-body.png",
    description: "A tall, elongated body type with balanced proportions",
  },
  {
    id: "body-007",
    name: "Powerlifter",
    category: "body",
    imageUrl: "/assets/avatars/bodies/powerlifter-body.png",
    thumbnailUrl: "/assets/avatars/bodies/thumbnails/powerlifter-body.png",
    requiredTier: "tier-4",
    description: "A strong, dense physique built for maximum strength",
  },
  {
    id: "body-008",
    name: "Bodybuilder",
    category: "body",
    imageUrl: "/assets/avatars/bodies/bodybuilder-body.png",
    thumbnailUrl: "/assets/avatars/bodies/thumbnails/bodybuilder-body.png",
    requiredTier: "tier-5",
    description: "An extremely muscular physique with competition-level definition",
  },
  {
    id: "body-009",
    name: "Yoga",
    category: "body",
    imageUrl: "/assets/avatars/bodies/yoga-body.png",
    thumbnailUrl: "/assets/avatars/bodies/thumbnails/yoga-body.png",
    description: "A flexible, balanced physique with elongated muscles",
  },
  {
    id: "body-010",
    name: "Swimmer",
    category: "body",
    imageUrl: "/assets/avatars/bodies/swimmer-body.png",
    thumbnailUrl: "/assets/avatars/bodies/thumbnails/swimmer-body.png",
    description: "A streamlined physique with broad shoulders and lean muscle",
  },

  // Faces - Realistic face shapes
  {
    id: "face-001",
    name: "Oval",
    category: "face",
    imageUrl: "/assets/avatars/faces/oval-face.png",
    thumbnailUrl: "/assets/avatars/faces/thumbnails/oval-face.png",
    description: "A balanced, oval-shaped face",
  },
  {
    id: "face-002",
    name: "Square",
    category: "face",
    imageUrl: "/assets/avatars/faces/square-face.png",
    thumbnailUrl: "/assets/avatars/faces/thumbnails/square-face.png",
    description: "A strong, square-shaped face with defined jawline",
  },
  {
    id: "face-003",
    name: "Round",
    category: "face",
    imageUrl: "/assets/avatars/faces/round-face.png",
    thumbnailUrl: "/assets/avatars/faces/thumbnails/round-face.png",
    description: "A soft, round-shaped face with gentle features",
  },
  {
    id: "face-004",
    name: "Heart",
    category: "face",
    imageUrl: "/assets/avatars/faces/heart-face.png",
    thumbnailUrl: "/assets/avatars/faces/thumbnails/heart-face.png",
    description: "A heart-shaped face with wider forehead and pointed chin",
  },
  {
    id: "face-005",
    name: "Diamond",
    category: "face",
    imageUrl: "/assets/avatars/faces/diamond-face.png",
    thumbnailUrl: "/assets/avatars/faces/thumbnails/diamond-face.png",
    description: "A diamond-shaped face with high cheekbones",
  },
  {
    id: "face-006",
    name: "Rectangular",
    category: "face",
    imageUrl: "/assets/avatars/faces/rectangular-face.png",
    thumbnailUrl: "/assets/avatars/faces/thumbnails/rectangular-face.png",
    description: "A longer face with straight sides and defined angles",
  },
  {
    id: "face-007",
    name: "Triangular",
    category: "face",
    imageUrl: "/assets/avatars/faces/triangular-face.png",
    thumbnailUrl: "/assets/avatars/faces/thumbnails/triangular-face.png",
    description: "A face with narrow forehead and wider jawline",
  },
  {
    id: "face-008",
    name: "Chiseled",
    category: "face",
    imageUrl: "/assets/avatars/faces/chiseled-face.png",
    thumbnailUrl: "/assets/avatars/faces/thumbnails/chiseled-face.png",
    requiredTier: "tier-3",
    description: "A face with highly defined features and strong bone structure",
  },

  // Hair - Realistic hairstyles
  {
    id: "hair-001",
    name: "Short Crop",
    category: "hair",
    imageUrl: "/assets/avatars/hair/short-crop.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/short-crop.png",
    description: "A short, cropped hairstyle",
  },
  {
    id: "hair-002",
    name: "Medium Waves",
    category: "hair",
    imageUrl: "/assets/avatars/hair/medium-waves.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/medium-waves.png",
    description: "Medium-length wavy hair",
  },
  {
    id: "hair-003",
    name: "Long Straight",
    category: "hair",
    imageUrl: "/assets/avatars/hair/long-straight.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/long-straight.png",
    description: "Long, straight flowing hair",
  },
  {
    id: "hair-004",
    name: "Warrior Braids",
    category: "hair",
    imageUrl: "/assets/avatars/hair/warrior-braids.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/warrior-braids.png",
    description: "Fierce warrior braids with intricate patterns",
  },
  {
    id: "hair-005",
    name: "Natural Curls",
    category: "hair",
    imageUrl: "/assets/avatars/hair/natural-curls.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/natural-curls.png",
    description: "Natural, voluminous curly hair",
  },
  {
    id: "hair-006",
    name: "Afro",
    category: "hair",
    imageUrl: "/assets/avatars/hair/afro.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/afro.png",
    description: "Classic afro hairstyle with volume and texture",
  },
  {
    id: "hair-007",
    name: "Buzzcut",
    category: "hair",
    imageUrl: "/assets/avatars/hair/buzzcut.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/buzzcut.png",
    description: "Very short buzzcut style",
  },
  {
    id: "hair-008",
    name: "Locs",
    category: "hair",
    imageUrl: "/assets/avatars/hair/locs.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/locs.png",
    description: "Stylish locs with varied lengths",
  },
  {
    id: "hair-009",
    name: "Undercut",
    category: "hair",
    imageUrl: "/assets/avatars/hair/undercut.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/undercut.png",
    description: "Modern undercut with longer top",
  },
  {
    id: "hair-010",
    name: "Mohawk",
    category: "hair",
    imageUrl: "/assets/avatars/hair/mohawk.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/mohawk.png",
    description: "Bold mohawk with shaved sides",
  },
  {
    id: "hair-011",
    name: "Fade",
    category: "hair",
    imageUrl: "/assets/avatars/hair/fade.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/fade.png",
    description: "Clean fade with textured top",
  },
  {
    id: "hair-012",
    name: "Bun",
    category: "hair",
    imageUrl: "/assets/avatars/hair/bun.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/bun.png",
    description: "Stylish top bun with clean sides",
  },
  {
    id: "hair-013",
    name: "Ponytail",
    category: "hair",
    imageUrl: "/assets/avatars/hair/ponytail.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/ponytail.png",
    description: "Athletic ponytail hairstyle",
  },
  {
    id: "hair-014",
    name: "Pixie Cut",
    category: "hair",
    imageUrl: "/assets/avatars/hair/pixie-cut.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/pixie-cut.png",
    description: "Short, textured pixie cut",
  },
  {
    id: "hair-015",
    name: "Shaggy",
    category: "hair",
    imageUrl: "/assets/avatars/hair/shaggy.png",
    thumbnailUrl: "/assets/avatars/hair/thumbnails/shaggy.png",
    description: "Textured, layered shaggy hairstyle",
  },

  // Outfits - High-quality fitness apparel
  {
    id: "outfit-001",
    name: "Basic Training",
    category: "outfit",
    imageUrl: "/assets/avatars/outfits/basic-training.png",
    thumbnailUrl: "/assets/avatars/outfits/thumbnails/basic-training.png",
    description: "Standard workout attire with moisture-wicking fabric",
  },
  {
    id: "outfit-002",
    name: "Contender",
    category: "outfit",
    imageUrl: "/assets/avatars/outfits/contender.png",
    thumbnailUrl: "/assets/avatars/outfits/thumbnails/contender.png",
    requiredTier: "tier-2",
    description: "Professional-grade outfit for serious athletes",
  },
  {
    id: "outfit-003",
    name: "Warrior Gear",
    category: "outfit",
    imageUrl: "/assets/avatars/outfits/warrior-gear.png",
    thumbnailUrl: "/assets/avatars/outfits/thumbnails/warrior-gear.png",
    description: "Battle-ready fitness attire with reinforced panels",
  },
  {
    id: "outfit-004",
    name: "Beast Mode Armor",
    category: "outfit",
    imageUrl: "/assets/avatars/outfits/beast-mode.png",
    thumbnailUrl: "/assets/avatars/outfits/thumbnails/beast-mode.png",
    requiredTier: "tier-4",
    description: "Intimidating fitness armor with performance enhancements",
  },
  {
    id: "outfit-005",
    name: "Unstoppable Legend",
    category: "outfit",
    imageUrl: "/assets/avatars/outfits/unstoppable-legend.png",
    thumbnailUrl: "/assets/avatars/outfits/thumbnails/unstoppable-legend.png",
    requiredTier: "tier-5",
    isExclusive: true,
    description: "Legendary outfit for the fitness elite with custom detailing",
  },
  {
    id: "outfit-006",
    name: "Yoga Flow",
    category: "outfit",
    imageUrl: "/assets/avatars/outfits/yoga-flow.png",
    thumbnailUrl: "/assets/avatars/outfits/thumbnails/yoga-flow.png",
    description: "Flexible, breathable yoga attire for maximum movement",
  },
  {
    id: "outfit-007",
    name: "Powerlifter",
    category: "outfit",
    imageUrl: "/assets/avatars/outfits/powerlifter.png",
    thumbnailUrl: "/assets/avatars/outfits/thumbnails/powerlifter.png",
    description: "Reinforced outfit designed for maximum lifts",
  },
  {
    id: "outfit-008",
    name: "Runner's Elite",
    category: "outfit",
    imageUrl: "/assets/avatars/outfits/runners-elite.png",
    thumbnailUrl: "/assets/avatars/outfits/thumbnails/runners-elite.png",
    description: "Aerodynamic running gear with cooling technology",
  },
  {
    id: "outfit-009",
    name: "Crossfit Champion",
    category: "outfit",
    imageUrl: "/assets/avatars/outfits/crossfit-champion.png",
    thumbnailUrl: "/assets/avatars/outfits/thumbnails/crossfit-champion.png",
    description: "Versatile outfit for varied workout styles",
  },
  {
    id: "outfit-010",
    name: "Bodybuilder Classic",
    category: "outfit",
    imageUrl: "/assets/avatars/outfits/bodybuilder-classic.png",
    thumbnailUrl: "/assets/avatars/outfits/thumbnails/bodybuilder-classic.png",
    description: "Competition-style outfit that showcases physique",
  },
  {
    id: "outfit-011",
    name: "Street Workout",
    category: "outfit",
    imageUrl: "/assets/avatars/outfits/street-workout.png",
    thumbnailUrl: "/assets/avatars/outfits/thumbnails/street-workout.png",
    description: "Urban-inspired workout clothes with style and function",
  },
  {
    id: "outfit-012",
    name: "MMA Fighter",
    category: "outfit",
    imageUrl: "/assets/avatars/outfits/mma-fighter.png",
    thumbnailUrl: "/assets/avatars/outfits/thumbnails/mma-fighter.png",
    description: "Combat-ready outfit with flexibility and protection",
  },

  // Accessories - Detailed fitness accessories
  {
    id: "accessory-001",
    name: "Performance Headband",
    category: "accessories",
    imageUrl: "/assets/avatars/accessories/performance-headband.png",
    thumbnailUrl: "/assets/avatars/accessories/thumbnails/performance-headband.png",
    description: "Moisture-wicking headband for intense workouts",
  },
  {
    id: "accessory-002",
    name: "Pro Wristbands",
    category: "accessories",
    imageUrl: "/assets/avatars/accessories/pro-wristbands.png",
    thumbnailUrl: "/assets/avatars/accessories/thumbnails/pro-wristbands.png",
    description: "Professional-grade wristbands with support",
  },
  {
    id: "accessory-003",
    name: "Wolf Pendant",
    category: "accessories",
    imageUrl: "/assets/avatars/accessories/wolf-pendant.png",
    thumbnailUrl: "/assets/avatars/accessories/thumbnails/wolf-pendant.png",
    clanThemeExclusive: "wolves",
    description: "A detailed wolf pendant showing clan allegiance",
  },
  {
    id: "accessory-004",
    name: "Spartan Shield",
    category: "accessories",
    imageUrl: "/assets/avatars/accessories/spartan-shield.png",
    thumbnailUrl: "/assets/avatars/accessories/thumbnails/spartan-shield.png",
    description: "A small shield emblem showing warrior spirit",
  },
  {
    id: "accessory-005",
    name: "Champion Belt",
    category: "accessories",
    imageUrl: "/assets/avatars/accessories/champion-belt.png",
    thumbnailUrl: "/assets/avatars/accessories/thumbnails/champion-belt.png",
    achievementUnlock: "ach-005",
    description: "A prestigious belt awarded to challenge champions",
  },
  {
    id: "accessory-006",
    name: "Fitness Watch",
    category: "accessories",
    imageUrl: "/assets/avatars/accessories/fitness-watch.png",
    thumbnailUrl: "/assets/avatars/accessories/thumbnails/fitness-watch.png",
    description: "High-tech fitness tracker with detailed metrics",
  },
  {
    id: "accessory-007",
    name: "Lifting Gloves",
    category: "accessories",
    imageUrl: "/assets/avatars/accessories/lifting-gloves.png",
    thumbnailUrl: "/assets/avatars/accessories/thumbnails/lifting-gloves.png",
    description: "Premium lifting gloves with wrist support",
  },
  {
    id: "accessory-008",
    name: "Hydration Pack",
    category: "accessories",
    imageUrl: "/assets/avatars/accessories/hydration-pack.png",
    thumbnailUrl: "/assets/avatars/accessories/thumbnails/hydration-pack.png",
    description: "Streamlined hydration system for endurance athletes",
  },
  {
    id: "accessory-009",
    name: "Motivational Bracelet",
    category: "accessories",
    imageUrl: "/assets/avatars/accessories/motivational-bracelet.png",
    thumbnailUrl: "/assets/avatars/accessories/thumbnails/motivational-bracelet.png",
    description: "Inspirational bracelet with custom mantra",
  },
  {
    id: "accessory-010",
    name: "Compression Sleeves",
    category: "accessories",
    imageUrl: "/assets/avatars/accessories/compression-sleeves.png",
    thumbnailUrl: "/assets/avatars/accessories/thumbnails/compression-sleeves.png",
    description: "Performance compression sleeves for muscle support",
  },
  {
    id: "accessory-011",
    name: "Gym Bag",
    category: "accessories",
    imageUrl: "/assets/avatars/accessories/gym-bag.png",
    thumbnailUrl: "/assets/avatars/accessories/thumbnails/gym-bag.png",
    description: "Premium gym bag with compartments for all gear",
  },
  {
    id: "accessory-012",
    name: "Lifting Belt",
    category: "accessories",
    imageUrl: "/assets/avatars/accessories/lifting-belt.png",
    thumbnailUrl: "/assets/avatars/accessories/thumbnails/lifting-belt.png",
    description: "Professional lifting belt for maximum support",
  },

  // Backgrounds - High-quality environments
  {
    id: "background-001",
    name: "Modern Gym",
    category: "background",
    imageUrl: "/assets/avatars/backgrounds/modern-gym.png",
    thumbnailUrl: "/assets/avatars/backgrounds/thumbnails/modern-gym.png",
    description: "State-of-the-art gym with premium equipment",
  },
  {
    id: "background-002",
    name: "Mountain Trail",
    category: "background",
    imageUrl: "/assets/avatars/backgrounds/mountain-trail.png",
    thumbnailUrl: "/assets/avatars/backgrounds/thumbnails/mountain-trail.png",
    description: "Scenic mountain trail for outdoor training",
  },
  {
    id: "background-003",
    name: "Competition Arena",
    category: "background",
    imageUrl: "/assets/avatars/backgrounds/competition-arena.png",
    thumbnailUrl: "/assets/avatars/backgrounds/thumbnails/competition-arena.png",
    requiredTier: "tier-3",
    description: "Professional competition venue with audience",
  },
  {
    id: "background-004",
    name: "Champion's Arena",
    category: "background",
    imageUrl: "/assets/avatars/backgrounds/champions-arena.png",
    thumbnailUrl: "/assets/avatars/backgrounds/thumbnails/champions-arena.png",
    requiredTier: "tier-5",
    isExclusive: true,
    description: "The legendary arena where champions are crowned",
  },
  {
    id: "background-005",
    name: "Beach Workout",
    category: "background",
    imageUrl: "/assets/avatars/backgrounds/beach-workout.png",
    thumbnailUrl: "/assets/avatars/backgrounds/thumbnails/beach-workout.png",
    description: "Pristine beach setting for sand-based training",
  },
  {
    id: "background-006",
    name: "Urban Rooftop",
    category: "background",
    imageUrl: "/assets/avatars/backgrounds/urban-rooftop.png",
    thumbnailUrl: "/assets/avatars/backgrounds/thumbnails/urban-rooftop.png",
    description: "City rooftop with skyline views for urban workouts",
  },
  {
    id: "background-007",
    name: "Home Gym",
    category: "background",
    imageUrl: "/assets/avatars/backgrounds/home-gym.png",
    thumbnailUrl: "/assets/avatars/backgrounds/thumbnails/home-gym.png",
    description: "Well-equipped home gym setup",
  },
  {
    id: "background-008",
    name: "Forest Trail",
    category: "background",
    imageUrl: "/assets/avatars/backgrounds/forest-trail.png",
    thumbnailUrl: "/assets/avatars/backgrounds/thumbnails/forest-trail.png",
    description: "Serene forest path for nature workouts",
  },
  {
    id: "background-009",
    name: "Boxing Ring",
    category: "background",
    imageUrl: "/assets/avatars/backgrounds/boxing-ring.png",
    thumbnailUrl: "/assets/avatars/backgrounds/thumbnails/boxing-ring.png",
    description: "Professional boxing ring with spotlights",
  },
  {
    id: "background-010",
    name: "Yoga Studio",
    category: "background",
    imageUrl: "/assets/avatars/backgrounds/yoga-studio.png",
    thumbnailUrl: "/assets/avatars/backgrounds/thumbnails/yoga-studio.png",
    description: "Peaceful yoga studio with natural light",
  },

  // Skin Tones - Realistic skin options
  {
    id: "skin-001",
    name: "Fair",
    category: "skin",
    imageUrl: "/assets/avatars/skin/fair.png",
    thumbnailUrl: "/assets/avatars/skin/thumbnails/fair.png",
    description: "Fair skin tone",
  },
  {
    id: "skin-002",
    name: "Light",
    category: "skin",
    imageUrl: "/assets/avatars/skin/light.png",
    thumbnailUrl: "/assets/avatars/skin/thumbnails/light.png",
    description: "Light skin tone",
  },
  {
    id: "skin-003",
    name: "Medium",
    category: "skin",
    imageUrl: "/assets/avatars/skin/medium.png",
    thumbnailUrl: "/assets/avatars/skin/thumbnails/medium.png",
    description: "Medium skin tone",
  },
  {
    id: "skin-004",
    name: "Tan",
    category: "skin",
    imageUrl: "/assets/avatars/skin/tan.png",
    thumbnailUrl: "/assets/avatars/skin/thumbnails/tan.png",
    description: "Tan skin tone",
  },
  {
    id: "skin-005",
    name: "Deep",
    category: "skin",
    imageUrl: "/assets/avatars/skin/deep.png",
    thumbnailUrl: "/assets/avatars/skin/thumbnails/deep.png",
    description: "Deep skin tone",
  },
  {
    id: "skin-006",
    name: "Rich",
    category: "skin",
    imageUrl: "/assets/avatars/skin/rich.png",
    thumbnailUrl: "/assets/avatars/skin/thumbnails/rich.png",
    description: "Rich, deep skin tone",
  },
  {
    id: "skin-007",
    name: "Olive",
    category: "skin",
    imageUrl: "/assets/avatars/skin/olive.png",
    thumbnailUrl: "/assets/avatars/skin/thumbnails/olive.png",
    description: "Olive skin tone",
  },
  {
    id: "skin-008",
    name: "Golden",
    category: "skin",
    imageUrl: "/assets/avatars/skin/golden.png",
    thumbnailUrl: "/assets/avatars/skin/thumbnails/golden.png",
    description: "Golden skin tone",
  },

  // Facial Hair - Realistic facial hair options
  {
    id: "facial-hair-001",
    name: "Clean Shaven",
    category: "facial_hair",
    imageUrl: "/assets/avatars/facial-hair/clean-shaven.png",
    thumbnailUrl: "/assets/avatars/facial-hair/thumbnails/clean-shaven.png",
    description: "No facial hair, clean shaven look",
  },
  {
    id: "facial-hair-002",
    name: "Light Stubble",
    category: "facial_hair",
    imageUrl: "/assets/avatars/facial-hair/light-stubble.png",
    thumbnailUrl: "/assets/avatars/facial-hair/thumbnails/light-stubble.png",
    description: "Light, even stubble across the face",
  },
  {
    id: "facial-hair-003",
    name: "Full Beard",
    category: "facial_hair",
    imageUrl: "/assets/avatars/facial-hair/full-beard.png",
    thumbnailUrl: "/assets/avatars/facial-hair/thumbnails/full-beard.png",
    description: "Thick, full beard with natural texture",
  },
  {
    id: "facial-hair-004",
    name: "Goatee",
    category: "facial_hair",
    imageUrl: "/assets/avatars/facial-hair/goatee.png",
    thumbnailUrl: "/assets/avatars/facial-hair/thumbnails/goatee.png",
    description: "Defined goatee with clean edges",
  },
  {
    id: "facial-hair-005",
    name: "Mustache",
    category: "facial_hair",
    imageUrl: "/assets/avatars/facial-hair/mustache.png",
    thumbnailUrl: "/assets/avatars/facial-hair/thumbnails/mustache.png",
    description: "Classic mustache with defined shape",
  },
  {
    id: "facial-hair-006",
    name: "Van Dyke",
    category: "facial_hair",
    imageUrl: "/assets/avatars/facial-hair/van-dyke.png",
    thumbnailUrl: "/assets/avatars/facial-hair/thumbnails/van-dyke.png",
    description: "Mustache and goatee combination with clean cheeks",
  },
  {
    id: "facial-hair-007",
    name: "Mutton Chops",
    category: "facial_hair",
    imageUrl: "/assets/avatars/facial-hair/mutton-chops.png",
    thumbnailUrl: "/assets/avatars/facial-hair/thumbnails/mutton-chops.png",
    description: "Sideburns extending to jawline with clean chin",
  },
  {
    id: "facial-hair-008",
    name: "Soul Patch",
    category: "facial_hair",
    imageUrl: "/assets/avatars/facial-hair/soul-patch.png",
    thumbnailUrl: "/assets/avatars/facial-hair/thumbnails/soul-patch.png",
    description: "Small patch of hair just below the lower lip",
  },
  {
    id: "facial-hair-009",
    name: "Anchor Beard",
    category: "facial_hair",
    imageUrl: "/assets/avatars/facial-hair/anchor-beard.png",
    thumbnailUrl: "/assets/avatars/facial-hair/thumbnails/anchor-beard.png",
    description: "Beard shaped like an anchor with clean cheeks",
  },
  {
    id: "facial-hair-010",
    name: "Boxed Beard",
    category: "facial_hair",
    imageUrl: "/assets/avatars/facial-hair/boxed-beard.png",
    thumbnailUrl: "/assets/avatars/facial-hair/thumbnails/boxed-beard.png",
    description: "Neatly trimmed beard with clean, defined edges",
  },

  // Eyes - Realistic eye options
  {
    id: "eyes-001",
    name: "Almond",
    category: "eyes",
    imageUrl: "/assets/avatars/eyes/almond.png",
    thumbnailUrl: "/assets/avatars/eyes/thumbnails/almond.png",
    description: "Almond-shaped eyes with natural expression",
  },
  {
    id: "eyes-002",
    name: "Round",
    category: "eyes",
    imageUrl: "/assets/avatars/eyes/round.png",
    thumbnailUrl: "/assets/avatars/eyes/thumbnails/round.png",
    description: "Round, expressive eyes",
  },
  {
    id: "eyes-003",
    name: "Hooded",
    category: "eyes",
    imageUrl: "/assets/avatars/eyes/hooded.png",
    thumbnailUrl: "/assets/avatars/eyes/thumbnails/hooded.png",
    description: "Hooded eyes with natural depth",
  },
  {
    id: "eyes-004",
    name: "Deep Set",
    category: "eyes",
    imageUrl: "/assets/avatars/eyes/deep-set.png",
    thumbnailUrl: "/assets/avatars/eyes/thumbnails/deep-set.png",
    description: "Deep-set eyes with defined brow",
  },
  {
    id: "eyes-005",
    name: "Upturned",
    category: "eyes",
    imageUrl: "/assets/avatars/eyes/upturned.png",
    thumbnailUrl: "/assets/avatars/eyes/thumbnails/upturned.png",
    description: "Upturned eyes with lifted outer corners",
  },
  {
    id: "eyes-006",
    name: "Downturned",
    category: "eyes",
    imageUrl: "/assets/avatars/eyes/downturned.png",
    thumbnailUrl: "/assets/avatars/eyes/thumbnails/downturned.png",
    description: "Downturned eyes with lowered outer corners",
  },
  {
    id: "eyes-007",
    name: "Monolid",
    category: "eyes",
    imageUrl: "/assets/avatars/eyes/monolid.png",
    thumbnailUrl: "/assets/avatars/eyes/thumbnails/monolid.png",
    description: "Monolid eyes with smooth eyelid",
  },
  {
    id: "eyes-008",
    name: "Wide Set",
    category: "eyes",
    imageUrl: "/assets/avatars/eyes/wide-set.png",
    thumbnailUrl: "/assets/avatars/eyes/thumbnails/wide-set.png",
    description: "Wide-set eyes with balanced spacing",
  },
]

export function getAvatarItemsByCategory(category: AvatarCategory): AvatarItem[] {
  return avatarItems.filter((item) => item.category === category)
}

export function getAvatarItemById(itemId: string): AvatarItem | undefined {
  return avatarItems.find((item) => item.id === itemId)
}

export function getUnlockedAvatarItems(
  userTier: string,
  userAchievements: string[],
  userClanTheme?: string,
): AvatarItem[] {
  // Get the tier index (higher index = higher tier)
  const tierIndex = userTier ? Number.parseInt(userTier.split("-")[1]) : 1

  return avatarItems.filter((item) => {
    // If item has no restrictions, it's available
    if (!item.requiredTier && !item.achievementUnlock && !item.clanThemeExclusive) {
      return true
    }

    // Check tier requirement
    if (item.requiredTier) {
      const requiredTierIndex = Number.parseInt(item.requiredTier.split("-")[1])
      if (tierIndex < requiredTierIndex) {
        return false
      }
    }

    // Check achievement requirement
    if (item.achievementUnlock && !userAchievements.includes(item.achievementUnlock)) {
      return false
    }

    // Check clan theme requirement
    if (item.clanThemeExclusive && item.clanThemeExclusive !== userClanTheme) {
      return false
    }

    return true
  })
}

export function renderAvatar(customization: AvatarCustomization): string {
  // In a real implementation, this would combine the selected items into a single avatar image
  // For this example, we'll create a more detailed placeholder that shows the customization
  const bodyType = customization.body?.split("-")[1] || "001"
  const hairType = customization.hair?.split("-")[1] || "001"
  const outfitType = customization.outfit?.split("-")[1] || "001"
  const skinTone = customization.skin?.split("-")[1] || "001"
  const facialHair = customization.facial_hair?.split("-")[1] || "001"
  const accessory = customization.accessories?.split("-")[1] || "001"
  const background = customization.background?.split("-")[1] || "001"
  const eyes = customization.eyes?.split("-")[1] || "001"

  // Create a more descriptive avatar URL that shows all selected features
  return `/assets/avatars/rendered/avatar-${bodyType}-${hairType}-${outfitType}-${skinTone}-${facialHair}-${accessory}-${background}-${eyes}.png`
}

