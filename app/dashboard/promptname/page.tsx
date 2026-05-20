'use client'

import { useActionState } from 'react'
import { saveFullName } from '@/app/actions/flowers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PromptNamePage() {
  const router = useRouter()
  const [state, action, pending] = useActionState(
    async (_prev: { error?: string; done?: boolean } | undefined, fd: FormData) => {
      const result = await saveFullName(fd)
      if (result?.error) return result
      return { done: true }
    },
    undefined
  )

  useEffect(() => {
    if (state && 'done' in state && state.done) router.push('/dashboard')
  }, [state, router])

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#fff8f4' }}>
      <div className="bg-white border border-gray-200 rounded-xl p-10 w-full max-w-sm shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-center" style={{ color: '#2d572c' }}>
          Welcome!
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please enter your full name to continue.
        </p>

        <form action={action} className="flex flex-col gap-4">
          <input type="hidden" name="username" value="" />
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              name="fullName"
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {state && 'error' in state && state.error && <p className="text-red-600 text-sm">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="w-full py-2 rounded-md font-semibold text-white disabled:opacity-60"
            style={{ backgroundColor: '#7dcf91' }}
          >
            {pending ? 'Saving…' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}
