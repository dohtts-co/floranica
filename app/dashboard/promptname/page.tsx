import type { Metadata } from 'next'
import { FullNameForm } from '@/components/full-name-form'

export const metadata: Metadata = { title: 'Your details' }

export default function PromptNamePage() {
  return (
    <div className="mx-auto max-w-sm py-10">
      <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
        <p className="eyebrow text-stem">First sign-in</p>
        <h1 className="display-md mt-2">Tell us your name</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Your full name is recorded against each sign-in in the login history.
        </p>

        <div className="mt-8">
          <FullNameForm />
        </div>
      </div>
    </div>
  )
}
