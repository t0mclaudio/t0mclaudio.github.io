# Style Guide — t0mclaudio.github.io

This document defines the visual system for the portfolio site: typography, color, and component styling. Layout structure (max-widths, flex layout, sidebar width) is out of scope — see `global.css` for the source of truth.

---

## 1. Fonts

**Inter** (weights 400/500/600), loaded from Google Fonts via `<link>` tags in `BaseLayout.astro`, with system-font fallback.

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

---

## 2. Color Tokens

Palette is lifted from Google's design system. Blue is the primary accent (links, hover). Backgrounds and text stay neutral gray. Automatically switches with `prefers-color-scheme`.

| Token | Light | Dark |
|---|---|---|
| `--color-bg` | `#FAFAFA` | `#202124` |
| `--color-bg-subtle` | `#F1F3F4` | `#292A2D` |
| `--color-text` | `#3C4043` | `#E8EAED` |
| `--color-text-muted` | `#5F6368` | `#9AA0A6` |
| `--color-text-subtle` | `#9AA0A6` | `#5F6368` |
| `--color-blue` | `#4285F4` | `#8AB4F8` |
| `--color-blue-hover` | `#1A73E8` | `#AECBFA` |
| `--color-red` | `#EA4335` | `#F28B82` |
| `--color-yellow` | `#FBBC04` | `#FDD663` |
| `--color-green` | `#34A853` | `#81C995` |
| `--color-link` | `#4285F4` | `#8AB4F8` |
| `--color-link-hover` | `#1A73E8` | `#AECBFA` |
| `--color-border` | `#DADCE0` | `#3C4043` |

---

## 3. Metric Label Colors ("What I've Done")

The four bold labels in the homepage list are the one place color is expressive — one Google color per item, used once. Everywhere else stays neutral.

| Item | Class | Color |
|---|---|---|
| AI normalization engine | `.metric-blue` | Blue |
| $133k AUD | `.metric-green` | Green |
| 350k+ SKUs | `.metric-red` | Red |
| 3 companies co-founded | `.metric-yellow` | Yellow |

---

## 4. Typography Scale

| Element | Size | Weight | Notes |
|---|---|---|---|
| `body` | 16px | 400 | line-height 1.7 |
| `h1` | 32px | 600 | letter-spacing -0.02em |
| `h2` | 17px | 600 | uppercase, muted, letter-spacing 0.04em |
| `h3` | 16px | 600 | |
| `p` | 16px | 400 | |
| tagline (`.page-content > p:first-of-type`) | 17px | 400 | muted |

---

## 5. Links

Default: `--color-link`, no underline. Hover: `--color-link-hover` + underline.

---

## 6. Sidebar & Navigation

Sidebar name/bio/links use smaller sizes (15px/14px/14px) in muted/link tones. Nav links are 15px/500 weight, muted by default, full text color on hover, no background color.

---

## 7. What NOT to Change

- Layout structure: `max-width`, flex widths, sidebar width
- Shadows, gradients, cards, border-radius on content blocks
- Animations or transitions
- Avatar styling
- Section background colors

---

## Summary

| Element | Value |
|---|---|
| Font | Inter 400/500/600 |
| Body size | 16px / 1.7 line-height |
| H1 | 32px, weight 600, tracking -0.02em |
| H2 | 17px, weight 600, uppercase, muted |
| Body text | `#3C4043` (light) / `#E8EAED` (dark) |
| Muted text | `#5F6368` (light) / `#9AA0A6` (dark) |
| Links/accent | `#4285F4` (light) / `#8AB4F8` (dark) |
| Background | `#FAFAFA` (light) / `#202124` (dark) |
| Border | `#DADCE0` (light) / `#3C4043` (dark) |
| Metric colors | Blue, Green, Red, Yellow (one per item) |
