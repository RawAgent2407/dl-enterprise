import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.pexels.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "special-delight-9816506604.media.strapiapp.com",
      //   pathname: "/**",
      // },
      {
        protocol: 'http', // Or 'http' if necessary, but https is recommended
        hostname: 'localhost', // e.g., 'api.example.com'
        port: '1337', // Leave empty if default port
        pathname: '/uploads/**', // This matches the /upload path prefix and anything after it
      }
    ],
  },
};

export default nextConfig;
