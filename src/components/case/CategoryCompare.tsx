import { categories } from "@/lib/case";

// Lighthouse 4カテゴリの Before/After をCSSバーで比較（グラフライブラリ不使用）。
// スコア0-100をバー幅%で表現。Afterはオリーブ、Beforeはグレー。
function Bar({
  score,
  tone,
}: {
  score: number;
  tone: "before" | "after";
}) {
  const fill = tone === "after" ? "bg-olive" : "bg-ink/25";
  const labelColor = tone === "after" ? "text-olive" : "text-ink/70";
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 shrink-0 text-xs text-ink/75">
        {tone === "after" ? "After" : "Before"}
      </span>
      <span
        className="h-2 flex-1 overflow-hidden rounded-full bg-line"
        role="img"
        aria-label={`${tone === "after" ? "After" : "Before"} ${score}点`}
      >
        <span
          className={`block h-full rounded-full ${fill}`}
          style={{ width: `${score}%` }}
        />
      </span>
      <span className={`w-9 shrink-0 text-right font-serif text-lg ${labelColor}`}>
        {score}
      </span>
    </div>
  );
}

export function CategoryCompare() {
  return (
    <ul className="flex flex-col gap-8">
      {categories.map((c) => {
        const diff = c.after - c.before;
        return (
          <li key={c.label} className="border-b border-line pb-8 last:border-0">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <div>
                <span className="font-serif text-lg text-ink">{c.label}</span>
                <span className="ml-2 text-xs text-ink/75">{c.sub}</span>
              </div>
              <span className="whitespace-nowrap text-xs font-bold text-olive">
                +{diff}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Bar score={c.before} tone="before" />
              <Bar score={c.after} tone="after" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
