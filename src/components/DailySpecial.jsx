import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { dailySpecials, dishById } from "../data/menu";
import { dayNames } from "../data/site";
import { formatPrice } from "../lib/format";
import { nowInHaiti } from "../lib/time";
import Button from "./Button";
import { DishCircle } from "./DishVisual";
import Tags from "./Tags";

export default function DailySpecial({ onOpenDish }) {
  const { add } = useCart();
  const { day } = nowInHaiti();
  const dish = dishById[dailySpecials[day]];
  if (!dish) return null;

  return (
    <section id="plat-du-jour" className="bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[auto_1fr] md:gap-16 md:py-24">
        <DishCircle dish={dish} className="mx-auto aspect-square w-64 sm:w-80" />
        <div>
          <h2 className="text-4xl sm:text-5xl">Plat du jour</h2>
          <p className="mt-2 text-lg font-semibold text-pink">Aujourd'hui, {dayNames[day]}</p>
          <h3 className="mt-6 text-3xl">{dish.name}</h3>
          <p className="mt-2 max-w-md text-lg leading-relaxed text-muted">{dish.description}</p>
          <div className="mt-3">
            <Tags tags={dish.tags} />
          </div>
          <p className="mt-4 text-2xl font-bold">{formatPrice(dish.price)}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="pink" icon={Plus} onClick={() => add(dish.id, 1)}>
              Ajouter à ma commande
            </Button>
            <Button variant="outline" onClick={() => onOpenDish(dish)}>
              Voir le détail
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
