import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyPassword } from '@/lib/auth/password'
import { signToken } from '@/lib/auth/jwt'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = loginSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.errors[0].message,
        },
        { status: 400 }
      )
    }

    const { email, password } = validation.data

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password',
        },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password',
        },
        { status: 401 }
      )
    }

    // Generate JWT
    const token = signToken({
      userId: user.id,
      email: user.email,
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            emailVerified: user.emailVerified,
          },
          token,
        },
        message: 'Login successful',
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
            60 * 60 * 24 * 30
          }${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
        },
      }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Login failed. Please try again.',
      },
      { status: 500 }
    )
  }
}
