# SEO rebuild — verification report

All figures below are measured from the production build in this repository, not
estimated. Reproduce any of them with:

```bash
npx next build
node scripts/verify-seo.mjs      # titles, descriptions, canonicals, headings, sitemap
node scripts/verify-schema.mjs   # JSON-LD parsing and fabricated-data checks
npx next start -p 3210 & node scripts/lighthouse-run.mjs after 3210
```

---

## 1. The headline fix: `/products` now ships its catalogue

The catalogue page rendered its list client-side from a `useSearchParams` hook,
so the HTML a crawler received contained the words *"Loading Catalogue…"* and
nothing else. Eighty-six products were invisible to search engines and to any
visitor with JavaScript disabled.

| Measured in `.next/server/app/products.html` | Before | After |
|---|---:|---:|
| Distinct `SA-` codes in the HTML | **0** | **86** |
| Links to product pages | **0** | **86** |
| Links to category pages | 0 | 12 |
| `"Loading Catalogue"` placeholders | 1 | **0** |

```bash
$ grep -o 'SA-[0-9]\{1,2\}' .next/server/app/products.html | sort -u | wc -l
86
$ grep -c "Loading Catalogue" .next/server/app/products.html
0
```

The homepage had the same class of problem in a different form: product cards
had no link at all, only a button that opened a modal, so the homepage passed no
link equity to any product URL. All six featured cards now link to their product
pages, and all 12 categories are linked (previously 4, via `#hash` anchors).

---

## 2. Sitemap

The old sitemap hard-coded a 17-city list against a 6-city dataset, so **11 of
the URLs it submitted returned 404**. It also submitted `/cart`, `/checkout` and
115 generated `/supplier/` URLs.

It is now derived from the same data the pages render from, so it cannot drift.

| | Before | After |
|---|---:|---:|
| Total URLs | 264 | **165** |
| URLs returning 404 | **11** | **0** |
| Non-indexable URLs submitted (`/cart`, `/checkout`, `/supplier/*`) | **117** | **0** |
| City pages | 6 real of 17 listed | **14 of 14** |
| Indexable pages not in the sitemap | 3 | **0** |

Indexable prerendered pages: **165**. Sitemap URLs: **165**. Exact parity,
asserted by `scripts/verify-seo.mjs`.

One correction: my first rewrite of the sitemap introduced a new fault of its
own — it fed from `getAllProductStaticSlugs()`, which includes the `/product/sa-N`
id aliases, so it submitted 86 URLs that canonicalise elsewhere. The verifier
caught it and it was fixed before commit. The baseline sitemap did not have this
problem.

---

## 3. No duplicate titles, descriptions or canonicals

`scripts/verify-seo.mjs` reads every prerendered page and fails on any
duplicate, any missing field, or any `og:url` that disagrees with its canonical.

```
Scanned 340 prerendered pages (165 indexable)
Sitemap URLs: 165

All SEO checks passed.
```

| Check | Result |
|---|---|
| Pages with a duplicate `<title>` | **0** |
| Pages with a duplicate meta description | **0** |
| Pages with a duplicate canonical | **0** |
| Indexable pages missing a title, description or canonical | **0** |
| Pages where `og:url` ≠ canonical | **0** |
| Pages with no `<h1>` | **0** (was 1: `/faq`) |
| Pages with more than one `<h1>` | **0** |
| Pages with a skipped heading level | **0** (was 25) |
| Titles over 60 characters | **0** |
| Descriptions outside 120–165 characters | **0** |

Routes that previously had **no metadata at all** and now have it: `/finishes`,
`/projects`, `/[segment]/[category]`. `/[segment]` gained the canonical it was
missing.

Two specific bugs named in the brief are fixed:
- The `/blog` title duplication — post titles were cut at 35 characters with an
  ellipsis and then had `| Salasar Aluminium` appended by the layout template,
  producing `A Dealer's Guide to Salasar's Alumi... | Salasar Aluminium`.
- `SA-[#1-13]`, `SA-[#35-41]` and `SA-[#11-23]` — unrendered template
  placeholders on the Durg, Bilaspur and Rajnandgaon pages.

---

## 4. Structured data

`scripts/verify-schema.mjs` parses every JSON-LD block in the build.

