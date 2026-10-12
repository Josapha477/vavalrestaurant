import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import { DishCircle } from "./DishVisual";
import Tags from "./Tags";

export default function DishRow({ dish, onOpen }) {
  const { add } = useCart();

  return (
    <li className="flex items-center gap-3 border-b border-ink/10 py-4 last:border-0">
      <button
        type="button"
        onClick={() => onOpen(dish)}
        aria-label={`${dish.name}, ${formatPrice(dish.price)}. Voir le détail`}
        className="flex min-w-0 flex-1 items-center gap-4 text-left"
      >
        <DishCircle dish={dish} className="size-20 shrink-0 sm:size-24" />
        <span className="min-w-0">
          <span className="block font-display text-xl leading-tight">{dish.name}</span>
          <span className="mt-1 line-clamp-2 block text-sm text-muted">{dish.description}</span>
          <span className="mt-1 block font-bold text-pink">{formatPrice(dish.price)}</span>
        </span>
      </button>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <button
          type="button"
          onClick={() => add(dish.id, 1)}
          aria-label={`Ajouter ${dish.name} à ma commande`}
          className="inline-flex size-12 items-center justify-center rounded-full bg-forest text-white transition-colors hover:bg-pink"
        >
          <Plus size={22} aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}
