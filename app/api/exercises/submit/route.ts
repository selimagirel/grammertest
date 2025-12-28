import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { gradeGrammarExercise } from '@/lib/grading'
import { GrammarQuestion, Answer } from '@/types'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth/session'

const submitSchema = z.object({
  questions: z.array(
    z.object({
      id: z.number(),
      question: z.string(),
      options: z.array(z.string()),
      correctAnswer: z.string(),
      explanation: z.string(),
    })
  ),
  answers: z.array(
    z.object({
      questionId: z.number(),
      userAnswer: z.string(),
    })
  ),
  level: z.string(),
  topic: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = submitSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.errors[0].message,
        },
        { status: 400 }
      )
    }

    const { questions, answers, level, topic } = validation.data

    // Grade the exercise
    const result = gradeGrammarExercise(
      questions as GrammarQuestion[],
      answers as Answer[]
    )

    // Save to exercise history if user is logged in
    const session = await getSession()
    if (session) {
      await prisma.exerciseHistory.create({
        data: {
          userId: session.userId,
          exerciseType: 'grammar',
          level,
          topic,
          score: result.score,
          totalQuestions: result.totalQuestions,
          correctAnswers: result.correctAnswers,
          exerciseData: {
            questions,
            answers,
            result,
          },
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('Exercise submission error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to grade exercise',
      },
      { status: 500 }
    )
  }
}
