import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: true, // Required for static export and Netlify
  },
};

export default nextConfig;
