import { ArchiveNotice } from '@/components/archive-notice'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

/**
 * Single source of truth for public page chrome. Previously the header and
 * footer were copy-pasted into every page file.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
      >
        Skip to main content
      </a>
      <ArchiveNotice />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
