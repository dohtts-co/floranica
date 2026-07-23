export type Column<T> = {
  /** Stable key for React reconciliation */
  key: string
  header: string
  cell: (row: T) => React.ReactNode
  /** Render as <th scope="row"> — use for the column that identifies the row */
  rowHeader?: boolean
  nowrap?: boolean
  muted?: boolean
}

/**
 * One table implementation for every admin view. Replaces four hand-rolled
 * tables that each drew a border on every cell.
 */
export function DataTable<T extends { id: number }>({
  caption,
  columns,
  rows,
}: {
  caption: string
  columns: ReadonlyArray<Column<T>>
  rows: readonly T[]
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line">
            {columns.map(col => (
              <th
                key={col.key}
                scope="col"
                className="eyebrow px-5 py-4 text-ink-faint first:pl-6 last:pr-6"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr
              key={row.id}
              className="border-b border-line-soft transition-colors duration-150 last:border-0 hover:bg-stem-wash/50"
            >
              {columns.map(col => {
                const classes = [
                  'px-5 py-4 first:pl-6 last:pr-6',
                  col.nowrap ? 'whitespace-nowrap' : '',
                  col.muted ? 'text-ink-faint' : '',
                ]
                  .filter(Boolean)
                  .join(' ')

                return col.rowHeader ? (
                  <th
                    key={col.key}
                    scope="row"
                    className={`${classes} font-display text-base font-semibold`}
                  >
                    {col.cell(row)}
                  </th>
                ) : (
                  <td key={col.key} className={`${classes} text-sm`}>
                    {col.cell(row)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
