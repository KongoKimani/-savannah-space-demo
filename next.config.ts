import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // catalogue photos never change once extracted
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
