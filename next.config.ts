import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If your GitHub repository is not at a custom domain but rather jazeelzainudeen.github.io/jazeel-zainudeen,
  // uncomment the next line to set the correct basePath for GitHub Pages assets:
  basePath: process.env.NODE_ENV === "production" ? "/jazeel-zainudeen" : "",
};

export default nextConfig;
