'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#fff8f4' }}>
      <div className="bg-white border border-gray-200 rounded-xl p-10 w-full max-w-sm shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: '#2d572c' }}>Floranica Login</h1>
          <p className="text-sm text-gray-500 mt-1">Admin access only</p>
        </div>

        <form action={action} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ focusRingColor: '#7dcf91' } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          {state?.error && (
            <p className="text-red-600 text-sm">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full py-2 rounded-md font-semibold text-white transition-colors disabled:opacity-60"
            style={{ backgroundColor: '#7dcf91' }}
          >
            {pending ? 'Logging in…' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  )
}
