# Items needing owner confirmation

Everything below is either (a) a fact the site currently asserts that nobody has
verified, or (b) a decision only the owner can make. They are ordered by how
much damage the wrong answer does.

Nothing here blocks the site from working. All of it blocks the site from being
fully truthful.

---

## 1. BLOCKING — Do you sell to walk-in / retail customers?

**The site now says yes.** The brief asked for a clear path for homeowners,
architects, interior designers and builders alongside the trade offer, and the
business has a walk-in counter listed on Google Maps, so the whole site is
written on the basis that both audiences are welcome and there is no minimum
order at the counter.

**The old site said the opposite**, in the FAQ: *"We supply direct wholesale
trade orders only — to dealers, fabricators, contractors, and project
developers."*

Both cannot be true. If the business really is trade-only, this has to be
reversed **before launch**, and the homeowner wording comes out of:

- `src/lib/data/faqs.ts` (the first FAQ)
- every city page (`src/app/locations/[city]/page.tsx`, the FAQ block)
- every category page (`src/app/products/[category]/page.tsx`)
- the product template (`src/components/catalogue/CatalogueProductPage.tsx`)
- both topic hubs (`/window-hardware`, `/bathroom-glass-hardware`)
- `src/app/about/AboutClient.tsx`
- `/llms.txt`

Answer needed: **yes, we sell to anyone** or **no, trade only**.

---

## 2. Two invented product ranges are live and indexed

Alongside the real 86-SKU catalogue (SA-1 to SA-86), the codebase contains two
other product sets that do not appear to be things this business sells:

**a. Twelve products in `src/lib/data/products.ts`** with Italianate marketing
names and SKU codes in a format the real catalogue never uses:

| Name | SKU |
|---|---|
| Palazzo Lever Handle | SAH-R-DH-001 |
| Venezia Tilt & Turn Handle | SAH-R-WH-002 |
| Sereno Sliding Door System | SAH-R-SD-003 |
| Classica Wardrobe Profile | SAH-R-WP-004 |
| Imperiale Glass Door Patch Fitting | SAH-C-GP-001 |
| Atrium Curtain Wall System | SAH-C-CW-002 |
| Titan Pro Floor Spring | SAH-C-FS-003 |
| Panorama Sliding Window System | SAH-C-WS-004 |
| …and four industrial profiles | SAH-I-… |

These have **12 live, indexable product pages** in the sitemap.

**b. Eight products in `src/lib/data.ts`** that describe a different business
entirely — curtain wall mullions, T-slot structural profile 4040, solar panel
mounting rails, architectural louvre systems.

**Why it matters:** these pages compete with the real catalogue for the same
keywords, and a buyer who asks for a "Palazzo Lever Handle" and finds you do not
stock it is a lost sale and a damaged reputation.

