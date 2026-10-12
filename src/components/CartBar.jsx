import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";

// Barre fixe en bas de l'écran dès qu'un plat est ajouté, + message de confirmation
export default function CartBar() {
  const { count, subtotal, openCart, cartOpen, toast } = useCart();

  return (
    <>
      <div aria-live="polite" className="sr-only">
        {toast}
      </div>

      {toast && (
        <p className="toast fixed inset-x-4 bottom-24 z-30 mx-auto max-w-sm rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-white shadow-lg">
          {toast}
        </p>
      )}

      {count > 0 && !cartOpen && (
        <button
          type="button"
          onClick={openCart}
          className="fixed inset-x-4 bottom-4 z-30 mx-auto flex max-w-md items-center justify-between rounded-full bg-pink px-6 py-4 font-bold text-white shadow-lg hover:bg-pink-dark"
        >
          <span className="inline-flex items-center gap-2">
            <ShoppingBag size={22} aria-hidden="true" />
            Voir ma commande ({count})
          </span>
          <span>{formatPrice(subtotal)}</span>
        </button>
      )}
    </>
  );
}
