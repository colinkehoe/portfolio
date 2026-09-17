# colin-kehoe-portfolio

Personal portfolio site. Vite + React + TypeScript, deployed to GitHub Pages.

## Layout

```
src/
  content.ts              all editable site data
  App.tsx                 composes the page
  main.tsx                React entry point
  styles/global.css       all styling; design tokens at the top
  components/
    StarField.tsx         the parallax canvas
    Nav.tsx  Hero.tsx  Section.tsx
    About.tsx  Work.tsx  Toolkit.tsx  Background.tsx  Contact.tsx
```

### The star field

`StarField.tsx` draws four layers of stars to one fixed canvas. Each layer has a
`depth`, which scales how far it shifts with the pointer and with scroll — near
stars move a lot, distant ones barely at all, which is what produces the parallax.

The two nearest layers can also animate into four colored clusters when the hero
button is pressed; the far layers deliberately stay put so the depth stays legible.
`prefers-reduced-motion` disables the twinkle and drift and makes the cluster
transition instant.

Tuning knobs, all near the top of the file: `LAYERS` (how many stars, how big, how
fast per depth) and `CLUSTERS` (where the groups gather and what color they take).
