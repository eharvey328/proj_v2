import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/proj_v2",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
