import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  
  return NextResponse.json({
    message: 'Signed in successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
}
