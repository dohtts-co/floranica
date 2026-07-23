import type { Metadata } from 'next'
import type { Supplier } from '@/app/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { safeQuery } from '@/lib/safe-query'
import { DataTable, type Column } from '@/components/admin/data-table'
import { PageHeading, EmptyState } from '@/components/admin/page-heading'
import { DatabaseNotice } from '@/components/database-notice'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Suppliers' }

const COLUMNS: ReadonlyArray<Column<Supplier>> = [
  { key: 'name', header: 'Supplier', cell: s => s.name, rowHeader: true, nowrap: true },
  {
    key: 'email',
    header: 'Contact email',
    cell: s => (
      <a href={`mailto:${s.contactEmail}`} className="rounded-sm text-stem hover:underline">
        {s.contactEmail}
      </a>
    ),
  },
  { key: 'phone', header: 'Phone', cell: s => s.phoneNumber, nowrap: true },
  { key: 'id', header: 'Ref', cell: s => `#${s.id}`, nowrap: true, muted: true },
]

export default async function SuppliersPage() {
  const result = await safeQuery(() => prisma.supplier.findMany({ orderBy: { id: 'asc' } }))

  return (
    <>
      <PageHeading
        eyebrow="Register"
        title="Suppliers"
        description="Growers and wholesalers supplying the five branches."
      />

      {result.status === 'unavailable' ? (
        <DatabaseNotice />
      ) : result.data.length === 0 ? (
        <EmptyState>No suppliers have been added yet.</EmptyState>
      ) : (
        <DataTable
          caption="Floranica suppliers, showing name, contact email, phone number and reference"
          columns={COLUMNS}
          rows={result.data}
        />
      )}
    </>
  )
}
