import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { trainers } from "@/lib/content";

export function Trainers() {
  return (
    <section className="py-section-sp md:py-section">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionHeading
            label="Trainers"
            title="担当するのは、全員女性トレーナー。"
          />
          <p className="mt-6 text-[0.95rem] leading-loose text-ink/80">
            産後の体も、体型の悩みも。同じ立場で話せる4名が、あなたに伴走します。
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16">
          {trainers.map((t, i) => (
            <Reveal
              key={t.name}
              as="li"
              delay={(i % 2) * 90}
              className="flex gap-5 border border-line bg-base p-5 md:p-6"
            >
              <div className="relative h-28 w-24 flex-none overflow-hidden rounded border border-line sm:h-32 sm:w-28">
                <Image
                  src={t.image.src}
                  alt={t.image.alt}
                  fill
                  loading="lazy"
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs font-bold tracking-wider text-olive">
                  {t.role}
                </p>
                <p className="mt-1 font-serif text-lg font-medium">{t.name}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink/70">
                  {t.license}
                </p>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-ink/90">
                  {t.comment}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
