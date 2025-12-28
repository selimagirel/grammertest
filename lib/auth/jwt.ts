import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this'
const JWT_EXPIRES_IN = '30d'

export interface JWTPayload {
  userId: string
  email: string
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload
    return payload
  } catch (error) {
    return null
  }
}

export function generateVerificationToken(): string {
  return jwt.sign(
    { random: Math.random().toString(36).substring(2) },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}
