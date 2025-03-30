"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Facebook, Twitter, Instagram, Check, Copy, QrCode, Download } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { AvatarCustomization } from "@/data/avatar-system"

interface ShareAvatarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  avatarUrl: string
  username: string
  customization: AvatarCustomization
}

export function ShareAvatarDialog({ open, onOpenChange, avatarUrl, username, customization }: ShareAvatarDialogProps) {
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [isGeneratingQR, setIsGeneratingQR] = useState(false)

  // Generate a shareable link with the customization encoded
  const shareableLink = `https://2d2n.com/avatar-share?u=${encodeURIComponent(username)}&c=${encodeURIComponent(JSON.stringify(customization))}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink)
    setCopied(true)
    toast({
      title: "Link Copied",
      description: "Share link copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareSocial = (platform: string) => {
    // In a real app, this would open the appropriate share dialog
    toast({
      title: `Sharing to ${platform}`,
      description: "Opening share dialog...",
    })
    onOpenChange(false)
  }

  const generateQRCode = () => {
    setIsGeneratingQR(true)
    // In a real implementation, this would generate a QR code
    // For now, we'll simulate it with a timeout
    setTimeout(() => {
      setQrCodeUrl("/assets/avatars/qr-code-example.png")
      setIsGeneratingQR(false)
    }, 1000)
  }

  useEffect(() => {
    if (open) {
      generateQRCode()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Avatar</DialogTitle>
          <DialogDescription>Share your custom avatar with friends or on social media</DialogDescription>
        </DialogHeader>

        <div className="flex justify-center py-4">
          <img
            src={avatarUrl || `/placeholder.svg?height=160&width=160&text=Avatar`}
            alt="Your Avatar"
            className="w-40 h-40 rounded-lg border"
            onError={(e) => {
              // If image fails to load, replace with a placeholder
              e.currentTarget.src = `/placeholder.svg?height=160&width=160&text=Avatar`
            }}
          />
        </div>

        <Tabs defaultValue="link">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="link">Copy Link</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="mt-4">
            <div className="flex space-x-2">
              <Input value={shareableLink} readOnly className="flex-1" />
              <Button variant="outline" onClick={handleCopyLink} size="icon">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="social" className="mt-4">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="flex flex-col items-center py-4"
                onClick={() => handleShareSocial("Facebook")}
              >
                <Facebook className="h-6 w-6 mb-1" />
                <span className="text-xs">Facebook</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center py-4"
                onClick={() => handleShareSocial("Twitter")}
              >
                <Twitter className="h-6 w-6 mb-1" />
                <span className="text-xs">Twitter</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center py-4"
                onClick={() => handleShareSocial("Instagram")}
              >
                <Instagram className="h-6 w-6 mb-1" />
                <span className="text-xs">Instagram</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="qr" className="mt-4">
            <div className="flex flex-col items-center space-y-4">
              {isGeneratingQR ? (
                <div className="h-40 w-40 flex items-center justify-center border rounded-lg">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <div className="border rounded-lg p-2">
                  <img
                    src={qrCodeUrl || "/placeholder.svg?height=160&width=160&text=QR+Code"}
                    alt="QR Code"
                    className="h-40 w-40"
                    onError={(e) => {
                      // If image fails to load, replace with a placeholder
                      e.currentTarget.src = "/placeholder.svg?height=160&width=160&text=QR+Code"
                    }}
                  />
                </div>
              )}
              <Button variant="outline" onClick={() => generateQRCode()} disabled={isGeneratingQR}>
                <QrCode className="h-4 w-4 mr-2" />
                Regenerate QR Code
              </Button>
              <Button variant="outline" onClick={() => {}}>
                <Download className="h-4 w-4 mr-2" />
                Download QR Code
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

