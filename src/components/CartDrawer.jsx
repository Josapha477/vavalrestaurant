import { useEffect, useRef, useState } from "react";
import { Send, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import { openWhatsApp, orderMessage } from "../lib/whatsapp";
import Button from "./Button";
import QuantityStepper from "./QuantityStepper";

const field =
  "mt-1 w-full rounded-2xl border-2 border-ink/20 bg-white px-4 py-3 focus:border-ink focus:outline-none";

export default function CartDrawer() {
  const { items, subtotal, count, setQty, clear, cartOpen, closeCart } = useCart();
  const ref = useRef(null);
  const [mode, setMode] = useState("livraison");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (cartOpen && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!cartOpen && dialog.open) dialog.close();
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const submit = (e) => {
    e.preventDefault(); // la validation native (champs requis) a déjà eu lieu
    openWhatsApp(orderMessage({ items, subtotal, mode, name: name.trim(), address: address.trim(), note: note.trim() }));
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="cart-title"
      onClose={closeCart}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      className="sheet m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-paper p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex min-h-full flex-col">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-paper px-5 py-3">
          <h2 id="cart-title" className="text-2xl">
            Ma commande
          </h2>
          <button
            type="button"
            onClick={() => ref.current.close()}
            aria-label="Fermer ma commande"
            className="inline-flex size-11 items-center justify-center rounded-full hover:bg-ink/10"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
            <ShoppingBag size={48} className="text-muted" aria-hidden="true" />
            <p className="text-lg font-semibold">Votre commande est vide.</p>
            <p className="text-muted">Ajoutez des plats depuis le menu pour commencer.</p>
            <Button
              variant="pink"
              href="#menu"
              onClick={() => ref.current.close()}
            >
              Voir le menu
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-1 flex-col px-5 pb-6">
            <ul className="divide-y divide-ink/10">
              {items.map(({ dish, qty }) => (
                <li key={dish.id} className="py-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold">{dish.name}</p>
                    <p className="shrink-0 font-bold">{formatPrice(dish.price * qty)}</p>
                  </div>
                  <p className="text-sm text-muted">{formatPrice(dish.price)} l'unité</p>
                  <div className="mt-2 flex items-center justify-between">
                    <QuantityStepper value={qty} min={0} onChange={(v) => setQty(dish.id, v)} label={`Quantité de ${dish.name}`} />
                    <button
                      type="button"
                      onClick={() => setQty(dish.id, 0)}
                      aria-label={`Retirer ${dish.name}`}
                      className="inline-flex size-11 items-center justify-center rounded-full text-pink hover:bg-pink/10"
                    >
                      <Trash2 size={20} aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <p className="flex items-center justify-between border-t-2 border-ink py-4 text-lg font-bold">
              <span>Sous-total ({count} article{count > 1 ? "s" : ""})</span>
              <span>{formatPrice(subtotal)}</span>
            </p>

            <fieldset className="mt-2">
              <legend className="font-semibold">Comment souhaitez-vous être servi ?</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  ["livraison", "Livraison"],
                  ["emporter", "À emporter"],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className={`flex min-h-12 cursor-pointer items-center justify-center rounded-full border-2 font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pink ${
                      mode === value ? "border-ink bg-ink text-white" : "border-ink/20"
                    }`}
                  >
                    <input type="radio" name="mode" value={value} checked={mode === value} onChange={() => setMode(value)} className="sr-only" />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="mt-4 block font-semibold">
              Votre nom
              <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
            </label>

            {mode === "livraison" && (
              <label className="mt-4 block font-semibold">
                Adresse de livraison
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rue, quartier, repère"
                  autoComplete="street-address"
                  className={field}
                />
              </label>
            )}

            <label className="mt-4 block font-semibold">
              Remarque (facultatif)
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Allergie, sans piment, heure souhaitée…"
                className={field}
              />
            </label>

            <Button type="submit" variant="whatsapp" icon={Send} className="mt-6 w-full">
              Envoyer ma commande sur WhatsApp
            </Button>
            <p className="mt-3 text-sm text-muted">
              Aucun paiement en ligne. Le restaurant vous répond sur WhatsApp pour confirmer le prix final,
              les frais de livraison et le délai.
            </p>
            <button type="button" onClick={clear} className="mt-4 self-start text-sm font-semibold text-pink underline underline-offset-4">
              Vider ma commande
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
