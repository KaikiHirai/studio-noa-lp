# STUDIO NOA LP

女性専用パーソナルジム「STUDIO NOA」の広告用ランディングページ。
**架空クライアントを想定した制作実績（ポートフォリオ）** です。実在の店舗・サービスではありません。

## 技術構成

- Next.js 15（App Router）+ TypeScript + Tailwind CSS
- `output: 'export'` による静的書き出し（`out/`）
- Server Component 既定 / `"use client"` はアコーディオン・追従CTA・フォーム・フェードインのみ
- フォント：見出し Noto Serif JP 500（使用グリフのみ自己ホスト）／本文 和文ゴシックのシステムフォント
- アニメーション：IntersectionObserver + CSS transition（ライブラリ不使用）
- SEO：metadata API・OGP・JSON-LD（schema.org HealthClub）

## 開発

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # out/ に静的書き出し
npx serve out    # 本番ビルドのプレビュー
```

## 品質

Lighthouse (Mobile) 実測：Performance 96 / Accessibility 100 / Best Practices 100 / SEO 100

## 写真の差し替え

`photos-src/` に写真を置き、`python3 scripts/optimize-images.py` を実行（詳細は [PHOTOS.md](./PHOTOS.md)）。
現在の写真はプレビュー用の Unsplash ストックです。
