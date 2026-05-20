'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/session'

export async function login(
  _state: { error?: string } | undefined,
  formData: FormData
): Promise<{ error: string }> {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { error: 'Username and password are required.' }
  }

  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return { error: 'Invalid username or password.' }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return { error: 'Invalid username or password.' }

  const headerStore = await headers()
  const ip = headerStore.get('x-forwarded-for') ?? headerStore.get('x-real-ip') ?? 'unknown'

  await prisma.loginHistory.create({
    data: { username, ipAddress: ip },
  })

  await createSession(user.id)
  redirect('/dashboard/promptname')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
