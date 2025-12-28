import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth/session'

export async function GET(request: NextRequest) {
  try {
    // Get session if user is logged in
    const session = await getSession()

    // Get session ID from query or generate new one
    const sessionId = request.nextUrl.searchParams.get('sessionId')

    let trialUsage
    let hasActiveSubscription = false

    if (session) {
      // Logged in user - check database
      trialUsage = await prisma.trialUsage.findUnique({
        where: { userId: session.userId },
      })

      // Check for active subscription
      const subscription = await prisma.subscription.findFirst({
        where: {
          userId: session.userId,
          status: 'active',
          endDate: {
            gte: new Date(),
          },
        },
      })

      hasActiveSubscription = !!subscription
    } else if (sessionId) {
      // Anonymous user with session ID
      trialUsage = await prisma.trialUsage.findUnique({
        where: { sessionId },
      })
    }

    // Default trial counts
    let grammarRemaining = 3
    let vocabularyRemaining = 3

    if (trialUsage) {
      grammarRemaining = trialUsage.grammarCount
      vocabularyRemaining = trialUsage.vocabularyCount
    }

    return NextResponse.json({
      success: true,
      data: {
        grammarRemaining,
        vocabularyRemaining,
        hasActiveSubscription,
      },
    })
  } catch (error) {
    console.error('Trial status error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch trial status',
      },
      { status: 500 }
    )
  }
}
