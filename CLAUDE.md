# demo-salon: Salt & Stone Wellness (WebVybe portfolio demo)

**This is not a real business.** Salt & Stone Wellness is a fictional
salon/spa invented to showcase WebVybe's salon/spa client-site template.
Do not present anything here as a real operating business (no fabricated
review counts, no claims of a real physical presence beyond the demo copy).

## Stack

- Vite + React 19 + TypeScript + Tailwind v4 (matches `webvybe/agency-site`
  conventions, using the same button/nav-link component classes, same `@theme`
  token pattern in `src/index.css`).
- `react-router-dom` v7 for routing.
- No backend. The contact form (`src/pages/Contact.tsx`) shows a success
  state client-side only; it does not send anywhere.
- Deployed to Cloudflare Pages as a static build (`npm run build` → `dist/`).

## Design tokens

Brand palette lives in `src/index.css` under `@theme` (`--color-clay`,
`--color-pine`, `--color-sand`, `--color-cream`, `--color-stone`, `--color-ink`).
Deliberately distinct from WebVybe's own blue/green brand: this is the
*client's* identity. No hardcoded hex values outside that token block.

## Content

All salon-specific copy (services, pricing, hours, address, FAQs) lives in
`src/content/salon.ts` as a single source of truth; edit there, not inline
in components.

## Known placeholders (flagged, not hidden)

- Gallery/hero/etc. imagery is now real, licensed stock photography (Pexels,
  free-for-commercial-use, no attribution required) generic to the salon/spa
  vertical, not real photos of a real Salt & Stone Wellness location -- see
  photographer-credit comments above each `DecorPanel` `src` import.
  `src/components/DecorPanel.tsx` still supports a CSS-gradient fallback
  (used when no `src` is passed) for any future slot without a photo yet.
- `robots.txt` disallows all crawling: this demo should not get indexed.
