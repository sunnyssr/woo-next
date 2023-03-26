/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env["WORDPRESS_ASSETS_DOMAIN"], "2.gravatar.com"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
