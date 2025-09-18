"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ArrowRight, BookOpen } from "lucide-react"

interface SubjectCardProps {
  subject: {
    id: string
    name: string
    color: string
    progress: number
    questionsAnswered: number
    accuracy: number
    nextTopic: string
  }
  className?: string
}

export function SubjectCard({ subject, className }: SubjectCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg",
        className,
      )}
    >
      {/* Background gradient */}
      <div className={cn("absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20", subject.color)} />

      <div className="relative p-6">
        {/* Subject Icon and Name */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md",
              subject.color,
            )}
          >
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{subject.name}</h3>
            <p className="text-sm text-muted-foreground">{subject.questionsAnswered} questions completed</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm font-bold text-foreground">{subject.progress}%</span>
          </div>
          <Progress value={subject.progress} className="h-2" />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div>
            <span className="text-muted-foreground">Accuracy: </span>
            <span className="font-semibold text-foreground">{subject.accuracy}%</span>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-xs">Next Topic:</p>
            <p className="font-medium text-foreground">{subject.nextTopic}</p>
          </div>
        </div>

        {/* Continue Button */}
        <Button className="w-full group-hover:shadow-md transition-shadow">
          Continue Practicing
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  )
}
