# Yusufoğlu Nakliyat — Design System

Editorial-confident, warm-cinematic. Premium logistics meets boutique craft.

## Color (OKLCH)

Strategy: **Committed**. One warm saturated accent (sunrise gold) carries identity across an otherwise restrained, navy + cream surface system.

### Tokens

```css
/* Surface — warm cream is the default page background */
--surface-base:       oklch(0.972 0.011 80);    /* #FAF7F2 warm cream */
--surface-raised:     oklch(0.987 0.008 80);    /* near-white card */
--surface-sunken:     oklch(0.945 0.014 80);    /* slightly recessed */

/* Ink — never pure black */
--ink-strong:         oklch(0.155 0.024 250);   /* deep warm-navy */
--ink-default:        oklch(0.245 0.020 250);   /* primary text */
--ink-muted:          oklch(0.485 0.014 250);   /* secondary text */
--ink-subtle:         oklch(0.665 0.010 250);   /* tertiary, eyebrows */

/* Cinematic dark — for hero, final CTA, fleet */
--night-base:         oklch(0.155 0.028 250);   /* near-black warm navy */
--night-raised:       oklch(0.215 0.030 250);
--night-divider:      oklch(0.295 0.024 250);
--night-text:         oklch(0.945 0.012 80);    /* warm cream on dark */
--night-muted:        oklch(0.745 0.014 80);

/* Accent — sunrise gold */
--gold-base:          oklch(0.815 0.150 80);    /* #F4B23E */
--gold-deep:          oklch(0.685 0.160 60);    /* hover, pressed */
--gold-soft:          oklch(0.910 0.080 85);    /* tints, washes */
--gold-glow:          oklch(0.815 0.150 80 / 0.18);

/* Lines */
--line-default:       oklch(0.155 0.024 250 / 0.10);
--line-strong:        oklch(0.155 0.024 250 / 0.22);
--line-on-night:      oklch(0.945 0.012 80 / 0.14);
```

### Usage rules

- **Primary surface**: cream. Hero / final CTA / fleet carousel use night.
- **Gold appears in ≤ 18% of any viewport** — accents, single CTA, key stat underline, route line, breathing district pulse. Never as a fill across cards.
- **Text on cream**: `--ink-default`. Never pure black.
- **Text on night**: `--night-text`. Never pure white.
- **Lines are nearly invisible** — `--line-default` is the default for hairlines. `--line-strong` only for input focus / hovered cards.

### Forbidden

- `#000`, `#fff`.
- Saturated red, blue, green anywhere — gold is the only saturated color.
- Gradient text (banned by impeccable shared laws).
- Side-stripe borders (banned).
- Glass-morph as decoration (allowed only on the sticky header, intentional).

## Typography

Pairing: editorial display serif + a confident humanist sans for UI/body.

```
--font-editorial: "Fraunces", "Playfair Display", "Times New Roman", serif;
--font-display:   "Geist", "Inter", system-ui, sans-serif;
--font-body:      "Geist", "Inter", system-ui, sans-serif;
--font-mono:      "Geist Mono", ui-monospace, monospace;  /* tabular numerics */
```

Fraunces variable is loaded with `opsz` enabled — large editorial sizes use `opsz: 144`, body de-emphasizes contrast.

### Scale (mobile / desktop)

| Role | Mobile | Desktop | Family | Weight | Letter-spacing |
|------|--------|---------|--------|--------|----------------|
| `display-2xl` | 56 / 0.95 | 128 / 0.92 | editorial | 480 | -0.03em |
| `display-xl`  | 44 / 0.98 | 88 / 0.94  | editorial | 480 | -0.025em |
| `display-lg`  | 36 / 1.02 | 64 / 1.00  | editorial | 500 | -0.02em |
| `display-md`  | 28 / 1.10 | 44 / 1.10  | editorial | 500 | -0.015em |
| `headline`    | 22 / 1.20 | 28 / 1.25  | display   | 600 | -0.01em |
| `subhead`     | 18 / 1.40 | 22 / 1.45  | display   | 500 | -0.005em |
| `body`        | 16 / 1.55 | 17 / 1.60  | body      | 400 | 0 |
| `body-sm`     | 14 / 1.50 | 15 / 1.55  | body      | 400 | 0 |
| `eyebrow`     | 11 / 1.20 | 12 / 1.20  | body      | 600 | 0.16em uppercase |
| `numeric-xl`  | 64 / 0.95 | 128 / 0.92 | mono      | 500 | -0.02em tabular |

Body line length capped at 70ch.

### Hierarchy

Contrast comes from **scale + weight + family** — never from color alone. Editorial serif is reserved for `display-*` and quote-style emphasis, never for buttons or body.

## Spacing

Base unit: 4px. Scale: `0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128`.

Section vertical rhythm:
- Mobile: `py-20` (80) standard, `py-32` (128) for set-pieces (hero, final CTA, process).
- Desktop: `py-32` (128) standard, `py-48` (192) for set-pieces.

