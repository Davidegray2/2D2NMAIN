"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Watch,
  Smartphone,
  Heart,
  Activity,
  Zap,
  BarChart3,
  Flame,
  Dumbbell,
  CheckCircle2,
  AlertTriangle,
  Crown,
  Beaker,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ConnectedDevicesPage() {
  const [demoMode, setDemoMode] = useState(false)
  const [selectedTier, setSelectedTier] = useState("contender")
  const [membershipTier, setMembershipTier] = useState("basic")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("wearables")
  const [appleWatchConnected, setAppleWatchConnected] = useState(false)
  const [fitbitConnected, setFitbitConnected] = useState(false)
  const [garminConnected, setGarminConnected] = useState(false)
  const [samsungConnected, setSamsungConnected] = useState(false)
  const [syncInProgress, setSyncInProgress] = useState(false)

  // Update membership tier when demo mode or selected tier changes
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const tier = demoMode ? selectedTier : "basic"
      setMembershipTier(tier)
      setLoading(false)

      // Auto-connect some devices in demo mode
      if (demoMode) {
        setAppleWatchConnected(true)
        setFitbitConnected(true)
      } else {
        setAppleWatchConnected(false)
        setFitbitConnected(false)
        setGarminConnected(false)
        setSamsungConnected(false)
      }
    }, 500)
  }, [demoMode, selectedTier])

  const handleConnect = (device: string) => {
    // In a real app, this would trigger the OAuth flow or device pairing process
    setSyncInProgress(true)

    setTimeout(() => {
      setSyncInProgress(false)
      switch (device) {
        case "apple":
          setAppleWatchConnected(true)
          break
        case "fitbit":
          setFitbitConnected(true)
          break
        case "garmin":
          setGarminConnected(true)
          break
        case "samsung":
          setSamsungConnected(true)
          break
      }
    }, 2000)
  }

  const handleDisconnect = (device: string) => {
    switch (device) {
      case "apple":
        setAppleWatchConnected(false)
        break
      case "fitbit":
        setFitbitConnected(false)
        break
      case "garmin":
        setGarminConnected(false)
        break
      case "samsung":
        setSamsungConnected(false)
        break
    }
  }

  if (loading) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const isPremiumMember = membershipTier !== "basic"

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Demo Mode Toggle - For testing only */}
      <Card className="border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Beaker className="h-5 w-5 text-yellow-600" />
                <Label htmlFor="demo-mode" className="font-bold text-yellow-700 dark:text-yellow-400">
                  Demo Mode (For Testing Only)
                </Label>
              </div>
              <Switch id="demo-mode" checked={demoMode} onCheckedChange={setDemoMode} />
            </div>

            {demoMode && (
              <div className="pt-2 space-y-2">
                <Label htmlFor="tier-select" className="text-sm text-yellow-700 dark:text-yellow-400">
                  Test with membership tier:
                </Label>
                <Select value={selectedTier} onValueChange={setSelectedTier}>
                  <SelectTrigger id="tier-select" className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (Free)</SelectItem>
                    <SelectItem value="contender">Contender ($9.99)</SelectItem>
                    <SelectItem value="warrior">Warrior ($19.99)</SelectItem>
                    <SelectItem value="legend">Legend ($39.99)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-yellow-600 dark:text-yellow-500 italic mt-2">
                  Note: This demo mode is for testing purposes only and should be removed in production.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Connected Devices</h1>
        <p className="text-muted-foreground">Sync your fitness wearables and track your progress in real-time</p>
      </div>

      {!isPremiumMember ? (
        <>
          <Alert className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Crown className="h-5 w-5" />
            <AlertTitle>Premium Feature</AlertTitle>
            <AlertDescription>This feature is available to Contender, Warrior, and Legend members.</AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Connected Device Benefits</CardTitle>
              <CardDescription>Why connect your fitness devices?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Automatic Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Your workouts are logged automatically without manual entry
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Health Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Get personalized recommendations based on your biometric data
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Watch className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Real-time Feedback</h3>
                    <p className="text-sm text-muted-foreground">Receive alerts and guidance during your workouts</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Crown className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Premium Analytics</h3>
                    <p className="text-sm text-muted-foreground">Access advanced metrics and progress tracking</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => (window.location.href = "/membership-selection")}>
                Upgrade to Access Wearables
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <Tabs defaultValue="wearables" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="wearables" className="gap-2">
              <Watch className="h-4 w-4" />
              Wearables
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Fitness Data
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Smartphone className="h-4 w-4" />
              Integration Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wearables">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Watch className="h-5 w-5 text-primary" />
                    Apple Watch
                  </CardTitle>
                  <CardDescription>Sync workouts, heart rate, activity rings, and more</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appleWatchConnected ? (
                      <>
                        <div className="flex items-center gap-2 text-green-500">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="font-medium">Connected</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Last synced</span>
                            <span>2 minutes ago</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Device model</span>
                            <span>Apple Watch Series 8</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Battery</span>
                            <span>78%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Sync data</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <Switch id="apple-workouts" defaultChecked />
                              <Label htmlFor="apple-workouts">Workouts</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="apple-heart" defaultChecked />
                              <Label htmlFor="apple-heart">Heart Rate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="apple-activity" defaultChecked />
                              <Label htmlFor="apple-activity">Activity</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="apple-sleep" defaultChecked />
                              <Label htmlFor="apple-sleep">Sleep</Label>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <Watch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="mb-4">Connect your Apple Watch to sync your fitness data</p>
                        <Button onClick={() => handleConnect("apple")} disabled={syncInProgress} className="w-full">
                          {syncInProgress ? "Connecting..." : "Connect Apple Watch"}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                {appleWatchConnected && (
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => handleDisconnect("apple")}>
                      Disconnect
                    </Button>
                    <Button>Sync Now</Button>
                  </CardFooter>
                )}
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Watch className="h-5 w-5 text-primary" />
                    Android Wearables
                  </CardTitle>
                  <CardDescription>
                    Connect Samsung, Fitbit, Garmin, and other Android-compatible devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Watch className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Samsung Galaxy Watch</p>
                          <p className="text-sm text-muted-foreground">Sync activity, heart rate, sleep</p>
                        </div>
                      </div>
                      {samsungConnected ? (
                        <Badge variant="outline" className="text-green-500 border-green-500">
                          Connected
                        </Badge>
                      ) : (
                        <Button size="sm" onClick={() => handleConnect("samsung")} disabled={syncInProgress}>
                          Connect
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Watch className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Fitbit</p>
                          <p className="text-sm text-muted-foreground">Sync activity, sleep, calories</p>
                        </div>
                      </div>
                      {fitbitConnected ? (
                        <Badge variant="outline" className="text-green-500 border-green-500">
                          Connected
                        </Badge>
                      ) : (
                        <Button size="sm" onClick={() => handleConnect("fitbit")} disabled={syncInProgress}>
                          Connect
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Watch className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Garmin</p>
                          <p className="text-sm text-muted-foreground">Sync workouts, heart rate, GPS</p>
                        </div>
                      </div>
                      {garminConnected ? (
                        <Badge variant="outline" className="text-green-500 border-green-500">
                          Connected
                        </Badge>
                      ) : (
                        <Button size="sm" onClick={() => handleConnect("garmin")} disabled={syncInProgress}>
                          Connect
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Smartphone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Google Fit</p>
                          <p className="text-sm text-muted-foreground">Sync from your Android phone</p>
                        </div>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Underground Fitness Integration</CardTitle>
                <CardDescription>Special features for extreme workouts with your wearable devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium">Extreme Heart Rate Zones</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Track performance in the red zone with extended heart rate monitoring for Underground challenges
                    </p>
                    <div className="flex items-center space-x-2">
                      <Switch id="extreme-hr" />
                      <Label htmlFor="extreme-hr">Enable</Label>
                    </div>
                  </div>

                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <h3 className="font-medium">Recovery Warnings</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Get alerts when your body needs recovery, even during Underground workouts
                    </p>
                    <div className="flex items-center space-x-2">
                      <Switch id="recovery-warnings" defaultChecked />
                      <Label htmlFor="recovery-warnings">Enable</Label>
                    </div>
                  </div>

                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Dumbbell className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Form Detection</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Advanced motion tracking to ensure proper form during high-intensity exercises
                    </p>
                    <div className="flex items-center space-x-2">
                      <Switch id="form-detection" />
                      <Label htmlFor="form-detection">Enable</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Heart Rate Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Resting Heart Rate</span>
                        <span className="text-sm font-medium">62 bpm</span>
                      </div>
                      <div className="h-[100px] bg-black/5 dark:bg-white/5 rounded-md flex items-end p-2">
                        {[68, 65, 64, 67, 63, 62, 62].map((value, i) => (
                          <div key={i} className="flex-1 flex flex-col justify-end items-center">
                            <div
                              className="w-4 bg-primary rounded-t-sm"
                              style={{ height: `${(value - 50) * 2}px` }}
                            ></div>
                            <span className="text-[10px] mt-1">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Workout Heart Rate Zones</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Zone 5 (90-100%): Anaerobic</span>
                            <span>5 min</span>
                          </div>
                          <Progress value={8} className="h-2 bg-red-200" indicatorClassName="bg-red-500" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Zone 4 (80-90%): VO2 Max</span>
                            <span>12 min</span>
                          </div>
                          <Progress value={20} className="h-2 bg-orange-200" indicatorClassName="bg-orange-500" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Zone 3 (70-80%): Aerobic</span>
                            <span>25 min</span>
                          </div>
                          <Progress value={42} className="h-2 bg-yellow-200" indicatorClassName="bg-yellow-500" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Zone 2 (60-70%): Fat Burn</span>
                            <span>18 min</span>
                          </div>
                          <Progress value={30} className="h-2 bg-green-200" indicatorClassName="bg-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Activity Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold">12,458</div>
                        <div className="text-sm text-muted-foreground">Daily Steps</div>
                        <div className="text-xs text-green-500 mt-1">+1,245 from avg</div>
                      </div>
                      <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold">2,845</div>
                        <div className="text-sm text-muted-foreground">Calories Burned</div>
                        <div className="text-xs text-green-500 mt-1">+320 from avg</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Weekly Activity</h4>
                      <div className="h-[120px] bg-black/5 dark:bg-white/5 rounded-md flex items-end p-2">
                        {[65, 80, 45, 90, 70, 85, 60].map((value, i) => (
                          <div key={i} className="flex-1 flex flex-col justify-end items-center">
                            <div className="w-6 bg-primary/80 rounded-t-sm" style={{ height: `${value}px` }}></div>
                            <span className="text-[10px] mt-1">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Underground Challenge Progress</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>The Gauntlet: Day 12/30</span>
                            <span>40% complete</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Metabolic Hell: 3/5 sessions</span>
                            <span>60% complete</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Performance Insights
                  </CardTitle>
                  <CardDescription>AI-powered analysis based on your wearable data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Recovery Status</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Progress value={75} className="h-2 flex-1" />
                        <span className="font-medium">75%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your body is mostly recovered, but consider a lighter workout today. Heart rate variability is
                        slightly below your baseline.
                      </p>
                    </div>

                    <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Training Load</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Progress value={85} className="h-2 flex-1" indicatorClassName="bg-yellow-500" />
                        <span className="font-medium text-yellow-500">High</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your training load has been high for 3 consecutive days. Consider a recovery day to prevent
                        overtraining.
                      </p>
                    </div>

                    <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Underground Readiness</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Progress value={65} className="h-2 flex-1" />
                        <span className="font-medium">65%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on your recent performance and recovery metrics, you're moderately prepared for
                        Underground challenges. Consider "Metabolic Hell" rather than "The Crucible" today.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>Configure how your wearable data is used in the app</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Data Sync</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="auto-sync" className="font-medium">
                            Automatic Sync
                          </Label>
                          <p className="text-sm text-muted-foreground">Sync data automatically when app is opened</p>
                        </div>
                        <Switch id="auto-sync" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="background-sync" className="font-medium">
                            Background Sync
                          </Label>
                          <p className="text-sm text-muted-foreground">Sync data in the background every hour</p>
                        </div>
                        <Switch id="background-sync" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="wifi-only" className="font-medium">
                            Wi-Fi Only
                          </Label>
                          <p className="text-sm text-muted-foreground">Only sync when connected to Wi-Fi</p>
                        </div>
                        <Switch id="wifi-only" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Workout Detection</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="auto-detect" className="font-medium">
                            Auto-Detect Workouts
                          </Label>
                          <p className="text-sm text-muted-foreground">Automatically detect and log workouts</p>
                        </div>
                        <Switch id="auto-detect" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="gps-tracking" className="font-medium">
                            GPS Tracking
                          </Label>
                          <p className="text-sm text-muted-foreground">Track route for outdoor activities</p>
                        </div>
                        <Switch id="gps-tracking" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Underground Integration</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="extreme-tracking" className="font-medium">
                            Extreme Workout Tracking
                          </Label>
                          <p className="text-sm text-muted-foreground">Enhanced tracking for Underground workouts</p>
                        </div>
                        <Switch id="extreme-tracking" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="biometric-validation" className="font-medium">
                            Biometric Validation
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Use heart rate to validate Underground challenges
                          </p>
                        </div>
                        <Switch id="biometric-validation" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="recovery-alerts" className="font-medium">
                            Recovery Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">Get alerts when recovery is needed</p>
                        </div>
                        <Switch id="recovery-alerts" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Privacy</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="share-data" className="font-medium">
                            Share Workout Data
                          </Label>
                          <p className="text-sm text-muted-foreground">Allow sharing workout data with friends</p>
                        </div>
                        <Switch id="share-data" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="anonymous-insights" className="font-medium">
                            Anonymous Insights
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Contribute anonymous data for community insights
                          </p>
                        </div>
                        <Switch id="anonymous-insights" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

