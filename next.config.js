/** @type {import('next').NextConfig} */
const cl = require("next-contentlayer");
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    // TODO: remove later
    domains: ["via.placeholder.com"],
  },
};

module.exports = cl.withContentlayer(nextConfig);
