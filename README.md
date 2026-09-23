# BVK Hydrotech — Headless Website

Next.js 16 (App Router, Turbopack) frontend on a headless WordPress backend,
read over WPGraphQL. Every word, image, menu item and contact detail on the
site is authored in WordPress — there is no hardcoded marketing copy in this
repo.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
npm run lint
```

Copy `.env.example` to `.env.local` and fill it in. The only values required
to render the site are `NEXT_PUBLIC_WORDPRESS_URL` and `WORDPRESS_GRAPHQL_URL`.

## How content reaches the page

| Section on the homepage | WordPress source |
| --- | --- |
| Hero carousel | **Hero Slides** (one post per slide) |
| Credibility metrics | Home page → *Homepage Sections* → Stat 1–4 |
| Solutions | **Services** |
| Who we are | Home page → *Homepage Sections* → About |
| Technology / knit types | **Products** |
| Certifications | **Certifications** |
| Applications | **Industries** |
| Sustainability | Sustainability page → hero + Stat 1–4 |
| Resources | **Downloads** (PDF attached per post) |
| FAQ | **FAQs** |
| Closing CTA | Home page → *Homepage Sections* → CTA |
| Header / footer nav | Appearance → Menus (`primary`, `footer1–3`, `legal`) |
| Phone, email, address, tagline | Page **Site Settings** → *Site Settings* |

Inner pages (`/about`, `/sustainability`, …) are ordinary WordPress pages
rendered by `app/(site)/[slug]`. Publishing a new page in WordPress adds a
route and a sitemap entry on the next revalidation — no deploy needed.

### The hero carousel

ACF Repeater is a Pro feature and this install runs ACF free, so each slide is
its own post under **Hero Slides** rather than a repeater row. Per slide:

- **Desktop Image** (required) — landscape, 2400×1350 or wider
- **Mobile Image** — portrait crop; falls back to the desktop image if empty
- **Image Focal Point** — which part to keep in frame when cropped
- Eyebrow, **Headline (solid)**, Headline (muted), Subtitle, two CTAs
- **Show in carousel** — park a slide without deleting it
- **Sort Order** — lower numbers first

The frontend emits a `<picture>` with a `max-width: 767px` source so phones
download only the portrait crop. Autoplay is 7s and pauses on hover, on focus,
when the tab is hidden, and for `prefers-reduced-motion`.

## Design system

Tokens live in `app/globals.css` under `@theme` — Tailwind v4 is CSS-first, so
there is no `tailwind.config.ts`.

Two sources are combined deliberately:

- **Structure** from the approved reference layout: full-bleed cinematic hero,
  oversized two-tone display headline, near-square corners (2–4px).
- **Colour** from *BVK Hydrotech — Brand Guidelines* (2026-09-18). Brand green
  `#1DB053` is sampled from the wordmark. The guidelines are explicit that it
  fails the 3:1 contrast floor as text or as a solid fill under light text, so
  everything interactive uses `#147B3A` (`--color-brand-deep`) and plain green
  is reserved for marks, rules and large decorative fills.

### Logo

The supplied wordmark is grey + green and **no reversed/knockout version
exists**. The guidelines forbid placing it on dark or coloured grounds until
one is supplied, so on the dark header and footer it sits inside a white plate
(`.logo-plate`). Do not recolour the mark. Ask the brand owner for a knockout
version and this can be simplified.

## Backend plugins

- **BVK Hydrotech Custom Setup** — the original plugin: custom post types,
  taxonomies and most ACF groups. Untouched by this work.
- **BVK REST Bridge** (`wp-plugins/bvk-rest-bridge.php` in the parent repo) —
  puts the `bvk_*` types on the REST API, registers the Hero Slides and
  Certifications types, and widens two ACF location rules that WPGraphQL could
  not map. Deactivating it reverts all of that.

## Known gaps

- **RFQ delivery.** `app/api/rfq/route.ts` validates, traps bots and captures
  campaign parameters, but cannot email yet — `SMTP_*` credentials are unset.
  Until they are, enquiries are written to the server log with a warning. Zoho
  CRM and reCAPTCHA (both in the PO) also need credentials.
- **Enquiries are not stored in WordPress.** That needs one more content type
  in the REST Bridge plugin and a redeploy.
- **Analytics.** `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` are empty; nothing
  is injected until they are set.
- **Mobile hero crops.** Two slides have a distinct portrait image; the rest
  fall back to the desktop crop. Upload true portrait artwork per slide in
  **Hero Slides → Mobile Image**.
- **Body copy.** Page heroes are written for every route, but most inner pages
  have no body content yet — they render an honest "being written" panel with
  a link to the RFQ form rather than an empty container.
