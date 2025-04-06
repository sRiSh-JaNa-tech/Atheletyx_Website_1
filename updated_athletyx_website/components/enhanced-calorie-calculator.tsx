"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Activity, Flame, Scale, Utensils, ArrowRight } from "lucide-react"

interface CalorieData {
  bmr: number
  tdee: number
  exerciseCalories: number
  walkingCalories: number
  weightLossCalories: number
  maintenanceCalories: number
  weightGainCalories: number
}

export default function EnhancedCalorieCalculator() {
  // Form state
  const [age, setAge] = useState<number | "">("")
  const [gender, setGender] = useState<string>("")
  const [weight, setWeight] = useState<number | "">("")
  const [height, setHeight] = useState<number | "">("")
  const [activityLevel, setActivityLevel] = useState<string>("")
  const [exerciseTime, setExerciseTime] = useState<number | "">("")
  const [exerciseType, setExerciseType] = useState<string>("")
  const [distanceWalked, setDistanceWalked] = useState<number | "">("")
  const [steps, setSteps] = useState<number | "">("")
  const [measurementUnit, setMeasurementUnit] = useState<string>("metric")
  const [trackingMethod, setTrackingMethod] = useState<string>("distance")

  // Results state
  const [calorieData, setCalorieData] = useState<CalorieData | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [calculationHistory, setCalculationHistory] = useState<Array<{ date: string; calories: number }>>([])

  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  }

  // Exercise MET values (Metabolic Equivalent of Task)
  const exerciseMETs: Record<string, number> = {
    walking: 3.5,
    running: 8.0,
    cycling: 7.5,
    swimming: 6.0,
    hiit: 8.5,
    weightLifting: 5.0,
    yoga: 3.0,
    basketball: 6.5,
    soccer: 7.0,
    tennis: 7.0,
  }

  const calculateCalories = () => {
    if (!age || !gender || !weight || !height || !activityLevel) {
      alert("Please fill in all required fields")
      return
    }

    // Convert measurements if using imperial
    const weightKg = measurementUnit === "imperial" ? Number(weight) * 0.453592 : Number(weight)
    const heightCm = measurementUnit === "imperial" ? Number(height) * 2.54 : Number(height)

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * Number(age) + 5
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * Number(age) - 161
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityMultiplier = activityMultipliers[activityLevel as keyof typeof activityMultipliers]
    const tdee = bmr * activityMultiplier

    // Calculate calories burned during exercise
    let exerciseCalories = 0
    if (exerciseTime && exerciseType) {
      const met = exerciseMETs[exerciseType]
      exerciseCalories = met * weightKg * (Number(exerciseTime) / 60)
    }

    // Calculate calories burned from walking/steps
    let walkingCalories = 0
    if (trackingMethod === "distance" && distanceWalked) {
      // Distance in kilometers
      const distanceKm = measurementUnit === "imperial" ? Number(distanceWalked) * 1.60934 : Number(distanceWalked)
      walkingCalories = 0.035 * weightKg * distanceKm * 60
    } else if (trackingMethod === "steps" && steps) {
      // Approximate calories burned per step
      walkingCalories = (Number(steps) * 0.04 * weightKg) / 60
    }

    // Calculate recommended calorie intakes
    const weightLossCalories = Math.max(1200, Math.round(tdee * 0.8))
    const maintenanceCalories = Math.round(tdee)
    const weightGainCalories = Math.round(tdee * 1.15)

    // Set calorie data
    const newCalorieData: CalorieData = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      exerciseCalories: Math.round(exerciseCalories),
      walkingCalories: Math.round(walkingCalories),
      weightLossCalories,
      maintenanceCalories,
      weightGainCalories,
    }

    setCalorieData(newCalorieData)
    setShowResults(true)

    // Add to history
    const today = new Date().toLocaleDateString()
    setCalculationHistory((prev) => [
      { date: today, calories: newCalorieData.maintenanceCalories },
      ...prev.slice(0, 6), // Keep only the last 7 entries
    ])
  }

  const resetForm = () => {
    setAge("")
    setGender("")
    setWeight("")
    setHeight("")
    setActivityLevel("")
    setExerciseTime("")
    setExerciseType("")
    setDistanceWalked("")
    setSteps("")
    setShowResults(false)
  }

  // Data for the macronutrient distribution chart
  const macroData = [
    { name: "Protein", value: 30 },
    { name: "Carbs", value: 45 },
    { name: "Fat", value: 25 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  // Data for calorie comparison chart
  const calorieComparisonData = calorieData
    ? [
        { name: "BMR", calories: calorieData.bmr },
        { name: "TDEE", calories: calorieData.tdee },
        { name: "Weight Loss", calories: calorieData.weightLossCalories },
        { name: "Maintenance", calories: calorieData.maintenanceCalories },
        { name: "Weight Gain", calories: calorieData.weightGainCalories },
      ]
    : []

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="https://t4.ftcdn.net/jpg/04/35/21/27/360_F_435212700_7vEpXPO3dDWyKtgssu1IoHYTzUxEilDf.jpg?height=300&width=1000"
            alt="Enhanced Calorie Calculator"
            width={1000}
            height={300}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/40 to-blue-500/60 flex items-center p-8">
            <div className="text-white">
              <h1 className="text-4xl font-bold">Enhanced Calorie Calculator</h1>
              <p className="text-xl">Track your nutrition, exercise, and daily activity for optimal fitness</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue={showResults ? "results" : "calculate"}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="calculate" onClick={() => setShowResults(false)}>
              Calculate
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!calorieData}>
              Results
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="calculate" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                    <Select value={measurementUnit} onValueChange={setMeasurementUnit}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metric (kg/cm)</SelectItem>
                        <SelectItem value="imperial">Imperial (lb/in)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Years"
                        value={age}
                        onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight ({measurementUnit === "metric" ? "kg" : "lb"})</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder={measurementUnit === "metric" ? "kg" : "lb"}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height ({measurementUnit === "metric" ? "cm" : "in"})</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder={measurementUnit === "metric" ? "cm" : "in"}
                        value={height}
                        onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activity">Activity Level</Label>
                    <Select value={activityLevel} onValueChange={setActivityLevel}>
                      <SelectTrigger id="activity">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                        <SelectItem value="light">Lightly Active (light exercise 1-3 days/week)</SelectItem>
                        <SelectItem value="moderate">Moderately Active (moderate exercise 3-5 days/week)</SelectItem>
                        <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                        <SelectItem value="veryActive">Very Active (very hard exercise & physical job)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t">
                    <h2 className="text-2xl font-bold mb-4">Exercise Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="exercise-time">Exercise Time (minutes)</Label>
                        <Input
                          id="exercise-time"
                          type="number"
                          placeholder="Minutes"
                          value={exerciseTime}
                          onChange={(e) => setExerciseTime(e.target.value ? Number(e.target.value) : "")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="exercise-type">Exercise Type</Label>
                        <Select value={exerciseType} onValueChange={setExerciseType}>
                          <SelectTrigger id="exercise-type">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="walking">Walking</SelectItem>
                            <SelectItem value="running">Running</SelectItem>
                            <SelectItem value="cycling">Cycling</SelectItem>
                            <SelectItem value="swimming">Swimming</SelectItem>
                            <SelectItem value="hiit">HIIT</SelectItem>
                            <SelectItem value="weightLifting">Weight Lifting</SelectItem>
                            <SelectItem value="yoga">Yoga</SelectItem>
                            <SelectItem value="basketball">Basketball</SelectItem>
                            <SelectItem value="soccer">Soccer</SelectItem>
                            <SelectItem value="tennis">Tennis</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h2 className="text-2xl font-bold mb-4">Daily Activity</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="tracking-method">Tracking Method:</Label>
                        <Select value={trackingMethod} onValueChange={setTrackingMethod}>
                          <SelectTrigger id="tracking-method" className="w-[180px]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="distance">Distance Walked</SelectItem>
                            <SelectItem value="steps">Steps</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {trackingMethod === "distance" ? (
                        <div className="space-y-2">
                          <Label htmlFor="distance-walked">
                            Distance Walked ({measurementUnit === "metric" ? "km" : "miles"})
                          </Label>
                          <Input
                            id="distance-walked"
                            type="number"
                            placeholder={measurementUnit === "metric" ? "km" : "miles"}
                            value={distanceWalked}
                            onChange={(e) => setDistanceWalked(e.target.value ? Number(e.target.value) : "")}
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor="steps">Steps</Label>
                          <Input
                            id="steps"
                            type="number"
                            placeholder="Number of steps"
                            value={steps}
                            onChange={(e) => setSteps(e.target.value ? Number(e.target.value) : "")}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={calculateCalories}>
                      Calculate
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={resetForm}>
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            {calorieData && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Calorie Summary</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                          <Flame className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Basal Metabolic Rate (BMR)</p>
                          <p className="text-2xl font-bold">{calorieData.bmr} calories</p>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 flex items-center">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                          <Activity className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Daily Energy Expenditure</p>
                          <p className="text-2xl font-bold">{calorieData.tdee} calories</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Weight Loss</p>
                        <p className="text-xl font-bold">{calorieData.weightLossCalories} calories</p>
                        <p className="text-xs text-gray-500 mt-1">Calorie deficit for weight loss</p>
                      </div>

                      <div className="border rounded-lg p-4 bg-blue-50">
                        <p className="text-sm text-gray-500">Maintenance</p>
                        <p className="text-xl font-bold">{calorieData.maintenanceCalories} calories</p>
                        <p className="text-xs text-gray-500 mt-1">To maintain current weight</p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Weight Gain</p>
                        <p className="text-xl font-bold">{calorieData.weightGainCalories} calories</p>
                        <p className="text-xs text-gray-500 mt-1">Calorie surplus for weight gain</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-bold mb-2">Exercise Calories</h3>
                        <div className="flex items-center">
                          <div className="bg-indigo-100 p-2 rounded-full mr-3">
                            <Activity className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-xl font-bold">{calorieData.exerciseCalories} calories</p>
                            <p className="text-xs text-gray-500">Burned during exercise</p>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-bold mb-2">Walking/Steps Calories</h3>
                        <div className="flex items-center">
                          <div className="bg-orange-100 p-2 rounded-full mr-3">
                            <Activity className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-xl font-bold">{calorieData.walkingCalories} calories</p>
                            <p className="text-xs text-gray-500">Burned from walking/steps</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-bold mb-4">Calorie Comparison</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={calorieComparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="calories" fill="#8884d8" name="Calories" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Nutrition Breakdown</h2>

                    <div className="mb-6">
                      <h3 className="font-bold mb-2">Recommended Macronutrients</h3>
                      <p className="text-sm text-gray-500 mb-4">Based on maintenance calories</p>

                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={macroData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {macroData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="border-t pt-4">
                        <h3 className="font-bold mb-4">Daily Macronutrient Targets</h3>

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Protein</span>
                              <span>{Math.round((calorieData.maintenanceCalories * 0.3) / 4)}g</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Carbohydrates</span>
                              <span>{Math.round((calorieData.maintenanceCalories * 0.45) / 4)}g</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Fat</span>
                              <span>{Math.round((calorieData.maintenanceCalories * 0.25) / 9)}g</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="font-bold mb-2">Water Intake</h3>
                        <p className="text-xl font-bold">
                          {Math.round(Number(weight) * (measurementUnit === "metric" ? 0.033 : 0.015))} liters
                        </p>
                        <p className="text-xs text-gray-500">Recommended daily water intake</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Calculation History</h2>

                {calculationHistory.length > 0 ? (
                  <div className="space-y-4">
                    {calculationHistory.map((entry, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <div className="flex justify-between">
                          <span className="font-medium">{entry.date}</span>
                          <span className="font-bold">{entry.calories} calories</span>
                        </div>
                        <p className="text-sm text-gray-500">Maintenance calories</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Scale className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No calculation history yet</p>
                    <p className="text-sm mt-1">Your calculations will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <section>
          <h2 className="text-2xl font-bold mb-6">Calorie Tracking Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold mb-2">Weight Management</h3>
                <p className="text-sm text-gray-500">
                  Track your calorie intake and expenditure to manage your weight effectively and reach your goals
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold mb-2">Performance Optimization</h3>
                <p className="text-sm text-gray-500">
                  Ensure you're fueling your body properly for optimal athletic performance and recovery
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold mb-2">Nutritional Awareness</h3>
                <p className="text-sm text-gray-500">
                  Develop a better understanding of your nutritional needs and eating habits
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">How to Use Your Results</h2>

            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold">Understand Your Baseline</h3>
                  <p className="text-gray-600">
                    Your BMR (Basal Metabolic Rate) is the number of calories your body needs at rest. Your TDEE (Total
                    Daily Energy Expenditure) includes your activity level. These numbers form your caloric baseline.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-green-600">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold">Set Your Goals</h3>
                  <p className="text-gray-600">
                    For weight loss, aim for the weight loss calorie target. For maintenance, follow the maintenance
                    calories. For muscle gain, use the weight gain calories along with proper strength training.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-purple-600">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold">Track Your Intake</h3>
                  <p className="text-gray-600">
                    Use a food diary or app to track your daily calorie intake. Aim to hit your macronutrient targets
                    for optimal nutrition and performance.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-orange-600">4</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold">Adjust as Needed</h3>
                  <p className="text-gray-600">
                    Monitor your progress and adjust your calorie targets as your weight, activity level, or goals
                    change. Recalculate every few weeks for best results.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold">Remember</h3>
                  <p className="text-sm text-gray-600">
                    These calculations provide estimates based on formulas and averages. Individual metabolism can vary.
                    For personalized nutrition advice, consult with a registered dietitian or nutritionist.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

