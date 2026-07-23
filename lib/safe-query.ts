import 'server-only'

/**
 * Wraps a database read so an unreachable database renders an honest notice
 * instead of a 500. Neon's free tier auto-suspends and this project is
 * archived, so an unavailable database is an expected state, not a crash.
 */
export type QueryResult<T> = { status: 'ok'; data: T } | { status: 'unavailable' }

export async function safeQuery<T>(run: () => Promise<T>): Promise<QueryResult<T>> {
  try {
    return { status: 'ok', data: await run() }
  } catch {
    return { status: 'unavailable' }
  }
}
