"use client";

import { useEffect, useRef, useState } from "react";
import { currentMonthLabel } from "@/lib/date";
import { offer } from "@/lib/content";

// SPのみ：FVを過ぎたら画面下部に追従CTAを出現させる。
// フォーム(#trial)が見えている間は隠す（二重CTAを避ける）。
export function StickyCta() {
  const [show, setShow] = useState(false);
  const monthRef = useRef(currentMonthLabel());

  useEffect(() => {
    const hero = document.getElementById("hero-sentinel");
    const trial = document.getElementById("trial");
    let pastHero = false;
    let onTrial = false;

    const update = () => setShow(pastHero && !onTrial);

    const heroObs = new IntersectionObserver(
      ([e]) => {
        pastHero = !e.isIntersecting;
        update();
      },
      { threshold: 0 },
    );
    const trialObs = new IntersectionObserver(
      ([e]) => {
        onTrial = e.isIntersecting;
        update();
      },
      { threshold: 0 },
    );

    if (hero) heroObs.observe(hero);
    if (trial) trialObs.observe(trial);
    return () => {
      heroObs.disconnect();
      trialObs.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-base/95 px-4 py-3 backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a
        href="#trial"
        tabIndex={show ? 0 : -1}
        className="flex w-full items-center justify-center gap-2 rounded bg-olive px-6 py-3.5 text-sm font-bold text-white"
      >
        無料体験を予約する（{monthRef.current}あと{offer.slotsLeft}枠）
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
