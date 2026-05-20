import Link from 'next/link'

const LINKS = [
  { href: '/dashboard/manage', label: 'Manage Flowers', desc: 'Create, update, or delete flower records' },
  { href: '/dashboard/records', label: 'View Records', desc: 'Browse all flowers with category filter' },
  { href: '/dashboard/suppliers', label: 'Manage Suppliers', desc: 'View all supplier information' },
  { href: '/dashboard/history', label: 'Login History', desc: 'Review login activity with date filter' },
]

export default function AdminPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: '#2d572c' }}>Admin Dashboard</h2>
      <p className="text-gray-500 mb-8 text-sm">Welcome back. Choose a section to manage:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LINKS.map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="block p-5 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            style={{ borderLeft: '4px solid #7dcf91' }}
          >
            <p className="font-semibold text-lg" style={{ color: '#2d572c' }}>{label}</p>
            <p className="text-sm text-gray-500 mt-1">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
