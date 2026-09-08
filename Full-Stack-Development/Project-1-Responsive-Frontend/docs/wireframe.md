# Wireframe — Hearth & Crumb Bakery

Low-fidelity, mobile-first. Focus on hierarchy, spacing and flow.

## Mobile (single column, 0–767px)

```text
┌────────────────────────────┐
│ Hearth & Crumb   [≡]       │  header (sticky)
├────────────────────────────┤
│ Hero: tagline + intro      │
│ [See the menu] [Plan visit]│
│ "Today at the counter" card│
├────────────────────────────┤
│ # Menu                     │
│ ┌ card ────────────────┐   │
│ │ Sourdough Loaf       │   │
│ │ desc ...             │   │
│ │ Baked: daily at 7:00 │   │
│ └──────────────────────┘   │
│ ┌ card ────────────────┐   │
│ │ ... (stacked)        │   │
│ └──────────────────────┘   │  single column stack
├────────────────────────────┤
│ # About                    │
│ story text (full width)    │
│ hours card                 │
├────────────────────────────┤
│ # FAQ (details, stacked)   │
├────────────────────────────┤
│ # Visit — form fields      │
│ [Send request]             │
├────────────────────────────┤
│ footer: address + copyright│
└────────────────────────────┘
```

## Tablet (768–1023px)

```text
Menu flows into 2-column cards.
Visit becomes 2 columns side-by-side.
Header stays single-line with hamburger.
```

## Desktop (>= 1024px)

```text
┌──────────────────────────────────────────┐
│ Hearth & Crumb   Menu About FAQ Visit     │  inline nav
├──────────────────────────────────────────┤
│ Hero copy        │  "Today at counter"   │
│                  │  highlight card       │
├──────────────────────────────────────────┤
│ ┌ card ┬ card ┬ card ┐                  │
│ │ sour dough  │      │                   │  3-column grid
│ ├──────────── ┼──────┤                   │
│ │ ...         │      │                   │
│ └─────────────┴──────┘                  │
├──────────────────────┬──────────────────-┤
│ About: story text    │ Hours sidebar      │  grid: main + aside
├──────────────────────┴──────────────────-┤
│ FAQ (details)                            │
├─────────────────────────┬────────────────┤
│ Visit copy/address      │ Contact form   │  grid: 1fr 1fr
├─────────────────────────┴────────────────┤
│ footer: address | copyright              │
└──────────────────────────────────────────┘
```

## Layout principles

- Mobile is one column: rapid scanning, thumb-friendly tap targets.
- Grid is used for page-level structure (menu, about+sidebar, visit+form).
- Flexbox handles component details (nav links, hero actions, card columns,
  footer row).
- Cards visually equal height thanks to flex column + `margin-top: auto`.
- No reliance on colour to communicate meaning — contrast + hierarchy carry
  the layout.