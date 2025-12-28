import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword, validatePassword } from '@/lib/auth/password'
import { signToken } from '@/lib/auth/jwt'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.errors[0].message,
        },
        { status: 400 }
      )
    }

    const { email, password, name } = validation.data

    // Validate password strength
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: passwordValidation.errors[0],
        },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email already registered',
        },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        name: name || null,
      },
    })

    // Create verification token
    const verificationToken = uuidv4()
    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token: verificationToken,
        type: 'email_verification',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    })

    // Generate JWT
    const token = signToken({
      userId: user.id,
      email: user.email,
    })

    // TODO: Send verification email
    // await sendVerificationEmail(user.email, verificationToken)

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
        message: 'Registration successful. Please check your email to verify your account.',
      },
      {
        status: 201,
        headers: {
          'Set-Cookie': `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
            60 * 60 * 24 * 30
          }${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
        },
      }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Registration failed. Please try again.',
      },
      { status: 500 }
    )
  }
}
