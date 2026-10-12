import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { navLinks, site } from "../data/site";

export function Logo({ dark = false }) {
  return (
    <span className="flex items-center gap-2 font-display text-2xl">
      <span aria-hidden="true" className="grid grid-cols-2 gap-0.5">
        <span className="size-3 rounded-sm bg-pink" />
        <span className="size-3 rounded-sm bg-mango" />
        <span className="size-3 rounded-sm bg-teal" />
        <span className={`size-3 rounded-sm ${dark ? "bg-paper" : "bg-forest"}`} />
      </span>
      {site.name}
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#accueil" aria-label={`${site.name}, accueil`}>
          <Logo />
        </a>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex gap-8 font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="py-2 hover:text-pink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Ma commande, ${count} article${count > 1 ? "s" : ""}`}
            className="relative inline-flex size-11 items-center justify-center rounded-full hover:bg-ink/10"
          >
            <ShoppingBag size={24} aria-hidden="true" />
            {count > 0 && (
              <span className="absolute right-0 top-0 inline-flex min-w-5 items-center justify-center rounded-full bg-pink px-1 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full hover:bg-ink/10 md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Menu mobile" className="border-t border-ink/10 bg-paper md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-ink/10 py-4 font-display text-xl last:border-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
