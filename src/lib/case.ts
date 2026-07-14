// ケーススタディ /case/studio-noa のデータ。
// 数値はすべて実測（Lighthouse 13.4.0 / Mobile / Simulated throttling, 2026-07-15計測）。

export const caseMeta = {
  title: "STUDIO NOA サイトリニューアル",
  beforeUrl: "https://studio-noa-before.vercel.app",
  afterUrl: "https://studio-noa-lp.vercel.app",
  // 計測条件（発注者が自分で再計測できるよう明記する）
  measuredOn: "2026-07-15",
  lighthouse:
    "Lighthouse 13.4.0 / Mobile / Simulated throttling（RTT 150ms・1.6Mbps・CPU 4×＝標準モバイルプリセット）",
  // 制作期間：実際の稼働に合わせて調整可（本プロジェクトの実働ベース）
  duration: "実働 約3日（要件定義 → コピー → デザイン → 実装 → SEO/構造化データ → デプロイ）",
  scope:
    "要件定義 / コピーライティング / デザイン / 実装 / SEO / 構造化データ",
  stack: "Next.js 15（App Router） / TypeScript / Tailwind CSS",
};

export type Category = {
  label: string;
  sub: string;
  before: number;
  after: number;
};

// 4カテゴリ（すべて実測値）
export const categories: Category[] = [
  { label: "Performance", sub: "表示の速さ", before: 55, after: 96 },
  { label: "Accessibility", sub: "誰にとっても使えるか", before: 71, after: 100 },
  { label: "Best Practices", sub: "作りの健全さ", before: 92, after: 100 },
  { label: "SEO", sub: "検索・モバイル対応の基礎", before: 45, after: 100 },
];

// Performance の加重（モバイル）。セクション3の加重テーブル用。
export const perfWeights = [
  { label: "LCP", desc: "メイン画像が表示されるまで", weight: 25, propped: false },
  { label: "FCP", desc: "最初に何かが描かれるまで", weight: 10, propped: false },
  { label: "Speed Index", desc: "見た目が完成していく速さ", weight: 10, propped: false },
  { label: "TBT", desc: "操作がカクつかないか（JSの重さ）", weight: 30, propped: true },
  { label: "CLS", desc: "表示中にガタッとズレないか", weight: 25, propped: true },
];

// Before の主要メトリクス（Perf/FCP/LCP/転送量は指定値、それ以外は再計測で裏づけ）
export const beforeMetrics = {
  perf: 55,
  fcp: "11.5秒",
  lcp: "17.9秒",
  speedIndex: "11.9秒",
  tbt: "0ms",
  cls: "0",
  transfer: "2,644 KiB",
};

export const afterMetrics = {
  perf: 96,
  fcp: "1.7秒",
  lcp: "2.6秒",
  speedIndex: "2.6秒",
  tbt: "40ms",
  cls: "0",
  transfer: "528 KiB",
};

// 18秒の原因3つ
export const causes = [
  {
    head: "フォント全ウェイト＋CDNのCSSがレンダーブロッキング",
    body: "文字やレイアウトを描く前に外部ファイルの到着を待ち、画面が真っ白なまま停止する。",
  },
  {
    head: "ヒーロー画像が 2000×1200 の未圧縮JPEG（表示は960px）",
    body: "実際の表示サイズの4倍以上の画像をダウンロードさせていた。見た目は同じでも通信量は数倍。",
  },
  {
    head: "総転送量 2,644 KiB",
    body: "スマホ回線・広告直後の1アクセスで捌くには重すぎる量。",
  },
];

// セクション6：意図的に変更した3点
export const decisions = [
  {
    title: "料金体系：コース一括 → 月額制",
    rows: [
      { k: "形態", before: "コース制・全16回", after: "月額制・月2回〜" },
      { k: "価格", before: "198,000円（税抜）", after: "16,500円〜（税込）" },
      { k: "入会金", before: "30,000円", after: "33,000円（税込）" },
    ],
    why: "2021年の総額表示の義務化により税抜表記は不適切。加えて約20万円の一括前払いは初回申込のハードルが高く「まず試したい」層を取りこぼす。月額制に再設計し、体験→入会の一歩を軽くした。",
  },
  {
    title: "お客様の声：数値断定 → 体感ベース＋注記",
    rows: [
      {
        k: "表現",
        before: "「2ヶ月で体重が7kg減りました！」",
        after: "体感・生活ベースの言葉＋「※体験には個人差があります」",
      },
    ],
    why: "景品表示法（優良誤認）・薬機法の観点で、パーソナルジム／美容／クリニック領域は効果を数値で断定する表現が行政指導の対象になり得る。広告アカウント停止や措置命令のリスクを外しつつ、訴求力は保った。",
  },
  {
    title: "meta keywords：あり → 削除",
    rows: [
      { k: "meta keywords", before: "設定あり（2016年当時の作法）", after: "削除" },
    ],
    why: "Google は2009年以降このタグを評価対象外と明言しており、記述しても検索順位には無関係。むしろ古い作法の印象を与えるため削除した（Before はあえて残置＝当時の再現）。",
  },
];

// セクション7：技術的意思決定
export const techDecisions = [
  {
    q: "Before を Next.js ではなく素のHTML/CSS/jQueryで再現した",
    a: "リニューアル前の“証拠”として残すなら中身も2016年当時である必要がある。Tailwind のクラス名や Next.js のビルド痕跡がHTMLに残ると「最近作った偽の旧サイト」と分かってしまう。再現の説得力を担保するため、あえて当時の技術構成で組んだ。",
  },
  {
    q: "canonical を環境変数にせず直値で記述した",
    a: "output:'export'（静的書き出し）では環境変数はビルド時にHTMLへ焼き込まれる。設定漏れがあるとフォールバック値（例：localhost）が本番に混入するリスクがある。独自ドメイン移行時は canonical の書き換えより 301リダイレクトで検索評価を引き継ぐのが定石。",
  },
  {
    q: "FAQの回答を条件表示せず hidden属性で隠した",
    a: "閉じたときに回答テキストをHTMLから消すと検索エンジンに読まれない。見た目は閉じていてもテキストはHTML内に残し hidden で視覚的に隠す実装にし、FAQの内容がそのまま検索・構造化データ（FAQPage）の対象になるようにした。",
  },
  {
    q: "OG画像を動的生成せず静的PNGにした",
    a: "output:'export' 環境では動的生成（opengraph-image.tsx）が不安定になることがある。確実に表示される静的PNGを用意し、X／Slack／LINE で必ずカードが出るようにした。",
  },
];

// セクション8：コピー3案
export const copies = [
  {
    adopted: true,
    text: "無理に頑張らなくていい。ただ、続けられる場所を。",
    note: "ターゲットの「挫折経験」に最も刺さる。否定形で入ることで押しつけがなく、「また続かないかも」という不安を先に受け止める。",
  },
  {
    adopted: false,
    text: "鏡の前で、少しだけ自分を好きになる。",
    note: "情緒的で美しいが、体験申込というオファーへの接続が弱い。ブランド広告なら有効だが、CV目的のLPには一歩足りない。",
  },
  {
    adopted: false,
    text: "30代からの体は、鍛えるより、整える。",
    note: "コンセプトは強いが「整える」が抽象的で、「だから何をすればいいか」への動機づけが弱い。",
  },
];
