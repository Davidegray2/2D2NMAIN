"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, MessageSquare, UserMinus, Dumbbell, Bell, BellOff, Flag } from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

interface SpotterActionsMenuProps {
  spotterId: number
  spotterName: string
}

export function SpotterActionsMenu({ spotterId, spotterName }: SpotterActionsMenuProps) {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const { toast } = useToast()

  const handleRemoveSpotter = () => {
    // In a real app, this would call an API to remove the spotter
    console.log(`Removing spotter ${spotterId}`)
    setShowRemoveDialog(false)

    toast({
      title: "Spotter removed",
      description: `${spotterName} has been removed from your spotters.`,
      variant: "destructive",
    })
  }

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)

    toast({
      title: notificationsEnabled ? "Notifications muted" : "Notifications enabled",
      description: notificationsEnabled
        ? `You won't receive notifications from ${spotterName}.`
        : `You'll now receive notifications from ${spotterName}.`,
    })
  }

  const handleMessage = () => {
    // In a real app, this would navigate to the messages page
    window.location.href = "/messages"
  }

  const handleChallenge = () => {
    toast({
      title: "Challenge sent!",
      description: `You've challenged ${spotterName} to a workout battle.`,
    })
  }

  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "Thank you for helping keep our community safe.",
      variant: "destructive",
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Spotter Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleMessage}>
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>Message</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleChallenge}>
            <Dumbbell className="h-4 w-4 mr-2" />
            <span>Challenge to Battle</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleNotifications}>
            {notificationsEnabled ? (
              <>
                <BellOff className="h-4 w-4 mr-2" />
                <span>Mute Notifications</span>
              </>
            ) : (
              <>
                <Bell className="h-4 w-4 mr-2" />
                <span>Enable Notifications</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500" onClick={() => setShowRemoveDialog(true)}>
            <UserMinus className="h-4 w-4 mr-2" />
            <span>Remove Spotter</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500" onClick={handleReport}>
            <Flag className="h-4 w-4 mr-2" />
            <span>Report</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Spotter</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {spotterName} from your spotters? They will no longer be able to see your
              private posts and activities.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveSpotter} className="bg-red-500 hover:bg-red-600">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

