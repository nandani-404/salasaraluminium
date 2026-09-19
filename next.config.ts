import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '192.168.1.28',
    '192.168.1.28:3000',
    '192.168.1.25',
    '192.168.1.25:3000',
    '192.168.1.20',
    '192.168.1.20:3000',
    '192.168.1.100',
    'localhost',
    'localhost:3000',
    '127.0.0.1',
    '127.0.0.1:3000',
  ],
  images: {
    /*
     * AVIF first, WebP as fallback. The product catalogue is ~180 PNGs, several
     * over 1 MB; AVIF typically lands these around a quarter of the PNG size at
     * the same visual quality, which matters a great deal on the mobile
     * connections most of this traffic arrives on.
     */
    formats: ['image/avif', 'image/webp'],
    // Long cache: product images are content-addressed by the optimizer and
    // change only when the source file changes.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  /*
   * One canonical host and one trailing-slash policy. `trailingSlash: false`
   * (the default, stated explicitly here so it is not changed by accident)
   * means /products and /products/ are not both served as 200s.
   */
  trailingSlash: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        // The generated text profiles are plain text and safe to cache hard.
        source: '/:path(llms.txt|llms-full.txt)',
        headers: [{ key: 'X-Robots-Tag', value: 'all' }],
      },
    ];
  },
};

export default nextConfig;
