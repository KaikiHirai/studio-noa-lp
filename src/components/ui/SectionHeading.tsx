import { type ReactNode } from "react";

// セクション見出し共通。小さな英字ラベル＋和文主見出し。
// align はセクションごとに変えてレイアウトの単調さを避ける。
export function SectionHeading({
  label,
  title,
  align = "left",
  invert = false,
  className = "",
}: {
  label: string;
  title: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  const labelColor = invert ? "text-beige" : "text-olive";
  const barColor = invert ? "bg-beige" : "bg-olive";
  return (
    <div className={`flex flex-col ${alignCls} ${className}`}>
      <span
        className={`mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${labelColor}`}
      >
        <span aria-hidden="true" className={`h-px w-8 ${barColor}`} />
        {label}
      </span>
      <h2 className="text-2xl leading-snug md:text-[2rem]">{title}</h2>
    </div>
  );
}
