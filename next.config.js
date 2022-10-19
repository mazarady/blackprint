/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  env: {
    BASE_URL: process.env.STRAPI_PUBLIC_BASE_URL,
  },
};

module.exports = nextConfig;
