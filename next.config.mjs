/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'mamcet.edu.in',
      },
      {
        protocol: 'https',
        hostname: 'annaincubatortrichy.com',
      },
    ],
  },
};

export default nextConfig;
