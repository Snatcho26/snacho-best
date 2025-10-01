'use client'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function Congrats() {
  useEffect(() => { confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 } }) }, [])

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center bg-slate-900/60 p-8 rounded-2xl border border-green-700">
        <img src="/snatcho-logo-2.png" alt="Snatcho" className="mx-auto mb-4" style={{width:260}} />
        <h2 className="text-3xl font-extrabold mb-2">🎉 Welcome to the <span className="text-green-400">Snatch Force</span>!</h2>
        <p className="text-gray-400 mb-4">You’ve officially joined the rebellion 🚀</p>
        <p className="font-mono text-xl mb-4">Your launch coupon: <strong className="text-green-400">SNATCHFORCE</strong></p>
        <p className="text-sm text-gray-500 mb-6">Valid 45 days after launch — keep it safe 🔒</p>

        <a href="https://www.instagram.com/snatchoindia/?hl=en" target="_blank" rel="noreferrer" className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 font-bold">🚀 Join the Snatch Force on Instagram</a>
      </div>
    </main>
  )
}
