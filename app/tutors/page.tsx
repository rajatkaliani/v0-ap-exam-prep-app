"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Star, MessageCircle, Calendar, Filter, Clock } from "lucide-react"
import { TutorProfile } from "@/components/tutor-profile"

const tutors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    avatar: "/professional-asian-woman-teacher.jpg",
    subjects: ["Physics 1", "Physics 2"],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 45,
    experience: "8 years",
    bio: "Former MIT professor specializing in AP Physics. Helped 200+ students achieve 5s on their exams.",
    availability: "Available Now",
    isOnline: true,
    responseTime: "< 1 hour",
    languages: ["English", "Mandarin"],
    education: "PhD Physics, MIT",
    specialties: ["Mechanics", "Electricity & Magnetism", "Waves"],
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "/professional-black-man-teacher.jpg",
    subjects: ["Calculus AB", "Calculus BC"],
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 38,
    experience: "5 years",
    bio: "Stanford grad with a passion for making calculus accessible. 95% of my students improve by 2+ points.",
    availability: "Available in 2 hours",
    isOnline: false,
    responseTime: "< 2 hours",
    languages: ["English", "Spanish"],
    education: "MS Mathematics, Stanford",
    specialties: ["Derivatives", "Integration", "Series"],
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    avatar: "/latina-teacher.png",
    subjects: ["Chemistry", "Biology"],
    rating: 4.9,
    reviewCount: 156,
    hourlyRate: 42,
    experience: "6 years",
    bio: "Biochemistry researcher turned educator. Expert in making complex concepts simple and memorable.",
    availability: "Available Now",
    isOnline: true,
    responseTime: "< 30 min",
    languages: ["English", "Spanish"],
    education: "PhD Biochemistry, Harvard",
    specialties: ["Organic Chemistry", "Molecular Biology", "Thermodynamics"],
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/professional-asian-teacher.png",
    subjects: ["Physics 1", "Calculus AB"],
    rating: 4.7,
    reviewCount: 73,
    hourlyRate: 35,
    experience: "4 years",
    bio: "Recent Berkeley PhD with fresh teaching methods. Specializes in visual learning and problem-solving strategies.",
    availability: "Available tomorrow",
    isOnline: false,
    responseTime: "< 4 hours",
    languages: ["English", "Korean"],
    education: "PhD Physics, UC Berkeley",
    specialties: ["Problem Solving", "Visual Learning", "Exam Prep"],
  },
]

const subjects = ["All Subjects", "Physics 1", "Physics 2", "Calculus AB", "Calculus BC", "Chemistry", "Biology"]

export default function TutorsPage() {
  const [selectedSubject, setSelectedSubject] = useState("All Subjects")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTutor, setSelectedTutor] = useState<(typeof tutors)[0] | null>(null)
  const [sortBy, setSortBy] = useState<"rating" | "price" | "availability">("rating")

  const filteredTutors = tutors
    .filter((tutor) => {
      const matchesSubject = selectedSubject === "All Subjects" || tutor.subjects.includes(selectedSubject)
      const matchesSearch =
        searchQuery === "" ||
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.subjects.some((subject) => subject.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesSubject && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "price":
          return a.hourlyRate - b.hourlyRate
        case "availability":
          return a.isOnline === b.isOnline ? 0 : a.isOnline ? -1 : 1
        default:
          return 0
      }
    })

  if (selectedTutor) {
    return <TutorProfile tutor={selectedTutor} onBack={() => setSelectedTutor(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border/50 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Find Your Perfect Tutor</h1>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tutors by name or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
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

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Button variant={sortBy === "rating" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("rating")}>
                Rating
              </Button>
              <Button variant={sortBy === "price" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("price")}>
                Price
              </Button>
              <Button
                variant={sortBy === "availability" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy("availability")}
              >
                Availability
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tutors List */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="space-y-4">
          {filteredTutors.map((tutor) => (
            <Card key={tutor.id} className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div className="flex gap-4">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} />
                    <AvatarFallback>
                      {tutor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {tutor.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{tutor.name}</h3>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{tutor.rating}</span>
                          <span className="text-sm text-muted-foreground">({tutor.reviewCount} reviews)</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {tutor.experience}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${tutor.hourlyRate}/hr</div>
                      <div className="text-sm text-muted-foreground">{tutor.availability}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {tutor.subjects.map((subject) => (
                      <Badge key={subject} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tutor.bio}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Responds {tutor.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{tutor.languages.join(", ")}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Chat
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule
                      </Button>
                      <Button size="sm" onClick={() => setSelectedTutor(tutor)}>
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTutors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">No tutors found matching your criteria</div>
            <Button variant="outline" onClick={() => setSelectedSubject("All Subjects")}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
