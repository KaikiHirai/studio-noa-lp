import { type ReactNode } from "react";

// 重要な数字を大きく単独で見せる（説明を読まなくても意味が伝わるように）。
export function BigStat({
  value,
  unit,
  caption,
  tone = "ink",
  sub,
}: {
  value: string;
  unit?: string;
  caption: ReactNode;
  tone?: "ink" | "olive" | "fade";
  sub?: ReactNode;
}) {
  const color =
    tone === "olive" ? "text-olive" : tone === "fade" ? "text-ink/40" : "text-ink";
  return (
    <div className="text-left">
      <p className={`font-serif font-medium leading-none ${color}`}>
        <span className="text-6xl md:text-8xl">{value}</span>
        {unit && <span className="ml-1 text-2xl md:text-3xl">{unit}</span>}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink/75">{caption}</p>
      {sub && <p className="mt-1 text-xs text-ink/75">{sub}</p>}
    </div>
  );
}