```
Parsed 1167 JSON-LD blocks across 244 pages.

    874  Question          239  FAQPage           16  Article
    874  Answer            223  BreadcrumbList    16  Person
    835  ListItem          184  Product           14  Service
    247  PostalAddress     184  Brand              3  HardwareStore
    244  Organization       56  City               3  GeoCoordinates
    244  WebSite            56  State              3  OpeningHoursSpecification

No fabricated ratings, reviews or zero-prices. All blocks parse.
```

### What was removed, and why

| Fabrication | Where | Scale |
|---|---|---|
| `aggregateRating: 4.9, reviewCount: 32` | Product schema, from a hard-coded constant in the product adapter | **86 pages** |
| `offers` with `price: "0"` + `InStock` | Product schema | 86 pages |
| Star rating displayed visibly on cards | `ProductCard.tsx` | catalogue-wide |
| Placeholder ₹ prices in header search | `layout/Header.tsx` | site-wide |
| `sameAs` to IndiaMART / TradeIndia / JustDial | Organization schema | site-wide |

The business collects no on-site reviews and publishes no prices, so both
`aggregateRating` and `offers` were invented. Fabricated review markup is a
manual-action risk, not a ranking opportunity. Product schema now carries
neither — a valid Product node that is simply not eligible for star or price
rich results, which is the correct outcome.

The JustDial URL in particular appeared fabricated; a `sameAs` pointing at a
profile that does not exist damages entity resolution. Only the verified Google
Maps listing remains. See SEO-CONFIRM.md item 6.

### Coverage per template

| Template | Schema emitted |
|---|---|
| Sitewide | `Organization`, `WebSite` |
| `/`, `/contact`, `/locations` | + `HardwareStore` with address, geo, hours, `areaServed`, `hasMap` |
| Category | `BreadcrumbList`, `FAQPage` |
| Product | `Product` (no offers, no rating), `BreadcrumbList`, `FAQPage` |
| City | `Service` with `areaServed`, `BreadcrumbList`, `FAQPage` |
| Blog post | `Article` with named author + dates, `BreadcrumbList`, `FAQPage` |
| Hubs | `BreadcrumbList`, `FAQPage` |

**Rich Results Test still needs running against the live URLs after deploy** —
it requires a publicly reachable page, so it cannot run against this build. One
URL per template is enough: homepage, a category, a product, a city, a blog
post, `/faq`.

### FAQ markup now matches visible content

`FAQSection` was a Client Component whose accordion mounted only the open
answer. Eight of nine answers were absent from the HTML, and all nine were
absent without JavaScript — while `FAQPage` schema was emitted for every one.
The markup asserted content the page did not contain, which is exactly what
Google's FAQ guidelines prohibit.

It is now server-rendered with native `<details>`/`<summary>`. Every answer is
in the initial HTML, and the schema is generated from the same array that
renders.

---

## 5. Lighthouse — mobile, before and after

Real runs against a local production build of each commit. `before` is commit
`0b224ec` (the state before this work), `after` is `master`. Lighthouse mobile
preset: 4× CPU throttling, simulated slow 4G.

| Page | Metric | Before | After | Change |
|---|---|---:|---:|---|
| **/** | Performance | 60 | **81** | **+21** |
| | Accessibility | 91 | **96** | +5 |
| | Best practices | 100 | 96 | −4 |
| | SEO | 100 | 100 | — |
| | LCP | 4.01 s | 4.37 s | +0.36 s |
| | Transfer weight | **7,839 KB** | **636 KB** | **−92%** |
| **/products** | Performance | 54 | **70** | **+16** |
| | Accessibility | 94 | **96** | +2 |
| | SEO | 100 | 100 | — |
| | LCP | 6.78 s | **5.24 s** | −1.54 s |
| | Weight | 1,013 KB | 632 KB | −38% |
| **/locations/bilaspur** | Performance | 56 | **70** | **+14** |
| | Accessibility | 92 | **96** | +4 |
| | SEO | 100 | 100 | — |
| | LCP | 6.56 s | 6.32 s | −0.24 s |

CLS is **0.000** on all three pages, before and after — comfortably inside the
0.1 target.

### Reading these honestly

