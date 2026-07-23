export function DatabaseNotice() {
  return (
    <div className="rounded-xl border border-line bg-surface px-6 py-10 text-center">
      <p className="display-md">The catalogue is resting</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
        This project runs on a free-tier database that suspends itself when idle, so the flower
        records are not reachable right now. Everything else on the page is live.
      </p>
    </div>
  )
}
