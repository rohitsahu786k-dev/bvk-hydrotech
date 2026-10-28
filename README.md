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

### Popups

Banners and popups are authored under **Popups** in WordPress (the **BVK
Popups** plugin, `wp-plugins/bvk-popups/`) and delivered by
`/wp-json/bvk/v1/popups`. **Draft = off, Published = on.** Each popup has five
tabs:

| Tab | What it controls |
| --- | --- |
| Content | Layout (banner only / image + text / text only), **separate Desktop and Mobile images**, image link, headline, text, two buttons, optional enquiry form |
| Appearance | Position (9 spots), size (custom / full-width bar / fullscreen), overlay, colours, close button (placement, delay), Esc / outside-click, auto-close, entrance and exit animation |
| Triggers | On page load (+delay), on scroll (down or back up), when a section scrolls into view, on click of a CSS selector, after inactivity, exit intent, after N page views |
| Where & Who | Entire site or chosen pages (page picker + `/path/*` patterns), pages to exclude, devices, new / returning visitors, campaign URL parameter, start / end date, priority |
| Frequency | Every time / once per visit / again after N days / max N times / once ever, stop after a click, reset version |

Several triggers can be on at once; the popup opens when any fires, once per
page view, and only one popup opens by itself at a time (highest priority
wins). Rules are re-checked on every page change.

Opening a popup on demand, from anywhere (menu item, button, page content):

- a link to `#popup-<key>` (the **Link Key** is shown in the box beside each popup)
- any element with `data-bvk-popup="<key>"`
- `window.bvkPopup.open("<key>")` / `.close()` / `.list()`
- `?bvk_popup_preview=<key>` on any URL opens a published popup ignoring every rule, for checking it

Opening on demand skips the frequency, device and page rules. The visitor
asked for it.

Notes:

- The `/thank-you` page never gets a site-wide popup unless a popup lists it.
- Visitors are remembered in their own browser (`localStorage`). Raise a popup's
  **Reset version** to show it to everyone again.
- Push-style events (`bvk_popup` with `view` / `click` / `close`) go to
  `window.dataLayer` when Google Tag Manager is installed.
- Optional, for instant updates: define `BVK_FRONTEND_URL` and
  `BVK_REVALIDATE_SECRET` (same value as `REVALIDATION_SECRET`) in
  `wp-config.php`. Otherwise changes appear within 5 minutes.
- If the endpoint is unreachable the site simply renders without popups.
- Logic lives in `lib/popups/` (covered by `node --test lib/popups/popups.test.mjs`);
  the UI in `components/popups/`.

### Homepage banner carousel

Managed under **Home Banners** in WordPress (the **BVK Home Banners** plugin,
`wp-plugins/bvk-home-banners/`; works with Secure Custom Fields or ACF) and
delivered by `/wp-json/bvk/v1/home-banners`.

Each banner is its own entry with: a **Desktop banner** (1916 x 821, 21:9) and a
separate **Mobile banner** (1254 x 1254, 1:1), a screen-reader description, a link
(optionally in a new tab, optionally with a button drawn on the banner), show /
hide, "show on desktop / mobile", an optional start and end date, and an order.

**Carousel Settings** (same menu) control: autoplay and seconds per banner, pause
on hover, fade or slide, speed, loop on/off, **arrows** (desktop / mobile /
both / none; shape and colour), **dots** (where and on which screens) and the
banner shape on desktop and mobile. A phone downloads only the mobile picture.
With no published banners, or with the carousel switched off, the homepage uses
the previous text-and-button hero, so it always has one.

The six banners in `BVK_Hydrotech_All_12_Banners_HD_WebP/` map to the existing
solution pages:

