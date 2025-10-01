'use client'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.target)
    const name = fd.get('name')
    const email = fd.get('email')

    const res = await fetch('/api/join-waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })

    setLoading(false)
    if (res.ok) window.location.href = '/congrats'
    else alert('Something went wrong — try again.')
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center">
        <img src="/snatcho-logo.png" alt="Snatcho" className="brand-logo mb-6" />
        <h1 className="text-5xl font-extrabold mb-4">⚡&nbsp;Join the <span className="text-green-400">Snatch Force</span></h1>
        <p className="text-gray-400 mb-8">Be among the first rebels to snatch deals before anyone else. Early members = exclusive rewards.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-4 items-center">
          <input name="name" required placeholder="Your name" className="px-4 py-3 rounded-lg text-black" />
          <input name="email" type="email" required placeholder="Email" className="px-4 py-3 rounded-lg text-black" />
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 font-bold" type="submit">{loading ? 'Joining...' : '⚡ Join the Snatch Force'}</button>
        </form>

        <p className="text-sm text-gray-500 mt-4">No spam. Just madness + exclusive drops.</p>
      </div>
    </main>
  )
}
