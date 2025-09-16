"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Target, Clock, Star, Play, BookOpen, Zap, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

const exploreContent = {
  "Based on Your Weak Spots": [
    {
      id: 1,
      title: "Rotational Motion Mastery",
      subject: "Physics 1",
      type: "Quiz",
      difficulty: "Hard",
      questions: 15,
      estimatedTime: "20 min",
      description: "Focus on angular velocity, torque, and moment of inertia",
      color: "bg-blue-500",
      icon: "🌀",
      accuracy: 64,
      isRecommended: true,
    },
    {
      id: 2,
      title: "Integration Techniques",
      subject: "Calculus AB",
      type: "Practice Set",
      difficulty: "Medium",
      questions: 12,
      estimatedTime: "15 min",
      description: "Master substitution and integration by parts",
      color: "bg-green-500",
      icon: "∫",
      accuracy: 71,
      isRecommended: true,
    },
  ],
  "Trending Subjects": [
    {
      id: 3,
      title: "AP Physics 1 Mock Exam",
      subject: "Physics 1",
      type: "Full Test",
      difficulty: "Mixed",
      questions: 50,
      estimatedTime: "90 min",
      description: "Complete practice exam with detailed explanations",
      color: "bg-blue-500",
      icon: "📝",
      popularity: 95,
      isTrending: true,
    },
    {
      id: 4,
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      type: "Flashcards",
      difficulty: "Hard",
      questions: 30,
      estimatedTime: "25 min",
      description: "Essential reaction mechanisms and products",
      color: "bg-orange-500",
      icon: "🧪",
      popularity: 88,
      isTrending: true,
    },
    {
      id: 5,
      title: "Calculus BC Series",
      subject: "Calculus BC",
      type: "Quiz",
      difficulty: "Hard",
      questions: 18,
      estimatedTime: "30 min",
      description: "Taylor series, convergence tests, and applications",
      color: "bg-green-600",
      icon: "∞",
      popularity: 82,
      isTrending: true,
    },
  ],
  "Recently Missed Topics": [
    {
      id: 6,
      title: "Projectile Motion Review",
      subject: "Physics 1",
      type: "Quick Review",
      difficulty: "Easy",
      questions: 8,
      estimatedTime: "10 min",
      description: "Brush up on horizontal and vertical motion",
      color: "bg-blue-500",
      icon: "🎯",
      lastAttempt: "2 days ago",
      needsReview: true,
    },
    {
      id: 7,
      title: "Limits and Continuity",
      subject: "Calculus AB",
      type: "Practice Set",
      difficulty: "Medium",
      questions: 10,
      estimatedTime: "12 min",
      description: "Review fundamental limit concepts",
      color: "bg-green-500",
      icon: "→",
      lastAttempt: "1 week ago",
      needsReview: true,
    },
  ],
}

const subjects = ["All", "Physics 1", "Physics 2", "Calculus AB", "Calculus BC", "Chemistry", "Biology"]
const contentTypes = ["All", "Quiz", "Practice Set", "Flashcards", "Full Test", "Quick Review"]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-700 bg-green-200"
      case "Medium":
        return "text-yellow-700 bg-yellow-200"
      case "Hard":
        return "text-red-700 bg-red-200"
      case "Mixed":
        return "text-purple-700 bg-purple-200"
      default:
        return "text-gray-700 bg-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Quiz":
        return <Brain className="w-4 h-4" />
      case "Practice Set":
        return <Target className="w-4 h-4" />
      case "Flashcards":
        return <Zap className="w-4 h-4" />
      case "Full Test":
        return <BookOpen className="w-4 h-4" />
      case "Quick Review":
        return <Clock className="w-4 h-4" />
      default:
        return <Play className="w-4 h-4" />
    }
  }

  const renderContentCard = (item: any) => (
    <Card key={item.id} className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <div className="flex gap-3">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg", item.color)}>
          {item.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{item.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {item.subject}
                </Badge>
                <Badge className={cn("text-xs", getDifficultyColor(item.difficulty))}>{item.difficulty}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {getTypeIcon(item.type)}
              <span className="text-xs text-muted-foreground">{item.type}</span>
            </div>
          </div>

          <p className="text-xs text-foreground/70 mb-3 line-clamp-2">{item.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-foreground/70">
              <span>{item.questions} questions</span>
              <span>{item.estimatedTime}</span>
            </div>

            <div className="flex items-center gap-2">
              {item.isRecommended && (
                <Badge variant="secondary" className="text-xs bg-primary text-primary-foreground">
                  Recommended
                </Badge>
              )}
              {item.isTrending && (
                <Badge variant="secondary" className="text-xs bg-orange-200 text-orange-700">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              )}
              {item.needsReview && (
                <Badge variant="secondary" className="text-xs bg-red-200 text-red-700">
                  Review
                </Badge>
              )}
            </div>
          </div>

          {item.accuracy && <div className="mt-2 text-xs text-foreground/70">Your accuracy: {item.accuracy}%</div>}
          {item.popularity && (
            <div className="mt-2 text-xs text-foreground/70">{item.popularity}% of students found this helpful</div>
          )}
          {item.lastAttempt && (
            <div className="mt-2 text-xs text-foreground/70">Last attempted: {item.lastAttempt}</div>
          )}
        </div>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border/50 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Explore & Practice</h1>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search quizzes, topics, or subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Subject:</span>
                {subjects.map((subject) => (
                  <Button
                    key={subject}
                    variant={selectedSubject === subject ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSubject(subject)}
                    className="text-xs"
                  >
                    {subject}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Type:</span>
                {contentTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className="text-xs"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {Object.entries(exploreContent).map(([sectionTitle, items]) => (
          <div key={sectionTitle}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold">{sectionTitle}</h2>
              {sectionTitle === "Based on Your Weak Spots" && <Target className="w-5 h-5 text-red-500" />}
              {sectionTitle === "Trending Subjects" && <TrendingUp className="w-5 h-5 text-orange-500" />}
              {sectionTitle === "Recently Missed Topics" && <Clock className="w-5 h-5 text-blue-500" />}
            </div>

            <div className="grid gap-4 md:grid-cols-2">{items.map((item) => renderContentCard(item))}</div>
          </div>
        ))}

        {/* Quick Stats */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Your Learning Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">127</div>
              <div className="text-sm text-foreground/70">Quizzes Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">80%</div>
              <div className="text-sm text-foreground/70">Average Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">23h</div>
              <div className="text-sm text-foreground/70">Study Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-foreground/70">Day Streak</div>
            </div>
          </div>
        </Card>

        {/* Recommended Study Plan */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Recommended Study Plan
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div>
                <div className="font-medium">Today: Focus on Rotational Motion</div>
                <div className="text-sm text-foreground/70">Complete 2 practice sets to improve weak areas</div>
              </div>
              <Button size="sm">Start Now</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div>
                <div className="font-medium">Tomorrow: Integration Review</div>
                <div className="text-sm text-foreground/70">Practice integration techniques for 20 minutes</div>
              </div>
              <Button variant="outline" size="sm">
                Schedule
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
