import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function FitAthlete() {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="https://plus.unsplash.com/premium_photo-1672046218112-30a20c735686?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zml0fGVufDB8fDB8fHww?height=1000&width=1000"
            alt="FitAthlete"
            width={1000}
            height={200}
            className="w-full h-64 object-cover object-[30%_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-yellow-500/80 flex items-center p-8">
            <div className="text-white">
              <h1 className="text-4xl font-bold">FitAthlete</h1>
              <p className="text-xl">Personalized training plans to unleash your potential</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="plans">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="plans">Training Plans</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Beginner Runner</h3>
                  <p className="text-gray-500 mb-4">Perfect for those new to running</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>8-week progressive plan</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>3 workouts per week</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Build to 5K distance</span>
                    </li>
                  </ul>
                  <Button className="w-full">Start Plan</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Intermediate Strength</h3>
                  <p className="text-gray-500 mb-4">Build muscle and improve strength</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>12-week program</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>4 workouts per week</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Progressive overload focus</span>
                    </li>
                  </ul>
                  <Button className="w-full">Start Plan</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Advanced HIIT</h3>
                  <p className="text-gray-500 mb-4">High intensity interval training</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>6-week intense program</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>5 workouts per week</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>Cardio and strength combined</span>
                    </li>
                  </ul>
                  <Button className="w-full">Start Plan</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Flexibility & Mobility</h3>
                  <p className="text-gray-500 mb-4">Improve range of motion and recovery</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>Ongoing program</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>Daily 15-minute sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>Full-body focus</span>
                    </li>
                  </ul>
                  <Button className="w-full">Start Plan</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Current Plan: Intermediate Runner</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Overall Progress</span>
                        <span>35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Week 4 of 10</span>
                        <span>40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>

                    <div className="pt-4">
                      <h4 className="font-medium mb-2">This Week's Workouts</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="border rounded p-2 text-center">
                          <div className="text-green-500 font-bold">✓</div>
                          <div className="text-xs">Mon</div>
                        </div>
                        <div className="border rounded p-2 text-center">
                          <div className="text-green-500 font-bold">✓</div>
                          <div className="text-xs">Wed</div>
                        </div>
                        <div className="border rounded p-2 text-center">
                          <div className="text-gray-300">-</div>
                          <div className="text-xs">Fri</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">+15%</div>
                      <div className="text-sm text-gray-500">Speed Improvement</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">+25%</div>
                      <div className="text-sm text-gray-500">Endurance</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">+10%</div>
                      <div className="text-sm text-gray-500">Strength</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                    <Image src="https://static.vecteezy.com/system/resources/previews/021/649/791/non_2x/early-bird-icon-vector.jpg?height=32&width=32" alt="Achievement" width={70} height={70} />
                  </div>
                  <h3 className="font-bold mb-1">Early Bird</h3>
                  <p className="text-sm text-gray-500">Complete 5 workouts before 7am</p>
                  <div className="mt-2 text-xs font-medium text-green-600">Completed</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <Image src="https://thumbs.dreamstime.com/b/logo-design-k-fun-run-event-vector-293379512.jpg?height=32&width=32" alt="Achievement" width={70} height={70} />
                  </div>
                  <h3 className="font-bold mb-1">5K Master</h3>
                  <p className="text-sm text-gray-500">Run 5K in under 25 minutes</p>
                  <div className="mt-2 text-xs font-medium text-green-600">Completed</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Image src="https://img.freepik.com/premium-vector/vector-vitality-workout-icon-design-iron-will-dumbbell-man-vector-emblem_706143-39057.jpg?height=32&width=32" alt="Achievement" width={70} height={70} />
                  </div>
                  <h3 className="font-bold mb-1">Iron Will</h3>
                  <p className="text-sm text-gray-500">Complete 30 consecutive days of training</p>
                  <div className="mt-2 text-xs font-medium text-gray-500">In Progress (22/30)</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      
    </div>
  )
}

