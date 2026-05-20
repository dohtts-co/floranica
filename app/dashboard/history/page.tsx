import { prisma } from '@/lib/prisma'

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

  const history = await prisma.loginHistory.findMany({
    where,
    orderBy: { loginTime: 'desc' },
  })

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#2d572c' }}>Login History</h2>

      {/* Date filter form */}
      <form className="flex gap-4 items-end mb-6 flex-wrap">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            name="start"
            defaultValue={start ?? ''}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            name="end"
            defaultValue={end ?? ''}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-md text-white font-medium text-sm"
          style={{ backgroundColor: '#7dcf91' }}
        >
          Filter
        </button>
        <a href="/dashboard/history" className="text-sm text-gray-500 underline self-center">Clear</a>
      </form>

      {history.length === 0 ? (
        <p className="text-gray-500">No login records found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#f3f3f3' }}>
                {['Username', 'Full Name', 'Login Time', 'IP Address'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-sm font-semibold border border-gray-200">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map(h => (
                <tr key={h.id} className="hover:bg-gray-50 border-t border-gray-100">
                  <td className="px-4 py-3 text-sm border border-gray-200">{h.username}</td>
                  <td className="px-4 py-3 text-sm border border-gray-200">{h.fullName ?? '—'}</td>
                  <td className="px-4 py-3 text-sm border border-gray-200">
                    {new Date(h.loginTime).toLocaleString('en-GB')}
                  </td>
                  <td className="px-4 py-3 text-sm border border-gray-200 text-gray-400">{h.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
