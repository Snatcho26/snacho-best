'use client'
import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function CongratsPage() {
  useEffect(() => {
    confetti();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-4xl font-bold mb-4">🎉 Welcome to Snatcho!</h1>
      <p className="mb-4">Your spot is secured. Coupon code: <b>SNATCHFORCE</b></p>
      <p>Valid for 45 days post launch 🚀</p>
    </main>
  )
}
