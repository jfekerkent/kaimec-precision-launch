import type { Unit } from "@/lib/unitConvert";

interface Props {
  unit: Unit;
  onChange: (u: Unit) => void;
  variant?: "light" | "dark";
  className?: string;
}

export default function UnitToggle({ unit, onChange, variant = "dark", className = "" }: Props) {
  const isDark = variant === "dark";
  const borderClr = isDark ? "border-white/20" : "border-border";
  const inactiveClr = isDark ? "bg-transparent text-white hover:bg-white/10" : "bg-transparent text-foreground hover:bg-muted";
  const activeClr = "bg-primary text-secondary";
  return (
    <div className={`inline-flex mb-6 border overflow-hidden ${borderClr} ${className}`}>
      <button
        type="button"
        onClick={() => onChange("metric")}
        className={`px-5 py-2 text-sm font-bold transition-colors ${unit === "metric" ? activeClr : inactiveClr}`}
      >
        Metric (mm)
      </button>
      <button
        type="button"
        onClick={() => onChange("imperial")}
        className={`px-5 py-2 text-sm font-bold transition-colors ${unit === "imperial" ? activeClr : inactiveClr}`}
      >
        Imperial (in)
      </button>
    </div>
  );
}