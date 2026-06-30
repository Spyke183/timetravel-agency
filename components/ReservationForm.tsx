"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CalendarDays, Send } from "lucide-react";
import { destinations, getDestination, formatPrice } from "@/lib/destinations";
import Reveal from "./Reveal";

type FormState = {
  name: string;
  email: string;
  destination: string;
  date: string;
  travelers: number;
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function ReservationForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    destination: "",
    date: "",
    travelers: 2,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  const selected = form.destination ? getDestination(form.destination) : null;
  const total = selected ? selected.price * form.travelers : 0;

  function validate(): boolean {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Veuillez indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Adresse e-mail invalide.";
    if (!form.destination) e.destination = "Choisissez une destination.";
    if (!form.date) e.date = "Choisissez une date de départ.";
    else if (form.date < today) e.date = "La date doit être dans le futur.";
    if (form.travelers < 1 || form.travelers > 8)
      e.travelers = "Entre 1 et 8 voyageurs.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  const field =
    "w-full rounded-xl border border-white/10 bg-ink-900/70 px-4 py-3 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/40";

  return (
    <section id="reservation" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Réservation</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            Préparez votre <span className="text-gradient-gold">départ</span>
          </h2>
          <p className="mt-4 text-white/65">
            Sélectionnez votre époque et vos dates. Un acompte de 30 % valide
            votre voyage — annulation gratuite jusqu'à 30 jours avant le départ.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-2xl">
          <div className="glass rounded-3xl p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center"
                >
                  <CheckCircle2 className="mx-auto h-14 w-14 text-gold-400" />
                  <h3 className="mt-4 font-serif text-2xl font-semibold">
                    Réservation confirmée !
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
                    Merci {form.name.split(" ")[0]} ! Votre voyage vers{" "}
                    <span className="text-gold-300">{selected?.name}</span> le{" "}
                    {new Date(form.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    pour {form.travelers}{" "}
                    {form.travelers > 1 ? "voyageurs" : "voyageur"} est
                    pré-réservé. Un conseiller vous contactera à{" "}
                    <span className="text-gold-300">{form.email}</span> pour
                    finaliser l'acompte de{" "}
                    {formatPrice(Math.round(total * 0.3))}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        destination: "",
                        date: "",
                        travelers: 2,
                      });
                    }}
                    className="btn-ghost mt-7"
                  >
                    Nouvelle réservation
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="grid gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="resa-name" className="mb-1.5 block text-xs text-white/60">
                        Nom complet
                      </label>
                      <input
                        id="resa-name"
                        className={field}
                        placeholder="Ada Lovelace"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "resa-name-err" : undefined}
                      />
                      {errors.name && (
                        <p id="resa-name-err" className="mt-1 text-xs text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="resa-email" className="mb-1.5 block text-xs text-white/60">
                        E-mail
                      </label>
                      <input
                        id="resa-email"
                        type="email"
                        className={field}
                        placeholder="vous@exemple.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "resa-email-err" : undefined}
                      />
                      {errors.email && (
                        <p id="resa-email-err" className="mt-1 text-xs text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="resa-destination" className="mb-1.5 block text-xs text-white/60">
                        Destination
                      </label>
                      <select
                        id="resa-destination"
                        className={field}
                        value={form.destination}
                        onChange={(e) => update("destination", e.target.value)}
                        aria-invalid={!!errors.destination}
                        aria-describedby={errors.destination ? "resa-destination-err" : undefined}
                      >
                        <option value="">Choisir une époque…</option>
                        {destinations.map((d) => (
                          <option key={d.slug} value={d.slug}>
                            {d.emoji} {d.name} — {d.era}
                          </option>
                        ))}
                      </select>
                      {errors.destination && (
                        <p id="resa-destination-err" className="mt-1 text-xs text-red-400">
                          {errors.destination}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="resa-date" className="mb-1.5 block text-xs text-white/60">
                        Date de départ
                      </label>
                      <div className="relative">
                        <input
                          id="resa-date"
                          type="date"
                          min={today}
                          className={`${field} [color-scheme:dark]`}
                          value={form.date}
                          onChange={(e) => update("date", e.target.value)}
                          aria-invalid={!!errors.date}
                          aria-describedby={errors.date ? "resa-date-err" : undefined}
                        />
                        <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                      </div>
                      {errors.date && (
                        <p id="resa-date-err" className="mt-1 text-xs text-red-400">
                          {errors.date}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="resa-travelers" className="mb-1.5 block text-xs text-white/60">
                      Nombre de voyageurs
                    </label>
                    <input
                      id="resa-travelers"
                      type="number"
                      min={1}
                      max={8}
                      className={field}
                      value={form.travelers}
                      onChange={(e) =>
                        update("travelers", parseInt(e.target.value) || 1)
                      }
                      aria-invalid={!!errors.travelers}
                      aria-describedby={errors.travelers ? "resa-travelers-err" : undefined}
                    />
                    {errors.travelers && (
                      <p id="resa-travelers-err" className="mt-1 text-xs text-red-400">
                        {errors.travelers}
                      </p>
                    )}
                  </div>

                  <AnimatePresence>
                    {selected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-between rounded-xl border border-gold-400/20 bg-gold-400/5 px-4 py-3 text-sm"
                      >
                        <span className="text-white/70">
                          {form.travelers} × {formatPrice(selected.price)}
                        </span>
                        <span className="font-serif text-lg text-gold-300">
                          Total&nbsp;: {formatPrice(total)}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button type="submit" className="btn-gold w-full">
                    <Send className="h-4 w-4" />
                    Confirmer ma réservation
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
