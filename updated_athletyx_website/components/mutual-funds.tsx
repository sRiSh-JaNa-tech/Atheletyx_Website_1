"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
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
  BarChart,
  Bar,
} from "recharts"
import { ArrowUpRight, ArrowDownRight, Briefcase, Star, StarHalf, Plus, Minus } from "lucide-react"

// Sample mutual fund data
const mutualFunds = [
  {
    id: 1,
    name: "ATHLETYX Growth Fund",
    category: "Equity",
    risk: "High",
    returns: {
      oneYear: 18.5,
      threeYear: 15.2,
      fiveYear: 12.8,
      tenYear: 11.2,
    },
    aum: "80M",
    expense: 0.75,
    rating: 4.5,
    description: "A high-growth equity fund focused on companies in the sports, fitness, and wellness sectors.",
    allocation: [
      { name: "Technology", value: 35 },
      { name: "Healthcare", value: 25 },
      { name: "Consumer Discretionary", value: 20 },
      { name: "Industrials", value: 15 },
      { name: "Cash", value: 5 },
    ],
    performance: [
      { month: "Jan", return: 2.1 },
      { month: "Feb", return: 1.8 },
      { month: "Mar", return: -0.5 },
      { month: "Apr", return: 3.2 },
      { month: "May", return: 1.5 },
      { month: "Jun", return: 2.8 },
      { month: "Jul", return: 1.9 },
      { month: "Aug", return: 0.7 },
      { month: "Sep", return: -1.2 },
      { month: "Oct", return: 2.5 },
      { month: "Nov", return: 3.1 },
      { month: "Dec", return: 1.6 },
    ],
  },
  {
    id: 2,
    name: "ATHLETYX Balanced Fund",
    category: "Hybrid",
    risk: "Moderate",
    returns: {
      oneYear: 12.3,
      threeYear: 10.5,
      fiveYear: 9.2,
      tenYear: 8.7,
    },
    aum: "180M",
    expense: 0.65,
    rating: 4.0,
    description:
      "A balanced fund that invests in both equity and debt instruments to provide stable returns with moderate risk.",
    allocation: [
      { name: "Equity", value: 60 },
      { name: "Debt", value: 35 },
      { name: "Cash", value: 5 },
    ],
    performance: [
      { month: "Jan", return: 1.5 },
      { month: "Feb", return: 1.2 },
      { month: "Mar", return: -0.3 },
      { month: "Apr", return: 2.1 },
      { month: "May", return: 1.0 },
      { month: "Jun", return: 1.8 },
      { month: "Jul", return: 1.3 },
      { month: "Aug", return: 0.5 },
      { month: "Sep", return: -0.8 },
      { month: "Oct", return: 1.7 },
      { month: "Nov", return: 2.0 },
      { month: "Dec", return: 1.1 },
    ],
  },
  {
    id: 3,
    name: "ATHLETYX Income Fund",
    category: "Debt",
    risk: "Low",
    returns: {
      oneYear: 7.8,
      threeYear: 6.9,
      fiveYear: 6.5,
      tenYear: 6.2,
    },
    aum: "1.5B",
    expense: 0.45,
    rating: 4.2,
    description: "A debt fund focused on generating regular income through investments in fixed-income securities.",
    allocation: [
      { name: "Government Securities", value: 45 },
      { name: "Corporate Bonds", value: 40 },
      { name: "Money Market", value: 10 },
      { name: "Cash", value: 5 },
    ],
    performance: [
      { month: "Jan", return: 0.7 },
      { month: "Feb", return: 0.6 },
      { month: "Mar", return: 0.5 },
      { month: "Apr", return: 0.8 },
      { month: "May", return: 0.6 },
      { month: "Jun", return: 0.7 },
      { month: "Jul", return: 0.6 },
      { month: "Aug", return: 0.5 },
      { month: "Sep", return: 0.4 },
      { month: "Oct", return: 0.7 },
      { month: "Nov", return: 0.8 },
      { month: "Dec", return: 0.6 },
    ],
  },
  {
    id: 4,
    name: "ATHLETYX Index Fund",
    category: "Equity",
    risk: "Moderate",
    returns: {
      oneYear: 14.2,
      threeYear: 12.1,
      fiveYear: 10.8,
      tenYear: 9.9,
    },
    aum: "400M",
    expense: 0.15,
    rating: 4.3,
    description: "A passively managed fund that tracks a major market index to provide market-linked returns.",
    allocation: [
      { name: "Technology", value: 28 },
      { name: "Financials", value: 18 },
      { name: "Healthcare", value: 15 },
      { name: "Consumer Discretionary", value: 12 },
      { name: "Industrials", value: 10 },
      { name: "Others", value: 17 },
    ],
    performance: [
      { month: "Jan", return: 1.8 },
      { month: "Feb", return: 1.5 },
      { month: "Mar", return: -0.4 },
      { month: "Apr", return: 2.5 },
      { month: "May", return: 1.2 },
      { month: "Jun", return: 2.2 },
      { month: "Jul", return: 1.6 },
      { month: "Aug", return: 0.6 },
      { month: "Sep", return: -1.0 },
      { month: "Oct", return: 2.0 },
      { month: "Nov", return: 2.5 },
      { month: "Dec", return: 1.3 },
    ],
  },
  {
    id: 5,
    name: "ATHLETYX Small Cap Fund",
    category: "Equity",
    risk: "Very High",
    returns: {
      oneYear: 22.5,
      threeYear: 18.7,
      fiveYear: 16.2,
      tenYear: 14.5,
    },
    aum: "350M",
    expense: 0.95,
    rating: 4.1,
    description: "A high-risk, high-reward fund that invests in small-cap companies with strong growth potential.",
    allocation: [
      { name: "Technology", value: 30 },
      { name: "Healthcare", value: 20 },
      { name: "Consumer Discretionary", value: 25 },
      { name: "Industrials", value: 20 },
      { name: "Cash", value: 5 },
    ],
    performance: [
      { month: "Jan", return: 3.2 },
      { month: "Feb", return: 2.8 },
      { month: "Mar", return: -1.5 },
      { month: "Apr", return: 4.2 },
      { month: "May", return: 2.5 },
      { month: "Jun", return: 3.8 },
      { month: "Jul", return: 2.9 },
      { month: "Aug", return: 1.7 },
      { month: "Sep", return: -2.2 },
      { month: "Oct", return: 3.5 },
      { month: "Nov", return: 4.1 },
      { month: "Dec", return: 2.6 },
    ],
  },
  {
    id: 6,
    name: "ATHLETYX International Fund",
    category: "Equity",
    risk: "High",
    returns: {
      oneYear: 16.8,
      threeYear: 14.3,
      fiveYear: 12.1,
      tenYear: 10.8,
    },
    aum: "700M",
    expense: 0.85,
    rating: 3.9,
    description:
      "A fund that invests in international markets to provide geographical diversification and growth opportunities.",
    allocation: [
      { name: "North America", value: 40 },
      { name: "Europe", value: 30 },
      { name: "Asia Pacific", value: 20 },
      { name: "Emerging Markets", value: 7 },
      { name: "Cash", value: 3 },
    ],
    performance: [
      { month: "Jan", return: 2.0 },
      { month: "Feb", return: 1.7 },
      { month: "Mar", return: -0.8 },
      { month: "Apr", return: 2.9 },
      { month: "May", return: 1.4 },
      { month: "Jun", return: 2.5 },
      { month: "Jul", return: 1.8 },
      { month: "Aug", return: 0.6 },
      { month: "Sep", return: -1.5 },
      { month: "Oct", return: 2.3 },
      { month: "Nov", return: 2.8 },
      { month: "Dec", return: 1.5 },
    ],
  },
]

