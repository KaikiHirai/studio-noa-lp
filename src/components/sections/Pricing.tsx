import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { enrollmentFee, plans } from "@/lib/content";

export function Pricing() {
  return (
    <section id="pricing" className="bg-beige/50 py-section-sp md:py-section">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionHeading label="Price" title="料金プラン" />
          <p className="mt-6 text-[0.95rem] leading-loose text-ink/80">
            入会金 {enrollmentFee}（税込）。すべてのプランに完全個室・女性トレーナー・食事指導が含まれます。契約期間の縛りはありません。
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 items-stretch gap-6 md:mt-16 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal
              key={p.name}
              as="li"
              delay={i * 90}
              className={`relative flex flex-col border bg-base p-7 md:p-8 ${
                p.featured
                  ? "border-olive md:-my-3 md:shadow-none"
                  : "border-line"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-7 rounded bg-olive px-3 py-1 text-xs font-bold text-white">
                  {p.badge}
                </span>
              )}
              <p
                className={`font-serif text-xl font-medium ${
                  p.featured ? "text-olive" : "text-ink"
                }`}
              >
                {p.name}
              </p>
              <p className="mt-1 text-sm text-ink/70">{p.count}</p>
              <p className="mt-5 flex items-baseline gap-1">
                <span className="font-serif text-3xl font-medium text-ink md:text-[2rem]">
                  {p.price}
                </span>
                <span className="text-xs text-ink/70">／月（税込）</span>
              </p>
              <p className="mt-4 flex-1 text-[0.9rem] leading-loose text-ink/85">
                {p.note}
              </p>
              <CtaButton
                size="md"
                className="mt-6 w-full"
                href="#trial"
              >
                このプランで体験する
              </CtaButton>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-xs text-ink/75">
          ※表示はすべて税込です。別途、入会金 {enrollmentFee} を申し受けます。
        </p>
      </Container>
    </section>
  );
}
