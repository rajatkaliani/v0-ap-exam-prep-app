"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Flame,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  Calendar,
  Settings,
  ArrowRight,
  Trophy,
  Clock,
  CheckCircle,
  PlayCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const subjectData = [
  {
    id: "physics-1",
    name: "Physics 1",
    color: "bg-blue-500",
    progress: 65,
    questionsAnswered: 127,
    accuracy: 78,
    timeSpent: "12h 30m",
    nextTopic: "Rotational Motion",
    recentScore: 85,
  },
  {
    id: "calc-ab",
    name: "Calculus AB",
    color: "bg-green-500",
    progress: 42,
    questionsAnswered: 89,
    accuracy: 82,
    timeSpent: "8h 15m",
    nextTopic: "Integration by Parts",
    recentScore: 92,
  },
]

const achievements = [
  { id: 1, title: "First Steps", description: "Completed your first question", icon: "🎯", unlocked: true },
  { id: 2, title: "Streak Master", description: "Maintained a 7-day streak", icon: "🔥", unlocked: true },
  { id: 3, title: "Physics Pro", description: "Scored 90%+ on 5 Physics questions", icon: "⚛️", unlocked: false },
  { id: 4, title: "Speed Demon", description: "Answered 50 questions in one day", icon: "⚡", unlocked: false },
]

const weeklyStats = [
  { day: "Mon", questions: 12, accuracy: 75 },
  { day: "Tue", questions: 18, accuracy: 82 },
  { day: "Wed", questions: 15, accuracy: 78 },
  { day: "Thu", questions: 22, accuracy: 85 },
  { day: "Fri", questions: 19, accuracy: 88 },
  { day: "Sat", questions: 8, accuracy: 90 },
  { day: "Sun", questions: 14, accuracy: 79 },
]

