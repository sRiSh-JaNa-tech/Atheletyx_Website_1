import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import Link from "next/link"

export default function FinancialSolutions() {
  // Sample data for charts
  const investmentData = [
    { name: "Stocks", value: 45 },
    { name: "Bonds", value: 25 },
    { name: "Real Estate", value: 20 },
    { name: "Cash", value: 10 },
  ]

  const growthData = [
    { month: "Jan", amount: 1000 },
    { month: "Feb", amount: 1200 },
    { month: "Mar", amount: 1100 },
    { month: "Apr", amount: 1400 },
    { month: "May", amount: 1600 },
    { month: "Jun", amount: 1800 },
    { month: "Jul", amount: 2000 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="https://staticlearn.shine.com/l/m/images/blog/mobile/emerging_technologies_in_finance.webp?height=300&width=1000"
            alt="Financial Solutions"
            width={1000}
            height={300}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/40 flex items-center p-8 shadow-lg">
            <div className="text-white">
              <h1 className="text-4xl font-bold">Financial Solutions</h1>
              <p className="text-xl">Secure your future with smart money management</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Your Financial Health</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Savings Goal</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Investment Growth</span>
                        <span>42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Retirement Readiness</span>
                        <span>28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Portfolio Allocation</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={investmentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {investmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Investment Growth</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Mutual Funds</h3>
                  <p className="text-gray-500 mb-4">Long-term growth with diversified investments</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Diversified portfolio</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Professional management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Lower risk through diversification</span>
                    </li>
                  </ul>
                  <Link href="/financial-solutions/mutual-funds" className="w-full">
                    <Button className="w-full">Explore Funds</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Retirement Planning</h3>
                  <p className="text-gray-500 mb-4">Secure your future with strategic investments</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Tax-advantaged accounts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Long-term growth strategies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Personalized retirement calculator</span>
                    </li>
                  </ul>
                  <Link href="/financial-solutions/retirement-planning" className="w-full">
                    <Button className="w-full">Plan Retirement</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="planning" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Financial Planning Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="w-30 h-30 mx-auto mb-2 flex items-center justify-center">
                      <Image src="https://img.freepik.com/free-vector/budgeting-concept-idea-financial-planning-wellbeing-currency-balance-income-money-allocation-isolated-flat-illustration-vector_613284-1084.jpg?height=48&width=48" alt="Budget" width={48} height={48} />
                    </div>
                    <h4 className="font-bold">Budget Planner</h4>
                    <p className="text-sm text-gray-500">Track income and expenses</p>
                    <Button variant="outline" className="w-full mt-2">
                      Open
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 text-center">
                    <div className="w-35 h-35 mx-auto mb-2 flex items-center justify-center">
                      <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQubyePTyvJJEOkcJTNh5AOC-V7c-mUjJdoIA&s?height=48&width=48" alt="Goals" width={48} height={48} />
                    </div>
                    <h4 className="font-bold">Goal Setting</h4>
                    <p className="text-sm text-gray-500">Define and track financial goals</p>
                    <Button variant="outline" className="w-full mt-2">
                      Open
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 text-center">
                    <div className="w-30 h-30 mx-auto mb-2 flex items-center justify-center">
                      <Image src="https://cdn-jknal.nitrocdn.com/AtIdgtocmTDmUEXkGkosAKfzlDlAzMGc/assets/images/optimized/rev-3f5f55e/www.julyservices.com/wp-content/uploads/advisor-connect.jpg?height=48&width=48" alt="Advisor" width={48} height={48} />
                    </div>
                    <h4 className="font-bold">Advisor Connect</h4>
                    <p className="text-sm text-gray-500">Speak with a financial advisor</p>
                    <Button variant="outline" className="w-full mt-2">
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Financial Education</h3>
                  <div className="space-y-4">
                    <div className="border-b pb-2">
                      <h4 className="font-medium">Investment Basics</h4>
                      <p className="text-sm text-gray-500">Learn the fundamentals of investing</p>
                      <Button variant="link" className="p-0 h-auto">
                        Read More
                      </Button>
                    </div>

                    <div className="border-b pb-2">
                      <h4 className="font-medium">Retirement Strategies</h4>
                      <p className="text-sm text-gray-500">Plan for a secure retirement</p>
                      <Button variant="link" className="p-0 h-auto">
                        Read More
                      </Button>
                    </div>

                    <div className="border-b pb-2">
                      <h4 className="font-medium">Tax Optimization</h4>
                      <p className="text-sm text-gray-500">Minimize taxes on your investments</p>
                      <Button variant="link" className="p-0 h-auto">
                        Read More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Upcoming Webinars</h3>
                  <div className="space-y-4">
                    <div className="border-b pb-2">
                      <h4 className="font-medium">Market Outlook 2023</h4>
                      <p className="text-sm text-gray-500">June 15, 2023 | 2:00 PM EST</p>
                      <Button variant="outline" className="mt-2">
                        Register
                      </Button>
                    </div>

                    <div className="border-b pb-2">
                      <h4 className="font-medium">Investing for Beginners</h4>
                      <p className="text-sm text-gray-500">June 22, 2023 | 1:00 PM EST</p>
                      <Button variant="outline" className="mt-2">
                        Register
                      </Button>
                    </div>

                    <div className="border-b pb-2">
                      <h4 className="font-medium">Retirement Planning Workshop</h4>
                      <p className="text-sm text-gray-500">June 29, 2023 | 3:00 PM EST</p>
                      <Button variant="outline" className="mt-2">
                        Register
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

