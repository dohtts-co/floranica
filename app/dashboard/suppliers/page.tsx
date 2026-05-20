import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function SuppliersPage() {
  const suppliers = await prisma.supplier.findMany({ orderBy: { id: 'asc' } })

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#2d572c' }}>Manage Suppliers</h2>

      {suppliers.length === 0 ? (
        <p className="text-gray-500">No suppliers found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#f3f3f3' }}>
                {['ID', 'Supplier Name', 'Contact Email', 'Phone Number'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-sm font-semibold border border-gray-200">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {suppliers.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 border-t border-gray-100">
                  <td className="px-4 py-3 text-sm border border-gray-200">{s.id}</td>
                  <td className="px-4 py-3 text-sm font-medium border border-gray-200">{s.name}</td>
                  <td className="px-4 py-3 text-sm border border-gray-200">{s.contactEmail}</td>
                  <td className="px-4 py-3 text-sm border border-gray-200">{s.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
