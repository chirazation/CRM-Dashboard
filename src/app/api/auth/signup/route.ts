import { PrismaClient, Role } from '@prisma/client'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json()

  // Vérifier que le rôle est valide
  const allowedRoles: Role[] = ['admin', 'sales']
  if (role && !allowedRoles.includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }
  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const hashedPassword = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role ?? 'sales', 
    },
  })

  return NextResponse.json({
    message : 'Signed up successfully',
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  }, { status: 201 })
}
