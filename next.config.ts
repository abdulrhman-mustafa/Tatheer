import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      domains: ['placehold.co'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'flagcdn.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
};

export default nextConfig;
