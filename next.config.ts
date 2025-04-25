import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === 'true';

const repo = 'hover-app';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  output: "export",
  basePath: isGithubPages ? `/${repo}` : '',
  assetPrefix: isGithubPages ? `/${repo}/` : '',
};

export default nextConfig;
