import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decrypt } from '@/lib/session'

export const verifySession = cache(async () => {
  const store = await cookies()
  const token = store.get('session')?.value
  const session = await decrypt(token)
  if (!session?.userId) redirect('/login')
  return { userId: session.userId }
})

export async function getSessionUser() {
  const store = await cookies()
  const token = store.get('session')?.value
  return await decrypt(token)
}
