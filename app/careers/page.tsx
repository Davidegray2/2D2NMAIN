"use client"

import type React from "react"

import { useState } from "react"
import {
  CheckCircle2,
  Dumbbell,
  FileText,
  Upload,
  Users,
  Utensils,
  Clock,
  DollarSign,
  Video,
  Globe,
  Home,
  Calendar,
  ChevronRight,
  Award,
  Briefcase,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Logo } from "@/components/logo"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function PlatformApplicationPage() {
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [applicationType, setApplicationType] = useState("trainer")
  const [currentStep, setCurrentStep] = useState(1)
  const [formProgress, setFormProgress] = useState(25)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null as File | null,
    profilePhoto: null as File | null,
    specialties: [] as string[],
    experience: "",
    certifications: "",
    socialMedia: "",
    portfolioLink: "",
    videoLink: "",
    bio: "",
    availability: "",
    referral: "",
    termsAgreed: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.files![0] }))
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      specialties: checked ? [...prev.specialties, specialty] : prev.specialties.filter((s) => s !== specialty),
    }))
  }

  const handleNextStep = () => {
    const nextStep = currentStep + 1
    setCurrentStep(nextStep)
    setFormProgress(nextStep * 25)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePrevStep = () => {
    const prevStep = currentStep - 1
    setCurrentStep(prevStep)
    setFormProgress(prevStep * 25)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Application submitted:", formData)
    setApplicationSubmitted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })

    // Reset form after submission
    setTimeout(() => {
      setApplicationSubmitted(false)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        resume: null,
        profilePhoto: null,
        specialties: [],
        experience: "",
        certifications: "",
        socialMedia: "",
        portfolioLink: "",
        videoLink: "",
        bio: "",
        availability: "",
        referral: "",
        termsAgreed: false,
      })
      setCurrentStep(1)
      setFormProgress(25)
    }, 5000)
  }

  const applicationTypes = [
    {
      id: "trainer",
      title: "Personal Trainer",
      description:
        "Join our platform as a certified personal trainer to coach clients remotely via our live video platform.",
      icon: <Dumbbell className="h-5 w-5" />,
      requirements: [
        "Nationally recognized personal training certification",
        "At least 1 year of professional training experience",
        "Excellent communication and coaching skills",
        "Ability to create personalized workout plans",
        "Reliable internet connection and equipment for high-quality video sessions",
      ],
      benefits: [
        "Set your own rates and schedule",
        "Access to our growing user base of fitness enthusiasts",
        "Built-in payment processing and scheduling tools",
        "Marketing support and profile promotion",
        "Professional development opportunities",
        "Work from anywhere with internet access",
      ],
    },
    {
      id: "nutritionist",
      title: "Nutrition Coach",
      description: "Provide expert nutrition guidance and meal planning to help clients reach their goals.",
      icon: <Utensils className="h-5 w-5" />,
      requirements: [
        "Nutrition certification or relevant degree",
        "Experience creating personalized nutrition plans",
        "Knowledge of dietary needs for different fitness goals",
        "Ability to explain nutrition concepts clearly",
        "Understanding of macro and micronutrient requirements",
      ],
      benefits: [
        "Connect with clients seeking nutrition guidance",
        "Flexible virtual coaching options",
        "Tools for creating and sharing meal plans",
        "Integration with our workout planning system",
        "Opportunity to create premium nutrition content",
      ],
    },
    {
      id: "content",
      title: "Content Creator",
      description: "Create engaging fitness and nutrition content for our platform and community.",
      icon: <FileText className="h-5 w-5" />,
      requirements: [
        "Expertise in fitness, nutrition, or wellness",
        "Ability to create engaging written or video content",
        "Strong communication skills",
        "Consistent content production schedule",
        "Understanding of fitness trends and evidence-based practices",
      ],
      benefits: [
        "Monetize your content through our platform",
        "Reach a targeted audience of fitness enthusiasts",
        "Build your personal brand and following",
        "Collaborate with other fitness professionals",
        "Access to our content creation tools and resources",
      ],
    },
  ]

  const selectedType = applicationTypes.find((type) => type.id === applicationType) || applicationTypes[0]

  const specialtyOptions = {
    trainer: [
      "Strength Training",
      "HIIT",
      "Bodybuilding",
      "Weight Loss",
      "Functional Fitness",
      "Sports Performance",
      "Mobility & Flexibility",
      "Senior Fitness",
      "Pre/Post Natal",
      "Rehabilitation",
      "Powerlifting",
      "Olympic Lifting",
      "Calisthenics",
      "Group Fitness",
    ],
    nutritionist: [
      "Weight Loss Nutrition",
      "Muscle Building Nutrition",
      "Sports Nutrition",
      "Vegan/Vegetarian Nutrition",
      "Meal Planning",
      "Macro Tracking",
      "Intuitive Eating",
      "Competition Prep",
      "Diabetes Management",
      "Food Allergies & Sensitivities",
      "Gut Health",
      "Anti-inflammatory Diets",
      "Nutrition for Specific Health Conditions",
    ],
    content: [
      "Workout Tutorials",
      "Nutrition Education",
      "Motivational Content",
      "Fitness Challenges",
      "Recipe Development",
      "Scientific Fitness Content",
      "Lifestyle & Wellness",
      "Equipment Reviews",
      "Technique Breakdowns",
      "Transformation Stories",
      "Fitness Trends Analysis",
      "Recovery & Mindfulness",
    ],
  }

  const stepTitles = ["Personal Information", "Professional Background", "Specialties & Profile", "Final Details"]

  return (
    <div className="container py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="mb-4">
          <Logo variant="compact" className="text-3xl" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Join Our Elite Remote Team</h1>
        <p className="text-muted-foreground max-w-2xl">
          Become part of the 2ND2NONE platform and help transform lives through fitness and nutrition from anywhere in
          the world
        </p>
      </div>

      {/* Success Alert */}
      {applicationSubmitted && (
        <Alert className="mb-6 bg-green-500/10 border-green-500 text-green-500 max-w-3xl mx-auto">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Application Submitted!</AlertTitle>
          <AlertDescription>
            Thank you for applying to join our platform. We'll review your application and contact you within 3-5
            business days.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Tabs defaultValue="positions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="positions">Positions</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>

            <TabsContent value="positions" className="space-y-4 mt-4">
              {applicationTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    applicationType === type.id ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setApplicationType(type.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${applicationType === type.id ? "bg-primary/20" : "bg-muted"}`}
                        >
                          {type.icon}
                        </div>
                        <CardTitle className="text-lg">{type.title}</CardTitle>
                      </div>
                      {applicationType === type.id && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                    <Badge className="bg-green-500/80 text-white">100% Remote</Badge>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="benefits" className="space-y-6 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Growing Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Connect with thousands of motivated clients worldwide through our platform.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Competitive Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Set your own rates with low platform fees. Top performers earn $5,000+ monthly.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Flexible Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Work when and how much you want. Create your ideal work-life balance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Video className="h-5 w-5 text-primary" />
                    Advanced Platform
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Access our suite of professional tools including HD video, workout tracking, and client management.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                Remote-First Platform
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Our platform is designed for remote work, allowing you to connect with clients worldwide through our
                high-quality live video system.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center text-center p-3 bg-background rounded-lg">
                  <Globe className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm font-medium">Global Clients</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-background rounded-lg">
                  <Home className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm font-medium">Work Anywhere</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-background rounded-lg">
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm font-medium">Flexible Hours</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-background rounded-lg">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm font-medium">Secure Pay</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="relative overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg?height=600&width=400"
              alt="Fitness professional"
              className="w-full h-auto rounded-lg object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <Badge className="self-start mb-2 bg-primary">Join Now</Badge>
              <h3 className="text-white text-xl font-bold mb-2">Become Elite</h3>
              <p className="text-white/80 text-sm">Join the top 1% of fitness professionals on our platform</p>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8">
          <Card className="mb-8">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">{selectedType.title} Application</CardTitle>
                  <CardDescription>Complete the form below to apply</CardDescription>
                </div>
                <Badge variant="outline" className="text-primary border-primary">
                  Step {currentStep} of 4: {stepTitles[currentStep - 1]}
                </Badge>
              </div>
            </CardHeader>

            <div className="px-6 pt-6">
              <Progress value={formProgress} className="h-2 bg-muted" />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                {stepTitles.map((title, index) => (
                  <span key={index} className={currentStep > index ? "text-primary font-medium" : ""}>
                    {index + 1}
                  </span>
                ))}
              </div>
            </div>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="referral">How did you hear about us?</Label>
                        <Input
                          id="referral"
                          name="referral"
                          value={formData.referral}
                          onChange={handleInputChange}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Professional Experience</Label>
                      <Textarea
                        id="experience"
                        name="experience"
                        rows={3}
                        required
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder={`Describe your experience as a ${selectedType.title.toLowerCase()}`}
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certifications">Certifications</Label>
                      <Textarea
                        id="certifications"
                        name="certifications"
                        rows={2}
                        required
                        value={formData.certifications}
                        onChange={handleInputChange}
                        placeholder="List all relevant certifications, degrees, and qualifications"
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resume">Resume/CV</Label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" asChild className="w-full">
                          <label className="cursor-pointer flex items-center justify-center gap-2">
                            <Upload className="h-4 w-4" />
                            <span>Upload Resume</span>
                            <input
                              type="file"
                              id="resume"
                              name="resume"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                              required
                            />
                          </label>
                        </Button>
                        {formData.resume && (
                          <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                            {formData.resume.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Specialties (Select all that apply)</Label>
                      <div className="grid grid-cols-2 gap-2 bg-background/50 p-4 rounded-md max-h-[300px] overflow-y-auto">
                        {specialtyOptions[applicationType as keyof typeof specialtyOptions].map((specialty) => (
                          <div key={specialty} className="flex items-center space-x-2">
                            <Checkbox
                              id={specialty.replace(/\s+/g, "-").toLowerCase()}
                              checked={formData.specialties.includes(specialty)}
                              onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
                            />
                            <label
                              htmlFor={specialty.replace(/\s+/g, "-").toLowerCase()}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {specialty}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        required
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Write a professional bio that will appear on your profile"
                        className="bg-background/50"
                      />
                      <p className="text-xs text-muted-foreground">
                        This bio will be visible to potential clients. Highlight your approach, philosophy, and what
                        makes you unique.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profilePhoto">Profile Photo</Label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" asChild className="w-full">
                          <label className="cursor-pointer flex items-center justify-center gap-2">
                            <Upload className="h-4 w-4" />
                            <span>Upload Photo</span>
                            <input
                              type="file"
                              id="profilePhoto"
                              name="profilePhoto"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileChange}
                              required
                            />
                          </label>
                        </Button>
                        {formData.profilePhoto && (
                          <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                            {formData.profilePhoto.name}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Upload a professional headshot. This will be displayed on your profile.
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Textarea
                        id="availability"
                        name="availability"
                        rows={2}
                        required
                        value={formData.availability}
                        onChange={handleInputChange}
                        placeholder="Describe your general availability (days/hours)"
                        className="bg-background/50"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="socialMedia">Social Media Profiles (Optional)</Label>
                        <Input
                          id="socialMedia"
                          name="socialMedia"
                          value={formData.socialMedia}
                          onChange={handleInputChange}
                          placeholder="Instagram, TikTok, YouTube, etc."
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="portfolioLink">Portfolio/Website Link (Optional)</Label>
                        <Input
                          id="portfolioLink"
                          name="portfolioLink"
                          type="url"
                          value={formData.portfolioLink}
                          onChange={handleInputChange}
                          placeholder="https://your-portfolio.com"
                          className="bg-background/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="videoLink">Introduction Video Link (Optional but recommended)</Label>
                      <Input
                        id="videoLink"
                        name="videoLink"
                        type="url"
                        value={formData.videoLink}
                        onChange={handleInputChange}
                        placeholder="YouTube or Vimeo link to your introduction video"
                        className="bg-background/50"
                      />
                      <p className="text-xs text-muted-foreground">
                        A short video introduction helps clients connect with you and increases your chances of being
                        selected.
                      </p>
                    </div>

                    <div className="flex items-start space-x-2 pt-2">
                      <Checkbox
                        id="termsAgreed"
                        checked={formData.termsAgreed}
                        onCheckedChange={(checked) => handleCheckboxChange("termsAgreed", checked as boolean)}
                        required
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="termsAgreed"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the platform terms and conditions
                        </label>
                        <p className="text-xs text-muted-foreground">
                          By submitting this application, you agree to our{" "}
                          <a href="/legal" className="text-primary underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="/legal" className="text-primary underline">
                            Privacy Policy
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t">
                  {currentStep > 1 ? (
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Previous Step
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
                    >
                      Next Step <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!formData.termsAgreed}
                      className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
                    >
                      Submit Application
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Position Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">About This Position</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Requirements
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  {selectedType.requirements.map((req, index) => (
                    <li key={index} className="text-muted-foreground">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Benefits
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  {selectedType.benefits.map((benefit, index) => (
                    <li key={index} className="text-muted-foreground">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How long does the application process take?</AccordionTrigger>
                  <AccordionContent>
                    We typically review applications within 3-5 business days. If approved, you'll receive an email with
                    instructions to complete your profile setup and onboarding. The entire process from application to
                    accepting clients usually takes 1-2 weeks.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>What are the platform fees?</AccordionTrigger>
                  <AccordionContent>
                    Our platform charges a competitive 15% commission on all bookings and sales. This covers payment
                    processing, marketing, client acquisition, and access to all our professional tools. There are no
                    monthly fees or hidden charges.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I get paid?</AccordionTrigger>
                  <AccordionContent>
                    Payments are processed automatically through our secure payment system. You'll receive payouts for
                    your services every two weeks via direct deposit to your bank account. You can track all your
                    earnings and upcoming payouts in your professional dashboard.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I offer both virtual and in-person services?</AccordionTrigger>
                  <AccordionContent>
                    Yes! Our platform is primarily designed for remote training via our live video system, allowing you
                    to work from anywhere. However, you have the option to offer in-person sessions at your discretion.
                    Our platform allows you to set different availability and pricing for each service type. Most
                    trainers operate 100% remotely, but the choice is yours.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>What certifications do I need?</AccordionTrigger>
                  <AccordionContent>
                    For personal trainers, we require a nationally recognized certification (NASM, ACE, ACSM, NSCA,
                    etc.). For nutrition coaches, we accept registered dietitians (RD), certified nutrition specialists
                    (CNS), or those with relevant degrees and certifications. Content creators should have expertise in
                    their subject area and the ability to create engaging, accurate content.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="flex flex-col items-center text-center py-6">
              <h2 className="text-xl font-bold mb-2">Have Questions?</h2>
              <p className="mb-4 max-w-2xl">
                If you have any questions about joining our platform or need assistance with your application, our team
                is here to help.
              </p>
              <Button
                variant="default"
                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
                asChild
              >
                <a href="/contact">Contact Support</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

