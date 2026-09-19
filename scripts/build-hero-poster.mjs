/**
 * Generates the hero video poster.
 *
 * The poster is the homepage LCP element — it is what a visitor sees while the
 * background video is still deferred — so its weight sets LCP directly. The
 * source art is a 487 KB JPEG sized for a desktop hero, which on a throttled
 * mobile connection cost several seconds on its own.
 *
 * A <video poster> cannot go through next/image, so it has to be optimised
 * ahead of time. This writes both a WebP and a JPEG fallback at a sensible hero
 * width. Run it whenever the source art changes:
 *
 *   node scripts/build-hero-poster.mjs
 *
 * sharp ships with Next.js, so this adds no dependency.
 */
import sharp from 'sharp';
import { statSync } from 'node:fs';
import { join } from 'node:path';

const PUBLIC = join(process.cwd(), 'public');
const SOURCE = join(PUBLIC, 'salasar-hardware-hero-clean.jpg');

// 1600px wide covers a 2x phone and a 1x laptop. The poster sits behind a dark
// scrim and carries no fine detail or text, so it tolerates aggressive quality
// settings that would be too low for a product photograph.
const WIDTH = 1600;

const kb = (p) => `${Math.round(statSync(p).size / 1024)} KB`;

const targets = [
  { file: 'salasar-workshop-hero-poster.webp', run: (img) => img.webp({ quality: 62, effort: 6 }) },
  {
    file: 'salasar-workshop-hero-poster.jpg',
    run: (img) => img.jpeg({ quality: 68, progressive: true, mozjpeg: true }),
  },
];

console.log(`source: ${kb(SOURCE)}`);

for (const { file, run } of targets) {
  const out = join(PUBLIC, file);
  await run(sharp(SOURCE).resize({ width: WIDTH, withoutEnlargement: true })).toFile(out);
  console.log(`  ${file}: ${kb(out)}`);
}
