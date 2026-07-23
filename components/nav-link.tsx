'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * The client boundary sits here rather than on the headers that use it, so
 * those stay Server Components — only the active-state check needs JS.
 *
 * Section roots ('/', '/dashboard') must match exactly, otherwise every
 * child route would light them up too.
 */
export function NavLink({
  href,
  exact = false,
  children,
}: {
  href: string
  exact?: boolean
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const active = exact || href === '/' ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`relative rounded-sm px-2.5 py-2 text-sm transition-colors duration-150 sm:px-3 ${
        active ? 'text-ink' : 'text-ink-soft hover:text-ink'
      }`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`absolute inset-x-2.5 bottom-0 h-px bg-stem transition-opacity duration-150 sm:inset-x-3 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </Link>
  )
}
