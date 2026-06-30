import Link from "next/link";
import { Clock } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-5 text-center">
      <div>
        <Clock className="mx-auto h-12 w-12 text-gold-400" />
        <p className="eyebrow mt-6">Erreur temporelle 404</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
          Cette époque n'existe pas
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          Le voyage que vous cherchez s'est perdu dans le continuum.
          Revenons à une période connue.
        </p>
        <Link href="/" className="btn-gold mt-8">
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
