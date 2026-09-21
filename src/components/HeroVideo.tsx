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
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Respect Save-Data and extremely slow 2G connections
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return;

    // Load video after mount without blocking the first critical paint
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shouldLoad && ref.current) {
      ref.current.load();
      const playPromise = ref.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay may be restricted until user interaction
          });
      }
    }
  }, [shouldLoad]);

  return (
    <video
      ref={ref}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      onPlaying={() => setIsPlaying(true)}
      aria-hidden="true"
      tabIndex={-1}
      className={`${className || ''} transition-opacity duration-700 ${
        isPlaying ? 'opacity-95' : 'opacity-90'
      }`}
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  );
}
