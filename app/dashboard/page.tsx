import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeading } from '@/components/admin/page-heading'

export const metadata: Metadata = { title: 'Overview' }

const SECTIONS = [
  {
    href: '/dashboard/manage',
    label: 'Manage flowers',
    desc: 'Create, update and delete records in the catalogue.',
  },
  {
    href: '/dashboard/records',
    label: 'Records',
    desc: 'Browse the full inventory, filtered by category.',
  },
  {
    href: '/dashboard/suppliers',
    label: 'Suppliers',
    desc: 'The register of growers and wholesalers.',
  },
  {
    href: '/dashboard/history',
    label: 'Login history',
    desc: 'Review admin sign-in activity across a date range.',
  },
] as const

export default function AdminPage() {
  return (
    <>
      <PageHeading
        eyebrow="Control panel"
        title="Overview"
        description="Choose a section to manage. Every change writes straight to the live catalogue."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {SECTIONS.map(section => (
          <Link
            key={section.href}
            href={section.href}
            className="group rounded-xl border border-line bg-surface p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-stem/40"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="display-md">{section.label}</h2>
              <span
                aria-hidden="true"
                className="text-stem opacity-0 transition-opacity duration-150 group-hover:opacity-100"
              >
                →
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{section.desc}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
