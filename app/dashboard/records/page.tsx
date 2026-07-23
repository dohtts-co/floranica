import type { Metadata } from 'next'
import type { Flower } from '@/app/generated/prisma/client'
import { getFlowers } from '@/lib/flowers'
import { DataTable, type Column } from '@/components/admin/data-table'
import { PageHeading, EmptyState, CategoryPills } from '@/components/admin/page-heading'
import { DatabaseNotice } from '@/components/database-notice'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Records' }

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
  {
    key: 'image',
    header: 'Image file',
    cell: f => f.imageFile || 'None set',
    nowrap: true,
    muted: true,
  },
  { key: 'id', header: 'Ref', cell: f => `#${f.id}`, nowrap: true, muted: true },
]

export default async function RecordsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const active = category ?? 'All'
  const result = await getFlowers(category)

  return (
    <>
      <PageHeading
        eyebrow="Inventory"
        title="Records"
        description="Every flower on the books, with the fields stored against each record."
      />

      <CategoryPills categories={CATEGORIES} active={active} basePath="/dashboard/records" />

      {result.status === 'unavailable' ? (
        <DatabaseNotice />
      ) : result.data.length === 0 ? (
        <EmptyState>
          No records match the {active === 'All' ? 'current filter' : `${active} category`}.
        </EmptyState>
      ) : (
        <>
          <p className="mb-4 text-sm text-ink-faint">
            {result.data.length} {result.data.length === 1 ? 'record' : 'records'}
          </p>
          <DataTable
            caption="Floranica flower records, showing name, category, description, price, stock, image file and reference"
            columns={COLUMNS}
            rows={result.data}
          />
        </>
      )}
    </>
  )
}
