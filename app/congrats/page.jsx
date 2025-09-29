'use client';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Congrats() {
  useEffect(()=>{ confetti({ particleCount: 120, spread: 90 }); }, []);
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="card text-center">
        <h1 className="text-3xl font-bold mb-2">🎉 You're on the Snatcho waitlist!</h1>
        <p className="mb-4">Coupon code: <strong>SNATCHFORCE</strong></p>
        <p className="text-sm text-gray-500">Valid 45 days after launch. We'll keep you posted.</p>
      </div>
    </main>
  );
}
