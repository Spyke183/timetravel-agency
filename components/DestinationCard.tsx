"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Star } from "lucide-react";
import { type Destination, formatPrice } from "@/lib/destinations";

export default function DestinationCard({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-850/60 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/40 hover:shadow-[0_24px_60px_-20px_rgba(212,175,55,0.35)]"
    >
      <div className="relative h-60 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{ background: destination.gradient }}
        />
        {imgOk && (
          <img
            src={destination.image}
            alt={`${destination.name} — ${destination.era}`}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <span className="text-base leading-none">{destination.emoji}</span>
          {destination.year}
        </span>
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs text-gold-200 backdrop-blur">
          <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
          {destination.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{destination.era}</p>
        <h3 className="mt-1 font-serif text-2xl font-semibold">
          {destination.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">
          {destination.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-white/55">
              À partir de
            </p>
            <p className="font-serif text-xl text-gold-300">
              {formatPrice(destination.price)}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/55">
            <Clock className="h-3.5 w-3.5" />
            {destination.duration}
          </div>
        </div>

        <Link
          href={`/destinations/${destination.slug}`}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-gold-400/40 px-5 py-2.5 text-sm font-semibold text-gold-200 transition-all duration-300 hover:bg-gold-400 hover:text-ink-950"
        >
          Explorer cette époque
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
