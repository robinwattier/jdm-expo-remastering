# Design System Master File — JDM EXPO (Automotive Motorsport & JDM Legend Exporter)

> **LOGIC:** Global Source of Truth for JDM Expo Frontend Remastering.
> Inspired by Singer, Speedhunters, Bring a Trailer, Hagerty: technical precision, dark luxury atmosphere, high contrast, responsive mechanics.

---

**Project:** JDM Expo (https://jdm-expo.com/)  
**Category:** Automotive Export / JDM Heritage Dealership  
**Stack:** Semantic HTML5 + Modern CSS (Custom Properties + Glassmorphism + Flexbox/Grid) + Vanilla JavaScript  

---

## 1. Color Palette (Dark Mode Automotive & High Contrast)

| Role | Hex | CSS Variable | Purpose |
|------|-----|--------------|---------|
| Background Primary | `#0B0E14` | `--color-bg-primary` | Deep carbon chassis canvas |
| Background Surface | `#11151F` | `--color-bg-surface` | Elevated containers, hero overlays |
| Background Card | `#181C24` | `--color-bg-card` | Gunmetal satin card bodies |
| Background Card Hover | `#202632` | `--color-bg-card-hover` | Micro-lift card hover state |
| Border Default | `rgba(255, 255, 255, 0.08)` | `--color-border-subtle` | Crisp mechanical container outlines |
| Border Accent | `rgba(225, 29, 72, 0.4)` | `--color-border-accent` | Active filters, hovered cards |
| Accent Racing Crimson | `#E11D48` | `--color-accent-racing` | Primary CTAs, "SOLD" badges, V-Spec tags |
| Accent Crimson Hover | `#BE123C` | `--color-accent-hover` | Hover on primary CTAs |
| Accent Amber / Gold | `#F59E0B` | `--color-accent-amber` | "PRICE: ASK" status badges, auction notice |
| Accent Emerald Green | `#10B981` | `--color-accent-green` | "Available", office open status, verified badges |
| Text Pure White | `#F9FAFB` | `--color-text-white` | Primary headlines, vehicle names, prices |
| Text Muted Gray | `#9CA3AF` | `--color-text-muted` | Body descriptions, secondary specs |
| Text Technical Dark | `#6B7280` | `--color-text-dim` | Micro labels, chassis IDs, footnotes |

---

## 2. Typography Tri-Stack

1. **Headings & Display:** `Space Grotesk`, sans-serif (Weights 500, 600, 700)
   - Letter-spacing: `-0.02em` for large headers, `+0.05em` uppercase for section kickers.
2. **Body & UI Elements:** `Inter`, sans-serif (Weights 400, 500, 600)
   - Line-height: `1.6` for readable paragraphs; base font size `16px`.
3. **Badges, Specs & Reference Codes:** `JetBrains Mono`, monospace (Weights 400, 500, 600)
   - For Chassis codes (`BNR34`, `KPGC10`), stock IDs (`N.8522`), prices (`$125,000`), hours (`Mon-Fri 9:00AM-6:00PM PST`).

Google Fonts CDN Import:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700;800&display=swap');
```

---

## 3. Spacing & Radius Tokens

```css
:root {
  --space-2xs: 4px;
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 350ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 4. UI/UX Pro Max Pre-Delivery Checklist

- [x] No emojis used as icons (100% precision inline SVG icons).
- [x] Touch targets minimum 44×44px for buttons, nav items, and controls.
- [x] Full contrast compliance (text on background > 7:1 for white, > 4.5:1 for muted).
- [x] Zero horizontal layout shift or overflow (`overflow-x: hidden`).
- [x] Keyboard focus visible rings (`focus-visible`).
- [x] Responsive layout tested for 375px (mobile), 768px (tablet), 1024px (laptop), 1440px+ (desktop).
- [x] Preserves 100% authentic data, contacts, inventory codes, images, and text content.
