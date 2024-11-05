import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/proj_v2",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  env: {
    EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  },
};

export default nextConfig;
