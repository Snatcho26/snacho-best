'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import InstagramCard from '../components/InstagramCard';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = '/congrats';
      } else {
        setError(data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.img src="/logo.png" alt="Snatcho" className="w-48 mb-6" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} />
      <motion.h1 className="text-4xl md:text-6xl font-extrabold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
        Snatch the Best Deals ⚡
      </motion.h1>
      <p className="max-w-2xl text-center text-gray-600 dark:text-gray-300 mb-8">Compare prices from Amazon, Flipkart, Blinkit, Zepto & more. Get exclusive discounts and student offers — all in one app.</p>

      <div className="w-full max-w-md">
        <form onSubmit={submit} className="card">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" required className="w-full p-3 rounded-md mb-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required type="email" className="w-full p-3 rounded-md mb-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
          <label className="flex items-center text-sm mb-4"><input type="checkbox" defaultChecked className="mr-2" /> I agree to receive emails from Snatcho.</label>
          <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Joining...' : 'Join the Waitlist'}</button>
          {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
        </form>

        <div className="mt-8">
          <div className="card">
            <h3 className="font-semibold mb-2">Your Reward</h3>
            <p className="mb-2">Use coupon <strong>SNATCHFORCE</strong> — valid 45 days after launch.</p>
            <a className="text-sm text-gray-500" href="/terms">Terms apply</a>
          </div>
        </div>

        <div className="mt-8">
          <InstagramCard handle="snatchoindia" />
        </div>
      </div>
    </main>
  );
}
