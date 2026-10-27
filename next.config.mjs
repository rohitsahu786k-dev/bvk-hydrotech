// Only the origin matters: the login URL (/manage-wp) is not where uploads live.
const mediaHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_WORDPRESS_URL ?? "https://admin.bvkhydrotech.com").origin;
  } catch {
    return "https://admin.bvkhydrotech.com";
  }
})();

/** @type {import("next").NextConfig} */
const nextConfig = {
  // Media is served from this site's own /media path; see lib/media.ts.
  async rewrites() {
    return [{ source: "/media/:path*", destination: `${mediaHost}/wp-content/uploads/:path*` }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.bvkhydrotech.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "dev.bhavcreations.in",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "bvkhydrotech.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [72, 75, 90],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
