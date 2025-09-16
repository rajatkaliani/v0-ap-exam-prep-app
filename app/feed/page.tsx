"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, Flame, Star, ChevronDown, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const sampleQuestions = [
  {
    id: 1,
    subject: "Physics 1",
    topic: "Projectile Motion",
    question:
      "A ball is thrown horizontally from a height of 20m with an initial velocity of 15 m/s. What is the time of flight?",
    options: ["A) 1.4 seconds", "B) 2.0 seconds", "C) 2.8 seconds", "D) 3.2 seconds"],
    correctAnswer: 1,
    explanation: "Using kinematic equations: h = ½gt², so t = √(2h/g) = √(2×20/9.8) ≈ 2.0 seconds",
    difficulty: "Medium",
  },
  {
    id: 2,
    subject: "Physics 1",
    topic: "Forces",
    question: "A 5kg object experiences a net force of 20N. What is its acceleration?",
    options: ["A) 2 m/s²", "B) 4 m/s²", "C) 6 m/s²", "D) 8 m/s²"],
    correctAnswer: 1,
    explanation: "Using Newton's second law: F = ma, so a = F/m = 20N/5kg = 4 m/s²",
    difficulty: "Easy",
  },
  {
    id: 3,
    subject: "Physics 1",
    topic: "Energy",
    question: "A 2kg object moving at 10 m/s has what kinetic energy?",
    options: ["A) 50 J", "B) 100 J", "C) 150 J", "D) 200 J"],
    correctAnswer: 1,
    explanation: "KE = ½mv² = ½(2kg)(10 m/s)² = ½(2)(100) = 100 J",
    difficulty: "Easy",
  },
]

export default function FeedPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [streak, setStreak] = useState(3)
  const [progress, setProgress] = useState(25)
  const [questionsAnswered, setQuestionsAnswered] = useState(12)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const currentQuestion = sampleQuestions[currentQuestionIndex]

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)

    if (index === currentQuestion.correctAnswer) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 600)
    }
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setStreak((prev) => prev + 1)
      setProgress((prev) => Math.min(prev + 3, 100))
    }

    setIsAnimating(true)
    setTimeout(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % sampleQuestions.length)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setQuestionsAnswered((prev) => prev + 1)
      setIsAnimating(false)
    }, 300)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-700 bg-green-200"
      case "Medium":
        return "text-yellow-700 bg-yellow-200"
      case "Hard":
        return "text-red-700 bg-red-200"
      default:
        return "text-gray-700 bg-gray-200"
    }
  }

  const getAnswerButtonStyle = (index: number) => {
    if (selectedAnswer === null) return "outline"
    if (index === currentQuestion.correctAnswer) return "default"
    if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) return "destructive"
    return "outline"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 bg-card/80 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50">
          <User className="w-5 h-5" />
        </Button>

        <div className="text-center flex-1">
          <h1 className="font-bold text-lg">{currentQuestion.subject}</h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className="w-24 bg-muted rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-primary to-accent h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground font-medium">{progress}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-bold text-sm text-orange-700">{streak}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            <div className="font-semibold">{questionsAnswered}</div>
            <div>answered</div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          {/* Topic and Difficulty Badge */}
          <div className="flex items-center justify-between">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              {currentQuestion.topic}
            </div>
            <div
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                getDifficultyColor(currentQuestion.difficulty),
              )}
            >
              {currentQuestion.difficulty}
            </div>
          </div>

          <Card
            className={cn(
              "p-6 space-y-6 shadow-xl border-0 bg-card/95 backdrop-blur-sm",
              isAnimating && "animate-swipe-up",
            )}
          >
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4 text-balance leading-relaxed">{currentQuestion.question}</h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
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
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <div className="text-green-600 font-semibold text-lg">Correct! 🎉</div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-red-600 font-semibold">Not quite right</div>
                      <div className="text-sm text-muted-foreground">
                        The correct answer is {currentQuestion.options[currentQuestion.correctAnswer]}
                      </div>
                    </div>
                  )}
                </div>

                {showExplanation && (
                  <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg animate-swipe-up">
                    <h4 className="font-semibold mb-2 text-accent-foreground">Explanation:</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="flex-1 h-11"
                  >
                    {showExplanation ? "Hide" : "Show"} Explanation
                  </Button>
                  <Button onClick={handleNextQuestion} className="flex-1 h-11 font-semibold">
                    Next Question
                  </Button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground">
                <Star className="w-4 h-4 mr-1" />
                Save for Review
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground">
                <RotateCcw className="w-4 h-4 mr-1" />
                Report Issue
              </Button>
            </div>
          </Card>

          {/* Question Counter */}
          <div className="text-center text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {sampleQuestions.length}
          </div>
        </div>
      </div>

      {/* Swipe Instructions */}
      <div className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
          <ChevronDown className="w-4 h-4 animate-bounce" />
          <span>Swipe up for next • Tap to reveal explanation</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </div>
  )
}
