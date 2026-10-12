import { Flame, Leaf, Star } from "lucide-react";

const config = {
  vegetarien: { label: "Végétarien", Icon: Leaf, className: "text-leaf" },
  piquant: { label: "Piquant", Icon: Flame, className: "text-pink" },
  populaire: { label: "Populaire", Icon: Star, className: "text-ink" },
};

export default function Tags({ tags }) {
  if (!tags?.length) return null;
  return (
    <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {tags.map((tag) => {
        const { label, Icon, className } = config[tag];
        return (
          <li key={tag} className={`inline-flex items-center gap-1 text-xs font-semibold ${className}`}>
            <Icon size={14} aria-hidden="true" />
            {label}
          </li>
        );
      })}
    </ul>
  );
}
