'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-6 text-center"
      >
        Snatcho India 🚀
      </motion.h1>
      <p className="text-lg max-w-xl text-center mb-6">
        The founder is mad & crazy — join our waitlist for exclusive coupons.
      </p>
      <form
        action="/api/join-waitlist"
        method="POST"
        className="flex flex-col gap-4 max-w-md w-full"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
        />
        <button
          type="submit"
          className="p-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          Join Waitlist
        </button>
      </form>
    </main>
  );
}