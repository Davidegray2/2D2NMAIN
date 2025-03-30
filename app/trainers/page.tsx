"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { BrandName } from "@/components/brand-name"
import { UserPlus, Mail, Award, Users } from "lucide-react"

export default function TrainersDirectoryPage() {
  // const [searchQuery, setSearchQuery] = useState("")
  // const [specialtyFilter, setSpecialtyFilter] = useState("all")
  // const [availabilityFilter, setAvailabilityFilter] = useState("all")
  // const [experienceFilter, setExperienceFilter] = useState("all")
  // const [activeTab, setActiveTab] = useState("all")

  // // Sample trainers data
  // const trainers = [
  //   {
  //     id: "alex-johnson",
  //     name: "Alex Johnson",
  //     image: "/images/trainers/trainer-1.jpg",
  //     specialty: "Strength & Conditioning",
  //     specialties: ["Powerlifting", "HIIT", "Nutrition"],
  //     experience: "8 years",
  //     rating: 4.9,
  //     reviews: 127,
  //     availability: "Weekdays, Evenings",
  //     nextAvailable: "Today, 3:00 PM",
  //     price: "$45",
  //     featured: true,
  //     bio: "Former competitive powerlifter with a passion for helping clients build strength and confidence. Specializes in strength training, HIIT, and nutrition planning.",
  //   },
  //   {
  //     id: "sarah-williams",
  //     name: "Sarah Williams",
  //     image: "/images/trainers/trainer-2.jpg",
  //     specialty: "Yoga & Flexibility",
  //     specialties: ["Vinyasa Yoga", "Meditation", "Recovery"],
  //     experience: "6 years",
  //     rating: 4.8,
  //     reviews: 93,
  //     availability: "Mornings, Weekends",
  //     nextAvailable: "Tomorrow, 10:00 AM",
  //     price: "$40",
  //     featured: false,
  //     bio: "Certified yoga instructor with a holistic approach to fitness. Focuses on flexibility, mindfulness, and helping clients achieve balance in their fitness journey.",
  //   },
  //   {
  //     id: "mike-chen",
  //     name: "Mike Chen",
  //     image: "/images/trainers/trainer-3.jpg",
  //     specialty: "Sports Performance",
  //     specialties: ["Athletic Training", "Speed & Agility", "Injury Prevention"],
  //     experience: "10 years",
  //     rating: 4.7,
  //     reviews: 156,
  //     availability: "Afternoons, Evenings",
  //     nextAvailable: "Today, 6:30 PM",
  //     price: "$50",
  //     featured: false,
  //     bio: "Former collegiate athlete with expertise in sports-specific training. Helps clients improve performance, speed, and agility while preventing injuries.",
  //   },
  //   {
  //     id: "emma-wilson",
  //     name: "Emma Wilson",
  //     image: "/images/trainers/trainer-4.jpg",
  //     specialty: "Weight Loss",
  //     specialties: ["Cardio", "Nutrition Planning", "Habit Formation"],
  //     experience: "5 years",
  //     rating: 4.9,
  //     reviews: 78,
  //     availability: "Flexible",
  //     nextAvailable: "Tomorrow, 2:15 PM",
  //     price: "$42",
  //     featured: false,
  //     bio: "Certified personal trainer and nutrition coach specializing in sustainable weight loss. Focuses on creating healthy habits and personalized nutrition plans.",
  //   },
  //   {
  //     id: "david-kim",
  //     name: "David Kim",
  //     image: "/images/trainers/trainer-5.jpg",
  //     specialty: "Bodybuilding",
  //     specialties: ["Muscle Gain", "Competition Prep", "Advanced Techniques"],
  //     experience: "12 years",
  //     rating: 4.8,
  //     reviews: 210,
  //     availability: "Mornings, Afternoons",
  //     nextAvailable: "Wednesday, 11:00 AM",
  //     price: "$55",
  //     featured: true,
  //     bio: "Professional bodybuilder and certified trainer with experience preparing clients for competitions. Expert in muscle building, body sculpting, and competition prep.",
  //   },
  //   {
  //     id: "jessica-lee",
  //     name: "Jessica Lee",
  //     image: "/images/trainers/trainer-6.jpg",
  //     specialty: "Functional Fitness",
  //     specialties: ["Mobility", "Core Strength", "Everyday Movement"],
  //     experience: "7 years",
  //     rating: 4.7,
  //     reviews: 89,
  //     availability: "Evenings, Weekends",
  //     nextAvailable: "Today, 5:00 PM",
  //     price: "$45",
  //     featured: false,
  //     bio: "Functional movement specialist focused on improving everyday mobility and strength. Helps clients move better, reduce pain, and build practical fitness.",
  //   },
  // ]

  // // Filter trainers based on search and filters
  // const filteredTrainers = trainers.filter((trainer) => {
  //   // Search filter
  //   const matchesSearch =
  //     searchQuery === "" ||
  //     trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     trainer.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

  //   // Specialty filter
  //   const matchesSpecialty =
  //     specialtyFilter === "all" ||
  //     trainer.specialty.toLowerCase().includes(specialtyFilter.toLowerCase()) ||
  //     trainer.specialties.some((s) => s.toLowerCase().includes(specialtyFilter.toLowerCase()))

  //   // Availability filter
  //   const matchesAvailability =
  //     availabilityFilter === "all" || trainer.availability.toLowerCase().includes(availabilityFilter.toLowerCase())

  //   // Experience filter
  //   let matchesExperience = true
  //   if (experienceFilter === "1-3") {
  //     const years = Number.parseInt(trainer.experience.split(" ")[0])
  //     matchesExperience = years >= 1 && years <= 3
  //   } else if (experienceFilter === "4-7") {
  //     const years = Number.parseInt(trainer.experience.split(" ")[0])
  //     matchesExperience = years >= 4 && years <= 7
  //   } else if (experienceFilter === "8+") {
  //     const years = Number.parseInt(trainer.experience.split(" ")[0])
  //     matchesExperience = years >= 8
  //   }

  //   return matchesSearch && matchesSpecialty && matchesAvailability && matchesExperience
  // })

  // // Get featured trainers
  // const featuredTrainers = trainers.filter((trainer) => trainer.featured)

  // // Handle specialty filter and tab switching
  // const handleSpecialtyFilter = (specialty) => {
  //   setSpecialtyFilter(specialty.toLowerCase())
  //   setActiveTab("all")
  // }

  return (
    <div className="container py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Personal Trainers Directory</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          <BrandName /> is currently recruiting certified fitness professionals to join our platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <h2 className="text-2xl font-bold flex items-center">
              <UserPlus className="mr-2 h-6 w-6 text-blue-500" />
              Trainer Recruitment
            </h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We're building a team of exceptional fitness professionals who are passionate about helping clients
              achieve their goals. Trainer recruitment will begin once the app goes live.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Award className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                <span>Certified personal trainers with proven experience</span>
              </li>
              <li className="flex items-start">
                <Users className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                <span>Specialists in various fitness disciplines</span>
              </li>
              <li className="flex items-start">
                <Calendar className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                <span>Flexible scheduling options for clients</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>
              Applications Opening Soon
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold flex items-center">
              <Mail className="mr-2 h-6 w-6 text-blue-500" />
              Stay Updated
            </h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Interested in becoming a <BrandName /> certified trainer? Our platform offers:
            </p>
            <ul className="space-y-2 mb-4">
              <li>• Access to a growing community of motivated clients</li>
              <li>• Flexible scheduling and competitive compensation</li>
              <li>• Advanced tools to track client progress</li>
              <li>• Marketing support to build your personal brand</li>
              <li>• Ongoing professional development opportunities</li>
            </ul>
            <p>
              Check back once the app launches for information on how to apply and join our team of elite fitness
              professionals.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Recruitment Starting Soon
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-primary/10 rounded-lg p-8 text-center mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          The <BrandName /> Difference
        </h2>
        <p className="mb-6">
          Our trainers aren't just certified professionals – they embody the <BrandName /> mindset of excellence,
          dedication, and results. We're building a team that's truly second to none in the fitness industry.
        </p>
        <Button size="lg" disabled>
          Trainer Applications Opening Soon
        </Button>
      </div>
    </div>
  )
}

