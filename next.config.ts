import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  outputFileTracingIncludes: {
    "/api/admin/generate-report": ["./node_modules/@sparticuz/chromium/bin/**/*"],
    "/api/generate-report": ["./node_modules/@sparticuz/chromium/bin/**/*"],
  },
};

export default nextConfig;
