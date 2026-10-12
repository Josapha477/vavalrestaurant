import { site } from "../data/site";

const nombre = new Intl.NumberFormat("fr-FR");

// 1700 → "1 700 HTG" (espaces insécables : le prix ne se coupe jamais)
export function formatPrice(amount) {
  return `${nombre.format(amount)}\u00a0${site.currency}`;
}

// "11:00" → "11 h", "12:30" → "12 h 30"
export function formatHour(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return m ? `${h} h ${String(m).padStart(2, "0")}` : `${h} h`;
}

// "2026-10-14" → "mercredi 14 octobre"
export function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
