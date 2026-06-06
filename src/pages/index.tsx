import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 text-white md:px-8">
      <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* LEFT */}
        <div className="space-y-6 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl leading-tight font-black sm:text-5xl lg:text-7xl"
          >
            Share Your
            <span className="text-zinc-500"> Moments.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-lg text-base leading-relaxed text-zinc-400 md:text-lg lg:mx-0"
          >
            Basement Memories is a modern social platform for sharing photos, stories, and moments
            with your friends around the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              href="/login"
              className="rounded-xl bg-white px-6 py-3 text-center font-semibold text-black transition hover:opacity-90"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-zinc-700 px-6 py-3 text-center transition hover:bg-zinc-900"
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
          className="flex justify-center lg:flex"
        >
          <div className="flex h-[260px] w-[260px] items-center justify-center rounded-[32px] border border-zinc-700 bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-2xl md:h-[340px] md:w-[340px] lg:h-[520px] lg:w-[420px] lg:rounded-[40px]">
            <h2 className="text-4xl font-black md:text-5xl lg:text-6xl">BM.</h2>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
