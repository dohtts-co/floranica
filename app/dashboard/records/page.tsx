import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const CATEGORIES = ['All', 'Rose', 'Tulip', 'Lily', 'Orchid', 'Sunflower', 'Other']

export default async function RecordsPage({
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
    <div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#2d572c' }}>View Records</h2>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map(cat => {
          const active = (category ?? 'All') === cat
          return (
            <a
              key={cat}
              href={cat === 'All' ? '/dashboard/records' : `/dashboard/records?category=${cat}`}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors"
              style={active
                ? { backgroundColor: '#7dcf91', color: '#fff', borderColor: '#7dcf91' }
                : { backgroundColor: '#fff', color: '#2d572c', borderColor: '#b7d7b0' }}
            >
              {cat}
            </a>
          )
        })}
      </div>

      {flowers.length === 0 ? (
        <p className="text-gray-500">No records found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#f3f3f3' }}>
                {['ID', 'Name', 'Category', 'Description', 'Price', 'Stock', 'Image'].map(h => (
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
                  <td className="px-4 py-3 text-sm border border-gray-200 text-gray-400">{f.imageFile || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
