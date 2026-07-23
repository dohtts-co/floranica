'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { saveFullName } from '@/app/actions/flowers'

type State = { error?: string; done?: boolean } | undefined

export function FullNameForm() {
  const router = useRouter()

  const [state, action, pending] = useActionState<State, FormData>(async (_prev, formData) => {
    const result = await saveFullName(formData)
    if (result?.error) return result
    return { done: true }
  }, undefined)

  useEffect(() => {
    if (state?.done) router.push('/dashboard')
  }, [state, router])

  return (
    <form action={action} className="flex flex-col gap-5">
      <input type="hidden" name="username" value="" />

      <div>
        <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink transition-colors duration-150 hover:border-ink-faint focus:border-stem focus:outline-none"
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
        {pending ? 'Saving…' : 'Continue'}
      </button>
    </form>
  )
}
