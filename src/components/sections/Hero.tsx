import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { CTA_LABEL, hero, stats, studio } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <Container className="grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-24 lg:py-28">
        {/* テキスト（左） */}
        <div className="order-2 md:order-1">
          <p className="mb-6 text-sm font-bold tracking-widest text-olive">
            {studio.concept}｜{studio.addressLocality} 自由が丘
          </p>
          <h1 className="whitespace-pre-line text-3xl leading-[1.45] md:text-[2.75rem] md:leading-[1.4]">
            {hero.copyMain}
          </h1>
          <p className="mt-6 max-w-xl text-[0.95rem] leading-loose text-ink/90">
            {hero.copySub}
          </p>

          <div className="mt-9">
            <CtaButton size="lg" className="w-full sm:w-auto">
              {CTA_LABEL}
            </CtaButton>
            <p className="mt-3 text-xs text-ink/70">
              しつこい勧誘はありません／その場でご契約いただく必要はありません
            </p>
          </div>

          {/* 信頼数字3つ */}
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-8">
            {stats.map((s) => (
              <div key={s.label} className="text-left">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-serif text-2xl font-medium text-olive md:text-3xl">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-xs text-ink/70">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 画像（右・フルブリード寄り） */}
        <div className="relative order-1 md:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded border border-line">
            {/*
              LCP要素。next/image の priority が output:export 環境で
              fetchpriority=high を付与せず低優先で読み込まれ LCP を悪化させたため、
              FV主役画像のみ素の <img> で明示制御（width/height・eager・high）。
              他セクションの画像は next/image + lazy を使用。
            */}
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              width={600}
              height={750}
              // eslint-disable-next-line @next/next/no-img-element
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <span
            aria-hidden="true"
            className="absolute -bottom-3 -left-3 -z-10 hidden h-24 w-24 bg-beige md:block"
          />
        </div>
      </Container>
    </section>
  );
}
