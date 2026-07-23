import type { Metadata } from 'next'
import type { Flower } from '@/app/generated/prisma/client'
import { SiteShell } from '@/components/site-shell'
import { DatabaseNotice } from '@/components/database-notice'
import { DataTable, type Column } from '@/components/admin/data-table'
import { EmptyState, CategoryPills } from '@/components/admin/page-heading'
import { getFlowers } from '@/lib/flowers'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catalogue',
  description: 'The full Floranica flower catalogue, filterable by category.',
}

const CATEGORIES = ['All', 'Rose', 'Tulip', 'Lily', 'Orchid', 'Sunflower', 'Other'] as const

const COLUMNS: ReadonlyArray<Column<Flower>> = [
  { key: 'name', header: 'Name', cell: f => f.name, rowHeader: true, nowrap: true },
  {
    key: 'category',
    header: 'Category',
    cell: f => (
      <span className="rounded-full bg-stem-wash px-2.5 py-1 text-xs font-medium text-stem">
        {f.category}
      </span>
    ),
    nowrap: true,
  },
  { key: 'description', header: 'Description', cell: f => f.description },
  { key: 'price', header: 'Price', cell: f => `£${f.price.toFixed(2)}`, nowrap: true },
  { key: 'stock', header: 'Stock', cell: f => f.stock, nowrap: true },
]

export default async function FlowersPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const active = category ?? 'All'
  const result = await getFlowers(category)

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
        <p className="eyebrow text-stem">Catalogue</p>
        <h1 className="display-lg mt-2">Every stem on the books</h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          The complete inventory across all five branches. Filter by category to narrow the list.
        </p>

        <div className="mt-8">
          <CategoryPills categories={CATEGORIES} active={active} basePath="/flowers" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-4 sm:px-8">
        {result.status === 'unavailable' ? (
          <DatabaseNotice />
        ) : result.data.length === 0 ? (
          <EmptyState>
            No flowers match the {active === 'All' ? 'current filter' : `${active} category`}.
          </EmptyState>
        ) : (
          <>
            <p className="mb-4 text-sm text-ink-faint">
              {result.data.length} {result.data.length === 1 ? 'record' : 'records'}
            </p>
            <DataTable
              caption="Floranica flower catalogue, showing name, category, description, price and stock level"
              columns={COLUMNS}
              rows={result.data}
            />
          </>
        )}
      </section>
    </SiteShell>
  )
}
