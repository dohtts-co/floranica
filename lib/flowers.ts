import 'server-only'
import type { Flower } from '@/app/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { safeQuery, type QueryResult } from '@/lib/safe-query'

export function getFlowers(category?: string): Promise<QueryResult<Flower[]>> {
  return safeQuery(() =>
    prisma.flower.findMany({
      where: category && category !== 'All' ? { category } : undefined,
      orderBy: { id: 'asc' },
    })
  )
}
