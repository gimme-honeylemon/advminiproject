/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL || "http://localhost:8000";  // Use environment variable or fallback to default

const nextConfig = {
  reactStrictMode: true,
  // output: 'export', // Uncomment if exporting as a static site
  images: {
    unoptimized: true,  // Disable image optimization if needed
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",  // Rewrite API calls to backend
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
  webpack(config, { isServer }) {
    // Customize Webpack behavior here
    if (!isServer) {
      config.watchOptions = {
        poll: 800,  // Polling interval, adjust as necessary
        aggregateTimeout: 300,  // Delay after changes before rebuilding
      };
    }
    return config;
  },
};

export default nextConfig;
