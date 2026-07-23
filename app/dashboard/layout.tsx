import Link from 'next/link'
import { verifySession } from '@/lib/dal'
import { logout } from '@/app/actions/auth'
import { ArchiveNotice } from '@/components/archive-notice'
import { NavLink } from '@/components/nav-link'

const ADMIN_LINKS = [
  { href: '/dashboard', label: 'Overview', exact: true },
  { href: '/dashboard/manage', label: 'Manage flowers', exact: false },
  { href: '/dashboard/records', label: 'Records', exact: false },
  { href: '/dashboard/suppliers', label: 'Suppliers', exact: false },
  { href: '/dashboard/history', label: 'Login history', exact: false },
] as const

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await verifySession()

  return (
    <div className="flex min-h-screen flex-col">
      <ArchiveNotice />

      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
          <Link href="/dashboard" className="flex items-baseline gap-2 rounded-sm">
            <span className="font-display text-lg font-semibold tracking-tight">Floranica</span>
            <span className="eyebrow text-ink-faint">Control panel</span>
          </Link>

          <form action={logout} className="ml-auto">
            <button
              type="submit"
              className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors duration-150 hover:border-petal/50 hover:text-petal"
            >
              Log out
            </button>
          </form>
        </div>

        <nav
          aria-label="Admin sections"
          className="mx-auto flex max-w-6xl flex-wrap gap-1 px-3 pb-1 sm:px-6"
        >
          {ADMIN_LINKS.map(link => (
            <NavLink key={link.href} href={link.href} exact={link.exact}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8">{children}</main>

      <footer className="border-t border-line bg-sunk">
        <p className="mx-auto max-w-6xl px-5 py-6 text-sm text-ink-faint sm:px-8">
          © 2025 Floranica. A fictional company created for coursework.
        </p>
      </footer>
    </div>
  )
}
