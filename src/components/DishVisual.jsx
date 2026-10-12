// Dessins SVG des plats : la démo reste jolie sans photos.
// Avec une vraie photo, ajoutez "image" dans menu.js : elle remplace le dessin.
const INK = "#10231d";
const edge = { stroke: INK, strokeOpacity: 0.3, strokeWidth: 1.5, strokeLinejoin: "round", strokeLinecap: "round" };
const line = { stroke: INK, strokeOpacity: 0.25, strokeWidth: 1.5, fill: "none", strokeLinecap: "round" };

const shapes = {
  // Assiette vue du dessus : riz, viande, bananes
  plate: (c) => (
    <>
      <circle cx="50" cy="50" r="46" fill="#fff" {...edge} />
      <circle cx="50" cy="50" r="36" fill="none" {...line} />
      <circle cx="37" cy="56" r="17" fill="#fff6dd" {...edge} />
      <circle cx="31" cy="52" r="2.2" fill="#8a4b2d" />
      <circle cx="39" cy="60" r="2.2" fill="#8a4b2d" />
      <circle cx="42" cy="50" r="2.2" fill="#8a4b2d" />
      <rect x="56" y="26" width="19" height="14" rx="5" fill={c} transform="rotate(-18 65 33)" {...edge} />
      <rect x="62" y="42" width="19" height="14" rx="5" fill={c} transform="rotate(12 71 49)" {...edge} />
      <rect x="52" y="44" width="16" height="12" rx="5" fill={c} transform="rotate(-6 60 50)" {...edge} />
      <ellipse cx="62" cy="70" rx="10" ry="5" fill="#f2c038" transform="rotate(-20 62 70)" {...edge} />
      <ellipse cx="48" cy="76" rx="9" ry="4.5" fill="#f2c038" transform="rotate(10 48 76)" {...edge} />
    </>
  ),
  fish: (c) => (
    <>
      <ellipse cx="50" cy="50" rx="47" ry="36" fill="#fff" {...edge} />
      <path d="M16 50 Q32 28 58 32 Q76 36 80 50 Q76 64 58 68 Q32 72 16 50 Z" fill={c} {...edge} />
      <path d="M80 50 L93 38 L93 62 Z" fill={c} {...edge} />
      <circle cx="27" cy="46" r="3.4" fill="#fff" />
      <circle cx="26.5" cy="46" r="1.6" fill={INK} />
      <path d="M42 38 Q47 50 42 62 M54 36 Q59 50 54 64" {...line} />
      <circle cx="70" cy="78" r="8" fill="#9ed36a" {...edge} />
      <circle cx="70" cy="78" r="3" fill="#fff" fillOpacity="0.6" />
    </>
  ),
  bowl: (c) => (
    <>
      <circle cx="50" cy="50" r="46" fill="#fff" {...edge} />
      <circle cx="50" cy="50" r="37" fill={c} {...edge} />
      <circle cx="50" cy="50" r="37" fill="#000" fillOpacity="0.1" />
      <circle cx="38" cy="40" r="7" fill="#f2c038" {...edge} />
      <circle cx="60" cy="36" r="6" fill="#e8743b" {...edge} />
      <circle cx="64" cy="58" r="7" fill="#fff6dd" {...edge} />
      <circle cx="40" cy="62" r="6" fill="#e8743b" {...edge} />
      <circle cx="52" cy="50" r="5" fill="#8f5fb0" {...edge} />
    </>
  ),
  snack: (c) => (
    <>
      <circle cx="50" cy="50" r="46" fill="#fff" {...edge} />
      {[[36, 38], [60, 36], [48, 56], [70, 58], [30, 62]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="10" fill={c} {...edge} />
          <circle cx={x - 3} cy={y - 3} r="3" fill="#fff" fillOpacity="0.35" />
        </g>
      ))}
    </>
  ),
  glass: (c) => (
    <>
      <path d="M58 6 L52 44" stroke={INK} strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M27 20 H73 L67 88 Q66 93 61 93 H39 Q34 93 33 88 Z" fill="#fff" fillOpacity="0.55" {...edge} />
      <path d="M30 36 H70 L66 86 Q65 89 61 89 H39 Q35 89 34 86 Z" fill={c} />
      <rect x="40" y="48" width="12" height="12" rx="2" fill="#fff" fillOpacity="0.35" transform="rotate(12 46 54)" />
      <rect x="52" y="64" width="11" height="11" rx="2" fill="#fff" fillOpacity="0.35" transform="rotate(-10 57 69)" />
      <circle cx="73" cy="20" r="9" fill="#9ed36a" {...edge} />
      <circle cx="73" cy="20" r="3.5" fill="#fff" fillOpacity="0.6" />
    </>
  ),
  cup: (c) => (
    <>
      <circle cx="50" cy="52" r="44" fill="#fff" {...edge} />
      <rect x="70" y="46" width="22" height="10" rx="5" fill="#fff" {...edge} />
      <circle cx="46" cy="52" r="30" fill="#fff" {...edge} />
      <circle cx="46" cy="52" r="24" fill={c} />
      <ellipse cx="38" cy="44" rx="8" ry="4" fill="#fff" fillOpacity="0.2" transform="rotate(-30 38 44)" />
    </>
  ),
  bottle: (c) => (
    <>
      <path d="M44 8 H56 V32 Q63 40 63 52 V90 Q63 95 58 95 H42 Q37 95 37 90 V52 Q37 40 44 32 Z" fill={c} {...edge} />
      <rect x="40" y="54" width="20" height="26" rx="2" fill="#fff" fillOpacity="0.85" />
      <path d="M44 62 H56 M44 68 H54" {...line} />
      <rect x="42" y="4" width="16" height="6" rx="2" fill="#ffb627" {...edge} />
    </>
  ),
  dessert: (c) => (
    <>
      <circle cx="50" cy="50" r="46" fill="#fff" {...edge} />
      <rect x="22" y="32" width="56" height="38" rx="7" fill={c} {...edge} />
      <rect x="22" y="32" width="56" height="12" rx="6" fill="#fff" fillOpacity="0.3" />
      <circle cx="50" cy="28" r="5" fill="#c4165a" {...edge} />
    </>
  ),
};

export default function DishVisual({ dish }) {
  if (dish.image) {
    return <img src={dish.image} alt={dish.name} loading="lazy" className="h-full w-full object-cover" />;
  }
  const draw = shapes[dish.shape] ?? shapes.plate;
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="w-[82%]">
      {draw(dish.color)}
    </svg>
  );
}

// Le visuel dans un cercle de couleur. La taille se règle avec "className".
export function DishCircle({ dish, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full ${className}`}
      style={{ backgroundColor: dish.tone }}
    >
      <DishVisual dish={dish} />
    </div>
  );
}
