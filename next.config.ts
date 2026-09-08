import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Short link used in casting ads, flyers, and QR codes.
      { source: "/casting", destination: "/#tee-and-tap", permanent: false },
    ];
  },
};

export default nextConfig;
