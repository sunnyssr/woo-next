/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env["WORDPRESS_ASSETS_DOMAIN"], "gravatar.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.gravatar.com",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
