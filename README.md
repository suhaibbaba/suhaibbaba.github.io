# suhaibbaba.github.io

Personal portfolio of Suhaib Baba, Senior Full-stack Engineer.

Live: https://suhaibbaba.github.io

## Why plain HTML

The page is static and its content changes a few times a year, so a framework would add
JavaScript without adding value. Three files, no build step, no dependencies:

- `index.html` — content and structure, with JSON-LD `Person` schema for search engines
- `styles.css` — design tokens, layout, animations (respects `prefers-reduced-motion`)
- `main.js` — headline reveal, Lighthouse gauge counter, scroll-triggered reveals, timeline progress, years computed from the current date

## Lighthouse (mobile)

Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100

## Run locally

Open `index.html` in a browser, or serve the folder: `npx serve .`
