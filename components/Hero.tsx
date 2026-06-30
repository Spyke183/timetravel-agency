"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

const titleWords = ["Voyagez", "à", "travers", "le", "temps"];

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_20%,#1b1b2b_0%,#06060a_70%)]" />
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-gold-400/20 blur-3xl"
          animate={{ y: [0, -30, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[12%] bottom-[22%] h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl"
          animate={{ y: [0, 24, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-hero-fade" />

      <div className="container-x relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/5 px-4 py-1.5 text-xs tracking-wide text-gold-200 backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Agence de voyage temporel · depuis l'an 2387
        </motion.div>

        <h1 className="font-serif text-5xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block">
            {titleWords.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`mr-3 inline-block ${
                  word === "temps" ? "text-gradient-gold animate-shimmer" : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mx-auto mt-7 max-w-2xl text-base text-white/75 sm:text-lg"
        >
          Trois époques d'exception, un service de luxe sur-mesure et un
          conseiller IA dédié. Réservez l'inoubliable&nbsp;: la Belle Époque, le
          temps des dinosaures, ou la Renaissance florentine.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="#destinations" className="btn-gold">
            Découvrir les destinations
          </Link>
          <Link href="#quiz" className="btn-ghost">
            Trouver mon époque idéale
          </Link>
        </motion.div>
      </div>

      <motion.a
        href="#destinations"
        aria-label="Défiler vers les destinations"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-7 w-7" />
      </motion.a>
    </section>
  );
}
