import { type ReactNode } from "react";

// CTAボタン（ディープオリーブ）。アンカーとして #trial フォームへ誘導。
export function CtaButton({
  children,
  href = "#trial",
  className = "",
  size = "lg",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  size?: "lg" | "md";
}) {
  const sizeCls =
    size === "lg"
      ? "px-8 py-4 text-base"
      : "px-6 py-3 text-sm";
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded bg-olive font-bold tracking-wide text-white transition-colors duration-300 hover:bg-olive-hover ${sizeCls} ${className}`}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="text-lg leading-none">
        →
      </span>
    </a>
  );
}
