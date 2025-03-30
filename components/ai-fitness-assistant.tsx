"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Send, Dumbbell, Apple, Heart, Clock, Zap } from "lucide-react"

// Define types for our messages
type MessageType = "user" | "assistant"

interface Message {
  id: string
  type: MessageType
  content: string
}

export function AIFitnessAssistant({ hasAccess = false }: { hasAccess?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: `Welcome to the <BrandName /> Elite Fitness Assistant! I'm here to help with your fitness questions. What would you like to know about workouts, nutrition, or any other fitness topic?`,
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Database of fitness and nutrition responses
  const fitnessResponses = [
    {
      keywords: ["protein", "protein intake", "protein sources", "protein powder"],
      response:
        "Protein is essential for muscle repair and growth. Aim for 1.6-2.2g of protein per kg of bodyweight daily. Good sources include lean meats, fish, eggs, dairy, legumes, and protein supplements. Spread your intake throughout the day, with 20-40g per meal being optimal for muscle protein synthesis.",
    },
    {
      keywords: ["carbs", "carbohydrates", "carb intake", "carb sources"],
      response:
        "Carbohydrates are your body's primary energy source, especially for high-intensity training. Aim for 3-7g per kg of bodyweight daily, depending on your activity level and goals. Focus on complex carbs like whole grains, fruits, vegetables, and legumes. Time your carb intake around your workouts for optimal performance and recovery.",
    },
    {
      keywords: ["fat", "healthy fats", "fat intake", "fat sources"],
      response:
        "Healthy fats are crucial for hormone production, including testosterone and growth hormone. Aim for 0.5-1g per kg of bodyweight daily. Focus on unsaturated fats from sources like avocados, nuts, seeds, olive oil, and fatty fish. Don't eliminate saturated fats completely, as they play a role in hormone production.",
    },
    {
      keywords: ["calories", "caloric intake", "calorie deficit", "calorie surplus"],
      response:
        "Your caloric intake should align with your goals. For maintenance, consume roughly your TDEE (Total Daily Energy Expenditure). For fat loss, create a moderate deficit of 300-500 calories below maintenance. For muscle gain, aim for a slight surplus of 200-400 calories above maintenance. Track your intake and adjust based on results.",
    },
    {
      keywords: ["weight loss", "fat loss", "lose weight", "burn fat"],
      response:
        "Sustainable fat loss comes from a combination of nutrition, training, and lifestyle factors. Create a moderate caloric deficit through a combination of eating less and moving more. Prioritize protein and fiber-rich foods for satiety. Perform resistance training to preserve muscle mass, and add strategic cardio. Ensure adequate sleep and stress management.",
    },
    {
      keywords: ["muscle gain", "build muscle", "hypertrophy", "get bigger"],
      response:
        "Building muscle requires a strategic approach to training, nutrition, and recovery. Train each muscle group 2-3 times weekly, focusing on progressive overload in the 6-12 rep range primarily. Consume a slight caloric surplus with adequate protein (1.8-2.2g/kg). Prioritize recovery with 7-9 hours of sleep and manage stress levels.",
    },
    {
      keywords: ["workout", "training", "exercise", "routine", "program"],
      response:
        "A well-structured workout program should include resistance training 3-5 days per week, focusing on all major muscle groups. Include both compound movements (squats, deadlifts, presses) and isolation exercises. Aim for 10-20 sets per muscle group weekly, spread across your training days. Incorporate progressive overload by gradually increasing weight, reps, or sets over time.",
    },
    {
      keywords: ["cardio", "cardiovascular", "aerobic", "conditioning"],
      response:
        "For cardiovascular training, mix steady-state cardio (20-40 minutes at moderate intensity) with HIIT sessions (10-20 minutes of work/rest intervals). Aim for 2-3 HIIT sessions and 1-2 steady-state sessions per week. Good options include running, cycling, rowing, swimming, and circuit training. Always warm up properly and progress gradually.",
    },
    {
      keywords: ["recovery", "rest", "overtraining", "soreness"],
      response:
        "Recovery is when progress happens - you don't grow during workouts, but during the recovery period afterward. Prioritize sleep (7-9 hours nightly), nutrition (adequate protein and calories), and stress management. Consider active recovery like walking or light activity on rest days. Implement deload weeks every 4-8 weeks where you reduce volume or intensity.",
    },
    {
      keywords: ["supplements", "creatine", "pre-workout", "bcaa"],
      response:
        "When considering supplements, focus first on establishing a solid foundation of nutrition, training, and recovery. The most evidence-backed supplements include protein powder (for convenience), creatine monohydrate (5g daily for strength and power), caffeine (for performance), and vitamin D (if deficient). Most other supplements offer minimal benefits.",
    },
    {
      keywords: ["motivation", "discipline", "consistency", "habit"],
      response:
        "Sustainable motivation comes from finding your 'why' - a reason that's deeply meaningful to you. External motivators like appearance can get you started, but internal motivators like health, vitality, and self-mastery create lasting change. Build a supportive environment with like-minded people. Focus on the process rather than just outcomes.",
    },
    {
      keywords: ["sleep", "rest", "recovery", "insomnia"],
      response:
        "Quality sleep is crucial for recovery and progress. Aim for 7-9 hours of uninterrupted sleep nightly. Improve sleep quality by maintaining a consistent sleep schedule, creating a cool, dark sleeping environment, avoiding screens 1-2 hours before bed, limiting caffeine after mid-day, and considering relaxation techniques like meditation before sleep.",
    },
    {
      keywords: ["meal prep", "meal planning", "food prep", "cooking"],
      response:
        "Meal preparation is a powerful strategy for nutrition success. Set aside 2-3 hours weekly to prepare meals in advance. Focus on batch cooking proteins (chicken, beef, tofu), preparing versatile carb sources (rice, potatoes, quinoa), and washing/chopping vegetables. Invest in quality containers and a food scale. Keep some meals in the freezer for emergencies.",
    },
    {
      keywords: ["vegetarian", "vegan", "plant-based", "meatless"],
      response:
        "Plant-based diets can absolutely support fitness goals when properly planned. Focus on complete protein sources like tofu, tempeh, seitan, legumes, and quinoa. Consider protein powders like pea, rice, or hemp to boost intake. Monitor vitamin B12, iron, zinc, and omega-3 intake, supplementing if necessary. Eat a wide variety of colorful fruits and vegetables.",
    },
    {
      keywords: ["injury", "pain", "strain", "sprain"],
      response:
        "For minor injuries, follow the PRICE protocol: Protection, Rest, Ice, Compression, and Elevation. Know the difference between normal training discomfort and actual injury pain - sharp, sudden, or localized pain that alters your movement patterns warrants attention. For persistent or severe pain, consult a healthcare professional.",
    },
    {
      keywords: ["stretching", "mobility", "flexibility", "range of motion"],
      response:
        "Mobility work is essential for long-term progress and injury prevention. Include dynamic stretches in your warm-up (leg swings, arm circles, etc.) and static stretching or mobility drills post-workout or on rest days. Consider dedicated mobility sessions 2-3 times weekly, focusing on problem areas. Tools like foam rollers, lacrosse balls, and bands can enhance your mobility work.",
    },
    {
      keywords: ["beginner", "starting", "newbie", "novice"],
      response:
        "For beginners, focus on building a foundation with full-body workouts 3 times per week. Master fundamental movements like squats, hinges, pushes, pulls, and carries. Start with bodyweight or light weights to develop proper form. Aim for 2-3 sets of 10-15 reps per exercise. Prioritize consistency over intensity initially. Ensure adequate protein intake and recovery between sessions.",
    },
    {
      keywords: ["advanced", "experienced", "elite", "professional"],
      response:
        "For advanced trainees, consider periodization approaches that systematically vary volume, intensity, and exercise selection. Implement specialized training blocks focusing on specific adaptations (hypertrophy, strength, power). Consider advanced techniques like drop sets, rest-pause, and accommodating resistance. Track performance metrics closely and adjust programming based on data. Recovery becomes even more critical at advanced levels.",
    },
    {
      keywords: ["home workout", "home gym", "no equipment", "bodyweight"],
      response:
        "Effective home workouts can be achieved with minimal or no equipment. Focus on bodyweight progressions for push-ups, squats, lunges, and core exercises. Consider investing in resistance bands, adjustable dumbbells, or a pull-up bar for added versatility. Create circuits or supersets to increase intensity. Use tempo manipulation (slower eccentrics) to increase difficulty without additional weight.",
    },
    {
      keywords: ["nutrition timing", "meal timing", "pre-workout meal", "post-workout nutrition"],
      response:
        "While total daily intake matters most, nutrient timing can optimize performance and recovery. Consume a meal with carbs and protein 2-3 hours before training, or a smaller snack 30-60 minutes pre-workout. Post-workout, aim to consume 20-40g protein and some carbohydrates within 2 hours. Space protein intake throughout the day in 3-5 meals/snacks, with 20-40g per serving.",
    },
  ]

  // Function to find the best matching response
  const findBestResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    // Check for exact matches first
    for (const item of fitnessResponses) {
      if (item.keywords.some((keyword) => lowerQuestion.includes(keyword))) {
        return item.response
      }
    }

    // If no exact matches, provide a general response
    return "Fitness success comes from consistency with the fundamentals: progressive resistance training, adequate protein and nutrition, sufficient recovery, and stress management. Rather than constantly seeking the 'perfect' approach, focus on consistent execution of these principles. Track your progress, make adjustments based on results, and be patient. Remember that fitness is a lifelong journey, not a quick fix."
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking and typing
    setTimeout(() => {
      const response = findBestResponse(userMessage.content)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500) // Simulate thinking time
  }

  if (!hasAccess) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6" />
            Elite Fitness AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <h3 className="text-xl font-semibold mb-2">Upgrade to Access</h3>
            <p className="text-muted-foreground mb-4">
              The Elite Fitness AI is available exclusively to premium members.
            </p>
            <Button>Upgrade Membership</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6" />
          Elite Fitness AI
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[500px] overflow-y-auto p-1">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.type === "assistant" ? (
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1">
                      {message.content.includes("workout") || message.content.includes("training") ? (
                        <Dumbbell className="h-4 w-4" />
                      ) : message.content.includes("nutrition") || message.content.includes("diet") ? (
                        <Apple className="h-4 w-4" />
                      ) : message.content.includes("recovery") || message.content.includes("rest") ? (
                        <Heart className="h-4 w-4" />
                      ) : message.content.includes("motivation") || message.content.includes("goal") ? (
                        <Zap className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: message.content.replace(
                          /<BrandName \/>/g,
                          '<span class="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent font-bold">2ND2NONE</span>',
                        ),
                      }}
                    />
                  </div>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-2 bg-muted">
                <div className="flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                    ●
                  </span>
                  <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                    ●
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about workouts, nutrition, or any fitness topic..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

