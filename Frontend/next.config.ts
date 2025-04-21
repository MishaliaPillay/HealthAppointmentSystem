import type { NextConfig } from "next";
import { NextConfig as InternalNextConfig } from "next";

const nextConfig: InternalNextConfig = {
  webpack: (config) => {
    config.resolve = {
      ...(config.resolve || {}),
      fallback: {
        ...(config.resolve?.fallback || {}),
        fs: false,
      },
    };
    return config;
  },
};

export default nextConfig;
