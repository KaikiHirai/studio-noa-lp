import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#FAF8F5", // ベース
        ink: "#2B2B28", // テキスト
        olive: "#3D4A3A", // アクセント（CTA / ごく一部）
        "olive-hover": "#334030",
        beige: "#E8E0D5", // サブ（ウォームベージュ）
        line: "#E0DAD1", // 境界線 1px
      },
      fontFamily: {
        // next/font が供給する CSS 変数を参照
        serif: ["var(--font-noto-serif)", "serif"],
        sans: ["var(--font-noto-sans)", "sans-serif"],
      },
      borderRadius: {
        // 角丸は最小限
        DEFAULT: "4px",
      },
      spacing: {
        section: "96px", // セクション上下（PC）
        "section-sp": "64px", // セクション上下（SP）
      },
      maxWidth: {
        content: "1120px",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
