"use client"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="w-full border-b bg-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="text-xl font-bold">ATHLETYX</div>
      </div>

      <nav className="hidden md:block">
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="text-gray-800 hover:text-indigo-600 uppercase">
              Home
            </Link>
          </li>
          <li>
            <Link href="/challenges" className="text-gray-800 hover:text-indigo-600 uppercase">
              Challenges
            </Link>
          </li>
          <li>
            <Link href="/exercises" className="text-gray-800 hover:text-indigo-600 uppercase">
              Exercises
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-800 hover:text-indigo-600 uppercase">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

