import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { worries } from "@/lib/content";

export function Empathy() {
  return (
    <section className="bg-beige/50 py-section-sp md:py-section">
      <Container>
        {/* 左寄せ1カラム（センター揃えを避ける） */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              label="Worries"
              title={
                <>
                  こんなお悩み、
                  <br className="hidden sm:block" />
                  ありませんか？
                </>
              }
            />
            <p className="mt-6 max-w-md text-[0.95rem] leading-loose text-ink/80">
              ひとつでも当てはまったら、STUDIO NOA が力になれるかもしれません。
            </p>
          </Reveal>

          <Reveal as="ul" className="flex flex-col gap-px bg-line">
            {worries.map((w) => (
              <li
                key={w.text}
                className="flex items-start gap-4 bg-base px-6 py-6 md:px-8"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border border-olive text-olive"
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                </span>
                <span className="text-[0.95rem] leading-relaxed text-ink">
                  {w.text}
                </span>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