Container max-widths:
- `--container-tight: 768px;` — long-form copy, FAQ.
- `--container-comfy: 1120px;` — most content.
- `--container-wide:  1360px;` — fleet carousel, gallery, map.
- `--container-full:  100vw;` — hero, final CTA, marquees.

Edge gutters: `clamp(20px, 5vw, 64px)`.

## Elevation

Cards rarely need shadow. When they do:

```
--shadow-soft: 0 1px 2px oklch(0.155 0.024 250 / 0.04),
               0 8px 24px oklch(0.155 0.024 250 / 0.05);
--shadow-lift: 0 2px 4px oklch(0.155 0.024 250 / 0.05),
               0 16px 40px oklch(0.155 0.024 250 / 0.08);
```

Hover-lift: translateY(-2px) + shadow-lift. Never use scale on cards (only on icons inside cards).

## Motion

```
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart:  cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-quart:   cubic-bezier(0.5, 0, 0.75, 0);
--spring-soft:     spring(stiffness=180, damping=24, mass=1);
--spring-snap:     spring(stiffness=320, damping=28, mass=0.9);

--dur-fast:    160ms;
--dur-normal:  280ms;
--dur-slow:    520ms;
--dur-cinema:  900ms;  /* hero reveals only */
```

### Choreography rules

- Stagger multi-item reveals at 60–100ms.
- Headlines: per-character or per-word mask reveal, never per-letter random.
- Counters: spring-eased count-up, NOT linear interpolate.
- Hover transitions on interactive elements: 160ms ease-out-quart.
- Page transitions: 280ms cross-fade with subtle 8px upward translate on the incoming view.
- Reduced motion: disable parallax, marquees, scroll-driven sticky scenes, character-stagger reveals. Keep opacity-only fades and counters as instant.

### Animated primitives

- `<ScrollReveal>` — IntersectionObserver, stagger children.
- `<MagneticButton>` — cursor-pull, magnitude tied to distance with `1 - exp(-d/k)` falloff.
- `<CountUp>` — spring-eased, `Intl.NumberFormat('tr-TR')`.
- `<Marquee>` — rAF-driven, pauses on hover.
- `<TruckRouteLine>` — SVG path-drawing, scroll-bound.

## Components

### Primary CTA Button (`MagneticButton` variant)

- Background: `--ink-strong` on cream surface, or `--gold-base` on night surface.
- Text: warm cream / ink-strong respectively.
- Padding: `18px 28px` mobile, `22px 36px` desktop.
- Border-radius: `12px`.
- Magnetic on desktop, static on mobile.
- Arrow icon: `→` slides 4px right on hover, line extends from underneath.

### Secondary / phone CTA

- Transparent / `--line-strong` 1px border.
- Phone icon shakes gently every 8s on hero only.

### Card surfaces

- On cream: `--surface-raised` background, `--line-default` 1px border, `12px` radius.
- On night: `--night-raised`, `--line-on-night` border.
- Hover: border becomes `--gold-soft` on key cards (services, districts).
- No nested cards.

### Form inputs

- Floating labels, no left-side stripes.
- Underline only by default; full bordered box on focus.
- Focus ring: 2px `--gold-base` offset 2px.
- Error: `--ink-strong` text, gold underline (no red — restraint).

### Map (`<IstanbulMap>`)

- Base districts: `--ink-strong` fill at 6% opacity, hairline stroke `--line-default`.
- Active districts (served): `--gold-base` fill at 14% opacity, slow breathing pulse 6s loop.
- Hover: fill rises to 28%, district name in tooltip with cream surface.
- Click: routes to `/teklif-al?bolge=<slug>`.

## Iconography

Custom monoline SVG icons, 1.5px stroke, 24×24 base grid. Animated icons (truck moving, boxes assembling, elevator rising) are inline SVG with `<animate>` or Framer-Motion-driven path-drawing — never Lottie JSON unless a single path can't capture it.

Icon set required:
- truck-side, truck-three-quarter, truck-driving (animated)
- box, boxes-stacking (animated), packing-tape (animated)
- elevator (animated rising)
- piano (animated floating)
- warehouse-shutter (animated opening)
- map-pin, route-line, calendar, phone, whatsapp, chat-bubble, check, arrow-right

## Photography direction

When real photos arrive: cinematic warm grade, subtle film grain (≤6%), shallow depth of field on team portraits, golden-hour exterior shots of trucks, real Istanbul rooftops/Bosphorus skyline as backdrop. No stock imagery.

In design: dark cinematic placeholders with subtle gradient overlays.

## Accessibility

- Color contrast: ≥ 4.5:1 for body text against any surface.
- Focus rings always visible: 2px `--gold-base` offset 2px outline.
- All animations respect `prefers-reduced-motion`.
- Magnetic CTA falls back to static on touch devices.
- Map has chip-cloud fallback for mobile + screen-reader users.
- Quote wizard reachable end-to-end via keyboard, with progress announced via `aria-live`.

## Dark/light handling

Cream is default. Dark `night` surfaces are explicit per section, opted into via a `data-tone="night"` boundary that flips ink tokens — no system theme toggle. Mobile floating contact cluster always uses gold + ink-strong, regardless of section tone.
