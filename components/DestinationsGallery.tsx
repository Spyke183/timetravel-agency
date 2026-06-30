import { destinations } from "@/lib/destinations";
import DestinationCard from "./DestinationCard";
import Reveal from "./Reveal";

export default function DestinationsGallery() {
  return (
    <section id="destinations" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Nos destinations</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            Trois époques, <span className="text-gradient-gold">une vie</span>
          </h2>
          <p className="mt-4 text-white/65">
            Chaque voyage est une immersion totale, encadrée par nos experts et
            sécurisée par notre technologie de stabilité temporelle.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <DestinationCard key={d.slug} destination={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
