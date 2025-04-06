"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto">{children}</main>
        <footer className="text-center text-xs text-gray-500 py-4 border-t">
          &copy; 2023 ATHLETYX™. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

