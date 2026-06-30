import { ShieldCheck, Sparkles, Compass, Award } from "lucide-react";
import Reveal from "./Reveal";

const stats = [
  { value: "12 000+", label: "voyageurs comblés" },
  { value: "3", label: "époques d'exception" },
  { value: "100 %", label: "sans paradoxe" },
  { value: "24/7", label: "conseiller IA" },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Sécurité absolue",
    text: "Champ de stabilité temporelle et protocole no-contact : aucun risque de paradoxe, retour garanti.",
  },
  {
    icon: Compass,
    title: "Sur-mesure",
    text: "Chaque itinéraire est personnalisé selon vos envies, votre rythme et vos centres d'intérêt.",
  },
  {
    icon: Award,
    title: "Service de luxe",
    text: "Guides experts, logistique premium, tenues d'époque et traducteur temporel inclus.",
  },
  {
    icon: Sparkles,
    title: "Conseiller IA",
    text: "Chronos, notre assistant intelligent, vous oriente et répond à toutes vos questions, à toute heure.",
  },
];

export default function AgencyIntro() {
  return (
    <section id="agence" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">L'agence</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Le temps n'a plus de{" "}
              <span className="text-gradient-gold">frontières</span>
            </h2>
            <p className="mt-5 text-white/70">
              Depuis l'an 2387, TimeTravel Agency rend l'Histoire accessible aux
              voyageurs les plus exigeants. Nous combinons une technologie de
              voyage temporel de pointe à un savoir-faire d'agence de luxe pour
              transformer chaque époque en une expérience inoubliable — et
              parfaitement sûre.
            </p>
            <p className="mt-4 text-white/70">
              Notre mission : vous faire vivre l'Histoire de l'intérieur, comme
              un privilège, jamais comme un risque.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl text-gold-300">{s.value}</p>
                  <p className="mt-1 text-xs text-white/55">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="glass h-full rounded-2xl p-6 transition-colors duration-300 hover:border-gold-400/30">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {f.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
