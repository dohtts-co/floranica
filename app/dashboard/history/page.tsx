import type { Metadata } from 'next'
import type { LoginHistory } from '@/app/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { safeQuery } from '@/lib/safe-query'
import { DataTable, type Column } from '@/components/admin/data-table'
import { PageHeading, EmptyState } from '@/components/admin/page-heading'
import { DatabaseNotice } from '@/components/database-notice'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Login history' }

const FIELD =
  'rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink transition-colors duration-150 hover:border-ink-faint focus:border-stem focus:outline-none'

const COLUMNS: ReadonlyArray<Column<LoginHistory>> = [
  { key: 'username', header: 'Username', cell: h => h.username, rowHeader: true, nowrap: true },
  { key: 'fullName', header: 'Full name', cell: h => h.fullName ?? 'Not recorded' },
  {
    key: 'loginTime',
    header: 'Login time',
    cell: h => new Date(h.loginTime).toLocaleString('en-GB'),
    nowrap: true,
  },
  { key: 'ip', header: 'IP address', cell: h => h.ipAddress, nowrap: true, muted: true },
]

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ start?: string; end?: string }>
}) {
  const { start, end } = await searchParams

  const where =
    start && end
      ? {
          loginTime: {
            gte: new Date(start),
            lte: new Date(new Date(end).setHours(23, 59, 59, 999)),
          },
        }
      : {}

  const result = await safeQuery(() =>
    prisma.loginHistory.findMany({ where, orderBy: { loginTime: 'desc' } })
  )

  return (
    <>
      <PageHeading
        eyebrow="Audit"
        title="Login history"
        description="Every admin sign-in, newest first. Narrow the list to a date range below."
      />

      <form className="mb-8 flex flex-wrap items-end gap-4 rounded-xl border border-line bg-surface p-5">
        <div>
          <label htmlFor="start" className="mb-1.5 block text-sm font-medium">
            Start date
          </label>
          <input id="start" type="date" name="start" defaultValue={start ?? ''} className={FIELD} />
        </div>
        <div>
          <label htmlFor="end" className="mb-1.5 block text-sm font-medium">
            End date
          </label>
          <input id="end" type="date" name="end" defaultValue={end ?? ''} className={FIELD} />
        </div>
        <button
          type="submit"
          className="rounded-full bg-stem px-5 py-2.5 text-sm font-medium text-paper transition-colors duration-150 hover:bg-stem-hover"
        >
          Apply filter
        </button>
        <a
          href="/dashboard/history"
          className="rounded-sm py-2.5 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          Clear
        </a>
      </form>

      {result.status === 'unavailable' ? (
        <DatabaseNotice />
      ) : result.data.length === 0 ? (
        <EmptyState>
          No sign-ins recorded{start && end ? ' in the selected date range' : ' yet'}.
        </EmptyState>
      ) : (
        <>
          <p className="mb-4 text-sm text-ink-faint">
            {result.data.length} {result.data.length === 1 ? 'sign-in' : 'sign-ins'}
          </p>
          <DataTable
            caption="Floranica admin login history, showing username, full name, login time and IP address"
            columns={COLUMNS}
            rows={result.data}
          />
        </>
      )}
    </>
  )
}
