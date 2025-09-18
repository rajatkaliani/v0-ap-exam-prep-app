"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Target, Calendar, Flame, Clock, User, Video, Trophy } from "lucide-react"

const todayGoals = [
  { id: 1, task: "Complete 10 Physics questions", completed: 7, total: 10 },
  { id: 2, task: "Review Calculus derivatives", completed: 1, total: 1 },
  { id: 3, task: "Practice test simulation", completed: 0, total: 1 },
]

const upcomingSessions = [
  {
    id: 1,
    tutorName: "Dr. Sarah Chen",
    subject: "Physics 1",
    time: "Today, 3:00 PM",
    duration: "60 min",
    avatar: "/professional-asian-woman-teacher.jpg",
  },
  {
    id: 2,
    tutorName: "Prof. Michael Rodriguez",
    subject: "Calculus AB",
    time: "Tomorrow, 2:00 PM",
    duration: "45 min",
    avatar: "/professional-black-man-teacher.jpg",
  },
]

interface DashboardRightSidebarProps {
  className?: string
}

export function DashboardRightSidebar({ className }: DashboardRightSidebarProps) {
  const currentStreak = 12
  const nextMilestone = 15
  const streakProgress = (currentStreak / nextMilestone) * 100

  return (
    <div className={cn("hidden xl:block w-80 space-y-6", className)}>
      {/* Today's Practice Goals */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Today's Goals</h3>
        </div>
        <div className="space-y-3">
          {todayGoals.map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{goal.task}</span>
                <span className="text-muted-foreground">
                  {goal.completed}/{goal.total}
                </span>
              </div>
              <Progress value={(goal.completed / goal.total) * 100} className="h-2" />
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            {todayGoals.reduce((acc, goal) => acc + goal.completed, 0)} of{" "}
            {todayGoals.reduce((acc, goal) => acc + goal.total, 0)} tasks completed
          </p>
        </div>
      </Card>

      {/* Streak Counter */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-foreground">Study Streak</h3>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-500 mb-2">{currentStreak} 🔥</div>
          <p className="text-sm text-muted-foreground mb-3">Days in a row</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">Next milestone</span>
              <span className="text-muted-foreground">{nextMilestone} days</span>
            </div>
            <Progress value={streakProgress} className="h-2" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-1">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-xs text-muted-foreground">{nextMilestone - currentStreak} days to next reward</span>
          </div>
        </div>
      </Card>

      {/* Upcoming Tutoring Sessions */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-foreground">Upcoming Sessions</h3>
        </div>
        <div className="space-y-3">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{session.tutorName}</p>
                <p className="text-xs text-muted-foreground">{session.subject}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{session.time}</span>
                  <span>•</span>
                  <span>{session.duration}</span>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Video className="w-3 h-3 mr-1" />
                Join
              </Button>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-3 text-sm">
          View All Sessions
        </Button>
      </Card>
    </div>
  )
}
