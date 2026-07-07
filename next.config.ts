import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      // add your production domain here once deployed, e.g.
      // { protocol: "https", hostname: "api.futureyou.com", pathname: "/media/**" },
    ],
  },
};

export default nextConfig;