"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts"
import { ArrowUpRight, Briefcase, Plus, Minus } from "lucide-react"

// Sample retirement investment options
const retirementOptions = [
  {
    id: 1,
    name: "401(k) Plan",
    type: "Tax-Advantaged",
    risk: "Moderate",
    returns: {
      conservative: 6.0,
      moderate: 8.0,
      aggressive: 10.0,
    },
    taxBenefits: "Tax-deferred growth, potential employer match",
    minInvestment: 0,
    description:
      "Employer-sponsored retirement plan with tax advantages and potential employer matching contributions.",
    features: [
      "Pre-tax contributions reduce taxable income",
      "Potential employer matching contributions",
      "Tax-deferred growth until withdrawal",
      "Early withdrawal penalties before age 59½",
    ],
  },
  {
    id: 2,
    name: "Traditional IRA",
    type: "Tax-Advantaged",
    risk: "Varies",
    returns: {
      conservative: 5.5,
      moderate: 7.5,
      aggressive: 9.5,
    },
    taxBenefits: "Tax-deductible contributions, tax-deferred growth",
    minInvestment: 0,
    description: "Individual retirement account with tax-deductible contributions and tax-deferred growth.",
    features: [
      "Tax-deductible contributions (income limits may apply)",
      "Tax-deferred growth until withdrawal",
      "Required minimum distributions starting at age 72",
      "Early withdrawal penalties before age 59½",
    ],
  },
  {
    id: 3,
    name: "Roth IRA",
    type: "Tax-Advantaged",
    risk: "Varies",
    returns: {
      conservative: 5.5,
      moderate: 7.5,
      aggressive: 9.5,
    },
    taxBenefits: "Tax-free growth and withdrawals",
    minInvestment: 0,
    description: "Individual retirement account with after-tax contributions and tax-free growth and withdrawals.",
    features: [
      "After-tax contributions (no immediate tax deduction)",
      "Tax-free growth and qualified withdrawals",
      "No required minimum distributions",
      "Contributions can be withdrawn at any time without penalty",
    ],
  },
  {
    id: 4,
    name: "SEP IRA",
    type: "Tax-Advantaged",
    risk: "Varies",
    returns: {
      conservative: 5.5,
      moderate: 7.5,
      aggressive: 9.5,
    },
    taxBenefits: "Tax-deductible contributions, tax-deferred growth",
    minInvestment: 0,
    description: "Simplified Employee Pension IRA for self-employed individuals and small business owners.",
    features: [
      "Higher contribution limits than traditional IRAs",
      "Tax-deductible contributions for employers",
      "Easy to set up and maintain",
      "Flexible annual contributions",
    ],
  },
  {
    id: 5,
    name: "Annuity",
    type: "Insurance",
    risk: "Low to Moderate",
    returns: {
      conservative: 4.0,
      moderate: 5.5,
      aggressive: 7.0,
    },
    taxBenefits: "Tax-deferred growth",
    minInvestment: 5000,
    description: "Insurance product that provides guaranteed income for a specified period or lifetime.",
    features: [
      "Guaranteed income stream",
      "Tax-deferred growth until withdrawal",
      "Death benefit for beneficiaries",
      "Various payout options available",
    ],
  },
  {
    id: 6,
    name: "Real Estate Investment",
    type: "Alternative",
    risk: "Moderate to High",
    returns: {
      conservative: 6.0,
      moderate: 8.5,
      aggressive: 12.0,
    },
    taxBenefits: "Depreciation deductions, 1031 exchanges",
    minInvestment: 25000,
    description:
      "Investment in physical properties or real estate investment trusts (REITs) for income and appreciation.",
    features: [
      "Potential for rental income and appreciation",
      "Tax advantages through depreciation",
      "Hedge against inflation",
      "Diversification from traditional securities",
    ],
  },
  {
    id: 7,
    name: "Dividend Stock Portfolio",
    type: "Equity",
    risk: "Moderate to High",
    returns: {
      conservative: 5.0,
      moderate: 8.0,
      aggressive: 11.0,
    },
    taxBenefits: "Qualified dividends taxed at lower rates",
    minInvestment: 1000,
    description: "Portfolio of dividend-paying stocks for income and growth.",
    features: [
      "Regular income through dividends",
      "Potential for capital appreciation",
      "Qualified dividends taxed at lower rates",
      "Liquidity compared to some other investments",
    ],
  },
  {
    id: 8,
    name: "Bond Ladder",
    type: "Fixed Income",
    risk: "Low to Moderate",
    returns: {
      conservative: 3.5,
      moderate: 4.5,
      aggressive: 5.5,
    },
    taxBenefits: "Municipal bonds may be tax-exempt",
    minInvestment: 10000,
    description:
      "Strategy of buying bonds with staggered maturity dates for regular income and reduced interest rate risk.",
    features: [
      "Regular, predictable income",
      "Reduced interest rate risk",
      "Capital preservation",
      "Flexibility to reinvest at current rates",
    ],
  },
]

