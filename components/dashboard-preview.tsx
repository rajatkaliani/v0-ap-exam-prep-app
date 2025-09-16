"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Flame, TrendingUp } from "lucide-react"

const subjectColors = {
  "physics-1": "bg-blue-500",
  "physics-2": "bg-blue-600",
  "calc-ab": "bg-green-500",
  "calc-bc": "bg-green-600",
  chemistry: "bg-orange-500",
  biology: "bg-teal-500",
}

const subjectNames = {
  "physics-1": "Physics 1",
  "physics-2": "Physics 2",
  "calc-ab": "Calculus AB",
  "calc-bc": "Calculus BC",
  chemistry: "Chemistry",
  biology: "Biology",
}

interface DashboardPreviewProps {
  selectedSubjects: string[]
  onStart: () => void
  onBack: () => void
}

export function DashboardPreview({ selectedSubjects, onStart, onBack }: DashboardPreviewProps) {
  const userName = "Alex" // This would come from auth in real app

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Your Dashboard</h1>
        </div>

        <Card className="p-6 mb-6 animate-swipe-up">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-primary rounded-full mx-auto flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {userName[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold">Hi {userName}!</h2>
              <p className="text-muted-foreground">
                Ready to learn AP{" "}
                {selectedSubjects.map((id) => subjectNames[id as keyof typeof subjectNames]).join(" & ")}?
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-lg">0</span>
            </div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="font-bold text-lg">0%</span>
            </div>
            <p className="text-sm text-muted-foreground">Progress</p>
          </Card>
        </div>

        <div className="space-y-3 mb-8">
          {selectedSubjects.map((subjectId) => (
            <Card key={subjectId} className="p-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${subjectColors[subjectId as keyof typeof subjectColors]}`}
                >
                  <span className="text-lg">📚</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{subjectNames[subjectId as keyof typeof subjectNames]}</h3>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div className="bg-primary h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Start
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Button onClick={onStart} className="w-full h-12 text-lg font-semibold" size="lg">
          Start Practicing →
        </Button>
      </div>
    </div>
  )
}
