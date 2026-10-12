import { Clock, MapPin, MessageCircle, UtensilsCrossed } from "lucide-react";
import { dayNames, site } from "../data/site";
import { formatHour } from "../lib/format";
import { nowInHaiti } from "../lib/time";
import { whatsappLink } from "../lib/whatsapp";
import Button from "./Button";

// Lundi en premier, comme on lit un planning en Haïti
const order = [1, 2, 3, 4, 5, 6, 0];

export default function Info() {
  const { day: today } = nowInHaiti();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.name} ${site.address.join(", ")}`
  )}`;

  return (
    <section id="infos" className="bg-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <h2 className="text-4xl sm:text-5xl">Nous trouver</h2>
          <ul className="mt-8 space-y-6">
            <li className="flex gap-4">
              <MapPin className="mt-1 shrink-0 text-pink" aria-hidden="true" />
              <address className="not-italic">
                <span className="block font-semibold">Adresse</span>
                {site.address.map((line) => (
                  <span key={line} className="block text-muted">{line}</span>
                ))}
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-semibold text-pink underline underline-offset-4">
                  Voir l'itinéraire<span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>
                </a>
              </address>
            </li>
            <li className="flex gap-4">
              <UtensilsCrossed className="mt-1 shrink-0 text-pink" aria-hidden="true" />
              <div>
                <span className="block font-semibold">Services</span>
                {site.services.map((s) => (
                  <span key={s} className="block text-muted">{s}</span>
                ))}
              </div>
            </li>
            <li className="flex gap-4">
              <MessageCircle className="mt-1 shrink-0 text-pink" aria-hidden="true" />
              <div>
                <span className="block font-semibold">WhatsApp</span>
                <span className="block text-muted">{site.whatsappDisplay}</span>
              </div>
            </li>
          </ul>
          <Button variant="whatsapp" href={whatsappLink()} external icon={MessageCircle} className="mt-8">
            Écrire au restaurant
          </Button>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-2xl">
            <Clock aria-hidden="true" className="text-pink" /> Horaires
          </h3>
          <table className="mt-4 w-full">
            <caption className="sr-only">Horaires d'ouverture</caption>
            <tbody>
              {order.map((d) => (
                <tr key={d} className={`border-b border-ink/10 ${d === today ? "font-bold" : ""}`}>
                  <th scope="row" className="py-3 text-left font-[inherit] capitalize">
                    {dayNames[d]}
                    {d === today && <span className="ml-2 rounded-full bg-mango px-2 py-0.5 text-xs text-ink">Aujourd'hui</span>}
                  </th>
                  <td className="py-3 text-right text-muted">
                    {site.hours[d] ? `${formatHour(site.hours[d][0])} à ${formatHour(site.hours[d][1])}` : "Fermé"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
