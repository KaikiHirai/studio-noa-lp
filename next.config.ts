import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的書き出し（out/ へ HTML を吐き出す）
  output: "export",
  trailingSlash: true,
  images: {
    // output: 'export' では画像最適化サーバが使えないため無効化。
    // next/image の width/height / lazy / priority の仕組みはそのまま活きる。
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
