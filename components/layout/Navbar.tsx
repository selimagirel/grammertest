"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const pathname = usePathname()

  // TODO: Replace with actual auth state from NextAuth
  const isAuthenticated = false
  const user = null

  return (
    <nav className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50 bg-[#1a1a2e]/80">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="gradient-purple p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-gradient">EnglishMaster</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/levels"
              className={`hover:text-purple-400 transition-colors ${
                pathname?.startsWith('/levels') ? 'text-purple-400' : ''
              }`}
            >
              Practice
            </Link>
            <Link
              href="/subscribe"
              className={`hover:text-purple-400 transition-colors ${
                pathname === '/subscribe' ? 'text-purple-400' : ''
              }`}
            >
              Pricing
            </Link>
            {isAuthenticated && (
              <Link
                href="/profile"
                className={`hover:text-purple-400 transition-colors ${
                  pathname === '/profile' ? 'text-purple-400' : ''
                }`}
              >
                My Progress
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="gradient-purple">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
