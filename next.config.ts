import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';
const path = require('path');

const nextConfig: NextConfig = {
  webpack: (config: WebpackConfig) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    };
    
    return config;
  }
};

module.exports = nextConfig;
