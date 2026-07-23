import Link from 'next/link'
import { NavLink } from '@/components/nav-link'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/flowers', label: 'Catalogue' },
  { href: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="group flex items-baseline gap-2 rounded-sm"
          aria-label="Floranica home"
        >
          <span className="font-display text-xl font-semibold tracking-tight">Floranica</span>
          <span className="hidden text-[0.6875rem] text-ink-faint sm:inline">est. 2025</span>
        </Link>

        <nav className="ml-auto flex items-center gap-1 sm:gap-2">
          {LINKS.map(link => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
          <Link
            href="/login"
            className="ml-1 rounded-full bg-stem px-4 py-2 text-sm font-medium text-paper transition-colors duration-150 hover:bg-stem-hover sm:ml-2"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  )
}
