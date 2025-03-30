"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Camera,
  Upload,
  Smartphone,
  Laptop,
  RotateCcw,
  Check,
  Info,
  Crown,
  Sparkles,
  AlertTriangle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { ErrorBoundary } from "@/components/error-boundary"

type DeviceType = "mobile" | "tablet" | "desktop" | "unknown"

interface BodyCompositionScannerProps {
  enhanced?: boolean
}

export function BodyCompositionScanner({ enhanced = false }: BodyCompositionScannerProps) {
  const { toast } = useToast()
  const [beforeImage, setBeforeImage] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)
  const [deviceType, setDeviceType] = useState<DeviceType>("unknown")
  const [activeTab, setActiveTab] = useState("upload")
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraLoading, setCameraLoading] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [videoReady, setVideoReady] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const dynamicVideoRef = useRef<HTMLVideoElement | null>(null)

  const [analyzing, setAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<{
    bodyFat?: number
    muscleMass?: number
    bodyType?: string
    recommendations?: string[]
  } | null>(null)

  const [timerActive, setTimerActive] = useState(false)
  const [timerCount, setTimerCount] = useState(20)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Detect device type
  useEffect(() => {
    const detectDeviceType = (): DeviceType => {
      if (typeof window === "undefined") return "unknown"

      const userAgent = navigator.userAgent.toLowerCase()
      const width = window.innerWidth

      if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
        return width < 768 ? "mobile" : "tablet"
      }
      return "desktop"
    }

    setDeviceType(detectDeviceType())

    const handleResize = () => {
      setDeviceType(detectDeviceType())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera()
      // Clean up timer if active
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      // Also clean up dynamic video element if it exists
      if (dynamicVideoRef.current && dynamicVideoRef.current.parentNode) {
        dynamicVideoRef.current.parentNode.removeChild(dynamicVideoRef.current)
        dynamicVideoRef.current = null
      }
    }
  }, [])

  // Handle file uploads
  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: "Please select an image under 5MB",
            variant: "destructive",
          })
          return
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Invalid file type",
            description: "Please select an image file",
            variant: "destructive",
          })
          return
        }

        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target) {
            setImage(event.target.result as string)
            toast({
              title: "Image uploaded",
              description: "Your image has been successfully uploaded.",
            })
          }
        }
        reader.readAsDataURL(file)
      }
    },
    [toast],
  )

  // Replace the handleUseDemoImage function with a more professional version
  const handleUseDemoImage = useCallback(
    (type: "before" | "after" = "before") => {
      const defaultImageUrl =
        type === "before" ? "/images/body-scan/default-before.jpg" : "/images/body-scan/default-after.jpg"

      if (type === "before") {
        setBeforeImage(defaultImageUrl)
      } else {
        setAfterImage(defaultImageUrl)
      }

      toast({
        title: "Default image added",
        description: `Using a default ${type} image.`,
      })
    },
    [toast],
  )

  // Create a dynamic video element
  const createDynamicVideoElement = useCallback(() => {
    console.log("Creating dynamic video element")

    // Remove any existing dynamic video element
    if (dynamicVideoRef.current && dynamicVideoRef.current.parentNode) {
      dynamicVideoRef.current.parentNode.removeChild(dynamicVideoRef.current)
    }

    // Create a new video element
    const video = document.createElement("video")
    video.autoplay = true
    video.playsInline = true
    video.muted = true
    video.style.width = "100%"
    video.style.height = "100%"
    video.style.objectFit = "cover"
    video.id = "dynamic-camera-video"

    // Store it for later use
    dynamicVideoRef.current = video

    // Find the video container
    const container = videoContainerRef.current

    if (container) {
      console.log("Adding dynamic video to container")
      container.appendChild(video)
    } else {
      console.error("Video container not found")
      return null
    }

    return video
  }, [])

  // Stop camera
  const stopCamera = useCallback(() => {
    console.log("Stopping camera...")

    // Stop all tracks in the stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        console.log(`Stopping track: ${track.kind}`)
        track.stop()
      })
      streamRef.current = null
    }

    // Clear video source
    if (dynamicVideoRef.current) {
      dynamicVideoRef.current.srcObject = null
    }

    setCameraActive(false)
    setVideoReady(false)
    console.log("Camera stopped")
  }, [])

  // Add progressive enhancement for browsers without camera API support
  // Add this function after the other utility functions but before the return statement

  const checkCameraSupport = useCallback(() => {
    // Check if the browser supports the MediaDevices API
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Your browser doesn't support camera access. Try using a modern browser or upload images instead.")
      toast({
        variant: "destructive",
        title: "Camera not supported",
        description: "Your browser doesn't support camera access. Please upload images instead.",
      })
      return false
    }

    return true
  }, [toast])

  // Start camera with robust error handling
  const startCamera = useCallback(async () => {
    console.log("Starting camera...")
    setCameraLoading(true)
    setCameraError(null)
    setVideoReady(false)

    // First, stop any existing camera stream
    stopCamera()

    try {
      // Check if camera is supported
      if (!checkCameraSupport()) {
        // If not supported, use demo image as fallback
        handleUseDemoImage("before")
        setCameraLoading(false)
        return
      }

      // Check if MediaDevices API is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("MediaDevices API not supported")
        throw new Error("Camera API not supported in this browser")
      }

      // Check if video container exists
      if (!videoContainerRef.current) {
        console.error("Video container not found")
        throw new Error("Camera initialization failed: Video container not available")
      }

      console.log("Requesting camera access...")

      // Try different approaches to get camera access
      let stream: MediaStream | null = null

      // Approach 1: Basic constraints
      try {
        console.log("Trying basic camera constraints...")
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })
        console.log("Camera access granted with basic constraints")
      } catch (basicError) {
        console.warn("Failed with basic constraints:", basicError)

        // Approach 2: Device-specific constraints
        try {
          console.log("Trying device-specific constraints...")
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: deviceType === "mobile" ? "environment" : "user",
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          })
          console.log("Camera access granted with specific constraints")
        } catch (specificError) {
          console.warn("Failed with specific constraints:", specificError)

          // Approach 3: Minimal constraints
          try {
            console.log("Trying minimal constraints...")
            stream = await navigator.mediaDevices.getUserMedia({
              video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
              },
              audio: false,
            })
            console.log("Camera access granted with minimal constraints")
          } catch (minimalError) {
            console.error("All camera access attempts failed:", minimalError)
            throw new Error("Could not access camera after multiple attempts")
          }
        }
      }

      if (!stream) {
        throw new Error("Failed to get camera stream")
      }

      // Store the stream in ref for later cleanup
      streamRef.current = stream

      // Create a dynamic video element
      const videoElement = createDynamicVideoElement()

      if (!videoElement) {
        throw new Error("Could not create video element")
      }

      // Set up video element with the stream
      console.log("Setting up video element with stream")
      videoElement.srcObject = stream

      // Set up event listeners for video
      videoElement.onloadedmetadata = () => {
        console.log("Video metadata loaded, dimensions:", videoElement.videoWidth, "x", videoElement.videoHeight)

        videoElement
          .play()
          .then(() => {
            console.log("Video playing successfully")
            setVideoReady(true)
            setCameraActive(true)
            setCameraLoading(false)
          })
          .catch((playError) => {
            console.error("Error playing video:", playError)
            setCameraError(`Error playing video: ${playError.message}`)
            setCameraLoading(false)
          })
      }

      videoElement.onerror = (e) => {
        console.error("Video element error:", e)
        setCameraError("Error displaying camera feed. Please try the demo image instead.")
        setCameraLoading(false)
      }

      toast({
        title: "Camera activated",
        description: "Camera is now active. Click to capture an image.",
      })
    } catch (error: any) {
      console.error("Camera access error:", error)
      let errorMessage = "Unable to access camera"
      if (error instanceof Error) {
        if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
          errorMessage = "Camera access denied. Please allow camera permissions and try again."
        } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
          errorMessage = "No camera found on your device."
        } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
          errorMessage = "Camera is already in use by another application."
        } else if (error.name === "OverconstrainedError") {
          errorMessage = "Camera does not meet the required constraints."
        } else {
          errorMessage = error.message || "Unknown camera error"
        }
      }
      setCameraError(errorMessage)
      setCameraLoading(false)
      setCameraActive(false)
      setVideoReady(false)

      // Use a default image instead
      handleUseDemoImage("before")

      toast({
        variant: "destructive",
        title: "Camera access failed",
        description: "Please upload your photos instead.",
      })
    }
  }, [createDynamicVideoElement, deviceType, handleUseDemoImage, stopCamera, toast, checkCameraSupport])

  // Capture image with better error handling
  const captureImage = useCallback(
    (type: "before" | "after") => {
      console.log("Attempting to capture image...")

      const video = dynamicVideoRef.current

      if (!video || !canvasRef.current || !videoReady) {
        console.error("Video or canvas not ready for capture")
        console.log("dynamicVideoRef.current:", !!dynamicVideoRef.current)
        console.log("canvasRef.current:", !!canvasRef.current)
        console.log("videoReady:", videoReady)

        handleUseDemoImage(type)
        return
      }

      try {
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")

        if (!context) {
          console.error("Could not get canvas context")
          handleUseDemoImage(type)
          return
        }

        // Log video dimensions for debugging
        console.log(`Video dimensions: ${video.videoWidth}x${video.videoHeight}`)

        // Set canvas size to match video
        canvas.width = video.videoWidth || 640
        canvas.height = video.videoHeight || 480

        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Get image data
        const imageData = canvas.toDataURL("image/png")

        // Set image based on type
        if (type === "before") {
          setBeforeImage(imageData)
        } else {
          setAfterImage(imageData)
        }

        console.log(`${type} image captured successfully`)

        toast({
          title: "Image captured",
          description: `Your ${type} image has been captured successfully.`,
        })
      } catch (err) {
        console.error("Error capturing image:", err)
        handleUseDemoImage(type)

        toast({
          title: "Capture failed",
          description: "Using a demo image instead.",
          variant: "destructive",
        })
      }
    },
    [handleUseDemoImage, toast, videoReady],
  )

  const getDeviceSpecificInstructions = useCallback(() => {
    switch (deviceType) {
      case "mobile":
        return "Stand 5-7 feet from a mirror in good lighting. Wear fitted clothing for accurate analysis."
      case "tablet":
        return "Position your tablet 5-7 feet away or use a mirror. Ensure good lighting for best results."
      case "desktop":
        return "Use your webcam in good lighting or upload photos taken with your phone."
      default:
        return "Ensure good lighting and wear fitted clothing for the most accurate analysis."
    }
  }, [deviceType])

  // Switch to camera tab when user clicks "Start Camera"
  const handleStartCamera = useCallback(() => {
    setActiveTab("camera")
    // Use setTimeout to ensure the tab has switched before starting the camera
    setTimeout(() => {
      startCamera()
    }, 500) // Increased delay to ensure DOM is ready
  }, [startCamera])

  // Perform body composition analysis
  const performAnalysis = useCallback(() => {
    setAnalyzing(true)
    setAnalysisComplete(false)

    // Simulate analysis process
    toast({
      title: enhanced ? "Enhanced analysis started" : "Analysis started",
      description: enhanced
        ? "Your enhanced body composition is being analyzed with 3D modeling. Results will be ready shortly."
        : "Your body composition is being analyzed. Results will be ready shortly.",
    })

    // Simulate API call with timeout
    setTimeout(() => {
      // Generate mock results
      const mockResults = {
        bodyFat: Math.floor(Math.random() * 10) + 12, // 12-22%
        muscleMass: Math.floor(Math.random() * 15) + 35, // 35-50%
        bodyType: ["Ectomorph", "Mesomorph", "Endomorph"][Math.floor(Math.random() * 3)],
        recommendations: [
          "Focus on compound exercises for overall muscle development",
          "Maintain a protein intake of 1.6-2.0g per kg of bodyweight",
          "Consider adding 2-3 cardio sessions per week for optimal fat loss",
          "Ensure adequate recovery with 7-8 hours of sleep",
        ],
      }

      setAnalysisResults(mockResults)
      setAnalysisComplete(true)
      setAnalyzing(false)

      toast({
        title: "Analysis complete",
        description: "Your body composition analysis is ready to view.",
        variant: "success",
      })
    }, 3000) // 3 second simulated processing time
  }, [enhanced, toast])

  // Start a countdown timer and capture image when it reaches zero
  const startTimer = useCallback(
    (type: "before" | "after") => {
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      // Reset and start timer
      setTimerCount(20)
      setTimerActive(true)

      toast({
        title: "Timer started",
        description: "Get in position! Photo will be taken in 20 seconds.",
      })

      timerRef.current = setInterval(() => {
        setTimerCount((prev) => {
          if (prev <= 1) {
            // Time's up - clear interval and capture image
            if (timerRef.current) {
              clearInterval(timerRef.current)
            }
            setTimerActive(false)

            // Capture the image
            captureImage(type)

            return 0
          }
          return prev - 1
        })
      }, 1000)
    },
    [captureImage, toast],
  )

  return (
    <ErrorBoundary>
      <Card className={enhanced ? "w-full border-amber-200 dark:border-amber-800/50" : "w-full"}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 flex-wrap">
            {enhanced ? (
              <>
                <Sparkles className="h-5 w-5 text-amber-500" />
                Enhanced Body Composition Scanner
                <span className="ml-2 text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-400 px-2 py-1 rounded-full flex items-center">
                  <Crown className="h-3 w-3 inline mr-1" />
                  Membership
                </span>
              </>
            ) : (
              <>
                <Camera className="h-5 w-5" />
                Body Composition Scanner
              </>
            )}

            {deviceType !== "unknown" && (
              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {deviceType === "mobile" && <Smartphone className="h-3 w-3 inline mr-1" />}
                {deviceType === "desktop" && <Laptop className="h-3 w-3 inline mr-1" />}
                {deviceType.charAt(0).toUpperCase() + deviceType.slice(1)} Optimized
              </span>
            )}
          </CardTitle>
          <CardDescription>
            {enhanced
              ? "Upload or capture progress photos for enhanced 3D modeling and AI-powered analysis"
              : "Upload or capture progress photos to get AI-powered body composition analysis"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>{getDeviceSpecificInstructions()}</AlertDescription>
          </Alert>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photos
              </TabsTrigger>
              <TabsTrigger value="camera">
                <Camera className="h-4 w-4 mr-2" />
                Use Camera
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="before-image">Before Picture</Label>
                  <Input
                    id="before-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setBeforeImage)}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    aria-label="Upload before picture"
                  />
                  {beforeImage && (
                    <div className="relative mt-2">
                      <img
                        src={beforeImage || "/placeholder.svg"}
                        alt="Before"
                        className="rounded-md max-h-40 object-cover w-full"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                        onClick={() => setBeforeImage(null)}
                        aria-label="Remove before image"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="after-image">After Picture (Optional)</Label>
                  <Input
                    id="after-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setAfterImage)}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    aria-label="Upload after picture"
                  />
                  {afterImage && (
                    <div className="relative mt-2">
                      <img
                        src={afterImage || "/placeholder.svg"}
                        alt="After"
                        className="rounded-md max-h-40 object-cover w-full"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                        onClick={() => setAfterImage(null)}
                        aria-label="Remove after image"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <Button onClick={handleStartCamera} variant="outline" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Switch to Camera Mode
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="camera" className="space-y-4">
              <div className="relative">
                <div
                  ref={videoContainerRef}
                  className="relative rounded-md overflow-hidden bg-black aspect-video video-container"
                  aria-live="polite"
                >
                  {/* Fallback message if video isn't showing */}
                  {!videoReady && !cameraActive && (
                    <div className="absolute inset-0 flex items-center justify-center text-white p-4 text-center">
                      <p>Click "Start Camera" to activate your camera</p>
                    </div>
                  )}

                  {!videoReady && cameraActive && (
                    <div className="absolute inset-0 flex items-center justify-center text-white bg-black/80 z-10 p-4 text-center">
                      <p>Camera is initializing... If you don't see video, try the demo image instead.</p>
                    </div>
                  )}

                  {/* Timer overlay */}
                  {timerActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                      <div className="text-white text-7xl font-bold animate-pulse">{timerCount}</div>
                    </div>
                  )}
                </div>

                {/* Camera controls */}
                <div className="mt-4 space-y-4">
                  {cameraActive ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <Button
                          onClick={() => captureImage("before")}
                          className="flex items-center justify-center gap-2"
                          aria-label="Capture before image"
                        >
                          <Camera className="h-4 w-4" />
                          Capture Before
                        </Button>
                        <Button
                          onClick={() => captureImage("after")}
                          variant="outline"
                          className="flex items-center justify-center gap-2"
                          aria-label="Capture after image"
                        >
                          <Camera className="h-4 w-4" />
                          Capture After
                        </Button>
                        <Button
                          onClick={() => startTimer("before")}
                          variant="secondary"
                          className="flex items-center justify-center gap-2 col-span-2 sm:col-span-1"
                          disabled={timerActive}
                          aria-label="Start 20 second timer"
                        >
                          {timerActive ? `${timerCount}s` : "20s Timer"}
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={stopCamera} className="flex-1" aria-label="Stop camera">
                          Stop Camera
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleUseDemoImage("before")}
                          className="flex-1"
                          aria-label="Use demo image"
                        >
                          Use Demo Image
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        onClick={startCamera}
                        className="flex-1"
                        disabled={cameraLoading}
                        aria-label="Start camera"
                      >
                        {cameraLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                            Accessing Camera...
                          </div>
                        ) : (
                          <>
                            <Camera className="h-4 w-4 mr-2" />
                            Start Camera
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleUseDemoImage("before")}
                        className="flex-1"
                        aria-label="Use demo image"
                      >
                        Use Demo Image
                      </Button>
                    </div>
                  )}

                  {cameraError && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">{cameraError}</AlertDescription>
                    </Alert>
                  )}
                </div>
                <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
              </div>

              {/* Captured images display */}
              {(beforeImage || afterImage) && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Captured Images</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {beforeImage && (
                      <div className="space-y-1">
                        <Label>Before Image</Label>
                        <div className="relative">
                          <img
                            src={beforeImage || "/placeholder.svg"}
                            alt="Before"
                            className="rounded-md aspect-video object-cover w-full"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute top-2 right-2 h-8 w-8 p-0"
                            onClick={() => setBeforeImage(null)}
                            aria-label="Remove before image"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {afterImage && (
                      <div className="space-y-1">
                        <Label>After Image</Label>
                        <div className="relative">
                          <img
                            src={afterImage || "/placeholder.svg"}
                            alt="After"
                            className="rounded-md aspect-video object-cover w-full"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute top-2 right-2 h-8 w-8 p-0"
                            onClick={() => setAfterImage(null)}
                            aria-label="Remove after image"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            className={`w-full ${enhanced ? "bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600" : ""}`}
            disabled={!beforeImage || analyzing}
            onClick={performAnalysis}
            aria-label={enhanced ? "Analyze with 3D Modeling" : "Analyze Body Composition"}
          >
            {analyzing ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                {enhanced ? "Analyzing with 3D Modeling..." : "Analyzing..."}
              </div>
            ) : beforeImage ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                {enhanced ? "Analyze with 3D Modeling" : "Analyze Body Composition"}
              </>
            ) : (
              "Upload or capture a photo to continue"
            )}
          </Button>

          {analysisComplete && analysisResults && (
            <div className="mt-4 p-4 border rounded-lg bg-muted/50 w-full">
              <h3 className="text-lg font-semibold mb-2">Analysis Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Body Fat</span>
                  <span className="font-medium">{analysisResults.bodyFat}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Muscle Mass</span>
                  <span className="font-medium">{analysisResults.muscleMass}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Body Type</span>
                  <span className="font-medium">{analysisResults.bodyType}</span>
                </div>
              </div>

              {enhanced && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-1">Personalized Recommendations</h4>
                  <ul className="text-sm space-y-1">
                    {analysisResults.recommendations?.map((rec, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-3 w-3 mr-2 mt-1 text-green-500" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </ErrorBoundary>
  )
}

