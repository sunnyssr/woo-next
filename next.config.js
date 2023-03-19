/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env["WORDPRESS_ASSETS_DOMAIN"]],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
