import { Container } from "@/components/ui/Container";
import { TrialForm } from "@/components/TrialForm";
import { currentMonthLabel } from "@/lib/date";
import { offer } from "@/lib/content";

export function FinalCta() {
  // 現在月を動的に表示（ビルド時＝生成時点の月）
  const month = currentMonthLabel();

  return (
    <section id="trial" className="py-section-sp md:py-section" aria-labelledby="trial-heading">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {/* 限定性のあるオファー */}
          <p className="inline-flex items-center gap-2 rounded border border-olive px-4 py-2 text-sm font-bold text-olive">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-olive" />
            {month}の無料体験枠 —— あと{offer.slotsLeft}枠
          </p>
          <h2 id="trial-heading" className="mt-6 text-2xl leading-snug md:text-[2rem]">
            {offer.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-loose text-ink/85">
            {offer.sub}
          </p>
        </div>

        {/* フォーム（左寄せ・カード内） */}
        <div className="mx-auto mt-10 max-w-2xl border border-line bg-beige/30 p-6 md:mt-12 md:p-10">
          <TrialForm />
        </div>
      </Container>
    </section>
  );
}
