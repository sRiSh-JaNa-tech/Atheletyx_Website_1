"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Search, Dumbbell, Clock, BarChart3, Heart } from "lucide-react"

// API key should be stored in environment variables in a real application
const API_KEY = "AIzaSyBnQVg1wbEksrbVwMkAbTOjf-ejngnPgcw"

interface Exercise {
  id: number
  name: string
  description: string
  muscleGroups: string[]
  difficulty: string
  duration: string
  calories: string
  equipment: string[]
  steps: string[]
  image: string
}

// Sample exercises data for fallback
const sampleExercises: Exercise[] = [
  {
    id: 1,
    name: "Push-ups",
    description: "A classic bodyweight exercise that targets the chest, shoulders, and triceps.",
    muscleGroups: ["Chest", "Shoulders", "Triceps"],
    difficulty: "Beginner",
    duration: "10-15 minutes",
    calories: "100-150 calories",
    equipment: ["None"],
    steps: [
      "Start in a plank position with hands slightly wider than shoulder-width apart",
      "Lower your body until your chest nearly touches the floor",
      "Push yourself back up to the starting position",
      "Repeat for desired number of repetitions",
    ],
    image: "push-up",
  },
  {
    id: 2,
    name: "Squats",
    description: "A fundamental lower body exercise that targets the quadriceps, hamstrings, and glutes.",
    muscleGroups: ["Quadriceps", "Hamstrings", "Glutes"],
    difficulty: "Beginner",
    duration: "10-15 minutes",
    calories: "150-200 calories",
    equipment: ["None"],
    steps: [
      "Stand with feet shoulder-width apart",
      "Lower your body by bending your knees and pushing your hips back",
      "Keep your chest up and back straight",
      "Lower until thighs are parallel to the ground",
      "Push through your heels to return to standing position",
    ],
    image: "squat",
  },
  {
    id: 3,
    name: "Plank",
    description: "An isometric core exercise that strengthens the abdominals, back, and shoulders.",
    muscleGroups: ["Core", "Shoulders", "Back"],
    difficulty: "Beginner",
    duration: "5-10 minutes",
    calories: "50-100 calories",
    equipment: ["None"],
    steps: [
      "Start in a forearm plank position with elbows directly beneath shoulders",
      "Keep your body in a straight line from head to heels",
      "Engage your core and glutes",
      "Hold the position for the desired time",
    ],
    image: "plank",
  },
]

export default function Exercises() {
  const [activityType, setActivityType] = useState("")
  const [specificActivity, setSpecificActivity] = useState("")
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!activityType || !specificActivity) {
      setError("Please select an activity type and specific activity")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // No need to check for API key since we're hardcoding it

      // Dynamically import the Google Generative AI package
      const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = await import("@google/generative-ai")

      // Build the prompt
      const fullPrompt = `Generate 5 exercise recommendations for ${activityType} focused on ${specificActivity}. ${prompt ? prompt : ""}
      
      Format the response as a JSON array with the following structure for each exercise:
      {
        "name": "Exercise Name",
        "description": "Brief description",
        "muscleGroups": ["Primary muscle", "Secondary muscle"],
        "difficulty": "Beginner/Intermediate/Advanced",
        "duration": "Estimated time",
        "calories": "Estimated calories burned",
        "equipment": ["Required equipment"],
        "steps": ["Step 1", "Step 2", "Step 3"],
        "image": "brief description of what the exercise looks like for image generation"
      }
      
      Only return the JSON array, nothing else.`

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(API_KEY)
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      })

      // Generate content
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      })
      const response = await result.response
      const text = response.text()

      // Parse the JSON response
      try {
        // Find JSON in the response (in case there's any extra text)
        const jsonMatch = text.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const parsedExercises = JSON.parse(jsonMatch[0]) as Exercise[]

          // Clean up markdown symbols from the exercise descriptions and steps
          const cleanedExercises = parsedExercises.map((exercise) => ({
            ...exercise,
            description: exercise.description.replace(/\*\*/g, "").replace(/\*/g, ""),
            steps: exercise.steps.map((step) => step.replace(/\*\*/g, "").replace(/\*/g, "")),
          }))

          const exercisesWithIds = cleanedExercises.map((exercise, index) => ({
            ...exercise,
            id: index + 1,
          }))

          setExercises(exercisesWithIds)
        } else {
          throw new Error("Could not find valid JSON in the response")
        }
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError)
        setError("Failed to parse exercise data. Please try again.")
      }
    } catch (err) {
      console.error(err)

      // If there's an error with the AI, use sample data instead
      if (err instanceof Error && (err.message.includes("Failed to load") || err.message.includes("API key"))) {
        setError("Unable to connect to AI service. Showing sample exercises instead.")

        // Filter sample exercises based on activity type
        const filteredExercises = sampleExercises.map((exercise, index) => ({
          ...exercise,
          id: index + 1,
        }))

        setExercises(filteredExercises)
      } else {
        setError(`Error: ${err instanceof Error ? err.message : "Unknown error occurred"}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const activityTypes = ["Cardio", "Strength Training", "Flexibility", "Balance", "HIIT", "Sport-Specific"]

  const specificActivities: Record<string, string[]> = {
    Cardio: ["Running", "Swimming", "Cycling", "Rowing", "Jumping Rope"],
    "Strength Training": ["Upper Body", "Lower Body", "Core", "Full Body", "Functional"],
    Flexibility: ["Yoga", "Stretching", "Pilates", "Mobility"],
    Balance: ["Stability", "Coordination", "Proprioception"],
    HIIT: ["Tabata", "Circuit Training", "CrossFit", "Interval Training"],
    "Sport-Specific": ["Basketball", "Soccer", "Tennis", "Golf", "Swimming"],
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Exercise Generator</h1>
          <p className="text-gray-500">Get personalized exercise recommendations based on your preferences</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="activity-type">Activity Type</Label>
                  <Select
                    value={activityType}
                    onValueChange={(value) => {
                      setActivityType(value)
                      setSpecificActivity("")
                    }}
                  >
                    <SelectTrigger id="activity-type">
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specific-activity">Specific Activity</Label>
                  <Select value={specificActivity} onValueChange={setSpecificActivity} disabled={!activityType}>
                    <SelectTrigger id="specific-activity">
                      <SelectValue
                        placeholder={activityType ? "Select specific activity" : "Select activity type first"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {activityType &&
                        specificActivities[activityType]?.map((activity) => (
                          <SelectItem key={activity} value={activity}>
                            {activity}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-requirements">Additional Requirements (Optional)</Label>
                <Textarea
                  id="additional-requirements"
                  placeholder="E.g., beginner-friendly, no equipment, focus on endurance, etc."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              {error && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}

              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Exercises...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Generate Exercises
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {exercises.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Recommended Exercises</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise) => (
                <Card key={exercise.id} className="overflow-hidden">
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={`/placeholder.svg?height=300&width=500&text=${encodeURIComponent(exercise.name)}`}
                      alt={exercise.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{exercise.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{exercise.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {exercise.muscleGroups.map((muscle, index) => (
                        <span
                          key={index}
                          className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2 text-indigo-600" />
                        <span className="text-sm">{exercise.difficulty}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                        <span className="text-sm">{exercise.duration}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Equipment Needed:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {exercise.equipment.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Steps:</h4>
                      <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                        {exercise.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center text-sm">
                        <Dumbbell className="w-4 h-4 mr-1 text-red-500" />
                        <span>{exercise.calories}</span>
                      </div>

                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>Save</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

