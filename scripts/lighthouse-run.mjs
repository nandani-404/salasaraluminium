/**
 * Runs Lighthouse (mobile emulation) against a locally served production build
 * and prints a compact table of scores and Core Web Vitals.
 *
 * Usage:
 *   npx next build && npx next start -p 3210
 *   node scripts/lighthouse-run.mjs <label> [port]
 *
 * Results are written to .lighthouse/<label>.json so a "before" run captured on
 * an earlier commit can be compared against an "after" run.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const label = process.argv[2] ?? 'run';
const port = process.argv[3] ?? '3210';
const base = `http://localhost:${port}`;

// The three pages the brief names: the homepage, the catalogue that was
// previously client-rendered, and a representative city page.
const ROUTES = ['/', '/products', '/locations/bilaspur'];

const OUT_DIR = join(process.cwd(), '.lighthouse');
mkdirSync(OUT_DIR, { recursive: true });

const CHROME =
  process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function runOne(route) {
  const tmp = join(OUT_DIR, `${label}${route.replace(/\//g, '_') || '_home'}.json`);

  // shell:true so the platform's npx shim resolves the same way it does from a
  // terminal; spawning npx.cmd directly fails under Git Bash on Windows.
  execFileSync(
    'npx',
    [
      '--yes',
      'lighthouse@12',
      `${base}${route}`,
      // Default preset is mobile emulation with 4x CPU throttling and a
      // simulated slow 4G connection — the right proxy for this audience.
      '--quiet',
      '--chrome-flags=--headless=new --no-sandbox --disable-gpu',
      '--only-categories=performance,accessibility,best-practices,seo',
      '--output=json',
      `--output-path=${tmp}`,
    ],
    {
      stdio: ['ignore', 'ignore', 'inherit'],
      shell: true,
      env: { ...process.env, CHROME_PATH: CHROME },
    }
  );

  const lhr = JSON.parse(readFileSync(tmp, 'utf8'));
  const cat = (id) => Math.round((lhr.categories[id]?.score ?? 0) * 100);
  const audit = (id) => lhr.audits[id]?.numericValue ?? null;

  return {
    route,
    performance: cat('performance'),
    accessibility: cat('accessibility'),
    bestPractices: cat('best-practices'),
    seo: cat('seo'),
    lcpMs: audit('largest-contentful-paint'),
    cls: audit('cumulative-layout-shift'),
    tbtMs: audit('total-blocking-time'),
    speedIndexMs: audit('speed-index'),
    transferBytes: audit('total-byte-weight'),
  };
}

const results = [];
for (const route of ROUTES) {
  process.stderr.write(`Auditing ${route} ...\n`);
  results.push(runOne(route));
}

writeFileSync(join(OUT_DIR, `${label}.json`), JSON.stringify(results, null, 2));

const fmtMs = (v) => (v == null ? '—' : `${(v / 1000).toFixed(2)}s`);
const fmtKb = (v) => (v == null ? '—' : `${Math.round(v / 1024)} KB`);

console.log(`\n=== Lighthouse (mobile) — ${label} ===`);
console.log(
  ['Route', 'Perf', 'A11y', 'BP', 'SEO', 'LCP', 'CLS', 'TBT', 'Weight']
    .map((h, i) => (i === 0 ? h.padEnd(22) : h.padStart(8)))
    .join('')
);
for (const r of results) {
  console.log(
    [
      r.route.padEnd(22),
      String(r.performance).padStart(8),
      String(r.accessibility).padStart(8),
      String(r.bestPractices).padStart(8),
      String(r.seo).padStart(8),
      fmtMs(r.lcpMs).padStart(8),
      (r.cls == null ? '—' : r.cls.toFixed(3)).padStart(8),
      fmtMs(r.tbtMs).padStart(8),
      fmtKb(r.transferBytes).padStart(8),
    ].join('')
  );
}

// Compare against a previously captured run when one exists.
const otherLabel = label === 'after' ? 'before' : 'after';
const otherPath = join(OUT_DIR, `${otherLabel}.json`);
if (existsSync(otherPath)) {
  const other = JSON.parse(readFileSync(otherPath, 'utf8'));
  console.log(`\n=== Change vs "${otherLabel}" ===`);
  for (const r of results) {
    const o = other.find((x) => x.route === r.route);
    if (!o) continue;
    const d = (a, b) => {
      const delta = a - b;
      return `${delta >= 0 ? '+' : ''}${delta}`;
    };
    const from = label === 'after' ? o : r;
    const to = label === 'after' ? r : o;
    console.log(
      `${r.route.padEnd(22)} perf ${from.performance}->${to.performance} (${d(to.performance, from.performance)})` +
        `  a11y ${from.accessibility}->${to.accessibility} (${d(to.accessibility, from.accessibility)})` +
        `  seo ${from.seo}->${to.seo} (${d(to.seo, from.seo)})` +
        `  LCP ${fmtMs(from.lcpMs)}->${fmtMs(to.lcpMs)}`
    );
  }
}