| Order | Banner | Desktop file | Mobile file | Link |
| --- | --- | --- | --- | --- |
| 1 | Precision Mesh | `01_Precision_Mesh_Desktop_1916x821.webp` | `01_Precision_Mesh_Mobile_1254x1254.webp` | `/precision-mesh-solutions` |
| 2 | Woven Mesh | `02_Woven_Mesh_...` | `02_Woven_Mesh_...` | `/woven-mesh-solutions` |
| 3 | Knitted Mesh | `03_Knitted_Mesh_...` | `03_Knitted_Mesh_...` | `/knitted-mesh-solutions` |
| 4 | Electrolyser Solutions | `04_Electrolyser_Solutions_...` | `04_Electrolyser_Solutions_...` | `/electrolyser-solutions` |
| 5 | Fuel Cell Solutions | `05_Fuel_Cell_Solutions_...` | `05_Fuel_Cell_Solutions_...` | `/fuel-cell-solutions` |
| 6 | Industrial Filtration | `06_Industrial_Filtration_...` | `06_Industrial_Filtration_...` | `/industrial-filtration` |

### Fairs & Events

Managed under **Fairs & Events** in WordPress (the **BVK Events** plugin,
`wp-plugins/bvk-events/`) and delivered by `/wp-json/bvk/v1/events`.

- **Fairs & Events > Events**: one entry per fair. Tabs: *Basics* (dates, venue,
  stall, status, summary, about text, showcase list, programme), *Banner &
  Photos* (card picture; banner as **desktop + mobile pictures or a video** (file
  or YouTube / Vimeo); gallery), *Booking*, *Search (SEO)*. Status is worked out
  from the dates (Upcoming / Live now / Concluded) unless overridden
  (Postponed, Cancelled). Categories are under the same menu.
- **Page Settings**: the list page's banner (desktop / mobile / video), intro,
  the moving text strip (automatic from upcoming events, or your own lines), four
  headline numbers, directory texts, search on/off, spotlight on/off, bottom
  banner, default booking email, SEO.
- **Bookings**: every appointment request, with status (New / Contacted /
  Confirmed / ...), notes, filter by event or status, and **Export to CSV**.

The site shows `/events` (banner, moving strip, numbers, spotlight, filter by
All / Upcoming / Previous, category and search, quick preview) and one page per
event at `/events/<slug>` (banner, key facts, about, what we are showcasing,
programme, gallery, map, **booking form**, more events, structured data for
search engines).

**Booking form (per event).** In the event's *Booking* tab: open or closed,
closing date, **time slots made automatically** (start, end, length, breaks) or
typed by hand, **bookings allowed per slot** (full slots show *Full*),
overall maximum, topic dropdown, company required / optional / hidden, message
box on / off, **your own extra questions** (text, long text, dropdown, number,
tick box; required or not), thank-you text, emails (team and an automatic
confirmation to the visitor with a Booking ID) and an alternative "register on
the organiser's site" button. Seat counts are live: a slot someone else just
took shows as Full without reloading, and the server re-checks the limit under a
lock when a booking is saved.

Bookings are sent by the Next.js server to WordPress using the application
password in `WORDPRESS_USERNAME` / `WORDPRESS_APP_PASSWORD` (the user needs the
ability to edit posts). If WordPress cannot be reached the visitor is told and
given the phone number; nothing is accepted silently. CRM (Zoho) hand-off goes in
`app/api/event-booking/route.ts` once its webhook address is available.

Optional environment variables: `WORDPRESS_EVENTS_URL`,
`WORDPRESS_EVENT_AVAILABILITY_URL`, `WORDPRESS_EVENT_BOOKINGS_URL`,
`WORDPRESS_HOME_BANNERS_URL` (override the endpoints, e.g. for a staging
backend) and `EVENT_BOOKING_MAX_PER_WINDOW` (bookings per address per ten
minutes, default 5).

Logic lives in `lib/events/` and `lib/banners/` (covered by
`node --test lib/events/events.test.mjs lib/banners/banners.test.mjs`); the UI in
`components/events/` and `components/sections/HeroBannerCarousel.tsx`.

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
- **BVK Events** (`wp-plugins/bvk-events/`) — Fairs & Events, their booking
  settings, the Bookings inbox and the public events / availability endpoints and
  the booking endpoint (authenticated).
- **BVK Home Banners** (`wp-plugins/bvk-home-banners/`) — the homepage banner
  carousel and its settings.
- **BVK Popups** (`wp-plugins/bvk-popups/`) — the Popups content type, its
  settings tabs and the public `/wp-json/bvk/v1/popups` endpoint. Independent of
  the bridge; deactivating it removes the menu and the popups.

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
