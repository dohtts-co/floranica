'use client'

import { useState, useTransition } from 'react'
import { createFlower, updateFlower, deleteFlower } from '@/app/actions/flowers'

type Flower = {
  id: number
  name: string
  description: string
  price: number
  imageFile: string
  category: string
  stock: number
}

type Status = { tone: 'success' | 'error'; message: string } | null

const CATEGORIES = ['Rose', 'Tulip', 'Lily', 'Orchid', 'Sunflower', 'Other'] as const

const FIELDS = [
  { label: 'Flower name', name: 'name', type: 'text' },
  { label: 'Description', name: 'description', type: 'text' },
  { label: 'Price (£)', name: 'price', type: 'number' },
  { label: 'Image file', name: 'imageFile', type: 'text' },
  { label: 'Stock', name: 'stock', type: 'number' },
] as const

const FIELD =
  'w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink transition-colors duration-150 hover:border-ink-faint focus:border-stem focus:outline-none'

const empty = (): Omit<Flower, 'id'> => ({
  name: '',
  description: '',
  price: 0,
  imageFile: '',
  category: 'Rose',
  stock: 0,
})

export default function ManagePage() {
  const [selected, setSelected] = useState<Flower | null>(null)
  const [form, setForm] = useState(empty())
  const [status, setStatus] = useState<Status>(null)
  const [isPending, startTransition] = useTransition()

  function loadFlower(flower: Flower) {
    setSelected(flower)
    setForm({
      name: flower.name,
      description: flower.description,
      price: flower.price,
      imageFile: flower.imageFile,
      category: flower.category,
      stock: flower.stock,
    })
    setStatus(null)
  }

  function clearForm() {
    setSelected(null)
    setForm(empty())
    setStatus(null)
  }

  function buildFormData(extra?: Record<string, string>) {
    const fd = new FormData()
    Object.entries({ ...form, ...extra }).forEach(([key, value]) => fd.set(key, String(value)))
    return fd
  }

  function handleCreate() {
    startTransition(async () => {
      await createFlower(buildFormData())
      clearForm()
      setStatus({ tone: 'success', message: 'Flower created.' })
    })
  }

  function handleUpdate() {
    if (!selected) return
    startTransition(async () => {
      await updateFlower(buildFormData({ id: String(selected.id) }))
      clearForm()
      setStatus({ tone: 'success', message: 'Flower updated.' })
    })
  }

  function handleDelete() {
    if (!selected) return
    startTransition(async () => {
      const fd = new FormData()
      fd.set('id', String(selected.id))
      await deleteFlower(fd)
      clearForm()
      setStatus({ tone: 'success', message: 'Flower deleted.' })
    })
  }

  return (
    <>
      <header className="mb-8">
        <p className="eyebrow text-stem">Inventory</p>
        <h1 className="display-lg mt-2">Manage flowers</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
          Load an existing record by reference to edit or delete it, or leave the field blank to
          create a new one.
        </p>
      </header>

      <div className="max-w-xl rounded-2xl border border-line bg-surface p-6 sm:p-8">
        {/* Load by reference */}
        <div>
          <label htmlFor="load-ref" className="mb-1.5 block text-sm font-medium">
            Load existing flower
          </label>
          <input
            id="load-ref"
            type="number"
            placeholder="Enter a flower reference"
            className={FIELD}
            onKeyDown={async event => {
              if (event.key !== 'Enter') return
              event.preventDefault()
              const id = parseInt((event.target as HTMLInputElement).value, 10)
              if (Number.isNaN(id)) {
                setStatus({ tone: 'error', message: 'Enter a numeric reference.' })
                return
              }
              try {
                const res = await fetch(`/api/flowers/${id}`)
                if (!res.ok) {
                  setStatus({ tone: 'error', message: `No flower found with reference ${id}.` })
                  return
                }
                loadFlower(await res.json())
              } catch {
                setStatus({ tone: 'error', message: 'Could not reach the database.' })
              }
            }}
          />
          <p className="mt-1.5 text-xs text-ink-faint">
            Press Enter to load. Leave blank to create a new record.
          </p>
        </div>

        <div className="my-6 border-t border-line-soft" />

        {selected && (
          <p className="mb-5 rounded-lg bg-stem-wash px-3.5 py-2.5 text-sm text-stem">
            Editing <span className="font-semibold">{selected.name}</span> (reference #
            {selected.id}).
          </p>
        )}

        {/* Fields */}
        <div className="flex flex-col gap-4">
          {FIELDS.map(({ label, name, type }) => (
            <div key={name}>
              <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
                {label}
              </label>
              <input
                id={name}
                type={type}
                value={form[name]}
                onChange={event =>
                  setForm(prev => ({
                    ...prev,
                    [name]: type === 'number' ? Number(event.target.value) : event.target.value,
                  }))
                }
                className={FIELD}
              />
            </div>
          ))}

          <div>
            <label htmlFor="category" className="mb-1.5 block text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              value={form.category}
              onChange={event => setForm(prev => ({ ...prev, category: event.target.value }))}
              className={FIELD}
            >
              {CATEGORIES.map(category => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {status && (
          <p
            role="status"
            className={`mt-5 rounded-lg px-3.5 py-2.5 text-sm ${
              status.tone === 'success' ? 'bg-stem-wash text-stem' : 'bg-petal-wash text-petal'
            }`}
          >
            {status.message}
          </p>
        )}

        {/* Actions */}
        <div className="mt-7 flex flex-wrap gap-3 border-t border-line-soft pt-6">
          <button
            type="button"
            onClick={handleCreate}
            disabled={isPending}
            aria-busy={isPending}
            className="rounded-full bg-stem px-5 py-2.5 text-sm font-medium text-paper transition-colors duration-150 hover:bg-stem-hover disabled:opacity-60"
          >
            Create
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            disabled={isPending || !selected}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors duration-150 hover:border-ink-faint disabled:opacity-40"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending || !selected}
            className="rounded-full border border-petal/40 px-5 py-2.5 text-sm font-medium text-petal transition-colors duration-150 hover:bg-petal hover:text-paper disabled:opacity-40"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="ml-auto rounded-sm px-2 py-2.5 text-sm text-ink-soft transition-colors duration-150 hover:text-ink"
          >
            Clear
          </button>
        </div>
      </div>
    </>
  )
}
