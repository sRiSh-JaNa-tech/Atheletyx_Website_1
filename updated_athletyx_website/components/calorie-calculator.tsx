import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CalorieCalculator() {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="https://t3.ftcdn.net/jpg/04/44/26/52/360_F_444265238_2Trl35YochoIznHyqeNvA651xs6mzArm.jpg?height=300&width=1000"
            alt="Calorie Calculator"
            width={1000}
            height={300}
            className="w-full h-64 object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-gray-600/40 to-gray-700/60 flex items-center p-8 shadow-md">
            <div className="text-white">
              <h1 className="text-4xl font-bold">Calorie Calculator</h1>
              <p className="text-xl">Track your nutrition and workout calories</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="calculate">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="calculate">Calculate</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="calculate" className="mt-6">
            <div className="max-w-md mx-auto border rounded-lg p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="Years" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input id="weight" type="number" placeholder="kg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" type="number" placeholder="cm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity">Activity Level</Label>
                  <Select>
                    <SelectTrigger id="activity">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Lightly Active</SelectItem>
                      <SelectItem value="moderate">Moderately Active</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="very-active">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-gray-900 hover:bg-gray-800">Calculate</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="max-w-md mx-auto border rounded-lg p-6">
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Today</span>
                    <span className="font-bold">2,150 calories</span>
                  </div>
                  <p className="text-sm text-gray-500">Based on 45 min running</p>
                </div>

                <div className="border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Yesterday</span>
                    <span className="font-bold">1,950 calories</span>
                  </div>
                  <p className="text-sm text-gray-500">Based on 30 min swimming</p>
                </div>

                <div className="border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">May 20, 2023</span>
                    <span className="font-bold">2,300 calories</span>
                  </div>
                  <p className="text-sm text-gray-500">Based on 60 min cycling</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <section>
          <h2 className="text-2xl font-bold mb-6">Calorie Tracking Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-bold mb-2">Weight Management</h3>
              <p className="text-sm text-gray-500">
                Track your calorie intake and expenditure to manage your weight effectively
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-bold mb-2">Performance Optimization</h3>
              <p className="text-sm text-gray-500">
                Ensure you're fueling your body properly for optimal athletic performance
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-bold mb-2">Nutritional Awareness</h3>
              <p className="text-sm text-gray-500">
                Develop a better understanding of your nutritional needs and habits
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

