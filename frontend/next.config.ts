import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: "@forward '@/styles/common/mixin.scss'; @import '@/styles/global.scss';",
  },
};

export default nextConfig;
