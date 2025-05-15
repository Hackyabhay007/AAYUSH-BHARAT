import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "sahara-cosmetics-digifist.myshopify.com",
      "images.pexels.com",
      "cdn.myotherstore.com",
      "images.unsplash.com","www.zeroharm.in",
    ],
  },
};

export default nextConfig;
