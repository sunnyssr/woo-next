/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env["WORDPRESS_ASSETS_DOMAIN"], "gravatar.com"],
    remotePatterns: [
      {
        hostname: "**.gravatar.com",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
