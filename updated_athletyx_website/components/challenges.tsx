"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Calendar, Trophy, Users, Heart, MessageSquare, Share2 } from "lucide-react"

// Sample challenge data
const sampleChallenges = [
  {
    id: 1,
    title: "30-Day Running Challenge",
    description: "Run at least 5km every day for 30 days to build endurance and consistency.",
    image: "https://t3.ftcdn.net/jpg/06/05/98/54/360_F_605985413_uDaH4RfKj3NLArsvyRQhYNMXg0IpV4go.jpg?height=300&width=500",
    category: "Running",
    difficulty: "Intermediate",
    duration: "30 days",
    participants: 245,
    creator: {
      name: "Sarah Johnson",
      avatar: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg",
    },
    likes: 128,
    comments: 32,
  },
  {
    id: 2,
    title: "100 Push-ups Challenge",
    description: "Complete 100 push-ups daily for 14 days to build upper body strength.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_1FWDITfYtob844g6Ip-NpXuKMi9iVpFYHw&s?height=300&width=500",
    category: "Strength",
    difficulty: "Advanced",
    duration: "14 days",
    participants: 189,
    creator: {
      name: "Mike Chen",
      avatar: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg?height=50&width=50",
    },
    likes: 95,
    comments: 18,
  },
  {
    id: 3,
    title: "Yoga for Flexibility",
    description: "Practice yoga for 20 minutes daily to improve flexibility and reduce stress.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzCj8u_1A2zSQ5GG9fiHeCid5wHoWTcDZHbg&s?height=300&width=500",
    category: "Yoga",
    difficulty: "Beginner",
    duration: "21 days",
    participants: 312,
    creator: {
      name: "Emma Wilson",
      avatar: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg?height=50&width=50",
    },
    likes: 156,
    comments: 47,
  },
  {
    id: 4,
    title: "Swimming Endurance",
    description: "Swim 1000m three times a week to build cardiovascular endurance.",
    image: "https://images.unsplash.com/photo-1622629797619-c100e3e67e2e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3dpbW1pbmclMjBjb21wZXRpdGlvbnxlbnwwfHwwfHx8MA%3D%3D?height=300&width=500",
    category: "Swimming",
    difficulty: "Intermediate",
    duration: "8 weeks",
    participants: 87,
    creator: {
      name: "David Park",
      avatar: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg?height=50&width=50",
    },
    likes: 64,
    comments: 12,
  },
  {
    id: 5,
    title: "HIIT Workout Challenge",
    description: "Complete 20-minute high-intensity interval training workouts 5 days a week.",
    image: "https://storage.googleapis.com/flex-web-media-prod/content/images/wp-content/uploads/2024/06/kettlebell-hiit-workout-cover.jpg?height=300&width=500",
    category: "HIIT",
    difficulty: "Advanced",
    duration: "4 weeks",
    participants: 276,
    creator: {
      name: "Alex Rodriguez",
      avatar: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg?height=50&width=50",
    },
    likes: 183,
    comments: 29,
  },
  {
    id: 6,
    title: "Cycling Distance Challenge",
    description: "Cycle 500km in one month to improve endurance and leg strength.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStiCf68bZFINrwXxMvcjmfkmOYPkXdQcfLgw&s?height=300&width=500",
    category: "Cycling",
    difficulty: "Intermediate",
    duration: "30 days",
    participants: 142,
    creator: {
      name: "Lisa Thompson",
      avatar: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg?height=50&width=50",
    },
    likes: 89,
    comments: 15,
  },
]

