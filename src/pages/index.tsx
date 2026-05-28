import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
        {/* LEFT */}
        <div className="space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl leading-tight font-black lg:text-7xl"
          >
            Share Your
            <span className="text-zinc-500"> Moments.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-lg text-lg leading-relaxed text-zinc-400"
          >
            Basement Memories is a modern social platform for sharing photos, stories, and moments
            with your friends around the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <Link
              href="/login"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-zinc-700 px-6 py-3 transition hover:bg-zinc-900"
            >
              Register
            </Link>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden justify-center lg:flex"
        >
          <div className="flex h-[520px] w-[420px] items-center justify-center rounded-[40px] border border-zinc-700 bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-2xl">
            <h2 className="text-6xl font-black">BM.</h2>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
