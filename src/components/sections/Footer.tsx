import { Container } from "@/components/ui/Container";
import { studio } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-base">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-serif text-xl font-medium tracking-wide">
              {studio.name}
            </p>
            <p className="mt-1 text-xs text-base/70">{studio.nameJa}｜{studio.concept}</p>
            <address className="mt-5 text-sm not-italic leading-loose text-base/80">
              〒{studio.postalCode}
              <br />
              {studio.addressRegion}{studio.addressLocality}{studio.streetAddress}
              <br />
              {studio.access}
              <br />
              営業時間 {studio.hours}
            </address>
          </div>

          <nav aria-label="フッター" className="md:text-right">
            <ul className="flex flex-col gap-3 text-sm md:items-end">
              <li>
                <a href="#trial" className="text-base/90 underline-offset-4 hover:underline">
                  無料体験のご予約
                </a>
              </li>
              <li>
                <a href="/privacy/" className="text-base/90 underline-offset-4 hover:underline">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="/legal/" className="text-base/90 underline-offset-4 hover:underline">
                  特定商取引法に基づく表記
                </a>
              </li>
              <li>
                <a href="/case/studio-noa/" className="text-base/90 underline-offset-4 hover:underline">
                  制作実績：このサイトのリニューアル事例
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-base/60">
          © 2026 {studio.name}. これは架空クライアントを想定した制作実績です。
        </p>
      </Container>
    </footer>
  );
}
