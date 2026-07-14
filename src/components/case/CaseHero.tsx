import { caseMeta } from "@/lib/case";

export function CaseHero() {
  return (
    <header className="border-b border-line bg-beige/30">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-20">
        <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-olive">
          <span aria-hidden="true" className="h-px w-8 bg-olive" />
          Case Study ／ 制作実績
        </p>
        <h1 className="text-3xl leading-snug md:text-[2.5rem] md:leading-tight">
          {caseMeta.title}
        </h1>
        <p className="mt-5 text-[0.95rem] leading-loose text-ink/85">
          女性専用パーソナルジムの集客サイトを、広告で戦える状態に作り直した記録。
          旧サイトの何が問題で、何を根拠にどう作り直したか——スコアの数字ではなく、
          その“内訳の読み方”まで含めてまとめました。
        </p>

        <p className="mt-6 rounded border border-line bg-base px-4 py-3 text-xs leading-relaxed text-ink/80">
          ※これは架空クライアント「STUDIO NOA」を想定した制作実績です。実在の店舗・サービスではありません。
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={caseMeta.beforeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded border border-line bg-base px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-ink/30"
          >
            Before を見る
            <span className="text-xs font-normal text-ink/75">2016年当時の再現</span>
          </a>
          <a
            href={caseMeta.afterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded bg-olive px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-olive-hover"
          >
            After を見る
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
