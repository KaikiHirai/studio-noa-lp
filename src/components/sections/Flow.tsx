import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { flow } from "@/lib/content";

export function Flow() {
  return (
    <section className="py-section-sp md:py-section">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              label="Trial Flow"
              title={
                <>
                  体験当日の流れ。
                  <br />
                  所要 約60分・費用0円。
                </>
              }
            />
            <p className="mt-6 max-w-md text-[0.95rem] leading-loose text-ink/80">
              初めてでも安心して受けていただけるよう、当日の流れをご案内します。その場で契約を決める必要はありません。
            </p>
          </Reveal>

          {/* 左に縦ステップ線 */}
          <Reveal
            as="ol"
            className="relative flex flex-col gap-8 border-l border-line pl-8 md:pl-10"
          >
            {flow.map((s) => (
              <li key={s.no} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[calc(2rem+1px)] top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-line bg-base font-serif text-sm text-olive md:-left-[calc(2.5rem+1px)]"
                >
                  {s.no}
                </span>
                <h3 className="text-lg">
                  {s.title}
                  {s.time && (
                    <span className="ml-3 text-xs font-normal text-ink/75">
                      {s.time}
                    </span>
                  )}
                </h3>
                <p className="mt-2 max-w-lg text-[0.9rem] leading-loose text-ink/85">
                  {s.body}
                </p>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
