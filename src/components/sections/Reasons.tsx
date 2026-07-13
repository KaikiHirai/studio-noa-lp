import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reasons } from "@/lib/content";

export function Reasons() {
  return (
    <section className="py-section-sp md:py-section">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionHeading
            label="Why NOA"
            title="頑張れないのではなく、頑張り方が合っていなかっただけ。"
          />
          <p className="mt-6 text-[0.95rem] leading-loose text-ink/80">
            STUDIO NOA が、ジムに挫折してきた方に選ばれる3つの理由です。
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-16 md:mt-20 md:gap-24">
          {reasons.map((r, i) => {
            const imageFirst = i % 2 === 1; // 左右交互
            return (
              <Reveal
                key={r.no}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                <div
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded border border-line ${
                    imageFirst ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <Image
                    src={r.image.src}
                    alt={r.image.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className={imageFirst ? "md:order-2" : "md:order-1"}>
                  <span className="font-serif text-5xl font-medium text-beige">
                    {r.no}
                  </span>
                  <h3 className="mt-2 text-xl md:text-2xl">
                    {r.title}
                    <span className="ml-3 align-middle text-sm font-normal text-olive">
                      — {r.lead}
                    </span>
                  </h3>
                  <p className="mt-4 max-w-md text-[0.95rem] leading-loose text-ink/85">
                    {r.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
