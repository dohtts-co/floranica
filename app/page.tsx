import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const flowers = await prisma.flower.findMany({ orderBy: { id: 'asc' } })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
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

      {/* Main */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-10 py-10">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#2d572c' }}>
          Welcome to Floranica Admin System
        </h2>
        <p className="text-gray-600 mb-4">
          Floranica is your trusted global flower distribution partner. Through our online admin system,
          you can efficiently manage flower inventories, supplier details, and order logistics for all
          five of our branches.
        </p>
        <p className="text-gray-600 mb-8">
          Use the navigation above to get started. From this dashboard, admins can view, add, update,
          or remove flower records, monitor supplier relationships, and manage customer orders.
        </p>

        {flowers.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#2d572c' }}>Our Flowers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {flowers.map(f => (
                <div key={f.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <p className="font-bold text-lg">{f.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{f.category}</p>
                  <p className="text-green-700 font-semibold mt-1">£{f.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-400">Stock: {f.stock}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#f1f1f1', borderTop: '1px solid #ddd' }}
        className="text-center py-4 text-sm text-gray-500">
        Copyright &copy; 2025 Floranica
      </footer>
    </div>
  )
}
