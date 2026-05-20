'use client'

import { useState, useTransition } from 'react'
import { createFlower, updateFlower, deleteFlower } from '@/app/actions/flowers'

type Flower = { id: number; name: string; description: string; price: number; imageFile: string; category: string; stock: number }

const CATEGORIES = ['Rose', 'Tulip', 'Lily', 'Orchid', 'Sunflower', 'Other']

const empty = (): Omit<Flower, 'id'> => ({ name: '', description: '', price: 0, imageFile: '', category: 'Rose', stock: 0 })

export default function ManagePage() {
  const [flowers, setFlowers] = useState<Flower[]>([])
  const [selected, setSelected] = useState<Flower | null>(null)
  const [form, setForm] = useState(empty())
  const [status, setStatus] = useState('')
  const [isPending, startTransition] = useTransition()

  function loadFlower(f: Flower) {
    setSelected(f)
    setForm({ name: f.name, description: f.description, price: f.price, imageFile: f.imageFile, category: f.category, stock: f.stock })
    setStatus('')
  }

  function clearForm() {
    setSelected(null)
    setForm(empty())
    setStatus('')
  }

  function buildFormData(extra?: Record<string, string>) {
    const fd = new FormData()
    Object.entries({ ...form, ...extra }).forEach(([k, v]) => fd.set(k, String(v)))
    return fd
  }

  function handleCreate() {
    startTransition(async () => {
      const fd = buildFormData()
      await createFlower(fd)
      setStatus('✅ Flower created successfully.')
      clearForm()
    })
  }

  function handleUpdate() {
    if (!selected) return
    startTransition(async () => {
      const fd = buildFormData({ id: String(selected.id) })
      await updateFlower(fd)
      setStatus('✅ Flower updated.')
      clearForm()
    })
  }

  function handleDelete() {
    if (!selected) return
    startTransition(async () => {
      const fd = new FormData()
      fd.set('id', String(selected.id))
      await deleteFlower(fd)
      setStatus('🗑️ Flower deleted.')
      clearForm()
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#2d572c' }}>Manage Flowers</h2>

      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm max-w-lg mx-auto">
        {/* Flower selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Load existing flower (optional)</label>
          <input
            type="number"
            placeholder="Enter flower ID to load"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            onKeyDown={async e => {
              if (e.key === 'Enter') {
                const id = parseInt((e.target as HTMLInputElement).value)
                const res = await fetch(`/api/flowers/${id}`)
                if (res.ok) { const f = await res.json(); loadFlower(f) }
                else setStatus('❌ Flower not found.')
              }
            }}
          />
          <p className="text-xs text-gray-400 mt-1">Press Enter to load. Leave blank to create new.</p>
        </div>

        <hr className="my-4" />

        {/* Form fields */}
        {[
          { label: 'Flower Name', name: 'name', type: 'text' },
          { label: 'Description', name: 'description', type: 'text' },
          { label: 'Price (£)', name: 'price', type: 'number' },
          { label: 'Image File', name: 'imageFile', type: 'text' },
          { label: 'Stock', name: 'stock', type: 'number' },
        ].map(({ label, name, type }) => (
          <div key={name} className="mb-3">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              value={(form as Record<string, unknown>)[name] as string}
              onChange={e => setForm(f => ({ ...f, [name]: type === 'number' ? Number(e.target.value) : e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {status && <p className="mb-3 text-sm font-medium">{status}</p>}

        <div className="flex gap-3 flex-wrap">
          <button onClick={handleCreate} disabled={isPending}
            className="px-4 py-2 rounded-md text-white font-medium text-sm disabled:opacity-60"
            style={{ backgroundColor: '#7dcf91' }}>
            Create
          </button>
          <button onClick={handleUpdate} disabled={isPending || !selected}
            className="px-4 py-2 rounded-md text-white font-medium text-sm disabled:opacity-60"
            style={{ backgroundColor: '#4a90d9' }}>
            Update
          </button>
          <button onClick={handleDelete} disabled={isPending || !selected}
            className="px-4 py-2 rounded-md text-white font-medium text-sm disabled:opacity-60"
            style={{ backgroundColor: '#e74c3c' }}>
            Delete
          </button>
          <button onClick={clearForm}
            className="px-4 py-2 rounded-md font-medium text-sm border border-gray-300 text-gray-600">
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}
