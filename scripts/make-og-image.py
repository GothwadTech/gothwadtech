#!/usr/bin/env python3
"""Generate the 1200x630 social card used for og:image / twitter:image.

One-off asset generator — the PNG it writes is committed, so the site build
does not depend on Python or Pillow.

    python3 -m venv .venv-og
    .venv-og/bin/pip install pillow
    .venv-og/bin/python scripts/make-og-image.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "public/assets/brand/logo.png"
OUT = ROOT / "public/assets/brand/og-image.png"

W, H = 1200, 630
BG_TOP = (11, 18, 32)
BG_BOTTOM = (32, 33, 36)
BRAND = (4, 148, 244)
WHITE = (255, 255, 255)
MUTED = (154, 160, 166)

FONT_DIR = Path("/usr/share/fonts/truetype/dejavu")
BOLD = FONT_DIR / "DejaVuSans-Bold.ttf"
REGULAR = FONT_DIR / "DejaVuSans.ttf"
MONO = FONT_DIR / "DejaVuSansMono.ttf"


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def gradient(size: tuple[int, int], top: tuple[int, int, int], bottom: tuple[int, int, int]) -> Image.Image:
    img = Image.new("RGB", size)
    draw = ImageDraw.Draw(img)
    for y in range(size[1]):
        ratio = y / max(size[1] - 1, 1)
        color = tuple(round(top[i] + (bottom[i] - top[i]) * ratio) for i in range(3))
        draw.line([(0, y), (size[0], y)], fill=color)
    return img


def main() -> None:
    canvas = gradient((W, H), BG_TOP, BG_BOTTOM).convert("RGBA")
    draw = ImageDraw.Draw(canvas)

    # Brand edge bar
    draw.rectangle([0, 0, 14, H], fill=BRAND)

    # Logo tile
    logo = Image.open(LOGO).convert("RGBA")
    logo_size = 296
    logo = logo.resize((logo_size, logo_size), Image.LANCZOS)
    canvas.alpha_composite(logo, (94, (H - logo_size) // 2 - 8))

    x = 440
    right_margin = 64

    # Wordmark — fit the available width automatically
    wordmark_size = 92
    while wordmark_size > 40:
        bold = font(BOLD, wordmark_size)
        gap = round(wordmark_size * 0.22)
        total = draw.textlength("GOTHWAD", font=bold) + gap + draw.textlength("TECH", font=bold)
        if total <= W - x - right_margin:
            break
        wordmark_size -= 2
    bold = font(BOLD, wordmark_size)
    gap = round(wordmark_size * 0.22)
    draw.text((x, 166), "GOTHWAD", font=bold, fill=WHITE)
    gothwad_width = draw.textlength("GOTHWAD", font=bold)
    draw.text((x + gothwad_width + gap, 166), "TECH", font=bold, fill=BRAND)

    # Tagline
    draw.text((x, 300), "Everything Gothwad, in one place.", font=font(REGULAR, 40), fill=(232, 234, 237))

    # Thin rule
    draw.rectangle([x, 372, x + 540, 376], fill=(60, 64, 67))

    # Product line
    draw.text(
        (x, 402),
        "Mail · Drive · Meet · Tube · GrixChat · Browser",
        font=font(REGULAR, 28),
        fill=MUTED,
    )

    # Domain
    draw.text((x, 468), "gothwadtech.com", font=font(MONO, 32), fill=BRAND)

    canvas.convert("RGB").save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
