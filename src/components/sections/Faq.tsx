import { FaqAccordion } from "@/components/FaqAccordion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/content";
import { faqJsonLd } from "@/lib/jsonld";

export function Faq() {
  return (
    <section className="bg-beige/50 py-section-sp md:py-section">
      {/* FAQPage 構造化データ（FAQを持つトップページのみに出力） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <Container>
        {/* 左寄せ狭幅 */}
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading label="FAQ" title="よくあるご質問" />
          </Reveal>
          <Reveal className="mt-10">
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
