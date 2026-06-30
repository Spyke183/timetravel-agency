import Link from "next/link";
import { Clock } from "lucide-react";
import { destinations } from "@/lib/destinations";

const GROUP_MEMBERS = ["Ugo Ameslant", "Thomas Barrault", "Torea Tinorua"];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950/80">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-400/50 text-gold-400">
                <Clock className="h-5 w-5" />
              </span>
              <span className="font-serif text-lg font-semibold">
                TimeTravel<span className="text-gold-400"> Agency</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/55">
              Agence de voyage temporel de luxe (univers fictif). Le temps n'a
              plus de frontières — vivez l'Histoire de l'intérieur, en toute
              sécurité.
            </p>
          </div>

          <div>
            <p className="eyebrow">Destinations</p>
            <ul className="mt-4 space-y-2 text-sm">
              {destinations.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="text-white/60 transition-colors hover:text-gold-300"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Navigation</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/#quiz" className="text-white/60 hover:text-gold-300">
                  Trouver mon époque
                </Link>
              </li>
              <li>
                <Link
                  href="/#reservation"
                  className="text-white/60 hover:text-gold-300"
                >
                  Réserver
                </Link>
              </li>
              <li>
                <Link href="/#agence" className="text-white/60 hover:text-gold-300">
                  L'agence
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2387 TimeTravel Agency — Projet pédagogique Ynov M1/M2 · Webapp
            fictive
          </p>
          <p>
            Réalisé par&nbsp;:{" "}
            <span className="text-white/65">{GROUP_MEMBERS.join(" · ")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
