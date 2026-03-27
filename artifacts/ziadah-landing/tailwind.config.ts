import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./src/cms/**/*.{ts,tsx}",
  ],
};

export default config;
