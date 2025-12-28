import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'EnglishMaster - AI-Powered English Learning Platform',
  description: 'Master English with unlimited AI-generated exercises for A1-B2 levels',
  keywords: ['English learning', 'CEFR', 'AI exercises', 'grammar', 'vocabulary'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
