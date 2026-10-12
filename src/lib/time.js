import { dayNames, site } from "../data/site";
import { formatHour } from "./format";

const weekdays = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (min) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

// Jour, minute et date AU RESTAURANT (Haïti), quel que soit l'appareil du visiteur.
export function nowInHaiti(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type).value;
  return {
    day: weekdays[get("weekday")],
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
    date: `${get("year")}-${get("month")}-${get("day")}`,
  };
}

// { open: true/false, text: "Ouvert jusqu'à 21 h" }
export function openStatus(date = new Date()) {
  const { day, minutes } = nowInHaiti(date);
  const today = site.hours[day];
  if (today && minutes >= toMinutes(today[0]) && minutes < toMinutes(today[1])) {
    return { open: true, text: `Ouvert jusqu'à ${formatHour(today[1])}` };
  }
  if (today && minutes < toMinutes(today[0])) {
    return { open: false, text: `Fermé, ouvre à ${formatHour(today[0])}` };
  }
  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    if (site.hours[next]) {
      const when = i === 1 ? "demain" : dayNames[next];
      return { open: false, text: `Fermé, ouvre ${when} à ${formatHour(site.hours[next][0])}` };
    }
  }
  return { open: false, text: "Fermé" };
}

// Créneaux de réservation disponibles pour une date "AAAA-MM-JJ".
// Pour aujourd'hui, on retire les créneaux déjà passés (+ 30 min de marge).
export function reservationSlots(isoDate) {
  if (!isoDate) return [];
  const day = new Date(`${isoDate}T12:00:00Z`).getUTCDay();
  const range = site.hours[day];
  if (!range) return [];
  const { slotMinutes, lastSeatingBeforeClose } = site.reservation;
  const start = toMinutes(range[0]);
  const end = toMinutes(range[1]) - lastSeatingBeforeClose;
  const now = nowInHaiti();
  const earliest = isoDate === now.date ? now.minutes + 30 : 0;
  const slots = [];
  for (let t = start; t <= end; t += slotMinutes) {
    if (t >= earliest) slots.push(toHHMM(t));
  }
  return slots;
}
