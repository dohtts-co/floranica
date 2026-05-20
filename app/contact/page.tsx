'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <header style={{ backgroundColor: '#e3f2e1', borderBottom: '2px solid #b7d7b0' }}
        className="px-6 py-4 flex items-center gap-4">
        <Image src="/flowers-icon.png" alt="Floranica Logo" width={50} height={50} />
        <h1 style={{ color: '#2d572c' }} className="text-2xl font-bold flex-1">Floranica Admin Panel</h1>
        <nav className="flex gap-6">
          {[['/', 'Home'], ['/flowers', 'Flowers'], ['/contact', 'Contact'], ['/login', 'Login']].map(([href, label]) => (
            <Link key={href} href={href} style={{ color: '#3d8045' }} className="font-semibold hover:underline">
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-6 py-10">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#2d572c' }}>Contact Us</h2>
        <p className="text-gray-500 mb-6 text-sm">
          If you have any questions or need support, feel free to reach out using the form below.
        </p>

        {sent ? (
          <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md font-medium">
            ✅ Message sent! We&apos;ll get back to you soon.
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={e => { e.preventDefault(); setSent(true) }}
          >
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                type="text"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="py-2 rounded-md font-semibold text-white"
              style={{ backgroundColor: '#7dcf91' }}
            >
              Send Message
            </button>
          </form>
        )}
      </main>

      <footer style={{ backgroundColor: '#f1f1f1', borderTop: '1px solid #ddd' }}
        className="text-center py-4 text-sm text-gray-500">
        Copyright &copy; 2025 Floranica
      </footer>
    </div>
  )
}
