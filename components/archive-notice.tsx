/**
 * Persistent disclaimer marking Floranica as archived coursework.
 * Deliberately not dismissible — it is a disclaimer, not a cookie banner.
 */
export function ArchiveNotice() {
  return (
    <div className="bg-petal-wash text-petal border-b border-petal/20">
      <p className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-1 px-5 py-2.5 text-[0.8125rem] leading-snug sm:px-8">
        <span className="eyebrow rounded-full bg-petal/12 px-2 py-0.5">Archived</span>
        <span>
          Floranica was built as an early university coursework project and is kept online as a
          portfolio piece. The company, its suppliers and all catalogue data are fictional.
        </span>
      </p>
    </div>
  )
}
