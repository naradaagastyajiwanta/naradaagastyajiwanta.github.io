"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home, FileText, Settings, LogOut, HardDrive, Sparkles } from "lucide-react"
import { authService } from "@/lib/auth-service"

export default function AdminHeader() {
  const router = useRouter()

  const handleLogout = () => {
    authService.logout()
    router.push("/admin/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin" className="text-xl font-semibold">
            Admin Dashboard
            <span className="text-blue-500">.</span>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/admin" className="text-sm font-medium flex items-center hover:text-blue-500 transition-colors">
            <FileText className="h-4 w-4 mr-1" />
            Posts
          </Link>
          <Link
            href="/admin/storage"
            className="text-sm font-medium flex items-center hover:text-blue-500 transition-colors"
          >
            <HardDrive className="h-4 w-4 mr-1" />
            Storage
          </Link>
          <Link
            href="/admin/ai"
            className="text-sm font-medium flex items-center hover:text-blue-500 transition-colors"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            AI Tools
          </Link>
          <Link
            href="/admin/settings"
            className="text-sm font-medium flex items-center hover:text-blue-500 transition-colors"
          >
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Link>
          <div className="h-6 border-l border-gray-300"></div>
          <Link href="/" className="text-sm font-medium flex items-center hover:text-blue-500 transition-colors">
            <Home className="h-4 w-4 mr-1" />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm font-medium flex items-center text-red-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}
