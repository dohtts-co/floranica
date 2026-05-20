import Link from 'next/link'
import Image from 'next/image'
import { verifySession } from '@/lib/dal'
import { logout } from '@/app/actions/auth'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await verifySession()

  return (
    <div className="flex flex-col min-h-screen">
      <header style={{ backgroundColor: '#e3f2e1', borderBottom: '2px solid #b7d7b0' }}
        className="px-6 py-4 flex items-center gap-4 flex-wrap">
        <Link href="/dashboard">
          <Image src="/flowers-icon.png" alt="Floranica Logo" width={50} height={50} />
        </Link>
        <h1 style={{ color: '#2d572c' }} className="text-xl font-bold flex-1">
          Floranica Backend Control Panel
        </h1>
        <nav className="flex gap-4 flex-wrap items-center text-sm">
          {[
            ['/dashboard', 'Admin Home'],
            ['/dashboard/manage', 'Manage Flowers'],
            ['/dashboard/records', 'View Records'],
            ['/dashboard/suppliers', 'Suppliers'],
            ['/dashboard/history', 'Login History'],
          ].map(([href, label]) => (
            <Link key={href} href={href} style={{ color: '#3d8045' }} className="font-semibold hover:underline">
              {label}
            </Link>
          ))}
          <form action={logout}>
            <button type="submit" className="font-semibold hover:underline" style={{ color: '#c0392b' }}>
              Log Out
            </button>
          </form>
        </nav>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-8">
        {children}
      </main>

      <footer style={{ backgroundColor: '#f1f1f1', borderTop: '1px solid #ddd' }}
        className="text-center py-4 text-sm text-gray-500">
        &copy; 2025 Floranica
      </footer>
    </div>
  )
}
