// ─────────────────────────────────────────────────────────────
// Informations du restaurant. Tout ce qui change d'un client à
// l'autre se règle ici (et dans menu.js), pas dans les composants.
// ─────────────────────────────────────────────────────────────
export const site = {
  name: "Vaval",
  tagline: "Cuisine haïtienne de Jacmel",
  // Format international, sans "+" ni espaces. Haïti = 509 + 8 chiffres.
  whatsappNumber: "50900000000",
  whatsappDisplay: "+509 00 00 0000",
  email: "bonjour@vaval.example",
  address: ["8, rue du Commerce", "Jacmel, Sud-Est, Haïti"],
  currency: "HTG",
  // Fuseau horaire du restaurant : l'état « Ouvert / Fermé » est juste
  // même si le visiteur est à l'étranger.
  timeZone: "America/Port-au-Prince",
  // 0 = dimanche … 6 = samedi. [ouverture, fermeture] en "HH:MM", ou null = fermé
  hours: {
    0: ["12:00", "18:00"],
    1: ["11:00", "21:00"],
    2: ["11:00", "21:00"],
    3: ["11:00", "21:00"],
    4: ["11:00", "21:00"],
    5: ["11:00", "21:00"],
    6: ["11:00", "21:00"],
  },
  reservation: {
    maxGuests: 12,
    slotMinutes: 30, // un créneau toutes les 30 minutes
    lastSeatingBeforeClose: 60, // dernière table 1 h avant la fermeture
  },
  services: ["Sur place", "À emporter", "Livraison à Jacmel centre"],
};

export const dayNames = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

export const navLinks = [
  { href: "#menu", label: "Menu" },
  { href: "#plat-du-jour", label: "Plat du jour" },
  { href: "#reservation", label: "Réserver" },
  { href: "#infos", label: "Infos" },
];
