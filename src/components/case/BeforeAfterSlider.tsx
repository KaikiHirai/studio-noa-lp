"use client";

import { useCallback, useRef, useState } from "react";

// Before/After 画像を左右スライダーで比較。
// ドラッグ / タッチ / 矢印キー対応。画像が無い場合はプレースホルダー。
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  width,
  height,
  beforeAlt,
  afterAlt,
}: {
  beforeSrc?: string;
  afterSrc?: string;
  width: number;
  height: number;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [pos, setPos] = useState(50); // 0-100（Afterの表示幅）
  const ref = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  const hasImages = Boolean(beforeSrc && afterSrc);

  return (
    <figure className="m-0">
      <div
        ref={ref}
        className="relative w-full select-none overflow-hidden rounded border border-line bg-beige/30"
        style={{ aspectRatio: `${width} / ${height}` }}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as Element).setPointerCapture?.(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {hasImages ? (
          <>
            {/* 下層：After（全面） */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={afterSrc}
              alt={afterAlt}
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            {/* 上層：Before（clip-pathで右側だけ隠す＝画像は原寸のまま歪まない） */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={beforeSrc}
                alt={beforeAlt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              <span className="absolute left-3 top-3 rounded bg-ink/80 px-2 py-1 text-xs font-bold text-white">
                Before
              </span>
            </div>
            <span className="absolute right-3 top-3 rounded bg-olive/90 px-2 py-1 text-xs font-bold text-white">
              After
            </span>
            {/* 仕切りハンドル（スライダー本体） */}
            <div
              role="slider"
              tabIndex={0}
              aria-label="Before / After 比較スライダー"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`Afterを${Math.round(pos)}%表示`}
              onKeyDown={onKeyDown}
              className="absolute top-0 z-10 flex h-full w-10 -translate-x-1/2 cursor-ew-resize items-center justify-center focus-visible:outline-none"
              style={{ left: `${pos}%` }}
            >
              <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-base/90" />
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line bg-base text-olive shadow-sm">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l-4 6 4 6M15 6l4 6-4 6" />
                </svg>
              </span>
            </div>
          </>
        ) : (
          <div className="flex aspect-[inherit] items-center justify-center p-8 text-center">
            <p className="text-sm leading-relaxed text-ink/75">
              ※ 比較画像は準備中です。実際の Before / After は各サイトでご確認ください。
            </p>
          </div>
        )}
      </div>
      <figcaption className="mt-3 text-xs text-ink/75">
        境界をドラッグ（スマホはスワイプ、キーボードは ← → キー）。左が Before、右が After。
      </figcaption>
    </figure>
  );
}
