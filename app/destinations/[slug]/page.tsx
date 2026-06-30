import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Star,
  Check,
  Sparkles,
  Gauge,
  ArrowRight,
} from "lucide-react";
import {
  destinations,
  getDestination,
  formatPrice,
} from "@/lib/destinations";
import SmartImage from "@/components/SmartImage";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const d = getDestination(params.slug);
  if (!d) return { title: "Destination introuvable — TimeTravel Agency" };
  return {
    title: `${d.name} — ${d.era} · TimeTravel Agency`,
    description: d.shortDescription,
  };
}

export default function DestinationPage({
  params,
}: {
  params: { slug: string };
}) {
  const dest = getDestination(params.slug);
  if (!dest) notFound();

  const others = destinations.filter((d) => d.slug !== dest.slug);

  return (
    <article>
      <header className="relative flex min-h-[70vh] items-end overflow-hidden">
        <div className="absolute inset-0" style={{ background: dest.gradient }} />
        <SmartImage
          src={dest.image}
          alt={`${dest.name} — ${dest.era}`}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        {dest.video && (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
            poster={dest.image}
          >
            <source src={dest.video} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/30" />

        <div className="container-x relative z-10 pb-14 pt-28">
          <Link
            href="/#destinations"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Toutes les destinations
          </Link>
          <p className="eyebrow">
            {dest.era} · {dest.year}
          </p>
          <h1 className="mt-2 font-serif text-5xl font-semibold sm:text-6xl md:text-7xl">
            {dest.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{dest.tagline}</p>

          <div className="mt-7 flex flex-wrap items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2">
              <Clock className="h-4 w-4 text-gold-300" /> {dest.duration}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2">
              <Gauge className="h-4 w-4 text-gold-300" /> {dest.difficulty}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2">
              <Star className="h-4 w-4 fill-gold-400 text-gold-400" />{" "}
              {dest.rating.toFixed(1)} / 5
            </span>
          </div>
        </div>
      </header>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-3 lg:py-24">
        <div className="lg:col-span-2">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold">
              L'expérience
            </h2>
            <p className="mt-4 leading-relaxed text-white/75">
              {dest.longDescription}
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <h3 className="font-serif text-2xl font-semibold">Temps forts</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {dest.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/75"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <h3 className="font-serif text-2xl font-semibold">
              Votre itinéraire
            </h3>
            <div className="mt-5 space-y-4">
              {dest.experiences.map((exp, i) => (
                <div
                  key={exp.title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-400/15 font-serif text-gold-300">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold">{exp.title}</h4>
                    <p className="mt-1 text-sm text-white/65">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 glass rounded-3xl p-6">
            <p className="text-xs uppercase tracking-wide text-white/55">
              À partir de
            </p>
            <p className="font-serif text-4xl text-gold-300">
              {formatPrice(dest.price)}
            </p>
            <p className="text-sm text-white/55">par voyageur · {dest.duration}</p>

            <Link
              href="/#reservation"
              className="btn-gold mt-6 w-full"
            >
              Réserver ce voyage
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold-300">
                <Sparkles className="h-3.5 w-3.5" />
                Infos pratiques
              </p>
              {dest.practical.map((p) => (
                <div
                  key={p.label}
                  className="flex justify-between gap-3 text-sm"
                >
                  <span className="text-white/50">{p.label}</span>
                  <span className="text-right text-white/80">{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <section className="border-t border-white/10 py-16">
        <div className="container-x">
          <h3 className="font-serif text-2xl font-semibold">
            Explorez d'autres époques
          </h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {others.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-colors hover:border-gold-400/40"
              >
                <div
                  className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-50"
                  style={{ background: d.gradient }}
                />
                <div className="relative">
                  <p className="text-2xl">{d.emoji}</p>
                  <p className="eyebrow mt-2">{d.era}</p>
                  <p className="font-serif text-xl font-semibold">{d.name}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-gold-300">
                    Découvrir <ArrowRight className="h-4 w-4" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
