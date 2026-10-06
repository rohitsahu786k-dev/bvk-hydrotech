# Content architecture

Where each part of a page comes from, and where to edit it.

## The short version

| What | Lives in | Edited by |
| --- | --- | --- |
| Page sections (hero, specs, applications…) | `content/pages/*.ts` | developers, in git |
| Page title, description, keywords, schema type | `content/seo.ts` | developers, in git |
| Image and document URLs | `content/assets.ts` | developers, in git |
| FAQs | WordPress ACF, falling back to `content/pages/*.ts` | editors, then developers |
| Legal page bodies | WordPress | editors |
| Header and footer menus | WordPress | editors |
| Contact details, logo, social | WordPress Site Settings | editors |
| Home page sections | WordPress | editors |

## Why the body copy is in git, not the CMS

Every content page renders through one component, `components/templates/SolutionPage.tsx`, driven by a typed object. That buys three things the CMS could not:

1. **The build cannot produce a broken page.** `generateStaticParams` seeds from `contentSlugs`, so all sixteen designed pages pre-render whether or not WordPress answers. The dev CMS returns intermittent GraphQL 500s; before this change those became missing pages.
2. **Specifications are reviewable.** A wire diameter or an alloy designation changing shows up in a diff.
3. **The pages cannot drift apart.** One template means one set of spacing, type scale and colour decisions across the site.

WordPress keeps everything an editor should own without a deploy: menus, contact details, FAQs, legal text and the home page.

## Adding a page

1. Write the content object in the right file under `content/pages/`, typed as `SolutionPageContent`.
2. Register it in the `pages` array in `content/index.ts`.
3. Add an entry to `pageSeo` in `content/seo.ts`.
4. Add a sitemap priority in `app/sitemap.ts` if it should differ from the 0.7 default.

The route, breadcrumbs, structured data, header behaviour and sitemap entry all follow automatically.

## Section order

Bands render in this fixed order, each one skipped if the content object omits it:

`hero → benefits → overview → components → process → features → specs → sustainability → applications → why → tiles → cta`

Certifications and the FAQ accordion are appended by the route, not the template.

## Writing rules

- Every specification must be traceable to `docs/KNOWLEDGE-BASE.md`. Do not invent figures.
- `components.callouts` takes **exactly six** entries. They are split into two columns of three either side of the diagram; any other count breaks that grid.
- `process.steps` takes four or five.
- `benefits`, `applications.cards` and `why.cards` take four each.
- Image `alt` is required. Use `""` only for decorative backgrounds behind text.
- Hero titles split across two lines via `title` and `titleAccent`; the accent line renders in the blue.

## Known deployment issues

- **`NEXT_PUBLIC_SITE_URL` is set to the WordPress host** in `.env.local` (`https://dev.bhavcreations.in`). Canonical tags, Open Graph URLs, the sitemap and all structured-data `@id` values are built from it, so in production it must be the public front-end domain — `.env.example` has it as `https://bvkhydrotech.com`. This must be corrected in the deployment environment or the whole site will canonicalise to the CMS.
- **`terms-of-use` and `terms-and-conditions` are duplicate pages in WordPress.** `terms-and-conditions` is the canonical one because that is what the footer menu links to; `terms-of-use` is set `noindex` and canonicalised to it, and is kept out of the sitemap. The real fix is to delete one in WordPress and redirect it.
- **Contact details conflict across BVK collateral** — see §8 of the knowledge base. The site reads them from WordPress Site Settings, so correcting that one record corrects the whole site.
