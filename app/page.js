'use client'
import { motion } from "framer-motion";
import { useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    if (res.ok) {
      window.location.href = "/congrats";
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <motion.img src="/logo.png" alt="Snatcho Logo" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="w-40 h-40 mb-6"/>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-4xl font-bold mb-4">
        Compare. Save. Snatch it.
      </motion.h1>
      <p className="mb-6">Join the waitlist today & get your launch coupon!</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm">
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 rounded bg-gray-100 dark:bg-gray-800"/>
        <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 rounded bg-gray-100 dark:bg-gray-800"/>
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Join Waitlist</button>
      </form>
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Follow us on Instagram</h2>
        <a href="https://instagram.com/snatchoindia" target="_blank" rel="noopener noreferrer" className="block bg-gray-100 dark:bg-gray-900 p-4 rounded-xl shadow-md hover:scale-105 transition-transform">
          <p className="font-bold">@snatchoindia</p>
          <p className="text-sm">See our latest updates & offers</p>
        </a>
      </section>
    </main>
  )
}
