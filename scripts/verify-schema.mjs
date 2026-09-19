/**
 * Validates the JSON-LD in the prerendered HTML.
 *
 * This is not a substitute for Google's Rich Results Test, which needs a live
 * URL — it is the check that can run before deploying. It asserts that every
 * block parses, that required properties are present per type, and above all
 * that no block reintroduces a fabricated price or rating.
 *
 * Usage: node scripts/verify-schema.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const APP_DIR = join(process.cwd(), '.next', 'server', 'app');
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

const errors = [];
const typeCounts = new Map();
let blocks = 0;
let pages = 0;

/** Required properties Google expects, per type we emit. */
const REQUIRED = {
  Product: ['name'],
  Article: ['headline', 'author'],
  FAQPage: ['mainEntity'],
  BreadcrumbList: ['itemListElement'],
  HardwareStore: ['name', 'address'],
  Organization: ['name', 'url'],
  WebSite: ['url'],
  Service: ['serviceType', 'provider'],
};

function walk(node, route, path = '') {
  if (Array.isArray(node)) {
    node.forEach((n, i) => walk(n, route, `${path}[${i}]`));
    return;
  }
  if (!node || typeof node !== 'object') return;

  const type = node['@type'];
  if (typeof type === 'string') {
    typeCounts.set(type, (typeCounts.get(type) ?? 0) + 1);

    for (const prop of REQUIRED[type] ?? []) {
      if (node[prop] === undefined) {
        errors.push(`${route}: ${type} missing required property "${prop}"`);
      }
    }

    // The regression this whole exercise exists to prevent.
    if (type === 'AggregateRating' || node.aggregateRating) {
      errors.push(
        `${route}: aggregateRating present — this business has no on-site reviews, so any rating here is fabricated`
      );
    }
    if (type === 'Offer' || node.offers) {
      const offer = type === 'Offer' ? node : node.offers;
      const price = Array.isArray(offer) ? offer[0]?.price : offer?.price;
      if (price !== undefined && (price === 0 || price === '0')) {
        errors.push(`${route}: Offer with price "0" — omit offers until real prices exist`);
      }
    }
    if (type === 'Review') {
      errors.push(`${route}: Review markup present — no on-site reviews exist`);
    }
  }

  for (const [k, v] of Object.entries(node)) {
    if (v && typeof v === 'object') walk(v, route, `${path}.${k}`);
  }
}

for (const file of htmlFiles(APP_DIR)) {
  const rel = relative(APP_DIR, file).split(sep).join('/').replace(/\.html$/, '');
  if (rel.startsWith('_')) continue;
  const route = rel === 'index' ? '/' : `/${rel}`;
  const html = readFileSync(file, 'utf8');

  const found = [...html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  )];
  if (found.length === 0) continue;
  pages += 1;

  for (const m of found) {
    blocks += 1;
    let parsed;
    try {
      parsed = JSON.parse(m[1]);
    } catch (err) {
      errors.push(`${route}: JSON-LD failed to parse — ${err.message}`);
      continue;
    }
    if (!parsed['@context'] && !Array.isArray(parsed)) {
      errors.push(`${route}: JSON-LD block missing @context`);
    }
    walk(parsed, route);
  }
}

console.log(`\nParsed ${blocks} JSON-LD blocks across ${pages} pages.\n`);
console.log('Types emitted:');
for (const [type, count] of [...typeCounts].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(count).padStart(5)}  ${type}`);
}

if (errors.length) {
  console.log(`\n${errors.length} problem(s):`);
  for (const e of errors.slice(0, 40)) console.log(`  x ${e}`);
  process.exit(1);
}
console.log('\nNo fabricated ratings, reviews or zero-prices. All blocks parse.\n');
