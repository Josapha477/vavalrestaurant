import { navLinks, site } from "../data/site";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="on-dark bg-forest text-white">
      <div className="mosaic" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo dark />
          <p className="mt-3 max-w-xs text-white/80">{site.tagline}. Mèsi anpil !</p>
        </div>
        <nav aria-label="Pied de page">
          <p className="font-display text-lg">Navigation</p>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-white/80 hover:text-white hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-display text-lg">Contact</p>
          <ul className="mt-3 space-y-2 text-white/80">
            <li>{site.whatsappDisplay} (WhatsApp)</li>
            <li>{site.address.join(", ")}</li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white hover:underline">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-white/70 sm:px-6">
          © {new Date().getFullYear()} {site.name}. Site de démonstration : restaurant fictif créé pour un portfolio.
        </p>
      </div>
    </footer>
  );
}
