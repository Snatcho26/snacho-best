'use client';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Congrats() {
  useEffect(() => {
    confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 } });
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
      <div className="card text-center max-w-lg p-8 rounded-2xl shadow-2xl bg-gray-950 border border-green-600">
        <h1 className="text-4xl font-extrabold mb-4">
          🎉 Welcome to the <span className="text-green-400">Snatch Force</span>!
        </h1>
        <p className="mb-3 text-lg">
          You’ve officially joined the rebellion 🚀
        </p>
        <p className="mb-6 text-xl font-mono">
          Your launch coupon: <strong className="text-green-400">SNATCHFORCE</strong>
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Valid 45 days after launch. Keep it safe 🔒
        </p>

        {/* 🚀 Insta Button */}
        <a
          href="https://www.instagram.com/snatchoindia/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 text-lg font-bold rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg hover:scale-105 transition"
        >
          🚀 Join the Snatch Force on Instagram
        </a>
      </div>
    </main>
  );
}
