// User Types
export interface User {
  id: string
  email: string
  name?: string
  emailVerified: boolean
  preferredLanguage: string
  createdAt: Date
}

// Exercise Types
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2'

export type ExerciseType = 'grammar' | 'vocabulary' | 'paragraph'

export type VocabularyType = 'fill-in-blank' | 'multiple-choice' | 'flashcards'

export interface GrammarQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export interface GrammarExercise {
  level: CEFRLevel
  topic: string
  questions: GrammarQuestion[]
}

export interface VocabularyQuestion {
  id: number
  word: string
  question?: string
  options?: string[]
  correctAnswer: string
  definition?: string
  exampleSentence?: string
}

export interface VocabularyExercise {
  level: CEFRLevel
  type: VocabularyType
  questions: VocabularyQuestion[]
}

export interface Flashcard {
  id: number
  word: string
  definition: string
  exampleSentence: string
  partOfSpeech?: string
}

export interface FlashcardSet {
  level: CEFRLevel
  cards: Flashcard[]
}

export interface ParagraphExercise {
  level: CEFRLevel
  topic: string
  paragraph: string
  sentences: number
}

// Trial Types
export interface TrialStatus {
  grammarRemaining: number
  vocabularyRemaining: number
  hasActiveSubscription: boolean
}

// Subscription Types
export type PlanType = 'monthly' | 'yearly'

export type SubscriptionStatus = 'active' | 'cancelled' | 'expired'

export interface Subscription {
  id: string
  planType: PlanType
  status: SubscriptionStatus
  startDate: Date
  endDate: Date
  autoRenew: boolean
}

// Answer Types
export interface Answer {
  questionId: number
  userAnswer: string
}

export interface GradingResult {
  score: number
  totalQuestions: number
  correctAnswers: number
  percentage: number
  grade: string
  questionResults: QuestionResult[]
}

export interface QuestionResult {
  questionId: number
  question: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  explanation: string
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
