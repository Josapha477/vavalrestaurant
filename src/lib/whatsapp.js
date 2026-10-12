import { site } from "../data/site";
import { formatDate, formatHour, formatPrice } from "./format";

export function whatsappLink(message) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// items : [{ dish, qty }]
export function orderMessage({ items, subtotal, mode, name, address, note }) {
  const lines = items.map(
    ({ dish, qty }) => `• ${qty} × ${dish.name} (${formatPrice(dish.price * qty)})`
  );
  return [
    `Bonjour ${site.name}, je voudrais commander :`,
    ...lines,
    "",
    `Sous-total : ${formatPrice(subtotal)} (hors frais de livraison)`,
    `Mode : ${mode === "livraison" ? "Livraison" : "À emporter"}`,
    `Nom : ${name}`,
    mode === "livraison" ? `Adresse : ${address}` : null,
    note ? `Remarque : ${note}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function reservationMessage({ name, guests, date, time, note }) {
  return [
    `Bonjour ${site.name}, je voudrais réserver une table :`,
    `Nom : ${name}`,
    `Personnes : ${guests}`,
    `Date : ${formatDate(date)}`,
    `Heure : ${formatHour(time)}`,
    note ? `Remarque : ${note}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

// Ouvre WhatsApp dans un nouvel onglet (appelé depuis un clic ou un envoi de formulaire)
export function openWhatsApp(message) {
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
}
