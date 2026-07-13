import type { Metadata } from "next";
import "./globals.css";
import { healthClubJsonLd } from "@/lib/jsonld";

const siteUrl = "https://studio-noa.example.com";
const title = "STUDIO NOA｜自由が丘の女性専用パーソナルジム｜無料体験60分";
const description =
  "東京・自由が丘の女性専用パーソナルジム STUDIO NOA。完全個室・女性トレーナーのみ・食事指導つき。ジムが続かなかった方へ、無理なく続けられる場所を。無料カウンセリング＋体験トレーニング60分を受付中。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "パーソナルジム",
    "女性専用",
    "自由が丘",
    "完全個室",
    "産後ダイエット",
    "食事指導",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "STUDIO NOA",
    title,
    description,
    images: [
      {
        url: "https://studio-noa.example.com/img/ogp.jpg",
        width: 1200,
        height: 630,
        alt: "STUDIO NOA 自由が丘の女性専用パーソナルジム",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* モバイルLCP要素＝FV主役画像。フォントより先に最優先で取得しLCPを確定。
            フォントは font-display: optional（低優先・非ブロッキング）で読み込み、
            LCP画像や初回描画と帯域を奪い合わないようにしている。 */}
        <link
          rel="preload"
          as="image"
          href="/img/hero.jpg"
          fetchPriority="high"
        />
      </head>
      <body>
        {/* 架空クライアントによる制作実績である旨の明示バナー（全ページ共通） */}
        <div
          role="note"
          className="bg-ink text-base/95 text-center text-xs leading-relaxed px-4 py-2"
        >
          このサイトは架空のクライアント「STUDIO NOA」を想定した
          <span className="whitespace-nowrap">制作実績（ポートフォリオ）</span>
          です。実在の店舗・サービスではありません。
        </div>
        {children}
        <script
          type="application/ld+json"
          // JSON-LD（schema.org HealthClub）
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(healthClubJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
