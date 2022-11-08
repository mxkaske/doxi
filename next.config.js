/** @type {import('next').NextConfig} */
const cl = require("next-contentlayer");
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = cl.withContentlayer(nextConfig);
