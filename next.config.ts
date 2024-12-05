import type { NextConfig } from 'next';
const path = require('path');

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
      },
      // 대소문자 구분 강제
      enforceExtension: false,
      enforceModuleExtension: false,
      fullySpecified: false,
    };
    return config;
  },
};

module.exports = nextConfig;
