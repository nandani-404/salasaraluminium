# Urgent: 9,850 fabricated pages are in Google's index

**Do these three things today.** The code side is done and committed; these
three require your Search Console login and nobody else can do them.

---

## What has happened

Search Console shows **9,850 pages indexed**. Your site has about **280 real
pages**.

Roughly **9,570 of the indexed pages are fabricated** — generated from
`pseoData.ts`, which crosses 2,000 invented locality names ("Bhilai Steel Yard
Area", "Raipur Ganj Ward") with 500 invented products carrying SA-101 and
higher codes that do not exist in your 86-item catalogue.

That is about **97% of what Google holds for your domain**.

### How they got there

On **9 September 2026**, commit `be54101` — *"1 million programmatic SEO pages
engine and 20-chunk sitemap index"* — submitted a sitemap index of **20 chunks
× 50,000 URLs** to Google.

Nothing on your site ever linked to those pages. The sitemap alone was enough.
Google started working through the list, and your indexing chart shows exactly
that: flat across the entire reporting period, then a single spike to 9.85k at
the right-hand edge.

**The number was still climbing when you took that screenshot.**

### Why this is the reason you are not ranking

Google's spam policy on **scaled content abuse** applies to the whole site, not
just the offending pages. When 97% of a domain's indexed pages are templated,
machine-generated content about places and products that do not exist, the
domain itself is assessed on that basis.

Your 280 real pages are competing while carrying that. This is a far bigger
problem than having too few pages, and it is why adding more pages would not
have helped on its own.

Crawl budget is the second cost: Google has been spending its time on 9,570
junk URLs instead of your real catalogue.

---

## Already done in code (committed)

| | Status |
|---|---|
| The 20-chunk sitemap index | **Removed** — one clean sitemap.xml with 259 real URLs |
| `/supplier/*` responses | **410 Gone** — verified on a running build |
| `/supplier/` in robots.txt | **Deliberately absent** — see below |
| Real pages | All still 200, verified |

`410 Gone` is the strongest deindexing signal available. It tells Google the
resource is permanently removed, is acted on faster than a 404, and stops
further crawling of the pattern.

**Important:** `/supplier/` is deliberately **not** blocked in robots.txt.
Blocking crawling and removing from the index are opposite instructions — a
blocked URL is never fetched, so Google would never see the 410 and the pages
would sit in your index indefinitely. To get them out, the crawler has to be
let in.

Do not add a `Disallow` for `/supplier/` until Search Console confirms the count
has dropped.

---

## Step 1 — Deploy

None of the above takes effect until the current `master` is live. Until then
Google is still being served the old pages.

This is the single highest-priority deploy on this project.

---

## Step 2 — Remove the old sitemaps from Search Console

Search Console → **Sitemaps**.

You will see the old chunked sitemaps listed — names like `sitemap/0.xml`
through `sitemap/19.xml`, or a `sitemap_index.xml`.

**Delete every one of them.** Use the three-dot menu on each row → Remove
sitemap.

Then submit the single clean one:

```
sitemap.xml
```

It should report **259 discovered URLs**. If it reports thousands, an old
sitemap is still registered — find it and remove it.

---

## Step 3 — Use the Removals tool as an emergency brake

Search Console → **Removals** → **New Request** → **Temporary Removals**.

Enter:

```
https://www.salasaraluminium.shop/supplier/
```

and select **"Remove all URLs with this prefix"**.

This hides every one of those pages from Google results within about 24 hours.

It is temporary — roughly six months — and it hides rather than deindexes. That
is exactly what you want here: it stops the damage immediately while the 410s do
the permanent work underneath. By the time the removal expires, the 410s will
have cleared them properly.

**Do this even though the 410 is live.** The 410 only takes effect as Google
re-crawls each URL, and 9,570 URLs will take weeks to work through. The
Removals tool is immediate.

---

## What to expect, and when

| When | What you should see |
|---|---|
| ~24 hours after Step 3 | Supplier pages stop appearing in Google results |
| 1–2 weeks | "Indexed" count starts falling in Search Console |
| 4–8 weeks | Count approaching your real page count (~259–282) |
| After that | Your real pages competing on their own merits |

The indexed count **falling** is the signal that this is working. It will look
alarming — from 9,850 down toward 280 — and it is the whole point. You are not
losing 9,570 pages that were earning anything. You are removing 9,570 pages that
were costing you.

---

## Please tell me

Once you have done Steps 1–3:

1. **What the Sitemaps page listed** before you removed anything — how many
   sitemaps and what URL counts. That tells me how much Google was given.
2. **The four reasons** under "Not indexed → 356". If "Crawled – currently not
   indexed" is among them and large, that is a separate signal worth acting on.
3. **The indexed count** again in about a week, so we can confirm it is falling.

---

## Do not do these

**Do not add `Disallow: /supplier/` to robots.txt.** It would prevent the 410
ever being seen and freeze the pages in the index. This is the single most
common mistake made at exactly this point.

**Do not resubmit the old sitemaps.** They are the cause.

**Do not restore `pseoData.ts` or the `/supplier/` route.** The generator is
still in the repository so this history is auditable, but the proxy returns 410
for every path under `/supplier/` regardless of what the route files say. If you
want it gone entirely, say so and I will remove the files.

**Do not panic when the indexed count drops.** That is the fix working.
