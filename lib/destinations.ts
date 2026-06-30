export type Destination = {
  slug: string;
  name: string;
  era: string;
  year: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  duration: string;
  difficulty: string;
  rating: number;
  highlights: string[];
  experiences: { title: string; description: string }[];
  practical: { label: string; value: string }[];
  gradient: string;
  accent: string;
  image: string;
  video?: string;
  emoji: string;
};

export const destinations: Destination[] = [
  {
    slug: "paris-1889",
    name: "Paris 1889",
    era: "La Belle Époque",
    year: "1889",
    tagline: "L'Exposition Universelle et l'inauguration de la Tour Eiffel",
    shortDescription:
      "Vivez l'effervescence d'un Paris en pleine modernité : la Tour Eiffel flambant neuve domine une Exposition Universelle où le monde entier se presse.",
    longDescription:
      "Au printemps 1889, Paris célèbre le centenaire de la Révolution et inaugure la Tour Eiffel, alors la plus haute structure du monde. Les Grands Boulevards bruissent de calèches, les cafés débordent d'artistes et d'ingénieurs, et le Moulin Rouge s'apprête à ouvrir ses portes. Notre escapade temporelle vous plonge au cœur de la Belle Époque : champagne sous les lampadaires à gaz, premières ampoules électriques de l'Exposition, et la fierté d'une France tournée vers l'avenir.",
    price: 18900,
    duration: "5 jours / 4 nuits",
    difficulty: "Confort — accessible à tous",
    rating: 4.9,
    highlights: [
      "Montée privée de la Tour Eiffel le jour de son inauguration",
      "Visite VIP de l'Exposition Universelle (Galerie des Machines)",
      "Soirée cabaret à l'ouverture du Moulin Rouge",
      "Dîner gastronomique sur les Grands Boulevards",
    ],
    experiences: [
      {
        title: "Le rêve de fer",
        description:
          "Gravissez la Tour Eiffel aux côtés de Gustave Eiffel lui-même lors d'une visite guidée exclusive.",
      },
      {
        title: "Lumières d'avenir",
        description:
          "Découvrez les merveilles électriques et mécaniques qui émerveillèrent 32 millions de visiteurs.",
      },
      {
        title: "Bohème parisienne",
        description:
          "Croisez peintres, poètes et danseuses dans les cafés de Montmartre.",
      },
    ],
    practical: [
      { label: "Climat", value: "Tempéré, prévoir une tenue de soirée" },
      { label: "Langue", value: "Français (traducteur temporel fourni)" },
      { label: "Devise", value: "Franc-or (échange inclus)" },
      { label: "Sécurité", value: "Zone stabilisée — risque temporel nul" },
    ],
    gradient: "linear-gradient(135deg, #2a1a3e 0%, #b8860b 55%, #e2c46c 100%)",
    accent: "#e2c46c",
    image: "/destinations/paris-1889.jpg",
    video: "/destinations/paris-1889.mp4",
    emoji: "🗼",
  },
  {
    slug: "cretace",
    name: "Crétacé −65M",
    era: "L'ère des géants",
    year: "−65 000 000",
    tagline: "Safari préhistorique au crépuscule des dinosaures",
    shortDescription:
      "Une expédition d'exception à l'aube de la fin d'un monde : forêts primitives, fougères géantes et faune colossale, observées en toute sécurité.",
    longDescription:
      "Remontez 65 millions d'années en arrière, à la toute fin du Crétacé, quand les derniers grands dinosaures règnent encore sur une Terre luxuriante. Depuis nos plateformes d'observation blindées et nos véhicules tout-terrain temporels, contemplez le Tyrannosaure chassant à l'aube, les troupeaux de Tricératops traversant les plaines, et les ptérosaures planant au-dessus de marécages géants. Une immersion sensorielle dans une nature sauvage que nul humain n'aurait jamais dû voir — encadrée par nos paléo-guides experts.",
    price: 34500,
    duration: "3 jours / 2 nuits",
    difficulty: "Aventure — bonne condition physique recommandée",
    rating: 4.8,
    highlights: [
      "Observation d'un Tyrannosaurus rex en chasse (distance sécurisée)",
      "Survol en module anti-gravité de la canopée primitive",
      "Bivouac de luxe dans un dôme panoramique blindé",
      "Initiation à la paléontologie de terrain avec nos experts",
    ],
    experiences: [
      {
        title: "L'heure des prédateurs",
        description:
          "À l'aube, assistez au réveil des grands carnivores depuis un mirador renforcé.",
      },
      {
        title: "Géants paisibles",
        description:
          "Approchez les troupeaux d'herbivores et leurs petits dans la plaine alluviale.",
      },
      {
        title: "Ciel jurassique",
        description:
          "Embarquez pour un vol silencieux parmi les ptérosaures au coucher du soleil.",
      },
    ],
    practical: [
      { label: "Climat", value: "Chaud et humide, équipement fourni" },
      { label: "Encadrement", value: "2 paléo-guides + 1 agent de sécurité" },
      { label: "Protection", value: "Champ de confinement biologique actif" },
      { label: "Sécurité", value: "Protocole no-contact strict" },
    ],
    gradient: "linear-gradient(135deg, #0f2417 0%, #2f6f3e 50%, #c9a227 100%)",
    accent: "#7fcf8f",
    image: "/destinations/cretace.jpg",
    video: "/destinations/cretace.mp4",
    emoji: "🦖",
  },
  {
    slug: "florence-1504",
    name: "Florence 1504",
    era: "La Renaissance",
    year: "1504",
    tagline: "L'année où Michel-Ange dévoile son David",
    shortDescription:
      "Plongez au berceau de la Renaissance, entre les ateliers de Léonard de Vinci, les chantiers de Michel-Ange et le faste des Médicis.",
    longDescription:
      "Florence, 1504 : la cité-état est à l'apogée de son génie artistique. Michel-Ange vient d'achever le David, que la ville s'apprête à ériger sur la Piazza della Signoria, tandis que Léonard de Vinci esquisse ses machines et ses portraits. Sous le mécénat des Médicis, peintres, sculpteurs et savants réinventent le monde. Flânez dans les ruelles pavées, poussez la porte des botteghe (ateliers), assistez aux débats des humanistes et savourez la cuisine toscane d'époque. Un voyage au cœur de l'éveil de l'esprit moderne.",
    price: 22400,
    duration: "6 jours / 5 nuits",
    difficulty: "Confort — accessible à tous",
    rating: 5.0,
    highlights: [
      "Présence à l'installation du David sur la Piazza della Signoria",
      "Visite privée d'un atelier (bottega) de la Renaissance",
      "Rencontre fictive avec un assistant de Léonard de Vinci",
      "Banquet toscan dans un palazzo Médicis",
    ],
    experiences: [
      {
        title: "Le marbre vivant",
        description:
          "Assistez au transport et à l'érection du David, prouesse technique et artistique.",
      },
      {
        title: "Dans la bottega",
        description:
          "Apprenez les secrets des pigments et de la fresque auprès des maîtres artisans.",
      },
      {
        title: "L'esprit des Médicis",
        description:
          "Partagez un banquet où se croisent artistes, marchands et philosophes.",
      },
    ],
    practical: [
      { label: "Climat", value: "Doux méditerranéen, tenue d'époque fournie" },
      { label: "Langue", value: "Toscan (traducteur temporel fourni)" },
      { label: "Devise", value: "Florin d'or (échange inclus)" },
      { label: "Sécurité", value: "Zone stabilisée — risque temporel nul" },
    ],
    gradient: "linear-gradient(135deg, #3a1f12 0%, #9c4a1a 50%, #e2b04a 100%)",
    accent: "#e8b96a",
    image: "/destinations/florence-1504.jpg",
    video: "/destinations/florence-1504.mp4",
    emoji: "🎨",
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}