- **SEO scored 100 before and after.** Lighthouse's SEO category checks for a
  title, a description, crawlability and tap targets. It cannot tell that
  `/products` shipped zero products, that 11 sitemap URLs 404'd, or that product
  ratings were invented. A perfect Lighthouse SEO score meant very little here,
  which is why sections 1–4 above are the substantive evidence.
- **The homepage LCP rose by 0.36 s** while transfer weight fell 92%. Before,
  the LCP element was text that painted while an 8 MB video downloaded behind
  it; now it is the hero poster image. Trading 0.36 s of LCP for 7.2 MB of a
  visitor's mobile data is the right trade for this audience.
- **Best practices fell 4 points on the homepage** — this is the `<video>`
  element's autoplay flag, unchanged from before; it registered differently once
  the video stopped loading on mobile.
- **LCP has not reached the 2.5 s target** on any page. The remaining cost is
  render-blocking CSS plus two webfont files (75 KB) on a simulated slow-4G
  connection to a localhost server with no HTTP/2 and no CDN. Behind a real CDN
  these numbers improve substantially. Reaching 2.5 s reliably would mean
  dropping to a single font family — a design decision, not a technical one.

---

## 6. Accessibility

| Fix | Detail |
|---|---|
| Colour contrast | Brand gold `#B8860B` on white measured **3.25:1** against the 4.5:1 AA threshold. Darkened to `#8A6408` (**5.37:1**) across 46 text usages and 9 button backgrounds. Gold-on-navy already passed at 5.08:1 and was left alone. |
| Faint slate text | `#94A3B8` on white = 2.56:1 → `#64748B` = 4.76:1 |
| WhatsApp label | `#25D366` on white = 1.98:1 → `#0B6B37` = 6.62:1 |
| Hover regression | `hover:bg-[#a07509]` was *lighter* than the new base, dropping buttons back below AA on hover. Darkened to `#6F5006`. |
| Unlabelled form fields | The quote form's two `<select>` elements had visually adjacent labels with no `htmlFor`/`id` association — screen readers announced them unlabelled. |
| Touch targets | Footer phone links were below the minimum target size. |
| Duplicated marquee | The TrustBar repeats its items four times for a seamless loop; the three duplicate passes are now `aria-hidden`, so a screen reader reads each feature once instead of four times. |
| Heading outline | 25 pages had skipped heading levels; `/faq` had no `<h1>` at all. All fixed and asserted in CI. |

---

## 7. Crawlability and redirects

Verified against a running production server:

| URL | Status | Destination |
|---|---|---|
| `/products?category=door-kits` | **301** | `/products/door-kits` |
| `/products/aluminium-door-kit-sa-33` | **308** | `/product/aluminium-door-kit-sa-33` |
| `/cart`, `/checkout` | 307 | `/contact` |
| `/products/residential/slimline-sliding-window-profile` | **200** | renders |
| `/`, `/products`, `/products/door-kits`, `/product/…`, `/window-hardware`, `/bathroom-glass-hardware`, `/locations/kanker`, `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/sitemap.xml` | 200 | — |
| `/supplier/raipur/sliding-window-roller` | 200 | `<meta name="robots" content="noindex, nofollow">` |

One canonical host is enforced in `src/proxy.ts`: the apex domain and both
`.com` variants 301 to `https://www.salasaraluminium.shop`. Trailing-slash
policy is stated explicitly in `next.config.ts` rather than left to default.

`middleware.ts` was renamed to `proxy.ts` — the Next.js 16 file convention. The
build previously emitted a deprecation warning on every run.

### robots.txt

Blocks only `/api/`, `/admin`, `/cart`, `/checkout`. Names fifteen AI and
answer-engine crawlers explicitly, including GPTBot, OAI-SearchBot, ClaudeBot,
PerplexityBot and Google-Extended.

`/supplier/` is deliberately **not** blocked, even though those pages must leave
the index: a disallowed URL is never fetched, so Google would never see the
`noindex` and anything already indexed would linger. Add the `Disallow` once
Search Console confirms they have dropped out.

---

## 8. Answer-engine readiness

`public/llms.txt` was a hand-written file that had drifted — outdated domain, a
second variant of the address, and links to category and product URLs that did
not exist. A stale llms.txt is worse than none: it teaches models facts about
the business that are wrong.

