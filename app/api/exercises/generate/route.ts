import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth/session'
import {
  generateGrammarExercise,
  generateVocabularyExercise,
  generateParagraph,
} from '@/lib/claude/client'
import { CEFRLevel, VocabularyType } from '@/types'
import { z } from 'zod'

const generateSchema = z.object({
  exerciseType: z.enum(['grammar', 'vocabulary', 'paragraph']),
  level: z.enum(['A1', 'A2', 'B1', 'B2']),
  topic: z.string().optional(),
  vocabularyType: z.enum(['fill-in-blank', 'multiple-choice', 'flashcards']).optional(),
  sessionId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = generateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.errors[0].message,
        },
        { status: 400 }
      )
    }

    const { exerciseType, level, topic, vocabularyType, sessionId } = validation.data

    // Get session if user is logged in
    const session = await getSession()

    // Check trial status
    const userId = session?.userId
    let trialUsage

    if (userId) {
      trialUsage = await prisma.trialUsage.findUnique({
        where: { userId },
      })
    } else if (sessionId) {
      trialUsage = await prisma.trialUsage.findUnique({
        where: { sessionId },
      })
    }

    // Check for active subscription
    let hasActiveSubscription = false
    if (userId) {
      const subscription = await prisma.subscription.findFirst({
        where: {
          userId,
          status: 'active',
          endDate: {
            gte: new Date(),
          },
        },
      })
      hasActiveSubscription = !!subscription
    }

    // Check if user can generate exercise
    if (!hasActiveSubscription) {
      const grammarCount = trialUsage?.grammarCount ?? 3
      const vocabularyCount = trialUsage?.vocabularyCount ?? 3

      if (exerciseType === 'grammar' && grammarCount <= 0) {
        return NextResponse.json(
          {
            success: false,
            error: 'No grammar trials remaining. Please subscribe for unlimited access.',
          },
          { status: 403 }
        )
      }

      if (exerciseType === 'vocabulary' && vocabularyCount <= 0) {
        return NextResponse.json(
          {
            success: false,
            error: 'No vocabulary trials remaining. Please subscribe for unlimited access.',
          },
          { status: 403 }
        )
      }
    }

    // Generate exercise using Claude API
    let exercise

    if (exerciseType === 'grammar') {
      if (!topic) {
        return NextResponse.json(
          {
            success: false,
            error: 'Topic is required for grammar exercises',
          },
          { status: 400 }
        )
      }
      exercise = await generateGrammarExercise(level as CEFRLevel, topic)
    } else if (exerciseType === 'vocabulary') {
      if (!vocabularyType) {
        return NextResponse.json(
          {
            success: false,
            error: 'Vocabulary type is required for vocabulary exercises',
          },
          { status: 400 }
        )
      }
      exercise = await generateVocabularyExercise(
        level as CEFRLevel,
        vocabularyType as VocabularyType,
        topic
      )
    } else if (exerciseType === 'paragraph') {
      exercise = await generateParagraph(level as CEFRLevel, topic)
    }

    // Decrease trial count if not subscribed
    if (!hasActiveSubscription) {
      if (userId) {
        if (trialUsage) {
          await prisma.trialUsage.update({
            where: { userId },
            data: {
              grammarCount:
                exerciseType === 'grammar'
                  ? Math.max(0, trialUsage.grammarCount - 1)
                  : trialUsage.grammarCount,
              vocabularyCount:
                exerciseType === 'vocabulary'
                  ? Math.max(0, trialUsage.vocabularyCount - 1)
                  : trialUsage.vocabularyCount,
            },
          })
        } else {
          await prisma.trialUsage.create({
            data: {
              userId,
              grammarCount: exerciseType === 'grammar' ? 2 : 3,
              vocabularyCount: exerciseType === 'vocabulary' ? 2 : 3,
            },
          })
        }
      } else if (sessionId) {
        if (trialUsage) {
          await prisma.trialUsage.update({
            where: { sessionId },
            data: {
              grammarCount:
                exerciseType === 'grammar'
                  ? Math.max(0, trialUsage.grammarCount - 1)
                  : trialUsage.grammarCount,
              vocabularyCount:
                exerciseType === 'vocabulary'
                  ? Math.max(0, trialUsage.vocabularyCount - 1)
                  : trialUsage.vocabularyCount,
            },
          })
        } else {
          await prisma.trialUsage.create({
            data: {
              sessionId,
              grammarCount: exerciseType === 'grammar' ? 2 : 3,
              vocabularyCount: exerciseType === 'vocabulary' ? 2 : 3,
            },
          })
        }
      }
    }

    // Save to exercise history
    if (userId) {
      await prisma.exerciseHistory.create({
        data: {
          userId,
          exerciseType,
          level,
          topic: topic || null,
          exerciseData: exercise as any,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: exercise,
    })
  } catch (error) {
    console.error('Exercise generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate exercise',
      },
      { status: 500 }
    )
  }
}
