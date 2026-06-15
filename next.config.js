/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.0.113'],
  images: {
    domains: [],
    qualities: [75, 80, 85, 90],
  },
};

module.exports = nextConfig;