export default function RetirementPlanning() {
  const [selectedOption, setSelectedOption] = useState(retirementOptions[0])
  const [currentAge, setCurrentAge] = useState(35)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentSavings, setCurrentSavings] = useState(50000)
  const [annualContribution, setAnnualContribution] = useState(6000)
  const [riskProfile, setRiskProfile] = useState("moderate")
  const [portfolioOptions, setPortfolioOptions] = useState<
    { option: (typeof retirementOptions)[0]; allocation: number }[]
  >([])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFBB28", "#FF8042"]

  const handleAddToPortfolio = (option: (typeof retirementOptions)[0]) => {
    // Check if option is already in portfolio
    const existingOption = portfolioOptions.find((item) => item.option.id === option.id)

    if (existingOption) {
      // Update allocation if less than 100%
      if (existingOption.allocation < 100) {
        const updatedOptions = portfolioOptions.map((item) =>
          item.option.id === option.id ? { ...item, allocation: Math.min(item.allocation + 10, 100) } : item,
        )
        setPortfolioOptions(updatedOptions)
      }
    } else {
      // Add new option with 10% allocation
      setPortfolioOptions([...portfolioOptions, { option, allocation: 10 }])
    }
  }

  const handleRemoveFromPortfolio = (optionId: number) => {
    const existingOption = portfolioOptions.find((item) => item.option.id === optionId)

    if (existingOption) {
      if (existingOption.allocation <= 10) {
        // Remove option if allocation is 10% or less
        setPortfolioOptions(portfolioOptions.filter((item) => item.option.id !== optionId))
      } else {
        // Decrease allocation by 10%
        const updatedOptions = portfolioOptions.map((item) =>
          item.option.id === optionId ? { ...item, allocation: item.allocation - 10 } : item,
        )
        setPortfolioOptions(updatedOptions)
      }
    }
  }

  const totalAllocation = portfolioOptions.reduce((sum, item) => sum + item.allocation, 0)

  const calculateRetirementProjection = () => {
    const yearsToRetirement = retirementAge - currentAge
    let projectedAmount = currentSavings

    // Use selected option's return rate based on risk profile
    const annualReturnRate = selectedOption.returns[riskProfile as keyof typeof selectedOption.returns] / 100

    // Compound annually
    for (let i = 0; i < yearsToRetirement; i++) {
      projectedAmount = projectedAmount * (1 + annualReturnRate) + annualContribution
    }

    return projectedAmount.toFixed(2)
  }

  const calculatePortfolioProjection = () => {
    if (portfolioOptions.length === 0) return 0

    const yearsToRetirement = retirementAge - currentAge
    let projectedAmount = currentSavings

    // Calculate weighted average return
    const weightedReturnRate =
      portfolioOptions.reduce((sum, item) => {
        const weight = item.allocation / totalAllocation
        const returnRate = item.option.returns[riskProfile as keyof typeof item.option.returns]
        return sum + returnRate * weight
      }, 0) / 100

    // Compound annually
    for (let i = 0; i < yearsToRetirement; i++) {
      projectedAmount = projectedAmount * (1 + weightedReturnRate) + annualContribution
    }

    return projectedAmount.toFixed(2)
  }

  // Generate projection data for chart
  const generateProjectionData = () => {
    const data = []
    const yearsToRetirement = retirementAge - currentAge

    // Use portfolio return rate if available, otherwise use selected option
    const annualReturnRate =
      portfolioOptions.length > 0
        ? portfolioOptions.reduce((sum, item) => {
            const weight = item.allocation / totalAllocation
            const returnRate = item.option.returns[riskProfile as keyof typeof item.option.returns]
            return sum + returnRate * weight
          }, 0) / 100
        : selectedOption.returns[riskProfile as keyof typeof selectedOption.returns] / 100

    let conservative = currentSavings
    let moderate = currentSavings
    let aggressive = currentSavings

    for (let i = 0; i <= yearsToRetirement; i++) {
      data.push({
        year: currentAge + i,
        conservative: Math.round(conservative),
        moderate: Math.round(moderate),
        aggressive: Math.round(aggressive),
      })

      // Compound annually with different rates
      conservative = conservative * (1 + annualReturnRate * 0.75) + annualContribution
      moderate = moderate * (1 + annualReturnRate) + annualContribution
      aggressive = aggressive * (1 + annualReturnRate * 1.25) + annualContribution
    }

    return data
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="https://thumbs.dreamstime.com/b/senior-retired-business-man-sunbathing-arms-outstretched-tropical-caribbean-beach-retirement-freedom-concept-businessman-56179877.jpg?height=300&width=1000"
            alt="Retirement Planning"
            width={1000}
            height={300}
            className="w-full h-64 object-cover object-[20%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-indigo-600/40 flex items-center p-8">
            <div className="text-white">
              <h1 className="text-4xl font-bold">Retirement Planning</h1>
              <p className="text-xl">Secure your future with strategic retirement investments</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="all">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="all">All Options</TabsTrigger>
                    <TabsTrigger value="tax-advantaged">Tax-Advantaged</TabsTrigger>
                    <TabsTrigger value="fixed-income">Fixed Income</TabsTrigger>
                    <TabsTrigger value="alternative">Alternative</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <div className="space-y-4">
                      {retirementOptions.map((option) => (
                        <div
                          key={option.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedOption.id === option.id ? "border-indigo-500 bg-indigo-50" : "hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedOption(option)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold">{option.name}</h3>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <span className="mr-3">{option.type}</span>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs ${
                                    option.risk === "Low"
                                      ? "bg-green-100 text-green-800"
                                      : option.risk === "Low to Moderate"
                                        ? "bg-emerald-100 text-emerald-800"
                                        : option.risk === "Moderate"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : option.risk === "Moderate to High"
                                            ? "bg-orange-100 text-orange-800"
                                            : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {option.risk} Risk
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="flex items-center text-indigo-600">
                                <span className="text-lg font-bold">{option.returns.moderate}%</span>
                                <ArrowUpRight className="h-4 w-4 ml-1" />
                              </div>
                              <div className="text-xs text-gray-500">Avg. Returns</div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="text-sm text-gray-600">{option.description}</p>
                          </div>

                          <div className="mt-3">
                            <div className="text-sm">
                              <span className="text-gray-500">Tax Benefits:</span>
                              <span className="ml-1">{option.taxBenefits}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <div className="text-sm">
                              <span className="text-gray-500">Min. Investment:</span>
                              <span className="ml-1 font-medium">
                                {option.minInvestment > 0 ? `$${option.minInvestment.toLocaleString()}` : "None"}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRemoveFromPortfolio(option.id)
                                }}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-indigo-600 hover:bg-indigo-700"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleAddToPortfolio(option)
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

                  <TabsContent value="tax-advantaged">
                    <div className="space-y-4">
                      {retirementOptions
                        .filter((option) => option.type === "Tax-Advantaged")
                        .map((option) => (
                          <div
                            key={option.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedOption.id === option.id ? "border-indigo-500 bg-indigo-50" : "hover:bg-gray-50"
                            }`}
                            onClick={() => setSelectedOption(option)}
                          >
                            {/* Same content as above */}
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="fixed-income">
                    <div className="space-y-4">
                      {retirementOptions
                        .filter((option) => option.type === "Fixed Income")
                        .map((option) => (
                          <div
                            key={option.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedOption.id === option.id ? "border-indigo-500 bg-indigo-50" : "hover:bg-gray-50"
                            }`}
                            onClick={() => setSelectedOption(option)}
                          >
                            {/* Same content as above */}
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="alternative">
                    <div className="space-y-4">
                      {retirementOptions
                        .filter((option) => option.type === "Alternative")
                        .map((option) => (
                          <div
                            key={option.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedOption.id === option.id ? "border-indigo-500 bg-indigo-50" : "hover:bg-gray-50"
                            }`}
                            onClick={() => setSelectedOption(option)}
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
                <h2 className="text-xl font-bold mb-4">Retirement Calculator</h2>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-age">Current Age</Label>
                        <Input
                          id="current-age"
                          type="number"
                          value={currentAge}
                          onChange={(e) => setCurrentAge(Number(e.target.value))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="retirement-age">Retirement Age</Label>
                        <Input
                          id="retirement-age"
                          type="number"
                          value={retirementAge}
                          onChange={(e) => setRetirementAge(Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="current-savings">Current Savings ($)</Label>
                      <Input
                        id="current-savings"
                        type="number"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(Number(e.target.value))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="annual-contribution">Annual Contribution ($)</Label>
                      <Input
                        id="annual-contribution"
                        type="number"
                        value={annualContribution}
                        onChange={(e) => setAnnualContribution(Number(e.target.value))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="risk-profile">Risk Profile</Label>
                      <Select value={riskProfile} onValueChange={setRiskProfile}>
                        <SelectTrigger id="risk-profile">
                          <SelectValue placeholder="Select risk profile" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservative">Conservative</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="aggressive">Aggressive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Projected Retirement Savings</div>
                    <div className="text-2xl font-bold text-indigo-700">
                      ${portfolioOptions.length > 0 ? calculatePortfolioProjection() : calculateRetirementProjection()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      At age {retirementAge} ({retirementAge - currentAge} years from now)
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Projection Chart</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={generateProjectionData()} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]} />
                          <Area
                            type="monotone"
                            dataKey="moderate"
                            stroke="#6366f1"
                            fill="#6366f1"
                            fillOpacity={0.3}
                            name="Projected Savings"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Key Features</h4>
                    <ul className="space-y-2 text-sm">
                      {selectedOption.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2 mt-0.5">
                            <span className="text-xs">✓</span>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Your Retirement Portfolio</h2>

            {portfolioOptions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Briefcase className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>Your portfolio is empty</p>
                <p className="text-sm mt-1">Add retirement options by clicking the + button</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Portfolio Allocation</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={portfolioOptions.map((item) => ({
                              name: item.option.name,
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
                            {portfolioOptions.map((_, index) => (
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
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Years to Retirement</div>
                          <div className="text-2xl font-bold text-indigo-700">{retirementAge - currentAge}</div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Projected Savings</div>
                          <div className="text-2xl font-bold text-green-700">${calculatePortfolioProjection()}</div>
                          <div className="text-xs text-gray-500 mt-1">At age {retirementAge}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">Total Options</div>
                            <div className="text-xl font-bold">{portfolioOptions.length}</div>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">Allocation</div>
                            <div className="text-xl font-bold">{totalAllocation}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Portfolio Options</h3>
                  <div className="space-y-3">
                    {portfolioOptions.map((item) => (
                      <div key={item.option.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{item.option.name}</h4>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span className="mr-3">{item.option.type}</span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs ${
                                  item.option.risk === "Low"
                                    ? "bg-green-100 text-green-800"
                                    : item.option.risk === "Low to Moderate"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : item.option.risk === "Moderate"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : item.option.risk === "Moderate to High"
                                          ? "bg-orange-100 text-orange-800"
                                          : "bg-red-100 text-red-800"
                                }`}
                              >
                                {item.option.risk} Risk
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
                            <span className="text-gray-500">Expected Return:</span>
                            <span className="ml-1 font-medium">
                              {item.option.returns[riskProfile as keyof typeof item.option.returns]}%
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveFromPortfolio(item.option.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              className="bg-indigo-600 hover:bg-indigo-700"
                              onClick={() => handleAddToPortfolio(item.option)}
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

      <footer className="text-center text-xs text-gray-500 mt-8 pb-4">ATHLETYX™</footer>
    </div>
  )
}

