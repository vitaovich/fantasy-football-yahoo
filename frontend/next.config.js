const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.yimg.com",
      },
      {
        protocol: "https",
        hostname: "yahoofantasysports-res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "ffvitaovich.blob.core.windows.net"
      }
    ]
  }
}

module.exports = nextConfig