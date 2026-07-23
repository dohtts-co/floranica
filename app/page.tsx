import Link from 'next/link'
import { SiteShell } from '@/components/site-shell'
import { DatabaseNotice } from '@/components/database-notice'
import { getFlowers } from '@/lib/flowers'

export const dynamic = 'force-dynamic'

const CAPABILITIES = [
  {
    title: 'Inventory',
    body: 'Add, edit and retire flower records across the catalogue, with stock levels and pricing held per stem.',
  },
  {
    title: 'Suppliers',
    body: 'Keep grower and wholesaler contact details in one register, linked to the stock they provide.',
  },
  {
    title: 'Access records',
    body: 'Every admin sign-in is written to a login history table, so account activity stays auditable.',
  },
] as const

export default async function Home() {
  const result = await getFlowers()
  const flowers = result.status === 'ok' ? result.data : []

  return (
    <SiteShell>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
        <p className="rise eyebrow text-stem" style={{ '--i': 0 } as React.CSSProperties}>
          Flower distribution, five branches
        </p>
        <h1
          className="rise display-xl mt-5 max-w-4xl text-balance"
          style={{ '--i': 1 } as React.CSSProperties}
        >
          Every stem accounted for, from grower to branch.
        </h1>
        <p
          className="rise mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          style={{ '--i': 2 } as React.CSSProperties}
        >
          Floranica is an admin system for managing flower inventory, supplier relationships and
          order logistics across a distribution network.
        </p>
        <div className="rise mt-9 flex flex-wrap gap-3" style={{ '--i': 3 } as React.CSSProperties}>
          <Link
            href="/flowers"
            className="rounded-full bg-stem px-6 py-3 text-sm font-medium text-paper transition-colors duration-150 hover:bg-stem-hover"
          >
            Browse the catalogue
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors duration-150 hover:border-ink-faint"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {CAPABILITIES.map(item => (
            <article key={item.title} className="bg-surface p-7">
              <h2 className="display-md">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Catalogue preview */}
      <section className="mx-auto max-w-6xl px-5 pt-24 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-stem">In stock</p>
            <h2 className="display-lg mt-2">Selected stems</h2>
          </div>
          <Link
            href="/flowers"
            className="rounded-sm text-sm font-medium text-stem transition-colors hover:text-stem-hover"
          >
            View the full catalogue →
          </Link>
        </div>

        <div className="mt-8">
          {result.status === 'unavailable' ? (
            <DatabaseNotice />
          ) : flowers.length === 0 ? (
            <p className="rounded-xl border border-line bg-surface px-6 py-10 text-center text-sm text-ink-soft">
              No flowers have been added to the catalogue yet.
            </p>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {flowers.slice(0, 6).map(flower => (
                <li
                  key={flower.id}
                  className="rounded-xl border border-line bg-surface p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-stem/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="display-md">{flower.name}</h3>
                    <span className="shrink-0 rounded-full bg-stem-wash px-2.5 py-1 text-xs font-medium text-stem">
                      {flower.category}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{flower.description}</p>
                  <div className="mt-5 flex items-baseline justify-between border-t border-line-soft pt-4">
                    <span className="font-display text-xl font-semibold">
                      £{flower.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-ink-faint">{flower.stock} in stock</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </SiteShell>
  )
}
