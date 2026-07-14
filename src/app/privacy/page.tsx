import type { Metadata } from "next";
import { LegalBlock, LegalPage } from "@/components/LegalPage";
import { studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "プライバシーポリシー", // ルートの template により「…｜STUDIO NOA」が付与される
  description:
    "STUDIO NOA（架空クライアントを想定した制作実績）のプライバシーポリシーです。",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "プライバシーポリシー｜STUDIO NOA",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="プライバシーポリシー" updated="2026年7月1日">
      <p className="text-[0.95rem] leading-loose text-ink/85">
        {studio.name}（以下「当スタジオ」）は、お客様の個人情報を適切に取り扱うことを社会的責務と考え、以下の方針に基づき個人情報の保護に努めます。
      </p>

      <LegalBlock heading="1. 取得する情報">
        当スタジオは、無料カウンセリング・体験のお申し込みその他のお問い合わせに際して、氏名・メールアドレス・電話番号・ご希望日時・ご相談内容などの個人情報を取得します。
      </LegalBlock>

      <LegalBlock heading="2. 利用目的">
        取得した個人情報は、次の目的の範囲でのみ利用します。
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>体験・カウンセリングのご予約確認およびご連絡のため</li>
          <li>サービスのご案内およびお問い合わせへの回答のため</li>
          <li>サービス品質の向上および統計的分析のため</li>
        </ul>
      </LegalBlock>

      <LegalBlock heading="3. 第三者提供">
        法令に基づく場合を除き、あらかじめご本人の同意を得ることなく、個人情報を第三者に提供することはありません。
      </LegalBlock>

      <LegalBlock heading="4. 安全管理措置">
        個人情報の漏えい・滅失・毀損を防止するため、適切な安全管理措置を講じ、従業者に対して必要かつ適切な監督を行います。
      </LegalBlock>

      <LegalBlock heading="5. 開示・訂正・削除">
        ご本人からの個人情報の開示・訂正・利用停止・削除のご請求に対しては、ご本人であることを確認のうえ、法令に従い速やかに対応します。
      </LegalBlock>

      <LegalBlock heading="6. お問い合わせ窓口">
        本ポリシーに関するお問い合わせは、当スタジオ受付までご連絡ください。
        <br />
        {studio.addressRegion}{studio.addressLocality}{studio.streetAddress}
      </LegalBlock>

      <LegalBlock heading="7. 制作実績に関する注記">
        本ページは架空のクライアント「{studio.name}」を想定した制作実績（ポートフォリオ）であり、実在の事業者による個人情報の取得は行っていません。
      </LegalBlock>
    </LegalPage>
  );
}
