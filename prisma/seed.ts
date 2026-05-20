import "dotenv/config";
import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import bcrypt from 'bcryptjs'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const hashed = await bcrypt.hash('floranica123', 10)
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', password: hashed },
  })

  const supplierData = [
    { name: 'Bloom & Co', contactEmail: 'contact@bloomco.com', phoneNumber: '01234 567890' },
    { name: 'FloraDirect', contactEmail: 'hello@floradirect.co.uk', phoneNumber: '020 1111 2222' },
    { name: 'Petal Partners', contactEmail: 'info@petalpartners.com', phoneNumber: '07890 123456' },
    { name: 'Garden Glory', contactEmail: 'support@gardenglory.com', phoneNumber: '01322 556677' },
    { name: 'EverBloom Ltd.', contactEmail: 'admin@everbloom.com', phoneNumber: '01555 909090' },
    { name: 'Floral & Fern', contactEmail: 'floralfern@flowers.net', phoneNumber: '07771 112233' },
    { name: 'Stemline Suppliers', contactEmail: 'sales@stemline.com', phoneNumber: '01132 445566' },
    { name: 'The Petal People', contactEmail: 'theteam@petalpeople.co.uk', phoneNumber: '0161 998877' },
    { name: 'Rosewood Imports', contactEmail: 'info@rosewoodimports.com', phoneNumber: '01865 443322' },
    { name: 'Greenhouse Grove', contactEmail: 'contact@greenhousegrove.org', phoneNumber: '07400 667788' },
  ]

  for (const s of supplierData) {
    await prisma.supplier.upsert({
      where: { id: supplierData.indexOf(s) + 1 },
      update: {},
      create: s,
    })
  }

  const flowerData = [
    { name: 'Red Rose', description: 'Classic red rose, symbol of love', price: 4.99, imageFile: '', category: 'Rose', stock: 120 },
    { name: 'Yellow Tulip', description: 'Bright yellow tulip, cheerful bloom', price: 3.49, imageFile: '', category: 'Tulip', stock: 85 },
    { name: 'White Lily', description: 'Elegant white lily, pure and fragrant', price: 5.99, imageFile: '', category: 'Lily', stock: 60 },
    { name: 'Purple Orchid', description: 'Exotic purple orchid, lasts weeks', price: 12.99, imageFile: '', category: 'Orchid', stock: 40 },
    { name: 'Sunflower', description: 'Bold sunflower, brings sunshine indoors', price: 2.99, imageFile: '', category: 'Sunflower', stock: 200 },
  ]

  for (const f of flowerData) {
    await prisma.flower.create({ data: f })
  }

  console.log('✅ Seed complete. Login: admin / floranica123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
