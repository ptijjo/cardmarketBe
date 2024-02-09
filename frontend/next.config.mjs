/** @type {import('next').NextConfig} */
/*const nextConfig = {};

export default nextConfig;*/

import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles/sass')],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.forEach((rule) => {
        if (String(rule.test) === '/\\.css$/') {
          rule.use.push({
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: './postcss.config.js',
              },
            },
          });
        }
      });
    }
    return config;
  },
};
