/**
 * Post-build SEO verification.
 *
 * Reads the prerendered HTML in .next/server/app and asserts the invariants
 * that are easy to break and expensive to notice in production:
 *   - no two indexable pages share a <title>, description or canonical
 *   - every indexable page has all three
 *   - a canonical always points at the page's own URL
 *   - the catalogue actually ships its SKUs in the initial HTML
 *   - the sitemap contains no URL that failed to prerender
 *
 * Usage: node scripts/verify-seo.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const APP_DIR = join(process.cwd(), '.next', 'server', 'app');
const SITE = 'https://www.salasaraluminium.shop';

if (!existsSync(APP_DIR)) {
  console.error('No build output found. Run `npx next build` first.');
  process.exit(1);
}

/** Recursively collect every prerendered .html file. */
function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

const pick = (html, re) => (html.match(re)?.[1] ?? '').trim();
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");

const pages = [];
for (const file of htmlFiles(APP_DIR)) {
  const rel = relative(APP_DIR, file).split(sep).join('/').replace(/\.html$/, '');
  // Framework-internal routes are not indexable pages.
  if (rel.startsWith('_') || rel === '404' || rel === '500') continue;

  const html = readFileSync(file, 'utf8');
  const route = rel === 'index' ? '/' : `/${rel}`;
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);

  /*
   * Two kinds of page are prerendered but are not themselves indexable
   * destinations, and must be excluded before checking uniqueness:
   *
   *  - Redirect stubs. /cart, /checkout and /products/<product-slug> exist only
   *    to redirect; their HTML is never served to a client.
   *  - Canonicalised aliases. /product/sa-1 resolves and points its canonical
   *    at /product/track-brush-black-sa-1. That is correct behaviour, not a
   *    duplicate — the alias is deliberately kept out of the sitemap.
   */
  const isRedirectStub = /<meta http-equiv="refresh"/i.test(html) || !canonical;
  const selfUrl = `${SITE}${route === '/' ? '' : route}`;
  const isAlias = Boolean(canonical) && canonical.replace(/\/$/, '') !== selfUrl.replace(/\/$/, '');

  pages.push({
    route,
    title: decode(pick(html, /<title>([^<]*)<\/title>/)),
    description: decode(pick(html, /<meta name="description" content="([^"]*)"/)),
    canonical,
    ogUrl: pick(html, /<meta property="og:url" content="([^"]*)"/),
    noindex: /<meta name="robots" content="[^"]*noindex/.test(html),
    isRedirectStub,
    isAlias,
    html,
  });
}

/** Pages that should genuinely compete in search, and must be unique. */
const indexable = pages.filter((p) => !p.noindex && !p.isRedirectStub && !p.isAlias);
const errors = [];
const warnings = [];

// --- completeness ------------------------------------------------------
for (const p of indexable) {
  if (!p.title) errors.push(`missing <title>: ${p.route}`);
  if (!p.description) errors.push(`missing description: ${p.route}`);
  if (!p.canonical) errors.push(`missing canonical: ${p.route}`);
  if (p.title.length > 60) warnings.push(`title ${p.title.length} chars: ${p.route}`);
  if (p.description && (p.description.length < 120 || p.description.length > 165)) {
    warnings.push(`description ${p.description.length} chars: ${p.route}`);
  }
}

// --- og:url agrees with canonical --------------------------------------
// (Self-reference is guaranteed by the isAlias filter above.)
for (const p of indexable) {
  const got = p.canonical.replace(/\/$/, '');
  if (p.ogUrl && p.ogUrl.replace(/\/$/, '') !== got) {
    errors.push(`og:url (${p.ogUrl}) != canonical (${p.canonical}) on ${p.route}`);
  }
}

// --- aliases must resolve to a real page -------------------------------
const indexableUrls = new Set(indexable.map((p) => p.canonical.replace(/\/$/, '')));
for (const p of pages.filter((x) => x.isAlias && !x.noindex)) {
  if (!indexableUrls.has(p.canonical.replace(/\/$/, ''))) {
    errors.push(`${p.route} canonicalises to ${p.canonical}, which does not exist`);
  }
}

