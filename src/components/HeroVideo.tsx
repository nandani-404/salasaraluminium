'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Decorative hero background video, deferred so it never competes with LCP.
 *
 * WHAT WAS WRONG
 * The hero shipped an 8 MB autoplaying MP4 with no poster and no preload hint,
 * as the first paint above the fold. The browser began fetching all 8 MB
 * immediately, on the same connection as the CSS, fonts and hero image, and
 * until enough of it arrived the hero was a black rectangle. On a mobile
 * connection in Chhattisgarh that is seconds of blank screen, and it is charged
 * to the visitor's data plan before they have read a word.
 *
 * WHAT THIS DOES
 * 1. A poster image paints immediately and becomes the LCP element, so LCP no
 *    longer waits on video bytes at all.
 * 2. The <source> is attached only after the window load event, so the video
 *    download starts after everything needed to read and use the page.
 * 3. prefers-reduced-motion is honoured — the video simply never loads, and the
 *    poster stands in. An autoplaying looping background video is a WCAG 2.2.2
 *    concern, and respecting the setting also saves the 8 MB.
 * 4. Save-Data and 2g/slow-2g connections are skipped for the same reason.
 *
 * The file itself still needs compressing — see SEO-CONFIRM.md for the ffmpeg
 * command. This component means an uncompressed file no longer blocks rendering,
 * but 8 MB is still 8 MB of someone's data once it does load.
 */
export default function HeroVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // `connection` is non-standard and absent in Safari and Firefox; when it is
    // missing we simply proceed, which is the existing behaviour.
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return;

    const start = () => setShouldLoad(true);

    if (document.readyState === 'complete') {
      start();
      return;
    }
    window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  useEffect(() => {
    // Attaching the source after mount means the element is in the DOM with its
    // poster painted before any video byte is requested.
    if (shouldLoad) ref.current?.load();
  }, [shouldLoad]);

  return (
    <video
      ref={ref}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      // Decorative: it carries no information the surrounding copy does not.
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  );
}
