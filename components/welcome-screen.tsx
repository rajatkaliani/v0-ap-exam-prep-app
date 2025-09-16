"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SubjectSelection } from "./subject-selection"
import { DashboardPreview } from "./dashboard-preview"

export function WelcomeScreen() {
  const [currentStep, setCurrentStep] = useState<"welcome" | "subjects" | "preview">("welcome")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  if (currentStep === "subjects") {
    return (
      <SubjectSelection
        selectedSubjects={selectedSubjects}
        onSubjectsChange={setSelectedSubjects}
        onNext={() => setCurrentStep("preview")}
        onBack={() => setCurrentStep("welcome")}
      />
    )
  }

  if (currentStep === "preview") {
    return (
      <DashboardPreview
        selectedSubjects={selectedSubjects}
        onStart={() => {
          // Navigate to main app
          window.location.href = "/feed"
        }}
        onBack={() => setCurrentStep("subjects")}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center space-y-8 animate-swipe-up">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-balance">Master AP Exams Smarter</h1>
          <p className="text-muted-foreground text-pretty">
            Study with TikTok-style question cards and get personalized help from expert tutors
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={() => setCurrentStep("subjects")} className="w-full h-12 text-lg font-semibold" size="lg">
            Sign Up
          </Button>
          <Button
            onClick={() => setCurrentStep("subjects")}
            variant="outline"
            className="w-full h-12 text-lg"
            size="lg"
          >
            Login
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">Join thousands of students acing their AP exams</p>
      </Card>
    </div>
  )
}
