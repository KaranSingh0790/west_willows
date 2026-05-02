/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["localhost:3000", "0.0.0.0:3000", "scott-tennis-classical-pill.trycloudflare.com"],
};

export default nextConfig;
