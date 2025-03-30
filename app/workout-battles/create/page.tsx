"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, Trophy, Weight, Clock, MonitorIcon as Running, Heart, Flame, Calendar } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function CreateBattlePage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [battleType, setBattleType] = useState("now")

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <Trophy className="mr-2 h-8 w-8 text-primary" />
          Create a Battle
        </h1>
        <p className="text-muted-foreground">Challenge others to prove your strength and skill</p>
      </div>

      <Tabs defaultValue="quick">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quick">Quick Battle</TabsTrigger>
          <TabsTrigger value="custom">Custom Battle</TabsTrigger>
          <TabsTrigger value="friend">Challenge Friend</TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Battle</CardTitle>
              <CardDescription>Get matched with someone of similar skill level instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Battle Type</Label>
                  <RadioGroup defaultValue="rep-count" className="grid grid-cols-2 gap-4">
                    <div>
                      <RadioGroupItem value="rep-count" id="rep-count" className="peer sr-only" />
                      <Label
                        htmlFor="rep-count"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Dumbbell className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Rep Count</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="endurance" id="endurance" className="peer sr-only" />
                      <Label
                        htmlFor="endurance"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Clock className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Endurance</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Exercise</Label>
                  <Select defaultValue="pushups">
                    <SelectTrigger>
                      <SelectValue placeholder="Select exercise" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectItem value="pushups">Push-ups</SelectItem>
                      <SelectItem value="pullups">Pull-ups</SelectItem>
                      <SelectItem value="squats">Squats</SelectItem>
                      <SelectItem value="burpees">Burpees</SelectItem>
                      <SelectItem value="plank">Plank Hold</SelectItem>
                      <SelectItem value="lunges">Lunges</SelectItem>
                      <SelectItem value="situps">Sit-ups</SelectItem>
                      <SelectItem value="jumpingjacks">Jumping Jacks</SelectItem>
                      <SelectItem value="mountainclimbers">Mountain Climbers</SelectItem>
                      <SelectItem value="deadlift">Deadlift</SelectItem>
                      <SelectItem value="benchpress">Bench Press</SelectItem>
                      <SelectItem value="shoulderpress">Shoulder Press</SelectItem>
                      <SelectItem value="kettlebellswings">Kettlebell Swings</SelectItem>
                      <SelectItem value="boxjumps">Box Jumps</SelectItem>
                      <SelectItem value="wallballs">Wall Balls</SelectItem>
                      <SelectItem value="rowing">Rowing (Calories)</SelectItem>
                      <SelectItem value="biking">Biking (Calories)</SelectItem>
                      <SelectItem value="running">Running (Distance)</SelectItem>
                      <SelectItem value="jumpingrope">Jumping Rope</SelectItem>
                      <SelectItem value="battleropeswaves">Battle Ropes Waves</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>When to Battle</Label>
                  <RadioGroup defaultValue="now" onValueChange={setBattleType} className="grid grid-cols-2 gap-4">
                    <div>
                      <RadioGroupItem value="now" id="battle-now" className="peer sr-only" />
                      <Label
                        htmlFor="battle-now"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Dumbbell className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Battle Now</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="schedule" id="battle-schedule" className="peer sr-only" />
                      <Label
                        htmlFor="battle-schedule"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Calendar className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Schedule</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {battleType === "schedule" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Date and Time</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8:00">8:00 AM</SelectItem>
                              <SelectItem value="9:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                              <SelectItem value="17:00">5:00 PM</SelectItem>
                              <SelectItem value="18:00">6:00 PM</SelectItem>
                              <SelectItem value="19:00">7:00 PM</SelectItem>
                              <SelectItem value="20:00">8:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Time Zone</Label>
                      <Select defaultValue="local">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Your Local Time</SelectItem>
                          <SelectItem value="est">Eastern Time (ET)</SelectItem>
                          <SelectItem value="cst">Central Time (CT)</SelectItem>
                          <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                          <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="reminder" defaultChecked />
                        <Label htmlFor="reminder">Set reminder</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        We'll send you a notification before the battle starts
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (seconds)</Label>
                  <Input id="duration" type="number" defaultValue="60" min="10" max="300" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="points">Points to Wager</Label>
                  <Input id="points" type="number" defaultValue="50" min="10" max="1000" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="live-stream" defaultChecked />
                    <Label htmlFor="live-stream">Enable live video stream</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Allow others to watch your battle in real-time</p>
                </div>

                <Button className="w-full">{battleType === "now" ? "Find Opponent Now" : "Schedule Battle"}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Battle</CardTitle>
              <CardDescription>Create a battle with your own rules and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Battle Type</Label>
                  <RadioGroup defaultValue="rep-count" className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <RadioGroupItem value="rep-count" id="custom-rep-count" className="peer sr-only" />
                      <Label
                        htmlFor="custom-rep-count"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Dumbbell className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Rep Count</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="endurance" id="custom-endurance" className="peer sr-only" />
                      <Label
                        htmlFor="custom-endurance"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Clock className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Endurance</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="weight" id="custom-weight" className="peer sr-only" />
                      <Label
                        htmlFor="custom-weight"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Weight className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Weight</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="speed" id="custom-speed" className="peer sr-only" />
                      <Label
                        htmlFor="custom-speed"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Running className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Speed</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="heart-rate" id="custom-heart-rate" className="peer sr-only" />
                      <Label
                        htmlFor="custom-heart-rate"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Heart className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Heart Rate</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="circuit" id="custom-circuit" className="peer sr-only" />
                      <Label
                        htmlFor="custom-circuit"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Flame className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Circuit</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Exercise</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exercise" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectItem value="pushups">Push-ups</SelectItem>
                      <SelectItem value="pullups">Pull-ups</SelectItem>
                      <SelectItem value="squats">Squats</SelectItem>
                      <SelectItem value="burpees">Burpees</SelectItem>
                      <SelectItem value="plank">Plank Hold</SelectItem>
                      <SelectItem value="deadlift">Deadlift</SelectItem>
                      <SelectItem value="bench-press">Bench Press</SelectItem>
                      <SelectItem value="mountain-climbers">Mountain Climbers</SelectItem>
                      <SelectItem value="jumping-jacks">Jumping Jacks</SelectItem>
                      <SelectItem value="lunges">Lunges</SelectItem>
                      <SelectItem value="situps">Sit-ups</SelectItem>
                      <SelectItem value="shoulderpress">Shoulder Press</SelectItem>
                      <SelectItem value="kettlebellswings">Kettlebell Swings</SelectItem>
                      <SelectItem value="boxjumps">Box Jumps</SelectItem>
                      <SelectItem value="wallballs">Wall Balls</SelectItem>
                      <SelectItem value="rowing">Rowing (Calories)</SelectItem>
                      <SelectItem value="biking">Biking (Calories)</SelectItem>
                      <SelectItem value="running">Running (Distance)</SelectItem>
                      <SelectItem value="jumpingrope">Jumping Rope</SelectItem>
                      <SelectItem value="battleropeswaves">Battle Ropes Waves</SelectItem>
                      <SelectItem value="wallsit">Wall Sit</SelectItem>
                      <SelectItem value="russiantwists">Russian Twists</SelectItem>
                      <SelectItem value="trx-rows">TRX Rows</SelectItem>
                      <SelectItem value="medicine-ball-slams">Medicine Ball Slams</SelectItem>
                      <SelectItem value="thrusters">Thrusters</SelectItem>
                      <SelectItem value="custom">Custom Exercise...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>When to Battle</Label>
                  <RadioGroup defaultValue="schedule" className="grid grid-cols-2 gap-4">
                    <div>
                      <RadioGroupItem value="now" id="custom-battle-now" className="peer sr-only" />
                      <Label
                        htmlFor="custom-battle-now"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Dumbbell className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Battle Now</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="schedule" id="custom-battle-schedule" className="peer sr-only" />
                      <Label
                        htmlFor="custom-battle-schedule"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Calendar className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Schedule</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Date and Time</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="8:00">8:00 AM</SelectItem>
                            <SelectItem value="9:00">9:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="12:00">12:00 PM</SelectItem>
                            <SelectItem value="13:00">1:00 PM</SelectItem>
                            <SelectItem value="14:00">2:00 PM</SelectItem>
                            <SelectItem value="15:00">3:00 PM</SelectItem>
                            <SelectItem value="16:00">4:00 PM</SelectItem>
                            <SelectItem value="17:00">5:00 PM</SelectItem>
                            <SelectItem value="18:00">6:00 PM</SelectItem>
                            <SelectItem value="19:00">7:00 PM</SelectItem>
                            <SelectItem value="20:00">8:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Time Zone</Label>
                    <Select defaultValue="local">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Your Local Time</SelectItem>
                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Scheduling Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="custom-flexible" defaultChecked />
                        <Label htmlFor="custom-flexible">Allow opponent to suggest alternative times</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="custom-reminder" defaultChecked />
                        <Label htmlFor="custom-reminder">Set reminder notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="custom-calendar" />
                        <Label htmlFor="custom-calendar">Add to calendar</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-title">Battle Title</Label>
                  <Input id="custom-title" placeholder="Enter a catchy title for your battle" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-description">Description</Label>
                  <Textarea
                    id="custom-description"
                    placeholder="Describe your battle rules and requirements"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-duration">Duration (seconds)</Label>
                    <Input id="custom-duration" type="number" defaultValue="60" min="10" max="600" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-points">Points to Wager</Label>
                    <Input id="custom-points" type="number" defaultValue="100" min="10" max="5000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Required Membership Tier</Label>
                  <Select defaultValue="rookie">
                    <SelectTrigger>
                      <SelectValue placeholder="Select required tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rookie">Rookie (Everyone)</SelectItem>
                      <SelectItem value="contender">Contender+</SelectItem>
                      <SelectItem value="warrior">Warrior+</SelectItem>
                      <SelectItem value="legend">Legend Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="custom-live-stream" defaultChecked />
                    <Label htmlFor="custom-live-stream">Enable live video stream</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Allow others to watch your battle in real-time</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="custom-public" defaultChecked />
                    <Label htmlFor="custom-public">Make battle public</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allow anyone with the required tier to join or spectate
                  </p>
                </div>

                <Button className="w-full">Create Battle</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friend" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Challenge a Friend</CardTitle>
              <CardDescription>Send a direct battle challenge to a friend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Friend</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a friend to challenge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friend-1">Alex Johnson</SelectItem>
                      <SelectItem value="friend-2">Taylor Smith</SelectItem>
                      <SelectItem value="friend-3">Jordan Williams</SelectItem>
                      <SelectItem value="friend-4">Casey Brown</SelectItem>
                      <SelectItem value="friend-5">Morgan Lee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Battle Type</Label>
                  <Select defaultValue="rep-count">
                    <SelectTrigger>
                      <SelectValue placeholder="Select battle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rep-count">Rep Count</SelectItem>
                      <SelectItem value="endurance">Endurance</SelectItem>
                      <SelectItem value="weight">Weight Challenge</SelectItem>
                      <SelectItem value="speed">Speed Challenge</SelectItem>
                      <SelectItem value="heart-rate">Heart Rate Recovery</SelectItem>
                      <SelectItem value="circuit">Circuit Battle</SelectItem>
                      <SelectItem value="amrap">AMRAP (As Many Rounds As Possible)</SelectItem>
                      <SelectItem value="emom">EMOM (Every Minute On the Minute)</SelectItem>
                      <SelectItem value="tabata">Tabata</SelectItem>
                      <SelectItem value="calorie-burn">Calorie Burn</SelectItem>
                      <SelectItem value="distance">Distance Challenge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Exercise</Label>
                  <Select defaultValue="pushups">
                    <SelectTrigger>
                      <SelectValue placeholder="Select exercise" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectItem value="pushups">Push-ups</SelectItem>
                      <SelectItem value="pullups">Pull-ups</SelectItem>
                      <SelectItem value="squats">Squats</SelectItem>
                      <SelectItem value="burpees">Burpees</SelectItem>
                      <SelectItem value="plank">Plank Hold</SelectItem>
                      <SelectItem value="lunges">Lunges</SelectItem>
                      <SelectItem value="situps">Sit-ups</SelectItem>
                      <SelectItem value="jumpingjacks">Jumping Jacks</SelectItem>
                      <SelectItem value="mountainclimbers">Mountain Climbers</SelectItem>
                      <SelectItem value="deadlift">Deadlift</SelectItem>
                      <SelectItem value="benchpress">Bench Press</SelectItem>
                      <SelectItem value="shoulderpress">Shoulder Press</SelectItem>
                      <SelectItem value="kettlebellswings">Kettlebell Swings</SelectItem>
                      <SelectItem value="boxjumps">Box Jumps</SelectItem>
                      <SelectItem value="wallballs">Wall Balls</SelectItem>
                      <SelectItem value="rowing">Rowing (Calories)</SelectItem>
                      <SelectItem value="biking">Biking (Calories)</SelectItem>
                      <SelectItem value="running">Running (Distance)</SelectItem>
                      <SelectItem value="jumpingrope">Jumping Rope</SelectItem>
                      <SelectItem value="battleropeswaves">Battle Ropes Waves</SelectItem>
                      <SelectItem value="wallsit">Wall Sit</SelectItem>
                      <SelectItem value="russiantwists">Russian Twists</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>When to Battle</Label>
                  <RadioGroup defaultValue="schedule" className="grid grid-cols-2 gap-4">
                    <div>
                      <RadioGroupItem value="now" id="friend-battle-now" className="peer sr-only" />
                      <Label
                        htmlFor="friend-battle-now"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Dumbbell className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Battle Now</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="schedule" id="friend-battle-schedule" className="peer sr-only" />
                      <Label
                        htmlFor="friend-battle-schedule"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Calendar className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Schedule</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Propose Date and Time Options</Label>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md">
                        <div>
                          <Label className="mb-2 block">Option 1 (Primary)</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label className="mb-2 block">Time</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8:00">8:00 AM</SelectItem>
                              <SelectItem value="9:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                              <SelectItem value="17:00">5:00 PM</SelectItem>
                              <SelectItem value="18:00">6:00 PM</SelectItem>
                              <SelectItem value="19:00">7:00 PM</SelectItem>
                              <SelectItem value="20:00">8:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md">
                        <div>
                          <Label className="mb-2 block">Option 2 (Alternative)</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className="w-full justify-start text-left font-normal text-muted-foreground"
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Pick a date</span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent mode="single" initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label className="mb-2 block">Time</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8:00">8:00 AM</SelectItem>
                              <SelectItem value="9:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                              <SelectItem value="17:00">5:00 PM</SelectItem>
                              <SelectItem value="18:00">6:00 PM</SelectItem>
                              <SelectItem value="19:00">7:00 PM</SelectItem>
                              <SelectItem value="20:00">8:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add Another Time Option
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Time Zone</Label>
                    <Select defaultValue="local">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Your Local Time</SelectItem>
                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Scheduling Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="friend-flexible" defaultChecked />
                        <Label htmlFor="friend-flexible">Allow friend to suggest alternative times</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="friend-reminder" defaultChecked />
                        <Label htmlFor="friend-reminder">Set reminder notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="friend-calendar" />
                        <Label htmlFor="friend-calendar">Add to calendar</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="friend-message">Personal Message</Label>
                  <Textarea
                    id="friend-message"
                    placeholder="Add a personal message to your challenge"
                    className="min-h-[100px]"
                    defaultValue="Think you can beat me? Let's find out!"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="friend-duration">Duration (seconds)</Label>
                    <Input id="friend-duration" type="number" defaultValue="60" min="10" max="300" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="friend-points">Points to Wager</Label>
                    <Input id="friend-points" type="number" defaultValue="100" min="10" max="1000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="friend-live-stream" defaultChecked />
                    <Label htmlFor="friend-live-stream">Enable live video stream</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Allow others to watch your battle in real-time</p>
                </div>

                <Button className="w-full">Send Challenge</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

