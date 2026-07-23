import type { Metadata } from 'next'
import Link from 'next/link'
import { ArchiveNotice } from '@/components/archive-notice'
import { LoginForm } from '@/components/login-form'

export const metadata: Metadata = {
  title: 'Admin sign in',
  description: 'Sign in to the Floranica administration panel.',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ArchiveNotice />

      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-line bg-surface p-8 shadow-sm sm:p-10">
            <p className="eyebrow text-stem">Floranica</p>
            <h1 className="display-md mt-2">Admin sign in</h1>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              The control panel manages inventory, suppliers and access records.
            </p>

            <div className="mt-8">
              <LoginForm />
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-ink-faint">
            <Link href="/" className="rounded-sm transition-colors hover:text-ink">
              ← Back to the site
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
