import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { ContactForm } from '@/components/contact-form'
import { CONTACT_EMAIL, MAILTO } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Floranica distribution team.',
}

const BRANCHES = [
  { city: 'Manchester', role: 'Head office and northern distribution' },
  { city: 'Bristol', role: 'South-west branch and cold storage' },
  { city: 'Glasgow', role: 'Scottish branch and grower liaison' },
] as const

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
        <p className="eyebrow text-stem">Contact</p>
        <h1 className="display-lg mt-2 max-w-2xl text-balance">
          Questions about stock, supply or access?
        </h1>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <ContactForm />
          </div>

          <aside className="lg:border-l lg:border-line lg:pl-10">
            <h2 className="eyebrow text-ink-faint">Branches</h2>
            <ul className="mt-4 space-y-5">
              {BRANCHES.map(branch => (
                <li key={branch.city}>
                  <p className="font-display text-lg font-semibold">{branch.city}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{branch.role}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-line-soft pt-6">
              <h2 className="eyebrow text-ink-faint">Want to test the project?</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                The form above is a demonstration and goes nowhere. To reach me properly, or to get
                sign-in details for the admin panel, email me directly.
              </p>
              <a
                href={MAILTO}
                className="mt-3 inline-block rounded-sm text-sm font-medium text-stem transition-colors hover:text-stem-hover"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mt-6 text-sm leading-relaxed text-ink-faint">
                These branches are fictional, invented for the coursework brief this project was
                built against.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  )
}
