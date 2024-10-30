import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-secondary)", "Georgia", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "text-secondary": "var(--text-secondary)",
        layer: "var(--layer)",
        accent: "var(--accent)",
        link: "var(--link)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
};
export default config;
