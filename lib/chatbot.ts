import { destinations, formatPrice } from "./destinations";

function buildKnowledge(): string {
  return destinations
    .map((d) => {
      const atouts = d.highlights.map((h) => `    • ${h}`).join("\n");
      return [
        `### ${d.name} — ${d.era} (${d.year})`,
        `  Pitch : ${d.tagline}`,
        `  Prix : ${formatPrice(d.price)} par voyageur · Durée : ${d.duration}`,
        `  Niveau : ${d.difficulty} · Note clients : ${d.rating}/5`,
        `  Temps forts :`,
        atouts,
      ].join("\n");
    })
    .join("\n\n");
}

export const SYSTEM_PROMPT = `Tu es Chronos, l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe (univers fictif).

# TON RÔLE
Conseiller les clients et les aider à choisir la meilleure destination temporelle selon leurs envies, puis les guider vers la réservation.

# TON TON
- Professionnel mais chaleureux
- Passionné d'histoire et de sciences
- Toujours enthousiaste, sans être trop familier (vouvoiement)
- Expertise en voyage temporel : fictive mais crédible et rassurante

# TES CONNAISSANCES (à utiliser pour des réponses précises et cohérentes)
${buildKnowledge()}

# FAQ AGENCE
- Réservation : via le formulaire du site (destination + dates) ou en discutant avec toi. Acompte de 30%, solde 15 jours avant le départ.
- Sécurité : chaque voyage est encadré ; un "champ de stabilité temporelle" empêche tout paradoxe. Les voyageurs sont observateurs, jamais acteurs de l'Histoire.
- Paradoxes temporels : impossibles grâce au protocole "no-contact" et au champ de confinement. Vous ne pouvez rien modifier au passé.
- Santé : un bilan médical léger et des nano-vaccins temporels sont inclus. Aucune contre-indication majeure.
- Équipement : tenues d'époque, traducteur temporel et logistique de luxe fournis.
- Annulation : remboursement intégral jusqu'à 30 jours avant le départ.
- Assurance "retour garanti" incluse dans chaque forfait.

# RÈGLES DE RÉPONSE
- Réponds en français, de façon concise (2 à 5 phrases) et structurée si utile.
- Si on te demande un conseil, pose 1 question ou propose directement la destination la plus adaptée en justifiant.
- Donne toujours des prix cohérents avec tes connaissances ci-dessus.
- Si une question sort totalement du cadre (hors voyage temporel / agence), ramène gentiment vers les destinations.
- N'invente pas de destinations en dehors des trois proposées.`;

type Msg = { role: string; content: string };

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const days = (d: { duration: string }) => parseInt(d.duration, 10) || 0;

