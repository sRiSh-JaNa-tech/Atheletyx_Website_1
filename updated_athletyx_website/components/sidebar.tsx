"use client"

import { useState } from "react"
import Image from "next/image"; 
import Link from "next/link"
import { Home, Trophy, Activity, Brain, Settings, Info, ChevronDown, Zap, Dumbbell, Calculator, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSport, setSelectedSport] = useState("Running")

  return (
    <>
      {/* Hamburger Button (☰) - Opens Sidebar */}
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="fixed top-4 left-4 z-50 lg:hidden">
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay (Closes Sidebar When Clicked) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r bg-white flex flex-col h-screen transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center">
              <Image
                src="https://i.imgur.com/KxE4Q4k.jpeg?height=32&width=32"
                alt="Company Logo"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-xl font-bold">ATHLETYX</h1>
          </div>

          {/* Close Button (X) - Works on All Screens */}
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link href="/" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
                <Home className="w-5 h-5" />
                <span>HOME</span>
              </Link>
            </li>
            <li>
              <Link href="/challenges" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
                <Trophy className="w-5 h-5" />
                <span>CHALLENGES</span>
              </Link>
            </li>
            <li>
              <Link href="/exercises" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
                <Dumbbell className="w-5 h-5" />
                <span>EXERCISES</span>
              </Link>
            </li>
            <li>
              <Link href="/fit-athlete" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
                <Activity className="w-5 h-5" />
                <span>FITATHLETE</span>
              </Link>
            </li>
            <li>
              <Link href="/financial-solutions" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
                <Zap className="w-5 h-5" />
                <span>FINANCIAL SOLUTIONS</span>
              </Link>
            </li>
            <li>
              <Link href="/athlete-ai" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
                <Brain className="w-5 h-5" />
                <span>ATHLETIC AI</span>
              </Link>
            </li>
            <li>
              <Link href="/calorie-calculator" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
                <Calculator className="w-5 h-5" />
                <span>CALORIE CALCULATOR</span>
              </Link>
            </li>
            <li>
              <Link
                href="/enhanced-calorie-calculator"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
              >
                <Activity className="w-5 h-5" />
                <span>ENHANCED CALORIE CALCULATOR</span>
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
                <Settings className="w-5 h-5" />
                <span>SETTINGS</span>
              </Link>
            </li>
            <li>
              <Link href="/about" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
                <Info className="w-5 h-5" />
                <span>ABOUT</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Sport Selector */}
        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedSport}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => setSelectedSport("Swimming")}>Swimming</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedSport("Badminton")}>Badminton</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedSport("Cricket")}>Cricket</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedSport("Hockey")}>Hockey</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedSport("Running")}>Running</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-t flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://i.imgur.com/DBoioCp.png?height=40&width=40" alt="Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">User Profile</p>
            <p className="text-xs text-gray-500">View profile</p>
          </div>
        </div>

        <div className="p-4 text-xs text-center text-gray-500">ATHLETYX™</div>
      </div>
    </>
  )
}
