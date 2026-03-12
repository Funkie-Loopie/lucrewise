import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['next-sanity', '@sanity/visual-editing'],
};

export default nextConfig;
