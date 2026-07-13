import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { voices } from "@/lib/content";

export function Voices() {
  return (
    <section className="bg-beige/50 py-section-sp md:py-section">
      <Container>
        {/* 見出しは右寄せ気味に（レイアウト変化） */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              label="Member's Voice"
              title="続けられた、という声。"
            />
          </Reveal>
          <Reveal>
            <p className="max-w-sm text-sm leading-loose text-ink/70">
              ※体験には個人差があります。無理のない範囲で続けていただいた方の声です。
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
          {voices.map((v, i) => (
            <Reveal
              key={v.initial}
              as="li"
              delay={i * 90}
              className="flex flex-col border border-line bg-base p-7"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 flex-none overflow-hidden rounded-full border border-line">
                  <Image
                    src={v.image.src}
                    alt={v.image.alt}
                    fill
                    loading="lazy"
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink">
                    {v.initial}さん
                    <span className="ml-2 font-normal text-ink/70">
                      {v.age}歳
                    </span>
                  </p>
                  <p className="text-xs text-ink/70">
                    {v.job}／{v.period}
                  </p>
                </div>
              </div>
              <blockquote className="mt-5 text-[0.95rem] leading-loose text-ink/90">
                「{v.quote}」
              </blockquote>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
