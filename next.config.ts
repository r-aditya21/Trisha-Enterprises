import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable "X-Powered-By: Next.js" header for security
  poweredByHeader: false,

  // Allow dev server access from any device on local network (mobile testing)
  allowedDevOrigins: ["192.168.31.102"],

  // Enable response compression
  compress: true,

  images: {
    // Serve modern formats for better performance
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },

  // Strict mode for catching potential issues early
  reactStrictMode: true,

  // Experimental: optimize server component package imports
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@fortawesome/react-fontawesome",
      "@fortawesome/free-brands-svg-icons",
      "gsap",
      "framer-motion",
    ],
  },
};

export default nextConfig;
