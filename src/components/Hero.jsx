import { CalendarDays, UtensilsCrossed } from "lucide-react";
import { dishById } from "../data/menu";
import { useOpenStatus } from "../hooks/useOpenStatus";
import Button from "./Button";
import { DishCircle } from "./DishVisual";

export default function Hero() {
  const status = useOpenStatus();

  return (
    <section id="accueil" className="on-dark bg-forest text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-[1.1fr_1fr] md:py-20">
        <div>
          <p
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold"
            role="status"
          >
            <span
              aria-hidden="true"
              className={`size-2.5 rounded-full ${status.open ? "bg-mango" : "bg-pink"}`}
            />
            {status.text}
          </p>
          <h1 className="mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Le goût de Jacmel, à table ou chez vous.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85">
            Griot, lambi, poisson frit et jus frais, cuisinés chaque jour au cœur de Jacmel. Composez
            votre commande ou réservez une table : tout part en un message WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="mango" href="#menu" icon={UtensilsCrossed}>
              Voir le menu
            </Button>
            <Button variant="outlineLight" href="#reservation" icon={CalendarDays}>
              Réserver une table
            </Button>
          </div>
        </div>

        {/* Assiettes : la grande tourne très lentement, les petites arrivent en décalé */}
        <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
          <div className="rise absolute inset-[6%]" style={{ animationDelay: "0.1s" }}>
            <div className="spin-slow size-full">
              <DishCircle dish={dishById["griot"]} className="size-full" />
            </div>
          </div>
          <div className="rise absolute -bottom-2 -left-2 w-[34%]" style={{ animationDelay: "0.3s" }}>
            <DishCircle dish={dishById["legim"]} className="aspect-square w-full ring-8 ring-forest" />
          </div>
          <div className="rise absolute -right-2 top-0 w-[28%]" style={{ animationDelay: "0.5s" }}>
            <DishCircle dish={dishById["jus-mangue"]} className="aspect-square w-full ring-8 ring-forest" />
          </div>
        </div>
      </div>
      <div className="mosaic" aria-hidden="true" />
    </section>
  );
}