const scheduleData = [
  {
    date: "2024-01-15",
    day: "Monday",
    activities: [
      { type: "review", subject: "Physics 1", topic: "Kinematics Review", duration: "45 min", completed: true },
      { type: "practice", subject: "Calculus AB", topic: "Practice Problems", duration: "30 min", completed: true },
    ],
  },
  {
    date: "2024-01-16",
    day: "Tuesday",
    activities: [
      { type: "full-test", subject: "Physics 1", topic: "Full Practice Test", duration: "3 hours", completed: false },
    ],
  },
  {
    date: "2024-01-17",
    day: "Wednesday",
    activities: [
      { type: "content", subject: "Physics 1", topic: "Rotational Motion", duration: "60 min", completed: false },
      { type: "practice", subject: "Calculus AB", topic: "Integration Practice", duration: "40 min", completed: false },
    ],
  },
  {
    date: "2024-01-18",
    day: "Thursday",
    activities: [
      { type: "review", subject: "Calculus AB", topic: "Derivatives Review", duration: "35 min", completed: false },
      { type: "practice", subject: "Physics 1", topic: "Quick Practice", duration: "25 min", completed: false },
    ],
  },
  {
    date: "2024-01-19",
    day: "Friday",
    activities: [
      { type: "full-test", subject: "Calculus AB", topic: "Full Practice Test", duration: "3 hours", completed: false },
    ],
  },
  {
    date: "2024-01-20",
    day: "Saturday",
    activities: [{ type: "review", subject: "Both", topic: "Mistake Review", duration: "90 min", completed: false }],
  },
  {
    date: "2024-01-21",
    day: "Sunday",
    activities: [
      { type: "rest", subject: "Rest Day", topic: "Light Review (Optional)", duration: "30 min", completed: false },
    ],
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "full-test":
      return <Clock className="w-4 h-4" />
    case "review":
      return <BookOpen className="w-4 h-4" />
    case "practice":
      return <Target className="w-4 h-4" />
    case "content":
      return <PlayCircle className="w-4 h-4" />
    case "rest":
      return <Calendar className="w-4 h-4" />
    default:
      return <BookOpen className="w-4 h-4" />
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case "full-test":
      return "bg-red-500"
    case "review":
      return "bg-blue-500"
    case "practice":
      return "bg-green-500"
    case "content":
      return "bg-purple-500"
    case "rest":
      return "bg-gray-500"
    default:
      return "bg-blue-500"
  }
}

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "subjects" | "stats" | "schedule">("overview")

  const userName = "Alex Chen"
  const userGrade = "11th Grade"
  const userSchool = "Lincoln High School"
  const totalStreak = 12
  const overallProgress = 54
  const totalQuestionsAnswered = 216
  const overallAccuracy = 80

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border/50 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-lg font-bold">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h1 className="text-xl font-bold">{userName}</h1>
              <p className="text-sm text-muted-foreground">
                {userGrade} • {userSchool}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-2xl">{totalStreak}</span>
            </div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="font-bold text-2xl">{overallProgress}%</span>
            </div>
            <p className="text-sm text-muted-foreground">Overall Progress</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-blue-500" />
              <span className="font-bold text-2xl">{overallAccuracy}%</span>
            </div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <span className="font-bold text-2xl">{totalQuestionsAnswered}</span>
            </div>
            <p className="text-sm text-muted-foreground">Questions</p>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-muted rounded-lg p-1">
          {[
            { id: "overview", label: "Overview" },
            { id: "subjects", label: "Subjects" },
            { id: "stats", label: "Statistics" },
            { id: "schedule", label: "Schedule" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={selectedTab === tab.id ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setSelectedTab(tab.id as any)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedTab === "overview" && (
          <div className="space-y-6">
            {/* Subject Progress */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Your Subjects
              </h2>
              <div className="space-y-4">
                {subjectData.map((subject) => (
                  <div key={subject.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-white",
                        subject.color,
                      )}
                    >
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{subject.name}</h3>
                        <span className="text-sm text-muted-foreground">{subject.progress}% complete</span>
                      </div>
                      <Progress value={subject.progress} className="h-2 mb-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Next: {subject.nextTopic}</span>
                        <span>{subject.accuracy}% accuracy</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Achievements */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={cn(
                      "p-3 rounded-lg border transition-all",
                      achievement.unlocked
                        ? "bg-primary/5 border-primary/20 text-foreground"
                        : "bg-muted/50 border-muted text-muted-foreground",
                    )}
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {selectedTab === "subjects" && (
          <div className="space-y-4">
            {subjectData.map((subject) => (
              <Card key={subject.id} className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={cn("w-16 h-16 rounded-full flex items-center justify-center text-white", subject.color)}
                  >
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{subject.name}</h2>
                    <p className="text-muted-foreground">Next topic: {subject.nextTopic}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{subject.progress}%</div>
                    <div className="text-sm text-muted-foreground">Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{subject.accuracy}%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{subject.questionsAnswered}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{subject.timeSpent}</div>
                    <div className="text-sm text-muted-foreground">Time Spent</div>
                  </div>
                </div>

                <Progress value={subject.progress} className="h-3 mb-4" />

                <div className="flex gap-3">
                  <Button className="flex-1">Continue Learning</Button>
                  <Button variant="outline">Review Mistakes</Button>
                  <Button variant="outline">Practice Test</Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === "stats" && (
          <div className="space-y-6">
            {/* Weekly Activity */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                This Week's Activity
              </h2>
              <div className="grid grid-cols-7 gap-2">
                {weeklyStats.map((day, index) => (
                  <div key={day.day} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                    <div
                      className="bg-primary/20 rounded-lg p-2 mb-1"
                      style={{ height: `${Math.max(day.questions * 2, 20)}px` }}
                    >
                      <div className="text-xs font-semibold">{day.questions}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{day.accuracy}%</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Trends */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Performance Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Strengths</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">Kinematics</span>
                      <span className="text-sm font-semibold text-green-600">92%</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">Derivatives</span>
                      <span className="text-sm font-semibold text-green-600">89%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Areas to Improve</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm">Rotational Motion</span>
                      <span className="text-sm font-semibold text-red-600">64%</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm">Integration</span>
                      <span className="text-sm font-semibold text-red-600">71%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {selectedTab === "schedule" && (
          <div className="space-y-6">
            {/* Schedule Header */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Your Personalized Study Schedule
                </h2>
                <Button variant="outline" size="sm">
                  Customize Plan
                </Button>
              </div>
              <p className="text-muted-foreground text-sm">
                Your AI-generated study plan adapts to your progress and exam dates. Stay consistent to maximize your
                scores!
              </p>
            </Card>

            {/* Weekly Schedule */}
            <div className="space-y-4">
              {scheduleData.map((day, index) => (
                <Card key={day.date} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold",
                          index === 0 ? "bg-primary" : "bg-muted-foreground",
                        )}
                      >
                        {day.day.slice(0, 3)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{day.day}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {day.activities.filter((a) => a.completed).length}/{day.activities.length} completed
                    </div>
                  </div>

                  <div className="space-y-3">
                    {day.activities.map((activity, actIndex) => (
                      <div
                        key={actIndex}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border transition-all",
                          activity.completed ? "bg-green-50 border-green-200" : "bg-muted/30 border-border",
                        )}
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-white",
                            getActivityColor(activity.type),
                          )}
                        >
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm">{activity.topic}</h4>
                            {activity.completed && <CheckCircle className="w-4 h-4 text-green-600" />}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{activity.subject}</span>
                            <span>•</span>
                            <span>{activity.duration}</span>
                            <span>•</span>
                            <span className="capitalize">{activity.type.replace("-", " ")}</span>
                          </div>
                        </div>
                        {!activity.completed && (
                          <Button size="sm" variant="outline">
                            Start
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Study Plan Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">This Week's Plan</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-sm text-muted-foreground">Full Tests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4</div>
                  <div className="text-sm text-muted-foreground">Review Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-sm text-muted-foreground">Practice Sets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2</div>
                  <div className="text-sm text-muted-foreground">New Content</div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
