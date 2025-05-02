/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', '@radix-ui/react-icons'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': process.cwd(),
    };
    
    // Handle canvas module
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    // Add PDF.js worker configuration
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    // Copy PDF.js worker to public directory
    config.module.rules.push({
      test: /pdf\.worker\.min\.js$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/[name][ext]',
      },
    });

    return config;
  },
  async headers() {
    return [
      {
        source: '/books/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
          {
            key: 'Content-Disposition',
            value: 'inline',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  output: 'standalone',
  distDir: '.next',
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig; 