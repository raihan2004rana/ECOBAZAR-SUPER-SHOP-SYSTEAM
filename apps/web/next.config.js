/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ecobazar/ui', '@ecobazar/api-client', '@ecobazar/types', '@ecobazar/constants', '@ecobazar/validators'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
