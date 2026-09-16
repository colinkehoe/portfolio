# colin-kehoe-portfolio

Personal portfolio site. Vite + React + TypeScript, deployed to GitHub Pages.

## Running it

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

Other scripts:

| Command             | Does                                      |
| ------------------- | ----------------------------------------- |
| `npm run build`     | Type-checks, then builds to `dist/`       |
| `npm run preview`   | Serves the built `dist/` locally          |
| `npm run typecheck` | Type-checks without building              |

## Editing the content

Everything you'd normally want to change is in **`src/content.ts`** — your name and
links, the project list, the toolkit groups, and the work history. Nothing in that
file touches layout, so you can edit it without reading any of the components.

A few notes on the shape of that data:

- **`accent`** picks one of the four palette colors: `"magenta"`, `"mint"`,
  `"amber"`, or `"violet"`. It tints the project's marker bar and language label.
- **`url: ""`** on a project renders it unlinked, for work with no public repo yet.
  It still shows its accent bar so the row doesn't look broken.
- **`status`** adds a badge next to the title (e.g. `"Building now"`). Omit it for
  finished work.
- **`todo: true`** on a background entry outlines it in amber as a visible reminder
  that it needs filling in. Remove the flag once it's real.

## Deploying to GitHub Pages

1. Push this repo to GitHub with `main` as the default branch.
2. In the repo, go to **Settings → Pages**, and under **Source** choose
   **GitHub Actions** (not "Deploy from a branch").
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and
   publishes automatically; watch it in the **Actions** tab.

Commit `package-lock.json` — the workflow uses `npm ci`, which requires it. It's
created for you by the first `npm install`.

### About the base path

This trips people up, so the workflow handles it automatically. GitHub serves a
repo named `<username>.github.io` from the domain root, but every other repo from
a subpath like `/portfolio/`. Vite has to bake that prefix into the asset URLs at
build time or the deployed page loads a blank screen with 404s in the console.

The workflow derives it from the repo name and passes it as `BASE_PATH`. You only
need to care if you're deploying somewhere else — in that case set `BASE_PATH`
yourself, or edit the default in `vite.config.ts`.

### Custom domain

Add a `CNAME` file containing your domain to `public/`, and set the domain under
Settings → Pages. With a custom domain the site is served from the root, so also
set `BASE_PATH` to `/` — otherwise the auto-derived `/<repo>/` prefix will be
wrong. The simplest way is to hardcode `const base = "/"` in `vite.config.ts`.

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
