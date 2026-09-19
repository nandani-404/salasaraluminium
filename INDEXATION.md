# Getting these 259 pages indexed

> **Read URGENT-DEINDEX.md first.** Search Console shows 9,850 pages indexed
> against roughly 280 real ones — about 97% of your index is fabricated
> `/supplier/` content submitted by a 20-chunk, 1,000,000-URL sitemap on
> 9 September 2026. That has to come out before anything below matters.
> Nothing here will move the needle while it stands.

More pages only help once Google is actually indexing the ones you have. This
is the order to work in.

---

## Step 1 — Find out where you actually stand

Search Console → **Indexing → Pages**. Two numbers matter:

- **Indexed** — pages Google has in its index
- **Not indexed** — pages it knows about and has chosen not to index

Send me both figures and the top three reasons listed under "Not indexed". The
reason string tells you what to fix, and the fixes are completely different:

| Reason shown | What it means | Fix |
|---|---|---|
| **Discovered – currently not indexed** | Google knows the URL exists but has not crawled it | Usually crawl budget or weak internal linking. Now largely addressed — 0 orphans. |
| **Crawled – currently not indexed** | It crawled the page and decided not to index it | A quality judgement. The page is thin, duplicative, or reads as templated. |
| **Duplicate without user-selected canonical** | Google thinks another page says the same thing | Was a real problem here: 86 alias URLs and a duplicated product route. Both fixed. |
| **Alternate page with proper canonical tag** | Working as intended | Nothing to do — this is the alias pages behaving correctly. |
| **Excluded by 'noindex' tag** | Deliberate | Anything here is now a bug — `/supplier/*` returns 410, not noindex. Tell me what is listed. |
| **Not found (404)** | Submitted URL does not exist | Was 11 city URLs. Now 0. |
| **Soft 404** / **Page removed because of legal complaint** | — | Not expected. Tell me if either appears. |
| **Blocked due to access forbidden (403)** or **410** | Deliberate | Expect a large and *growing* number here as Google works through `/supplier/*`. This is the fix working. |
| **Page with redirect** | Submitted URL redirects | Should be none — the sitemap contains only 200-status pages. |

If "Crawled – currently not indexed" is the largest bucket, **stop adding pages**
and tell me. That is Google saying the content is not worth indexing, and more
of it makes the signal worse, not better.

---

## Step 2 — Submit the sitemap

Search Console → **Sitemaps** → enter `sitemap.xml` → Submit.

It should report 259 discovered URLs. If it reports fewer, or shows errors,
send me the message.

Do the same in Bing Webmaster Tools. Bing can import your Search Console
property directly, which saves re-verifying.

---

## Step 3 — Request indexing on the pages that matter most

Search Console → **URL Inspection** → paste the URL → **Request Indexing**.

There is a daily quota, so spend it on the pages that would produce leads:

1. `/` — homepage
2. `/products` — the catalogue that previously shipped zero products
3. `/locations/raipur`
4. `/window-hardware`
5. `/door-hardware`
6. `/bathroom-glass-hardware`
7. `/hi` — Hindi homepage
8. `/mosquito-mesh-jaali`
9. `/contact`
10. `/products/door-kits`

Do not work through all 259. Get the important ones in, then let the internal
links carry the rest — which is what they are now wired to do.

---

## Step 4 — The two things that outrank any page you will write

For "hardware shop in Raipur" and every similar query, the map pack sits above
the organic results. No amount of on-page work outranks it.

**Google Business Profile.** Free, and the highest-return item on this entire
project:

- Primary category: **Hardware store**
- Add all 12 product categories as products
- Photographs: the counter, the stock, the storefront, the signage
- Opening hours matching `src/config/business.ts` exactly
- Answer the questions from `/faq` in the Q&A section yourself
- Address character-identical to the site (see SEO-CONFIRM.md item 4)

**Directory listings.** IndiaMART, JustDial, TradeIndia, with that same address
to the character. These are both citations (which local ranking depends on) and
your first real backlinks. Then put the genuine URLs into
`BUSINESS.sameAs` — the previous ones appeared fabricated and were removed.

---

## Step 5 — Watch the right report

After two to four weeks, Search Console → **Performance**, and look at
**Queries**, not at rankings.

What you want to see is the number of distinct queries producing impressions
going up. That is the site becoming visible for more things, which is the actual
goal behind "rank everywhere".

Then sort by impressions with a low click-through rate. Those are queries where
you appear but nobody clicks — usually a title or description problem, which is
a ten-minute fix with a large effect.

Tell me what shows up and I will adjust the copy to match the language people
are really using, rather than what we assumed they would use.

---

## What not to do

**Do not buy backlinks.** Link schemes are one of the few things that draw a
manual penalty, and recovery takes months.

**Do not reinstate `/supplier/*`.** Those URLs now return `410 Gone` — see
URGENT-DEINDEX.md.

**Do not add `Disallow: /supplier/` to robots.txt.** This is the single most
common mistake made at this point, and it would undo the fix: a blocked URL is
never fetched, so Google would never see the 410 and the ~9,850 indexed pages
would stay in the index indefinitely. Blocking crawling and removing from the
index are opposite instructions. Only consider a `Disallow` long after Search
Console confirms the count has fallen to your real page count.

**Do not add more cities without their content.** The city-category route has no
template fallback on purpose — adding a city without writing its 12 angles emits
nothing rather than publishing filler. Supply the local detail (SEO-CONFIRM.md
item 9) and the pages appear.

**Do not chase page count.** You had a million URLs. It did not work. 259 real
pages that are all reachable, all unique and all answering a genuine question
will do considerably more.

---

## Running the checks yourself

```bash
npx next build
node scripts/verify-seo.mjs      # titles, descriptions, canonicals, headings
node scripts/verify-links.mjs    # orphans, unreachable pages, click depth
node scripts/verify-schema.mjs   # JSON-LD, and no fabricated ratings or prices
```

All three currently pass with zero errors and zero warnings. Run them before any
deploy — `verify-links` in particular, since orphaning a page is easy to do
accidentally and invisible until traffic fails to arrive.