Both files are now generated from the same data the pages render:

- **`/llms.txt`** — entity profile, NAP, ordering instructions, all 12 category
  URLs, 14 city URLs, both hubs, the buying guides and the FAQs.
- **`/llms-full.txt`** — **all 86 SKUs** in plain text (32 KB) with codes, URLs,
  materials, finishes, sizes and typical uses.

Both state explicitly that the business does not publish prices, that delivery
time is confirmed per order rather than fixed, and that the city pages are not
branch addresses — the three things a model is most likely to get wrong.

Also added: answer-first "Quick answer" boxes on all 12 category pages and both
hubs, and answer-first FAQs throughout where the first sentence answers the
question standalone.

---

## 9. What was built

| | Count |
|---|---:|
| Indexable pages | 165 |
| Catalogue SKUs rendered server-side | 86 |
| Category pages | 12 |
| City pages (was 6) | 14 |
| New topic hubs | 2 |
| New buying guides | 8 |
| Blog posts total | 16 |

New pages: `/window-hardware` and `/bathroom-glass-hardware` gather SKUs across
several categories under the words buyers actually search — "sliding window
roller", "shower hinge", "wall to glass connector" — rather than the internal
category names, and link down into the category pages instead of competing with
them.

Eight cities added: Naya Raipur, Raigarh, Jagdalpur, Ambikapur, Dhamtari,
Mahasamund, Bemetara, Kanker. Each carries real district, road-distance,
highway-route and local-economy content. The three owner-supplied fields
(markets, dispatch schedule, best-selling SKUs) are **omitted rather than
invented** — see SEO-CONFIRM.md item 9.

Eight guides written against real pre-purchase questions: shower hinge selection
for 8–12 mm glass, sliding window roller sizes, door closer size by door weight,
machar jaali sizes and materials, crescent vs touch vs Domal vs Maruti locks,
tower bolt sizing, C-channel vs G-channel, floor spring vs door closer.

---

## 10. Lead tracking

There was no analytics of any kind, so none of the calls, WhatsApp messages or
form submissions this work aims to increase could be measured.

Four events now fire — `click_call`, `click_whatsapp`, `form_submit`,
`quote_request_sku` — each carrying `page_path`, and where relevant the SA code
and a position label (`product-cta`, `city-bilaspur-hero`, `mobile-bar`,
`footer`). `form_submit` fires only after the API confirms the lead was stored.

WhatsApp links are UTM-tagged per page and prefilled with the product or city
context plus the source URL, so a WhatsApp lead arrives already saying what it
is about.

GA4 loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. **The property still
needs creating** — see SEO-CONFIRM.md item 11.

---

## 11. One correction to an earlier claim

Mid-way through this work I converted `/products/<category>/<slug>` into a 308
redirect, on the stated basis that those products were also served at
`/product/<slug>` and the two paths were duplicate content.

**That was wrong.** This route is generated from `PRODUCTS` in `lib/data.ts`,
while `/product/[slug]` resolves against `products` in `lib/data/products.ts`
plus the 86-SKU catalogue. The two sets are disjoint, so the redirect made all
eight of those URLs return 404.

Caught by the redirect verification in section 7 and fixed: the route renders
again, now with the canonical, Open Graph block and heading hierarchy it never
had. The eight URLs return 200 and are in the sitemap.

---

## 12. Not done, and why

| Item | Status |
|---|---|
| Rich Results Test per template | Needs live URLs; run after deploy |
| Video compressed under 2 MB | ffmpeg not installed here; command supplied in SEO-CONFIRM.md item 10. It no longer blocks rendering and is skipped on mobile |
| Search Console, Bing, GA4 properties | Need your accounts; meta tags and event code already wired |
| Google Business Profile, IndiaMART / JustDial / TradeIndia | Need your accounts — the highest-value remaining work for a local business |
| Keyword volume validation | Needs 4–6 weeks of Search Console data |
| Local detail for 8 new city pages | Needs owner input — omitted rather than invented |
| Two invented product ranges | Flagged, not deleted — I cannot tell from the code whether any are real |
| Body text below 16px | Partially addressed in new components; a full typographic pass across the existing site is a design decision |
