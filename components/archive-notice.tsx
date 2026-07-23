import { CONTACT_EMAIL, MAILTO } from '@/lib/contact'

/**
 * Persistent disclaimer marking Floranica as archived coursework, plus an
 * invitation to request access. Deliberately not dismissible — it is a
 * disclaimer, not a cookie banner.
 */
export function ArchiveNotice() {
  return (
    <div className="border-b border-petal/20 bg-petal-wash text-petal">
      <div className="mx-auto flex max-w-6xl flex-col gap-1.5 px-5 py-2.5 text-[0.8125rem] leading-snug sm:px-8">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="eyebrow rounded-full bg-petal/12 px-2 py-0.5">Archived</span>
          <span>
            Floranica was built as an early university coursework project and is kept online as a
            portfolio piece. The company, its suppliers and all catalogue data are fictional.
          </span>
        </p>
        <p>
          Want to try the admin panel?{' '}
          <a href={MAILTO} className="rounded-sm font-medium underline underline-offset-2">
            Email {CONTACT_EMAIL}
          </a>{' '}
          and I will send you sign-in details.
        </p>
      </div>
    </div>
  )
}
