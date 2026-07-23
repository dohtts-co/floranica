import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-sunk">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-semibold tracking-tight">Floranica</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              A flower distribution and inventory admin system, built as university coursework and
              rebuilt here as an archived portfolio piece.
            </p>
          </div>

          <div>
            <p className="eyebrow text-ink-faint">Built with</p>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
              <li>Next.js 16 · React 19</li>
              <li>Prisma · PostgreSQL on Neon</li>
              <li>Tailwind CSS v4</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line-soft pt-6 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Floranica. A fictional company created for coursework.</p>
          <Link href="/login" className="rounded-sm transition-colors hover:text-ink">
            Admin access
          </Link>
        </div>
      </div>
    </footer>
  )
}
