# Project 1 — Responsive Frontend Interface

## Project Title

**Hearth & Crumb — responsive artisan bakery website**

## Description

A responsive, mobile-first website for a fictional artisan bakery. Built with
semantic HTML5, CSS3 and vanilla JavaScript — no frameworks. The site presents
a menu of baked goods, story and opening hours, a FAQ and a reservation/contact
form.

## Objective

Demonstrate the fundamentals of frontend development:

- HTML5 and semantic markup
- CSS3, CSS Grid and Flexbox
- Vanilla JavaScript interaction
- Mobile-first responsive design across mobile, tablet and desktop
- Accessibility and clean UI fundamentals

## Features

- Mobile-first responsive layout (mobile → tablet → desktop)
- Sticky header with hamburger navigation on mobile
- Hero section with "today at the counter" highlights
- Product card grid (CSS Grid) with flexbox-aligned card content
- About section + opening-hours sidebar (Grid macro layout)
- Native FAQ accordion (`<details>` / `<summary>`, no JS required)
- Contact form with client-side validation and visible error messages
- Skip-to-content link, focus states, aria attributes and keyboard support
- Fluid typography with `clamp()`
- Warm, grounded colour palette

## Technologies Used

```text
HTML5
CSS3
Vanilla JavaScript (no libraries, no frameworks)
```

## Design Concept

A small artisan bakery that values slow baking and honesty. The concept leads
the layout decisions: the menu and opening hours are visible immediately, bake
times are printed on each card, and the FAQ answers common questions before a
visitor needs to ask.

## Design Process

The documented workflow produced three lightweight design documents in
`docs/`:

1. **Discovery** — audience, goals, content inventory → `docs/discovery.md`
2. **Research / Empathy Map** — three visitor personas → `docs/empathy-map.md`
3. **Wireframe** — mobile-first low-fidelity layout → `docs/wireframe.md`

## Visual Style

Based on the warm and grounded DecodeLabs direction:

```text
Mocha Mousse  #A68E7A   accent / cards
Ethereal Blue #A0D4E0   hero gradient, focus states
Moonlit Grey  #F2F0EA   page background
```

Typography (maximum 2 families, 3 weights):

```text
Headings: Montserrat 600 / 700
Body:     Open Sans 400 / 700
```

## Responsive Strategy

- **Mobile (default, < 768px):** single column; hamburger navigation;
  stacked cards, sections and form fields. Designed first.
- **Tablet (>= 768px):** menu switches to a 2-column card grid; visit/contact
  becomes two columns.
- **Desktop (>= 1024px):** inline navigation replaces the hamburger; hero
  becomes two columns; menu becomes a 3-column grid; about gets a
  main-content + sidebar Grid layout.

**Grid** is used for page-level structure (card grid, hero, about + sidebar,
visit + form). **Flexbox** handles component-level layouts (navigation, hero
buttons, card columns, footer row). **`clamp()`** is used for all major
headings and body text.

## Accessibility

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`,
  `<aside>`, `<footer>`
- Single `<h1>` with a logical heading hierarchy
- Skip-to-content link
- Hamburger button uses `aria-expanded` and `aria-controls`
- Form inputs have labels and error messages are announced via `aria-live`
- Visible `:focus-visible` outlines everywhere
- Keyboard navigation works throughout (native links, buttons and `<details>`)
- Sufficient contrast between text and background colours
- Colour is never the only way information is communicated

## JavaScript Interaction

`js/script.js` provides three meaningful behaviours:

1. **Mobile navigation toggle** — opens/closes the menu and updates
   `aria-expanded`.
2. **Contact form validation** — validates name, email format and message;
   shows inline error messages and never lets invalid data "succeed".
3. **Dynamic footer year** — keeps the copyright year current.

## How to Run

No build step or dependencies. Open `index.html` in a browser:

```bash
# from the project folder
start index.html
```

Or serve it locally, e.g.:

```bash
npx serve .
```

## Responsive Testing

Tested at the following widths (see section "How to Run"):

| Breakpoint | Layout                                                       | Result |
| ---------- | ------------------------------------------------------------ | ------ |
| 375px      | Mobile: single column, hamburger nav                         | Pass   |
| 768px      | Tablet: 2-column menu, horizontal footer                     | Pass   |
| 1024px     | Desktop: 3-column menu, inline nav, grid hero + about        | Pass   |
| 1440px     | Wide desktop: content constrained by `.container` max width | Pass   |

Checks performed: navigation open/close, focus visibility, form validation
success and failure, FAQ expand/collapse, typography scaling, card alignment,
footer behaviour, no horizontal overflow/scrollbar on any width.

## Project Structure

```text
Project-1-Responsive-Frontend/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── docs/
│   ├── discovery.md
│   ├── empathy-map.md
│   └── wireframe.md
├── README.md
└── .gitignore
```

## Future Improvements

- Add real product photos with descriptive `alt` text and responsive images
- Add a light/dark theme toggle (respecting `prefers-color-scheme`)
- Persist form submissions to the Full Stack P2 backend API
- Add smooth-scroll progress and active-link highlighting in the nav
- Larger gallery of seasonal specials