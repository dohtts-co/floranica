import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const CATEGORIES = ['All', 'Rose', 'Tulip', 'Lily', 'Orchid', 'Sunflower', 'Other']

export default async function FlowersPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const flowers = await prisma.flower.findMany({
    where: category && category !== 'All' ? { category } : undefined,
    orderBy: { id: 'asc' },
  })

  return (
    <div className="flex flex-col min-h-screen">
      <header style={{ backgroundColor: '#e3f2e1', borderBottom: '2px solid #b7d7b0' }}
        className="px-6 py-4 flex items-center gap-4">
        <Image src="/flowers-icon.png" alt="Floranica Logo" width={50} height={50} />
        <h1 style={{ color: '#2d572c' }} className="text-2xl font-bold flex-1">Floranica Admin Panel</h1>
        <nav className="flex gap-6">
          {[['/', 'Home'], ['/flowers', 'Flowers'], ['/contact', 'Contact'], ['/login', 'Login']].map(([href, label]) => (
            <Link key={href} href={href} style={{ color: '#3d8045' }} className="font-semibold hover:underline">
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-10 py-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#2d572c' }}>Flower Catalogue</h2>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              href={cat === 'All' ? '/flowers' : `/flowers?category=${cat}`}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors"
              style={
                (category ?? 'All') === cat
                  ? { backgroundColor: '#7dcf91', color: '#fff', borderColor: '#7dcf91' }
                  : { backgroundColor: '#fff', color: '#2d572c', borderColor: '#b7d7b0' }
              }
            >
              {cat}
            </Link>
          ))}
        </div>

        {flowers.length === 0 ? (
          <p className="text-gray-500">No flowers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr style={{ backgroundColor: '#f3f3f3' }}>
                  {['ID', 'Name', 'Category', 'Description', 'Price', 'Stock'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-sm font-semibold border border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {flowers.map(f => (
                  <tr key={f.id} className="hover:bg-gray-50 border-t border-gray-100">
                    <td className="px-4 py-3 text-sm border border-gray-200">{f.id}</td>
                    <td className="px-4 py-3 text-sm font-medium border border-gray-200">{f.name}</td>
                    <td className="px-4 py-3 text-sm border border-gray-200">{f.category}</td>
                    <td className="px-4 py-3 text-sm border border-gray-200">{f.description}</td>
                    <td className="px-4 py-3 text-sm border border-gray-200">£{f.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm border border-gray-200">{f.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer style={{ backgroundColor: '#f1f1f1', borderTop: '1px solid #ddd' }}
        className="text-center py-4 text-sm text-gray-500">
        Copyright &copy; 2025 Floranica
      </footer>
    </div>
  )
}