export default function MutualFunds() {
  const [selectedFund, setSelectedFund] = useState(mutualFunds[0])
  const [investmentAmount, setInvestmentAmount] = useState(5000)
  const [investmentPeriod, setInvestmentPeriod] = useState(5)
  const [portfolioFunds, setPortfolioFunds] = useState<{ fund: (typeof mutualFunds)[0]; allocation: number }[]>([])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  const handleAddToPortfolio = (fund: (typeof mutualFunds)[0]) => {
    // Check if fund is already in portfolio
    const existingFund = portfolioFunds.find((item) => item.fund.id === fund.id)

    if (existingFund) {
      // Update allocation if less than 100%
      if (existingFund.allocation < 100) {
        const updatedFunds = portfolioFunds.map((item) =>
          item.fund.id === fund.id ? { ...item, allocation: Math.min(item.allocation + 10, 100) } : item,
        )
        setPortfolioFunds(updatedFunds)
      }
    } else {
      // Add new fund with 10% allocation
      setPortfolioFunds([...portfolioFunds, { fund, allocation: 10 }])
    }
  }

  const handleRemoveFromPortfolio = (fundId: number) => {
    const existingFund = portfolioFunds.find((item) => item.fund.id === fundId)

    if (existingFund) {
      if (existingFund.allocation <= 10) {
        // Remove fund if allocation is 10% or less
        setPortfolioFunds(portfolioFunds.filter((item) => item.fund.id !== fundId))
      } else {
        // Decrease allocation by 10%
        const updatedFunds = portfolioFunds.map((item) =>
          item.fund.id === fundId ? { ...item, allocation: item.allocation - 10 } : item,
        )
        setPortfolioFunds(updatedFunds)
      }
    }
  }

  const totalAllocation = portfolioFunds.reduce((sum, item) => sum + item.allocation, 0)

  const calculateProjectedReturns = (fund: (typeof mutualFunds)[0]) => {
    const annualReturn = fund.returns.fiveYear / 100
    const futureValue = investmentAmount * Math.pow(1 + annualReturn, investmentPeriod)
    return futureValue.toFixed(2)
  }

  const calculatePortfolioReturns = () => {
    if (portfolioFunds.length === 0) return 0

    // Calculate weighted average return
    const weightedReturn =
      portfolioFunds.reduce((sum, item) => {
        const weight = item.allocation / totalAllocation
        return sum + item.fund.returns.fiveYear * weight
      }, 0) / 100

    const futureValue = investmentAmount * Math.pow(1 + weightedReturn, investmentPeriod)
    return futureValue.toFixed(2)
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="https://www.axisbank.com/images/default-source/progress-with-us_new/mutual-funds.jpg?height=500&width=1000"
            alt="Mutual Funds"
            width={1000}
            height={500}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 to-blue-600/40 flex items-center p-8">
            <div className="text-white">
              <h1 className="text-4xl font-bold">Mutual Funds</h1>
              <p className="text-xl">Build your investment portfolio with our curated selection of funds</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="all">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="all">All Funds</TabsTrigger>
                    <TabsTrigger value="equity">Equity</TabsTrigger>
                    <TabsTrigger value="debt">Debt</TabsTrigger>
                    <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <div className="space-y-4">
                      {mutualFunds.map((fund) => (
                        <div
                          key={fund.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedFund.id === fund.id ? "border-indigo-500 bg-indigo-50" : "hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedFund(fund)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold">{fund.name}</h3>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <span className="mr-3">{fund.category}</span>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs ${
                                    fund.risk === "Low"
                                      ? "bg-green-100 text-green-800"
                                      : fund.risk === "Moderate"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : fund.risk === "High"
                                          ? "bg-orange-100 text-orange-800"
                                          : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {fund.risk} Risk
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div
                                className={`flex items-center ${
                                  fund.returns.oneYear >= 0 ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                <span className="text-lg font-bold">{fund.returns.oneYear}%</span>
                                {fund.returns.oneYear >= 0 ? (
                                  <ArrowUpRight className="h-4 w-4 ml-1" />
                                ) : (
                                  <ArrowDownRight className="h-4 w-4 ml-1" />
                                )}
                              </div>
                              <div className="text-xs text-gray-500">1Y Returns</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 mt-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">3Y Returns</div>
                              <div className="font-medium">{fund.returns.threeYear}%</div>
                            </div>
                            <div>
                              <div className="text-gray-500">5Y Returns</div>
                              <div className="font-medium">{fund.returns.fiveYear}%</div>
                            </div>
                            <div>
                              <div className="text-gray-500">AUM</div>
                              <div className="font-medium">{fund.aum}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Expense Ratio</div>
                              <div className="font-medium">{fund.expense}%</div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              {[...Array(Math.floor(fund.rating))].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              ))}
                              {fund.rating % 1 !== 0 && (
                                <StarHalf className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              )}
                              <span className="ml-1 text-sm">{fund.rating}</span>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRemoveFromPortfolio(fund.id)
                                }}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-indigo-600 hover:bg-indigo-700"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleAddToPortfolio(fund)
                                }}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="equity">
                    <div className="space-y-4">
                      {mutualFunds
                        .filter((fund) => fund.category === "Equity")
                        .map((fund) => (
                          <div
                            key={fund.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedFund.id === fund.id ? "border-indigo-500 bg-indigo-50" : "hover:bg-gray-50"
                            }`}
                            onClick={() => setSelectedFund(fund)}
                          >
                            {/* Same content as above */}
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="debt">
                    <div className="space-y-4">
                      {mutualFunds
                        .filter((fund) => fund.category === "Debt")
                        .map((fund) => (
                          <div
                            key={fund.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedFund.id === fund.id ? "border-indigo-500 bg-indigo-50" : "hover:bg-gray-50"
                            }`}
                            onClick={() => setSelectedFund(fund)}
                          >
                            {/* Same content as above */}
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="hybrid">
                    <div className="space-y-4">
                      {mutualFunds
                        .filter((fund) => fund.category === "Hybrid")
                        .map((fund) => (
                          <div
                            key={fund.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedFund.id === fund.id ? "border-indigo-500 bg-indigo-50" : "hover:bg-gray-50"
                            }`}
                            onClick={() => setSelectedFund(fund)}
                          >
                            {/* Same content as above */}
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Fund Details</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg">{selectedFund.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{selectedFund.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Performance</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={selectedFund.performance} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="return"
                            stroke="#6366f1"
                            activeDot={{ r: 8 }}
                            name="Return (%)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Asset Allocation</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={selectedFund.allocation}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {selectedFund.allocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Returns</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { period: "1Y", return: selectedFund.returns.oneYear },
                            { period: "3Y", return: selectedFund.returns.threeYear },
                            { period: "5Y", return: selectedFund.returns.fiveYear },
                            { period: "10Y", return: selectedFund.returns.tenYear },
                          ]}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="period" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="return" name="Return (%)" fill="#6366f1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Calculate Returns</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="investment-amount">Investment Amount ($)</Label>
                        <Input
                          id="investment-amount"
                          type="number"
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="investment-period">Investment Period (Years)</Label>
                          <span>{investmentPeriod} years</span>
                        </div>
                        <Slider
                          id="investment-period"
                          min={1}
                          max={20}
                          step={1}
                          value={[investmentPeriod]}
                          onValueChange={(value) => setInvestmentPeriod(value[0])}
                        />
                      </div>

                      <div className="p-4 bg-indigo-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Projected Value</div>
                        <div className="text-2xl font-bold text-indigo-700">
                          ${calculateProjectedReturns(selectedFund)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Based on {selectedFund.returns.fiveYear}% annual returns over {investmentPeriod} years
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Your Portfolio</h2>

            {portfolioFunds.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Briefcase className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>Your portfolio is empty</p>
                <p className="text-sm mt-1">Add funds by clicking the + button</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Fund Allocation</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={portfolioFunds.map((item) => ({
                              name: item.fund.name,
                              value: item.allocation,
                            }))}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
                          >
                            {portfolioFunds.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Portfolio Summary</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-indigo-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Total Investment</div>
                        <div className="text-2xl font-bold text-indigo-700">${investmentAmount.toLocaleString()}</div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Projected Value</div>
                        <div className="text-2xl font-bold text-green-700">${calculatePortfolioReturns()}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Based on weighted average returns over {investmentPeriod} years
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Total Funds</div>
                          <div className="text-xl font-bold">{portfolioFunds.length}</div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Allocation</div>
                          <div className="text-xl font-bold">{totalAllocation}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Portfolio Funds</h3>
                  <div className="space-y-3">
                    {portfolioFunds.map((item) => (
                      <div key={item.fund.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{item.fund.name}</h4>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span className="mr-3">{item.fund.category}</span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs ${
                                  item.fund.risk === "Low"
                                    ? "bg-green-100 text-green-800"
                                    : item.fund.risk === "Moderate"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : item.fund.risk === "High"
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                              >
                                {item.fund.risk} Risk
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold">{item.allocation}%</div>
                            <div className="text-xs text-gray-500">Allocation</div>
                          </div>
                        </div>

                        <div className="mt-2">
                          <Progress value={item.allocation} className="h-2" />
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm">
                            <span className="text-gray-500">5Y Returns:</span>
                            <span className="ml-1 font-medium">{item.fund.returns.fiveYear}%</span>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleRemoveFromPortfolio(item.fund.id)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              className="bg-indigo-600 hover:bg-indigo-700"
                              onClick={() => handleAddToPortfolio(item.fund)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