**Decide:** are any of these real? If not, they should be deleted (and the URLs
301'd to the nearest real category). I have not removed them because I cannot
tell from the code whether some correspond to real items sold under marketing
names.

Related: `/products/residential`, `/products/commercial` and
`/products/industrial` overlap with `/residential`, `/commercial` and
`/industrial` — two sets of pages covering the same ground. One set should
eventually be retired.

---

## 3. `/supplier/*` — 1,000,000 generated pages (noindexed, decision pending)

`src/lib/data/pseoData.ts` generates 2,000 invented locality names ("Bhilai
Steel Yard Area", "Raipur Ganj Ward") multiplied by 500 invented products with
SA-101+ codes absent from the real catalogue — about a million templated URLs.
The old sitemap submitted 115 of them.

As agreed, these now serve `noindex` and are out of the sitemap. They remain
crawlable **on purpose**, so Google can read the noindex and drop them; a
`Disallow` would prevent it ever seeing it.

**Action:** once Search Console shows these have fallen out of the index, either
delete the route and `pseoData.ts` outright, or add `/supplier/` to the
`Disallow` list in `src/app/robots.ts`.

---

## 4. The canonical address — must match Google Business Profile exactly

Two variants exist:

- **A (currently used everywhere):** Shop No. 3, JK Steel Gali, Bhaisthan,
  Bhawani Patna, Ramsagar Para, Jawahar Nagar, Raipur, Chhattisgarh 492001
- **B (appeared in an old directory URL):** Near Mahavir Traders, Punjab Oil
  Mill Road

Local ranking depends on the name, address and phone being character-identical
across the site, the Google Business Profile, and every directory listing.

**Action:** open the Google Business Profile, copy the address exactly as it
appears there, and paste it into `src/config/business.ts` → `BUSINESS.address`.
Everything else on the site reads from that one place.

---

## 5. Opening hours

Currently published as **Monday–Sunday, 9:00 AM – 9:00 PM**, inherited from the
old schema. These go out as machine-readable `openingHoursSpecification`, so if
they are wrong, Google tells people you are open when you are not.

Seven days a week, 12 hours a day, is unusual for a hardware counter. Please
confirm or correct in `src/config/business.ts` → `BUSINESS.hours`.

---

## 6. Directory profile URLs (`sameAs`)

The old schema claimed these profiles:

```
https://www.indiamart.com/salasar-aluminium-hardware-raipur
https://www.tradeindia.com/Seller-15792038-Salasar-Aluminium-Hardware/
https://www.justdial.com/Raipur/Salasar-Aluminium-Hardware-Near-Mahavir-Traders-Bhaisthan/0771PX771-X771-240101120000-A1B2_BZDET
```

The JustDial URL in particular looks fabricated. A `sameAs` pointing at a
profile that does not exist actively damages how search engines resolve your
business identity, so **all three have been removed** and only the verified
Google Maps listing remains.

**Action:** paste the real URLs (IndiaMART, JustDial, TradeIndia, Facebook,
Instagram, LinkedIn — whichever genuinely exist) into
`src/config/business.ts` → `BUSINESS.sameAs`. If a listing does not exist yet,
creating it with the exact NAP from item 4 is one of the highest-value off-site
actions available.

---

## 7. The four business names

Four names appear across the site with no explanation, and in one place they
contradicted each other — products were described as manufactured by Swastik
Industries in Mumbai *and* produced at Finetek in Raipur.

An "Related businesses" section now defines each one on `/about`, using the
descriptions in `src/config/business.ts` → `BUSINESS.entities`. Three still
carry `[CONFIRM]`:

| Name | Currently described as |
|---|---|
| Salasar Aluminium & Hardware | The counter in Bhaisthan, Raipur — the business you order from |
| Lieon Marketing | **[CONFIRM]** Associated Raipur trading name used for part of the distribution |
| Finetek | **[CONFIRM]** Associated Raipur trading name / product line at the same counter |
| Swastik Industries | **[CONFIRM]** Manufacturing partner whose products are stocked and distributed |

Also: is the business a **manufacturer** or a **stockist/supplier**? The site
called itself a "wholesale manufacturer" while also saying production is by
someone else. It now says supplier and stockist.

---

## 8. Claims removed for lack of evidence — restore them if they are true

Each of these was stated as fact with nothing behind it. Say the word and they
go back in, as facts.

| Claim | Where it was | Status |
|---|---|---|
| "Mill Test Certified" | Every product page | Removed — certification unverified |
| "strict ISO-grade quality standards" | /about | Removed — ISO certification is either held and numbered, or not |
| "Established supplier serving Chhattisgarh for over 15+ years" | /about | Removed — **supply the real founding year and this becomes a genuine trust signal** |
| "Same-day dispatch across Chhattisgarh" | FAQ, category pages, city pages | Removed — is this reliably true? |
| "Ships Pan-India for bulk trade orders" | FAQ | Removed — do you? |
| "MOQ: standard box packs (10–50 pieces)" | FAQ | Removed — what is the real MOQ, if any? |
| "Custom extrusion length cuts" | FAQ, /about | Removed — do you offer this? |
| Alloy grade "6063-T6" on all 86 SKUs | Product pages | Removed — was applied uniformly to items including nylon brushes and silicone |
| "MOQ: 50 units" on all 86 SKUs | Product pages | Removed — same uniform-filler problem |
| Rating 4.9 / 32 reviews on all 86 SKUs | Product pages + schema | Removed — fabricated review markup is a manual-action risk |
| ₹ prices in header search | Header | Removed — `product.price` is a placeholder |

---

## 9. City pages — local detail still needed

Six cities have owner-supplied market names and dispatch schedules. **Eight do
not**, and their pages deliberately omit those blocks rather than invent names.

| City | Markets | Dispatch schedule | Best-selling SKUs |
|---|---|---|---|
| Raipur, Bhilai, Durg, Bilaspur, Korba, Rajnandgaon | ✅ | ✅ | ✅ |
| Naya Raipur, Raigarh, Jagdalpur, Ambikapur, Dhamtari, Mahasamund, Bemetara, Kanker | ❌ | ❌ | ❌ |

All 14 pages carry real, verifiable content regardless — district, approximate
road distance, highway route, what is actually built in that city and which
hardware categories that drives. The missing pieces are the three fields that
only you know.

For each of the eight, please supply:
1. **Key markets** — the actual hardware/trade market names you supply there.
2. **Dispatch** — transport line and realistic transit time, plus any cut-off.
3. **Popular SKUs** — which SA codes actually move there.

Add them to `src/lib/data/cities.ts`; the page renders each block automatically
once the field is filled.

Also confirm the approximate road distances, which I took from public
geography: Naya Raipur 25 km, Bhilai 38, Durg 44, Mahasamund 55, Bemetara 65,
Rajnandgaon 72, Dhamtari 78, Bilaspur 115, Kanker 140, Korba 200, Raigarh 250,
Jagdalpur 300, Ambikapur 340.

---

## 10. Hero video still needs compressing (8 MB)

`public/salasar-workshop-hero.mp4` is **8 MB**. It no longer blocks rendering —
it loads only after the page is usable, is skipped entirely on phones, and is
skipped on Save-Data and 2G — but it is still 8 MB for desktop visitors.

ffmpeg is not installed on this machine and I did not install it unasked. Run:

```bash
# H.264 MP4, target well under 2 MB
ffmpeg -i public/salasar-workshop-hero.mp4 \
  -vf "scale=1280:-2,fps=24" \
  -c:v libx264 -preset slow -crf 30 -profile:v high -pix_fmt yuv420p \
  -an -movflags +faststart \
  public/salasar-workshop-hero-compressed.mp4

# Optional WebM, usually 30-40% smaller again
ffmpeg -i public/salasar-workshop-hero.mp4 \
  -vf "scale=1280:-2,fps=24" \
  -c:v libvpx-vp9 -crf 40 -b:v 0 -an \
  public/salasar-workshop-hero.webm
```

`-an` strips audio (the video is muted anyway — free saving). Then replace the
original and re-run `node scripts/build-hero-poster.mjs` if the art changes.

---

## 11. Accounts and off-site work I cannot do for you

These need your logins.

**Search Console** — create the property for `https://www.salasaraluminium.shop`,
then either add the DNS TXT record, or set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
in the deployment environment (the meta tag is already wired up). Submit
`https://www.salasaraluminium.shop/sitemap.xml`.

**Bing Webmaster Tools** — same, via `NEXT_PUBLIC_BING_SITE_VERIFICATION`. Bing
can import directly from Search Console once that is set up.

**GA4** — create the property and set `NEXT_PUBLIC_GA_MEASUREMENT_ID`. The four
lead events (`click_call`, `click_whatsapp`, `form_submit`, `quote_request_sku`)
fire automatically once it is set; mark them as conversions in GA4.

**Google Business Profile** — the single highest-value item on this list for a
local business:
- confirm the primary category is *Hardware store*
- add the 12 product categories as products
- add photos of the counter, the stock and the storefront
- answer the top questions from `/faq` in the Q&A section
- keep the NAP identical to item 4

**Directory listings** — IndiaMART, JustDial, TradeIndia, with the exact same
NAP. Then put the real URLs into `BUSINESS.sameAs` (item 6).

**Keyword validation** — the keyword map was built from the brief and from how
buyers phrase these parts. Once Search Console has 4–6 weeks of data, check
which terms actually bring impressions and adjust the category and hub page
copy to match.

---

## 12. Smaller items

- **`sales@salasaraluminium.shop`** — is this mailbox monitored? It is published
  in schema and on `/llms.txt`.
- **Blog authorship** — the eight new guides are credited to *"Abhishek, Salasar
  Aluminium & Hardware"*. Confirm he is happy to be named, or give another name.
  Named authorship is worth keeping; it is a real trust signal.
- **Shower hinge glass thickness ratings** — `/bathroom-glass-hardware` and the
  guide both say these are not published yet rather than guessing. Supply the
  per-hinge ratings for SA-75 to SA-78 and they become a strong differentiator,
  because almost nobody publishes them.
- **`/cart` and `/checkout`** — both redirect to `/contact` and are excluded from
  search. The cart code underneath still multiplies placeholder prices. Either
  finish it with real prices or remove it.
- **Product photography** — several catalogue images are over 1 MB PNGs. AVIF and
  WebP conversion is now enabled, so `next/image` handles delivery, but smaller
  sources would still help build times and storage.
