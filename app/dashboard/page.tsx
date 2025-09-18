"use client"

import { DashboardSidebar, MobileBottomNav } from "@/components/dashboard-sidebar"
import { SubjectCard } from "@/components/subject-card"
import { DashboardRightSidebar } from "@/components/dashboard-right-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Plus, TrendingUp, Target, BookOpen, Award } from "lucide-react"

const subjectData = [
  {
    id: "physics-1",
    name: "AP Physics 1",
    color: "bg-blue-500",
    progress: 65,
    questionsAnswered: 127,
    accuracy: 78,
    nextTopic: "Rotational Motion",
  },
  {
    id: "calc-ab",
    name: "AP Calculus AB",
    color: "bg-green-500",
    progress: 42,
    questionsAnswered: 89,
    accuracy: 82,
    nextTopic: "Integration by Parts",
  },
  {
    id: "chemistry",
    name: "AP Chemistry",
    color: "bg-orange-500",
    progress: 28,
    questionsAnswered: 56,
    accuracy: 75,
    nextTopic: "Chemical Bonding",
  },
  {
    id: "biology",
    name: "AP Biology",
    color: "bg-teal-500",
    progress: 15,
    questionsAnswered: 23,
    accuracy: 68,
    nextTopic: "Cell Structure",
  },
]

const quickStats = [
  {
    icon: TrendingUp,
    label: "Overall Progress",
    value: "54%",
    color: "text-green-500",
  },
  {
    icon: Target,
    label: "Average Accuracy",
    value: "76%",
    color: "text-blue-500",
  },
  {
    icon: BookOpen,
    label: "Questions Answered",
    value: "295",
    color: "text-purple-500",
  },
  {
    icon: Award,
    label: "Subjects Active",
    value: "4",
    color: "text-orange-500",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Left Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="flex-1 flex">
          <main className="flex-1 p-6 pb-20 md:pb-6">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
                  <p className="text-muted-foreground">Ready to continue your AP exam preparation?</p>
                </div>
                <Button className="hidden md:flex">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subject
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {quickStats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label} className="p-4">
                    <div className="flex items-center gap-3">
                      <Icon className={cn("w-5 h-5", stat.color)} />
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Subject Cards Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Your Subjects</h2>
                <Button variant="outline" size="sm" className="md:hidden bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subject
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {subjectData.map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} />
                ))}

                {/* Add New Subject Card */}
                <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/50">
                  <div className="p-6 flex flex-col items-center justify-center h-full min-h-[280px] text-center">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                      <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Add New Subject</h3>
                    <p className="text-sm text-muted-foreground mb-4">Start preparing for another AP exam</p>
                    <Button
                      variant="outline"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                    >
                      Browse Subjects
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </main>

          {/* Right Sidebar */}
          <DashboardRightSidebar className="p-6" />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}
