import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { site } from "../data/site";
import { formatHour } from "../lib/format";
import { nowInHaiti, reservationSlots } from "../lib/time";
import { openWhatsApp, reservationMessage } from "../lib/whatsapp";
import Button from "./Button";

const field =
  "mt-1 w-full rounded-2xl border-2 border-ink/20 bg-white px-4 py-3 text-ink focus:border-ink focus:outline-none";

export default function Reservation() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  const today = nowInHaiti().date;
  // Les créneaux dépendent de la date choisie (jour de fermeture, heure actuelle…)
  const slots = useMemo(() => reservationSlots(date), [date]);
  const closed = date && slots.length === 0;

  const submit = (e) => {
    e.preventDefault();
    openWhatsApp(reservationMessage({ name: name.trim(), guests, date, time, note: note.trim() }));
  };

  return (
    <section id="reservation" className="bg-pink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <h2 className="text-4xl sm:text-5xl">Réservez votre table.</h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/90">
            Choisissez la date, l'heure et le nombre de personnes. Votre demande part sur WhatsApp, et
            la réservation est confirmée quand le restaurant vous répond.
          </p>
        </div>

        <form onSubmit={submit} className="rounded-3xl bg-white p-6 text-ink sm:p-8">
          <label className="block font-semibold">
            Votre nom
            <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
          </label>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <label className="block font-semibold">
              Personnes
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={field}>
                {Array.from({ length: site.reservation.maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label className="block font-semibold">
              Date
              <input
                required
                type="date"
                min={today}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setTime("");
                }}
                className={field}
              />
            </label>
          </div>

          <label className="mt-4 block font-semibold">
            Heure
            <select required value={time} onChange={(e) => setTime(e.target.value)} disabled={!date || closed} className={`${field} disabled:opacity-60`}>
              <option value="">{date ? "Choisissez une heure" : "Choisissez d'abord une date"}</option>
              {slots.map((slot) => (
                <option key={slot} value={slot}>
                  {formatHour(slot)}
                </option>
              ))}
            </select>
          </label>
          {closed && (
            <p role="alert" className="mt-2 text-sm font-semibold text-pink">
              Aucun créneau libre ce jour-là (fermé ou service terminé). Choisissez une autre date.
            </p>
          )}

          <label className="mt-4 block font-semibold">
            Remarque (facultatif)
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anniversaire, chaise bébé, allergie…"
              className={field}
            />
          </label>

          <Button type="submit" variant="whatsapp" icon={Send} className="mt-6 w-full" disabled={closed}>
            Envoyer ma demande sur WhatsApp
          </Button>
        </form>
      </div>
    </section>
  );
}
