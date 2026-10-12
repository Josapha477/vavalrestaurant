import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { categories } from "../data/menu";
import { formatPrice } from "../lib/format";
import Button from "./Button";
import { DishCircle } from "./DishVisual";
import QuantityStepper from "./QuantityStepper";
import Tags from "./Tags";

// Balise HTML <dialog> : Échap, piège du focus et arrière-plan gérés par le navigateur.
export default function DishModal({ dish, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (dish && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!dish && dialog.open) dialog.close();
    return () => {
      document.body.style.overflow = "";
    };
  }, [dish]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="dish-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      className="m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-xl overflow-y-auto rounded-3xl bg-white p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      {dish && <Content key={dish.id} dish={dish} onClose={() => ref.current.close()} />}
    </dialog>
  );
}

function Content({ dish, onClose }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const category = categories.find((c) => c.id === dish.category);

  return (
    <div className="relative p-6 sm:p-8">
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-full hover:bg-ink/10"
      >
        <X size={24} aria-hidden="true" />
      </button>

      <DishCircle dish={dish} className="mx-auto aspect-square w-48 sm:w-56" />
      <p className="mt-6 text-sm font-medium text-muted">{category?.label}</p>
      <h2 id="dish-title" className="mt-1 text-3xl leading-tight">
        {dish.name}
      </h2>
      <p className="mt-2 text-2xl font-bold text-pink">{formatPrice(dish.price)}</p>
      <p className="mt-4 text-lg leading-relaxed text-muted">{dish.description}</p>
      <div className="mt-3">
        <Tags tags={dish.tags} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <QuantityStepper value={qty} onChange={setQty} label={`Quantité de ${dish.name}`} />
        <Button
          variant="pink"
          onClick={() => {
            add(dish.id, qty);
            onClose();
          }}
        >
          Ajouter, {formatPrice(dish.price * qty)}
        </Button>
      </div>
      <p className="mt-4 text-sm text-muted">
        Une allergie ou une demande particulière ? Précisez-la dans la remarque de votre commande.
      </p>
    </div>
  );
}
