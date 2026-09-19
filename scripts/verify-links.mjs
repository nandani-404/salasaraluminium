/**
 * Internal link graph diagnostic.
 *
 * Being in the sitemap does not get a page indexed. Google treats a sitemap as
 * a hint and internal links as the real signal: a page that nothing links to
 * ("orphaned") is routinely crawled once and then dropped, and a page buried
 * five clicks from the homepage is crawled rarely.
 *
 * This reads the prerendered HTML and reports, for every indexable page:
 *   - how many internal links point at it
 *   - how many clicks it sits from the homepage
 *
 * Usage: node scripts/verify-links.mjs [--max-depth N]
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const APP_DIR = join(process.cwd(), '.next', 'server', 'app');
const SITE = 'https://www.salasaraluminium.shop';
const MAX_DEPTH = Number(process.argv[process.argv.indexOf('--max-depth') + 1]) || 4;

if (!existsSync(APP_DIR)) {
  console.error('No build output. Run `npx next build` first.');
  process.exit(1);
}

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** route -> { outgoing:Set<string>, indexable:boolean } */
const pages = new Map();

for (const file of htmlFiles(APP_DIR)) {
  const rel = relative(APP_DIR, file).split(sep).join('/').replace(/\.html$/, '');
  if (rel.startsWith('_') || rel === '404' || rel === '500') continue;

  const html = readFileSync(file, 'utf8');
  const route = rel === 'index' ? '/' : `/${rel}`;
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const selfUrl = `${SITE}${route === '/' ? '' : route}`;
  const isAlias = canonical && canonical.replace(/\/$/, '') !== selfUrl.replace(/\/$/, '');

  const outgoing = new Set();
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    let href = m[1].replace(/\/$/, '') || '/';
    // Ignore asset and API paths.
    if (href.startsWith('/_next') || href.startsWith('/api') || /\.[a-z0-9]{2,4}$/i.test(href)) {
      continue;
    }
    outgoing.add(href);
  }

  pages.set(route, {
    outgoing,
    indexable: Boolean(canonical) && !noindex && !isAlias,
  });
}

// Inbound counts.
const inbound = new Map([...pages.keys()].map((r) => [r, 0]));
for (const [from, { outgoing }] of pages) {
  for (const to of outgoing) {
    if (to !== from && inbound.has(to)) inbound.set(to, inbound.get(to) + 1);
  }
}

// Click depth from the homepage.
const depth = new Map([['/', 0]]);
let frontier = ['/'];
while (frontier.length) {
  const next = [];
  for (const route of frontier) {
    for (const to of pages.get(route)?.outgoing ?? []) {
      if (pages.has(to) && !depth.has(to)) {
        depth.set(to, depth.get(route) + 1);
        next.push(to);
      }
    }
  }
  frontier = next;
}

const indexable = [...pages.entries()].filter(([, v]) => v.indexable).map(([r]) => r);
const orphans = indexable.filter((r) => r !== '/' && (inbound.get(r) ?? 0) === 0);
const unreachable = indexable.filter((r) => !depth.has(r));
const tooDeep = indexable.filter((r) => (depth.get(r) ?? 99) > MAX_DEPTH);

const byDepth = new Map();
for (const r of indexable) {
  const d = depth.has(r) ? depth.get(r) : 'unreachable';
  byDepth.set(d, (byDepth.get(d) ?? 0) + 1);
}

console.log(`\nIndexable pages: ${indexable.length}\n`);
console.log('Click depth from homepage:');
for (const key of [...byDepth.keys()].sort((a, b) => (a === 'unreachable' ? 1 : b === 'unreachable' ? -1 : a - b))) {
  const label = key === 'unreachable' ? 'unreachable' : `${key} click${key === 1 ? '' : 's'}`;
  console.log(`  ${String(byDepth.get(key)).padStart(4)}  ${label}`);
}

const weak = indexable
  .filter((r) => r !== '/')
  .map((r) => ({ route: r, links: inbound.get(r) ?? 0 }))
  .sort((a, b) => a.links - b.links);

console.log('\nFewest inbound internal links:');
for (const { route, links } of weak.slice(0, 12)) {
  console.log(`  ${String(links).padStart(4)}  ${route}`);
}

let failed = false;
if (orphans.length) {
  failed = true;
  console.log(`\n${orphans.length} ORPHANED page(s) — nothing links to these, so they will rarely be indexed:`);
  for (const r of orphans.slice(0, 30)) console.log(`  x ${r}`);
  if (orphans.length > 30) console.log(`  ... +${orphans.length - 30} more`);
}
if (unreachable.length) {
  failed = true;
  console.log(`\n${unreachable.length} UNREACHABLE page(s) — not linked from any crawl path starting at /:`);
  for (const r of unreachable.slice(0, 30)) console.log(`  x ${r}`);
  if (unreachable.length > 30) console.log(`  ... +${unreachable.length - 30} more`);
}
if (tooDeep.length) {
  console.log(`\n${tooDeep.length} page(s) deeper than ${MAX_DEPTH} clicks (crawled less often):`);
  for (const r of tooDeep.slice(0, 15)) console.log(`  ! ${r} (${depth.get(r)})`);
}

if (!failed) console.log('\nNo orphaned or unreachable pages.\n');
process.exit(failed ? 1 : 0);
