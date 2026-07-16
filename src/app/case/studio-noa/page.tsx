import type { Metadata } from "next";
import Image from "next/image";
import { CaseHero } from "@/components/case/CaseHero";
import { BigStat } from "@/components/case/BigStat";
import { CategoryCompare } from "@/components/case/CategoryCompare";
import { DecisionTable } from "@/components/case/DecisionTable";
import { BeforeAfterSlider } from "@/components/case/BeforeAfterSlider";
import {
  afterMetrics,
  beforeMetrics,
  caseMeta,
  causes,
  copies,
  perfWeights,
  techDecisions,
} from "@/lib/case";

export const metadata: Metadata = {
  title: {
    absolute: "STUDIO NOA サイトリニューアル｜制作実績（ケーススタディ）",
  },
  description:
    "女性専用パーソナルジムのサイトリニューアル事例。Lighthouse Performance 55→96・SEO 45→100、LCP 16.8秒→2.3秒。スコアの内訳の読み方から、料金・法務・SEOの意思決定まで。",
  alternates: { canonical: "/case/studio-noa" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "/case/studio-noa",
    title: "STUDIO NOA サイトリニューアル｜制作実績",
    description:
      "Performance 55→96・SEO 45→100、LCP 16.8秒→2.3秒。スコアの内訳を読み、料金・法務・SEOまで診断したリニューアル事例。",
    images: [
      {
        url: "/img/case/ogp.png",
        width: 1200,
        height: 630,
        alt: "STUDIO NOA サイトリニューアル Performance 55→96 / LCP 16.8秒→2.3秒",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

// 読み物向けの狭い本文カラム
function Prose({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-2xl px-6">{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-olive">
      <span aria-hidden="true" className="h-px w-8 bg-olive" />
      {children}
    </p>
  );
}

export default function CaseStudyPage() {
  return (
    <main className="bg-base pb-24">
      <CaseHero />

      {/* 2. 課題 */}
      <section className="py-16 md:py-24">
        <Prose>
          <SectionLabel>Problem</SectionLabel>
          <h2 className="text-2xl md:text-[1.75rem]">課題 — Before の何が問題だったか</h2>
          <p className="mt-5 text-[0.95rem] leading-loose text-ink/85">
            技術的な粗を並べるのが目的ではありません。それぞれが
            <strong className="font-bold">売上のどこを取りこぼしていたか</strong>
            で見ていきます。
          </p>
          <div className="mt-8 flex flex-col divide-y divide-line border-y border-line">
            {[
              {
                h: "スマホで見ると崩れる（viewport 指定なし）",
                b: "PC向けの固定幅のまま。スマホで開くと文字が極端に小さく、拡大しないと読めません。STUDIO NOA の集客は Instagram 広告が中心で、流入の約9割がスマートフォン。つまり「一番多く来る人にとって一番読みにくい」状態でした。",
              },
              {
                h: "表示に16.8秒かかる（LCP 16.8秒）",
                b: "広告は1クリックごとにお金がかかります。その費用を払って連れてきた見込み客が、メイン画像が出るまで16.8秒待たされる。多くの人はその前に戻るボタンを押します。払った広告費が、表示される前に消えていました。",
              },
              {
                h: "申し込む手段が電話しかない",
                b: "Webフォームが無く、問い合わせは電話のみ。仕事や育児の合間、営業時間外にサイトを見た人は「今すぐ申し込めない」。ターゲットの生活時間と申込手段が噛み合っていませんでした。",
              },
              {
                h: "何をすればいいか分からない（CTA不明瞭）",
                b: "「無料体験」への動線が弱く、ボタンも目立たない。訪れた人が次に取るべき行動が示されておらず、関心を持った人すら離脱していました。",
              },
            ].map((p) => (
              <div key={p.h} className="py-5">
                <h3 className="text-base font-bold text-ink">{p.h}</h3>
                <p className="mt-2 text-[0.9rem] leading-loose text-ink/80">{p.b}</p>
              </div>
            ))}
          </div>
        </Prose>
      </section>

      {/* 3. 最重要：スコアの罠（数字先行） */}
      <section className="border-y border-line bg-beige/40 py-16 md:py-24">
        <Prose>
          <SectionLabel>The Core</SectionLabel>
          <h2 className="text-2xl md:text-[1.75rem]">
            なぜ Lighthouse スコアだけでは判断できないか
          </h2>

          {/* 冒頭：巨大な16.8秒 */}
          <div className="mt-10">
            <BigStat
              value="16.8"
              unit="秒"
              tone="ink"
              caption="旧サイトが「メイン画像を表示」するまでにかかっていた時間（LCP）。"
              sub="広告費を払って連れてきた人の多くは、表示される前に離脱する。"
            />
          </div>

          <p className="mt-10 text-[0.95rem] leading-loose text-ink/85">
            ところが、この旧サイトの Performance は
            <strong className="font-bold"> 55点</strong>
            。「赤信号ではない、中くらい」に見えます。でも、これは危険な誤読です。
            Performance は複数の指標の<strong className="font-bold">加重平均</strong>で、
            モバイルの配点はこうなっています。
          </p>

          {/* 加重テーブル */}
          <div className="mt-6 overflow-hidden rounded border border-line bg-base">
            {perfWeights.map((w) => (
              <div
                key={w.label}
                className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-line px-4 py-3 last:border-0"
              >
                <div>
                  <span className="font-serif text-base text-ink">{w.label}</span>
                  <span className="ml-2 text-xs text-ink/75">{w.desc}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-16 overflow-hidden rounded-full bg-line sm:w-24">
                    <span
                      className={`block h-full rounded-full ${w.propped ? "bg-olive" : "bg-ink/25"}`}
                      style={{ width: `${(w.weight / 30) * 100}%` }}
                    />
                  </span>
                  <span className="w-9 text-right font-serif text-sm text-ink">
                    {w.weight}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink/75">
            緑＝旧サイトで満点になっていた指標（TBT・CLS）。合計 55%。
          </p>

          <p className="mt-8 text-[0.95rem] leading-loose text-ink/85">
            旧サイトは、表示速度の指標（LCP・FCP・Speed Index＝配点45%）が
            <strong className="font-bold">ほぼ0点</strong>。一方で TBT と CLS は
            <strong className="font-bold">満点</strong>でした。計算すると——
          </p>

          {/* 55 = 30 + 25 */}
          <div className="mt-8 rounded border border-line bg-base p-6 md:p-8">
            <p className="font-serif font-medium leading-none text-ink">
              <span className="text-6xl md:text-7xl">55</span>
              <span className="ml-3 text-2xl text-ink/70 md:text-3xl">
                = 30<span className="text-base text-ink/70">（TBT）</span> + 25
                <span className="text-base text-ink/70">（CLS）</span>
              </span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/75">
              満点だった2指標だけで55点。表示速度そのものはほぼ0点なのに、合計が
              <strong className="font-bold">実測の55点にぴったり一致</strong>します。
            </p>
          </div>

          {/* 結論（囲み） */}
          <blockquote className="mt-8 border-l-2 border-olive bg-base px-5 py-5 text-[0.95rem] font-bold leading-loose text-ink">
            JavaScript がほとんど無く、レイアウトもズレない——
            その一点で点が出ていただけ。
            <span className="text-olive">
              点数が出ているのは「JSが軽いから」であって、表示速度とは無関係でした。
            </span>
          </blockquote>

          <p className="mt-8 text-[0.95rem] leading-loose text-ink/85">
            TBT と CLS は、JSをほとんど使わない古い静的サイトなら
            <strong className="font-bold">構造的に満点になりやすい</strong>指標です。
            旧サイトは（皮肉にも）作りが古く軽量だったおかげで、体感は最悪でも点数だけは
            中くらいに見えていた。では、なぜ十数秒もかかっていたのか——原因は3つでした。
          </p>

          <ol className="mt-6 flex flex-col gap-4">
            {causes.map((c, i) => (
              <li key={c.head} className="flex gap-4 rounded border border-line bg-base p-4">
                <span className="font-serif text-xl font-bold text-olive">{i + 1}</span>
                <div>
                  <p className="text-sm font-bold text-ink">{c.head}</p>
                  <p className="mt-1 text-[0.85rem] leading-relaxed text-ink/75">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6 border-t border-line pt-8">
            <BigStat
              value="2.3"
              unit="秒"
              tone="olive"
              caption="After の LCP（16.8秒 → 2.3秒）"
            />
            <BigStat
              value="528"
              unit="KiB"
              tone="olive"
              caption="After の総転送量（2,611 → 528。旧サイトの約1/5）"
            />
          </div>
          <p className="mt-6 text-[0.95rem] font-bold leading-loose text-ink">
            「スコアを上げること」と「速くすること」は、別の仕事です。
            <span className="font-normal text-ink/80">
              私がまず行ったのは点数狙いではなく、LCP 16.8秒を2.3秒にする＝実際に速くすること。点数は結果として後から付いてきます。
            </span>
          </p>
        </Prose>
      </section>

      {/* 4. 4カテゴリ比較 */}
      <section className="py-16 md:py-24">
        <Prose>
          <SectionLabel>Four Categories</SectionLabel>
          <h2 className="text-2xl md:text-[1.75rem]">
            Lighthouse 4カテゴリ比較 — Performance だけを見ない
          </h2>
          <p className="mt-5 text-[0.95rem] leading-loose text-ink/85">
            Performance の55点ばかりが注目されがちですが、
            <strong className="font-bold">残り3カテゴリの方がむしろ雄弁</strong>でした。
          </p>

          <div className="mt-10">
            <CategoryCompare />
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <p className="text-[0.95rem] leading-loose text-ink/85">
              注目は <strong className="font-bold">SEO 45点</strong>。主に viewport 指定が無く
              「モバイル非対応」と判定されたためで、Google はモバイル対応を検索評価の前提に
              しています。つまり<strong className="font-bold">広告を止めた瞬間、自然検索からの流入がほぼ期待できない</strong>状態でした。
            </p>
            <p className="text-[0.95rem] leading-loose text-ink/85">
              <strong className="font-bold">Accessibility 67点</strong>も見過ごせません。alt欠落・画像だけのナビ・コントラスト不足が原因で、読み上げソフトを使う方に情報が届かないだけでなく、alt欠落は検索エンジンの画像理解も妨げます。
            </p>

            {/* Best Practices 92 の説明（都合の悪い数字を隠さない） */}
            <div className="rounded border border-line bg-beige/40 p-5">
              <p className="text-sm font-bold text-ink">
                Best Practices は Before でも 92 と高い数値でした。
              </p>
              <p className="mt-2 text-[0.9rem] leading-loose text-ink/80">
                この指標は HTTPS 配信やコンソールエラーの有無が中心で、サイトの実質的な品質を測るものではありません。
                <strong className="font-bold">スコアが高いことは、改善不要を意味しません。</strong>
                Performance 55 と同じ構造です——数字だけを見ると判断を誤ります。
              </p>
            </div>
          </div>
        </Prose>
      </section>

      {/* 5. Before/After 比較 */}
      <section className="border-y border-line bg-beige/40 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionLabel>Before / After</SectionLabel>
          <h2 className="text-2xl md:text-[1.75rem]">同じFVを、見比べる</h2>
          <p className="mt-5 max-w-2xl text-[0.95rem] leading-loose text-ink/85">
            境界をドラッグ（スマホはスワイプ、キーボードは ← → キー）してください。左が Before、右が After。数値以前に、一目で伝わる情報量が変わっています。
          </p>

          <div className="mt-8">
            <BeforeAfterSlider
              beforeSrc="/img/case/before-desktop.jpg"
              afterSrc="/img/case/after-desktop.jpg"
              width={1280}
              height={820}
              beforeAlt="リニューアル前のデスクトップ表示（2016年当時の固定幅レイアウト）"
              afterAlt="リニューアル後のデスクトップ表示"
            />
          </div>

          {/* スマホ表示の証拠（375px） */}
          <h3 className="mt-14 text-lg">そして、スマホ（375px）で開くと</h3>
          <p className="mt-3 max-w-2xl text-[0.9rem] leading-loose text-ink/80">
            流入の9割を占めるスマートフォン。Before は固定幅がはみ出し、ナビゲーションも画面外に切れています。これが最大の課題でした。
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <figure className="m-0">
              <div className="relative overflow-hidden rounded border border-line" style={{ aspectRatio: "375 / 720" }}>
                <Image
                  src="/img/case/before-mobile.jpg"
                  alt="リニューアル前のスマホ表示。固定幅がはみ出し、ナビが画面外に切れている"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 340px"
                  className="object-cover object-top"
                />
                <span className="absolute left-2 top-2 rounded bg-ink/80 px-2 py-0.5 text-xs font-bold text-white">
                  Before
                </span>
              </div>
              <figcaption className="mt-2 text-xs text-ink/75">固定幅がはみ出す</figcaption>
            </figure>
            <figure className="m-0">
              <div className="relative overflow-hidden rounded border border-line" style={{ aspectRatio: "375 / 720" }}>
                <Image
                  src="/img/case/after-mobile.jpg"
                  alt="リニューアル後のスマホ表示。画面幅に最適化されている"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 340px"
                  className="object-cover object-top"
                />
                <span className="absolute left-2 top-2 rounded bg-olive/90 px-2 py-0.5 text-xs font-bold text-white">
                  After
                </span>
              </div>
              <figcaption className="mt-2 text-xs text-ink/75">画面幅に最適化</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 6. 意図的に変更した3点 */}
      <section className="py-16 md:py-24">
        <Prose>
          <SectionLabel>Decisions</SectionLabel>
          <h2 className="text-2xl md:text-[1.75rem]">
            意図的に変更した3点 —「ミス修正」ではなく「提案」
          </h2>
          <p className="mt-5 text-[0.95rem] leading-loose text-ink/85">
            旧サイトの内容をそのまま速くしただけ、ではありません。
            <strong className="font-bold">放置するとリスクになる3点を、根拠を添えて作り替えました。</strong>
            ここが、ただの実装代行との違いです。
          </p>
          <div className="mt-10">
            <DecisionTable />
          </div>
        </Prose>
      </section>

      {/* 7. 技術的な意思決定 */}
      <section className="border-t border-line bg-beige/40 py-16 md:py-24">
        <Prose>
          <SectionLabel>Engineering</SectionLabel>
          <h2 className="text-2xl md:text-[1.75rem]">技術的な意思決定 —「なぜそう作ったか」</h2>
          <p className="mt-5 text-[0.95rem] leading-loose text-ink/85">
            発注者の方は DevTools を開いて中を見ることがあります。
            <strong className="font-bold">辻褄が合う作りかどうか</strong>は、そこで判断されます。主要な判断を4つ。
          </p>
          <div className="mt-8 flex flex-col divide-y divide-line border-y border-line">
            {techDecisions.map((t) => (
              <div key={t.q} className="py-5">
                <h3 className="text-base font-bold text-ink">{t.q}</h3>
                <p className="mt-2 text-[0.9rem] leading-loose text-ink/80">{t.a}</p>
              </div>
            ))}
          </div>
        </Prose>
      </section>

      {/* 8. コピーライティング */}
      <section className="py-16 md:py-24">
        <Prose>
          <SectionLabel>Copywriting</SectionLabel>
          <h2 className="text-2xl md:text-[1.75rem]">
            キャッチコピーは3案作って、1つを選ぶ
          </h2>
          <p className="mt-5 text-[0.95rem] leading-loose text-ink/85">
            デザインの前に、言葉を決めます。ターゲット（過去に何度もジムで挫折した30〜40代女性）に何を言うか。3案出して、最も申込につながる1案を採用しました。
          </p>
          <div className="mt-8 flex flex-col gap-4">
            {copies.map((c) => (
              <div
                key={c.text}
                className={`rounded border p-5 ${
                  c.adopted ? "border-olive bg-beige/30" : "border-line bg-base"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-bold ${
                      c.adopted ? "bg-olive text-white" : "bg-line text-ink/70"
                    }`}
                  >
                    {c.adopted ? "採用" : "不採用"}
                  </span>
                </div>
                <p className="mt-3 font-serif text-lg text-ink">「{c.text}」</p>
                <p className="mt-2 text-[0.85rem] leading-loose text-ink/75">{c.note}</p>
              </div>
            ))}
          </div>
        </Prose>
      </section>

      {/* 9. 対応範囲・制作情報 */}
      <section className="border-t border-line py-16 md:py-24">
        <Prose>
          <SectionLabel>Summary</SectionLabel>
          <h2 className="text-2xl md:text-[1.75rem]">対応範囲・制作情報</h2>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {[
              { k: "対応範囲", v: caseMeta.scope },
              { k: "使用技術", v: caseMeta.stack },
              { k: "制作期間", v: caseMeta.duration },
              { k: "計測条件", v: `${caseMeta.lighthouse}／計測日 ${caseMeta.measuredOn}` },
            ].map((r) => (
              <div key={r.k} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <dt className="text-sm font-bold text-ink">{r.k}</dt>
                <dd className="text-[0.9rem] leading-loose text-ink/80">{r.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={caseMeta.beforeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded border border-line bg-base px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-ink/30"
            >
              Before を見る
            </a>
            <a
              href={caseMeta.afterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded bg-olive px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-olive-hover"
            >
              After（本サイト）を見る <span aria-hidden="true">→</span>
            </a>
          </div>

          <p className="mt-10 text-xs leading-relaxed text-ink/75">
            ※本ページは架空クライアント「STUDIO NOA」を想定した制作実績です。数値はすべて {caseMeta.measuredOn} 時点の実測（{caseMeta.lighthouse}）。発注者ご自身での再計測も可能です。
          </p>
        </Prose>
      </section>
    </main>
  );
}
