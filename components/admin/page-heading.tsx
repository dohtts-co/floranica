export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <header className="mb-8">
      <p className="eyebrow text-stem">{eyebrow}</p>
      <h1 className="display-lg mt-2">{title}</h1>
      {description && (
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{description}</p>
      )}
    </header>
  )
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-line bg-surface px-6 py-12 text-center text-sm text-ink-soft">
      {children}
    </p>
  )
}

export function CategoryPills({
  categories,
  active,
  basePath,
}: {
  categories: readonly string[]
  active: string
  basePath: string
}) {
  return (
    <nav aria-label="Filter by category" className="mb-6 flex flex-wrap gap-2">
      {categories.map(cat => {
        const isActive = active === cat
        return (
          <a
            key={cat}
            href={cat === 'All' ? basePath : `${basePath}?category=${cat}`}
            aria-current={isActive ? 'true' : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
              isActive
                ? 'border-stem bg-stem text-paper'
                : 'border-line text-ink-soft hover:border-ink-faint hover:text-ink'
            }`}
          >
            {cat}
          </a>
        )
      })}
    </nav>
  )
}
