'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'

const FIELD =
  'w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink transition-colors duration-150 hover:border-ink-faint focus:border-stem focus:outline-none'

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <form action={action} className="flex flex-col gap-5">
      <div>
        <label htmlFor="username" className="mb-1.5 block text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className={FIELD}
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={FIELD}
        />
      </div>

      {state?.error && (
        <p role="alert" className="rounded-lg bg-petal-wash px-3.5 py-2.5 text-sm text-petal">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="rounded-full bg-stem px-6 py-3 text-sm font-medium text-paper transition-colors duration-150 hover:bg-stem-hover disabled:opacity-60"
      >
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
