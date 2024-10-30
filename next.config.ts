import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/proj_v2" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/proj_v/" : "",
  reactStrictMode: true,
};

export default nextConfig;
