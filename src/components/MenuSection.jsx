import { useMemo, useState } from "react";
import { Flame, Leaf, Search } from "lucide-react";
import { categories, dishes } from "../data/menu";
import Button from "./Button";
import DishRow from "./DishRow";

const ALL = "tous";

// Compare sans tenir compte des accents ni des majuscules : "poulet" trouve "Poulet", "cafe" trouve "Café"
const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const chip = (active) =>
  `min-h-11 shrink-0 rounded-full border-2 px-4 font-semibold transition-colors ${
    active ? "border-ink bg-ink text-white" : "border-ink/20 hover:border-ink"
  }`;

export default function MenuSection({ onOpenDish }) {
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");
  const [diets, setDiets] = useState([]); // "vegetarien" et/ou "piquant"

  const toggleDiet = (tag) =>
    setDiets((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const reset = () => {
    setCategory(ALL);
    setQuery("");
    setDiets([]);
  };

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return dishes.filter(
      (d) =>
        (category === ALL || d.category === category) &&
        diets.every((t) => d.tags.includes(t)) &&
        (!q || normalize(`${d.name} ${d.description}`).includes(q))
    );
  }, [category, query, diets]);

  const groups = categories
    .map((c) => ({ ...c, dishes: visible.filter((d) => d.category === c.id) }))
    .filter((g) => g.dishes.length > 0);

  return (
    <section id="menu" className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-4xl sm:text-5xl">Le menu</h2>
        <p className="mt-3 text-lg text-muted">
          Touchez un plat pour le détail, ou le bouton + pour l'ajouter directement à votre commande.
        </p>
      </div>

      {/* Barre de filtres collée sous l'en-tête pendant le défilement */}
      <div className="sticky top-16 z-20 border-y border-ink/10 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-3xl space-y-3 px-4 py-3 sm:px-6">
          <div className="relative">
            <label htmlFor="recherche" className="sr-only">
              Rechercher un plat
            </label>
            <Search size={20} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="recherche"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un plat (griot, poisson, café…)"
              className="min-h-12 w-full rounded-full border-2 border-ink/20 bg-white pl-12 pr-4 focus:border-ink focus:outline-none"
            />
          </div>

          <div role="group" aria-label="Filtrer par catégorie" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            {[{ id: ALL, label: "Tout" }, ...categories].map((c) => (
              <button key={c.id} type="button" aria-pressed={category === c.id} onClick={() => setCategory(c.id)} className={chip(category === c.id)}>
                {c.label}
              </button>
            ))}
          </div>

          <div role="group" aria-label="Filtrer par régime" className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={diets.includes("vegetarien")} onClick={() => toggleDiet("vegetarien")} className={`${chip(diets.includes("vegetarien"))} inline-flex items-center gap-1.5`}>
              <Leaf size={16} aria-hidden="true" /> Végétarien
            </button>
            <button type="button" aria-pressed={diets.includes("piquant")} onClick={() => toggleDiet("piquant")} className={`${chip(diets.includes("piquant"))} inline-flex items-center gap-1.5`}>
              <Flame size={16} aria-hidden="true" /> Piquant
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-24 pt-6 sm:px-6">
        <p className="text-sm text-muted" aria-live="polite">
          {visible.length} plat{visible.length > 1 ? "s" : ""}
        </p>

        {groups.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg font-semibold">Aucun plat ne correspond à votre recherche.</p>
            <p className="mt-1 text-muted">Essayez un autre mot ou retirez un filtre.</p>
            <Button variant="outline" className="mt-6" onClick={reset}>
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.id} className="mt-8">
              <h3 className="text-2xl" id={`cat-${group.id}`}>
                {group.label}
              </h3>
              <ul aria-labelledby={`cat-${group.id}`} className="mt-2">
                {group.dishes.map((dish) => (
                  <DishRow key={dish.id} dish={dish} onOpen={onOpenDish} />
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
