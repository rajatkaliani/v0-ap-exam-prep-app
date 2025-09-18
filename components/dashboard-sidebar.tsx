"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, BookOpen, HelpCircle, Users, Bell, User, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Subjects", href: "/subjects" },
  { icon: HelpCircle, label: "Practice Feed", href: "/feed" },
  { icon: Users, label: "Tutors", href: "/tutors" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: User, label: "Profile", href: "/profile" },
]

interface DashboardSidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "hidden md:flex flex-col bg-card border-r border-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && <h2 className="text-lg font-semibold text-foreground">AP Prep</h2>}
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn("w-full justify-start gap-3 h-12", isCollapsed && "justify-center px-0")}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

// Mobile Bottom Navigation
export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="grid grid-cols-6 gap-1 p-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button variant={isActive ? "default" : "ghost"} size="sm" className="flex flex-col gap-1 h-12 w-full">
                <Icon className="h-4 w-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
