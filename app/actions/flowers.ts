'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'

export async function createFlower(formData: FormData) {
  await verifySession()
  const price = parseFloat(formData.get('price') as string)
  const stock = parseInt(formData.get('stock') as string)
  if (isNaN(price) || isNaN(stock)) return { error: 'Invalid price or stock.' }

  await prisma.flower.create({
    data: {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price,
      imageFile: formData.get('imageFile') as string,
      category: formData.get('category') as string,
      stock,
    },
  })
  revalidatePath('/dashboard/manage')
  revalidatePath('/flowers')
}

export async function updateFlower(formData: FormData) {
  await verifySession()
  const id = parseInt(formData.get('id') as string)
  const price = parseFloat(formData.get('price') as string)
  const stock = parseInt(formData.get('stock') as string)
  if (isNaN(id) || isNaN(price) || isNaN(stock)) return { error: 'Invalid data.' }

  await prisma.flower.update({
    where: { id },
    data: {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price,
      imageFile: formData.get('imageFile') as string,
      category: formData.get('category') as string,
      stock,
    },
  })
  revalidatePath('/dashboard/manage')
  revalidatePath('/flowers')
}

export async function deleteFlower(formData: FormData) {
  await verifySession()
  const id = parseInt(formData.get('id') as string)
  if (isNaN(id)) return { error: 'Invalid ID.' }
  await prisma.flower.delete({ where: { id } })
  revalidatePath('/dashboard/manage')
  revalidatePath('/flowers')
}

export async function saveFullName(formData: FormData) {
  await verifySession()
  const fullName = formData.get('fullName') as string
  const username = formData.get('username') as string
  if (!fullName) return { error: 'Full name is required.' }

  const latest = await prisma.loginHistory.findFirst({
    where: { username },
    orderBy: { loginTime: 'desc' },
  })
  if (latest) {
    await prisma.loginHistory.update({ where: { id: latest.id }, data: { fullName } })
  }
  revalidatePath('/dashboard/history')
}
