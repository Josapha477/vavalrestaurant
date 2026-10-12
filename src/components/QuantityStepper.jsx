import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({ value, onChange, min = 1, label }) {
  const btn =
    "inline-flex size-11 items-center justify-center rounded-full border-2 border-ink/20 hover:border-ink disabled:opacity-40";
  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Retirer un">
        <Minus size={18} aria-hidden="true" />
      </button>
      <output className="min-w-8 text-center text-lg font-bold" aria-live="polite">
        {value}
      </output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= 99} aria-label="Ajouter un">
        <Plus size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
