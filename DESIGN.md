# Pure Earth website design system

Direction chosen from the Pure Earth logo and project photographs. No third-party design library was consulted.

## Idea
The logo's land line over water is the one recurring device. It appears as the edge of photos, the page transition curtain, and section dividers. Everything else stays quiet.

## Colour
| Token | Value | Role |
|---|---|---|
| `--forest` | #0F5C38 | Primary brand, headings, dark sections, primary buttons |
| `--forest-deep` | #0A4229 | Hover state, text on lime |
| `--lake` | #0093D8 | Water gradient start |
| `--lake-mid` | #0B6FB8 | Links on white, water gradient middle |
| `--deep` | #233A97 | Water gradient end |
| `--lime` | #CFE02A | Single accent on dark backgrounds only (never as text on white) |
| `--paper` | #F6FAF7 | Page background |
| `--mist` | #E3EFE8 | Soft panels, dividers |
| `--ink` | #0C2A1D | Body text |
| `--grey` | #4B6256 | Secondary text and captions |

Light mode only. Text contrast meets 4.5:1 on its intended background.

## Typography
- Gloock (headings, statements). One weight.
- Hanken Grotesk (everything else), 400 to 700. Body 18px, 1.6 line height, lines kept under 70 characters.
- Scale: 14, 16, 18, 22, 28, 40, 64, and fluid display up to 128px.
- Sentence case everywhere. No all-caps labels.

## Spacing
4px base. Section padding is fluid from 72 to 160px. Content width 1280px, reading width 680px.

## Shape and depth
Square photographs, 999px radius on buttons only. No shadows, no card boxes, except the lightbox.

## Motion
- Page change: a forest curtain with a wave edge.
- Home: one load sequence, one scroll-pinned "bottle to bin" story, one word-by-word statement.
- Photos reveal once. Hover moves only what the person points at.
- `prefers-reduced-motion` removes the curtain, Lenis and all reveals.

## Imagery
Real Pure Earth project photographs only. No stock, no illustrations, no icons beyond the logo.
