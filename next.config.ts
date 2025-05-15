import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "sahara-cosmetics-digifist.myshopify.com",
      "cdn.shopify.com",
      "images.pexels.com",
      "cdn.myotherstore.com",
      "images.unsplash.com","www.zeroharm.in",
    ],
  },
};

export default nextConfig;
