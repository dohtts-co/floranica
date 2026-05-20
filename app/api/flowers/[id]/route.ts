import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await verifySession()
  const { id } = await context.params
  const flower = await prisma.flower.findUnique({ where: { id: parseInt(id) } })
  if (!flower) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(flower)
}
