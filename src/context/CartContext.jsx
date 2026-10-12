import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { dishById } from "../data/menu";
import { loadJSON, saveJSON } from "../lib/storage";

const STORAGE_KEY = "vaval-commande";
const CartContext = createContext(null);

// On relit la commande sauvegardée en ignorant tout plat qui n'existe plus au menu
function loadLines() {
  const saved = loadJSON(STORAGE_KEY, []);
  if (!Array.isArray(saved)) return [];
  return saved.filter(
    (l) => l && dishById[l.id] && Number.isInteger(l.qty) && l.qty > 0 && l.qty <= 99
  );
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadLines);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const timer = useRef(null);

  useEffect(() => saveJSON(STORAGE_KEY, lines), [lines]);

  const notify = useCallback((message) => {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2200);
  }, []);

  const add = useCallback(
    (id, qty = 1) => {
      setLines((prev) => {
        const found = prev.find((l) => l.id === id);
        if (found) {
          return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(99, l.qty + qty) } : l));
        }
        return [...prev, { id, qty }];
      });
      notify(`${dishById[id].name} ajouté à votre commande`);
    },
    [notify]
  );

  const setQty = useCallback((id, qty) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(99, qty) } : l))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    const items = lines.map((l) => ({ dish: dishById[l.id], qty: l.qty }));
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((sum, i) => sum + i.dish.price * i.qty, 0),
      add,
      setQty,
      clear,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      toast,
    };
  }, [lines, add, setQty, clear, cartOpen, toast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}
