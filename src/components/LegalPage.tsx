import { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { studio } from "@/lib/content";

// /privacy・/legal 共通のシンプルなドキュメントレイアウト
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="py-16 md:py-24">
      <Container className="max-w-3xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-olive underline-offset-4 hover:underline"
        >
          <span aria-hidden="true">←</span> トップへ戻る
        </a>
        <h1 className="mt-8 text-3xl md:text-[2.25rem]">{title}</h1>
        <p className="mt-2 text-xs text-ink/75">{studio.name}（{studio.nameJa}）</p>
        {updated && (
          <p className="mt-1 text-xs text-ink/75">最終更新：{updated}</p>
        )}
        <div className="legal-body mt-10 flex flex-col gap-8">{children}</div>
      </Container>
    </main>
  );
}

export function LegalBlock({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg md:text-xl">{heading}</h2>
      <div className="mt-3 text-[0.95rem] leading-loose text-ink/85">
        {children}
      </div>
    </section>
  );
}
