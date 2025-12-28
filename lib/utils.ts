import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = localStorage.getItem('englishmaster_session_id')

  if (!sessionId) {
    sessionId = generateSessionId()
    localStorage.setItem('englishmaster_session_id', sessionId)
  }

  return sessionId
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function calculateGrade(score: number): string {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

export function calculatePercentage(correct: number, total: number): number {
  return Math.round((correct / total) * 100)
}
