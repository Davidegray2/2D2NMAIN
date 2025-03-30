"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  BarChart,
  Clipboard,
  Sparkles,
} from "lucide-react"
import { useTrainerAuth } from "@/contexts/trainer-auth-context"
import { Logo } from "@/components/logo"

export function TrainerNav() {
  const pathname = usePathname()
  const { trainer, logout } = useTrainerAuth()

  if (!trainer) return null

  const navItems = [
    {
      href: "/trainer-portal",
      icon: LayoutDashboard,
      label: "Dashboard",
      active: pathname === "/trainer-portal",
    },
    {
      href: "/trainer-portal/clients",
      icon: Users,
      label: "Client Management",
      active: pathname === "/trainer-portal/clients" || pathname?.startsWith("/trainer-portal/clients/"),
    },
    {
      href: "/trainer-portal/schedule",
      icon: Calendar,
      label: "Schedule",
      active: pathname === "/trainer-portal/schedule",
    },
    {
      href: "/trainer-portal/messages",
      icon: MessageSquare,
      label: "Messages",
      active: pathname === "/trainer-portal/messages",
    },
    {
      href: "/trainer-portal/programs",
      icon: FileText,
      label: "Programs",
      active: pathname === "/trainer-portal/programs",
    },
    {
      href: "/trainer-portal/analytics",
      icon: BarChart,
      label: "Analytics",
      active: pathname === "/trainer-portal/analytics",
    },
    {
      href: "/trainer-portal/notes",
      icon: Clipboard,
      label: "Notes",
      active: pathname === "/trainer-portal/notes",
    },
    {
      href: "/trainer-portal/resources",
      icon: Sparkles,
      label: "Resources",
      active: pathname === "/trainer-portal/resources",
    },
    {
      href: "/trainer-portal/settings",
      icon: Settings,
      label: "Settings",
      active: pathname === "/trainer-portal/settings",
    },
  ]

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 mb-6">
          <Logo variant="compact" />
          <div>
            <h2 className="text-sm font-semibold">{trainer.name}</h2>
            <p className="text-xs text-muted-foreground">Trainer Portal</p>
          </div>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-primary/20",
                item.active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4 mr-2" />
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={logout}
            className="w-full flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-destructive/20 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  )
}

