/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    typedRoutes: false,
  },
  skipTrailingSlashRedirect: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: false,
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.devtool = false;
    }
    
    config.optimization = {
      ...config.optimization,
      minimize: process.env.NODE_ENV === 'production',
    };
    
    return config;
  },
}

export default nextConfig
