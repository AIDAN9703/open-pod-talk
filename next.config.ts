import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Retired pages: send old links (ads, bookmarks) somewhere useful
      { source: "/casting", destination: "/#stream-in", permanent: false },
      { source: "/episodes", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