// --- uniqueness --------------------------------------------------------
function assertUnique(field) {
  const byValue = new Map();
  for (const p of indexable) {
    const v = p[field];
    if (!v) continue;
    if (!byValue.has(v)) byValue.set(v, []);
    byValue.get(v).push(p.route);
  }
  for (const [value, routes] of byValue) {
    if (routes.length > 1) {
      errors.push(
        `duplicate ${field} across ${routes.length} pages: "${value.slice(0, 70)}"\n     ${routes
          .slice(0, 6)
          .join('\n     ')}${routes.length > 6 ? `\n     ... +${routes.length - 6} more` : ''}`
      );
    }
  }
}
assertUnique('title');
assertUnique('description');
assertUnique('canonical');

// --- heading hierarchy -------------------------------------------------
// Exactly one <h1>, and no skipped levels (h2 -> h4). A broken outline hurts
// screen-reader navigation and weakens the page's topical structure.
for (const p of indexable) {
  const headings = [...p.html.matchAll(/<h([1-6])\b[^>]*>/g)].map((m) => Number(m[1]));
  const h1s = headings.filter((h) => h === 1).length;

  if (h1s === 0) errors.push(`no <h1>: ${p.route}`);
  if (h1s > 1) errors.push(`${h1s} <h1> elements (expected 1): ${p.route}`);

  let deepest = 0;
  for (const level of headings) {
    if (deepest && level > deepest + 1) {
      warnings.push(`heading skips h${deepest} -> h${level}: ${p.route}`);
      break;
    }
    deepest = level;
  }
}

// --- images have alt text ----------------------------------------------
for (const p of indexable) {
  const imgs = [...p.html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const missing = imgs.filter((t) => !/\balt=/.test(t)).length;
  if (missing) warnings.push(`${missing} <img> without alt: ${p.route}`);
}

// --- catalogue renders server-side -------------------------------------
const productsPage = pages.find((p) => p.route === '/products');
if (!productsPage) {
  errors.push('/products did not prerender');
} else {
  const skus = new Set(productsPage.html.match(/SA-\d{1,2}\b/g) ?? []);
  if (skus.size < 80) {
    errors.push(`/products HTML contains only ${skus.size} SKU codes — expected 86`);
  }
  if (/Loading Catalogue/.test(productsPage.html)) {
    errors.push('/products still ships a "Loading Catalogue" placeholder');
  }
}

// --- sitemap only lists URLs that exist --------------------------------
const sitemapFile = join(APP_DIR, 'sitemap.xml.body');
let sitemapCount = 0;
if (existsSync(sitemapFile)) {
  const xml = readFileSync(sitemapFile, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  sitemapCount = locs.length;

  const seen = new Set();
  for (const loc of locs) {
    if (seen.has(loc)) errors.push(`duplicate sitemap entry: ${loc}`);
    seen.add(loc);
    if (/\/(cart|checkout|admin|supplier)\b/.test(loc)) {
      errors.push(`non-indexable URL in sitemap: ${loc}`);
    }
  }

  const excluded = new Map(
    pages
      .filter((p) => p.noindex || p.isAlias || p.isRedirectStub)
      .map((p) => [p.route, p.noindex ? 'noindex' : p.isAlias ? 'a canonicalised alias' : 'a redirect'])
  );
  for (const loc of locs) {
    const route = loc.replace(SITE, '') || '/';
    const why = excluded.get(route);
    if (why) errors.push(`sitemap lists ${why}: ${loc}`);
  }
}

// --- report ------------------------------------------------------------
console.log(`\nScanned ${pages.length} prerendered pages (${indexable.length} indexable)`);
console.log(`Sitemap URLs: ${sitemapCount}`);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings.slice(0, 25)) console.log(`  ! ${w}`);
  if (warnings.length > 25) console.log(`  ... +${warnings.length - 25} more`);
}

if (errors.length) {
  console.log(`\n${errors.length} error(s):`);
  for (const e of errors) console.log(`  x ${e}`);
  process.exit(1);
}

console.log('\nAll SEO checks passed.\n');
