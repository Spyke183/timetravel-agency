"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw, ArrowRight, Loader2 } from "lucide-react";
import { destinations, getDestination, formatPrice } from "@/lib/destinations";
import Reveal from "./Reveal";

type Slug = "paris-1889" | "cretace" | "florence-1504";

type Option = { label: string; slug: Slug };
type Question = { q: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    q: "Quel type d'expérience recherchez-vous ?",
    options: [
      { label: "Culturelle et artistique", slug: "florence-1504" },
      { label: "Aventure et nature", slug: "cretace" },
      { label: "Élégance et raffinement", slug: "paris-1889" },
    ],
  },
  {
    q: "Votre période préférée ?",
    options: [
      { label: "Histoire moderne (XIXᵉ–XXᵉ siècle)", slug: "paris-1889" },
      { label: "Temps anciens et origines", slug: "cretace" },
      { label: "Renaissance et classicisme", slug: "florence-1504" },
    ],
  },
  {
    q: "Vous préférez :",
    options: [
      { label: "L'effervescence urbaine", slug: "paris-1889" },
      { label: "La nature sauvage", slug: "cretace" },
      { label: "L'art et l'architecture", slug: "florence-1504" },
    ],
  },
  {
    q: "Votre activité idéale :",
    options: [
      { label: "Visiter des monuments", slug: "paris-1889" },
      { label: "Observer la faune", slug: "cretace" },
      { label: "Explorer des musées", slug: "florence-1504" },
    ],
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ q: string; label: string; slug: Slug }[]>(
    []
  );
  const [resultSlug, setResultSlug] = useState<Slug | null>(null);
  const [aiText, setAiText] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);

  const progress = (step / QUESTIONS.length) * 100;

  function choose(opt: Option) {
    const next = [
      ...answers,
      { q: QUESTIONS[step].q, label: opt.label, slug: opt.slug },
    ];
    setAnswers(next);

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      finish(next);
    }
  }

  function computeWinner(all: { slug: Slug }[]): Slug {
    const tally: Record<Slug, number> = {
      "paris-1889": 0,
      cretace: 0,
      "florence-1504": 0,
    };
    all.forEach((a) => (tally[a.slug] += 1));
    return (Object.keys(tally) as Slug[]).reduce((best, s) =>
      tally[s] > tally[best] ? s : best
    );
  }

  async function finish(all: { q: string; label: string; slug: Slug }[]) {
    const winner = computeWinner(all);
    setResultSlug(winner);
    setStep(QUESTIONS.length);

    const dest = getDestination(winner)!;
    setAiText(
      `D'après vos réponses, ${dest.name} (${dest.era}) est votre époque idéale. ${dest.shortDescription} Forfait ${formatPrice(
        dest.price
      )} / voyageur sur ${dest.duration}.`
    );

    setLoadingAi(true);
    try {
      const recap = all.map((a, i) => `Q${i + 1} (${a.q}) : ${a.label}`).join(" ; ");
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Un client vient de remplir notre quiz de personnalisation. Ses réponses : ${recap}. La destination recommandée par notre algorithme est « ${dest.name} » (${dest.era}). Rédige une recommandation personnalisée, chaleureuse et concise (3 à 4 phrases) qui explique pourquoi cette époque lui correspond en t'appuyant sur ses réponses, puis invite-le à réserver. N'utilise pas de listes.`,
            },
          ],
        }),
      });
      const data = await res.json();
      if (data?.reply) setAiText(data.reply);
    } catch {
    } finally {
      setLoadingAi(false);
    }
  }

  function reset() {
    setStep(0);
    setAnswers([]);
    setResultSlug(null);
    setAiText("");
  }

  const dest = resultSlug ? getDestination(resultSlug) : null;

  return (
    <section id="quiz" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Personnalisation IA</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            Trouvez votre <span className="text-gradient-gold">époque idéale</span>
          </h2>
          <p className="mt-4 text-white/65">
            Quatre questions, et notre intelligence artificielle vous recommande
            le voyage qui vous ressemble.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-2xl">
          <div className="glass rounded-3xl p-6 sm:p-10">
            {!dest && (
              <div className="mb-8">
                <div className="mb-2 flex justify-between text-xs text-white/50">
                  <span>
                    Question {step + 1} / {QUESTIONS.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gold-400"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {!dest ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="font-serif text-2xl font-semibold">
                    {QUESTIONS[step].q}
                  </h3>
                  <div className="mt-6 grid gap-3">
                    {QUESTIONS[step].options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => choose(opt)}
                        className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm transition-all duration-200 hover:border-gold-400/50 hover:bg-gold-400/10"
                      >
                        <span>{opt.label}</span>
                        <ArrowRight className="h-4 w-4 -translate-x-1 text-gold-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div
                    className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-2xl text-4xl"
                    style={{ background: dest.gradient }}
                  >
                    {dest.emoji}
                  </div>
                  <p className="eyebrow">Votre destination idéale</p>
                  <h3 className="mt-1 font-serif text-3xl font-semibold">
                    {dest.name}
                  </h3>
                  <p className="text-white/55">{dest.era}</p>

                  <div className="mt-6 rounded-2xl border border-gold-400/20 bg-gold-400/5 p-5 text-left">
                    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold-300">
                      <Sparkles className="h-3.5 w-3.5" />
                      Recommandation de Chronos
                      {loadingAi && (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      )}
                    </p>
                    <p className="text-sm leading-relaxed text-white/80">
                      {aiText}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="btn-gold"
                    >
                      Explorer {dest.name}
                    </Link>
                    <Link href="#reservation" className="btn-ghost">
                      Réserver ce voyage
                    </Link>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/60 transition-colors hover:text-gold-300"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Refaire le quiz
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
