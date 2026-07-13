"use client";

import { useState } from "react";
import type { FaqItem } from "@/types";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-4 py-6 text-left"
              >
                <span className="flex items-start gap-3">
                  <span className="font-serif text-olive" aria-hidden="true">
                    Q
                  </span>
                  <span className="text-[0.95rem] font-bold leading-relaxed text-ink">
                    {item.q}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-1 flex-none text-olive transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pl-8 pr-8"
            >
              <p className="text-[0.9rem] leading-loose text-ink/85">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