export function fallbackReply(messages: Msg[]): string {
  const last = norm(messages[messages.length - 1]?.content ?? "");
  const tokens = last.split(/[^a-z0-9]+/).filter(Boolean);

  const has = (...words: string[]) => words.some((w) => last.includes(w));
  const word = (...words: string[]) => words.some((w) => tokens.includes(w));

  const bySlug = (s: string) => destinations.find((d) => d.slug === s)!;
  const paris = bySlug("paris-1889");
  const cretace = bySlug("cretace");
  const florence = bySlug("florence-1504");

  if (/^(bonjour|salut|bonsoir|hello|coucou|hey|yo)\b/.test(last) && last.length < 35) {
    return "Bonjour et bienvenue chez TimeTravel Agency ! ✨ Je suis Chronos, votre conseiller en voyages temporels. Cherchez-vous l'élégance de Paris 1889, l'aventure du Crétacé, ou l'art de Florence 1504 ?";
  }

  const byPrice = [...destinations].sort((a, b) => a.price - b.price);
  const byDur = [...destinations].sort((a, b) => days(a) - days(b));
  if (has("plus cher", "plus chere", "plus couteu", "luxueu", "la plus chere")) {
    const d = byPrice[byPrice.length - 1];
    return `La plus prestigieuse (et la plus chère) est ${d.emoji} ${d.name} à ${formatPrice(
      d.price
    )} / voyageur (${d.duration}). À l'inverse, ${paris.name} reste la plus accessible à ${formatPrice(
      paris.price
    )}. Voulez-vous comparer les expériences ?`;
  }
  if (has("moins cher", "moins chere", "abordable", "economiq", "pas cher", "meilleur marche", "petit budget")) {
    const d = byPrice[0];
    return `La plus accessible est ${d.emoji} ${d.name} à ${formatPrice(
      d.price
    )} / voyageur (${d.duration}) — une entrée idéale dans le voyage temporel. Souhaitez-vous la réserver ?`;
  }
  if (has("plus court", "plus courte", "moins de temps", "peu de temps", "plus rapide", "week-end", "week end")) {
    const d = byDur[0];
    return `Le séjour le plus court est ${d.emoji} ${d.name} : ${d.duration}, intense et idéal si vous manquez de temps. Tarif : ${formatPrice(
      d.price
    )} / voyageur.`;
  }
  if (has("plus long", "plus longue", "plus longtemps", "sejour long")) {
    const d = byDur[byDur.length - 1];
    return `Le séjour le plus long est ${d.emoji} ${d.name} : ${d.duration}, pour s'immerger pleinement. Tarif : ${formatPrice(
      d.price
    )} / voyageur.`;
  }

  if (has("plusieurs fois", "echelonn", "acompte", "paiement", "payer", "regler", "carte bancaire")) {
    return "Pour réserver, un acompte de 30 % est demandé, puis le solde 15 jours avant le départ. Le paiement en plusieurs fois est possible sur simple demande. L'assurance « retour garanti » est incluse dans chaque forfait.";
  }

  if (has("prix", "tarif", "cout", "combien", "budget", "coute", "euro", "forfait")) {
    const lignes = destinations
      .map((d) => `• ${d.name} : ${formatPrice(d.price)} / voyageur (${d.duration})`)
      .join("\n");
    return `Voici nos forfaits tout compris :\n${lignes}\n\nL'acompte est de 30 % et l'assurance « retour garanti » est incluse. Souhaitez-vous des détails sur l'une d'elles ?`;
  }

  for (const d of destinations) {
    const longKeys = [norm(d.name), d.slug.replace(/-/g, " ")];
    const phrases =
      d.slug === "paris-1889"
        ? ["belle epoque"]
        : d.slug === "cretace"
        ? []
        : ["michel-ange", "michel ange"];
    const shortKeys =
      d.slug === "paris-1889"
        ? ["paris", "eiffel", "1889"]
        : d.slug === "cretace"
        ? ["cretace", "dinosaure", "dino", "dinos", "prehistoire", "trex", "jurassique"]
        : ["florence", "renaissance", "vinci", "1504"];
    if (has(...longKeys, ...phrases) || word(...shortKeys)) {
      return `${d.emoji} ${d.name} — ${d.era}. ${d.shortDescription} Forfait : ${formatPrice(
        d.price
      )} / voyageur sur ${d.duration}. Temps fort : ${d.highlights[0].toLowerCase()}. Voulez-vous réserver ou comparer avec une autre époque ?`;
    }
  }

  if (
    has("conseil", "recommand", "sugger", "choisir", "elegance", "raffinement", "romantique", "gastronomie", "aventure", "culture", "architecture", "preference") ||
    word("quelle", "ideal", "idee", "aide", "nature", "art", "luxe", "sensation")
  ) {
    if (has("nature", "aventure", "animaux", "faune", "sensation", "frisson"))
      return `Pour l'aventure et la nature, je recommande le ${cretace.emoji} ${cretace.name} : un safari préhistorique unique, à ${formatPrice(
        cretace.price
      )} / voyageur. Sensations garanties, en toute sécurité !`;
    if (has("culture", "musee", "peinture", "architecture", "renaissance", "histoire de l'art") || word("art"))
      return `Pour l'art et la culture, ${florence.emoji} ${florence.name} est faite pour vous : la Renaissance à son apogée, le David de Michel-Ange, les ateliers de Vinci — ${formatPrice(
        florence.price
      )} / voyageur.`;
    if (has("luxe", "elegance", "raffinement", "romantique", "gastronomie", "ville"))
      return `Pour l'élégance et le raffinement, ${paris.emoji} ${paris.name} vous séduira : Belle Époque, Tour Eiffel inaugurée, cabarets et gastronomie — ${formatPrice(
        paris.price
      )} / voyageur.`;
    return "Avec plaisir ! Préférez-vous l'aventure et la nature (Crétacé), l'art et la culture (Florence 1504), ou l'élégance urbaine (Paris 1889) ?";
  }

  if (has("reserv", "booker", "booking", "inscrire", "reserve", "modalite") || word("date", "dates", "partir", "depart")) {
    return "Pour réserver, utilisez le formulaire « Réservation » du site : choisissez votre destination et vos dates. Un acompte de 30 % valide le voyage, le solde est dû 15 jours avant le départ. Quelle époque vous tente ?";
  }

  if (has("enfant", "famille", "senior", "accessib", "adapte", "handicap", "groupe", "reduction") || word("age")) {
    return "Nos voyages sont accessibles à tous : un bilan médical léger et des nano-vaccins temporels sont inclus, sans contre-indication majeure. Le protocole « no-contact » les rend sûrs, y compris en famille. Pour les groupes, contactez-nous via le formulaire : des conditions dédiées sont possibles.";
  }

  if (has("securit", "securise", "danger", "risque", "paradoxe", "mourir", "sans risque", "en securite") || word("peur")) {
    return "Aucune inquiétude : nos voyages sont entièrement sécurisés. Un champ de stabilité temporelle rend tout paradoxe impossible, et le protocole « no-contact » fait de vous un observateur privilégié, jamais un acteur de l'Histoire. L'assurance « retour garanti » est incluse.";
  }

  if (has("comment ca marche", "comment ca fonctionne", "mecanisme", "machine a remonter", "comment fonctionne le voyage", "comment voyage")) {
    return "Le voyage s'effectue depuis nos capsules temporelles : un champ de stabilité vous projette à l'époque choisie tout en vous isolant de la trame historique. Vous observez le passé en immersion totale, sans jamais pouvoir le modifier — et revenez à l'instant exact de votre départ.";
  }

  if (has("faq", "fonctionne", "duree", "assurance", "sante", "vaccin", "annul", "equipement", "bagage", "inclus") || word("comment")) {
    return "Chaque forfait inclut : préparation médicale (nano-vaccins temporels), équipement et tenues d'époque, traducteur temporel, encadrement expert et assurance « retour garanti ». Annulation remboursée jusqu'à 30 jours avant le départ. Une question précise ?";
  }

  if (has("telephone", "numero", "adresse", "contact", "ou se trouve", "ou etes", "localisation", "joindre", "email", "mail")) {
    return "Vous pouvez nous joindre directement via le formulaire « Réservation » du site, ou poursuivre ici avec moi : je réponds à toutes vos questions sur les voyages temporels. Que puis-je faire pour vous ?";
  }

  if (has("merci", "au revoir", "aurevoir", "a bientot", "a plus", "bonne journee", "bonne soiree")) {
    return "Avec grand plaisir ! 😊 Toute l'équipe de TimeTravel Agency vous souhaite un excellent voyage à travers le temps. À très bientôt !";
  }

  return "Excellente question ! Je suis spécialisé dans nos trois destinations : 🗼 Paris 1889, 🦖 Crétacé −65M et 🎨 Florence 1504. Dites-moi ce qui vous attire — époque, ambiance, budget — et je vous oriente vers le voyage idéal.";
}
