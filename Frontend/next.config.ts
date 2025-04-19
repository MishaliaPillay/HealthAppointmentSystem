/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: '/firebase-messaging-sw.js',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/'
          }
        ]
      }
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
}

export default nextConfig;
