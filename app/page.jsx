'use client';
import { useState } from 'react';
import Image from 'next/image';
import logo from '../public/Snatcho logo.png'; // adjust path if logo is in another folder

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const name = form.get('name');
    const email = form.get('email');

    const res = await fetch('/api/join-waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // 👈 important
      body: JSON.stringify({ name, email }),
    });

    setLoading(false);
    if (res.ok) {
      setDone(true);
      window.location.href = '/congrats';
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white">
      {/* Logo */}
      <div className="mb-10">
        <Image src={logo} alt="Snatcho Logo" width={160} height={50} priority />
      </div>

      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          ⚡&nbsp;Join the <span className="text-green-400">Snatch Force</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Be among the <strong>first rebels</strong> to snatch deals before anyone else.
          Early members = exclusive rewards. Don’t miss out.
        </p>

        {!done && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="px-4 py-3 rounded-lg w-full sm:w-1/3 text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="px-4 py-3 rounded-lg w-full sm:w-1/3 text-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white text-lg font-bold rounded-xl shadow-lg hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? 'Joining...' : '⚡ Join the Snatch Force'}
            </button>
          </form>
        )}

        {done && (
          <p className="mt-6 text-green-400 font-bold">
            🎉 You’re in! Redirecting...
          </p>
        )}

        <p className="text-xs text-gray-500 mt-6">
          No spam. Just madness + exclusive drops.
        </p>
      </div>
    </main>
  );
}
