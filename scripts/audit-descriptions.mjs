import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const APP_DIR = join(process.cwd(), '.next', 'server', 'app');
const SITE = 'https://www.salasaraluminium.shop';

if (!existsSync(APP_DIR)) {
  console.error('No build output found in .next/server/app.');
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
  if (rel.startsWith('_') || rel === '404' || rel === '500') continue;

  const html = readFileSync(file, 'utf8');
  const route = rel === 'index' ? '/' : `/${rel}`;
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
  const isRedirectStub = /<meta http-equiv="refresh"/i.test(html) || !canonical;
  const selfUrl = `${SITE}${route === '/' ? '' : route}`;
  const isAlias = Boolean(canonical) && canonical.replace(/\/$/, '') !== selfUrl.replace(/\/$/, '');

  const desc = decode(pick(html, /<meta name="description" content="([^"]*)"/));
  const ogDesc = decode(pick(html, /<meta property="og:description" content="([^"]*)"/));
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);

  pages.push({
    route,
    description: desc,
    ogDescription: ogDesc,
    length: desc.length,
    canonical,
    isRedirectStub,
    isAlias,
    noindex,
  });
}

const indexable = pages.filter((p) => !p.noindex && !p.isRedirectStub && !p.isAlias);

const descMap = new Map();
for (const p of indexable) {
  if (!p.description) continue;
  if (!descMap.has(p.description)) descMap.set(p.description, []);
  descMap.get(p.description).push(p.route);
}

const duplicates = [];
for (const [desc, routes] of descMap) {
  if (routes.length > 1) {
    duplicates.push({ desc, routes });
  }
}

const missing = indexable.filter((p) => !p.description || p.length === 0);
const tooShort = indexable.filter((p) => p.description && p.length < 70);
const tooLong = indexable.filter((p) => p.description && p.length > 155);

const flagged = indexable.filter(
  (p) => !p.description || p.length < 70 || p.length > 155 || (descMap.get(p.description)?.length ?? 0) > 1
);

const summary = {
  totalScanned: pages.length,
  totalIndexable: indexable.length,
  missingCount: missing.length,
  duplicatesCount: duplicates.length,
  tooShortCount: tooShort.length,
  tooLongCount: tooLong.length,
  totalFlagged: flagged.length,
  missing: missing.map((p) => ({ url: p.route, length: p.length, text: p.description })),
  tooShort: tooShort.map((p) => ({ url: p.route, length: p.length, text: p.description })),
  tooLong: tooLong.map((p) => ({ url: p.route, length: p.length, text: p.description })),
  duplicates: duplicates.map((d) => ({ text: d.desc, length: d.desc.length, urls: d.routes })),
  flaggedTable: flagged.map((p) => ({
    url: p.route,
    length: p.length,
    text: p.description,
    issue: [
      !p.description ? 'Missing' : null,
      p.length < 70 ? 'Too short (<70)' : null,
      p.length > 155 ? 'Too long (>155)' : null,
      (descMap.get(p.description)?.length ?? 0) > 1 ? 'Duplicate' : null,
    ]
      .filter(Boolean)
      .join(', '),
  })),
};

writeFileSync(join(process.cwd(), 'scratch', 'audit-summary.json'), JSON.stringify(summary, null, 2), 'utf8');

console.log(JSON.stringify({
  totalIndexable: summary.totalIndexable,
  missingCount: summary.missingCount,
  tooShortCount: summary.tooShortCount,
  tooLongCount: summary.tooLongCount,
  duplicatesCount: summary.duplicatesCount,
  totalFlagged: summary.totalFlagged
}));
