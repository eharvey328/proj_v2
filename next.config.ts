import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Correct asset prefix and base path for GitHub Pages
  basePath: process.env.NODE_ENV === "production" ? "/your-repo-name" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/your-repo-name/" : "",
  // Prevent trailing slashes which can cause 404s
  trailingSlash: true,
  // Ensure we don't attempt to preload font files
  optimizeFonts: false,
  reactStrictMode: true,
};

export default nextConfig;
