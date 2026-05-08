import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore TypeScript errors during production build to allow smooth deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during production build to allow smooth deployment
    ignoreDuringBuilds: true,
  }
};

export default withNextIntl(nextConfig);