export default function Challenges() {
  const [challenges, setChallenges] = useState(sampleChallenges)
  const [filter, setFilter] = useState("all")
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    duration: "",
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewChallenge({ ...newChallenge, image: file })

      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateChallenge = () => {
    // In a real app, you would upload the image and send data to a server
    const newChallengeObj = {
      id: challenges.length + 1,
      title: newChallenge.title,
      description: newChallenge.description,
      image: imagePreview || "/placeholder.svg?height=300&width=500",
      category: newChallenge.category,
      difficulty: newChallenge.difficulty,
      duration: newChallenge.duration,
      participants: 0,
      creator: {
        name: "You",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      likes: 0,
      comments: 0,
    }

    setChallenges([newChallengeObj, ...challenges])

    // Reset form
    setNewChallenge({
      title: "",
      description: "",
      category: "",
      difficulty: "",
      duration: "",
      image: null,
    })
    setImagePreview(null)
  }

  const filteredChallenges =
    filter === "all" ? challenges : challenges.filter((challenge) => challenge.category.toLowerCase() === filter)

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Challenges</h1>
            <p className="text-gray-500">Join or create fitness challenges to push your limits</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Challenge
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Challenge</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Challenge Title</Label>
                  <Input
                    id="title"
                    value={newChallenge.title}
                    onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                    placeholder="e.g., 30-Day Running Challenge"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newChallenge.description}
                    onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                    placeholder="Describe your challenge and its goals"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newChallenge.category}
                      onValueChange={(value) => setNewChallenge({ ...newChallenge, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Running">Running</SelectItem>
                        <SelectItem value="Strength">Strength</SelectItem>
                        <SelectItem value="Yoga">Yoga</SelectItem>
                        <SelectItem value="Swimming">Swimming</SelectItem>
                        <SelectItem value="HIIT">HIIT</SelectItem>
                        <SelectItem value="Cycling">Cycling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={newChallenge.difficulty}
                      onValueChange={(value) => setNewChallenge({ ...newChallenge, difficulty: value })}
                    >
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={newChallenge.duration}
                    onChange={(e) => setNewChallenge({ ...newChallenge, duration: e.target.value })}
                    placeholder="e.g., 30 days, 4 weeks"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image">Challenge Image</Label>
                  <div className="flex items-center gap-4">
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                  </div>

                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full max-h-[200px] object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={handleCreateChallenge}
                    disabled={!newChallenge.title || !newChallenge.description || !newChallenge.category}
                  >
                    Create Challenge
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            All
          </Button>
          <Button
            variant={filter === "running" ? "default" : "outline"}
            onClick={() => setFilter("running")}
            className={filter === "running" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            Running
          </Button>
          <Button
            variant={filter === "strength" ? "default" : "outline"}
            onClick={() => setFilter("strength")}
            className={filter === "strength" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            Strength
          </Button>
          <Button
            variant={filter === "yoga" ? "default" : "outline"}
            onClick={() => setFilter("yoga")}
            className={filter === "yoga" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            Yoga
          </Button>
          <Button
            variant={filter === "swimming" ? "default" : "outline"}
            onClick={() => setFilter("swimming")}
            className={filter === "swimming" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            Swimming
          </Button>
          <Button
            variant={filter === "hiit" ? "default" : "outline"}
            onClick={() => setFilter("hiit")}
            className={filter === "hiit" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            HIIT
          </Button>
          <Button
            variant={filter === "cycling" ? "default" : "outline"}
            onClick={() => setFilter("cycling")}
            className={filter === "cycling" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            Cycling
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <Card key={challenge.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={typeof challenge.image === "string" ? challenge.image : "/placeholder.svg?height=300&width=500"}
                  alt={challenge.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 text-xs font-medium">
                  {challenge.category}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{challenge.description}</p>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-sm">
                    <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                    <span>{challenge.difficulty}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                    <span>{challenge.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-1 text-green-500" />
                    <span>{challenge.participants} participants</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <Image
                        src={challenge.creator.avatar || "/placeholder.svg"}
                        alt={challenge.creator.name}
                        width={32}
                        height={32}
                      />
                    </div>
                    <span className="text-sm">{challenge.creator.name}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <button className="flex items-center text-gray-500 hover:text-red-500">
                      <Heart className="w-4 h-4 mr-1" />
                      <span className="text-xs">{challenge.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-blue-500">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span className="text-xs">{challenge.comments}</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-green-500">
                      <Share2 className="w-4 h-4 mr-1" />
                    </button>
                  </div>

                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    Join
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 md:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" className="h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg">
              <Plus className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Challenge</DialogTitle>
            </DialogHeader>

            {/* Same form content as above */}
          </DialogContent>
        </Dialog>
      </div>

    </div>
  )
}

