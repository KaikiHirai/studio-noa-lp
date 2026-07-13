#!/usr/bin/env python3
"""
実写差し込み用の画像最適化スクリプト。

使い方:
  1) 元の写真を photos-src/ に、下表の「スロット名」で置く（拡張子は任意）
       例: photos-src/hero.jpg, photos-src/t1.png, photos-src/room.jpeg ...
     （photos-src/ は公開ビルド out/ に含まれないため、原本を置いても安全）
  2) このスクリプトを実行:
       python3 scripts/optimize-images.py
  3) public/img/ に最適化済み JPEG（<スロット名>.jpg）が生成される。
     ページ側はすでにこのパスを参照しているので、ビルドすれば差し替わる。

- 各スロットは表示コンテナのアスペクト比に「センター基準のカバー切り抜き」でフィットさせる。
  （人物は中央寄せ前提。寄せたい場合は元写真側で被写体を中央に）
- output: 'export' 環境では next/image の自動最適化が効かないため、ここで事前圧縮する。
- alt テキストは src/lib/content.ts 側で各写真の内容に合わせて更新すること。
"""
from __future__ import annotations
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow が必要です:  python3 -m pip install Pillow")

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "photos-src"
OUT = ROOT / "public" / "img"

# スロット名: (出力幅, 出力高さ, JPEG品質, 目安KB上限)  ※比率は表示コンテナに一致
SLOTS: dict[str, tuple[int, int, int, int]] = {
    # FVメイン画像（LCP要素）— 4:5。ここだけは軽さ最優先で品質・上限を厳しめに。
    "hero": (860, 1075, 60, 55),
    # 選ばれる理由 3枚 — 4:3
    "room": (1000, 750, 68, 90),
    "trainer-work": (1000, 750, 68, 90),
    "meal": (1000, 750, 66, 90),
    # トレーナー 4名 — 5:6 ポートレート
    "t1": (600, 720, 74, 70),
    "t2": (600, 720, 74, 70),
    "t3": (600, 720, 74, 70),
    "t4": (600, 720, 74, 70),
    # お客様の声アバター 3枚 — 1:1
    "voice1": (200, 200, 78, 20),
    "voice2": (200, 200, 78, 20),
    "voice3": (200, 200, 78, 20),
    # OGP画像 — 1.91:1（SNSシェア用）
    "ogp": (1200, 630, 80, 130),
}

EXTS = (".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".heic")


def find_raw(slot: str) -> Path | None:
    for ext in EXTS:
        for cand in (RAW / f"{slot}{ext}", RAW / f"{slot}{ext.upper()}"):
            if cand.exists():
                return cand
    return None


def main() -> int:
    RAW.mkdir(parents=True, exist_ok=True)
    processed, skipped, warnings = 0, [], []

    for slot, (w, h, q, kb_max) in SLOTS.items():
        src = find_raw(slot)
        if not src:
            skipped.append(slot)
            continue
        try:
            im = Image.open(src)
        except Exception as e:  # noqa: BLE001
            warnings.append(f"{slot}: 読み込み失敗 ({e})")
            continue
        # EXIF回転を反映し、RGBへ。カバー切り抜きで指定比率にフィット。
        im = ImageOps.exif_transpose(im).convert("RGB")
        im = ImageOps.fit(im, (w, h), method=Image.LANCZOS, centering=(0.5, 0.5))
        dst = OUT / f"{slot}.jpg"
        im.save(dst, "JPEG", quality=q, optimize=True, progressive=True)
        size_kb = dst.stat().st_size // 1024
        flag = ""
        if size_kb > kb_max:
            flag = f"  ⚠ 目安{kb_max}KB超過（品質を下げるか元画像を見直し）"
            warnings.append(f"{slot}: {size_kb}KB > {kb_max}KB")
        print(f"  ✓ {slot:<13} {w}x{h}  {size_kb}KB{flag}")
        processed += 1

    print(f"\n完了: {processed}枚を最適化", end="")
    if skipped:
        print(f" / 未配置でスキップ: {', '.join(skipped)}", end="")
    print()
    if warnings:
        print("\n注意:")
        for wmsg in warnings:
            print(f"  - {wmsg}")
    if processed:
        print("\n次に: npm run build で out/ に反映されます。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
