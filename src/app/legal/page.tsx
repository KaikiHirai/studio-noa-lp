import type { Metadata } from "next";
import { LegalBlock, LegalPage } from "@/components/LegalPage";
import { enrollmentFee, studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記｜STUDIO NOA",
  description:
    "STUDIO NOA（架空クライアントを想定した制作実績）の特定商取引法に基づく表記です。",
  robots: { index: false, follow: true },
};

export default function LegalPageRoute() {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "事業者名", value: `${studio.name}（${studio.nameJa}）` },
    { label: "運営責任者", value: "森 かおり" },
    {
      label: "所在地",
      value: `〒${studio.postalCode} ${studio.addressRegion}${studio.addressLocality}${studio.streetAddress}`,
    },
    { label: "お問い合わせ", value: "本サイトのご予約フォームよりご連絡ください" },
    { label: "営業時間", value: studio.hours },
    {
      label: "販売価格",
      value: (
        <>
          入会金 {enrollmentFee}（税込）／ 月額プラン 16,500円〜49,500円（税込）
          <br />
          無料カウンセリング＋体験トレーニング（60分）は0円です。
        </>
      ),
    },
    {
      label: "商品代金以外の必要料金",
      value: "とくにありません（ウェア・タオル・シューズの貸出は無料）。",
    },
    { label: "支払方法", value: "現金／各種クレジットカード／口座振替" },
    { label: "支払時期", value: "ご入会時に入会金、以降は毎月所定日に月会費をお支払いいただきます。" },
    {
      label: "役務の提供時期",
      value: "ご予約いただいた日時に、店舗にてトレーニングを提供します。",
    },
    {
      label: "中途解約・返金",
      value:
        "契約期間の縛りはありません。解約をご希望の場合は前月末日までにお申し出ください。既納の月会費のうち未提供分については、法令に従い精算します。",
    },
  ];

  return (
    <LegalPage title="特定商取引法に基づく表記" updated="2026年7月1日">
      <dl className="divide-y divide-line border-y border-line">
        {rows.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
          >
            <dt className="text-sm font-bold text-ink">{r.label}</dt>
            <dd className="text-[0.95rem] leading-loose text-ink/85">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>

      <LegalBlock heading="制作実績に関する注記">
        本ページは架空のクライアント「{studio.name}」を想定した制作実績（ポートフォリオ）であり、実在の事業者による取引を表すものではありません。
      </LegalBlock>
    </LegalPage>
  );
}
