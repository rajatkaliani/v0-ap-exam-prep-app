"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

const subjects = [
  { id: "physics-1", name: "Physics 1", color: "bg-blue-500", icon: "⚛️" },
  { id: "physics-2", name: "Physics 2", color: "bg-blue-600", icon: "🔬" },
  { id: "calc-ab", name: "Calculus AB", color: "bg-green-500", icon: "📊" },
  { id: "calc-bc", name: "Calculus BC", color: "bg-green-600", icon: "📈" },
  { id: "chemistry", name: "Chemistry", color: "bg-orange-500", icon: "🧪" },
  { id: "biology", name: "Biology", color: "bg-teal-500", icon: "🧬" },
]

interface SubjectSelectionProps {
  selectedSubjects: string[]
  onSubjectsChange: (subjects: string[]) => void
  onNext: () => void
  onBack: () => void
}

export function SubjectSelection({ selectedSubjects, onSubjectsChange, onNext, onBack }: SubjectSelectionProps) {
  const toggleSubject = (subjectId: string) => {
    if (selectedSubjects.includes(subjectId)) {
      onSubjectsChange(selectedSubjects.filter((id) => id !== subjectId))
    } else if (selectedSubjects.length < 2) {
      onSubjectsChange([...selectedSubjects, subjectId])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Choose Your Subjects</h1>
        </div>

        <p className="text-muted-foreground mb-8 text-center">Select 1-2 AP subjects to get started</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {subjects.map((subject) => (
            <Card
              key={subject.id}
              className={cn(
                "p-6 cursor-pointer transition-all duration-200 hover:scale-105",
                selectedSubjects.includes(subject.id) ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md",
              )}
              onClick={() => toggleSubject(subject.id)}
            >
              <div className="text-center space-y-3">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white text-xl",
                    subject.color,
                  )}
                >
                  {subject.icon}
                </div>
                <h3 className="font-semibold text-sm">{subject.name}</h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground mb-8">
          {selectedSubjects.length}/2 subjects selected
        </div>

        <Button
          onClick={onNext}
          disabled={selectedSubjects.length === 0}
          className="w-full h-12 text-lg font-semibold"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