// function TrainerCard({ trainer }) {
//   return (
//     <Card className="overflow-hidden flex flex-col h-full">
//       <div className="relative">
//         <img
//           src={trainer.image || "/images/trainers/default-trainer.jpg"}
//           alt={trainer.name}
//           className="w-full h-64 object-cover"
//         />
//         {trainer.featured && (
//           <Badge className="absolute top-3 right-3 bg-primary">
//             <Star className="h-3 w-3 mr-1 fill-primary-foreground" /> FEATURED
//           </Badge>
//         )}
//       </div>
//       <CardHeader className="pb-2">
//         <CardTitle>
//           <Link href={`/trainers/${trainer.id}`} className="hover:underline">
//             {trainer.name}
//           </Link>
//         </CardTitle>
//         <p className="text-sm text-muted-foreground">
//           {trainer.specialty} • {trainer.experience} experience
//         </p>
//       </CardHeader>
//       <CardContent className="pb-2 flex-1">
//         <div className="flex items-center gap-2 mb-3">
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`h-4 w-4 ${
//                   i < Math.floor(trainer.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
//                 }`}
//               />
//             ))}
//           </div>
//           <span className="text-sm font-medium">{trainer.rating}</span>
//           <span className="text-sm text-muted-foreground">({trainer.reviews} reviews)</span>
//         </div>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {trainer.specialties.map((specialty, index) => (
//             <Badge key={index} variant="secondary" className="font-normal">
//               {specialty}
//             </Badge>
//           ))}
//         </div>

//         <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{trainer.bio}</p>

//         <div className="flex items-center gap-2 text-muted-foreground mb-2">
//           <Calendar className="h-4 w-4" />
//           <span>Next available: {trainer.nextAvailable}</span>
//         </div>
//         <div className="text-lg font-bold">{trainer.price} per session</div>
//       </CardContent>
//       <CardFooter className="grid grid-cols-2 gap-2">
//         <Button variant="outline" className="w-full" asChild>
//           <Link href={`/messages?trainer=${trainer.id}`}>
//             <MessageSquare className="h-4 w-4 mr-2" />
//             Message
//           </Link>
//         </Button>
//         <Button className="w-full" asChild>
//           <Link href={`/trainers/${trainer.id}`}>View Profile</Link>
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }

