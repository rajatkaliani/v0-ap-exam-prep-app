"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Star,
  MessageCircle,
  Calendar,
  Clock,
  DollarSign,
  Video,
  Award,
  BookOpen,
  Globe,
  CheckCircle,
} from "lucide-react"

interface Tutor {
  id: number
  name: string
  avatar: string
  subjects: string[]
  rating: number
  reviewCount: number
  hourlyRate: number
  experience: string
  bio: string
  availability: string
  isOnline: boolean
  responseTime: string
  languages: string[]
  education: string
  specialties: string[]
}

interface TutorProfileProps {
  tutor: Tutor
  onBack: () => void
}

const reviews = [
  {
    id: 1,
    student: "Alex M.",
    rating: 5,
    date: "2 weeks ago",
    comment: "Amazing tutor! Helped me go from a 3 to a 5 on AP Physics. Very patient and explains concepts clearly.",
    subject: "Physics 1",
  },
  {
    id: 2,
    student: "Sarah L.",
    rating: 5,
    date: "1 month ago",
    comment: "Dr. Chen is incredible. Her teaching methods are so effective and she really cares about her students.",
    subject: "Physics 2",
  },
  {
    id: 3,
    student: "Mike R.",
    rating: 4,
    date: "2 months ago",
    comment: "Great tutor with deep knowledge. Sometimes moves a bit fast but overall very helpful.",
    subject: "Physics 1",
  },
]

const availableSlots = [
  { day: "Today", time: "3:00 PM", available: true },
  { day: "Today", time: "5:00 PM", available: true },
  { day: "Tomorrow", time: "10:00 AM", available: true },
  { day: "Tomorrow", time: "2:00 PM", available: false },
  { day: "Tomorrow", time: "4:00 PM", available: true },
]

export function TutorProfile({ tutor, onBack }: TutorProfileProps) {
  const [selectedTab, setSelectedTab] = useState<"about" | "reviews" | "schedule">("about")
  const [message, setMessage] = useState("")
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border/50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Tutor Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} />
                <AvatarFallback className="text-xl">
                  {tutor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {tutor.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-2xl font-bold">{tutor.name}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">{tutor.rating}</span>
                      <span className="text-muted-foreground">({tutor.reviewCount} reviews)</span>
                    </div>
                    <Badge variant="secondary">{tutor.experience}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${tutor.hourlyRate}/hr</div>
                  <div className="text-sm text-muted-foreground">{tutor.availability}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {tutor.subjects.map((subject) => (
                  <Badge key={subject} className="bg-primary/10 text-primary hover:bg-primary/20">
                    {subject}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Responds {tutor.responseTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span>{tutor.languages.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span>{tutor.education}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-muted-foreground" />
                  <span>Video Sessions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button className="flex-1">
              <MessageCircle className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Session
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Video className="w-4 h-4 mr-2" />
              Instant Session
            </Button>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="flex bg-muted rounded-lg p-1">
          {[
            { id: "about", label: "About" },
            { id: "reviews", label: "Reviews" },
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
        {selectedTab === "about" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">About {tutor.name}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{tutor.bio}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Specialties
                  </h4>
                  <div className="space-y-2">
                    {tutor.specialties.map((specialty) => (
                      <div key={specialty} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Teaching Approach</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Personalized learning plans</li>
                    <li>• Interactive problem-solving</li>
                    <li>• Regular progress assessments</li>
                    <li>• Exam preparation strategies</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Send a Message</h3>
              <div className="space-y-4">
                <Textarea
                  placeholder="Hi! I'm interested in getting help with AP Physics. When would be a good time to schedule our first session?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
                <Button>Send Message</Button>
              </div>
            </Card>
          </div>
        )}

        {selectedTab === "reviews" && (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{review.student}</span>
                      <Badge variant="outline" className="text-xs">
                        {review.subject}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === "schedule" && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
            <div className="grid gap-3">
              {availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    slot.available
                      ? selectedSlot === `${slot.day}-${slot.time}`
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                      : "border-muted bg-muted/50 cursor-not-allowed opacity-50"
                  }`}
                  onClick={() => slot.available && setSelectedSlot(`${slot.day}-${slot.time}`)}
                >
                  <div>
                    <div className="font-medium">{slot.day}</div>
                    <div className="text-sm text-muted-foreground">{slot.time}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>${tutor.hourlyRate}</span>
                  </div>
                </div>
              ))}
            </div>
            {selectedSlot && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <h4 className="font-semibold mb-2">Session Details</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  You've selected {selectedSlot.replace("-", " at ")} for a 1-hour session with {tutor.name}.
                </p>
                <Button className="w-full">Book Session - ${tutor.hourlyRate}</Button>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
