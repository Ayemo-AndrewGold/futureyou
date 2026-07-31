import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local development — Django dev server
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      // Cloudinary — media files uploaded via django-cloudinary-storage
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      // Render production backend.
      // Replace with your actual Render service URL if it changes.
      // Current: futureyou-backend-bu8o.onrender.com
      {
        protocol: "https",
        hostname: "*.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
