'use client'

import { useState } from 'react'

const FIELD =
  'w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink transition-colors duration-150 placeholder:text-ink-faint hover:border-ink-faint focus:border-stem focus:outline-none'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-xl border border-stem/30 bg-stem-wash px-6 py-8 text-center"
      >
        <p className="display-md text-stem">Thanks for trying the form</p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          Nothing was actually sent. Floranica is a fictional company from a coursework project, so
          this form demonstrates the interaction without a mail server behind it.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 rounded-full border border-stem/40 px-5 py-2 text-sm font-medium text-stem transition-colors duration-150 hover:bg-stem hover:text-paper"
        >
          Reset the form
        </button>
      </div>
    )
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={event => {
        event.preventDefault()
        setSent(true)
      }}
    >
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input id="name" name="name" type="text" required autoComplete="name" className={FIELD} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={FIELD}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className={`${FIELD} resize-y`} />
      </div>

      <button
        type="submit"
        className="rounded-full bg-stem px-6 py-3 text-sm font-medium text-paper transition-colors duration-150 hover:bg-stem-hover"
      >
        Send message
      </button>
    </form>
  )
}
