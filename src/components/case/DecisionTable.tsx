import { decisions } from "@/lib/case";

// 意図的に変更した3点。Before/After を対比し「なぜ」をビジネス言語で示す。
export function DecisionTable() {
  return (
    <div className="flex flex-col gap-12">
      {decisions.map((d, i) => (
        <div key={d.title}>
          <h3 className="flex items-baseline gap-3 text-lg md:text-xl">
            <span className="font-serif text-sm font-bold tracking-wider text-olive">
              {String(i + 1).padStart(2, "0")}
            </span>
            {d.title}
          </h3>

          <div className="mt-4 overflow-hidden rounded border border-line">
            <div className="grid grid-cols-[5.5rem_1fr_1fr] bg-beige/40 text-xs font-bold text-ink/70">
              <span className="px-3 py-2" />
              <span className="border-l border-line px-3 py-2">Before</span>
              <span className="border-l border-line px-3 py-2 text-olive">
                After
              </span>
            </div>
            {d.rows.map((r) => (
              <div
                key={r.k}
                className="grid grid-cols-[5.5rem_1fr_1fr] border-t border-line text-[0.85rem]"
              >
                <span className="bg-beige/20 px-3 py-3 text-xs font-bold text-ink/70">
                  {r.k}
                </span>
                <span className="border-l border-line px-3 py-3 text-ink/70">
                  {r.before}
                </span>
                <span className="border-l border-line px-3 py-3 font-medium text-ink">
                  {r.after}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 border-l-2 border-olive pl-4 text-[0.9rem] leading-loose text-ink/85">
            <span className="font-bold text-olive">理由：</span>
            {d.why}
          </p>
        </div>
      ))}
    </div>
  );
}
