"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface Question {
  id: number
  subject: string
  topic: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: string
}

interface QuestionCardProps {
  question: Question
  onNext: (wasCorrect: boolean) => void
  isAnimating?: boolean
}

export function QuestionCard({ question, onNext, isAnimating = false }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
  }

  const handleNext = () => {
    const wasCorrect = selectedAnswer === question.correctAnswer
    onNext(wasCorrect)
    // Reset state for next question
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100"
      case "Medium":
        return "text-yellow-600 bg-yellow-100"
      case "Hard":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getAnswerButtonStyle = (index: number) => {
    if (selectedAnswer === null) return "outline"
    if (index === question.correctAnswer) return "default"
    if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) return "destructive"
    return "outline"
  }

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Topic and Difficulty Badge */}
      <div className="flex items-center justify-between">
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">{question.topic}</div>
        <div className={cn("px-3 py-1 rounded-full text-xs font-medium", getDifficultyColor(question.difficulty))}>
          {question.difficulty}
        </div>
      </div>

      <Card
        className={cn(
          "p-6 space-y-6 shadow-xl border-0 bg-card/95 backdrop-blur-sm",
          isAnimating && "animate-swipe-up",
        )}
      >
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4 text-balance leading-relaxed">{question.question}</h2>
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={getAnswerButtonStyle(index)}
              className={cn(
                "w-full h-auto p-4 text-left justify-start transition-all duration-200 hover:scale-[1.02]",
                selectedAnswer === index && "ring-2 ring-primary/50",
              )}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
            >
              <span className="text-sm font-medium">{option}</span>
            </Button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <div className="space-y-4 animate-swipe-right">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              {selectedAnswer === question.correctAnswer ? (
                <div className="text-green-600 font-semibold text-lg">Correct! 🎉</div>
              ) : (
                <div className="space-y-1">
                  <div className="text-red-600 font-semibold">Not quite right</div>
                  <div className="text-sm text-muted-foreground">
                    The correct answer is {question.options[question.correctAnswer]}
                  </div>
                </div>
              )}
            </div>

            {showExplanation && (
              <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg animate-swipe-up">
                <h4 className="font-semibold mb-2 text-accent-foreground">Explanation:</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{question.explanation}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowExplanation(!showExplanation)} className="flex-1 h-11">
                {showExplanation ? "Hide" : "Show"} Explanation
              </Button>
              <Button onClick={handleNext} className="flex-1 h-11 font-semibold">
                Next Question
              </Button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Star className="w-4 h-4 mr-1" />
            Save for Review
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <RotateCcw className="w-4 h-4 mr-1" />
            Report Issue
          </Button>
        </div>
      </Card>
    </div>
  )
}
